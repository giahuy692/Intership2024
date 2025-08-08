import { formatDate } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  SortDescriptor,
  State,
  distinct,
} from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  MenuDataItem,
  ModuleDataItem,
} from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { HriDecisionApiService } from '../../services/hri-decision-api.service';
import { DTOHRDecisionMaster } from '../../dto/DTOHRDecisionMaster.dto';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { SearchFilterGroupComponent } from 'src/app/p-app/p-layout/components/search-filter-group/search-filter-group.component';

@Component({
  selector: 'app-hr-offboard-decision-list',
  templateUrl: './hr-offboard-decision-list.component.html',
  styleUrls: ['./hr-offboard-decision-list.component.scss'],
})
export class HrOffboardDecisionListComponent {
  /**
   * Nhận vào giá trị number để kiểm tra loại của list
   * @type {number} Nếu là 1 : dùng cho danh sách quyết định nghỉ việc / 2 : dùng cho danh sách quyết định kỷ luật
   */
  @Input() TypeList: number = 1;

  //common variable
  isLoading = false;
  isAdd = true;
  isFilterActive = true;
  tempSearch: any;
  excelValid = true;
  isFilterDisable: false;
  curDateFilterValue: any = null;
  Unsubscribe = new Subject<void>();
  currentList: String = '';
  isStoppedDecisionDialogShow: boolean = false;
  
  // DIALOG CONFIRM
  openConfirm: boolean = false;
  dataDelete: DTOHRDecisionMaster = new DTOHRDecisionMaster();

  // Data dropdown của filter ngày hiệu lực
  optionFilterDate = [
    { text: 'từ', value: 1 },
    { text: 'trước', value: 2 },
  ];
  currentFilterValue: { text: string; value: number } = {
    text: 'từ',
    value: 1,
  };
  filterDate: Date;

  //header1
  dangsoan_checked = true;
  dangsoan_count = 0;
  guiduyet_checked = true;
  guiduyet_count = 0;
  duyetapdung_checked = false;
  duyetapdung_count = 0;
  ngungapdung_checked = false;
  ngungapdung_count = 0;

  // app-search-filter-group
  placeholder = 'Tìm theo mã, tên của nhân sự hoặc mã quyết định';

  // GRID
  gridView = new Subject<any>();
  pageSize = 25;
  pageSizes = [this.pageSize];
  allowActionDropdown = [];

  skip = 0;
  sortBy: SortDescriptor = {
    field: 'Code',
    dir: 'desc',
  };
  gridState: State = {
    take: this.pageSize,
    sort: [this.sortBy],
    filter: { filters: [], logic: 'and' },
    skip: this.skip,
  };
  // grid data change
  onPageChangeCallback: Function;
  //rowItem action dropdown
  onActionDropdownClickCallback: Function;
  getActionDropdownCallback: Function;
  //grid select
  getSelectionPopupCallback: Function;
  onSelectCallback: Function;
  onSelectedPopupBtnCallback: Function;

  total = 0;

