import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { State, SortDescriptor, CompositeFilterDescriptor, FilterDescriptor, distinct } from '@progress/kendo-data-query';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { ModuleDataItem, MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { MarPromotionAPIService } from '../../shared/services/marpromotion-api.service';
import DTOPromotionProduct from '../../shared/dto/DTOPromotionProduct.dto';
import { MarketingService } from '../../shared/services/marketing.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTOConfig, Ps_UtilObjectService } from 'src/app/p-lib';
import { PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { DTOWarehouse } from 'src/app/p-app/p-ecommerce/shared/dto/DTOWarehouse';
import { DTOUpdate } from 'src/app/p-app/p-ecommerce/shared/dto/DTOUpdate';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';

@Component({
  selector: 'app-mar021-discount-gift-list',
  templateUrl: './mar021-discount-gift-list.component.html',
  styleUrls: ['./mar021-discount-gift-list.component.scss']
})
export class Mar021DiscountGiftListComponent implements OnInit, OnDestroy {

  ngUnsubscribe$ = new Subject<void>();
  loading = false
  isFilterActive = true
  deleteDialogOpened = false
  deleteManyDialogOpened = false
  total = 0
  resIP = DTOConfig.appInfo.res
  //object
  listPromotion: DTOPromotionProduct[] = []
  deleteList: DTOPromotionProduct[] = []
  listWareHouse: DTOWarehouse[] = []//DTO
  curPromotion = new DTOPromotionProduct()
  //dropdown
  ListActionCreate = [
    // { PromotionType: 'Quà tặng theo sản phẩm', Code: 8, link: 'mar021-discount-gift-item' },
    // { PromotionType: 'Quà tặng theo nhóm sản phẩm', Code: 9, link: 'mar021-discount-gift-group' },
    // { PromotionType: 'Quà tặng theo hóa đơn', Code: 10, link: 'mar021-discount-gift-order' }
  ]

  listChuongTrinh: any[] = [
    { PromotionType: 'Tất cả', Code: -1 },
  ]
  listChannel: any[] = [
    { ChannelName: 'Tất cả', Channel: -1 },
  ]
  listDepartment: any[] = [
    { WHName: 'Tất cả', WH: -1 },
  ]

  //default dropdown
  //current dropdown
  currentTaoMoi: { PromotionType: string, Code: number } = null//this.listTaoMoi[0]
  defaultChuongTrinh = { PromotionType: 'Tất cả', Code: -1 }
  currentChuongTrinh: { PromotionType: string, Code: number } = this.defaultChuongTrinh//this.listChuongTrinh[0]
  currentChannel: { ChannelName: string, Channel: number } = { ChannelName: 'Tất cả', Channel: -1 }//this.listChuongTrinh[0]
  currentDepartment: { WHName: string, WH: number } = { WHName: 'Tất cả', WH: -1 }//this.listChuongTrinh[0]


  //header1
  dangSoanThao = true
  guiDuyet = false
  daDuyet = false
  ngungHienThi = false
  //header2
  searchForm: UntypedFormGroup

  /**
  @param 
  ** { Code: 1, TypeFilter: 'ngày', ValueFilter: 'eq' },
  ** { Code: 2, TypeFilter: 'sau', ValueFilter: 'gte' },
  ** { Code: 3, TypeFilter: 'trước', ValueFilter: 'lt' },
  */
  ListDateFilterOperator = [
    { Code: 1, TypeFilter: 'ngày', ValueFilter: 'eq' },
    { Code: 2, TypeFilter: 'sau', ValueFilter: 'lt' },
    { Code: 3, TypeFilter: 'trước', ValueFilter: 'gte' },
  ];

  //FILTER
  //header1
  filterTypeData: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [{ field: "TypeData", operator: "eq", value: 4 }]
  }
  filterCategory: FilterDescriptor = {
    field: "Category", operator: "eq", value: null
  }

  //header1
  filterStatusID: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }
  filterDangSoanThao: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 0
  }
  filterTraVe: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 4
  }
  filterGuiDuyet: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 1
  }
  filterDaDuyet: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 2
  }
  filterNgungHienThi: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 3
  }
  //header2
  //search box
  filterSearchBox: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }
  filterPromotionName: FilterDescriptor = {
    field: "PromotionName", operator: "contains", value: null
  }
  filterSummary: FilterDescriptor = {
    field: "Summary", operator: "contains", value: null
  }
  filterPromotionNo: FilterDescriptor = {
    field: "PromotionNo", operator: "contains", value: null
  }
  //grid
  allowActionDropdown = ['detail', 'edit', 'delete']
  //grid
  pageSize = 25
  pageSizes = [this.pageSize]
  gridDSView = new Subject<any>();
  gridDSState: State = {
    take: this.pageSize,
    filter: { filters: [], logic: 'and' },
    sort: [{ field: 'StatusID', dir: 'asc' }, { field: 'RemainDay', dir: 'asc' }]
  }

  /**
 @param 
 ** { Code: 1, TypeFilter: 'ngày', ValueFilter: 'eq' },
 ** { Code: 2, TypeFilter: 'sau', ValueFilter: 'gte' },
 ** { Code: 3, TypeFilter: 'trước', ValueFilter: 'lt' },
 */
  curDateFilterOperator: any = { Code: 1, TypeFilter: 'ngày', ValueFilter: 'eq' }
  curDateFilterValue: Date;
  filtersGroup: string[] = [
    'StaffID',
    'FullName',
    'DepartmentName',
    'LocationName',
    'PositionName',
  ];

  handleFilterChange(value: any, property: string) {
    this[property] = value;
    this.loadFilter();
    this.GetListPromotion()
  }

  handleDateChange(value: any, property: string) {
    this[property] = value;
    this.loadFilter();
    this.GetListPromotion()
  }

  handleOperatorChange(value: any, property: string) {
    this[property] = value;
    if (Ps_UtilObjectService.hasValue(this.curDateFilterValue)) {
      this.loadFilter();
      this.GetListPromotion()
    }
  }
  //CALLBACK
  //grid data
  onPageChangeCallback: Function
  onSortChangeCallback: Function
  //rowItem action dropdown
  getActionDropdownCallback: Function
  onActionDropdownClickCallback: Function
  //grid select
  getSelectionPopupCallback: Function
  onSelectCallback: Function
  onSelectedPopupBtnCallback: Function
  //select
  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  }
  //permision
  justLoadedChangePermissionAPI: boolean = true
  justLoaded = true
  actionPerm: DTOActionPermission[] = []

  isToanQuyen = false
  isAllowedToCreate = false
  isAllowedToVerify = false

  constructor(
    public menuService: PS_HelperMenuService,
    public service: MarketingService,
    public apiService: MarPromotionAPIService,
    public layoutApiService: LayoutAPIService,
    public layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    let that = this
    // this.listChuongTrinh.push(...this.ListActionCreate)

    //load
    this.loadSearchForm()
    this.loadFilter()

    this.menuService.changePermission().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")

        that.isToanQuyen = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        that.isAllowedToCreate = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        that.isAllowedToVerify = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

        // that.getData()
      }
    })

    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        that.getData();
      }
    })
    //callback
    this.onPageChangeCallback = this.pageChange.bind(this)
    this.onSortChangeCallback = this.sortChange.bind(this)
    //action dropdown    
    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
    //select
    this.getSelectionPopupCallback = this.getSelectionPopup.bind(this)
    this.onSelectCallback = this.selectChange.bind(this)
    this.onSelectedPopupBtnCallback = this.onSelectedPopupBtnClick.bind(this)

  }
  getData() {
    this.GetListPromotion()
    this.GetListCOPOLPromotionGiftType()
    this.GetListCOPOLPromotionChannel()
    this.GetPromotionWareHouse()
  }
  //load  
  loadSearchForm() {
    this.searchForm = new UntypedFormGroup({
      'SearchQuery': new UntypedFormControl(''),
    })
  }
  loadFilter() {
    this.pageSizes = [...this.service.pageSizes]
    this.gridDSState.take = this.pageSize
    this.gridDSState.filter.filters = []
    this.filterSearchBox.filters = []
    this.filterStatusID.filters = []
    //
    this.gridDSState.filter.filters.push(this.filterTypeData)
    //search box
    if (Ps_UtilObjectService.hasValueString(this.filterPromotionName.value))
      this.filterSearchBox.filters.push(this.filterPromotionName)

    if (Ps_UtilObjectService.hasValueString(this.filterSummary.value))
      this.filterSearchBox.filters.push(this.filterSummary)

    if (Ps_UtilObjectService.hasValueString(this.filterPromotionNo.value))
      this.filterSearchBox.filters.push(this.filterPromotionNo)

    if (this.filterSearchBox.filters.length > 0)
      this.gridDSState.filter.filters.push(this.filterSearchBox)

    //checkbox header 1 status id
    if (this.dangSoanThao)
      this.filterStatusID.filters.push(this.filterDangSoanThao, this.filterTraVe)

    if (this.guiDuyet)
      this.filterStatusID.filters.push(this.filterGuiDuyet)

    if (this.daDuyet)
      this.filterStatusID.filters.push(this.filterDaDuyet)

    if (this.ngungHienThi)
      this.filterStatusID.filters.push(this.filterNgungHienThi)

    if (this.filterStatusID.filters.length > 0)
      this.gridDSState.filter.filters.push(this.filterStatusID)

    // Ngày hiệu lực
    if (Ps_UtilObjectService.hasValue(this.curDateFilterValue)) {
      let filter = {
        field: 'StartDate',
        operator: this.curDateFilterOperator.ValueFilter,
        value: this.curDateFilterValue.toDateString(),
        ignoreCase: true,
      };
      this.gridDSState.filter.filters.push(filter);
    }

    //dropdown header 1
    if (this.currentChuongTrinh.Code != -1) {
      this.filterCategory.value = this.currentChuongTrinh.Code
      this.gridDSState.filter.filters.push(this.filterCategory)
    }

  }
  resetFilter() {
    //header1
    this.currentChuongTrinh = this.defaultChuongTrinh;
    this.filterCategory.value = null
    this.curDateFilterValue = null
    this.currentDepartment = { WHName: 'Tất cả', WH: -1 }
    this.currentChannel = { ChannelName: 'Tất cả', Channel: -1 }

    this.dangSoanThao = true
    this.guiDuyet = false
    this.daDuyet = false
    this.ngungHienThi = false
    // //header2
    this.searchForm.get('SearchQuery').setValue(null)
    this.filterPromotionName.value = null
    this.filterPromotionNo.value = null
    this.filterSummary.value = null

    this.gridDSState.sort = [{ field: 'StatusID', dir: 'asc' }, { field: 'RemainDay', dir: 'asc' }]
    this.gridDSState.skip = 1;
    this.loadFilter()
    this.GetListPromotion()
  }
  ///KENDO GRID
  //paging
  pageChange(event: PageChangeEvent) {
    this.gridDSState.skip = event.skip;
    this.gridDSState.take = this.pageSize = event.take
    this.GetListPromotion()
  }
  sortChange(event: SortDescriptor[]) {
    this.gridDSState.sort = event
    this.GetListPromotion()
  }
  //API  
  GetListPromotion() {
    this.loading = true;
    let WHCode = (this.currentDepartment == null || this.currentDepartment.WH == -1) ? null : this.currentDepartment.WH
    let ChannelCode = (this.currentChannel == null || this.currentChannel.Channel == -1) ? null : this.currentChannel.Channel
    this.apiService.GetListPromotion(this.gridDSState, WHCode, ChannelCode).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listPromotion = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total
        this.gridDSView.next({ data: this.listPromotion, total: this.total });
      }else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chương trình quà tặng: ${res.ErrorString}`)
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  //update
  UpdatePromotion(properties: string[], promotion: DTOPromotionProduct = this.curPromotion) {
    this.loading = true;
    var ctx = "Cập nhật khuyến mãi"

    var updateDTO: DTOUpdate = {
      "DTO": promotion,
      "Properties": properties
    }

    this.apiService.UpdatePromotion(updateDTO).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()

        promotion = res.ObjectReturn
        var i = this.listPromotion.findIndex(s => s.Code == promotion.Code)

        if (i > -1)
          this.listPromotion.splice(i, 1, res.ObjectReturn)

        this.gridDSView.next({ data: this.listPromotion, total: this.total });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }
  UpdatePromotionStatus(list: DTOPromotionProduct[] = [this.curPromotion], status: number) {
    this.loading = true;
    var ctx = "Cập nhật tình trạng khuyến mãi"

    this.apiService.UpdatePromotionStatus(list, status).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.GetListPromotion()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }
  DeletePromotion(promotion: DTOPromotionProduct = this.curPromotion) {
    this.loading = true;
    var ctx = "Xóa chương trình khuyến mãi"

    this.apiService.DeletePromotion(promotion).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.deleteDialogOpened = false
        this.deleteManyDialogOpened = false
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()

        var i = this.listPromotion.findIndex(s => s.Code == promotion.Code)

        if (i > -1) {
          this.total--
          this.listPromotion.splice(i, 1)
          this.gridDSView.next({ data: this.listPromotion, total: this.total });
        }
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }

  /**
   * Lấy danh sách thông tin loại chương trình
   */
  GetListCOPOLPromotionGiftType() {
    this.loading = true;
    var ctx = "Lấy danh sách thông tin loại chương trình"

    this.apiService.GetListCOPOLPromotionGiftType().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.ListActionCreate = res.ObjectReturn
        this.listChuongTrinh = [{ PromotionType: 'Tất cả', Code: -1 }]
        this.listChuongTrinh.push(...this.ListActionCreate);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }

  /**
   * Lấy danh sách kênh đã duyệt (có nhóm kênh) của chương trình quà tặng
   * @param promotionCode code của chương trình khuyến mãi
   */
  GetListCOPOLPromotionChannel(promotionCode: number = 0) {
    this.loading = true;
    var ctx = "Lấy danh sách thông tin kênh áp dụng trong chương trình"

    this.apiService.GetListCOPOLPromotionChannel(promotionCode).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listChannel = [{ ChannelName: 'Tất cả', Channel: -1 }]
        this.listChannel.push(...res.ObjectReturn);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }

  GetPromotionWareHouse(promotionCode: number = 0) {
    this.loading = true;
    var ctx = "Lấy danh sách thông tin warehouse"

    this.apiService.GetPromotionWareHouse(promotionCode).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {

        let temp = res.ObjectReturn.filter(s => s.WH != 7);
        this.listDepartment = [{ WHName: 'Tất cả', WH: -1 }, { WHName: 'Website hachihachi.com.vn', WH: 7 }];
        this.listDepartment.push(...temp);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, (e) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      this.loading = false;
    });
  }

  //CLICK EVENT
  //header1
  onDropdownlistClick(ev, currentDropdown?: string) {
    if (currentDropdown != null) {
      if (currentDropdown != 'currentTaoMoi') {
        this[currentDropdown] = ev
        this.loadFilter()
        this.GetListPromotion()
      } else {
        this.currentTaoMoi = ev
        this.openPromotionDetail(true)
      }
    }
  }
  selectedBtnChange(e, strCheck: string) {
    this[strCheck] = e

    this.loadFilter()
    this.GetListPromotion()
  }
  // onAdd(category?: number) {
  //   this.openPromotionDetail(true, category)
  // }
  //header2
  search() {
    var val = this.searchForm.value
    var searchQuery = val.SearchQuery
    if (Ps_UtilObjectService.hasValueString(searchQuery)) {
      this.filterSummary.value = searchQuery
      this.filterPromotionName.value = searchQuery
      this.filterPromotionNo.value = searchQuery
    } else {
      this.filterSummary.value = null
      this.filterPromotionName.value = null
      this.filterPromotionNo.value = null
    }
    this.gridDSState.skip = 1;
    this.loadFilter();
    this.GetListPromotion()
  }
  //selection
  getSelectionPopup(selectedList: DTOPromotionProduct[]) {
    var moreActionDropdown = new Array<MenuDataItem>()
    var canGuiDuyet = selectedList.findIndex(s => (s.StatusID == 0 || s.StatusID == 4))
    var canXoa = selectedList.findIndex(s => s.StatusID == 0)

    if (canGuiDuyet != -1 && (this.isToanQuyen || this.isAllowedToCreate))
      moreActionDropdown.push({
        Type: "StatusID", Name: "Gửi duyệt", Code: "redo", Link: "1", Actived: true, LstChild: []
      })
    //
    if (this.isToanQuyen || this.isAllowedToVerify) {
      var canPheDuyet_canTraLai = selectedList.findIndex(s => (s.StatusID == 1 || s.StatusID == 3))

      if (canPheDuyet_canTraLai != -1) {
        moreActionDropdown.push({
          Type: "StatusID", Name: "Phê duyệt", Code: "check-outline", Link: "2", Actived: true, LstChild: []
        })

        moreActionDropdown.push({
          Type: "StatusID", Name: "Trả về", Code: "undo", Link: "4", Actived: true, LstChild: []
        })
      }

      var canStop = selectedList.findIndex(s => s.StatusID == 2)

      if (canStop != -1)
        moreActionDropdown.push({
          Type: "StatusID", Name: "Ngưng hiển thị", Code: "minus-outline", Link: "3", Actived: true, LstChild: []
        })
    }
    //delete
    if (canXoa != -1 && (this.isToanQuyen || this.isAllowedToCreate))
      moreActionDropdown.push({
        Name: "Xóa chương trình", Type: 'delete',
        Code: "trash", Link: "delete", Actived: true, LstChild: []
      })

    return moreActionDropdown
  }

  onSelectedPopupBtnClick(btnType: string, list: DTOPromotionProduct[], value: any) {
    if (list.length > 0) {
      if (btnType == "StatusID") {
        var arr = []

        if (value == 1 || value == '1')//Gửi duyệt
          list.forEach(s => {
            if ((s.StatusID == 0 || s.StatusID == 4) && this.onCheckFields(s)) {
              // s.StatusID = 1
              // this.UpdatePromotion(["StatusID"], s)
              arr.push(s)
            }
          })
        else if (value == 2 || value == '2')//Phê duyệt
          list.forEach(s => {
            if ((s.StatusID == 1 || s.StatusID == 3) && this.onCheckFields(s)) {
              // s.StatusID = 2
              // this.UpdatePromotion(["StatusID"], s)
              arr.push(s)
            }
          })
        else if (value == 0 || value == '0' || value == 4 || value == '4')//Trả về
          list.forEach(s => {
            if (s.StatusID == 1 || s.StatusID == 3) {
              // s.StatusID = 4
              // this.UpdatePromotion(["StatusID"], s)
              arr.push(s)
            }
          })
        else if (value == 3 || value == '3')//Ngưng hiển thị
          list.forEach(s => {
            if (s.StatusID == 2) {
              // s.StatusID = 3
              // this.UpdatePromotion(["StatusID"], s)
              arr.push(s)
            }
          })

        if (Ps_UtilObjectService.hasListValue(arr))
          this.UpdatePromotionStatus(arr, value)
        else
          this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
      }
      else if (btnType == "delete") {//Xóa
        this.onDeleteManyPromotion()
        this.deleteList = []

        list.forEach(s => {
          if (s.StatusID == 0)
            this.deleteList.push(s)
        })
      }
    }
  }

  selectChange(isSelectedRowitemDialogVisible) {
    this.isFilterActive = !isSelectedRowitemDialogVisible
  }
  //dropdown
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOPromotionProduct) {
    moreActionDropdown = []
    this.curPromotion = { ...dataItem }
    var statusID = this.curPromotion.StatusID;
    const ctx = 'CTQT';

    // Kiểm tra quyền tạo hoặc toàn quyền
    const canCreateOrAdmin = this.isAllowedToCreate || this.isToanQuyen;

    // Kiểm tra quyền duyệt
    const canVerify = this.isAllowedToVerify || this.isToanQuyen;

    // Push "Chỉnh sửa" khi có quyền tạo hoặc toàn quyền và statusID = 0 hoặc statusID = 4
    if (canCreateOrAdmin && (statusID === 0 || statusID == 4) || canVerify && statusID === 1) {
      moreActionDropdown.push({
        Name: 'Chỉnh sửa',
        Code: 'pencil',
        Type: 'edit',
        Actived: true,
      });
    } else {
      // Nếu không thỏa điều kiện "Chỉnh sửa" thì push "Xem chi tiết"
      moreActionDropdown.push({
        Name: 'Xem chi tiết',
        Code: 'eye',
        Link: 'detail',
        Actived: true,
      });
    }

    // Push "Gửi duyệt" khi có quyền tạo hoặc toàn quyền và statusID = 0 hoặc statusID = 4
    if (canCreateOrAdmin && (statusID === 0 || statusID === 4)) {
        moreActionDropdown.push({
          Type: 'StatusID',
          Name: 'Gửi duyệt',
          Code: 'redo',
          Link: '1',
          Actived: true,
          LstChild: [],
        });
    }

    // Push "Phê duyệt" khi có quyền duyệt hoặc toàn quyền và statusID = 1 hoặc statusID = 3
    if (canVerify && (statusID === 1 || statusID === 3)) {
        moreActionDropdown.push({
          Type: 'StatusID',
          Name: 'Phê duyệt',
          Code: 'check-outline',
          Link: '2',
          Actived: true,
          LstChild: [],
        });

      // Push "Trả về" khi có quyền duyệt hoặc toàn quyền và statusID = 1 hoặc statusID = 3
      moreActionDropdown.push({
        Type: 'StatusID',
        Name: 'Trả về',
        Code: 'undo',
        Link: '4',
        Actived: true,
        LstChild: [],
      });
    }

    // Push "Ngưng hiển thị" khi có quyền duyệt hoặc toàn quyền và statusID = 2
    if (canVerify && statusID === 2) {
      moreActionDropdown.push({
        Name: 'Ngưng áp dụng',
        Type: 'StatusID',
        Code: 'minus-outline',
        Link: '3',
        Actived: true,
        LstChild: [],
      });
    }

    // Push "Xóa" khi có quyền tạo hoặc toàn quyền và statusID === 0
    if (canCreateOrAdmin && statusID === 0) {
      moreActionDropdown.push({
        Name: `Xóa ${ctx}`,
        Type: 'delete',
        Code: 'trash',
        Link: 'delete',
        Actived: true,
        LstChild: [],
      });
    }

    // Sắp xếp theo thứ tự: xem -> chỉnh sửa -> gửi -> duyệt -> ngưng -> trả về
    return moreActionDropdown;
  }
  onActionDropdownClick(menu: MenuDataItem, item: DTOPromotionProduct) {
    if (item.Code != 0) {
      if (menu.Link == 'delete' || menu.Code == 'trash') {
        this.curPromotion = { ...item }
        this.onDeletePromotion()
      }
      else if (menu.Type == 'StatusID') {
        this.curPromotion = { ...item }
        // this.curPromotion.StatusID = parseInt(menu.Link)
        //this.UpdatePromotion(["StatusID"])
        if (this.onCheckFields(this.curPromotion)) {
          this.UpdatePromotionStatus([this.curPromotion], parseInt(menu.Link))
        }
      }
      else if (menu.Link == 'edit' || menu.Code == 'pencil' || menu.Code == "eye" || menu.Link == 'detail') {
        this.curPromotion = { ...item }
        this.openPromotionDetail(false)
      }
    }
  }
   onCheckFields(promotion: DTOPromotionProduct){
      var isValid = true;
      if (!Ps_UtilObjectService.hasValueString(promotion.PromotionNo)){
        this.layoutService.onWarning(`Chương trình này chưa có mã`)
        return isValid = false; 
      } 
      if (!Ps_UtilObjectService.hasValueString(promotion.VNPromotion)){
        this.layoutService.onWarning(`Chương trình ${promotion.PromotionNo} thiếu tên chương trình`)
        return isValid = false; 
      } 
      if (!Ps_UtilObjectService.hasValue(promotion.StartDate)){
        this.layoutService.onWarning(`Chương trình ${promotion.PromotionNo} thiếu ngày bắt đầu hiệu lực`)
        return isValid = false; 
      } 
      if (!Ps_UtilObjectService.hasValue(promotion.EndDate)){
        this.layoutService.onWarning(`Chương trình ${promotion.PromotionNo} thiếu ngày kết thúc hiệu lực`)
        return isValid = false; 
      }
      if (promotion.IsAllApplied !== true && promotion.TotalStore === 0 &&
        promotion.IsAllChannelApplied !== true && promotion.TotalChannel === 0){
        this.layoutService.onWarning(`Chương trình ${promotion.PromotionNo} chưa chọn phạm vi áp dụng nào`)
        return isValid = false; 
      }
      return isValid
    }
  //delete
  onDeletePromotion() {
    this.deleteDialogOpened = true
  }
  delete() {
    if (this.curPromotion.Code != 0)
      this.DeletePromotion()
  }
  closeDeleteDialog() {
    this.deleteDialogOpened = false
  }
  //delete many
  onDeleteManyPromotion() {
    this.deleteManyDialogOpened = true
  }
  deleteMany() {
    this.deleteList.forEach(s => {
      this.DeletePromotion(s)
    });
  }
  closeDeleteManyDialog() {
    this.deleteManyDialogOpened = false
  }

  /**
   * Hàm mở trang chi tiết khuyến mãi
   * @param link URL
   * @param isAdd true: tạo mới, false: chỉnh sửa
   */
  openPromotionDetail(isAdd: boolean) {
    let link = ''
    this.menuService.changeModuleData().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((item: ModuleDataItem) => {
      this.service.isAdd = isAdd
      if (isAdd) {
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
        link = (this.currentTaoMoi.Code == 15 || this.currentTaoMoi.PromotionType == 'Quà tặng theo sản phẩm')  ? 'mar021-discount-gift-item' 
        :  (this.currentTaoMoi.Code == 16 || this.currentTaoMoi.PromotionType == 'Quà tặng theo nhóm sản phẩm') ? 'mar021-discount-gift-group' 
        : 'mar021-discount-gift-order'

      } else {
        // Mặc định nếu không có category thì sẽ là quà tặng theo sản phẩm
        if (!Ps_UtilObjectService.hasValue(this.curPromotion.Category)) {
          this.curPromotion.Category = 15
          this.curPromotion.CategoryName = 'Quà tặng theo sản phẩm'
        }
        this.curPromotion.TypeData = 3
        this.service.setCachePromotionDetail(this.curPromotion)
        link = this.curPromotion.Category == 15 || this.curPromotion.CategoryName == 'Quà tặng theo sản phẩm' ? 'mar021-discount-gift-item' 
        : (this.curPromotion.Category == 16 || this.curPromotion.CategoryName == 'Quà tặng theo nhóm sản phẩm') ? 'mar021-discount-gift-group' 
        : 'mar021-discount-gift-order'
      }

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
  //AUTORUN
  public isItemDisabled(itemArgs: { dataItem: any; index: number }) {
    return itemArgs.dataItem.value == -1;
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
