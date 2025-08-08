import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  State,
} from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { DTOHRPolicyMaster } from '../../dto/DTOHRPolicyMaster.dto';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { DTOResponse, Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOHRPolicyTask } from '../../dto/DTOHRPolicyTask.dto';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { takeUntil } from 'rxjs/operators';
import { HriTransitionApiService } from '../../services/hri-transition-api.service';
import { PageChangeEvent } from '@progress/kendo-angular-treelist';
import { PKendoGridComponent } from 'src/app/p-app/p-layout/components/p-kendo-grid/p-kendo-grid.component';
import { SearchFilterGroupComponent } from 'src/app/p-app/p-layout/components/search-filter-group/search-filter-group.component';
import { HriTaskCategoryApiService } from '../../services/hri-task-category-api.service';
import { DTOHRLSTaskCus } from '../../dto/DTOHRTaskCategory.dto';

@Component({
  selector: 'app-hr-task-adder',
  templateUrl: './hr-task-adder.component.html',
  styleUrls: ['./hr-task-adder.component.scss'],
})
export class HrTaskAdderComponent implements OnInit, OnDestroy, OnChanges {
  /** GIA TRI DONG MO DIALOG
   * @type {boolean}
   */
  @Input() isOpenDialog: boolean = false;

  /**
   * ITEM POLICYMASTER
   * @type {DTOHRPolicyMaster}
   */
  @Input() PolicyMaster: DTOHRPolicyMaster = new DTOHRPolicyMaster();

  /**
   * Danh sách công vieejc đã có trong chính sahcs
   * @type {DTOHRPolicyTask}
   */
  @Input() DataPolicyTask: DTOHRPolicyTask[];

  /**
   * Loại thêm mới đầu việc. 1-Chính sách || 2-Xử lý kỉ luật
   * @type {number}
   */
  @Input() TypePopup?: number = 1;

  @Input() TypeApplyPosition?: number = 1;

  @Output() closed: EventEmitter<{ num: number, tasks: DTOHRPolicyTask[] }> = new EventEmitter<{ num: number, tasks: DTOHRPolicyTask[] }>();
  @ViewChild('grid') grid: PKendoGridComponent;
  @ViewChild('search') search: SearchFilterGroupComponent;

  //region Policy
  ListPolicy: DTOHRPolicyMaster[] = [];

  // CHỨA GIÁ TRỊ ĐƯỢC CHỌN CỦA DROPDOWN
  currentPolicy: { Code: number; PolicyName: string };

  // end region

  // region Grid
  gridView = new Subject<any>();
  pageSize = 25;
  pageSizes = [25, 50, 75, 100];
  skip = 0;
  // pageSizes=[this.pageSize];
  isLoading: boolean = false;
  isSelectingItemGrid: boolean = false; // Có đang chọn item trên grid không

  tempSearch: {
    field: string;
    operator: string;
    value: number;
    ignoreCase: boolean;
  };
  selectedItem: DTOHRPolicyTask[] = [];

  // MẢNG CHỨA DANH SÁCH TẤT CẢ CÁC ĐẦU VIỆC ĐỂ CẬP NHẬT TẤT CẢ
  ListDataBiding: DTOHRPolicyTask[] = [];
  ListPolicyTask: DTOHRPolicyTask[] = [];