  // FILTER
  //status
  filterStatus: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };
  filterStatus_dangsoan: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 0,
  };
  filterStatus_guiduyet: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 1,
  };
  filterStatus_duyetapdung: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 2,
  };
  filterStatus_ngungapdung: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 3,
  };
  filterStatus_trave: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 4,
  };

  // TypeData
  filterTypeData: FilterDescriptor = {
    field: 'TypeData',
    operator: 'eq',
    value: 0,
  };

  filterSearchBox: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  //#region PERMISSION
  isAllPers: boolean = false;
  isCanCreate: boolean = false;
  isCanApproved: boolean = false;
  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true;
  dataPerm: DTODataPermission[] = [];
  actionPerm: DTOActionPermission[] = [];

  M_A: boolean; // Quyền là Master hoặc Approver
  M_C: boolean; // Quyền là Master hoặc Creator
  /**
   * Danh sách quyền
   * - 0. Master
   * - 1. Creator
   * - 2. Approver
   */
  listPermission: number[] = [];
  //#endregion
  @ViewChild('search') search: SearchFilterGroupComponent;


  /**
   * Danh sách các API để unscribe khi component bị destroy
   */
  arrSub: Subscription[] = [];

  //#region ==================================
  //#endregion

  //#region LifecycleHook

  constructor(
    public layoutService: LayoutService,
    public menuService: PS_HelperMenuService,
    public domSanititizer: DomSanitizer,
    private apiService: HriDecisionApiService
  ) { }

  ngOnInit(): void {
    if (this.TypeList == 1) {
      this.currentList = 'resignation';
    }
    else {
      this.currentList = 'termination';
    }

    let a = this.menuService.changePermission().pipe(takeUntil(this.Unsubscribe)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');
        this.isAllPers = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCanCreate = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isCanApproved = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;

        this.M_A = this.isAllPers || this.isCanApproved;
        this.M_C = this.isAllPers || this.isCanCreate;
        this.listPermission = [this.isAllPers && 0, this.isCanCreate && 1, this.isCanApproved && 2];

        this.justLoaded = false;
      }
    });

    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.onActionDropdownClickCallback = this.onActionDropdown.bind(this);
    this.onPageChangeCallback = this.onChangePage.bind(this);

    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.onLoadFilter();
        this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
      }
    })

    this.arrSub.push(a, b);
  }

  ngOnDestroy(): void {
    // this.Unsubscribe.next();
    // this.Unsubscribe.complete();
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
  //#endregion

  onLoadPage() {
    if (this.isFilterActive) {
      this.onLoadFilter();
      this.APIGetListHRDecisionMaster(
        this.gridState,
        this.filterTypeData.value
      );
    }
  }

  //#region ===========================================
  //#endregion

  //#region FILTER

  /**
   *
   * @param e VALUE CLICK
   * @param strCheck TYPE CHECKED
   */
  selectedBtnChange(e, strCheck: string) {
    this[strCheck] = e;
    this.gridState.skip = 0;
    this.onLoadFilter();
    this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
  }

  // Xử lý tìm kiếm
  /**
   *
   * @param event EVENT SEARCH
   */
  handleSearch(event: any) {
    if (event.filters && event.filters.length > 0) {
      if (event.filters[0].value === '') {
        this.gridState.skip = 0;
        this.onLoadFilter();
        this.APIGetListHRDecisionMaster(
          this.gridState,
          this.filterTypeData.value
        );
      } else if (Ps_UtilObjectService.hasValueString(event)) {
        this.filterSearchBox.filters = event.filters;
        this.tempSearch = event.filters;
        this.gridState.skip = 0;
        this.onLoadFilter();
        this.APIGetListHRDecisionMaster(
          this.gridState,
          this.filterTypeData.value
        );
      }
    }
  }

  // HÀM XỬ LÍ FILTER
  onLoadFilter() {
    this.pageSizes = [...this.layoutService.pageSizes];
    this.gridState.take = this.pageSize;
    this.gridState.filter.filters = [];

    this.filterStatus.filters = [];
    // TYPEDATA CỦA QUYẾT ĐỊNH
    if (this.currentList == 'resignation') this.filterTypeData.value = 4;
    else this.filterTypeData.value = 3;

    // this.gridState.filter.filters.push(this.filterTypeData);

    //status
    if (this.dangsoan_checked) {
      this.filterStatus.filters.push(this.filterStatus_dangsoan);
      this.filterStatus.filters.push(this.filterStatus_trave);
    }

    if (this.guiduyet_checked) {
      this.filterStatus.filters.push(this.filterStatus_guiduyet);
    }

    if (this.duyetapdung_checked) {
      this.filterStatus.filters.push(this.filterStatus_duyetapdung);
    }

    if (this.ngungapdung_checked) {
      this.filterStatus.filters.push(this.filterStatus_ngungapdung);
    }

    if (this.filterStatus.filters.length > 0) {
      this.gridState.filter.filters.push(this.filterStatus);
    }

    this.onLoadFilterHeader2('gridState')
  }

  // Dùng khi xuất
  exportState: State = {
    filter: { filters: [], logic: 'and' },
  };
  onLoadFilterHeader2(filNamle: string) {
    // SEARCH BOX
    if (Ps_UtilObjectService.hasListValue(this.filterSearchBox.filters)) {
      if (this.tempSearch[0].value != '') {
        this[filNamle].filter.filters.push(this.filterSearchBox);
      }
    }

    // FILTER DATE DROPDOWN
    if (Ps_UtilObjectService.hasValueString(this.dateString)) {
      if (this.typeAfBe == 1)
        this[filNamle].filter.filters.push(this.filterFrom);
      else this[filNamle].filter.filters.push(this.filterAfter);
    }
  }

  // Xử lý reset filter
  onResetFilter() {
    this.guiduyet_checked = true;
    this.dangsoan_checked = true;
    this.duyetapdung_checked = false;
    this.ngungapdung_checked = false;
    this.gridState.skip = 0;
    this.curDateFilterValue = null;
    this.currentFilterValue = this.optionFilterDate[0];
    this.dateString = '';
    this.filterDate = null;
    // this.tempSearch = '';

    this.onLoadFilter();
    this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
  }

  // CHỌN DROPDOWN TỪ/TRƯỚC
  filterDay: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  filterAfter: FilterDescriptor = {
    field: 'EffDate',
    operator: 'lt',
    value: '2',
  };
  filterFrom: FilterDescriptor = {
    field: 'EffDate',
    operator: 'gte',
    value: '1',
  };
  dateString: string = '';
  typeAfBe: number = this.optionFilterDate[0].value;

  /**
   * HÀM XỬ LÍ DROPDOWN TỪ TRƯỚC
   * @param event EVENT
   */
  onDropdownFilterDate(event: any) {
    this.typeAfBe = event.value;
    if (Ps_UtilObjectService.hasValueString(this.filterDate)) {
      if (event.value == 1)
        //from
        this.filterFrom.value = this.dateString;
      //before
      else this.filterAfter.value = this.dateString;

      this.onLoadFilter();
      this.APIGetListHRDecisionMaster(
        this.gridState,
        this.filterTypeData.value
      );
    }
  }

  /**
   * CHỌN DATE PICKER
   * @param event EVENT
   */
  onDatepickerChange(event: Date) {
    this.filterDate = event;
    this.gridState.skip = 0;
    this.dateString = formatDate(
      this.filterDate,
      'yyyy-MM-ddTHH:mm:ss',
      'en-US'
    );
    if (this.typeAfBe == 1) this.filterFrom.value = this.dateString;
    else this.filterAfter.value = this.dateString;
    this.onLoadFilter();
    this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
  }

  /**
   * pages change
   * @param event EVENT
   */
  onChangePage(event: PageChangeEvent) {
    this.gridState.skip = event.skip;
    this.gridState.take = this.pageSize = event.take;
    this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
  }
  //#endregion

  //#region ==================================
  //#endregion

  //#region FunctionPopup
  /**
   * Hàm dùng để trả về date dùng để filter 
   * @param date Ngày cần filter
   * @param option Đầu ngày hoặc cuối ngày
   */
  formatDateToFilter(date: Date, option: 'Start' | 'End'): string {
    const hours = option === 'Start' ? '00' : '23';
    const minutes = option === 'Start' ? '00' : '59';
    const seconds = option === 'Start' ? '00' : '59';

    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${hours}:${minutes}:${seconds}`;
  }

  dataPetition: any = [];

  /**
   * HÀM THÊM CHỨC NĂNG CHO POPUP
   * @param moreActionDropdown ACTION CỦA POPUP
   * @param dataItem DATAITEM CLICK
   * @returns
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOHRDecisionMaster) {
    this.dataDelete = dataItem;
    let status = dataItem.Status;
    moreActionDropdown = [];

    const con1 = [0, 4].includes(status);
    const con2 = this.listPermission.includes(0) || this.listPermission.includes(1);
    const con3 = this.listPermission.includes(0) || this.listPermission.includes(2);
    const startOfDate = this.formatDateToFilter(new Date(), 'Start');
    const startOfEffDate = this.formatDateToFilter(new Date(dataItem.EffDate), 'Start');
    const canStop = Ps_UtilObjectService.getDaysLeft(startOfDate, startOfEffDate) > 0;
    const con5 = [1, 3].includes(status);

    // Nếu người dùng không có quyền gì
    if (!Ps_UtilObjectService.hasListValue(this.listPermission)) {
      return [{ Name: 'Xem chi tiết', Code: 'eye', Type: 'detail', Actived: true }];
    }

    // Action CHỈNH SỬA VÀ XEM CHI TIẾT
    if ((con1 && con2) || (status == 1 && con3)) {
      moreActionDropdown.push({ Name: 'Chỉnh sửa', Code: 'pencil', Type: 'edit', Actived: true });
    }
    else {
      moreActionDropdown.push({ Name: 'Xem chi tiết', Code: 'eye', Type: 'detail', Actived: true });
    }

    // Trạng thái hiện tại: Đang soạn thảo và trả về
    if (con1 && con2) {
      moreActionDropdown.push({ Name: 'Gửi duyệt', Code: 'redo', Type: 'Status', Link: '1', Actived: true });
    }
    // Trạng thái hiện tại: Gửi duyệt hoặc Ngưng áp dụng
    else if (con3 && status == 1) {
      moreActionDropdown.push({ Name: 'Trả về', Code: 'undo', Type: 'Status', Link: '4', Actived: true });
      moreActionDropdown.push({ Name: 'Phê duyệt', Code: 'check-outline', Type: 'Status', Link: '2', Actived: true });
    }
    // Trạng thái hiện tại: Duyệt áp dụng
    else if (status == 2 && con3) {
      if ((this.TypeList == 1 && canStop) || this.TypeList == 2) {
        moreActionDropdown.push({ Name: 'Ngưng áp dụng', Code: 'minus-outline', Type: 'Status', Link: '3', Actived: true });
      }
    }

    return moreActionDropdown;
  }

  /**
   * HÀM XỬ LÍ CHỌN CHỨC NĂNG TRÊN POPUP
   * @param menu MENU DATAITEM
   * @param dataItem DATAITEM CLICK
   */
  onActionDropdown(menu: MenuDataItem, dataItem: DTOHRDecisionMaster) {
    const link = menu.Link;
    if (dataItem.Code !== 0) {
      // VÀO TRANG CHI TIẾT
      if (menu.Link == 'edit' || menu.Code == 'pencil' || menu.Link == 'detail' || menu.Code == 'eye') {
        this.onOpenDetail(false, dataItem);
        return;
      }

      // XOÁ
      if (menu.Name == 'Xóa' || menu.Code == 'trash') {
        this.openConfirm = true;
        return;
      }

      // CẬP NHẬT TRẠNG THÁI
      if ([1, 2].includes(parseInt(link))) {
        if (this.onCheckField(dataItem)) {
          this.isLoading = true;
          this.APIUpdateHRDecisionMasterStatus([dataItem], parseInt(link));
        }
      }
      else if(parseInt(link) == 3){
        this.isStoppedDecisionDialogShow = true;
      }
      else{
        this.isLoading = true;
        this.APIUpdateHRDecisionMasterStatus([dataItem], parseInt(link));
      }
    }
  }

  /**
   * HÀM KIỂM TRA FIELD CỦA DATAITEM -> TRẢ VỀ GIÁ TRỊ TRUE FALSE
   * @param dataItem DATAITEM
   * @returns
   */
  onCheckField(dataItem: DTOHRDecisionMaster) {
    let type: String = '';
    if (this.currentList == 'termination') type = 'Kỷ luật';
    else if (this.currentList == 'resignation') type = 'Nghỉ việc';
    let ctx = `Đã xảy ra lỗi khi cập nhật trạng thái ${type} của quyết định ${dataItem.DecisionID}: thiếu `;
    const effDate = new Date(dataItem.EffDate);
    const currentDate = new Date();

    if (!Ps_UtilObjectService.hasValueString(dataItem.StaffID)) {
      this.layoutService.onError(ctx + 'Thông tin nhân sự');
      return false;
    } else if (!Ps_UtilObjectService.hasValueString(dataItem.EffDate)) {
      this.layoutService.onError(ctx + 'Ngày hiệu lực');
      return false;
    }
    // Chỉ so sánh ngày, bỏ qua giờ phút giây
    else if (
      Ps_UtilObjectService.hasValueString(dataItem.EffDate) &&
      effDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
    ) {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${type} ${dataItem.DecisionID}: Ngày hiệu lực phải là hiện tại hoặc tương lai.`);
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(dataItem.ReasonName)) {
      this.layoutService.onError(ctx + `Lý do ${type}`);
      return false;
    }
    return true;
  }

  /**
   * HÀM XỬ LÍ MỞ TRANG CHI TIẾT , CHUYỂN TRANG
   * @param isAddNew NẾU LÀ TẠO MỚI :TRUE
   * @param dataItem DATAITEM NẾU LÀ CHỈNH SỬA
   */
  onOpenDetail(isAddNew: boolean, dataItem?: DTOHRDecisionMaster) {
    // event.stopPropagation();
    var TypeData: number = -1;
    let a = this.menuService.changeModuleData().pipe(takeUntil(this.Unsubscribe)).subscribe((item: ModuleDataItem) => {
      var parent = item.ListMenu.find((f) => f.Code.includes('hriDecision') || f.Link.includes('"hri023-decision-hiring-list"'));
      if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
        if (this.currentList == 'resignation') {
          TypeData = 4;
          var detail = parent.LstChild.find((f) => f.Code.includes('hri026-resignation-decision-list') || f.Link.includes('hri026-resignation-decision-list'));
        }
        else if (this.currentList == 'termination') {
          TypeData = 3;
          var detail = parent.LstChild.find((f) => f.Code.includes('hri027-termination-decision-list') || f.Link.includes('hri027-termination-decision-list'));
        }

        if (Ps_UtilObjectService.hasValue(detail) && Ps_UtilObjectService.hasListValue(detail.LstChild)) {
          var detail2 = detail.LstChild.find(
            (f) =>
              f.Code.includes('hri026-resignation-decision-detail') ||
              f.Link.includes('hri026-resignation-decision-detail') ||
              f.Code.includes('hri027-termination-decision-detail') ||
              f.Link.includes('hri027-termination-decision-detail')
          );

          if (isAddNew) {
            var addNew: DTOHRDecisionMaster = new DTOHRDecisionMaster();
            addNew.TypeData = TypeData;
            localStorage.setItem('HrDecisionMaster', JSON.stringify(addNew));
          }
          else {
            dataItem.TypeData = TypeData;
            localStorage.setItem('HrDecisionMaster', JSON.stringify(dataItem));
          }
          this.menuService.activeMenu(detail2);
        }
      }
    });
    this.arrSub.push(a)
  }

  /**
   *  HÀM XỬ LÍ XOÁ QUYẾT ĐỊNH
   * @param status TRẠNG THÁI CLICK DIALOG
   */
  onDeleteDialog(status: string): void {
    if (status == 'yes') {
      this.APIDeleteHRDecisionMaster([this.dataDelete]);
    }
    this.openConfirm = false;
  }

  //#endregion

  //#region Image
  errorOccurred: any = {};

  // HÀM XỬ LÍ HÌNH ẢNH
  getResImg(str: string, imageKey: string) {
    if (Ps_UtilObjectService.hasValueString(str)) {
      let a = Ps_UtilObjectService.removeImgRes(str);
      if (this.errorOccurred[imageKey]) {
        return this.getResHachi(a);
      } else {
        return this.domSanititizer.bypassSecurityTrustResourceUrl(
          Ps_UtilObjectService.getImgRes(a)
        );
      }
    } else {
      return '../../../../../assets/img/icon/icon-nonImageThumb.svg';
    }
  }
  // HÀM HANDLE ERROR CỦA HÌNH ẢNH
  handleError(imageKey: string) {
    this.errorOccurred[imageKey] = true;
  }

  getResHachi(str: string) {
    let a = Ps_UtilObjectService.removeImgRes(str);
    return Ps_UtilObjectService.getImgResHachi(a);
  }
  //#endregion

  //#region API

  /**
   *  API LẤY DANH SÁCH QUYẾT ĐỊNH
   * @param Filter Kendo Filter
   * @param Keyword
   */
  APIGetListHRDecisionMaster(Filter: State, TypeData: number) {
    this.isLoading = true;
    let ctx: string = '';
    if (this.currentList == 'resignation') ctx = 'nghỉ việc';
    else ctx = 'kỷ luật';
    let a = this.apiService.GetListHRDecisionMaster(Filter, null, TypeData).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        let listDecision = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total;
        this.gridView.next({ data: listDecision, total: this.total });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách quyết định ${ctx}: ${res.ErrorString} `);
      }
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách quyết định ${ctx}: ${error} `);
    });

    this.arrSub.push(a);
  }

  /**
   * API XOÁ QUYẾT ĐỊNH
   * @param ListDTO DANH SÁCH DATA DELETE
   */
  APIDeleteHRDecisionMaster(ListDTO: DTOHRDecisionMaster[]) {
    this.isLoading = true;
    let ctx: string = 'Quyết định';
    let a = this.apiService.DeleteHRDecisionMaster(ListDTO).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Xoá ${ctx} thành công`);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xoá ${ctx}: ${res.ErrorString} `);
      }
      this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
    }, (error) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi xoá ${ctx}: ${error} `);
    });

    this.arrSub.push(a);
  }

  /**
   * API CẬP NHẬT STATUS QUYẾT ĐỊNH
   * @param listDTO DTO DATAITEM
   * @param reqStatus STATUS CẦN UPDATE
   */
  APIUpdateHRDecisionMasterStatus(listDTO: DTOHRDecisionMaster[], reqStatus: number) {
    let ctx: string = 'trạng thái Quyết định';
    this.isLoading = true;
    let a = this.apiService.UpdateHRDecisionMasterStatus(listDTO, reqStatus).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Cập nhật ${ctx} thành công`);
        reqStatus == 3 ? this.isStoppedDecisionDialogShow = false : null;
        this.APIGetListHRDecisionMaster(this.gridState, this.filterTypeData.value);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${ctx}: ${res.ErrorString} `);
        this.isLoading = false;
      }

    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${ctx}: ${error} `);
      this.isLoading = false;
    });

    this.arrSub.push(a);
  }

  /**
   * Xuất excel nhân sự quyết định nghỉ việc được duyệt
   */
  APIGetHRStaffLeaveReportExcel() {
    // this.onLoadFilterHeader2('exportState')
    this.isLoading = true
    var ctx = "Xuất Excel"
    var getfileName = "StaffLeaveReportExcel.xlsx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    const state: State = this.gridState;

    state.filter.filters = [];

    // SEARCH BOX
    if (Ps_UtilObjectService.hasListValue(this.filterSearchBox.filters)) {
      if (this.tempSearch[0].value != '') {
        state.filter.filters.push(this.filterSearchBox);
      }
    }

    // FILTER DATE DROPDOWN
    if (Ps_UtilObjectService.hasValueString(this.dateString)) {
      if (this.typeAfBe == 1) {
        state.filter.filters.push(this.filterFrom);
      }
      else {
        state.filter.filters.push(this.filterAfter);
      }
    }

    let a = this.apiService.GetHRStaffLeaveReportExcel(state).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        Ps_UtilObjectService.getFile(res, getfileName)
        this.layoutService.onSuccess(`${ctx} thành công`)
      }
      else {
        this.layoutService.onError(`${ctx} thất bại`)
      }
      this.isLoading = false;
    }, f => {
      this.isLoading = false;
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f?.error?.ExceptionMessage)
    });

    this.arrSub.push(a);
  }

  /**
   * Xuất word nhân sự quyết định nghỉ việc được duyệt
   */
  APIGetHRStaffLeaveReportWord() {
    this.isLoading = true
    var ctx = "Xuất Word"
    var getfileName = "StaffLeaveReportWord"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    const state: State = this.gridState;
    // SEARCH BOX
    if (Ps_UtilObjectService.hasListValue(this.filterSearchBox.filters)) {
      if (this.tempSearch[0].value != '') {
        state.filter.filters.push(this.filterSearchBox);
      }
    }

    // FILTER DATE DROPDOWN
    if (Ps_UtilObjectService.hasValueString(this.dateString)) {
      if (this.typeAfBe == 1) {
        state.filter.filters.push(this.filterFrom);
      }
      else {
        state.filter.filters.push(this.filterAfter);
      }
    }

    let a = this.apiService.GetHRStaffLeaveReportWord(state).pipe(takeUntil(this.Unsubscribe)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        Ps_UtilObjectService.getFile(res, getfileName, 1)
        this.layoutService.onSuccess(`${ctx} thành công`)
      }
      else {
        this.layoutService.onError(`${ctx} thất bại`)
      }
      this.isLoading = false;
    }, f => {
      this.isLoading = false;
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f?.error?.ExceptionMessage)
    });
    
    this.arrSub.push(a);
  }

  //#endregion
}
