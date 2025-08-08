import { Component, EventEmitter, OnDestroy, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import DTOPromotionProduct, { DTOPromotionType, DTODayOfWeek, DTOGroupOfCard } from '../../../shared/dto/DTOPromotionProduct.dto';
import { DTOWarehouse } from 'src/app/p-app/p-ecommerce/shared/dto/DTOWarehouse';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { MarketingService } from '../../services/marketing.service';
import { MarPromotionAPIService } from '../../services/marpromotion-api.service';
import { takeUntil } from 'rxjs/operators';
import { distinct } from '@progress/kendo-data-query';


/** Component hiển thị thông tin điều kiện áp dụng hoặc phạm vi áp dụng chương trình khuyến mãi
  * @mode: 1: hiển thị component theo UI cũ (điều kiện áp dụng), 2: hiển thị component theo UI cũ (phạm vi áp dụng). 
  * @disabled: trạng thái disabled của component
  * @getListWareHouse: event lấy danh sách cửa hàng (dùng cho mode 1)
  * @getListCOPOLApplyScope: event lấy danh sách phạm vi áp dụng (dùng cho mode 2)
  * @getListDayOfWeek: event lấy danh sách ngày trong tuần
  * @getListGroupOfCard: event lấy danh sách nhóm thẻ
  * @curPromotion: thông tin chương trình khuyến mãi
 */
@Component({
  selector: 'app-mar-condition-apply',
  templateUrl: './mar-condition-apply.component.html',
  styleUrls: ['./mar-condition-apply.component.scss']
})
export class MarConditionApplyComponent implements OnInit, OnDestroy {

  /**
  * @mode: 1: hiển thị component theo UI cũ, 2: hiển thị component theo UI cũ.
  */
  @Input() mode: number = 1;

  @Input() disabled: boolean = false;

  /**
  * @isHiddenCondition: ẩn block điều kiện áp dụng
  * @description: dùng để ẩn block điều kiện áp dụng của mode = 1 và mode = 2
  */
  @Input() isHiddenCondition: boolean = false;

  /**
  * @isHiddenScope: ẩn block phạm vi áp dụng
  * @description: dùng để ẩn block phạm vi áp dụng của mode = 2
  */
  @Input() isHiddenScope: boolean = false;

  //#region Output
  /** Khi danh sách cửa hàng được gọi
  **  return: DTOWarehouse[]
  */
  @Output() getListWareHouse: EventEmitter<DTOWarehouse[]> = new EventEmitter<DTOWarehouse[]>();
  /** Khi đơn vị được gọi 
  **  return: DTOWarehouse[]
  */
  @Output() getListCOPOLApplyScope: EventEmitter<DTOWarehouse[]> = new EventEmitter<DTOWarehouse[]>();
  /** Khi danh sách ngày trong tuần được gọi 
  **  return: DTODayOfWeek[]
  */
  @Output() getListDayOfWeek: EventEmitter<DTODayOfWeek[]> = new EventEmitter<DTODayOfWeek[]>();
  /** Khi danh sách nhóm thẻ được gọi 
  ** return: DTOGroupOfCard[]
  */
  @Output() getListGroupOfCard: EventEmitter<DTOGroupOfCard[]> = new EventEmitter<DTOGroupOfCard[]>();
  /** Khi APIUpdatePromotion được gọi 
  ** return: DTOPromotionProduct
  */
  @Output() valueChange: EventEmitter<DTOPromotionProduct> = new EventEmitter<DTOPromotionProduct>();
  //#endregion

  //#region variable status
  loading = false
  isLockAll = false
  isGroupOfCardDisabled = true
  isGoldenHourDisabled = true
  //#endregion

  //#region variable repository
  listWareHouse: DTOWarehouse[] = []
  listApplyScopeDeparment: DTOWarehouse[] = []
  listApplyScopeChannel: DTOWarehouse[] = []
  listApplyScopeWeb: DTOWarehouse[] = []
  listDayOfWeek: DTODayOfWeek[] = []
  listGroupOfCard: DTOGroupOfCard[] = []
  //#endregion

  //#region permision
  isToanQuyen = false
  isAllowedToCreate = false
  isAllowedToVerify = false
  justLoadedChangePermissionAPI: boolean = true
  justLoaded = true
  actionPerm: DTOActionPermission[] = []
  dataPerm: DTODataPermission[] = []
  //#endregion

  //#region variable DTO
  @Input() curPromotion = new DTOPromotionProduct() // thông tin chương trình khuyến mãi

  //#region unsubcribe
  ngUnsubscribe$ = new Subject<void>();
  //#endregion


  constructor(
    public service: MarketingService,
    public apiService: MarPromotionAPIService,
    public layoutService: LayoutService,
    public layoutApiService: LayoutAPIService,
    public menuService: PS_HelperMenuService,
  ) { }

  ngOnInit(): void {
    let that = this

    //cache
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
    this.arrUnsubscribe.push(a, b)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.curPromotion) {
      this.checkCondition();
    }

  }
  //#region function chung  
  getCache() {
    this.service.getCachePromotionDetail().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        this.curPromotion = res;
        if (this.mode == 1) {
          this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
        } else {
          this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
        }
        this.APIGetPromotionListGroupOfCard() // Lấy danh sách nhóm thẻ
        this.APIGetPromotionDayOfWeek() // Lấy danh sách ngày trong tuần
        this.checkCondition();
      }
    })
  }

  loadData() {
    if (this.mode == 1) {
      this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
    } else {
      this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
    }
    this.APIGetPromotionListGroupOfCard() // Lấy danh sách nhóm thẻ
    this.APIGetPromotionDayOfWeek() // Lấy danh sách ngày trong tuần
    this.checkCondition();
  }

  checkCondition() {
    this.service.getCachePromotionDetail().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        this.curPromotion = res;

        // Kiểm tra điều kiện "Chỉnh sửa"
        this.onCheckPermistion();
      }
    })

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

  // hàm xử lý cập nhật khi chechbox của ĐVAP - NTAP - GV được kích hoạt
  clickCheckbox(ev, prop: string, item: Object) {
    switch (prop) {
      case 'WHName': // Đối với đơn vị áp dụng 
        var wh = item as DTOWarehouse
        if (wh.WH == -1) {
          // this.listWareHouse.map(s => {
          //   if (s.WH != 7 && s.WH != -1) {
          //     s.IsSelected = ev.target.checked
          //     this.APIUpdatePromotionWH(s)
          //   }
          // })
          this.curPromotion.IsAllApplied = ev.target.checked
          this.APIUpdatePromotion(['IsAllApplied'], this.curPromotion)
        } else if (wh.WH == -2) {
          this.curPromotion.IsAllChannelApplied = ev.target.checked
          this.APIUpdatePromotion(['IsAllChannelApplied'], this.curPromotion)
        } else {
          wh.IsSelected = ev.target.checked
          this.APIUpdatePromotionWH(wh)
        }
        break

      case 'GroupName': // Đối với nhóm thẻ áp dụng
        var gr = item as DTOGroupOfCard
        gr.IsSelected = ev.target.checked
        this.APIUpdatePromotionListOfCard(gr)
        break
      case 'DayOfWeek': // Đổi với giờ vàng
        var dow = item as DTODayOfWeek
        dow.IsSelected = ev.target.checked
        this.APIUpdatePromotionDayOfWeek(dow)
        break
      default:
        break
    }
  }

  tempGroupOfCard: DTOGroupOfCard;
  focusGroupOfCard(item: DTOGroupOfCard) {
    this.tempGroupOfCard = { ...item };
  }

  onTextboxLoseFocus(prop: string, item?) {
    if (Ps_UtilObjectService.hasValueString(prop)) {
      if (prop == 'Point') {
        var gr = item as DTOGroupOfCard
        if (this.tempGroupOfCard.Point !== gr.Point) {
          this.APIUpdatePromotionListOfCard(gr)
        }
      }
    }
  }

  tempTimePicker: DTODayOfWeek;
  focusTimePicker(item: DTODayOfWeek) {
    this.tempTimePicker = { ...item }
  }


  onTimePickerChange(prop: string, item?: DTODayOfWeek) {
    const from = JSON.stringify(item[prop]);
    const to = JSON.stringify(item[prop == 'From' ? 'To' : 'From']);
    if (Ps_UtilObjectService.hasValueString(prop) && this.tempTimePicker[prop] !== item[prop] && from !== to) {
      if (prop == 'From' || prop == 'To') {
        let dow = item as DTODayOfWeek
        this.APIUpdatePromotionDayOfWeek(dow)
      }
    } else {
      for (let i = 0; i < this.listDayOfWeek.length; i++) {
        if (this.listDayOfWeek[i].Code === this.tempTimePicker.Code) {
          this.listDayOfWeek[i] = this.tempTimePicker;
          break;
        }
      }
      this.layoutService.onWarning(`Giá trị không hợp lệ vui lòng chọn lại`)
    }
  }

  disableListGroupOfCard() {
    this.listGroupOfCard.forEach(s => {
      if (s.IsSelected) {
        s.IsSelected = false
        this.APIUpdatePromotionListOfCard(s)
      }
    })
  }
  disableListDayOfWeek() {
    this.listDayOfWeek.forEach(s => {
      if (s.IsSelected) {
        s.IsSelected = false
        this.APIUpdatePromotionDayOfWeek(s)
      }
    })
  }


  resetTimeOfDay(dto: DTODayOfWeek) {
    var dow = this.listDayOfWeek.find(s => s.Code == dto.Code && s.IsSelected == dto.IsSelected)

    if (Ps_UtilObjectService.hasValue(dow)) {
      dow.From = null
      dow.To = null
    }
  }


  isCheckboxAllowByPromotionType() {
    // if (this.curPromotionType != null)
    if (Ps_UtilObjectService.hasValue(this.curPromotion.PromotionType))
      // switch (this.curPromotionType.TypeData) {
      switch (this.curPromotion.PromotionType) {
        case 3:// 14://KM Shock
          this.isGoldenHourDisabled = false
          this.isGroupOfCardDisabled = false
          break
        // case 15:
        //   this.isGroupOfCardDisabled = true
        //   this.isGoldenHourDisabled = false
        //   this.disableListGroupOfCard()
        //   break
        case 2://13://KM VIP 
          this.isGoldenHourDisabled = true//cũ
          this.isGroupOfCardDisabled = false
          this.disableListDayOfWeek()
          break
        case 4://11://KM Giờ Vàng 
          this.isGroupOfCardDisabled = true
          this.isGoldenHourDisabled = false
          this.disableListGroupOfCard()
          break
        default://1// 12://KM thường // ẩn hết
          this.isGoldenHourDisabled = true
          this.isGroupOfCardDisabled = true
          this.disableListDayOfWeek()
          this.disableListGroupOfCard()
          break
      }
  }


  defaultPromotionType: DTOPromotionType = new DTOPromotionType(-1, '- Chọn phân nhóm -')
  createNewPromotion() {
    this.curPromotion = new DTOPromotionProduct()
    this.listWareHouse.map(s => {
      s.IsSelected = false
    })

    this.listGroupOfCard.map(s => {
      s.IsSelected = false
      s.Point = 0
    })
    this.listDayOfWeek.map(s => {
      s.IsSelected = false
      s.From = null
      s.To = null
    })

    // Logic cho UI mới
    // Đơn vị áp dụng
    this.listApplyScopeDeparment.map(s => {
      s.IsSelected = false
    })
    // Kênh thương mại điện tử
    this.listApplyScopeChannel.map(s => {
      s.IsSelected = false
    })
    // Website chủ quản
    this.listApplyScopeWeb.map(s => {
      s.IsSelected = false
    })

    this.onCheckPermistion()
    this.isGroupOfCardDisabled = true
    this.isGoldenHourDisabled = true
  }

  onDetermineGiftChange() {
    this.APIUpdatePromotion(['DetermineGift'], this.curPromotion,)
  }
  //#endregion

  //#region API  
  APIGetPromotionListGroupOfCard() {
    this.loading = true;
    var ctx = `Đã xảy ra lỗi khi lấy danh sách nhóm thẻ áp dụng`
    let a = this.apiService.GetPromotionListGroupOfCard(this.curPromotion.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res.StatusCode != 0 && res.ErrorString != null) {
        this.layoutService.onError(`${ctx}: ${res.ErrorString}!`);
      }
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listGroupOfCard = res.ObjectReturn;
        this.listGroupOfCard['disabled'] = true;
        this.getListGroupOfCard.emit(this.listGroupOfCard);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.layoutService.onError(`${ctx}: ${error}`)
    });
    this.arrUnsubscribe.push(a);
  }

  APIUpdatePromotionListOfCard(updateDTO: DTOGroupOfCard) {
    this.loading = true;
    var ctx = "Cập nhật nhóm thẻ áp dụng"
    updateDTO.Promotion = this.curPromotion.Code

    let a = this.apiService.UpdatePromotionListOfCard(updateDTO).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        var group = this.listGroupOfCard.find(s => s.GroupCard == updateDTO.GroupCard)

        if (group != undefined)
          group.Code = res.ObjectReturn.Code

        this.layoutService.onSuccess(`${ctx} thành công`)
        this.getListGroupOfCard.emit(this.listGroupOfCard);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.APIGetPromotionListGroupOfCard();
      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      this.APIGetPromotionListGroupOfCard();
    });
    this.arrUnsubscribe.push(a);
  }

  APIGetPromotionDayOfWeek() {
    this.loading = true;
    var ctx = `Đã xảy ra lỗi khi lấy danh sách ngày trong tuần`
    let a = this.apiService.GetPromotionDayOfWeek(this.curPromotion.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res.ErrorString != null) {
        this.layoutService.onError(`${ctx}: ${res.ErrorString}!`);
      }
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listDayOfWeek = [];
        (res.ObjectReturn as DTODayOfWeek[]).forEach(s => {
          if (Ps_UtilObjectService.hasValueString(s.From))
            s.From = new Date(s.From)

          if (Ps_UtilObjectService.hasValueString(s.To))
            s.To = new Date(s.To)

          this.listDayOfWeek.push(s)
        })
        this.getListDayOfWeek.emit(this.listDayOfWeek);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.layoutService.onError(`${ctx}: ${error}`)
    });
    this.arrUnsubscribe.push(a)
  }

  APIUpdatePromotionDayOfWeek(updateDTO: DTODayOfWeek) {
    this.loading = true;
    var ctx = "Cập nhật Giờ vàng"
    updateDTO.Promotion = this.curPromotion.Code

    let a = this.apiService.UpdatePromotionDayOfWeek(updateDTO).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        var wh = this.listDayOfWeek.find(s => s.Config == updateDTO.Config)

        if (wh != undefined)
          wh.Code = res.ObjectReturn.Code

        this.layoutService.onSuccess(`${ctx} thành công`)
        this.getListDayOfWeek.emit(this.listDayOfWeek);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.resetTimeOfDay(updateDTO)
        this.APIGetPromotionDayOfWeek();
      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      this.resetTimeOfDay(updateDTO)
      this.APIGetPromotionDayOfWeek();
    });
    this.arrUnsubscribe.push(a);
  }

  APIGetPromotionWareHouse() {
    this.loading = true;
    var ctx = `Đã xảy ra lỗi khi lấy danh sách đơn vị áp dụng`
    let a = this.apiService.GetPromotionWareHouse(this.curPromotion.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res.ErrorString != null) {
        this.layoutService.onError(`${ctx}: ${res.ErrorString}!`);
      }
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        var rs = (res.ObjectReturn as DTOWarehouse[])
        this.listWareHouse = []
        this.listWareHouse.unshift(new DTOWarehouse(7, 'Website hachihachi.com.vn', false))
        this.listWareHouse.unshift(new DTOWarehouse(-1, 'Tất cả cửa hàng', false))
        var rsWeb = rs.find(s => s.WH == 7)

        if (rsWeb != undefined) {
          this.listWareHouse[0].Code = rsWeb.Code
          this.listWareHouse[0].Promotion = rsWeb.Promotion
          this.listWareHouse[0].Partner = rsWeb.Partner
          this.listWareHouse[0].IsSelected = rsWeb.IsSelected
        }

        this.listWareHouse.find(s => s.WH == -1).IsSelected = this.curPromotion.IsAllApplied

        rs.forEach(s => {
          if (s.WH != 7 && this.listWareHouse.findIndex(f => f.WH == s.WH) == -1) {
            this.listWareHouse.push(s)
          }
        })

        this.getListWareHouse.emit(this.listWareHouse);
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.layoutService.onError(`${ctx}: ${error}`)
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * Lấy danh sách thông tin phạm vi áp dụng trong chương trình
   * @param promotionCode Code của chương trình khuyến mãi
   * @returns danh sách phạm vi áp dụng
   */
  APIGetListCOPOLApplyScope() {
    this.loading = true;
    var ctx = `Đã xảy ra lỗi khi lấy danh sách đơn vị áp dụng`

    //- Thêm website hachihachi và Tất cả cửa hàng vì db không cung cấp 

    let a = this.apiService.GetListCOPOLApplyScope(this.curPromotion.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      this.loading = false;
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {

        this.listApplyScopeDeparment = [new DTOWarehouse(-1, 'Tất cả cửa hàng', this.curPromotion.IsAllApplied), ...res.ObjectReturn.slice().filter(v => v.TypeData == 0)]
        this.listApplyScopeChannel = [new DTOWarehouse(-2, null, this.curPromotion.IsAllChannelApplied, 'Tất cả kênh'), ...res.ObjectReturn.slice().filter(v => v.TypeData == 1)]
        this.listApplyScopeWeb = res.ObjectReturn.slice().filter(v => v.TypeData == 2)

        this.getListCOPOLApplyScope.emit(res.ObjectReturn);
      } else {
        this.layoutService.onError(`${ctx}: ${res.ErrorString}!`);
      }
    }, (error) => {
      this.loading = false;
      this.layoutService.onError(`${ctx}: ${error}`)
    });
    this.arrUnsubscribe.push(a);
  }

  APIUpdatePromotionWH(updateDTO: DTOWarehouse) {
    this.loading = true;
    var ctx = `Cập nhật ${updateDTO.TypeData == 0 ? 'đơn vị áp dụng' : updateDTO.TypeData == 1 ? 'kênh thương mại' : 'website chủ quản'}`
    updateDTO.Promotion = this.curPromotion.Code
    let a = this.apiService.UpdatePromotionWH(updateDTO).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        var wh = this.listWareHouse.find(s => s.WH == updateDTO.WH)

        if (wh != undefined)
          wh.Code = res.ObjectReturn.Code

        this.layoutService.onSuccess(`${ctx} thành công`)
        this.getListWareHouse.emit(this.listWareHouse);
        this.getListCOPOLApplyScope.emit([...this.listApplyScopeDeparment, ...this.listApplyScopeChannel, ...this.listApplyScopeWeb]);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        if (this.mode == 1) {
          this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
        } else {
          this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
        }

      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;
      if (this.mode == 1) {
        this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
      } else {
        this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
      }
    });
    this.arrUnsubscribe.push(a);
  }

  APIUpdatePromotion(properties: string[], promotion: DTOPromotionProduct = this.curPromotion) {
    this.loading = true;
    var updateDTO = {
      "DTO": promotion,
      "Properties": properties
    }
    var ctx = "Cập nhật cơ sở xác định quà tặng"
    let a = this.apiService.UpdatePromotion(updateDTO).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        if (this.mode == 1) {
          this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
        } else if (properties[0] == 'IsAllApplied' || properties[0] == 'IsAllChannelApplied') {
          this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
        }
        this.getListWareHouse.emit(this.listWareHouse);
        this.getListCOPOLApplyScope.emit([...this.listApplyScopeDeparment, ...this.listApplyScopeChannel, ...this.listApplyScopeWeb]);
        this.valueChange.emit(this.curPromotion)
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        if (this.mode == 1) {
          this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
        } else if (properties[0] == 'IsAllApplied' || properties[0] == 'IsAllChannelApplied') {
          this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
        }

      }
      this.loading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.loading = false;

      // Nếu cập nhật IsAllApplied thất bại thì phải set lại giá trị cũ
      if (properties.includes('IsAllApplied')) {
        this.curPromotion.IsAllApplied = !this.curPromotion.IsAllApplied;
      }

      // Nếu cập nhật IsAllChannelApplied thất bại thì phải set lại giá trị cũ
      if (properties.includes('IsAllChannelApplied')) {
        this.curPromotion.IsAllChannelApplied = !this.curPromotion.IsAllChannelApplied;
      }

      if (this.mode == 1) {
        this.APIGetPromotionWareHouse(); // Lấy danh sách cửa hàng
      } else if (properties[0] == 'IsAllApplied' || properties[0] == 'IsAllChannelApplied') {
        this.APIGetListCOPOLApplyScope() // Lấy danh sách phạm vi áp dụng 
      }
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
  isToggleBlockScope = false;
  isToggleBlockCondition = false;
  toggleSection(valiableName: string) {
    this[valiableName] = !this[valiableName];
  }
}