  // SELECTABLE GRID SETTING
  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  };

  // GRID STATE
  gridState: State = {
    skip: this.skip,
    take: this.pageSize,
    filter: { filters: [], logic: 'and' },
  };

  // GRID STATE SYSTEM
  gridStateSys: State = {
    skip: this.skip,
    take: this.pageSize,
    filter: { filters: [], logic: 'and' },
  };

  gridStatePolicy: State = {
    filter: { filters: [], logic: 'and' },
  };

  // BIEN KIEM TRA CAC TRUONG CAN FILTER CHO CHINH SACH
  FilterFields: string[] = ['TaskName', 'Description', 'Name'];

  // KIỂM TRA HIỂN THỊ CỘT NẾU LÀ POLICYTASK VÀ SYSTEMTASK
  hiddenTask: boolean = true;
  isFisrtOpenDialog: boolean = true; // Kiểm tra lần đầu mở dialog

  //  GẮN GIÁ TRỊ ITEM KHI CHỌN VÀO INPUT TRÊN GRID
  getSelectedRowitem(SelectedRowitem: []) {
    this.selectedItem = SelectedRowitem;
    this.isSelectingItemGrid = Ps_UtilObjectService.hasListValue(SelectedRowitem);
  }

  // end region

  // search filter box
  filterSearchBox: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };
  // DROP DOWN FILTER BOX
  filterPolicy: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  //UNSUBCRIBE
  Unsubscribe = new Subject<void>();
  valueSearch: string | number;
  onSelectCallback: Function

  /**
   * Danh sách các API để unscribe khi component bị destroy
   */
  arrSub: Subscription[] = [];



  // State grid get công việc thuộc danh mục đầu việc
  gridStateRLS: State = {
    skip: this.skip,
    take: this.pageSize,
    sort: [{ field: 'Code', dir: 'desc' }],
    filter: {
      filters: [
        // { field: 'Status', operator: 'eq', value: 2 }
      ],
      logic: 'and',
    },
  };

  // State grid get công việc thuộc danh mục đầu việc thuộc bảng đầu việc
  gridStateAllTaskBoard: State = {
    skip: this.skip,
    take: this.pageSize,
    sort: [{ field: 'Code', dir: 'desc' }],
    filter: {
      filters: [],
      logic: 'and',
    },
  };






  //#region LYCYCLEHOOK
  constructor(
    private layoutService: LayoutService,
    private apiPolicyService: HriTransitionApiService,
    private taskCategoryService: HriTaskCategoryApiService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpenDialog && changes.isOpenDialog.currentValue === true) {
      this.PolicyMaster.TypeApply = this.TypeApplyPosition
      this.onInitCallAPI();
    }
  }

  ngOnInit(): void {
    this.onCheckTitleDialog();
    this.onPageChangeCallback = this.onPageChange.bind(this);
    this.onSelectCallback = this.onGridItemSelect.bind(this);
  }

  ngOnDestroy(): void {
    // this.Unsubscribe.next();
    // this.Unsubscribe.complete();
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
    this.selectedItem = [];
  }

  //#endregion

  // HÀM GỌI API KHO MỞ DIALOG

  //#region HÀM CHẠY INIT
  //  CHÍNH SÁCH HỆ THỐNG - SAMPLE DATA
  samplePolicy: DTOHRPolicyMaster[] =
    [
      {
        Code: -1,
        PolicyID: '',
        PolicyName: 'Hệ thống',
        EffDate: '',
        Description: '',
        TypeApply: 1,
        Status: 0,
        StatusName: 'Đang soạn thảo',
        NumOfTask: null,
        TypeData: null,
        ListPositionName: [],
      },
      {
        Code: -2,
        PolicyID: '',
        PolicyName: 'Danh mục đầu việc',
        EffDate: '',
        Description: '',
        TypeApply: 1,
        Status: 0,
        StatusName: 'Đang soạn thảo',
        NumOfTask: null,
        TypeData: null,
        ListPositionName: [],
      }

    ]

    sampleCategoryTask: DTOHRPolicyMaster =    
    {
      Code: -2,
      PolicyID: '',
      PolicyName: 'Danh mục đầu việc',
      EffDate: '',
      Description: '',
      TypeApply: 1,
      Status: 0,
      StatusName: 'Đang soạn thảo',
      NumOfTask: null,
      TypeData: null,
      ListPositionName: [],
    }

    samplePolicyAllList: DTOHRPolicyMaster =  {
      Code: -3,
      PolicyID: '',
      PolicyName: 'Tất cả đầu việc thuộc bảng đầu việc',
      EffDate: '',
      Description: '',
      TypeApply: 1,
      Status: 0,
      StatusName: 'Đang soạn thảo',
      NumOfTask: null,
      TypeData: null,
      ListPositionName: [],
    }


  onInitCallAPI() {
    // Nếu được gọi từ Bảng đầu việc XLKL
    if (this.TypePopup == 2) {
      this.onInitTaskBoardXLKL();

      this.FilterFields = ['TaskName', 'Description']; // Filter search theo các tiêu chí

      // Push filter mặc định
      this.gridStatePolicy.filter.filters.push({ field: 'Status', operator: 'eq', value: 2 });
      this.gridStatePolicy.filter.filters.push({ field: 'TypeData', operator: 'eq', value: 3 });

      this.APIGetListPolicy(this.gridStatePolicy);
      // this.APIGetListHRLSTask()
      if(this.ListPolicy.length > 0){
        this.samplePolicy.unshift(this.samplePolicyAllList)
      }
      return;
    }


    let filterStatus: FilterDescriptor = { field: 'Status', operator: 'eq', value: 2 }
    this.gridStateRLS.filter.filters.push(filterStatus)


    if (this.TypePopup == 1) {
      this.FilterFields = ['TaskName', 'Description'];

      if (this.PolicyMaster.TypeData == 1) {
        this.onInitOnBoarding();
      } else if (this.PolicyMaster.TypeData == 2) {
        this.onInitOffBoarding();
      }

      // this.APIGetListSYSTaskInFunction(this.gridStateSys);
      this.APIGetListHRLSTask()
      this.onInitFilterPolicy();
      this.APIGetListPolicy(this.gridStatePolicy);

    }
  }
  // FILTER CHO ONBOARDING
  onInitOnBoarding() {
    const DLLPackage: FilterDescriptor = { field: 'DLLPackage', operator: 'contains', value: 'hri021-policy-onboarding-list' };
    const IsFunctionTaskActive: FilterDescriptor = { field: 'IsFunctionTaskActive', operator: 'eq', value: true };
    const IsActive: FilterDescriptor = { field: 'IsActive', operator: 'eq', value: true };

    this.gridStateSys.filter.filters.push(DLLPackage, IsFunctionTaskActive, IsActive);
  }

  // FILTER CHO OFFBOARDING
  onInitOffBoarding() {
    const DLLPackage: FilterDescriptor = { field: 'DLLPackage', operator: 'contains', value: 'hri022-policy-offboarding-list' };
    const IsFunctionTaskActive: FilterDescriptor = { field: 'IsFunctionTaskActive', operator: 'eq', value: true };
    const IsActive: FilterDescriptor = { field: 'IsActive', operator: 'eq', value: true };

    this.gridStateSys.filter.filters.push(DLLPackage, IsFunctionTaskActive, IsActive);
  }

  onInitFilterPolicy() {
    const status: FilterDescriptor = { field: 'Status', operator: 'eq', value: 2 };
    const typeData: FilterDescriptor = { field: 'TypeData', operator: 'eq', value: this.PolicyMaster.TypeData };
    const typeApply: FilterDescriptor = { field: 'TypeApply', operator: 'eq', value: this.PolicyMaster.TypeApply };

    this.gridStatePolicy.filter.filters.push(status, typeData, typeApply);
  }

  // Init đối với popup được mở ở XLKL
  onInitTaskBoardXLKL() {
    const DLLPackage: FilterDescriptor = { field: 'DLLPackage', operator: 'contains', value: 'hri036-disciplinary-list' };
    const IsFunctionTaskActive: FilterDescriptor = { field: 'IsFunctionTaskActive', operator: 'eq', value: true };
    const IsActive: FilterDescriptor = { field: 'IsActive', operator: 'eq', value: true };

    this.gridStateSys.filter.filters.push(DLLPackage, IsFunctionTaskActive, IsActive);
  }


  //#region PAGE CHANGE
  //PAGE CHANGE
  onPageChangeCallback: Function;
  onPageChange(event: PageChangeEvent) {
    this.onLoadFilter();
    if (this.currentPolicy.Code == -1) {
      this.gridStateSys.skip = event.skip;
      this.gridStateSys.take = event.take;
      this.pageSize = event.take;

      this.APIGetListSYSTaskInFunction(this.gridStateSys);
    }
    else {
      this.gridState.skip = event.skip;
      this.gridState.take = event.take;
      this.pageSize = event.take;
      this.APIGetListHRPolicyTask(this.gridState);
    }
  }
  //#endregion
  //#region HÀM CHECK
  // KIỂM TRA GẮN TITLE DIALOG
  title: string = '';
  // HÀM KIỂM TRA TITLE
  onCheckTitleDialog() {
    // Đối với chính sách
    if (this.TypePopup == 1) {
      this.PolicyMaster.TypeApply == 1 ? (this.title = 'THÊM ĐẦU VIỆC CÓ SẲN') : (this.title = 'THÊM ĐẦU VIỆC TỪ CHÍNH SÁCH KHÁC');
    }

    // Đối với xử lý kỷ luật
    else if (this.TypePopup == 2) {
      this.title = "THÊM ĐẦU VIỆC CÓ SẴN"
    }
  }

  checkDataUpdate() {
    this.ListDataBiding.every;
  }

  // HÀM KIỂM TRA XEM CÓ ĐẦU VIỆC ĐƯỢC CHỌN HAY KHÔNG , DISABLED NÚT CẬP NHẬT

  isButtonDisabled(): boolean {
    return !this.selectedItem || this.selectedItem.length === 0;
  }

  // HÀM SET FONT CHỮ CHO CỘT THỰC HIỆN BỞI
  checkAssigneeBy(name: string): string {
    if (name === 'Hệ thống') {
      return 'font-style: italic;';
    }
    if (name === 'Nhân sự áp dụng') {
      return 'font-weight: 600;';
    }
  }
  // HÀM KIỂM TRA VÀ GẮN STYLE CHO TEXT
  styleForSystem() {
    // Đối với chính sách
    if (this.TypePopup == 1) {
      const listPopupElement = document.querySelectorAll('kendo-popup');
      const popup =
        listPopupElement[listPopupElement.length - 1]?.querySelector(
          'kendo-list'
        );
      const listli = popup?.querySelectorAll('li');

      if (listli && listli.length > 1) {
        listli[0].style.fontWeight = '600'; // In đậm mục đầu tiên
        listli[1].style.fontWeight = '600'; // In đậm mục thứ hai
        listli[1].style.borderBottom = '1px solid black'; // Thêm line dưới mục thứ hai
      }
    }else if(this.TypePopup == 2){
      const listPopupElement = document.querySelectorAll('kendo-popup');
      const popup =
        listPopupElement[listPopupElement.length - 1]?.querySelector(
          'kendo-list'
        );
      const listli = popup?.querySelectorAll('li');

      if (listli && listli.length > 1) {
        listli[0].style.fontWeight = '600'; // In đậm mục đầu tiên
        listli[0].style.borderBottom = '1px solid black'; // Thêm line dưới mục thứ hai
      }
    }
  }


  // ham kiem tra de  hien thi dialog
  isCheckVisibilityDialog() {
    return this.isOpenDialog ? 'visible' : 'hidden';
  }

  /**
   * Hàm nhận giá trị từ grid khi item được chọn
   * @param isSelected 
   */
  onGridItemSelect(isSelected: boolean) {
    this.isSelectingItemGrid = isSelected;
  }

  /**
   * Hàm dùng để thêm class vào cho grid
   * @returns 
   */
  handleSetClassGrid = () => {
    return {
      'grid-selecting': this.isSelectingItemGrid
    };
  };
  //#endregion

  //region dropdownlist+seach

  // SỰ KIỆN CHỌN DROPDOWN
  /**
   *
   * @param event SỰ KIẾN DROPDƠN
   */
  onDropdownlistClick(event: any) {
    if (event.Code == null) {
      return;
    }

    this.isSelectingItemGrid = false;
    this.search.value = ''; // Clear search sau khi chọn 1 bảng đầu việc khác
    this.filterSearchBox.filters = [];
    this.grid.clearSelection(); // Clear những đầu việc đang được chọn
    this.currentPolicy = event;
    this.gridState.filter.filters = [];

    const filter: FilterDescriptor = { field: 'Policy', operator: 'eq', value: this.currentPolicy.Code };
    this.filterPolicy.filters = [filter];

    if (this.currentPolicy.Code == -2) {
      this.hiddenTask = true;
      this.FilterFields = ['TaskName', 'Description'];
      this.APIGetListHRLSTask();
      return
    }
    if (this.currentPolicy.Code == -3) {
      this.hiddenTask = true;
      this.FilterFields = ['TaskName', 'Description'];
      this.APIGetListHRPolicyTask(this.gridStateAllTaskBoard);
      return
    }


    // Đối với xử lý kỷ luật
    if (this.TypePopup == 2) {
      this.hiddenTask = false;
      this.gridState.filter.filters.push({ field: 'Policy', operator: 'eq', value: this.currentPolicy.Code });
      this.APIGetListHRPolicyTask(this.gridState);
      this.FilterFields = ['TaskName', 'Description'];
      return;
    }

    this.onLoadFilter();


    if (this.currentPolicy.Code == -1) {
      this.hiddenTask = true;
      this.FilterFields = ['TaskName', 'Description'];
      this.APIGetListSYSTaskInFunction(this.gridStateSys);
    }
    else {
      this.APIGetListHRPolicyTask(this.gridState);
      this.FilterFields = ['TaskName', 'Description', 'AssigneeBy'];
      this.hiddenTask = false;
    }
  }

  handleValueSearchChange(value: any) {
    this.valueSearch = value;
  }

  /**
   * HÀM XỬ LÍ SỰ KIỆN SEARCH
   * @param event SỰ KIỆN SEARCH
   */
  handleSearch(event: any) {
    if (event.filters && event.filters.length > 0) {
      if (event.filters[0].value === '') {
        if (this.currentPolicy.Code == -2) {
          this.gridStateRLS.filter.filters = []
          this.gridStateRLS.skip = null
          let filterDesStatus: CompositeFilterDescriptor = {
            logic: 'or',
            filters: [
              { field: 'Status', operator: 'eq', value: 2 },
            ]
          }
          this.gridStateRLS.filter.filters.push(filterDesStatus)
          this.APIGetListHRLSTask()
        } 
        else if(this.currentPolicy.Code == -3){
          this.APIGetListHRPolicyTask(this.gridStateAllTaskBoard);
        }
        else {
          this.gridState.skip = null;
          this.onLoadFilter();
          if (Ps_UtilObjectService.hasValue(this.currentPolicy?.Code)) {
            if (this.currentPolicy?.Code == -1) {
              this.APIGetListSYSTaskInFunction(this.gridStateSys);
            }
            else {
              this.APIGetListHRPolicyTask(this.gridState);
            }
          }
        }

        // API -----------
      }
      else if (Ps_UtilObjectService.hasValueString(event)) {
        this.filterSearchBox.filters = event.filters;
        this.tempSearch = event.filters;
        this.gridState.skip = null;
        this.onLoadFilter();
        if (this.currentPolicy.Code == -1) {
          this.APIGetListSYSTaskInFunction(this.gridStateSys);
        }
        else if (this.currentPolicy.Code == -2) {
          this.gridStateRLS.filter.filters = []

          let filterDesSearch: CompositeFilterDescriptor = {
            logic: 'or',
            filters: [
              { field: 'Name', operator: 'eq', value: this.valueSearch.toString().trim() },
              { field: 'Description', operator: 'eq', value: this.valueSearch.toString().trim() }
            ]
          }
          let filterDesStatus: CompositeFilterDescriptor = {
            logic: 'or',
            filters: [
              { field: 'Status', operator: 'eq', value: 2 },
            ]
          }


          this.gridStateRLS.filter.filters.push(filterDesStatus)
          this.gridStateRLS.filter.filters.push(filterDesSearch)
          this.APIGetListHRLSTask()
          this.gridStateRLS.filter.filters.pop()

        }else if(this.currentPolicy.Code == -3){
          this.gridStateAllTaskBoard.filter.filters.push(this.filterSearchBox)
          this.APIGetListHRPolicyTask(this.gridStateAllTaskBoard);
          this.gridStateAllTaskBoard.filter.filters.pop()

        }
        else {
          this.APIGetListHRPolicyTask(this.gridState);
        }
        // API------------
      }
    }
    this.grid.clearSelection();
  }

  /**
   * Hàm dùng để lấy placeholder của text box tìm kiếm
   */
  handleGetPlaceholderSearch() {
    // Đối với chính sách
    if (this.TypePopup == 1) {
      return 'Tìm theo tên, mô tả, chức danh thực hiện đầu việc';
    }

    // Đối với xử lý kỷ luật
    if (this.TypePopup == 2) {
      return 'Tìm theo tên, mô tả đầu việc';
    }
  }
  //   end region

  //#region FILTER
  // HÀM KIỂM TRA PUSH CÁC GIÁ TRỊ FILTER VÀO GRIDSTATE
  onLoadFilter() {
    // reset filler
    this.pageSizes = [...this.layoutService.pageSizes];
    this.gridState.take = this.pageSize;
    this.gridState.filter.filters = [];
    this.gridStateSys.filter.filters = [];
    this.selectedItem = null;

    if (this.PolicyMaster.TypeData == 1) {
      this.onInitOnBoarding();
    } else if (this.PolicyMaster.TypeData == 2) {
      this.onInitOffBoarding();
    }

    if (Ps_UtilObjectService.hasListValue(this.filterSearchBox.filters)) {
      if (this.tempSearch[0].value != '') {
        this.gridState.filter.filters.push(this.filterSearchBox);
        this.gridStateSys.filter.filters.push(this.filterSearchBox);
      }
    }
    if (this.filterPolicy.filters.length > 0) {
      this.gridState.filter.filters.push(this.filterPolicy);
    }

    if (!Ps_UtilObjectService.hasValue(this.currentPolicy)) {
      this.layoutService.onError('Đã xảy ra lỗi khi tìm kiếm: Không có Bảng đầu việc được chọn');
      return;
    }
  }

  /**
   * HÀM LỌC DỮ LIỆU
   * @param data DANH SÁCH ĐẦU VIỆC
   * @param DataPolicyTask DANH SÁCH ĐẦU VIỆC POLICY TASK ĐÃ CÓ TRONG POLICY
   * @returns
   */
  filterListDataBiding(data: DTOHRPolicyTask[], DataPolicyTask: DTOHRPolicyTask[]): DTOHRPolicyTask[] {
    
    
    return data.filter((item) => {
      if (!DataPolicyTask) return true;
      return !DataPolicyTask.some((task) => task.TaskName === item.TaskName && task.Description === item.Description);
    });
  }

  //#endregion

  //#region CẬP NHẬT ĐẦU VIỆC
  // HÀM CẬP NHẬT THÊM ĐẦU VIỆC ĐƯỢC CHỌN
  onUpdateTask() {
    let updatedItem = [...this.selectedItem];
    this.FilterFields = [];
    let updateProperties: string[] = [
      'Code',
      'Policy',
      'TaskName',
      'PositionAssignee',
      'PositionAssignee',
      'SystemAssignee',
      'TypeAssignee',
      'AssigneeBy',
      'DateDuration',
      'ListStaffType',
      'OrderBy',
      'HasException',
      'ListException',
      'DLLPackage',
      'Description',
      'LSTask'
    ];
    if (Ps_UtilObjectService.hasValue(updatedItem)) {

      updatedItem.forEach((item) => {
        if (item && typeof item === 'object') {
          item.Code = 0;
          item.Policy = this.PolicyMaster.Code;
          if (
            Ps_UtilObjectService.hasValue((item as any).IsFunctionTaskActive)
          ) {
            item.TypeAssignee = 1;
            item.SystemAssignee = (item as any).TaskFunction;
          } else if (
            Ps_UtilObjectService.hasValue(item.PositionAssignee) &&
            Ps_UtilObjectService.hasValue(item.SystemAssignee)
          ) {
            item.TypeAssignee = 3;
          } else if (
            Ps_UtilObjectService.hasValue(item.PositionAssignee) &&
            !Ps_UtilObjectService.hasValue(item.SystemAssignee)
          ) {
            item.TypeAssignee = 2;
          }
        }
      });
      let sizeUpdateData = updatedItem.length;
      if (sizeUpdateData === 1) {
        this.APIUpdateHRPolicyTask(updatedItem[0], updateProperties);
      } else if (sizeUpdateData > 1) {
        this.APIUpdateHRListPolicyTask(updatedItem);
      }
    }
    updatedItem = null;
    this.selectedItem = null;
    this.gridStatePolicy.filter.filters = [];
  }

  // HÀM CẬP NHẬT TẤT CẢ ĐẦU VIỆC
  onUpdateAll() {
    let updateData = [...this.ListDataBiding];
    if (Ps_UtilObjectService.hasListValue(updateData)) {
      updateData.forEach((item) => {
        if (item && typeof item === 'object') {
          item.Code = 0;
          item.Policy = this.PolicyMaster.Code;
          if (Ps_UtilObjectService.hasValue((item as any).IsFunctionTaskActive)) {
            item.TypeAssignee = 1;
            item.SystemAssignee = (item as any).TaskFunction;
          }
          else if (Ps_UtilObjectService.hasValue(item.PositionAssignee) && Ps_UtilObjectService.hasValue(item.SystemAssignee)) {
            item.TypeAssignee = 3;
          }
          else if (Ps_UtilObjectService.hasValue(item.PositionAssignee) && !Ps_UtilObjectService.hasValue(item.SystemAssignee)) {
            item.TypeAssignee = 2;
          }
        }
      });
      this.APIUpdateHRListPolicyTask(updateData);
    }
    else {
      this.selectedItem = null;
      updateData = null;
    }
    this.gridStatePolicy.filter.filters = [];
  }
  //#endregion

  //region API
  /**
   * HÀM GỌI API LẤY DANH SÁCH POLICY DROPDOWN
   * @param state : kendo filter
   * @returns
   */
  APIGetListPolicy(state: State) {
    let a = this.apiPolicyService.GetListHRPolicy(null, state).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode === 0) {
        this.ListPolicy = res.ObjectReturn.Data;
        if(this.ListPolicy.length > 0){
          this.ListPolicy.unshift(this.samplePolicyAllList)
        
        }
        this.getFilterPolicy()
        // Thêm "Hệ thống" vào dropdown Bảng đầu việc nếu đối với Chính sách
        if(this.TypePopup == 2){
          this.ListPolicy.unshift(this.sampleCategoryTask)
        }
        
        if (this.TypePopup == 1) {
          this.samplePolicy.forEach((item) => {
            this.ListPolicy.unshift(item)
          })
        }else{

        }

        // Item hiện tại được chọn trong dropdown
        if (Ps_UtilObjectService.hasListValue(this.ListPolicy)) {
          this.currentPolicy = {
            Code: this.ListPolicy[0].Code,
            PolicyName: this.ListPolicy[0].PolicyName,
          };

          // Nếu là lần đầu mở dialog thì gọi API lấy danh sách đầu việc
          if (this.isFisrtOpenDialog) {
            if (this.TypePopup == 2) {
              this.gridState.filter.filters.push({ field: 'Policy', operator: 'eq', value: this.ListPolicy[0].Code });
              // this.APIGetListHRPolicyTask(this.gridState);
              this.APIGetListHRLSTask()
            }

            this.isFisrtOpenDialog = false;
          }
        }
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chính sách: ${res.ErrorString}`);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chính sách: ${error}`);
    });

    this.arrSub.push(a);
  }

  /**
   * HÀM GỌI API LẤY DANH SÁCH ĐẦU VIỆC
   * @param state
   * STATE LÀ GRIDSTATE
   */
  APIGetListHRPolicyTask(state: State) {
    this.isLoading = true;
    var ctx = 'Policy ';

    if (Ps_UtilObjectService.hasListValue(state.filter.filters) || !Ps_UtilObjectService.hasValueString(this.valueSearch)) {
      if(this.currentPolicy.Code != -3){
        const policy = state.filter.filters.find((filter: any) => filter.field == 'Policy');
        if (!Ps_UtilObjectService.hasValue(policy)) {
          state.filter.filters.push({ field: 'Policy', operator: 'eq', value: this.currentPolicy.Code })
        }
      }
    }

    let a = this.apiPolicyService.GetListHRPolicyTask(state).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        let data = res.ObjectReturn.Data;
        this.ListDataBiding = this.removeDuplicateTasksSystem(data, this.DataPolicyTask);
        this.gridView.next({ data: this.ListDataBiding, total: this.ListDataBiding.length });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${ctx}: ${res.ErrorString}`);
      }

      this.isLoading = false;
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${ctx}: ${err}`);
      this.isLoading = false;
    });

    this.arrSub.push(a);
  }

  /**
   * HÀM GỌI API LẤY DANH SÁCH ĐẦU VIỆC CỦA HỆ THỐNG
   * @param state : KENDO FILTER {DLLPackage,IsFunctionTaskActive: true, IsActive: true}
   */
  APIGetListSYSTaskInFunction(state: State) {
    const ctx = 'đầu việc từ chính sách khác';
    this.isLoading = true;
    let a = this.apiPolicyService.GetListSYSTaskInFunction(state).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        let data = res.ObjectReturn.Data;
        this.ListDataBiding = this.filterListDataBiding(data, this.DataPolicyTask);

        this.gridView.next({ data: this.ListDataBiding, total: this.ListDataBiding.length });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${ctx}: ${res.ErrorString}`);
      }

      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách  ${ctx}: ${error} `);
    });

    this.arrSub.push(a);
  }

  /**
   * HÀM GỌI API CẬP NHẬT ĐẦU VIỆC ĐƠN
   * @param DTO  ITEM CẦN CẬP NHẬT CÓ DTO LÀ POLICYTASK
   * @param propertiess CÁC TRƯỜNG YÊU CẦU ĐỂ CÓ THỂ CẬP NHẬT TASK
   */
  APIUpdateHRPolicyTask(DTO: DTOHRPolicyTask, propertiess?: any) {
    const ctx = 'đầu việc có sẳn';
    this.isLoading = true;
    let a = this.apiPolicyService.UpdateHRPolicyTask(DTO, propertiess).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Cập nhật ${ctx} thành công`);
        this.onCloseDialog(1, [DTO]);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${ctx}: ${res.ErrorString}`);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${ctx}: ${error}`);
      this.isLoading = true;
    });

    this.arrSub.push(a);
  }

  /**
   * HÀM GỌI API CẬP NHẬT NHIỀU ĐẦU VIỆC
   * @param DTO DANH SÁCH ITEM ĐẦU VIỆC DTOPOLICYTASK
   */
  APIUpdateHRListPolicyTask(DTO: DTOHRPolicyTask[]) {
    const ctx = 'tất cả đầu việc có sẳn';
    this.isLoading = true;
    let a = this.apiPolicyService.UpdateHRListPolicyTask(DTO).pipe(takeUntil(this.Unsubscribe)).subscribe((res) => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Cập nhật ${ctx} thành công`);
        this.onCloseDialog(1, DTO);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${ctx}: ${res.ErrorString}`);
      }
    }, (error) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${ctx}: ${error}`);
    });

    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách thông tin bảng công việc
   */
  APIGetListHRLSTask() {
    const apiText = "Đầu công việc"
    let a = this.taskCategoryService.GetListHRLSTask(this.gridStateRLS).pipe(takeUntil(this.Unsubscribe)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        let data = res.ObjectReturn.Data;
        this.ListDataBiding = this.convertDTOArray(data)
        this.ListDataBiding = this.removeDuplicateTasks(this.ListDataBiding, this.DataPolicyTask)
        this.gridView.next({ data: this.ListDataBiding, total: this.ListDataBiding.length });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`);
      }

      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  //#endregion

  // HÀM ĐÓNG DIALOG
  /**
   *
   * @param typeClose LOẠI ĐÓNG DIALOG : LÀ CẬP NHẬT , ĐÓNG
   */
  onCloseDialog(typeClose: number, tasks: DTOHRPolicyTask[]) {
    this.isOpenDialog = false;
    this.closed.emit({ num: typeClose, tasks: tasks });
    this.selectedItem = [];
    if (this.search.value !== '') {
      this.search.clear();
    }
    this.currentPolicy = null;

    this.grid.clearSelection();
    this.gridStatePolicy.filter.filters = [];
    this.gridStateSys.filter.filters = [];

    this.isSelectingItemGrid = false; // Reset lại danh sách các item được chọn trên grid
    this.isFisrtOpenDialog = true; // Reset lại biến kiểm tra lần đầu mở dialog
    this.gridState.filter.filters = []; // Reset lại filter của grid
    // this.APIGetListHRLSTask()
  }


  convertSingleDTO(source: any): any {
    return {
      Function: null,
      TaskFunction: source.Status,
      OrderBy: null,
      DLLPackage: 'hri021-policy-onboarding-list',
      FunctionTaskID: null,
      Code: source.Code,
      TaskID: source.ID,
      TaskName: source.Name,
      IsActive: source.Status === 2,
      Description: source.Description,
      DateDuration: source.Duration,
      TypeAssignee: 1,
      LSTask: source.Code
    };
  }

  convertDTOArray(sourceArray: any[]): any[] {
    return sourceArray.map((item) => this.convertSingleDTO(item));
  }

  removeDuplicateTasks(array1: any[], array2: any[]): any[] {
    const lstTaskSet = new Set(array2?.map(item => item.LSTask)); // Tạo danh sách LSTask từ array2
    return array1?.filter(item => !lstTaskSet.has(item.LSTask)); // Lọc array1, bỏ những item có LSTask trùng
  }

  // removeDuplicateTasksSystem(array1: any[], array2: any[]): any[] {
  //   const lstTaskSet = new Set(array2.map(item => item.LSTask)); // Tạo danh sách LSTask từ array2
  
  //   return array1.filter(item => item.TypeAssignee !== 1 || !lstTaskSet.has(item.LSTask));
  // }

  removeDuplicateTasksSystem(array1: any[], array2: any[]): any[] {
    const taskNameSet = new Set(array2?.map(item => item.TaskName)); // Set chứa TaskName từ array2
    const lstTaskSet = new Set(array2?.map(item => item.LSTask).filter(Boolean)); // Set chứa LSTask từ array2 (loại bỏ undefined/null)
  
    return array1.filter(item => {
      if (item.TypeAssignee === 1) {
        const hasTaskName = taskNameSet.has(item.TaskName);
    
        return !(hasTaskName); // Nếu có trùng TaskName hoặc LSTask, loại bỏ
      }
      if(item.LSTask){
        const hasLSTask = item.LSTask ? lstTaskSet.has(item.LSTask) : false;
        return !(hasLSTask)
      }
      return true; // Nếu TypeAssignee khác 1, giữ lại
    });
  }
  
  
  
  


  getFilterPolicy() {
    this.gridStateAllTaskBoard.filter.filters.pop()
    // // Thêm điều kiện lọc mới
    let CompositeFilter: CompositeFilterDescriptor = {
      filters: [],
      logic: 'or'
    };

    let newDescriptor: FilterDescriptor

    this.ListPolicy.forEach((item) => {
      if(item.Code){
        newDescriptor = { field: 'Policy', operator: 'eq', value: item.Code };
        CompositeFilter.filters.push(newDescriptor)
      }

    })

    this.gridStateAllTaskBoard.filter.filters.push(CompositeFilter)

    // let newDescriptor: FilterDescriptor

    // this.ListPolicy.forEach((item) => {
    //   if(item.Code){
    //     newDescriptor = { field: 'Policy', operator: 'eq', value: item.Code };
    //     this.gridStateAllTaskBoard.filter.filters.push(newDescriptor)
    //   }

    // })

  }


}
