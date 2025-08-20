import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/operators';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DTOListCountry } from 'src/app/p-app/p-hri/shared/dto/DTOPersonalInfo.dto';
import { DTOTax } from 'src/app/p-app/p-config/shared/dto/DTOTax';
import { DTOTaxGroup } from 'src/app/p-app/p-config/shared/dto/DTOTaxGroup';
import { ConfigTaxApiService } from 'src/app/p-app/p-config/shared/services/config-tax-api.service';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';

@Component({
  selector: 'app-config009-tax-list',
  templateUrl: './config009-tax-list.component.html',
  styleUrls: ['./config009-tax-list.component.scss']
})
export class Config009TaxListComponent implements OnInit, OnDestroy {
  destroy = new Subject<any>(); // sử dụng để unsubscribe các observable
  arrUnsubscribe: Subscription[] = []; // list chứa những thứ cần unsubcribe

  // Grid
  gridTaxList: GridDataResult;
  page = 0;
  pageSize = 25
  pageSizes = [25, 50, 75, 100];
  tempSearch: any

  // State của grid
  gridState: State = {
    skip: this.page,
    take: this.pageSize,
    sort: [{ field: 'Code', dir: 'desc' }],
    filter: { filters: [], logic: 'and' },
  };

  // Filter status khai quan
  filterStatus: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }

  // State của các dropdown
  gridStatePackingUnit: State = { filter: { filters: [], logic: 'and' }, }
  gridStateCountry: State = { filter: { filters: [], logic: 'and' }, }
  gridStateTaxGroup: State = { filter: { filters: [{ field: 'StatusID', operator: 'eq', value: 2 }], logic: 'and' }, }

  // Filter của các trạng thái
  filterStatus_New: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 0, ignoreCase: true
  }
  filterStatus_Sent: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 1, ignoreCase: true
  }
  filterStatus_Approved: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 2, ignoreCase: true
  }
  filterStatus_Stopped: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 3, ignoreCase: true
  }
  filterStatus_Returned: FilterDescriptor = {
    field: "StatusID", operator: "eq", value: 4, ignoreCase: true
  }

  //Filter search
  filterSearch: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  //Drawer
  currentItemTax: DTOTax = new DTOTax();
  MultiForm: UntypedFormGroup;
  currentListPosition: { PositionName: string; Code: number, ID: string }[] = []
  excelValid: boolean = true;
  listCountry: DTOListCountry[] = [];
  listUnit: any[] = [];
  listTaxGroup: DTOTaxGroup[] = [];

  listStatus: { StatusID: number, StatusName: string }[] = [{
    StatusID: 0,
    StatusName: 'Đang soạn thảo'
  }, {
    StatusID: 1,
    StatusName: 'Gửi duyệt'
  }, {
    StatusID: 2,
    StatusName: 'Duyệt áp dụng'
  }, {
    StatusID: 3,
    StatusName: 'Ngưng hiển thị'
  }, {
    StatusID: 4,
    StatusName: 'Trả về'
  }]

  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isMaster: boolean = false; // Toàn quyền
  isCreator: boolean = false; // Quyền tạo
  isApprover: boolean = false; // Quyền duyệt
  M_A: boolean = false; // Master hoặc Approver
  M_C: boolean = false; // Master hoặc Creator

  //Setting Selectable cho grid
  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  }

  isLoading: boolean = false;
  isCreate: boolean = false; // Có tạo mới hay không
  isEdit: boolean = false; // Có chỉnh sửa hay không
  isUpdateButton: boolean = false; // Có hiện nút cập nhật hay không
  isOpenDrawer: boolean = false; // Có mở drawer hay không
  isNew_checked: boolean = true // Có check filter status Đang soạn thảo không
  isSent_checked: boolean = true // Có check filter status Gửi duyệt không
  isApproved_checked: boolean = true // Có check filter status Duyệt áp dụng không
  isStopped_checked: boolean = false // Có check filter status Ngưng áp dụng không
  isFilterActive: boolean = true // Có check filter status không
  isAutoCollapse: boolean = false; // Có tự động đóng drawer khi click ra ngoài không

  onPageChangeCallback: Function
  onActionDropDownClickCallback: Function
  onSelectCallback: Function
  onSelectedPopupBtnCallback: Function
  getActionDropdownCallback: Function
  getSelectionPopupCallback: Function
  uploadEventHandlerCallback: Function

  constructor(
    private layoutApiService: LayoutAPIService,
    private menuService: PS_HelperMenuService,
    private layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private taxServiceAPI: ConfigTaxApiService,
  ) { }

  ngOnInit(): void {
    // Check permission
    let changePermission_sst = this.menuService.changePermission().pipe(takeUntil(this.destroy)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');

        this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isApprover = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;

        this.M_A = this.isMaster || this.isApprover;
        this.M_C = this.isMaster || this.isCreator;
      }
    })

    let permissionAPI = this.menuService.changePermissionAPI().subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.onLoadDefault();
      }
    })
    this.arrUnsubscribe.push(changePermission_sst, permissionAPI);

    // this.clearSelectedRowitemCallback = this.onClearSelection.bind(this);
    // this.selectedRowitemPopupCallback = this.onSelectedPopupBtnClick.bind(this);
    this.uploadEventHandlerCallback = this.uploadEventHand.bind(this);
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this);
    this.onSelectedPopupBtnCallback = this.onSelectionActionItemClick.bind(this);
    // this.onSelectCallback = this.onGridItemSelect.bind(this);
    // this.onSortChangeCallback = this.sortChange.bind(this);
    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.onPageChangeCallback = this.pageChange.bind(this);
    this.onActionDropDownClickCallback = this.onActionDropdownClick.bind(this);
  }

  // /**
  //  * Hàm load dữ liệu mặc định
  //  */
  onLoadDefault() {
    this.isNew_checked = true;
    this.isSent_checked = true;
    this.isApproved_checked = false;
    this.isStopped_checked = false;

    this.gridState.skip = 1;
    this.onLoadFilter();
    this.APIGetListTax(this.gridState);
    this.APIGetListCountry();
    this.APIGetListPackingUnit(this.gridStatePackingUnit);
    this.APIGetListTaxGroup(this.gridStateTaxGroup);

    this.MultiForm = this.onLoadForm();
    this.MultiForm.patchValue(new DTOTax);
  }

  /** Hàm xử lý filter
 */
  onLoadFilter() {
    // reset filler
    this.pageSizes = [...this.layoutService.pageSizes];
    this.gridState.take = this.pageSize;
    this.gridState.filter.filters = [];
    this.filterStatus.filters = [];

    // Add filter cho checkbox header 2

    // Nếu checked Đang soạn thảo
    if (this.isNew_checked) {
      this.filterStatus.filters.push(this.filterStatus_New);
      this.filterStatus.filters.push(this.filterStatus_Returned);
    }

    // Nếu checked gửi duyệt
    if (this.isSent_checked) {
      this.filterStatus.filters.push(this.filterStatus_Sent);
    }

    // Nếu checked duyệt
    if (this.isApproved_checked) {
      this.filterStatus.filters.push(this.filterStatus_Approved);
    }

    // Nếu checked Ngưng áp dụng
    if (this.isStopped_checked) {
      this.filterStatus.filters.push(this.filterStatus_Stopped);
    }

    // Push tất cả các filter Status vào filter chính
    if (this.filterStatus.filters.length > 0) {
      this.gridState.filter.filters.push(this.filterStatus);
    }


    if (Ps_UtilObjectService.hasListValue(this.filterSearch.filters)) {
      if (this.tempSearch[0].value != '') {
        this.gridState.filter.filters.push(this.filterSearch);
      }
    }
  }

  /**
 * Hàm xử lý khi người dùng click vào filter
 * @param e event
 * @param strCheck value of checkbox
 */
  onSelectedBtnChange(e, strCheck: string) {
    this[strCheck] = e
    this.gridState.skip = 1
    this.onLoadFilter()
    this.APIGetListTax(this.gridState);
  }

  /**
 * Hàm xử lý khi người dùng nhập vào ô tìm kiếm
 * @param event keyword
 */
  handleSearch(event: any) {
    if (event.filters && event.filters.length > 0) {
      if (event.filters[0].value === '') {
        this.gridState.skip = 1;
        this.onLoadFilter();
      } else if (Ps_UtilObjectService.hasValueString(event)) {
        this.filterSearch.filters = event.filters;
        this.tempSearch = event.filters;
        this.gridState.skip = 1;
        this.onLoadFilter();
      }
      this.APIGetListTax(this.gridState);
    }
  }

  /**
 * Hàm reset filter
 */
  onResetFilter() {
    this.isNew_checked = true;
    this.isSent_checked = true;
    this.isApproved_checked = false;
    this.isStopped_checked = false;
    this.gridState.skip = 1
    this.onLoadFilter();
    this.APIGetListTax(this.gridState);
  }


  /**
   * Hàm chuyển trang của grid
   * @param event 
   */
  pageChange(event: PageChangeEvent) {
    this.gridState.skip = event.skip;
    this.gridState.take = this.pageSize = event.take;
    this.APIGetListTax(this.gridState);
    // this.GetListCompetenceFramework(this.gridState);
  }

  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOTax): MenuDataItem[] {
    const actionEdit: MenuDataItem = { Name: "Chỉnh sửa", Code: "pencil", Link: 'edit', Actived: true };
    const actionView: MenuDataItem = { Name: "Xem chi tiết", Code: "eye", Link: 'view', Actived: true };
    const actionDelete: MenuDataItem = { Name: "Xóa khai quan", Code: "trash", Link: 'delete', Actived: true };
    const actionSend: MenuDataItem = { Name: "Gửi duyệt", Code: "redo", Link: '1', Actived: true };
    const actionStop: MenuDataItem = { Name: "Ngưng hiển thị", Code: "minus-outline", Link: '3', Actived: true };
    const actionApprove: MenuDataItem = { Name: "Phê duyệt", Code: "check-circle", Link: '2', Actived: true };
    const actionReturn: MenuDataItem = { Name: "Trả về", Code: "undo", Link: '4', Actived: true };

    switch (dataItem.StatusID) {
      case 0: // Đang soạn thảo
        return this.M_C ? [actionEdit, actionSend, actionDelete] : [actionView];
      case 4: // Trả về
        return this.M_C ? [actionEdit, actionSend] : [actionView];

      case 1: // Gửi duyệt
        return this.M_A ? [actionEdit, actionApprove, actionReturn] : [actionView];

      case 2: // Duyệt áp dụng
        return this.M_A ? [actionView, actionStop] : [actionView];
      case 3: // Ngưng hiển thị
        return this.M_A ? [actionView, actionApprove, actionReturn] : [actionView];

      default:
        return !this.isApprover && !this.isMaster && !this.isCreator ? [actionView] : [];
    }
  }

  /**
 * Hàm xử lý khi click vào các action
 * @param action hành động được chọn
 * @param item data tax được chọn
 */
  onActionDropdownClick(action: MenuDataItem, item: DTOTax) {
    this.currentItemTax = item;
    if (action.Code == 'pencil') {
      this.openDrawer(2);
    }
    else if (action.Code == 'eye') {
      this.openDrawer(3);
    }
    else if (action.Code == 'trash') {
      this.APIDeleteTax([item]);
    }
    else {
      this.APIUpdateTaxStatus([item], parseInt(action.Link));
    }
  }


  /**
 * Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
 * @param arrItem
 * @returns MenuDataItem[]
 */
  getSelectionPopupAction(arrItem: DTOTax[]): MenuDataItem[] {
    const allActions: MenuDataItem[] = [
      { Name: "Xóa khai quan", Code: "trash", Type: 'Delete', Link: 'delete', Actived: true },
      { Name: "Gửi duyệt", Code: "redo", Type: 'Sent', Link: '1', Actived: true },
      { Name: "Ngưng hiển thị", Code: "minus-outline", Type: 'Stop', Link: '3', Actived: true },
      { Name: "Phê duyệt", Code: "check-circle", Type: 'Approve', Link: '2', Actived: true },
      { Name: "Trả về", Code: "undo", Type: 'Return', Link: '4', Actived: true },
    ];

    const resultSet = new Set<string>();

    // Gom action Code từ từng item
    arrItem.forEach(item => {
      const actions = this.getSelectionByStatus(item.StatusID);
      actions.forEach(action => resultSet.add(action.Code));
    });

    // Phân loại action thường và action "Xóa"
    const deleteActionCode = 'trash';
    const actionList = allActions
      .filter(action => resultSet.has(action.Code) && action.Code !== deleteActionCode);

    const deleteAction = allActions.find(a => a.Code === deleteActionCode);
    if (resultSet.has(deleteActionCode) && deleteAction) {
      actionList.push(deleteAction); // thêm Xóa vào cuối
    }

    // Sắp xếp đúng thứ tự mong muốn
    const desiredOrder = ['redo', 'check-circle', 'minus-outline', 'undo', 'trash'];
    actionList.sort((a, b) => desiredOrder.indexOf(a.Code) - desiredOrder.indexOf(b.Code));

    return actionList;
  }


  getSelectionByStatus(statusID: number): MenuDataItem[] {
    const actionDelete: MenuDataItem = { Name: "Xóa khai quan", Code: "trash", Link: 'delete', Actived: true };
    const actionSend: MenuDataItem = { Name: "Gửi duyệt", Code: "redo", Link: '1', Actived: true };
    const actionStop: MenuDataItem = { Name: "Ngưng hiển thị", Code: "minus-outline", Link: '3', Actived: true };
    const actionApprove: MenuDataItem = { Name: "Phê duyệt", Code: "check-circle", Link: '2', Actived: true };
    const actionReturn: MenuDataItem = { Name: "Trả về", Code: "undo", Link: '4', Actived: true };

    switch (statusID) {
      case 0:
        return this.M_C ? [actionSend, actionDelete] : [];
      case 4:
        return this.M_C ? [actionSend] : [];
      case 1:
        return this.M_A ? [actionApprove, actionReturn] : [];
      case 2:
        return this.M_A ? [actionStop] : [];
      case 3:
        return this.M_A ? [actionApprove, actionReturn] : [];
      default:
        return !this.isApprover && !this.isMaster && !this.isCreator ? [] : [];
    }
  }

  /**
 * Hàm dùng để thực hiện các action trên popup chọn nhiều
 * @param btnType loại button
 * @param listSelectedItem danh sách item được chọn
 * @param value
 */
  onSelectionActionItemClick(btnType: string, listSelectedItem: DTOTax[], value: any) {
    let listCanUpdate: DTOTax[] = [];
    let listDataDelete: DTOTax[] = [];

    // Chọn xóa tax
    if (btnType === 'Delete') {
      listDataDelete = listSelectedItem.filter((s) => s.StatusID === 0);
      this.APIDeleteTax(listDataDelete);
    }
    else if (btnType === 'Sent') {
      listCanUpdate = listSelectedItem.filter((s) => [0, 4].includes(s.StatusID));
      this.APIUpdateTaxStatus(listCanUpdate, 1);
    }
    else if (btnType === 'Approve') {
      listCanUpdate = listSelectedItem.filter((s) => [1, 3].includes(s.StatusID));
      this.APIUpdateTaxStatus(listCanUpdate, 2);
    }
    else if (btnType === 'Stop') {
      listCanUpdate = listSelectedItem.filter((s) => s.StatusID === 2);
      this.APIUpdateTaxStatus(listCanUpdate, 3);
    }
    else if (btnType === 'Return') {
      listCanUpdate = listSelectedItem.filter((s) => [1, 3].includes(s.StatusID));
      this.APIUpdateTaxStatus(listCanUpdate, 4);
    }
    this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
  }


  /**
   * 
   * @param type Loại drawer được mở: 
   * 1. Tạo mới
   * 2. Chỉnh sửa 
   * 3. Xem chi tiết
   */
  openDrawer(type: number) {
    if (type == 1) {
      this.isCreate = true;
      this.isEdit = true;
      this.MultiForm.patchValue(new DTOTax());
      this.currentItemTax = new DTOTax();
    }
    else if (type == 2) {
      this.isCreate = false;
      this.isEdit = true;
      this.isUpdateButton = true;
      this.MultiForm.patchValue(this.currentItemTax);
    }
    else {
      this.isCreate = false;
      this.isEdit = false;
      this.isUpdateButton = [2, 3].includes(this.currentItemTax.StatusID) && this.M_A;
      this.MultiForm.patchValue(this.currentItemTax);
    }
    this.isOpenDrawer = true;
  }

  /**
 * Load form
 */
  onLoadForm(): UntypedFormGroup {
    const form = this.formBuilder.group({});
    const dto = new DTOTax();

    // Lặp qua các trường trong DTO và gán giá trị mặc định cho form
    Object.keys(dto).forEach((key) => {
      const value = dto[key];  // Lấy giá trị từ DTO

      // Gán giá trị mặc định vào form control
      form.addControl(
        key,
        this.formBuilder.control(value, key === 'Code' ? Validators.required : null)
      );
    });

    return form;
  }

  /**
* Xác định xem một item trong dropdown trạng thái có bị disable hay không.
* Chỉ xử lý dựa trên StatusID và currentTaxGroup. Không dùng Code hay StatusName.
* 
* @param itemArgs Item từ dropdown.
* @returns true nếu bị disable, false nếu cho phép chọn.
*/
  isItemDisabled(itemArgs: { dataItem: any; index: number }): boolean {
    const item = itemArgs.dataItem;

    // Nếu không có StatusID (ví dụ "-- Chọn --") → không disable
    if (item.StatusID === null && this.currentItemTax.Code == 0) return false;

    const currentCode = this.currentItemTax.Code;
    const currentStatus = this.currentItemTax.StatusID;

    // Nếu đang tạo mới → không disable bất kỳ item nào
    if (currentCode === 0) return false;

    // const isCreate = this.isMaster || this.isCreate;
    // const isVerify = this.isMaster || this.isApprover;

    // Cho phép chọn lại chính trạng thái hiện tại
    if (item.StatusID === currentStatus) return false;

    // Logic nghiệp vụ khi đang chỉnh sửa (Code > 0)
    switch (currentStatus) {
      case 0: // Đang soạn thảo
      case 4: // Trả về
        return !(item.StatusID === 1 && this.M_C);

      case 1: // Gửi duyệt
        return !((item.StatusID === 2 || item.StatusID === 4) && this.M_A);

      case 2: // Duyệt áp dụng
        return !(item.StatusID === 3 && this.M_A);

      case 3: // Ngưng áp dụng
        return !((item.StatusID === 2 || item.StatusID === 4) && this.M_A);

      default:
        return true;
    }
  }

  /**
   * Hàm update data trong form từ dropdown
   * @param data data mới được chọn
   * @param type loại data cần update
   */
  onChangeValueDropdown(data: any, type: string) {
    this.MultiForm.patchValue({
      [type]: data
    });
  }

  /**
   * Hàm cập nhật data mới
   */
  onUpdateTax() {
    if (!Ps_UtilObjectService.hasValueString(this.MultiForm.getRawValue().TaxID)) {
      return this.layoutService.onWarning('Vui lòng nhập Mã khai quan');
    }
    if (!Ps_UtilObjectService.hasValueString(this.MultiForm.getRawValue().TaxName)) {
      return this.layoutService.onWarning('Vui lòng nhập Tên tiếng việt');
    }
    if (!Ps_UtilObjectService.hasValue(this.MultiForm.getRawValue().TaxGroup) || this.MultiForm.getRawValue().TaxGroup <= 0) {
      return this.layoutService.onWarning('Vui lòng chọn Phân loại khai quan');
    }
    if (!Ps_UtilObjectService.hasValue(this.MultiForm.getRawValue().Origin) || this.MultiForm.getRawValue().Origin <= 0) {
      return this.layoutService.onWarning('Vui lòng chọn Xuất sứ');
    }
    if (!Ps_UtilObjectService.hasValue(this.MultiForm.getRawValue().UnitID) || this.MultiForm.getRawValue().UnitID <= 0) {
      return this.layoutService.onWarning('Vui lòng chọn Đơn vị');
    }
    if (!Ps_UtilObjectService.hasValueString(this.MultiForm.getRawValue().IMTaxCode) || !Ps_UtilObjectService.hasValueString(this.MultiForm.getRawValue().IMTaxRate) || this.MultiForm.getRawValue().IMTaxRate <= 0) {
      return this.layoutService.onWarning('Vui lòng nhập Thuế nhập khẩu và thuế nhập khẩu phải lớn hơn 0');
    }
    if (!Ps_UtilObjectService.hasValueString(this.MultiForm.getRawValue().VATInCode) || !Ps_UtilObjectService.hasValue(this.MultiForm.getRawValue().VATInRate) || this.MultiForm.getRawValue().VATInRate <= 0) {
      return this.layoutService.onWarning('Vui lòng nhập Thuế vào và thuế vào phải lớn hơn 0');
    }
    if (!Ps_UtilObjectService.hasValue(this.MultiForm.getRawValue().VATOutRate) || this.MultiForm.getRawValue().VATOutRate <= 0) {
      return this.layoutService.onWarning('Vui lòng nhập Thuế ra và thuế ra phải lớn hơn 0');
    }
    else {
      this.APIUpdateTax();
    }
  }

  /**
   * Đóng drawer
   */
  handleCloseDrawer(): void {
    this.isOpenDrawer = false;
    this.MultiForm.reset();
  }

  /**
   * Hàm xử lý import file
   * @param e file excel
   */
  uploadEventHand(e: File) {
    this.APIImportTax(e)
  }

  /**
   * Hàm xử lý khi click vào nút import
   */
  onImportExcel() {
    this.layoutService.setImportDialog(true)
    this.layoutService.setExcelValid(this.excelValid)
  }


  //#region API
  /**
   * API lấy danh sách khai quan
   * @param filter bộ lọc để lọc data 
   */
  APIGetListTax(filter: State) {
    this.isLoading = true;
    let a = this.taxServiceAPI.GetListTax(filter).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.gridTaxList = ({ data: res.ObjectReturn.Data, total: res.ObjectReturn.Total })
      }
      else if (Ps_UtilObjectService.hasValueString(res.ErrorString)) {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách khai quan: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
    })
    this.arrUnsubscribe.push(a);
  }

  /**
   * API update thông tin khai quan
   */
  APIUpdateTax() {
    this.isLoading = true;
    let a = this.taxServiceAPI.UpdateTax(this.MultiForm.getRawValue()).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(this.MultiForm.getRawValue().Code != 0 ? 'Cập nhật thành công' : 'Tạo mới thành công');
        this.handleCloseDrawer();
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${this.MultiForm.getRawValue().Code != 0 ? 'cập nhật khai quan' : 'tạo mới khai quan'}: ${res.ErrorString}`)
      }
      this.isLoading = false;
      this.APIGetListTax(this.gridState);
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
      this.APIGetListTax(this.gridState);
    })
    this.arrUnsubscribe.push(a);
  }

  /**
 * API update thông tin khai quan
 */
  APIUpdateTaxStatus(listData: DTOTax[], statusID: number) {
    this.isLoading = true;
    let a = this.taxServiceAPI.UpdateTaxStatus(listData, statusID).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess('Cập nhật trạng thái thành công');
        this.handleCloseDrawer();
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái: ${res.ErrorString}`)
      }
      this.isLoading = false;
      this.APIGetListTax(this.gridState);
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
      this.APIGetListTax(this.gridState);
    })
    this.arrUnsubscribe.push(a);
  }

  /**
 * API update thông tin khai quan
 */
  APIDeleteTax(itemDelete: DTOTax[]) {
    this.isLoading = true;
    let a = this.taxServiceAPI.DeleteTax(itemDelete).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess('Xóa khai quan thành công');
        this.handleCloseDrawer();
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xóa khai quan: ${res.ErrorString}`)
      }
      this.isLoading = false;
      this.APIGetListTax(this.gridState);
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
      this.APIGetListTax(this.gridState);
    })
    this.arrUnsubscribe.push(a);
  }

  /**
 * Export ra file excel
 */
  APIGetTemplate() {
    var ctx = "Download Excel Template"
    var getfilename = "TaxTemplateImport.xlsx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a = this.taxServiceAPI.GetTemplate(getfilename).pipe(takeUntil(this.destroy)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        Ps_UtilObjectService.getFile(res)
        this.layoutService.onSuccess(`${ctx} thành công`);
      }
      this.isLoading = false;
    }, f => {
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f.error.ExceptionMessage)
      this.isLoading = false;
    });

    this.arrUnsubscribe.push(a);
  }

  APIImportTax(file) {
    this.isLoading = true
    var ctx = "Import Excel"

    this.taxServiceAPI.ImportTax(file).pipe(takeUntil(this.destroy)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.setImportDialogMode(1)
        this.layoutService.setImportDialog(false)
        this.layoutService.getImportDialogComponent().inputBtnDisplay()
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.APIGetListTax(this.gridState);
      this.isLoading = false;
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${err}`)
      this.isLoading = false;
    })
  }

  /**
   * API lấy danh sách đơn vị
   * @param filter bộ lọc để lọc data 
   */
  APIGetListPackingUnit(filter: State) {
    this.isLoading = true;
    let a = this.taxServiceAPI.GetListPackingUnit(filter).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listUnit = res.ObjectReturn.Data;
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách đơn vị: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
    })
    this.arrUnsubscribe.push(a);
  }

  /**
   * API lấy danh sách xuất xứ
   * @param filter bộ lọc để lọc data 
   */
  APIGetListCountry() {
    this.isLoading = true;
    let a = this.taxServiceAPI.GetListCountry().subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listCountry = res.ObjectReturn.Data;
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách khai quan: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
    })
    this.arrUnsubscribe.push(a);
  }

  /**
   * API lấy danh sách phân nhóm khai quan
   * @param filter bộ lọc để lấy danh sách
   */
  APIGetListTaxGroup(filter: State) {
    this.isLoading = true;
    let a = this.taxServiceAPI.GetListTaxGroup(filter).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listTaxGroup = res.ObjectReturn.Data;
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách phân nhóm khai quan: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (e) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${e.Message ?? e}`)
    })
    this.arrUnsubscribe.push(a);
  }

  //#endregion

  ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((sub) => {
      if (sub && sub.unsubscribe) {
        sub?.unsubscribe();
      }
    })
  }

}
