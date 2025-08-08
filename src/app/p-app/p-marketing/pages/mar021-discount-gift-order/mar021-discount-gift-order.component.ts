import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { State, CompositeFilterDescriptor, SortDescriptor, distinct } from '@progress/kendo-data-query';
import { SelectableSettings, PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DTOResponse, Ps_UtilObjectService } from 'src/app/p-lib';
import DTOPromotionProduct, { DTODayOfWeek, DTOGroupOfCard, DTOPromotionDetail, DTOCOPOLPromotionRangeCus, DTOCOLPromotionGiftCus } from '../../shared/dto/DTOPromotionProduct.dto';
import { DTOWarehouse } from 'src/app/p-app/p-ecommerce/shared/dto/DTOWarehouse';
import { MarketingService } from '../../shared/services/marketing.service';
import { MarPromotionAPIService } from '../../shared/services/marpromotion-api.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { MenuDataItem, ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import DTOListProp_ObjReturn from '../../shared/dto/DTOListProp_ObjReturn.dto';
import { takeUntil } from 'rxjs/operators';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { MarPromotionInforComponent } from '../../shared/components/mar-discount-infor/mar-promotion-infor.component';
import { MarConditionApplyComponent } from '../../shared/components/mar-condition-apply/mar-condition-apply.component';
import { MarPromotionGiftRulesComponent } from '../../shared/components/mar-promotion-gift-rules/mar-promotion-gift-rules.component';
import { greaterOrEqualIcon, plusIcon, searchIcon, trashIcon } from '@progress/kendo-svg-icons';
import { PKendoGridComponent } from 'src/app/p-app/p-layout/components/p-kendo-grid/p-kendo-grid.component';

@Component({
  selector: 'app-mar021-discount-gift-order',
  templateUrl: './mar021-discount-gift-order.component.html',
  styleUrls: ['./mar021-discount-gift-order.component.scss']
})
export class Mar021DiscountGiftOrderComponent implements OnInit, OnDestroy {
  @ViewChild('promotionInfor') promotionInforRef: MarPromotionInforComponent; // component thông tin chương trình
  @ViewChild('conditionApply') conditionApplyRef: MarConditionApplyComponent; // component phạm vi và điều kiện áp dụng
  @ViewChild('myCustomGrid') diCustomGridRef!: PKendoGridComponent; // component grid
  @ViewChild('gridGiftRules') gridGiftRules!: MarPromotionGiftRulesComponent; // component danh sách qui định hạn mức
  //Variable
  //Block 1
  curPromotion: DTOPromotionProduct = new DTOPromotionProduct() // promotion hiện tại
  curRange: DTOCOPOLPromotionRangeCus = new DTOCOPOLPromotionRangeCus(); // hạn mức hiện tại

  isObligatory: boolean = true // có quan trọng hay không
  isDeleteDialogOpened: boolean = false // có mở dialog delete không
  contextIndex: number = 1 // code của context
  context: string[] = ["Chương trình", "Sản phẩm Khuyến mãi", "Giá trị Nhóm hàng"]


  //#region drawer variable
  isOpenDrawer: boolean = false; // có mở drawer không
  isAddProduct: boolean = true; // Có thêm mới sản phẩm không
  isDisabled: boolean = false; // có disabled các component hay button không
  isDisabledPopup: boolean = false; // có disabled từ popup không
  isDisabledSelectChild: boolean = false; // có disabled khi selected nhiều item của component con không
  isDisabledSelectParent: boolean = false; // có disabled khi selected nhiều item của component cha không
  isView: boolean = false; // Chỉ xem
  isImportRange: boolean = false; // có import hạn mức không

  //grid
  pageSize: number = 25; // pageSize in start
  gridState: State = { skip: null, take: null, filter: { logic: 'and', filters: [] }, sort: [{ "field": "OrderBy", "dir": "asc" }] } // State
  pageSizes: number[] = [25, 50, 75, 100]; // list pagesize
  expandedRow: any // row được expand

  // state của danh sách quà tặng
  gridStateProduct: State =
    {
      skip: 1,
      take: 25,
      filter: { logic: 'and', filters: [] },
      sort: [{ "field": "OrderBy", "dir": "asc" }]
    }

