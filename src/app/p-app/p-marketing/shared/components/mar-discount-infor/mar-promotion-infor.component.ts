import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription, } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/operators';
import DTOPromotionProduct, { DTOPromotionType } from '../../dto/DTOPromotionProduct.dto';
import { MarketingService } from '../../services/marketing.service';
import { MarPromotionAPIService } from '../../services/marpromotion-api.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTOUpdate } from 'src/app/p-app/p-ecommerce/shared/dto/DTOUpdate';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { distinct } from '@progress/kendo-data-query';
import { MarNewsProductAPIService } from '../../services/marnewsproduct-api.service';
class DTOActionStatus { text: string; class: string; code: string; statusID?: number; type?: string }

/** Component hiển thị thông tin chương trình khuyến mãi.
  * @Input() mode: 1: hiển thị component theo UI cũ, 2: hiển thị component theo UI cũ.         
  * @Input() hasImages: true: hiển thị thông tin Hình ảnh. false: ẩn thông tin Hình ảnh.
  * @Input() blockName: Tên block chương trình khuyến mãi.
  * @Input() isloadPromotionInfo: true: đang load thông tin chương trình khuyến mãi. false: không load thông tin chương trình khuyến mãi.
  * @Input() disabled: true: disabled các trường thông tin. false: không disabled các trường thông tin.
  * @Input() TypeDataPromotion: 1: Sản phẩm, 2: Combo - Giftset, 3: Hamper, 4: quà tặng.
  * @Output() getPromotion: Lấy thông tin chương trình khuyến mãi.
  * @Output() uppdateStatus: Cập nhật trạng thái chương trình khuyến mãi.
  * @Output() getListActionPromotion: Lấy danh sách các action của chương trình khuyến mãi.

  * Logic cập nhật trạng thái của chương trình khuyến mãi đã được xử lý trong component.
  * Logic cập nhật thông tin chương trình khuyến mãi đã được xử lý trong component.
 */
@Component({
  selector: 'app-mar-promotion-infor',
  templateUrl: './mar-promotion-infor.component.html',
  styleUrls: ['./mar-promotion-infor.component.scss']
})
export class MarPromotionInforComponent implements OnInit {
  /**
  * @mode: 1: hiển thị component theo UI cũ, 2: hiển thị component theo UI cũ.
  */
  @Input() mode: number = 1;

  /**
  * @hasImages: true: hiển thị thông tin Hình ảnh. false: ẩn thông tin Hình ảnh.
  */
  @Input() hasImages: boolean = true;
  @Input({ required: true }) blockName: string = '';
  @Input() isloadPromotionInfo: boolean = false;
  @Input() disabled: boolean = false;

  /**
  * @TypeDataPromotion: 1: Sản phẩm, 2: Combo - Giftset, 3: Hamper, 4: quà tặng.
  */
  @Input() TypeDataPromotion: number = 3;

  @Output() getPromotion: EventEmitter<DTOPromotionProduct> = new EventEmitter<DTOPromotionProduct>();
  @Output() uppdateStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getListActionPromotion: EventEmitter<{ text: string, class: string, code: string, link?: number, type?: string }[]> = new EventEmitter<{ text: string, class: string, code: string, link?: number, type?: string }[]>();

  //#region permision
  justLoadedChangePermissionAPI:boolean = true
  justLoaded = true
  actionPerm: DTOActionPermission[] = []
  dataPerm: DTODataPermission[] = []

  isToanQuyen = false
  isAllowedToCreate = false
  isAllowedToVerify = false
  //#endregion
  //#region variable useful
  loading = false
  isLockAll = false
  ngUnsubscribe$ = new Subject<void>();

  curPromotion = new DTOPromotionProduct() // giá trị binding của chương trình
  listPromotionType: DTOPromotionType[] = [] // danh sách loại chương trình 
  //#endregion

  constructor(public serviceMar: MarketingService,
    public apiMarService: MarPromotionAPIService,
    public MarServiceAPI: MarNewsProductAPIService,
    public layoutService: LayoutService,
    public layoutApiService: LayoutAPIService,
    public menuService: PS_HelperMenuService,) { }

