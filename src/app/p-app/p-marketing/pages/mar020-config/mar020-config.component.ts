import { Component, OnInit, ViewChild } from '@angular/core';
import { MarketingService } from '../../shared/services/marketing.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators'
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { Subject, Subscription } from 'rxjs';
import { CompositeFilterDescriptor, FilterDescriptor, SortDescriptor, State, distinct } from '@progress/kendo-data-query';
import { PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DTOMAConfig } from '../../shared/dto/DTOMAConfig.dto';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { MatSidenav } from '@angular/material/sidenav';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { MarConfigApiService } from '../../shared/services/mar-config-api.service';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTOStatus } from 'src/app/p-app/p-layout/dto/DTOStatus';

@Component({
  selector: 'app-mar020-config',
  templateUrl: './mar020-config.component.html',
  styleUrls: ['./mar020-config.component.scss']
})
export class Mar020ConfigComponent implements OnInit {
  //////////////////////////////////Variables//////////////////////////////////
  // Dialog
  deleteDialogOpened = false;
  deleteManyDialogOpened = false;
  //
  // Drawer
  @ViewChild('formDrawer') drawer: MatSidenav;
  isButtonActive = false;
  isImageShow = true;
  curImgSt: number = 1
  //
  // Folder
  //
  // Permission
  isMaster = false;
  isCreator = false;
  isVerifier = false;
  // 
  // Grid
  isAdd = true
  isLockAll = true
  loading = false
  justLoaded = true
  justLoadedChangePermissionAPI = true

  total = 0
  pageSize = 50
  pageSizes = [this.pageSize]

  onSelectCallback: Function
  onSortChangeCallback: Function
  onPageChangeCallback: Function