  filterSearchProduct: CompositeFilterDescriptor = { logic: 'or', filters: [] } // Filter search sản phẩm
  isOpenDialogAddGift: boolean = false; // có mở dialog thêm quà tặng không
  searchKeyDialog: string = ''; //keyword search
  listProduct: DTOCOLPromotionGiftCus[] = []; // danh sách quà tặng
  listProductTemp: DTOCOLPromotionGiftCus[] = []; // danh sách quà tặng tạm thời
  listProductSelected: DTOCOLPromotionGiftCus[] = []; // danh sách quà tặng đang được chọn
  listRange: DTOCOPOLPromotionRangeCus[] = []; // danh sách hạn mức

  statusIDSelected: number; // status đang chọn
  selectable: SelectableSettings = { enabled: true, mode: 'multiple', drag: false, checkboxOnly: true }; // Setting for selection of grid
  icons = { trash: trashIcon, greaterOrEqualIcon: greaterOrEqualIcon, plusIcon: plusIcon, searchIcon: searchIcon }

  currentTabOpen: number = 0 // tab đang mở hiện tại
  itemCurrentSelected: any // item đang được chọn hiện tại

  listCodeExpand: any[] = []

  listCOPOLApplyScope: DTOWarehouse[] = []
  listDayOfWeek: DTODayOfWeek[] = []
  listGroupOfCard: DTOGroupOfCard[] = []
  newListRange: DTOCOPOLPromotionRangeCus[] = [] // danh sách hạn mức mới nhất
  ListActionCreate = []

  //Permision
  justLoaded: boolean = true
  justLoadedChangePermissionAPI: boolean = true
  actionPerm: DTOActionPermission[] = []
  dataPerm: DTODataPermission[] = []

  isToanQuyen: boolean = false; // toàn quyền
  isAllowedToCreate: boolean = false; // quyền tạo
  isAllowedToVerify: boolean = false; // quyền duyệt
  isCallOnlyListHamper: boolean = true;

  M_C: boolean = false; // Toàn quyền hoặc tạo
  M_V: boolean = false; // Toàn quyền hoặc duyệt

  //Loading
  isLoading: boolean = false
  isloadingBlock1: boolean = false
  isLoadingBlock2: boolean = false
  isLoadingBlock3: boolean = false

  //drawer
  barcode: string = ""

  //functions
  onPageChangeCallback: Function;
  onActionDropDownClickCallback: Function;
  getActionDropdownCallback: Function;
  onSelectedPopupBtnCallback: Function
  getSelectionPopupCallback: Function
  onSelectCallback: Function
  onSelectCallbackPopup: Function
  onSortChangeCallback: Function
  uploadEventHandlerCallback: Function // hàm gọi upload template

  //#region unsubcribe
  ngUnsubscribe$ = new Subject<void>();

  //#region constructor
  constructor(
    public service: MarketingService,
    public apiMarService: MarPromotionAPIService,
    public layoutService: LayoutService,
    public layoutApiService: LayoutAPIService,
    public menuService: PS_HelperMenuService,
  ) { }