  ngOnInit(): void {
    let that = this
    let a = this.menuService.changePermission().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")

        that.isToanQuyen = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        that.isAllowedToCreate = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        that.isAllowedToVerify = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

        that.dataPerm = distinct(res.DataPermission, "Warehouse")
      }
    })
    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.getCache()
      }
    })

    //#region callback
    this.pickFileCallback = this.pickFile.bind(this)
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)
    //#endregion

    this.arrUnsubscribe.push(a,b)
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  //#region function chung
  getCache() {
    this.serviceMar.getCachePromotionDetail().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        this.curPromotion = res
        if (this.curPromotion.Code == 0) {
          this.createNewPromotion()
          this.APIGetListPromotionType();
        } else {
          this.loadData();
        }
      }
    })
  }

  loadData() {
    this.APIGetPromotion(this.curPromotion);
    this.APIGetListPromotionType();
  }

  createNewPromotion(data?: DTOPromotionProduct) {
    if (Ps_UtilObjectService.hasValue(data)) {
      this.curPromotion = data
    }
    this.curPromotionType = null
    
    
    this.isLockAll = false;
    this.curLanguage = 1
    this.curImgSetting = 0

    this.StartDate = null
    this.EndDate = null


    this.CreateListBtnStatus();
    this.getPromotion.emit(this.curPromotion);
  }

  onUpdatePromotionStatus(item: DTOActionStatus) {
    var newPro = { ...this.curPromotion }
    this.APIUpdatePromotionStatus([newPro], item.statusID)
  }

  //#endregion

  //#region function useful of listPromotionType
  //- disabled item 
  isItemDisabled(itemArgs: { dataItem: DTOPromotionType; index: number }) {
    return itemArgs.dataItem.Code == -1;
  }

  //- value change
  defaultPromotionType: DTOPromotionType = new DTOPromotionType(-1, '- Chọn phân nhóm -')
  curPromotionType: DTOPromotionType = null
  onDropdownlistClick(e, dropdownName: string) {
    switch (dropdownName) {
      case 'PromotionType':
        this.curPromotion.PromotionType = e.Code
        this.curPromotion.PromotionTypeName = e.PromotionType
        this.APIUpdatePromotion([dropdownName])
        break
      default:
        this.APIUpdatePromotion([dropdownName])
        break
    }
  }

  //#endregion

  //#region change tag
  curLanguage: number = 1
  changeLanguage(lang: number) {
    this.curLanguage = lang
  }
  //#endregion

  //#region set date promotion
  tempDate: DTOPromotionProduct;
  StartDate: Date = null;
  EndDate: Date = null;
  isUpdateDate: boolean = false;

  focusDatepicker() {
    this.tempDate = JSON.parse(JSON.stringify(this.curPromotion))
  }


  onDatepickerChange(prop: string, item?) {
    var valueFormatDate: Date
    const tempcurDate = Ps_UtilObjectService.hasValue(this.tempDate[prop]) ? new Date(this.tempDate[prop]).toDateString() : null
    const tempItemDate = new Date(item).toDateString()
    if (JSON.stringify(this.curPromotion[prop]) !== JSON.stringify(item) && tempcurDate !== tempItemDate) {
      valueFormatDate = new Date(item);
      if (prop == 'StartDate') {
        valueFormatDate.setHours(7, 0, 0, 0);
      } else {
        valueFormatDate.setHours(23, 59, 59, 0)
      }
      this.isUpdateDate = true;
    } else {
      this.isUpdateDate = false;
    }
    if (Ps_UtilObjectService.hasValue(item) && Ps_UtilObjectService.hasValueString(prop) && this.isUpdateDate) {
      this.curPromotion[prop] = valueFormatDate.toISOString();
      this.APIUpdatePromotion([prop])
    }
    this.checkPromotionProp();
  }


  checkPromotionProp() {
    this.onCheckPermistion();

    if (Ps_UtilObjectService.hasValueString(this.curPromotion.StartDate))
      this.StartDate = new Date(this.curPromotion.StartDate)

    if (Ps_UtilObjectService.hasValueString(this.curPromotion.EndDate))
      this.EndDate = new Date(this.curPromotion.EndDate)

    this.curPromotionType = this.listPromotionType.find(s => s.Code == this.curPromotion.PromotionType)
    // this.isCheckboxAllowByPromotionType() // emit
  }

  onCheckPermistion() {
    const canCreateOrAdmin = this.isAllowedToCreate || this.isToanQuyen;
    const canVerify = this.isAllowedToVerify || this.isToanQuyen;
    const statusID = this.curPromotion.StatusID;

    // Kiểm tra điều kiện "Chỉnh sửa"
    if (canCreateOrAdmin && (statusID === 0 || statusID === 4) || canVerify && statusID === 1) {
      this.isLockAll = false; // Cho phép chỉnh sửa
    } else {
      this.isLockAll = true; // Bị disabled
    }
  }
  //#endregion

  //#region handle textbox, textare
  onTextboxLoseFocus(prop: string, item?) {
    if (Ps_UtilObjectService.hasValueString(prop)) {
      switch (prop) {
        default:
          this.APIUpdatePromotion([prop])
          break
      }
    }
  }

  valueChangeEditor(value: any) {
    this.curLanguage == 1 ? this.curPromotion.VNSummary = value
      : this.curLanguage == 2 ? this.curPromotion.JPSummary = value : this.curPromotion.ENSummary = value
  }
  //#endregion

  //#region button status
  listpromotionActionButton: DTOActionStatus[] = [];
  CreateListBtnStatus() {
    this.listpromotionActionButton = [];
    var statusID = this.curPromotion.StatusID;

    // Kiểm tra quyền tạo hoặc toàn quyền
    const canCreateOrAdmin = this.isAllowedToCreate || this.isToanQuyen;

    // Kiểm tra quyền duyệt
    const canVerify = this.isAllowedToVerify || this.isToanQuyen;


    // Push "Gửi duyệt" khi có quyền tạo hoặc toàn quyền và statusID = 0 hoặc statusID = 4
    if (canCreateOrAdmin && (statusID === 0 || statusID === 4) && Ps_UtilObjectService.hasValueString(this.curPromotion.PromotionNo)) {
      this.listpromotionActionButton.push({
        text: 'GỬI DUYỆT',
        class: 'k-button btn-hachi hachi-primary',
        code: 'redo',
        statusID: 1,
      });
    }

    // Push "Phê duyệt" khi có quyền duyệt hoặc toàn quyền và statusID = 1 hoặc statusID = 3
    if (canVerify && (statusID === 1 || statusID === 3)) {
      this.listpromotionActionButton.push({
        text: 'PHÊ DUYỆT',
        class: 'k-button btn-hachi hachi-primary',
        code: 'check-outline',
        statusID: 2,
      });

      // Push "Trả về" khi có quyền duyệt hoặc toàn quyền và statusID = 1 hoặc statusID = 3
      this.listpromotionActionButton.push({
        text: 'TRẢ VỀ',
        class: 'k-button btn-hachi hachi-warning hachi-secondary',
        code: 'undo',
        statusID: 4,
      });
    }

    // Push "Ngưng hiển thị" khi có quyền duyệt hoặc toàn quyền và statusID = 2
    if (canVerify && statusID === 2) {
      this.listpromotionActionButton.push({
        text: 'NGƯNG HIỂN THỊ',
        class: 'k-button btn-hachi hachi-warning',
        code: 'minus-outline',
        statusID: 3,
      });
    }

    // Push "Xóa" khi có quyền tạo hoặc toàn quyền và statusID === 0
    if (canCreateOrAdmin && statusID === 0 && Ps_UtilObjectService.hasValueString(this.curPromotion.PromotionNo)) {
      this.listpromotionActionButton.unshift({
        text: 'XÓA CHƯƠNG TRÌNH',
        class: 'k-button btn-hachi hachi-warning',
        code: 'trash',
        type: 'delete',
      });
    }
    if (canCreateOrAdmin && this.curPromotion.TypeData !== 4) {
      this.listpromotionActionButton.push({
        text: 'TẠO MỚI',
        class: 'k-button btn-hachi hachi-primary',
        code: 'plus',
        type: 'new',
      });
    }
    // Sắp xếp theo thứ tự: xem -> chỉnh sửa -> gửi -> duyệt -> ngưng -> trả về
    this.getListActionPromotion.emit(this.listpromotionActionButton);
  }
  //#endregion

  //#region  Update img
  getRes(str: string) {
    return Ps_UtilObjectService.getImgRes(str)
  }
  @Input() curImgSetting = 0
  pickFileCallback: Function
  GetFolderCallback: Function
  uploadEventHandlerCallback: Function
  pickFile(e: DTOCFFile) {
    var file = Ps_UtilObjectService.removeImgRes(e?.PathFile)
    this.layoutService.setFolderDialog(false)
    
    if (this.curImgSetting == -1)
      this.serviceMar.bannerCard.next(file)
    else {
      this.curPromotion[`ImageSetting${this.curImgSetting}`] = file
      this.APIUpdatePromotion([`ImageSetting${this.curImgSetting}`])
    }
  }
  
  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog())
      return this.MarServiceAPI.GetFolderWithFile(childPath, 4);
  }
  onUploadFile(imgSetting: number) {
    this.curImgSetting = imgSetting
    this.layoutService.folderDialogOpened = true
  }
  deleteFile(imgSetting: number) {
    this.curPromotion[`ImageSetting${imgSetting}`] = null
    this.APIUpdatePromotion([`ImageSetting${imgSetting}`])
  }
  //#endregion




  //#region API
  APIGetPromotion(dto: DTOPromotionProduct) {
    this.loading = true;
    var ctx = `chương trình khuyến mãi ${dto.TypeData == 1 ? ' sản phẩm' : dto.TypeData == 2 ? ' combo - giftset' : dto.TypeData == 3 ? ' hamper' : ' quà tặng'}`
    let a = this.apiMarService.GetPromotion(dto.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res.ErrorString != null) {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy ${ctx}: ${res.ErrorString}!`);
      }
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.curPromotion = res.ObjectReturn;
        this.serviceMar.setCachePromotionDetail(this.curPromotion)
        this.getPromotion.emit(this.curPromotion);
        this.checkPromotionProp();
        this.CreateListBtnStatus();
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy ${ctx}: ${error}!`);
    });
    this.arrUnsubscribe.push(a);
  }

  APIUpdatePromotion(properties: string[], promotion: DTOPromotionProduct = this.curPromotion) {
    this.loading = true;
    var ctx = (promotion.Code == 0 ? "tạo mới" : "cập nhật") + ` khuyến mãi ${promotion.TypeData == 1 ? 'sản phẩm' : promotion.TypeData == 2 ? 'combo - giftset' : promotion.TypeData == 3 ? ' hamper' : ' quà tặng'}`
    promotion.Code == 0 ? properties.push('PromotionType', 'PromotionTypeName', 'Category', 'CategoryName', 'TypeData', 'StartDate', 'EndDate','DetermineGift') : null
    var updateDTO: DTOUpdate = {
      "DTO": promotion,
      "Properties": properties
    }

    let a = this.apiMarService.UpdatePromotion(updateDTO).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {

      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.curPromotion = res.ObjectReturn
        this.serviceMar.setCachePromotionDetail(this.curPromotion)
        this.getPromotion.emit(this.curPromotion);
        this.checkPromotionProp();
        this.CreateListBtnStatus();
        this.layoutService.onSuccess(`${ctx} thành công`)
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.APIGetPromotion(this.curPromotion);
      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      this.APIGetPromotion(this.curPromotion);
    });
    this.arrUnsubscribe.push(a);
  }



  APIUpdatePromotionStatus(list: DTOPromotionProduct[] = [this.curPromotion], status: number) {
    this.loading = true;
    var ctx = `Cập nhật tình trạng khuyến mãi ${this.curPromotion.TypeData == 1 ? 'sản phẩm' : this.curPromotion.TypeData == 2 ? 'combo - giftset' : this.curPromotion.TypeData == 3 ? ' hamper' : ' quà tặng'}`

    let a = this.apiMarService.UpdatePromotionStatus(list, status).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res.ErrorString != null && res.StatusCode !== 0) {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.APIGetPromotion(this.curPromotion);
      }
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.serviceMar.setCachePromotionDetail(this.curPromotion)
        this.APIGetPromotion(this.curPromotion);
        this.uppdateStatus.emit(true);
      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      this.APIGetPromotion(this.curPromotion);
    });
    this.arrUnsubscribe.push(a);
  }
  APIDeletePromotion() {
    this.loading = true;
    var ctx = "xóa khuyến mãi" + `${this.curPromotion.TypeData == 1 ? 'sản phẩm' : this.curPromotion.TypeData == 2 ? 'combo - giftset' : this.curPromotion.TypeData == 3 ? ' hamper' : ' quà tặng'}`

    let a = this.apiMarService.DeletePromotion(this.curPromotion).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        // this.createNewPromotion()
        let newpro = new DTOPromotionProduct()
        newpro.TypeData = this.TypeDataPromotion
        newpro.Category = this.curPromotion.Category
        newpro.CategoryName = this.curPromotion.CategoryName
        newpro.PromotionType = 1
        newpro.PromotionTypeName = 'KM Thường'
        newpro.DetermineGift = 0
        newpro.StartDate = new Date()
        newpro.EndDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        this.curPromotion = newpro
        this.serviceMar.setCachePromotionDetail(newpro);
        this.CreateListBtnStatus()
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else  {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.APIGetPromotion(this.curPromotion);
      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      this.APIGetPromotion(this.curPromotion);
    });
    this.arrUnsubscribe.push(a);
  }

  APIGetListPromotionType() {
    var ctx = "loại khuyến mãi" + `${this.curPromotion.TypeData == 1 ? ' sản phẩm' : this.curPromotion.TypeData == 2 ? ' combo - giftset' : this.curPromotion.TypeData == 3 ? ' hamper' : ' quà tặng'}`
    this.loading = true;
    let a = this.apiMarService.GetListPromotionType().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res.ErrorString != null && res.StatusCode !== 0) {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}!`);
        this.APIGetPromotion(this.curPromotion);
      }
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listPromotionType = res.ObjectReturn;
      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      this.APIGetPromotion(this.curPromotion);
    });
    this.arrUnsubscribe.push(a);
  }
  //#endregion

  arrUnsubscribe: Subscription[] = [];
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.arrUnsubscribe.forEach((sub) => {
      if (sub && sub.unsubscribe) {
        sub?.unsubscribe();
      }
    })
  }


  /**---------------- Logic cho UI mới */
  isToggleSection = false;
  toggleSection() {
    this.isToggleSection = !this.isToggleSection;
  }
}