  gridView = new Subject<any>();
  gridState: State = {
    take: this.pageSize,
    filter: { filters: [], logic: 'and' },
  }
  sortBy: SortDescriptor[] = [{
    field: 'StatusID',
    dir: 'asc'
  }]
  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  }
  //
  // Search
  searchForm: UntypedFormGroup;
  filterSearchBox: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }
  //
  // Filters
  isFilterActive = true;
  listStatusID = [
    { id: 0, status: 'Đang soạn thảo', isChecked: true },
    { id: 2, status: 'Đã duyệt', isChecked: true },
    { id: 3, status: 'Ngưng hiển thị', isChecked: false },
    { id: 4, status: 'Trả về', isChecked: false },
  ];
  listStatusDropdown: DTOStatus[] = []

  filterStatusID: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }
  //
  filterConfigName: FilterDescriptor = {
    field: "ConfigName", operator: "contains", value: null
  }
  filterConfigDescription: FilterDescriptor = {
    field: "ConfigDescription", operator: "contains", value: null
  }
  filterConfigURL: FilterDescriptor = {
    field: "ConfigURL", operator: "contains", value: null
  }
  //
  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: "contains",
  };
  // Update Search Config Form
  drawerForm: UntypedFormGroup;
  //
  // Popup
  onSelectedPopupBtnCallback: Function
  getSelectionPopupCallback: Function
  //
  // Dropdown
  allowActionDropdown = ['detail', 'edit', 'delete']
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function
  //
  // Folder
  pickFileCallback: Function
  GetFolderCallback: Function
  //
  // Subscription
  subscription = new Subject<void>()
  //
  // DTO
  Config = new DTOMAConfig()
  initialConfig = new DTOMAConfig();
  actionPerm: DTOActionPermission[] = []
  listConfig: DTOMAConfig[] = []
  listUpdateConfig: DTOMAConfig[] = []

  listType: any[] = []
  //
  //////////////////////////////////Variables//////////////////////////////////

  //////////////////////////////////Constructor//////////////////////////////////
  constructor(
    public service: MarketingService,
    public menuService: PS_HelperMenuService,
    public layoutService: LayoutService,
    public layoutAPIService: LayoutAPIService,
    public apiService: MarConfigApiService
  ) { }
  //////////////////////////////////Constructor//////////////////////////////////

  //////////////////////////////////Functions//////////////////////////////////
  ngOnInit(): void {
    let that = this
    this.loadSearchForm();
    this.loadForm();

    this.menuService.changePermission().pipe(takeUntil(this.subscription)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")

        that.isMaster = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        that.isCreator = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        that.isVerifier = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

      }
    })
    this.menuService.changePermissionAPI().pipe(takeUntil(this.subscription)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        that.getData();
      }
    })
    this.onPageChangeCallback = this.pageChange.bind(this)
    this.onSortChangeCallback = this.onSortChange.bind(this);
    // Dropdown
    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
    // Select
    this.onSelectCallback = this.selectChange.bind(this)
    this.getSelectionPopupCallback = this.getSelectionPopup.bind(this)
    this.onSelectedPopupBtnCallback = this.onSelectedPopupBtnClick.bind(this)
    // Folder
    this.pickFileCallback = this.pickFile.bind(this)
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)
  }
  // Grid
  pageChange(event: PageChangeEvent) {
    this.gridState.skip = event.skip;
    this.gridState.take = this.pageSize = event.take
    this.GetListConfig()
  }
  onSortChange(e: SortDescriptor[]) {
    this.gridState.sort = e;
    this.GetListConfig();
  }
  //
  getData() {
    this.loadFilter();
    this.GetListConfig();
    this.GetListStatus()
  }
  // Filters, Search
  loadFilter() {
    this.pageSizes = [...this.service.pageSizes]
    this.gridState.take = this.pageSize
    this.gridState.sort = this.sortBy

    this.gridState.filter.filters = []
    this.filterSearchBox.filters = []
    this.filterStatusID.filters = []

    for (let statusItem of this.listStatusID) {
      if (statusItem.isChecked && statusItem.id == 0)
        this.filterStatusID.filters.push({
          field: "StatusID",
          operator: "eq",
          value: 4
        })


      if (statusItem.isChecked) {
        this.filterStatusID.filters.push({
          field: "StatusID",
          operator: "eq",
          value: statusItem.id
        })
      }
    }

    if (this.filterStatusID.filters.length > 0) {
      this.gridState.filter.filters.push(this.filterStatusID)
    }

    //search box
    if (Ps_UtilObjectService.hasValueString(this.filterConfigName.value))
      this.filterSearchBox.filters.push(this.filterConfigName)
    if (Ps_UtilObjectService.hasValueString(this.filterConfigURL.value))
      this.filterSearchBox.filters.push(this.filterConfigURL)
    if (Ps_UtilObjectService.hasValueString(this.filterConfigDescription.value))
      this.filterSearchBox.filters.push(this.filterConfigDescription)
    if (this.filterSearchBox.filters.length > 0)
      this.gridState.filter.filters.push(this.filterSearchBox)
  }
  resetFilter() {
    // this.currentType = [];
    this.searchForm.get('SearchQuery').setValue(null)
    this.listStatusID.map(s => {
      s.isChecked = s.id == 0 || s.id == 2;
    })
    this.search()
  }
  loadSearchForm() {
    this.searchForm = new UntypedFormGroup({
      'SearchQuery': new UntypedFormControl(''),
    })
  }
  search() {
    var val = this.searchForm.value
    var searchQuery = val.SearchQuery

    if (Ps_UtilObjectService.hasValueString(searchQuery)) {
      this.filterConfigName.value = searchQuery;
      this.filterConfigDescription.value = searchQuery;
      this.filterConfigURL.value = searchQuery;
    } else {
      this.filterConfigName.value = null;
      this.filterConfigDescription.value = null;
      this.filterConfigURL.value = null;
    }
    this.loadFilter();
    this.GetListConfig()
  }
  //

  // Edit Config
  loadForm() {
    this.drawerForm = new UntypedFormGroup({
      'Code': new UntypedFormControl(this.Config.Code),
      'ConfigName': new UntypedFormControl(this.Config.ConfigName, { validators: [Validators.required] }),
      'ConfigURL': new UntypedFormControl(this.Config.ConfigURL, { validators: [Validators.required] }),
      'ConfigDescription': new UntypedFormControl(this.Config.ConfigDescription, { validators: [Validators.required] }),
      'TypeData': new UntypedFormControl(this.Config.TypeData),
      'ExtendConfig': new UntypedFormControl(this.Config.ExtendConfig),
      'Remark': new UntypedFormControl(this.Config.Remark),
      'StatusID': new UntypedFormControl(this.Config.StatusID),
    });
  }
  allControlsHaveValues() {
    const formControls = this.drawerForm.controls;
    return Object.keys(formControls).every(controlName => {
      const control = formControls[controlName];
      return control.value && control.value !== '' && control.value !== undefined;
    });
  }
  clearForm() {
    this.Config = new DTOMAConfig();
    this.drawerForm.reset()
    this.loadForm()
  }
  closeForm() {
    this.drawer.close();
    this.clearForm()
  }
  //

  // Buttons
  selectChange(isSelectedRowitemDialogVisible) {
    this.isFilterActive = !isSelectedRowitemDialogVisible
  }
  selectedBtnChange(e?: boolean, index?: number) {
    if (e != null || index != null)
      this.listStatusID[index].isChecked = e;
    this.loadFilter();
    this.GetListConfig();
  }
  public isItemDisabled(itemArgs: { dataItem: any; index: number }) {
    var statusID = itemArgs.dataItem.Config.StatusID
    var isAdd = itemArgs.dataItem.Config.Code == 0
    var isMaster = itemArgs.dataItem.isMaster
    var isCreator = itemArgs.dataItem.isCreator
    var isVerifier = itemArgs.dataItem.isVerifier

    switch (itemArgs.dataItem.OrderBy) {
      case 0://soạn
        if (statusID > 0)
          return true
        break;
      // case 1://gửi
      //   if ((statusID != 0 && statusID != 4) || (!isCreator && !isMaster))
      //     return true
      //   break;
      case 2://duyệt
        if ((statusID != 0 && statusID != 4 && statusID != 3 && statusID != 2) || (!isVerifier && !isMaster) || isAdd)
          return true
        break;
      case 3://ngưng
        if ((statusID != 2 && statusID != 3) || (!isVerifier && !isMaster) || isAdd)
          return true
        break;
      case 4://trả
        if ((statusID != 3 && statusID != 4) || (!isVerifier && !isMaster) || isAdd)
          return true
        break;
    }

    return false;
  }
  //
  GetListStatus() {
    var sst = this.layoutAPIService.GetListStatus(4).subscribe((res: any) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasListValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listStatusDropdown = res.ObjectReturn.filter(s => s.OrderBy != 1)
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Trạng thái: ${res.ErrorString}`)
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi kết nối với máy chủ: ${err}`);
    })
  }
  // Get List Config
  GetListConfig() {
    this.loading = true;
    var ctx = 'Danh sách Cấu hình'

    this.apiService.GetListWebConfig(this.gridState).pipe(takeUntil(this.subscription)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listConfig = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total
        this.gridView.next({ data: this.listConfig, total: this.total });
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy ${ctx}`)

      this.loading = false;
    }, () => {
      this.loading = false;
      this.layoutService.onError('Đã xảy ra lỗi khi lấy ' + ctx)
    });
  }

  GetListWebConfigType() {
    this.loading = true;
    var ctx = 'Danh sách Phân loại Cấu hình'

    this.apiService.GetListWebConfigType().pipe(takeUntil(this.subscription)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listType = res.ObjectReturn;

      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy ${ctx}`)

      this.loading = false;
    }, (e) => {
      this.loading = false;
      this.layoutService.onError('Đã xảy ra lỗi khi lấy ' + ctx + ': ' + e)
    });
  }
  //

  // Update Config
  arrImg = [1, 2, 3, 4, 5]
  updateConfig(prop: any) {
    var dto = this.drawerForm.getRawValue()
    dto.Code = this.Config.Code
    dto.TypeData = this.Config.TypeData
    this.arrImg.forEach(s => {
      dto['ImageSetting' + s] = this.Config['ImageSetting' + s]
    })

    if (Ps_UtilObjectService.hasValueString(dto.ConfigName)) {
      this.p_UpdateConfig(dto)
    }
    else
      this.layoutService.onError('Vui lòng điền tên cho Cấu hình web')
  }
  //
  p_UpdateConfig(dto) {
    this.loading = true;
    var ctx = (this.isAdd ? "Tạo mới" : "Cập nhật") + " Cấu hình web";

    this.apiService.UpdateWebConfig(dto).pipe(takeUntil(this.subscription)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.GetListConfig();
        this.drawer.close()
      } else
        this.layoutService.onError(`${ctx} thất bại`)
      this.loading = false;
    }, () => {
      this.loading = false;
      this.layoutService.onError(`${ctx} thất bại`)
    })
  }
  // Get Update Status Of Config
  getUpdateWebConfigStatus(items = [this.Config], StatusID: number) {
    if (this.drawer.opened && !this.allControlsHaveValues()) {
      this.loading = false;
      this.layoutService.onError('Vui lòng cập nhật đầy đủ thông tin Cấu hình web');
      return;
    }
    this.loading = true;
    var ctx = 'Cập nhật tình trạng'

    this.apiService.UpdateStatusWebConfig(items, StatusID).pipe(takeUntil(this.subscription)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listUpdateConfig = []
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.GetListConfig()
        this.drawer.close()
      } else
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)

      this.loading = false;
    }, () => {
      this.loading = false;
      this.layoutService.onError('Đã xảy ra lỗi khi ' + ctx)
    });
  }
  //

  // Update Status
  updateStatus(newPro: DTOMAConfig, statusID: number) {
    var ctx = newPro.ConfigName;

    if (statusID == 2) {
      if (!Ps_UtilObjectService.hasValueString(newPro.ConfigName))
        this.layoutService.onError(`Vui lòng điền tên cho Cấu hình web "${ctx}"`)
      else if (!Ps_UtilObjectService.hasValueString(newPro.ConfigURL))
        this.layoutService.onError(`Vui lòng điền link cho Cấu hình web "${ctx}"`)
      else
        this.listUpdateConfig.push(newPro)
    }
    else
      this.listUpdateConfig.push(newPro)
  }
  //

  // Delete Config
  DeleteConfig(items: DTOMAConfig[] = [this.Config]) {
    this.loading = true;
    var ctx = 'Xóa Cấu hình'

    this.apiService.DeleteWebConfig(items).pipe(takeUntil(this.subscription)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${ctx} thành công`)
        this.deleteDialogOpened = false
        this.deleteManyDialogOpened = false
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.GetListConfig()
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.loading = false;
    }, () => {
      this.loading = false;
      this.layoutService.onError('Đã xảy ra lỗi khi ' + ctx)
    });
  }
  //

  // Close Delete Dialog
  closeDeleteDialog() {
    this.deleteManyDialogOpened = false
  }
  closeDeleteManyDialog() {
    this.deleteManyDialogOpened = false
  }
  //

  // Delete Hashtag(s) Event
  onDelete() {
    this.deleteDialogOpened = true
  }
  onDeleteMany() {
    this.deleteManyDialogOpened = true
  }
  deleteMany() {
    this.DeleteConfig(this.listUpdateConfig)
  }
  //

  // Open Drawer
  onAdd(isAdd: boolean, isLockAll: boolean) {
    if (!Ps_UtilObjectService.hasListValue(this.listType) || this.listType.length <= 1)
      this.GetListWebConfigType()

    this.isAdd = isAdd;
    this.isLockAll = isLockAll;

    if (isAdd) {
      this.Config = new DTOMAConfig();
      this.isButtonActive = false;
    }
    else {
      this.isButtonActive = true;
    }
    this.initialConfig = { ...this.Config };
    //gán vào item dropdown để truyền qua ItemDisabled Callback
    this.listStatusDropdown.forEach(s => {
      s['Config'] = this.initialConfig
      s['isMaster'] = this.isMaster
      s['isCreator'] = this.isCreator
      s['isVerifier'] = this.isVerifier
    })
    this.loadForm()
    this.drawer.open();
  }

  onDropdownlistClick(event: number) {
    this.Config.TypeData = event
  }
  //
  validImg(str) {
    return Ps_UtilObjectService.hasValueString(Ps_UtilObjectService.removeImgRes(str))
  }
  // Grid Dropdown
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOMAConfig) {
    // Copy data of selected item
    this.Config = { ...dataItem };
    var statusID = this.Config.StatusID;
    moreActionDropdown = [];
    // Display Edit & Send To Verify Buttons 
    // Display Buttons For StatusID = 3 Or = 4
    if ((statusID == 3) && (this.isMaster || this.isCreator)) {
      moreActionDropdown.push(
        { Name: "Xem chi tiết", Code: "eye", Type: 'detail', Actived: true },
        { Name: "Áp dụng", Code: "check-outline", Type: 'StatusID', Link: "2", Actived: true },
        { Name: "Trả về", Code: "undo", Type: 'StatusID', Link: "4", Actived: true }
      )
    }
    // Display Buttons For StatusID = 0
    else if ((statusID == 0 || statusID == 4) && (this.isMaster || this.isVerifier)) {
      moreActionDropdown.push(
        { Name: "Chỉnh sửa", Code: "pencil", Type: 'edit', Actived: true },
        { Name: "Áp dụng", Code: "check-outline", Type: 'StatusID', Link: "2", Actived: true },
      )
    }
    // Display Buttons For StatusID = 2
    else if (statusID == 2 && (this.isMaster || this.isVerifier)) {
      moreActionDropdown.push(
        { Name: "Xem chi tiết", Code: "eye", Type: 'detail', Actived: true },
        { Name: "Ngưng áp dụng", Code: "minus-outline", Type: 'StatusID', Link: "3", Actived: true }
      )
    }
    // Display Delete Button
    if ((statusID == 0) && (this.isMaster || this.isCreator))
      moreActionDropdown.push({ Name: "Xóa Cấu hình", Code: "trash", Type: 'delete', Actived: true })

    // Return Array After Checking Conditions 
    return moreActionDropdown
  }
  //
  // Click Events In Dropdown
  onActionDropdownClick(menu: MenuDataItem, item: DTOMAConfig) {
    if (item.Code > 0) {
      // Copy data of selected item
      this.Config = { ...item }
      // Parse Link Value Of Selected Button To Interger
      // Then Assign To StatusID of this.Config
      // Check Type Of Selected Button
      ////> If Send To Verify Clicked

      if (menu.Type == 'StatusID') {
        var status = parseInt(menu.Link) // Value: menu.Link == 2 || menu.Link == 3 || menu.Link == 4;
        this.updateStatus(this.Config, status)

        if (Ps_UtilObjectService.hasListValue(this.listUpdateConfig))
          this.getUpdateWebConfigStatus([this.Config], status)
      }
      ////> If Edit Or Detail Button Clicked, Open Detail Page
      else if (menu.Type == 'edit' || menu.Code == 'pencil') {
        this.onAdd(false, false);
      }
      else if (menu.Code == "eye" || menu.Type == 'detail') {
        this.onAdd(false, true)
      }
      ////> If Delete Button Clicked, Execute onDelete()
      else if (menu.Type == 'delete' || menu.Code == 'trash') {
        this.onDelete()
      }
    }
  }
  //
  // Checkbox Selection Popup
  getSelectionPopup(selectedList: DTOMAConfig[]) {
    var moreActionDropdown = new Array<MenuDataItem>();

    // Check If Any Item(s) In Selected List Can Send To Verify
    var canApDung = selectedList.findIndex(s => s.StatusID == 0 || s.StatusID == 3 || s.StatusID == 4);
    ////> Push Send To Verify Button To Array If Condition True 
    if (canApDung != -1 && (this.isMaster || this.isCreator))
      moreActionDropdown.push({
        Type: "StatusID", Name: "Áp dụng", Code: "check-outline", Link: "2", Actived: true, LstChild: []
      })

    // Check If Any Item(s) In Selected List Need To Be Verified Or Returned
    var canTraLai = selectedList.findIndex(s => s.StatusID == 3)
    ////> Push Return Button To Array If Condition True 
    if (canTraLai != -1 && (this.isMaster || this.isVerifier)) {//|| canTraLai_canXoa != -1 && (this.isMaster || this.isVerifier)
      moreActionDropdown.push({
        Type: "StatusID", Name: "Trả về", Code: "undo", Link: "4", Actived: true, LstChild: []
      })
    }

    // Check If Any Item(s) In Selected List Need To Stop Displaying
    var canStop = selectedList.findIndex(s => s.StatusID == 2)
    ////> Push Stop Displaying Button To Array If Condition True 
    if (canStop != -1 && (this.isMaster || this.isVerifier))
      moreActionDropdown.push({
        Type: "StatusID", Name: "Ngưng áp dụng", Code: "minus-outline", Link: "3", Actived: true, LstChild: []
      })

    // Check If Any Item(s) In Selected List Can Be Deleted
    var canXoa = selectedList.findIndex(s => s.StatusID == 0);
    ////> Push Delete Button To Array If Condition True 
    if ((canXoa != -1 && (this.isMaster || this.isCreator)))//|| canTraLai_canXoa != -1 && (this.isMaster || this.isVerifier)
      moreActionDropdown.push({
        Name: "Xóa Cấu hình", Type: 'delete',
        Code: "trash", Link: "delete", Actived: true, LstChild: []
      })

    return moreActionDropdown
  }
  //

  // Select Events In Popup
  onSelectedPopupBtnClick(btnType: string, list: any[], value: any) {
    if (list.length > 0) {
      // If Select To Change Status Of Hashtag
      if (btnType == "StatusID") {
        if (value == 2 || value == '2') // Verify Button Clicked
          ////> StatusID That Can Be Verified
          list.forEach(s => {
            if (s.StatusID == 0 || s.StatusID == 3 || s.StatusID == 4) {
              this.updateStatus(s, value)
            }
          })
        else if (value == 3 || value == '3') // Stop Displaying Button Clicked
          ////> StatusID That Can Stop Displaying
          list.forEach(s => {
            if (s.StatusID == 2) {
              this.updateStatus(s, value)
            }
          })
        else if (value == 4 || value == '4') // Return Button Clicked
          ////> StatusID That Can Be Returned
          list.forEach(s => {
            if (s.StatusID == 3) {
              this.updateStatus(s, value)
            }
          })

        if (Ps_UtilObjectService.hasListValue(this.listUpdateConfig))
          this.getUpdateWebConfigStatus(this.listUpdateConfig, value)
      }
      else if (btnType == "delete") { // Delete Button Clicked
        // Open Confirm Dialog
        this.onDeleteMany()
        this.listUpdateConfig = []

        // Only Hashtag With StatusID == 0 Can Be Deleted
        list.forEach(s => {
          if (s.StatusID == 0)
            this.listUpdateConfig.push(s)
        })
      }
    }
  }
  //
  keydownEnter(e: KeyboardEvent) {
    //disable close drawer
    e.preventDefault();
    e.stopPropagation();
  }
  //
  // Folder
  getRes(str: string) {
    return Ps_UtilObjectService.getImgRes(str)
  }
  onUploadImg(imgSt: number = 1) {
    this.curImgSt = imgSt
    this.layoutService.folderDialogOpened = true
  }
  onClearImg(imgSt: number = 1) {
    this.Config['ImageSetting' + imgSt] = "";
  }

  pickFile(e: DTOCFFile, width, height) {
    this.Config['ImageSetting' + this.curImgSt] = e?.PathFile.replace('~', '')
    this.layoutService.setFolderDialog(false)
  }
  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog())//TODO FOLDER ID
      return this.apiService.GetFolderWithFile(childPath, 8).pipe(takeUntil(this.subscription))
  }
  //
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
