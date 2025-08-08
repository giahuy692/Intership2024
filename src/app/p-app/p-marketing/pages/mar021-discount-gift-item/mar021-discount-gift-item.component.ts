import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CompositeFilterDescriptor, distinct, State } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs, GridComponent } from '@progress/kendo-angular-grid';
import { greaterOrEqualIcon, plusIcon, searchIcon, trashIcon } from '@progress/kendo-svg-icons';
import { MenuDataItem, ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { PKendoGridComponent } from 'src/app/p-app/p-layout/components/p-kendo-grid/p-kendo-grid.component';
import DTOPromotionProduct, { DTOCOLPromotionGiftCus, DTOCOPOLPromotionRangeCus, DTODayOfWeek, DTOGroupOfCard, DTOPromotionDetail } from '../../shared/dto/DTOPromotionProduct.dto';
import { MarPromotionInforComponent } from '../../shared/components/mar-discount-infor/mar-promotion-infor.component';
import { MarConditionApplyComponent } from '../../shared/components/mar-condition-apply/mar-condition-apply.component';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { DTOResponse, Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/operators';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { race, range, Subject, Subscription } from 'rxjs';
import { MarPromotionAPIService } from '../../shared/services/marpromotion-api.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOWarehouse } from 'src/app/p-app/p-ecommerce/shared/dto/DTOWarehouse';
import { MarketingService } from '../../shared/services/marketing.service';
import DTOListProp_ObjReturn from '../../shared/dto/DTOListProp_ObjReturn.dto';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { MarBannerAPIService } from '../../shared/services/marbanner-api.service';
import { MarNewsProductAPIService } from '../../shared/services/marnewsproduct-api.service';
@Component({
  selector: 'app-mar021-discount-gift-item',
  templateUrl: './mar021-discount-gift-item.component.html',
  styleUrls: ['./mar021-discount-gift-item.component.scss']
})
export class Mar021DiscountGiftItemComponent implements OnInit, OnDestroy {
  @ViewChild('promotionInfor') promotionInforRef: MarPromotionInforComponent;
  @ViewChild('conditionApply') conditionApplyRef: MarConditionApplyComponent;
  @ViewChild('myCustomGrid') myCustomGrid: PKendoGridComponent;

  //Variable
  isLockAll: boolean = false // LockUI
  isLoadingAll: boolean = false // Loadind lớn ngoài cùng
  loadingDialog: boolean = false

  //Block 1
  curPromotion: DTOPromotionProduct = new DTOPromotionProduct() // Promotion hiện tại
  curPromotionDetail: DTOPromotionDetail = new DTOPromotionDetail() // 

  curDataProduct: DTOPromotionDetail = new DTOPromotionDetail() // Product hiện đang đang focus
  isObligatory: boolean = true

  deleteDialogOpened: boolean = false // Dialog
  contextIndex: number = 1
  context: string[] = ["Chương trình", "Sản phẩm Khuyến mãi", "Giá trị Nhóm hàng"]

  //#region drawer variable
  isOpenDrawer: boolean = false
  isFilterActive: boolean = true


  //grid
  @ViewChild('myCustomGrid') diCustomGridRef!: PKendoGridComponent;
  isLoading: boolean = false

  onPageChangeCallback: Function;
  onActionDropDownClickCallback: Function;
  getActionDropdownCallback: Function;
  onSelectedPopupBtnCallback: Function
  getSelectionPopupCallback: Function
  onSelectCallback: Function
  onSortChangeCallback: Function

  onSelectCallbackDialog: Function

  typeMasterDetail: number = 0;
  selectable: SelectableSettings = { enabled: true, mode: 'multiple', drag: false, checkboxOnly: true }; // Setting for selection of grid

  //kendo icon
  icons = { trash: trashIcon, greaterOrEqualIcon: greaterOrEqualIcon, plusIcon: plusIcon, searchIcon: searchIcon }

  //page grid
  pageSize: number = 25; // pageSize in start
  gridState: State = { skip: null, take: null, filter: { logic: 'and', filters: [] }, sort: [{ "field": "OrderBy", "dir": "asc" }] } // State
  gridStateSearch: State = { skip: null, take: null, filter: { logic: 'and', filters: [] }, sort: [{ "field": "OrderBy", "dir": "asc" }] } // State
  pageSizes: number[] = [25, 50, 75, 100]; // list pagesize
  expandedRow: any

  currenTabOpen: number = 0
  itemCurrentSelected: any

  listCodeExpand: any[] = []

  listCOPOLApplyScope: DTOWarehouse[] = []
  listDayOfWeek: DTODayOfWeek[] = []
  listGroupOfCard: DTOGroupOfCard[] = []
  listHamper: DTOPromotionDetail[] = []
  ListActionCreate = []

  parentItemDeleted: DTOPromotionDetail = new DTOPromotionDetail()
  indexItemDeleted: number = 0
  indexGiftRange: number = 0

  isRequestExpand: boolean = false

  //Permision
  justLoaded: boolean = true
  justLoadedChangePermissionAPI: boolean = true
  actionPerm: DTOActionPermission[] = []
  dataPerm: DTODataPermission[] = []

  isToanQuyen: boolean = false;
  isAllowedToCreate: boolean = false;
  isAllowedToVerify: boolean = false;
  isCallOnlyListHamper: boolean = true;

  //Loading
  isloadingBlock1: boolean = false
  isLoadingBlock2: boolean = false
  isLoadingBlock3: boolean = false

  //#region variable grid
  isFilterDisable: boolean = false

  gridStateProduct: State =
    {
      skip: 1,
      take: 25,
      filter: { logic: 'and', filters: [] },
      sort: [{ "field": "OrderBy", "dir": "asc" }]
    } // State


  filterSearchProduct: CompositeFilterDescriptor = { logic: 'or', filters: [] } // Filter search
  listProductDetail: GridDataResult
  listProductDetailFilter: GridDataResult = {
    data: [] as DTOPromotionDetail[], // Ép kiểu `data` thành danh sách DTO
    total: 0
  };


  isShowMasterDetail: boolean = false

  /**
   * Hàm sử dụng để kiểm tra xem data có thay đổi hay không
   */
  isChangeDataList: boolean = false


  //#region unsubcribe
  arrSub: Subscription[] = [];
  destroy$ = new Subject<void>();

  //#region variable Drawer
  barcode: string = ""

  // 0 add, 1 update
  actionDrawer: boolean = false

  /**
   * 0 add gift in to product, 1 add gift into range
   */
  typeAddGift: number = 0
  currentIndexRange: number = 0

  filterListGift: DTOCOLPromotionGiftCus[] = []
  filterListRange: DTOCOPOLPromotionRangeCus[] = []

  //#region variable dialog
  isOpenDialog: boolean = false
  listProduct: DTOCOLPromotionGiftCus[] = []
  searchKeyDialog: string = ''
  listProductTemp: DTOCOLPromotionGiftCus[] = []
  listProductTempOrigion: DTOCOLPromotionGiftCus[] = []
  listProductSelected: DTOCOLPromotionGiftCus[] = []

  curentTabOpenDrawer: number = null
  itemCurrentSelectedDrawer: any

  isViewProduct: boolean = false

  lastAddedItem: any = null

  excelValid: boolean = true;
  pickFileCallback: Function
  GetFolderCallback: Function

  uploadEventHandlerCallback: Function // Function callback to import list policy task

  isCloseTab: boolean = false


  isComfirmDeleteGift: boolean = false
  itemGiftDelete: DTOPromotionDetail[] = []

  //#region constructor
  constructor(
    public service: MarketingService,
    public apiMarService: MarPromotionAPIService,
    public MarServiceAPI: MarNewsProductAPIService,
    public layoutService: LayoutService,
    public marService: MarBannerAPIService,
    // public layoutApiService: LayoutAPIService,
    public menuService: PS_HelperMenuService,
  ) { }

  ngOnInit(): void {
    //Get Callbacl grid
    this.uploadEventHandlerCallback = this.uploadEventHand.bind(this);
    this.onSelectCallback = this.handleGridItemSelect.bind(this)
    this.getActionDropdownCallback = this.onGetActionDropdown.bind(this)
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this)
    this.onActionDropDownClickCallback = this.onActionDropdownClick.bind(this)
    this.onSelectedPopupBtnCallback = this.onSelectedPopupBtnClick.bind(this)
    this.onPageChangeCallback = this.handlePageChange.bind(this)
    this.onSelectCallbackDialog = this.handleGridItemSelectDialog.bind(this)


    let that = this
    //cache Phân quyền
    this.menuService.changePermission().pipe(takeUntil(this.destroy$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")

        that.isToanQuyen = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        that.isAllowedToCreate = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        that.isAllowedToVerify = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

        that.dataPerm = distinct(res.DataPermission, "Warehouse")
        this.APIGetListCOLSGift()
        // this.getCache()
      }
    })

    // Load API
    this.menuService.changePermissionAPI().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        that.APIGetListCOPOLPromotionGiftType()
      }
    })

    //Call back folder
    this.pickFileCallback = this.pickFile.bind(this)
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)

  }



  // Hàm load lại trang
  onLoadPage() {
    if (this.curPromotion.Code != 0) {
      this.promotionInforRef.loadData();
      this.conditionApplyRef.loadData();
      this.APIGetListCOPOLPromotionGiftProduct()
    }
  }

  //Get ACtion grid
  onGetActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOPromotionDetail) {
    moreActionDropdown = []
    var item: DTOPromotionDetail = dataItem
    var statusID = item.StatusID;

    if (this.isToanQuyen || this.isAllowedToVerify || this.isAllowedToCreate) {
      if (
        (this.curPromotion.StatusID === 0 || this.curPromotion.StatusID === 4) &&
        (this.isToanQuyen || this.isAllowedToCreate)
      ) {
        moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true });
      } else if (
        (this.curPromotion.StatusID === 1 || this.curPromotion.StatusID === 2) &&
        (this.isToanQuyen || this.isAllowedToVerify)
      ) {
        moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true });
      } else {
        moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Link: "detail", Actived: true });
      }
    }

    //status
    // if (this.isToanQuyen || this.isAllowedToVerify) {
    if (this.curPromotion.StatusID == 2 && (this.isToanQuyen || this.isAllowedToVerify)) {
      if (statusID != 2) {
        moreActionDropdown.push({ Name: "Áp dụng", Code: "redo", Link: "1", Actived: true })
      }
      else {
        moreActionDropdown.push({ Name: "Ngưng áp dụng", Code: "minus-outline", Link: "2", Actived: true })
      }
    }
    // }
    //delete
    if (
      ((this.curPromotion.StatusID === 0 || this.curPromotion.StatusID === 4) && (this.isAllowedToCreate || this.isToanQuyen)) ||
      (this.curPromotion.StatusID === 1 && (this.isAllowedToVerify || this.isToanQuyen))
    ) {
      moreActionDropdown.push({ Name: "Xóa sản phẩm", Code: "trash", Link: "delete", Actived: true });
    }

    return moreActionDropdown
  }

  //Popup action click
  onActionDropdownClick(menu: MenuDataItem, item: DTOPromotionDetail) {
    if (item.Code != 0) {
      if (menu.Link == 'delete' || menu.Code == 'trash') {
        this.itemGiftDelete = [item]
        this.isComfirmDeleteGift = true

        // this.APIDeleteCOPOLPromotionGiftProduct([item])
      }
      else if (menu.Code == 'redo' || menu.Code == 'minus-outline') {
        let statusID = 0
        if (menu.Code == 'redo') {
          statusID = 2
        } else if (menu.Code == 'minus-outline') {
          statusID = 3
        }
        this.curDataProduct = { ...item }
        this.curDataProduct.StatusID = parseInt(menu.Link)
        this.APIUpdateCOPOLPromotionGiftProductStatus([this.curDataProduct], statusID)
      }
      else if (menu.Link == 'edit' || menu.Code == 'pencil'
        || menu.Code == "eye" || menu.Link == 'detail') {
        if (menu.Code == 'eye' || menu.Link == 'detail') {
          this.isViewProduct = true
        } else {
          this.isViewProduct = false
        }
        this.curDataProduct = JSON.parse(JSON.stringify(item));
        this.handleOpenDrawer()
      }
    }
  }

  /**
* Hàm set giá trị để nhận biết chọn nhiều item cho việc disable
* @param isSelected 
*/
  handleGridItemSelect(isSelected) {
    // this.isFilterDisable = !isSelected


    //Code bổ sung cho disable khi chọn checkbox
    if (!Ps_UtilObjectService.hasValue(isSelected)) {
      this.isFilterDisable = false
      return
    }

    if (isSelected.length > 0) {
      this.isFilterDisable = true;
    } else {
      this.isFilterDisable = false
    }

  }


  handleGridItemSelectDialog(isSelected) {
    if (!Ps_UtilObjectService.hasValue(isSelected)) {
      this.listProductSelected = []
      return
    }

    this.listProductSelected = isSelected
  }

  /**
* Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
* @param arrItem 
* @returns MenuDataItem[]
*/
  getSelectionPopupAction(selectedList: DTOPromotionDetail[]) {
    var moreActionDropdown = new Array<MenuDataItem>()
    if (this.isAllowedToVerify) {
      if (selectedList.findIndex(s => s.StatusID == 3) != -1 && this.curPromotion.StatusID == 2)
        moreActionDropdown.push({
          Name: "Áp dụng", Type: "StatusID",
          Code: "check-outline", Link: "2", Actived: true
        })

      if (selectedList.findIndex(s => s.StatusID == 2) != -1 && this.curPromotion.StatusID == 2)
        moreActionDropdown.push({
          Name: "Ngưng áp dụng", Type: "StatusID",
          Code: "minus-outline", Link: "3", Actived: true
        })
    }
    if (((this.curPromotion.StatusID === 0 || this.curPromotion.StatusID === 4) && (this.isAllowedToCreate || this.isToanQuyen)) ||
      (this.curPromotion.StatusID === 1 && (this.isAllowedToVerify || this.isToanQuyen)))
      moreActionDropdown.push({
        Name: "Xóa sản phẩm", Type: "delete",
        Code: "trash", Link: "delete", Actived: true
      })

    return moreActionDropdown
  }

  onSelectedPopupBtnClick(btnType: string, list: DTOPromotionDetail[], value: any) {
    ;
    if (list.length > 0) {

      if (btnType == "StatusID") {
        let arr = []
        //áp dụng
        if (value == 2 || value == '2') {
          list.forEach(s => {
            if (s.StatusID == 3) {
              s.StatusID = 3
              s.Promotion = this.curPromotion.Code
              arr.push(s)
            }
          })
        }//ngưng áp dụng 
        else {
          list.forEach(s => {
            if (s.StatusID == 2) {
              s.StatusID = 2
              s.Promotion = this.curPromotion.Code
              arr.push(s)
            }
          })
        }

        if (arr.length > 0)
          this.APIUpdateCOPOLPromotionGiftProductStatus(arr, value)
      }
      else if (btnType == "delete") {
        if (this.curPromotion.StatusID == 0) {
          let arr = []
          list.forEach(s => {
            arr.push(s)
          })
          if (arr.length > 0){
            // this.APIDeleteCOPOLPromotionGiftProduct(arr)
            this.isComfirmDeleteGift = true
            this.itemGiftDelete = arr
          }
        }
      }
    }
  }



  /**
   * HÀm thực hiện khi thay đổi trang
   * @param event 
   */
  handlePageChange(event: PageChangeEvent) {
    this.pageSize = event.take;
    this.gridStateProduct.skip = event.skip;
    this.gridStateProduct.take = event.take;
    this.handleLoadFilterProduct();
  }
  //Function

  /**
   *  get value search product in grid get
   * @param event 
   */
  handleSearchProduct(event: any) {
    if (!Ps_UtilObjectService.hasValueString(event.filters[0]?.value)) {
      this.filterSearchProduct.filters = [];
    }
    else {
      this.filterSearchProduct.filters = event.filters;
    }
    this.resetState()
    this.handleLoadFilterProduct();
  }

  /**
   * push filter search and call API
   */
  handleLoadFilterProduct() {
    this.gridStateProduct.filter.filters = [];
    // Filter tìm kiếm
    if (Ps_UtilObjectService.hasListValue(this.filterSearchProduct.filters)) {
      this.gridStateProduct.filter.filters.push(this.filterSearchProduct);
    }
    // Filter Code Bảng công việc
    this.APIGetListCOPOLPromotionGiftProduct();
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  isVisible(value: string) {
    if (this.isViewProduct) {
      return false
    } else {
      return true
    }

  }

  /**
   * import excel
   */
  onImportExcel() {
    this.layoutService.setImportDialog(true);
    this.layoutService.setExcelValid(true);
  }

  /**
   * export excel
   */
  onExportExcel() {
    this.APIExportExcelPromotionGiftProduct()
  }


  //Function Black Info  - Block 1
  //- create array button UpdateStatus
  listActionStatus: { text: string, class: string, code: string, link?: number, type?: string }[] = [];
  /**
  * Lấy danh sách các action chuyển tình trạng
  * @param value danh sách các action chuyển tình trạng
  */
  onGetListActionPromotion(value: { text: string, class: string, code: string, link?: number, type?: string }[]) {
    this.listActionStatus = value;
  }

  //header1
  /**
   * Hàm xử lý cập nhật trạng thái của chương trình khi người dùng bấm vào các action
   * @param item là thông tin cần được cập nhật trạng thái
   */
  onUpdatePromotionStatus(item: any) {
    this.curPromotion.ImageSetting2 = Ps_UtilObjectService.removeImgRes(this.curPromotion.ImageSetting2)
    this.curPromotion.ImageSetting1 = Ps_UtilObjectService.removeImgRes(this.curPromotion.ImageSetting1)
    var newPro = { ...this.curPromotion }
    // newPro.StatusID = statusID
    //check trước khi áp dụng

    if ((this.isAllowedToCreate || this.isToanQuyen) && item.statusID == 1
      || (this.isAllowedToVerify || this.isToanQuyen) && item.statusID == 2) {
      if (!Ps_UtilObjectService.hasValueString(newPro.PromotionNo))
        this.layoutService.onError('Vui lòng nhập Mã khuyến mãi')
      else if (!Ps_UtilObjectService.hasValueString(newPro.VNPromotion))
        this.layoutService.onError('Vui lòng nhập Tên chương trình khuyến mãi')
      else if (!Ps_UtilObjectService.hasValue(newPro.PromotionType))
        this.layoutService.onError('Vui lòng chọn Phân nhóm khuyến mãi')
      else if (!Ps_UtilObjectService.hasValueString(newPro.StartDate))
        this.layoutService.onError('Vui lòng chọn Ngày bắt đầu cho Thời gian hiệu lực')
      else if (!Ps_UtilObjectService.hasValueString(newPro.EndDate))
        this.layoutService.onError('Vui lòng chọn Ngày kết thúc cho Thời gian hiệu lực')
      else if (!Ps_UtilObjectService.hasValue(this.listCOPOLApplyScope.find(s => s.IsSelected)))
        this.layoutService.onError('Vui lòng chọn Phạm vi áp dụng')
      // else if (!Ps_UtilObjectService.hasValue(this.listCOPOLApplyScope.find(s => s.IsSelected)))
      //   this.layoutService.onError('Vui lòng chọn Đơn vị áp dụng')
      else if (!Ps_UtilObjectService.hasValueString(newPro.VNSummary))
        this.layoutService.onError('Vui lòng nhập Mô tả chương trình khuyến mãi')
      // else if ((!this.isGroupOfCardDisabled || this.curPromotion.PromotionType == 3) && !Ps_UtilObjectService.hasValue(this.listGroupOfCard.find(s => s.IsSelected == true)))
      //   this.layoutService.onError('Vui lòng chọn Nhóm thẻ áp dụng')
      // else if (!this.isGoldenHourDisabled && !Ps_UtilObjectService.hasValue(this.listDayOfWeek.find(s => s.IsSelected == true)))
      //   this.layoutService.onError('Vui lòng chọn Ngày trong tuần cho Giờ vàng')
      //nếu có ngày được chọn mà không ghi thời gian  
      else if (this.listDayOfWeek.find(s => (!Ps_UtilObjectService.hasValue(s.From) || (!Ps_UtilObjectService.hasValue(s.To))
      ) && s.IsSelected) != undefined) {
        this.layoutService.onError('Vui lòng chọn Từ (giờ), Đến (giờ) cho Ngày trong tuần')
      }
      else if (!Ps_UtilObjectService.hasListValue(this.listProductDetail.data))
        this.layoutService.onError('Vui lòng Thêm Sản phẩm Khuyến mãi')
      else if (!this.checkGiftTypeValidation()) {
        this.layoutService.onError('Vui lòng kiểm tra lại danh sách sản phẩm')
      }
      else
        // this.p_UpdatePromotion(['StatusID'], newPro)
        // this.p_onUpdatePromotionStatus([newPro], item.statusID)
        this.promotionInforRef.onUpdatePromotionStatus(item)
    } else if (item.type == 'delete') {
      this.onDeletePromotion();
    } else if (item.type == 'new') {
      this.onResetData();
    } else {
      this.promotionInforRef.onUpdatePromotionStatus(item)
    }

  }

  /**
   * Check list product before send or approve event
   * @returns 
   */
  checkGiftTypeValidation(): boolean {
    if (!this.listProductDetail || this.listProductDetail.data.length === 0) return false;

    return this.listProductDetail.data.every(product => {
      if (product.GiftType === 0) {
        // Kiểm tra ListGift phải có ít nhất một phần tử
        return product.ListGift && product.ListGift.length > 0;
      } else {
        // Kiểm tra ListRange và ListGift trong ListRange
        return product.ListRange &&
          product.ListRange.length > 0 &&
          product.ListRange.every(range => range.ListGift && range.ListGift.length > 0);
      }
    });
  }



  /**
   * Lấy thông tin chương trình
   * @param value thông tin chương trình
   */
  onGetPromotion(value: DTOPromotionProduct) {
    this.curPromotion = value;
    if (Ps_UtilObjectService.hasValue(this.conditionApplyRef)) {
      this.conditionApplyRef.curPromotion = this.curPromotion;
      this.conditionApplyRef.isCheckboxAllowByPromotionType();
      this.conditionApplyRef.checkCondition();
    }
    if (value.Code !== 0 && this.isCallOnlyListHamper) {
      this.isCallOnlyListHamper = false;
      this.onLoadFilter();
    }
    this.onCheckPermistion();

    if (this.curPromotion.Code == 0) {
      this.onCreateNewPromotion()
    }
  }

  onDeletePromotion() {
    this.contextIndex = 0
    this.deleteDialogOpened = true
  }

  onDeleteDetail(obj: DTOPromotionDetail) {
    this.contextIndex = 1
    this.curPromotionDetail = { ...obj };
    this.deleteDialogOpened = true
  }

  onCloseDeleteDialog() {
    this.deleteDialogOpened = false
  }

  onCloseDeleteGift(){
    this.isComfirmDeleteGift = false
  }

  delete() {
    if (this.contextIndex == 0) {
      this.promotionInforRef.APIDeletePromotion()
      this.deleteDialogOpened = false;
      this.onResetData();
    }
    else if (this.contextIndex == 1) {
      this.APIDeletePromotionDetail();
    }
  }

  deleteGift(){
    this.APIDeleteCOPOLPromotionGiftProduct(this.itemGiftDelete)
  }

  /**
   * Hàm reset data khi người dùng bấm thêm mới
   */
  onResetData() {
    let temp = JSON.parse(JSON.stringify(this.curPromotion))
    this.curPromotion = new DTOPromotionProduct()
    this.curPromotion.TypeData = 4
    this.curPromotion.Category = Ps_UtilObjectService.hasValue(this.currentTaoMoi) ? this.currentTaoMoi.Code : temp.Category
    this.curPromotion.CategoryName = Ps_UtilObjectService.hasValue(this.currentTaoMoi) ? this.currentTaoMoi.PromotionType : temp.CategoryName
    this.curPromotion.PromotionType = 1
    this.curPromotion.PromotionTypeName = 'KM Thường'
    this.curPromotion.DetermineGift = 0
    this.curPromotion.StartDate = new Date()
    this.curPromotion.EndDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
    this.service.setCachePromotionDetail(this.curPromotion)

    if (Ps_UtilObjectService.hasValue(this.conditionApplyRef)) {
      this.conditionApplyRef.createNewPromotion();
    }
    this.promotionInforRef.createNewPromotion(this.curPromotion);
    this.listProductDetailFilter.data = []
    this.listProductDetail.data = []
  }

  currentTaoMoi: { PromotionType: string, Code: number } = null

  /**
   * Hàm xử lý khi bấm chọn loại chương trình tạo mới 
   * @param item loại chương trình muốn tạo
   */
  onBtnDropdownlistClick(item: { PromotionType: string, Code: number }) {
    this.currentTaoMoi = item
    this.onResetData();
    this.openPromotionDetail()
  }

  /**
     * Hàm mở trang chi tiết khuyến mãi
     * @param link URL
     * @param isAdd true: tạo mới, false: chỉnh sửa
     */
  openPromotionDetail() {
    let link = ''
    this.menuService.changeModuleData().pipe(takeUntil(this.destroy$)).subscribe((item: ModuleDataItem) => {

      var prom = new DTOPromotionProduct()
      prom.TypeData = 4
      prom.Category = this.currentTaoMoi.Code
      prom.CategoryName = this.currentTaoMoi.PromotionType
      prom.PromotionType = 1
      prom.PromotionTypeName = 'KM Thường'
      prom.DetermineGift = 0
      prom.StartDate = new Date()
      prom.EndDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
      this.service.setCachePromotionDetail(prom)
      link = (this.currentTaoMoi.Code == 15 || this.currentTaoMoi.PromotionType == 'Quà tặng theo sản phẩm') ? 'mar021-discount-gift-item'
        : (this.currentTaoMoi.Code == 16 || this.currentTaoMoi.PromotionType == 'Quà tặng theo nhóm sản phẩm') ? 'mar021-discount-gift-group'
          : 'mar021-discount-gift-order'


      var parent = item.ListMenu.find(f => f.Code.includes('discount-product')
        || f.Link.includes('discount-product'))

      if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
        var detail = parent.LstChild.find(f => f.Code.includes('mar021-discount-gift-list')
          || f.Link.includes('mar021-discount-gift-list'))

        if (Ps_UtilObjectService.hasValue(detail) && Ps_UtilObjectService.hasListValue(detail.LstChild)) {
          var detail2 = detail.LstChild.find(f => f.Code.includes(link)
            || f.Link.includes(link))

          this.menuService.activeMenu(detail2)
        }
      }
    })
  }



  /**
   * Load filter grid
   */
  onLoadFilter() {
    this.gridStateProduct = {
      skip: 0, // Giá trị mặc định, có thể thay đổi theo trang hiện tại
      take: this.pageSize,
      filter: {
        logic: 'and',
        filters: []
      }
    };

    this.APIGetListCOPOLPromotionGiftProduct()
  }



  onCheckPermistion() {
    // const canCreateOrAdmin = this.isAllowedToCreate || this.isToanQuyen;
    // const canVerify = this.isAllowedToVerify || this.isToanQuyen;
    // const statusID = this.curPromotion.StatusID;

    // // Kiểm tra điều kiện "Chỉnh sửa"
    // if (canCreateOrAdmin && (statusID == 0 || statusID == 4) || canVerify && statusID == 1) {
    //   this.isLockAll = false; // Cho phép chỉnh sửa
    // } else {
    //   this.isLockAll = true; // Bị disabled
    // }
  }


  onCreateNewPromotion() {

    // this.curPromotionDetail = new DTOPromotionDetail()
    // this.curPromotion.TypeData = 3
    // //array
    // this.listHamper = []
    // this.gridDSView.next({ data: [], total: 0 })
    // this.gridView.next({ data: [], total: 0 })

    // //bool
    // this.isLockAll = false
    // this.isFilterActive = true
    // this.isAdd = true
    // this.isAddDetail = false
    // this.expanded = true;
  }


  //Function Black Apply  - Block 2

  /**
 * Lấy danh sách danh sách đơn vị áp dụng
 * @param value danh sách đơn vị áp dụng
 */
  onGetListCOPOLApplyScope(value: DTOWarehouse[]) {
    this.listCOPOLApplyScope = value;
  }

  /**
   * Lấy danh sách Nhóm thẻ áp dụng
   * @param value Danh sách Nhóm thẻ áp dụng
   */
  onGetListGroupOfCard(value: DTOGroupOfCard[]) {
    this.listGroupOfCard = value;
  }

  /**
   * Lấy danh sách ngày trong tuần
   * @param value Danh sách ngày trong tuần
   */
  onGetListDayOfWeek(value: DTODayOfWeek[]) {
    this.listDayOfWeek = value;
  }


  /**
   * set Current Tab Panel Open in Grid
   * @param value 
   * @param item 
   */
  setCurrentTabOpenPanel(value: number, item: any) {
    this.currenTabOpen = value
    this.itemCurrentSelected = item
  }

  /**
   * set Current Tab Panel Open in Drawer
   * @param value 
   * @param item 
   */
  setCurrentTabOpenPanelDrawer(value: number, item: any) {
    this.curentTabOpenDrawer = value
    this.itemCurrentSelectedDrawer = item
  }

  /**
   * get event close Panel
   */
  handleCollapsePanelDrawer() {
    this.curentTabOpenDrawer = null
    this.itemCurrentSelectedDrawer = null
  }

  getDataExpand(event: any) {
    this.expandedRow = event
  }


  //#region grid

  /**
   * Check show button add
   * @returns 
   */
  checkShowButtonAddProduct(): boolean {
    if (!this.curPromotion) return false; // Kiểm tra tránh lỗi nếu `curPromotion` chưa được gán

    switch (this.curPromotion.StatusID) {
      case 0:
      case 4:
        return this.isAllowedToCreate || this.isToanQuyen;

      case 1:
        return this.isAllowedToVerify || this.isToanQuyen;

      case 2:
      case 3:
        return false;

      default:
        return false;
    }
  }


  /**
   * Get Expand master detail
   * @param row 
   * @param dataItem 
   */
  onExpandDetail(row: number, dataItem: any) {
    this.isRequestExpand = false
    this.listCodeExpand.push(dataItem.Code)
    this.diCustomGridRef.onExpand(row)
  }

  /**
   * get Collapse Master detail
   * @param row 
   * @param dataItem 
   */
  onCollapseDetail(row: number, dataItem: any) {
    const index = this.listCodeExpand.findIndex(item => item == dataItem.Code)
    if (index != -1) {
      this.listCodeExpand.splice(index, 1)
    }
    this.diCustomGridRef.onCollapse(row)
  }

  /**
   * Check show button expand or collapse
   * @param dataItem 
   * @returns 
   */
  checkShowButtonExpand(dataItem: any) {
    if (this.isRequestExpand) {
      this.listCodeExpand = []
      return false
    }

    const index = this.listCodeExpand.findIndex(item => item == dataItem.Code)
    if (index != -1) {
      return true
    } else {
      return false
    }
  }

  /**
   * Get TypeName binding
   * @param type 
   * @returns 
   */
  getTypeName(type: number) {
    if (type == 0) {
      return "Quà tặng cùng loại"
    } else if (type == 1) {
      return "Quà tặng theo hạng mức"
    } else {
      return "Không có giá trị"
    }
  }

  /**
   * Delete PromotionGift
   * @param ParentItem 
   * @param index 
   * @param gift 
   * @param indexGiftRange 
   */
  handleDeletePromotionGift(ParentItem?: DTOPromotionDetail, index?: number, gift?: DTOCOLPromotionGiftCus, indexGiftRange?: number) {
    this.parentItemDeleted = ParentItem
    this.indexItemDeleted = index
    this.indexGiftRange = indexGiftRange
    if (gift.Code != 0) {
      this.curDataProduct = ParentItem
      this.isChangeDataList = true
      this.APIDeleteCOPOLPromotionGift(gift)
    }
  }

  /**
   * Delete Range
   * @param data 
   */
  handleDeleteRangeGird(data: DTOCOPOLPromotionRangeCus) {
    if (data.Code) {
      this.APIDeleteListCOPOLPromotionRange(data)
    }
  }

  //#region drawer

  /**
   * Check value when add new range
   * @param index 
   * @returns 
   */
  checkRange(index: number) {
    const listRange = this.curDataProduct.ListRange;
    if (!listRange || listRange.length === 0) return;
  
    const currentValue = listRange[index].Range;
  
    if (currentValue <= 0) {
      this.layoutService.onWarning("Số lượng hạn mức phải lớn hơn 0!");
      this.curDataProduct.ListRange[index].Range = 0;
      return;
    }
  
    // Kiểm tra trùng giá trị Range (bỏ qua chính nó + item đã xóa)
    const isDuplicate = listRange.some(
      (item, i) => i !== index && item.Range === currentValue && item.IsDelete === false
    );
  
    if (isDuplicate) {
      this.layoutService.onWarning("Số lượng hạn mức đã tồn tại!");
      this.curDataProduct.ListRange[index].Range = 0;
      return;
    }
  
    // Sắp xếp danh sách: các item chưa bị xóa (IsDelete = false) tăng dần theo Range, sau đó là item bị xóa
    const activeItems = listRange.filter(item => !item.IsDelete).sort((a, b) => a.Range - b.Range);
    const deletedItems = listRange.filter(item => item.IsDelete);
  
    this.curDataProduct.ListRange = [...activeItems, ...deletedItems];
  
    // Cập nhật lại danh sách hiển thị
    this.filterListRange = JSON.parse(JSON.stringify(activeItems));
  }
  


  /**
   * Check name and rang of range
   * @returns 
   */

  checkMissingNameOrRange(): boolean {
    return this.curDataProduct.ListRange.some(item => !item.Name || item.Range == 0);
  }


  /**
   * Delete Range
   * @param data 
   */
  handleDeleteRangeDrawer(data: DTOCOPOLPromotionRangeCus) {
    if (data.Code) {
      // Đánh dấu IsDelete và cập nhật ListGift
      this.curDataProduct.ListRange = this.curDataProduct.ListRange.map((item) => {
        if (item.Code === data.Code) {
          item.IsDelete = true;
  
          if (item.ListGift && Array.isArray(item.ListGift)) {
            item.ListGift.forEach(gift => {
              gift.IsDelete = true;
            });
          }
        }
        return item;
      });
  
      // Sắp xếp lại: item IsDelete được đẩy xuống cuối
      this.curDataProduct.ListRange = [
        ...this.curDataProduct.ListRange.filter(item => !item.IsDelete),
        ...this.curDataProduct.ListRange.filter(item => item.IsDelete)
      ];
  
      // Cập nhật lại filterListRange
      this.filterListRange = this.curDataProduct.ListRange.filter(item => !item.IsDelete);
    } else {
      // Trường hợp item chưa có Code (item mới thêm)
      const index = this.curDataProduct.ListRange.findIndex(
        (item) => item.Name === data.Name && item.Range === data.Range
      );
      if (index !== -1) {
        this.curDataProduct.ListRange.splice(index, 1);
      }
  
      this.filterListRange = this.curDataProduct.ListRange.filter(item => !item.IsDelete);
    }
  
    // Cập nhật bản sao nếu cần thiết
    this.filterListRange = JSON.parse(JSON.stringify(this.filterListRange));
  }
  


  /**
   * get filter index
   */
  getFilteredIndex(index: number): number {
    return this.curDataProduct.ListRange?.filter(item => !item.IsDelete).findIndex((_, i) => i === index) + 1;
  }


  /**
   * call when change Type Gift
   * @param type 
   */
  handleChangeTypeGiftDrawer(type: number) {
    if (type == 0) {
      this.curDataProduct.ListRange?.forEach(range => {
        range.IsDelete = true;
      });
      this.curDataProduct.ListGift?.forEach(gift => {
        gift.IsDelete = false;
      });
      // this.filterListRange = []
    }
    else if (type == 1) {
      this.curDataProduct.ListRange?.forEach(range => {
        range.IsDelete = false;
        range.ListGift?.forEach(gift => {
          gift.IsDelete = false;
        });
      });
      this.curDataProduct.ListGift?.forEach(gift => {
        gift.IsDelete = true;
      });

      if (!Ps_UtilObjectService.hasValue(this.curDataProduct.DetermineGift)) {
        this.curDataProduct.DetermineGift = 0
      }

      if(this.curDataProduct.ListRange.length == 0){
        this.handleAddNewRange()
      }

      // this.filterListGift = []
    }
  }

  /**
   * set status binding
   */
  updateStatusName() {
    if (this.curDataProduct.StatusID === 2) {
      this.curDataProduct.StatusName = 'Áp dụng';
    } else if (this.curDataProduct.StatusID === 3) {
      this.curDataProduct.StatusName = 'Ngưng áp dụng';
    } else {
      this.curDataProduct.StatusName = 'Không xác định';
    }
  }

  // Hàm xử lý xóa gift trên drawer
  handleDeleteGiftInDrawer(item: DTOCOLPromotionGiftCus, indexRange?: number) {
    if (this.curDataProduct.GiftType == 0) {
      const index = this.curDataProduct.ListGift.findIndex(s => s.ProductBarcode == item.ProductBarcode);
      if (index != -1) {
        if (this.curDataProduct.ListGift[index].Code != 0) {
          this.curDataProduct.ListGift[index].IsDelete = true;
          this.filterListGift = this.curDataProduct.ListGift.filter(item => !item.IsDelete);
        } else {
          this.curDataProduct.ListGift.splice(index, 1);
          this.filterListGift = this.curDataProduct.ListGift
        }

        if (this.curDataProduct.TypeReceiveGift == 1) {
          if (this.curDataProduct.NoOfGift > this.filterListGift.length) {
            this.curDataProduct.NoOfGift = this.filterListGift.length
          }
        }
      }


    }
    else if (this.curDataProduct.GiftType == 1 && indexRange !== undefined) {
      const listRange = this.curDataProduct.ListRange[indexRange]?.ListGift;
      if (listRange) {
        const index = listRange.findIndex(s => s.ProductBarcode == item.ProductBarcode);
        if (index != -1) {
          if (listRange[index].isNew) {
            // Nếu là item mới thì xóa hẳn khỏi mảng
            this.curDataProduct.ListRange[indexRange].ListGift.splice(index, 1);
          } else {
            // Nếu không phải item mới, chỉ đánh dấu IsDelete = true
            this.curDataProduct.ListRange[indexRange].ListGift[index].IsDelete = true;
          }

          // Cập nhật filterListRange để loại bỏ các item bị xóa
          this.filterListRange[indexRange].ListGift = this.curDataProduct.ListRange[indexRange].ListGift.filter(s => !s.IsDelete);
          if (this.curDataProduct.ListRange[this.indexGiftRange].TypeReceiveGift == 1) {
            if (this.curDataProduct.ListRange[indexRange].NoOfGift <= 1) {
              this.curDataProduct.ListRange[indexRange].NoOfGift = 1
              this.filterListRange[indexRange].NoOfGift = 1
            }
            else {
              if (this.curDataProduct.ListRange[indexRange].NoOfGift > this.filterListRange[indexRange].ListGift.length) {
                this.curDataProduct.ListRange[indexRange].NoOfGift = this.curDataProduct.ListRange[indexRange].NoOfGift - 1
                this.filterListRange[indexRange].NoOfGift = this.curDataProduct.ListRange[indexRange].NoOfGift
              }

            }

          }


        }
      }
    }

  }


  /**
   * hàm xử lý chuyển loại nhận quà
   * @param type 
   */
  handleChangeTypeGift(type: number) {
    if (type == 0) {
      this.curDataProduct.ListRange = []
    } else if (type == 1) {
      this.curDataProduct.ListGift = []
    }
  }

  /**
   * Hàm xử lý thêm mới range
   */
  handleAddNewRange() {
    const proMotionRange = new DTOCOPOLPromotionRangeCus();
    proMotionRange.Promotion = this.curPromotion.Code;

    // Tạo bản sao object mới
    const newItem = JSON.parse(JSON.stringify(proMotionRange));

    // Thêm vào danh sách
    this.curDataProduct.ListRange.push(newItem);

    // Cập nhật trạng thái mở rộng sau khi thêm
    setTimeout(() => {
      const lastIndex = this.curDataProduct.ListRange.length - 1;

      // Đảm bảo chỉ mở một item
      this.curentTabOpenDrawer = lastIndex;
      this.itemCurrentSelectedDrawer = newItem;
    });
  }



  /**
   * hàm xử lý thêm mới quà tặng vào range
   * @param index 
   * @param dataItem 
   * @returns 
   */
  handleAddNewGiftToRange(index: number, dataItem: DTOCOLPromotionGiftCus) {
    if (!this.curDataProduct.ListRange || !this.curDataProduct.ListRange[index]) {
      return;
    }
    if (!this.curDataProduct.ListRange[index].ListGift) {
      this.curDataProduct.ListRange[index].ListGift = [];
    }
    this.curDataProduct.ListRange[index].ListGift.push(dataItem);

  }

  /**
   * check range
   * @returns 
   */
  checkRangeOrder(): boolean {

    if (!this.curDataProduct || !this.curDataProduct.ListRange) {
      return false; // Tránh lỗi nếu ListRange không tồn tại
    }

    const list = this.curDataProduct.ListRange;
    for (let i = 0; i < list.length - 1; i++) {
      if (list[i].Range > list[i + 1].Range) {
        return false; // Nếu có phần tử đứng trước lớn hơn phần tử sau => Sai thứ tự
      }
    }
    return true; // Nếu duyệt hết mà không sai => Đúng thứ tự
  }


  /**
   * check no of gift range
   * @returns 
   */
  checkNoOfGift(): boolean {
    if (this.curDataProduct.TypeReceiveGift == 1) {
      return this.curDataProduct.ListRange.some(element => Number(element.NoOfGift) == 0);
    }
    return false;
  }



  /**
   * check list gift
   * @returns 
   */
  checkListGift(): boolean {
    if (!this.curDataProduct || !this.curDataProduct.ListRange) {
      return false; // Tránh lỗi nếu ListRange không tồn tại
    }

    return !this.curDataProduct.ListRange.some(range =>
      !range.IsDelete && ( // Chỉ kiểm tra các Range chưa bị xóa
        range.ListGift.length === 0 ||  // ListGift rỗng
        range.ListGift.every(gift => gift.IsDelete) // Tất cả quà tặng đều bị xóa
      )
    );
  }




  /**
   * handle Add new product detail
   */
  handleAddNewProduct() {
    if (this.handleCheckDataProduct()) {
      this.APIUpdateCOPOLPromotionGiftProduct(this.curDataProduct)
    }

  }

  /**
   * handle update product detail
   */
  handleUpdateProductDetial() {
    if (this.handleCheckDataProduct()) {
      this.isChangeDataList = true
      this.APIUpdateCOPOLPromotionGiftProduct(this.curDataProduct)
    }

  }

  /**
   * check data product
   * @returns 
   */
  handleCheckDataProduct(): boolean {
    if(!Ps_UtilObjectService.hasValueString(this.curDataProduct.Barcode)){
      this.layoutService.onError('Không tìm thấy sản phẩm');
      return false;
    }

    if (this.curDataProduct.GiftType == 0) {
      if (this.curDataProduct.Quantity <= 0) {
        this.layoutService.onError('Vui lòng chọn S.lượng mua/lần nhận quà')
        return false
      }

      if (this.curDataProduct.TypeReceiveGift == 1) {
        if (this.curDataProduct.NoOfGift <= 0) {
          this.layoutService.onError('Vui lòng chọn số lần nhận')
          return false
        }

      }
      if (this.curDataProduct.ListGift.length == 0 || this.filterListGift.length == 0) {
        this.layoutService.onError('Vui lòng chọn quà tặng')
        return false
      }
      // if (this.curDataProduct.TypeReceiveGift == 1) {
      //   if (this.filterListGift.length < this.curDataProduct.NoOfGift) {
      //     this.layoutService.onError('Số món quà / lần nhận vượt quá số lượng quà tặng')
      //     return false
      //   }
      // }

    } else if (this.curDataProduct.GiftType == 1) {
      if (!Ps_UtilObjectService.hasValue(this.curDataProduct.DetermineGift)) {
        this.layoutService.onError('Vui lòng chọn cơ sở quà tặng')
        return false
      }

      if (this.curDataProduct.ListRange.length == 0) {
        this.layoutService.onError('Vui lòng chọn hạn mức')
        return false
      }
      if (this.curDataProduct.ListRange.find(range => range.Name == '')) {
        this.layoutService.onError('Vui lòng nhập đầy đủ tên hạn mức');
        return false;
      }

      if (this.curDataProduct.ListRange.find(range => range.Range < 0)) {
        this.layoutService.onError('Vui lòng nhập đầy đủ số hạn mức');
        return false;
      }

      if (this.curDataProduct.ListRange.find(range => range.ListGift.length == 0)) {
        this.layoutService.onError('Vui lòng chọn đầy đủ quà tặng trong hạn mức');
        return false;
      }

      if (this.curDataProduct.ListRange.some(element => Number(element.NoOfGift) == 0 && element.TypeReceiveGift == 1)) {
        this.layoutService.onError('Vui lòng chọn đẩy đủ số lần nhận trong hạn mức');
        return false;
      }

      if (!this.checkRangeOrder()) {
        this.layoutService.onError('Vui lòng nhập hạn mức theo thứ tự tăng dần');
        return false;
      }


      if (!this.checkListGift()) {
        this.layoutService.onError('Vui lòng chọn đầy đủ quà tặng cho hạn mức');
        return false;
      }


    }
    return true
  }

  /**
   * check show element drawer
   * @returns 
   */
  isShowElementDrawer() {
    if (Ps_UtilObjectService.hasValueString(this.curDataProduct.Barcode)) {
      return true
    } else {
      return false
    }
  }

  /**
   * show button action
   * @returns 
   */
  isShowButtonAction() {
    if (this.curDataProduct.Code != 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * open drawer
   */
  handleOpenDrawer() {
    if (Ps_UtilObjectService.hasValueString(this.curDataProduct.Barcode)) {
      this.barcode = this.curDataProduct.Barcode
    }

    if (this.curDataProduct.GiftType == 0) {
      this.filterListGift = JSON.parse(JSON.stringify(this.curDataProduct.ListGift))
    }

    if (this.curDataProduct.GiftType == 1) {
      this.filterListRange = JSON.parse(JSON.stringify(this.curDataProduct.ListRange))
      if(this.curDataProduct.ListRange.length == 0){
        this.handleAddNewRange()
      }else{
        this.setCurrentTabOpenPanelDrawer(0, this.curDataProduct.ListRange[0])
      }
    }

    this.isOpenDrawer = true
  }

  /**
   * close drawer
   */
  handleCloseDrawer() {
    if (!this.isChangeDataList) {
      this.curDataProduct = new DTOPromotionDetail()
    }

    this.barcode = null
    this.isOpenDrawer = false
    this.filterListGift = []
    this.filterListRange = []
    this.isViewProduct = false
  }

  /**
   * handle get product by barcode
   */
  handleGetProductByBarcode() {
    if (Ps_UtilObjectService.hasValueString(this.barcode)) {
      this.curDataProduct.Barcode = this.barcode
      this.curDataProduct.Code = 0
      this.curDataProduct.Promotion = this.curPromotion.Code
      this.resetDrawer()

      this.APIGetCOPOLPromotionGiftByBarcode(this.curDataProduct)
    }

  }

  /**
   * Delete product in drawer
   */
  handleDeleteProductDrawer() {
    if (Ps_UtilObjectService.hasValue(this.curDataProduct.Code)) {
      this.itemGiftDelete = [this.curDataProduct]
      this.isComfirmDeleteGift = true

      // this.APIDeleteCOPOLPromotionGiftProduct([this.curDataProduct])
    }

  }

  //#region dialog

  /**
   * open dialog
   * @param type 
   * @param index 
   */
  openDialog(type: number, index?: number) {
    if (Ps_UtilObjectService.hasValue(index)) {
      this.currentIndexRange = index
    }
    this.APIGetListCOLSGift()
    this.typeAddGift = type
    this.isOpenDialog = true
  }

  /**
   * close dialog
   */
  closeDialog() {
    this.searchKeyDialog = ""
    this.isOpenDialog = false
    this.listProductSelected = []
  }

  /**
   * get Selected row item
   * @param event 
   */
  getSelectedRowitem(event: any) {
    this.listProductSelected = event
  }

  /**
   * Set code after get product in dialog
   */
  updateCodeSequentially() {
    if (this.curDataProduct.GiftType == 0) {
      this.listProductTemp = this.listProduct.filter(item =>
        !this.filterListGift.some(gift => gift.ProductBarcode == item.ProductBarcode && !gift.IsDelete)
      );
    }
    else if (this.curDataProduct.GiftType == 1) {
      this.listProductTemp = this.listProduct.filter(item =>
        !this.filterListRange.reduce((acc, range) => acc.concat(range.ListGift), [])
          .some(gift => gift.ProductBarcode == item.ProductBarcode && !gift.IsDelete)
      );
    }


    let counter = 1;
    this.listProductTemp.forEach(item => {
      item.Code = counter++;
    });

    this.listProductTempOrigion = JSON.parse(JSON.stringify(this.listProductTemp))
  }

  resetAllCodes() {
    this.listProductSelected.forEach(item => {
      item.Code = 0;
    });
  }

  /**
   * search product in dialog
   * @param searchKey 
   */
  searchProducts(searchKey: string) {
    searchKey = searchKey.trim(); // Loại bỏ khoảng trắng đầu và cuối

    if (!Ps_UtilObjectService.hasValueString(searchKey)) {
      this.APIGetListCOLSGift();
    } else {
      searchKey = searchKey.toLowerCase(); // Chuyển về chữ thường để tránh phân biệt hoa/thường

      this.listProductTemp = this.listProductTempOrigion.filter(item =>
        (item.ProductName?.trim().toLowerCase().includes(searchKey) || '') ||
        (item.ProductBarcode?.trim().toLowerCase().includes(searchKey) || '') ||
        (item.ProductPoscode?.trim().toLowerCase().includes(searchKey) || '')
      );
    }
  }

  handleSearch() {
    this.searchProducts(this.searchKeyDialog)
  }

  validateDuplicateBarcode(listProductSelected: any[]): boolean {
    const barcodeSet = new Set<string>();
  
    for (const item of listProductSelected) {
      const barcode = item?.ProductBarcode?.trim();
      if (barcode) {
        if (barcodeSet.has(barcode)) {
          // Có barcode trùng
          return false;
        }
        barcodeSet.add(barcode);
      }
    }
  
    return true; // Không có barcode trùng
  }
  

  /**
   * handle when add new gift in product and range
   */
  handleAddGift() {
    if (Ps_UtilObjectService.hasListValue(this.listProductSelected)) {

      if(!this.validateDuplicateBarcode(this.listProductSelected)){
        this.layoutService.onError('Không được chọn sản phẩm trùng barcode');
        return;
      }
      this.resetAllCodes();
      if (this.typeAddGift == 0) {
        this.listProductSelected.forEach((item) => {
          const existingItem = this.curDataProduct.ListGift.find(gift => gift.ProductBarcode === item.ProductBarcode);
          if (existingItem) {
            existingItem.IsDelete = false;
          } else {
            this.curDataProduct.ListGift.push({ ...item, IsDelete: false });
          }
        });
        this.filterListGift = [...this.curDataProduct.ListGift];

      }
      else if (this.typeAddGift == 1) {
        const listRange = JSON.parse(JSON.stringify(this.curDataProduct.ListRange[this.currentIndexRange].ListGift.map(item => ({ ...item }))));

        this.listProductSelected.forEach((item) => {
          const existingItem = listRange.find(gift => gift.ProductBarcode === item.ProductBarcode);
          if (existingItem) {
            existingItem.IsDelete = false;
          } else {
            listRange.push({ ...item, IsDelete: false, isNew: true });
          }
        });
        this.curDataProduct.ListRange[this.currentIndexRange].ListGift = listRange;
        this.filterListRange = JSON.parse(JSON.stringify(this.curDataProduct.ListRange));
      }

    }

    this.listProductSelected = [];
    this.closeDialog();
  }

  /**
   * Remove item delete list range / or list gift
   */
  removeDeletedItems() {
    this.curDataProduct.ListGift = this.curDataProduct.ListGift.filter(item => !item.IsDelete);
    this.curDataProduct.ListRange.forEach(range => {
      range.ListGift = range.ListGift.filter(item => !item.IsDelete);
    });

    this.filterListGift = [...this.curDataProduct.ListGift];
    this.filterListRange = JSON.parse(JSON.stringify(this.curDataProduct.ListRange));
  }



  /**
   * Reset drawer when close
   */
  resetDrawer() {
    this.filterListGift = []
    this.filterListRange = []
  }

  /**
   * Lọc trùng lặp ListGift
   * @returns 
   */
  filterDuplicatesWithDelete() {
    if (!this.curDataProduct || !Array.isArray(this.curDataProduct.ListGift)) {
      return;
    }

    const uniqueMap = new Map<number, any>();

    this.curDataProduct.ListGift.forEach(gift => {
      if (!uniqueMap.has(gift.Code) || gift.IsDelete) {
        uniqueMap.set(gift.Code, gift);
      }
    });

    this.curDataProduct.ListGift = Array.from(uniqueMap.values());
  }


  /**
 * Hàm cập nhật listProductDetailFilter với dữ liệu đã lọc
 */
  updateFilteredProductDetail(dataDetail: DTOPromotionDetail) {
    const index = this.listProductDetailFilter.data.findIndex(item => item.Code === dataDetail.Code);
    if (index !== -1) {
      this.listProductDetailFilter.data[index] = this.filterGiftData(dataDetail);
    }
    this.isChangeDataList = false;
    this.curDataProduct = new DTOPromotionDetail();
  }

  /**
   * Hàm lọc bỏ các phần tử có IsDelete = true trong ListGift hoặc ListRange.ListGift
   */
  filterGiftData(data: any) {
    const newData = JSON.parse(JSON.stringify(data));

    if (newData.GiftType === 0 && Array.isArray(newData.ListGift)) {
      newData.ListGift = newData.ListGift.filter(gift => !gift.IsDelete);
    }
    else if (newData.GiftType === 1 && Array.isArray(newData.ListRange)) {
      newData.ListRange = newData.ListRange.map(range => ({
        ...range,
        ListGift: Array.isArray(range.ListGift) ? range.ListGift.filter(gift => !gift.IsDelete) : []
      }));
    }

    return newData;
  }




  //#region API

  /**
 * Lấy danh sách thông tin loại chương trình
 */
  APIGetListCOPOLPromotionGiftType() {
    var ctx = "Lấy danh sách thông tin loại chương trình"
    let a = this.apiMarService.GetListCOPOLPromotionGiftType().pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.ListActionCreate = res.ObjectReturn
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
    });
    this.arrSub.push(a);
  }

  /**
   * API Get Promotion Gift By Barcode
   * @param dto 
   */
  APIGetCOPOLPromotionGiftByBarcode(dto: DTOPromotionDetail) {
    let a = this.apiMarService.GetCOPOLPromotionGiftByBarcode(dto).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.curDataProduct = res.ObjectReturn
        this.curDataProduct.ListGift = []
        this.curDataProduct.ListRange = []
      } else {
        this.curDataProduct = new DTOPromotionDetail()
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin sản phẩm: ${res.ErrorString}`);
      }
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin sản phẩm: ${err}`);
    });

    this.arrSub.push(a);
  }

  /**
   * API Get List Gift
   */
  APIGetListCOLSGift() {
    this.loadingDialog = true
    let apiText = "Danh sách sản phẩm"
    let a = this.apiMarService.GetListCOLSGift(this.gridStateSearch).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listProduct = res.ObjectReturn.Data

        this.updateCodeSequentially()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`)
      }
      this.loadingDialog = false
    }, (err) => {
      this.loadingDialog = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   *  API Add List Promotio nGift
   * @param req 
   */
  APIAddListCOPOLPromotionGift(req: DTOCOLPromotionGiftCus[]) {
    // this.isLoading = true
    let apiText = "Danh sách sản phẩm"
    let a = this.apiMarService.AddListCOPOLPromotionGift(req).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Thêm quà tặng thành công!`)
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`)
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  //#region APIDrawer
  /**
   * API Update Promotion Gift Product
   * @param req 
   */
  APIUpdateCOPOLPromotionGiftProduct(req: DTOPromotionDetail) {
    ;
    this.isLoadingAll = true
    let apiText = ""
    if (req.Code == 0) {
      apiText = "Thêm sản phẩm"
    } else {
      apiText = "Cập nhật sản phẩm"
    }

    if (this.curDataProduct.GiftType == 1) {
      this.curDataProduct.NoOfGift = null
      this.curDataProduct.TypeReceiveGift = 0
      this.curDataProduct.Quantity = 0
      this.curDataProduct.MaxQuantity = 0
    } else {
      this.curDataProduct.DetermineGift = 0
    }

    // this.handleChangeTypeGift(req.GiftType)
    let a = this.apiMarService.UpdateCOPOLPromotionGiftProduct(req).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.isLoadingAll = false
        this.APIGetListCOPOLPromotionGiftProduct()
        this.handleCloseDrawer()
        this.layoutService.onSuccess(`${apiText} thành công!`)
        if (this.isCloseTab) {
          this.currenTabOpen = null
        }


      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`)
      }
      this.isLoadingAll = false
    }, (err) => {
      this.isLoadingAll = false
      this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`)
    })

    this.arrSub.push(a);
  }

  /**
   * API delete gift product
   * @param req 
   */
  APIDeleteCOPOLPromotionGiftProduct(req: DTOPromotionDetail[]) {
    this.isLoadingAll = true
    let apiText = "Xóa sản phẩm"
    let a = this.apiMarService.DeleteCOPOLPromotionGiftProduct(req).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${apiText} thành công!`)
        this.resetState()
        this.APIGetListCOPOLPromotionGiftProduct()
        this.handleCloseDrawer()
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.onCloseDeleteGift()

      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`)
      }
      this.isLoadingAll = false
    }, (err) => {
      this.isLoadingAll = false
      this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`)
    })
    this.arrSub.push(a);
  }

  //#region APIGrid
  /**
   * API change status product
   * @param listData 
   * @param status 
   */
  APIUpdateCOPOLPromotionGiftProductStatus(listData: DTOPromotionDetail[], status: number) {
    this.isLoading = true
    let apiText = "sản phẩm"
    let a = this.apiMarService.UpdateCOPOLPromotionGiftProductStatus(listData, status).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.diCustomGridRef.clearSelection();
        this.APIGetListCOPOLPromotionGiftProduct();
        this.layoutService.onSuccess(`Cập nhật trạng thái ${apiText} thành công!`)
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái ${apiText}: ${res.ErrorString}`)
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái ${apiText}: ${err}`)
    })

    this.arrSub.push(a);
  }


  /**
   * API Get List Product Promotion
   */
  APIGetListCOPOLPromotionGiftProduct() {
    if (!this.isChangeDataList) {
      this.isLoading = true
    }
    let apiText = "Danh sách sản phẩm"
    let a = this.apiMarService.GetListCOPOLPromotionGiftProduct(this.gridStateProduct, this.curPromotion.Code).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listProductDetail = { data: res.ObjectReturn.Data, total: res.ObjectReturn.Total }
        if (this.isChangeDataList) {
          const item = this.listProductDetail.data.find(item => item.Code === this.curDataProduct.Code);
          if (item) {
            this.updateFilteredProductDetail(item)
          }
        } else {
          this.isRequestExpand = true
          this.listProductDetailFilter = JSON.parse(JSON.stringify(this.listProductDetail))
        }

      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`)
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API Delete Promotion Gift
   * @param data 
   */
  APIDeleteCOPOLPromotionGift(data: DTOCOLPromotionGiftCus) {
    this.isLoadingAll = true
    let apiText = "Quà tặng"
    let a = this.apiMarService.DeleteCOPOLPromotionGift(data).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.isLoadingAll = false
        this.layoutService.onSuccess(`Xóa ${apiText} thành công!`)

        if (this.parentItemDeleted.GiftType == 0) {
          const index = this.listProductDetail.data.findIndex(s => s.Code == this.parentItemDeleted.Code);
          if (index != -1) {
            this.listProductDetail.data[index].ListGift.splice(this.indexItemDeleted, 1);
            this.listProductDetailFilter.data[index].ListGift = this.listProductDetail.data[index].ListGift;

            // Kiểm tra NoOfGift
            if (this.listProductDetail.data[index].NoOfGift > this.listProductDetail.data[index].ListGift.length) {
              this.listProductDetail.data[index].NoOfGift = this.listProductDetail.data[index].ListGift.length;
              this.listProductDetailFilter.data[index].NoOfGift = this.listProductDetail.data[index].ListGift.length;
            }
          }
        } else if (this.parentItemDeleted.GiftType == 1) {
          const index = this.listProductDetail.data.findIndex(s => s.Code == this.parentItemDeleted.Code);
          if (index != -1) {
            this.listProductDetail.data[index].ListRange[this.indexItemDeleted].ListGift.splice(this.indexGiftRange, 1);
            this.listProductDetailFilter.data[index].ListRange[this.indexItemDeleted].ListGift = this.listProductDetail.data[index].ListRange[this.indexItemDeleted].ListGift;
            // Kiểm tra NoOfGift
            if (this.listProductDetail.data[index].ListRange[this.indexItemDeleted].NoOfGift >
              this.listProductDetail.data[index].ListRange[this.indexItemDeleted].ListGift.length) {
              this.listProductDetail.data[index].ListRange[this.indexItemDeleted].NoOfGift =
                this.listProductDetail.data[index].ListRange[this.indexItemDeleted].ListGift.length;
              this.listProductDetailFilter.data[index].ListRange[this.indexItemDeleted].NoOfGift =
                this.listProductDetail.data[index].ListRange[this.indexItemDeleted].ListGift.length;

            }
          }
        }

      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${res.ErrorString}`)
      }
      this.isLoadingAll = false
    }, (err) => {
      this.isLoadingAll = false
      this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API Delete Promotion Detail
   * @param detail 
   */
  APIDeletePromotionDetail(detail: DTOPromotionDetail[] = this.curPromotionDetail.ListProduct) {
    this.isLoading = true;
    var ctx = "Xóa Sản phẩm"
    this.curPromotionDetail.Promotion = this.curPromotion.Code
    // detail.Promotion = this.curPromotion.Code

    let a = this.apiMarService.DeletePromotionDetail(detail).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.deleteDialogOpened = false
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()

        this.APIGetListCOPOLPromotionGiftProduct();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.deleteDialogOpened = false
        this.APIGetListCOPOLPromotionGiftProduct()
      }
      this.isLoading = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.isLoading = false;
      this.deleteDialogOpened = false
      this.APIGetListCOPOLPromotionGiftProduct()
    });
    this.arrSub.push(a);
  }

  /**
   * API Delete Promotion Range
   * @param data 
   */
  APIDeleteListCOPOLPromotionRange(data: DTOCOPOLPromotionRangeCus) {
    this.isLoadingAll = true;
    var ctx = "Xóa hạn mức"
    this.curPromotionDetail.Promotion = this.curPromotion.Code
    // detail.Promotion = this.curPromotion.Code

    let a =this.apiMarService.DeleteListCOPOLPromotionRange([data]).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.deleteDialogOpened = false
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        const index = this.listProductDetail.data.findIndex(s => s.Code == data.PromotionDetail);
        if (index != -1) {
          ;
          const index1 = this.listProductDetail.data[index].ListRange.findIndex(s => s.Code == data.Code)
          if (index1 != -1) {
            this.listProductDetail.data[index].ListRange.splice(index1, 1);
            this.listProductDetailFilter.data[index].ListRange = this.listProductDetail.data[index].ListRange;
          }

        }
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        this.deleteDialogOpened = false
      }
      this.isLoadingAll = false;
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      this.deleteDialogOpened = false
      this.isLoadingAll = false;
    });
    this.arrSub.push(a);
  }

  /**
   * handle image error to default image
   * @param event 
   */
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/default-image.jpg';
  }

  uploadEventHand(e: File) {
    this.APIImportCOPOLPromotionGiftProduct(e)
  }


  //#region Import Export
  APIImportCOPOLPromotionGiftProduct(file) {
    var ctx = "Import Excel"

    let a = this.apiMarService.ImportCOPOLPromotionGiftProduct(this.curPromotion.Code, file).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.onLoadFilter()

        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.setImportDialogMode(1)
        this.layoutService.setImportDialog(false)
        this.layoutService.getImportDialogComponent().inputBtnDisplay()
      } else {
        const arr = res.ObjectReturn as DTOListProp_ObjReturn[]
        let importComponent = this.layoutService.getImportDialogComponent()

        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        importComponent.importGridDSView.next({ data: arr, total: arr.length })
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      // this.loading = false;
    })
    this.arrSub.push(a);
  }

  APIExportExcelPromotionGiftProduct() {
    // this.loading = true
    var ctx = "Export Excel Danh sách sản phẩm trong chương trình"
    var getfileName = 'COPOLPromotionGiftDetailTemplate.xlsx'
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a =this.marService.GetTemplate(getfileName).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res != null) {
        Ps_UtilObjectService.getFile(res, getfileName)
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else {
        this.layoutService.onError(`${ctx} thất bại`)
      }
      // this.loading = false;
    }, f => {
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f.error.ExceptionMessage)
      // this.loading = false;
    });
    this.arrSub.push(a);
  }

  pickFile(e: DTOCFFile) {
    var file = Ps_UtilObjectService.removeImgRes(e?.PathFile)
    this.layoutService.setFolderDialog(false)

  }

  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog())
      return this.MarServiceAPI.GetFolderWithFile(childPath, 4);
  }

  /**
   * reset page in grid
   */
  resetState() {
    this.gridStateProduct.skip = 0
    this.gridStateProduct.take = this.pageSize
  }

  //#region Destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
}