  ngOnInit(): void {
    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    let that = this
    //cache
    this.menuService.changePermission().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")
        this.isToanQuyen = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        this.isAllowedToCreate = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        this.isAllowedToVerify = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

        this.M_C = this.isToanQuyen || this.isAllowedToCreate;
        this.M_V = this.isToanQuyen || this.isAllowedToVerify;

      }
    })

    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        that.APIGetListCOPOLPromotionGiftType();
        this.isLoading = true;
      }
    })

    this.onActionDropDownClickCallback = this.onActionDropdownClick.bind(this);
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this)
    this.onSelectedPopupBtnCallback = this.onSelectionActionItemClick.bind(this);
    this.uploadEventHandlerCallback = this.uploadEventHand.bind(this);
    this.onSelectCallback = this.onGridItemSelect.bind(this);
    this.onSelectCallbackPopup = this.onGridItemSelectPopup.bind(this);

  }

  /**
   * Hàm nhận event khi tắt hoặc chọn selection grid sản phẩm
   * @param isSelected 
   */
  onGridItemSelect(isSelected: boolean) {
    this.isDisabled = isSelected;
    this.isDisabledSelectParent = isSelected;
    this.listProductSelected = [];
  }

  /**
 * Hàm nhận event khi tắt hoặc chọn selection grid quà tặng
 * @param isSelected 
 */
  onGridItemSelectPopup(isSelected: boolean) {
    this.isDisabledPopup = isSelected;
    this.listProductSelected = [];
  }

  /**
 * Hàm nhận event disabled từ component
 */
  getDisabledSearch(isDisabled: boolean) {
    this.isDisabledSelectChild = isDisabled;
  }

  /**
   * Hàm nhận status từ radio btn
   * @param enumStatus 
   */
  handleSetValueRadio(enumStatus: number) {
    this.statusIDSelected = enumStatus
  }

  /**
   * Hàm lấy danh sách action
   * @returns list of actions
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOPromotionDetail): MenuDataItem[] {
    const actionEdit: MenuDataItem = { Name: "Chỉnh sửa", Code: "pencil", Actived: true };
    const actionView: MenuDataItem = { Name: "Xem chi tiết", Code: "eye", Actived: true };
    const actionDelete: MenuDataItem = { Name: "Xóa sản phẩm", Code: "trash", Actived: true };
    const actionApprove: MenuDataItem = { Name: "Áp dụng", Code: "check-circle", Actived: true };
    const actionStop: MenuDataItem = { Name: "Ngưng áp dụng", Code: "minus-outline", Actived: true, Type: 'stopDone', Link: "stop" };

    const status = dataItem.StatusID;
    switch (status) {
      case 2:
        if (this.curPromotion.StatusID == 2 && this.M_V) {
          return [actionEdit, actionStop];
        }
        else if (this.curPromotion.StatusID == 0 || this.curPromotion.StatusID == 4 && this.M_C) {
          return [actionEdit, actionDelete];
        }
        else if (this.curPromotion.StatusID == 1 && this.M_V) {
          return [actionEdit, actionDelete];
        }
        else {
          return [actionView]
        }
      // return this.handleCheckPermission() ? [actionEdit, actionDelete] : moreActionDropdown;
      case 3:
        if (this.curPromotion.StatusID == 2 && this.M_V) {
          return [actionEdit, actionApprove];
        }
        else if (this.curPromotion.StatusID == 0 || this.curPromotion.StatusID == 4 && this.M_C) {
          return [actionEdit, actionDelete];
        }
        else if (this.curPromotion.StatusID == 1 && this.M_V) {
          return [actionEdit, actionDelete];
        }
        else {
          return [actionView]
        }
      // return this.handleCheckPermission() ? [actionEdit, actionDelete] : moreActionDropdown;
    }
    return [actionView]
  }

  /**
   * Hàm xử lý khi click vào action của item băng '...'
   * @param action action được chọn
   * @param item sản phẩm
   */
  onActionDropdownClick(action: MenuDataItem, item: DTOPromotionDetail) {
    // this.curDataProduct = item;
    // if (action.Code == 'eye') {
    //   this.isOpenDrawer = true;
    //   this.curDataProduct = item;
    //   this.isAddProduct = false;
    //   this.isView = true;
    //   this.barcode = this.curDataProduct.Barcode;
    // }
    // else if (action.Code == 'pencil') {
    //   this.isOpenDrawer = true;
    //   this.isAddProduct = false;
    //   this.curDataProduct = item;
    //   this.isView = false;
    //   this.barcode = this.curDataProduct.Barcode;
    // }
    // else if (action.Code == 'check-circle') {
    //   this.curDataProduct.StatusID = 2;
    //   this.APIUpdateCOPOLPromotionGiftProductStatus([this.curDataProduct], 2);
    // }
    // else if (action.Code == 'minus-outline') {
    //   this.curDataProduct.StatusID = 3;
    //   this.APIUpdateCOPOLPromotionGiftProductStatus([this.curDataProduct], 3);
    // }
    // else if (action.Code == 'trash') {
    //   this.APIDeleteCOPOLPromotionGiftProduct([this.curDataProduct]);
    // }
  }

  /**
   * Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
   * @param arrItem 
   * @returns MenuDataItem[]
   */
  getSelectionPopupAction(arrItem: any[]) {
    const actionDelete = { Name: "Xóa sản phẩm", Code: "trash", Type: 'Delete', Link: "delete", Actived: true };
    const actionStop = { Name: "Ngưng áp dụng", Code: "minus-outline", Type: 'Stop', Link: "stop", Actived: true };
    const actionApprove = { Name: "Áp dụng", Code: "check-circle", Type: 'Approve', Link: "approve", Actived: true };
    let listAction: any[] = [];
    if (this.curPromotion.StatusID !== 3) {

      arrItem.forEach(item => {
        const itemStatus = item.StatusID;
        if (itemStatus == 2 && this.curPromotion.StatusID == 2) {
          if (this.handleCheckItemList(listAction, "stop") && this.M_V) {
            listAction.push(actionStop);
          }
        }
        else if (itemStatus == 3 && this.curPromotion.StatusID == 2) {
          if (this.handleCheckItemList(listAction, "approve") && this.M_V) {
            listAction.push(actionApprove);
          }
        }
        else if (this.handleCheckPermission()) {
          if (this.handleCheckItemList(listAction, "delete") && this.handleCheckPermission()) {
            listAction.push(actionDelete);
          }
        }
      });
    }
    return listAction;
  }

  /**
   * Hàm xử lý khi click vào action của các item được chọn
   * @param btnType type của button được chọn
   * @param listSelectedItem danh sách được chọn
   * @param value 
   */
  onSelectionActionItemClick(btnType: string, listSelectedItem: any[], value: any) {
    // let listDetailSelected: DTOPromotionDetail[] = listSelectedItem;
    // if (btnType == "Stop") {
    //   this.APIUpdateCOPOLPromotionGiftProductStatus(listDetailSelected, 3);
    // }
    // else if (btnType == "Approve") {
    //   this.APIUpdateCOPOLPromotionGiftProductStatus(listDetailSelected, 2);
    // }
    // else if (btnType == "Delete") {
    //   this.APIDeleteCOPOLPromotionGiftProduct(listDetailSelected);
    // }
  }

  /**
   * Hàm kiểm tra list action đã có action đó chưa?
   */
  handleCheckItemList(listItem: any[], link: string): boolean {
    return !listItem.some(item => item.Link === link);
  }

  /**
   * Hàm check phân quyền
   * @returns 
   */
  handleCheckPermission(): boolean {
    let statusPromotion = this.curPromotion.StatusID;

    // Nếu đang soạn thảo hoặc trả về
    if (statusPromotion == 0 || statusPromotion == 4) {
      return this.M_C;
    }

    // Nếu gửi duyệt
    else if (statusPromotion == 1) {
      return this.M_V;
    }
  }


  isVisible(value: string) {
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
    this.listActionStatus = this.listActionStatus.filter(item => item.type !== 'new');
  }

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
      else if (!Ps_UtilObjectService.hasValueString(newPro.VNSummary))
        this.layoutService.onError('Vui lòng nhập Mô tả chương trình khuyến mãi')
      else if (!Ps_UtilObjectService.hasValue(this.listCOPOLApplyScope.find(s => s.IsSelected)))
        this.layoutService.onError('Vui lòng chọn Phạm vi áp dụng')
      else if (this.listDayOfWeek.find(s => (!Ps_UtilObjectService.hasValue(s.From) || (!Ps_UtilObjectService.hasValue(s.To))
      ) && s.IsSelected) != undefined) {
        this.layoutService.onError('Vui lòng chọn Từ (giờ), Đến (giờ) cho Ngày trong tuần')
      }
      else if (!Ps_UtilObjectService.hasListValue(this.listRange) || this.listRange[0].Code == 0)
        this.layoutService.onError('Vui lòng thêm ít nhất một Mức quà tặng')
      else if (this.handleCheckInfoNull()) {
        // const rangeNotValid = this.listRange.find(item => item.Code !== 0 && (item.TypeReceiveGift == 1 && item.NoOfGift > item.ListGift?.length))
        // if (!rangeNotValid) {
        this.layoutService.onError('Vui lòng kiểm tra lại Thông tin các hạn mức')
        // }
        // else {
        //   this.layoutService.onError('Vui lòng kiểm tra lại Số lượng món quà/lần nhận. Số lượng nhận không được lớn hơn số lượng quà')
        // }
      }
      else if (this.handleCheckListNull())
        this.layoutService.onError('Vui lòng Thêm ít nhất một Quà tặng vào mức quà tặng')
      else
        this.promotionInforRef.onUpdatePromotionStatus(item)
    } else if (item.type == 'delete') {
      this.onDeletePromotion();
    } else if (item.type == 'new') {
      this.onResetData();
    } else {
      this.promotionInforRef.onUpdatePromotionStatus(item)
    }

  }

  // Hàm load lại trang
  onLoadPage() {
    if (this.curPromotion.Code != 0) {
      this.promotionInforRef.loadData();
      this.conditionApplyRef.loadData();
      this.gridGiftRules.APIGetListCOPOLPromotionRange();
    }
  }

  /**
 * Hàm nhận list range từ component con
 * @param list 
 */
  getListRange(list: DTOCOPOLPromotionRangeCus[]) {
    this.listRange = list;
  }


  /**
   * Hàm kiểm tra list của item có giá trị không
   */
  handleCheckListNull(): boolean {
    const listRangeValid = this.listRange.filter(item => item.Code !== 0)
    const listRangNullGift = listRangeValid.filter(item => !Ps_UtilObjectService.hasListValue(item.ListGift));
    return Ps_UtilObjectService.hasListValue(listRangNullGift);
  }


  /**
   * Hàm kiểm tra thông tin của item có null không
   */
  handleCheckInfoNull() {
    const listRangeValid = this.listRange.filter(item => item.Code !== 0)
    const listRangNullInfo = listRangeValid.filter(item => !Ps_UtilObjectService.hasValueString(item.Name) ||
      !Ps_UtilObjectService.hasValue(item.Range) || item.Range == 0 || !Ps_UtilObjectService.hasValue(item.TypeReceiveGift) || item.TypeReceiveGift == -1
      || (item.TypeReceiveGift == 1 && item.NoOfGift == 0));
    return Ps_UtilObjectService.hasListValue(listRangNullInfo);
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
      if (Ps_UtilObjectService.hasValue(this.curPromotion) && this.curPromotion.Code !== 0) {
        // this.APIGetListCOPOLPromotionGiftProduct();
      }
    }
  }

  /**
   * Hàm xử lý xóa promotion
   */
  onDeletePromotion() {
    this.contextIndex = 0
    this.isDeleteDialogOpened = true
  }

  /**
   * Hàm xử lý tắt dialog xóa 
   */
  onCloseDeleteDialog() {
    this.isDeleteDialogOpened = false
  }

  delete() {
    if (this.contextIndex == 0) {
      this.promotionInforRef.APIDeletePromotion()
      this.isDeleteDialogOpened = false;
      this.onResetData();
    }
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
    this.listRange = [];

    if (Ps_UtilObjectService.hasValue(this.conditionApplyRef)) {
      this.conditionApplyRef.createNewPromotion();
    }
    this.promotionInforRef.createNewPromotion(this.curPromotion);
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
    this.menuService.changeModuleData().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((item: ModuleDataItem) => {

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

  //Function Black Apply  - Block 2

  /**
 * Lấy promotion mới từ component Apply
 */
  onGetCurrentPromotion(value: DTOPromotionProduct) {
    this.curPromotion = value;
  }

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
   * Hàm xử 
   * @param value 
   * @param item 
   */
  setCurrentTabOpenPanel(value: number, item: any) {
    this.currentTabOpen = value
    this.itemCurrentSelected = item
  }

  //#region dialog
  /**
   * Hàm xử lý mwở popup thêm quà tặng
   * @param event 
   */
  handleOpenAddGift(event: { isGift: boolean; item: DTOCOPOLPromotionRangeCus }) {
    this.APIGetListCOLSGift();
    this.isOpenDialogAddGift = true;
    this.curRange = event.item;
  }

  /**
   * Hàm xử lý search quà tặng
   */
  handleSearch() {
    this.searchProducts(this.searchKeyDialog)
  }

  /**
   * Hàm xử lý thêm quà tặng
   */
  handleAddGift() {
    if (Ps_UtilObjectService.hasListValue(this.listProductSelected)) {
      this.resetAllCodes();
      this.listProductSelected.map(item => { item.PromotionRange = this.curRange.Code, item.Promotion = this.curPromotion.Code });
      this.closeDialog();
      this.APIAddListCOPOLPromotionGift(this.listProductSelected);
    }
  }

  /**
   * Hàm xử lý set toàn bộ code của các quà tặng thành 0 để thêm mới
   */
  resetAllCodes() {
    this.listProductSelected.forEach(item => {
      item.Code = 0;
    });
  }

  /**
   * Hàm search quà tặng
   * @param searchKey 
   */
  searchProducts(searchKey: string) {
    searchKey = searchKey.trim(); // Loại bỏ khoảng trắng đầu và cuối

    if (!Ps_UtilObjectService.hasValueString(searchKey)) {
      this.APIGetListCOLSGift();
    } else {
      searchKey = searchKey.toLowerCase(); // Chuyển về chữ thường để tránh phân biệt hoa/thường

      this.listProductTemp = this.listProduct.filter(item =>
        (item.ProductName?.trim().toLowerCase().includes(searchKey) || '') ||
        (item.ProductBarcode?.trim().toLowerCase().includes(searchKey) || '') ||
        (item.ProductPoscode?.trim().toLowerCase().includes(searchKey) || '')
      );
    }
  }

  /**
 * Hàm xử lý ảnh khi ảnh null hoặc error
 * @param event 
 */
  onImageError(event: any) {
    event.target.src = 'assets/img/default-image.jpg';
  }

  /**
   * Hàm đóng dialog
   */
  closeDialog() {
    this.isOpenDialogAddGift = false
  }

  updateCodeSequentially() {
    let counter = 1;
    this.listProduct.forEach(item => {
      item.Code = counter++;
    });
    this.listProductTemp = this.listProduct
  }

  /**
   * Hàm xử lý khi select item grid quà tặng
   * @param event 
   */
  getSelectedRowitem(event: any) {
    this.listProductSelected = event
  }

  /**
   * Hàm get output có import danh sách hạn mức không
   * @param isImportRange 
   */
  getIsImportRange(isImportRange: boolean) {
    this.isImportRange = isImportRange;
  }

  /**
   * Hàm xử lý mở popup import file
   */
  onImportExcel() {
    this.isImportRange = false;
    this.layoutService.setImportDialog(true);
    this.layoutService.setExcelValid(true);
  }

  /**
   * Hàm xử lý upload file
   * @param e 
   */
  uploadEventHand(e: File) {
    this.gridGiftRules.APIImportCOPOLPromotionGiftRange(e)
  }

  /**
   * Hàm đóng popup
   */
  handleClosePopup() {
    this.isOpenDialogAddGift = false;
    this.searchKeyDialog = null;
    this.isDisabled = false;
    this.isDisabledSelectParent = false;
    this.isDisabledPopup = false;
    this.listProductSelected = []
  }

  //#region API
  /**
 * Lấy danh sách thông tin loại chương trình
 */
  APIGetListCOPOLPromotionGiftType() {
    var ctx = "lấy danh sách thông tin loại chương trình"

    this.apiMarService.GetListCOPOLPromotionGiftType().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.ListActionCreate = res.ObjectReturn
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
    });
  }

  /**
   * Update status promotion
   */
  APIUpdatePromotionStatus(listDTO: DTOPromotionProduct[], reqStatus: number) {
    const apiText = 'cập nhật trạng thái bảng công việc';
    this.isloadingBlock1 = true;

    this.apiMarService.UpdatePromotionStatus(listDTO, reqStatus).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(apiText + ' thành công');
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
        // localStorage.setItem('COPOLPromotion', JSON.stringify(this.dataHrPolicyMaster));
        // this.handleloadData(this.dataHrPolicyMaster);
        // this.statusPolicyMaster = this.dataHrPolicyMaster.Status;
        // this.childGridTaskList.onFilterData();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`);
      }
      this.isloadingBlock1 = false;
    }, (err) => {
      this.isloadingBlock1 = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`);
    });
  }

  /**
   * API lấy danh sách quà tặng
   */
  APIGetListCOLSGift() {
    let apiText = "danh sách sản phẩm";

    this.apiMarService.GetListCOLSGift(this.gridState)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res: DTOResponse) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            const allGiftBarcodes = new Set<string>();
            this.listRange.forEach(range => {
              range.ListGift.forEach(gift => {
                allGiftBarcodes.add(gift.ProductBarcode);
              });
            });

            this.listProduct = res.ObjectReturn.Data.filter(
              item => !allGiftBarcodes.has(item.ProductBarcode)
            );

            this.updateCodeSequentially();
          } else {
            this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`);
          }

          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
        }
      );
  }


  /**
   * Thêm quà tặng vào mức quà tặng
   * 
   */
  APIAddListCOPOLPromotionGift(req: DTOCOLPromotionGiftCus[]) {
    let apiText = "danh sách sản phẩm"
    this.apiMarService.AddListCOPOLPromotionGift(req).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Thêm quà tặng thành công!`)
        this.handleClosePopup();
        this.APIGetListCOPOLPromotionRange();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`)
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    })
  }

  /**
   * API lấy danh sách hạn mức
   */
  APIGetListCOPOLPromotionRange() {
    let apiText = "danh sách quy định mức quà tặng"
    this.apiMarService.GetListCOPOLPromotionRange(this.gridState, this.curPromotion.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.newListRange = res.ObjectReturn.Data;
        const newCurRange = this.newListRange.find(range => range.Code == this.curRange.Code);
        this.gridGiftRules.handleAddGift(newCurRange.ListGift);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    });
  }

  //#region Destroy
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}