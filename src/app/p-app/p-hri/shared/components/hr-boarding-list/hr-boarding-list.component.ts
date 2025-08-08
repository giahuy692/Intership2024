import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, Pipe, PipeTransform, ViewChild } from '@angular/core';
import {
  GridDataResult,
  PageChangeEvent,
  SelectableSettings,
} from '@progress/kendo-angular-grid';
import {
  CompositeFilterDescriptor,
  distinct,
  FilterDescriptor,
  orderBy,
  SortDescriptor,
  State,
} from '@progress/kendo-data-query';
import {
  MenuDataItem,
  ModuleDataItem,
} from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOStaff, Ps_AuthService, Ps_UtilObjectService } from 'src/app/p-lib';
import { multicast, takeUntil } from 'rxjs/operators';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { HriDecisionApiService } from '../../services/hri-decision-api.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { Subject, Subscription } from 'rxjs';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOPayroll } from '../../dto/DTOPayroll.dto';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DTOHRDecisionTask } from '../../dto/DTOHRDecisionTask.dto';
import { SearchFilterGroupComponent } from 'src/app/p-app/p-layout/components/search-filter-group/search-filter-group.component';
import { linkVerticalIcon } from '@progress/kendo-svg-icons';
import { DTOHRDecisionTaskLog } from '../../dto/DTOHRDecisionTaskLog.dto';
import { PKendoTextboxComponent } from 'src/app/p-app/p-layout/components/p-kendo-textbox/p-textbox.component';
import { StaffApiService } from '../../services/staff-api.service';
import { DTOListHR } from '../../dto/DTOPersonalInfo.dto';
import { DTOPosition } from '../../dto/DTOPosition.dto';
import { DTOEmployee, DTOEmployeeDetail } from '../../dto/DTOEmployee.dto';
import { HriTransitionApiService } from '../../services/hri-transition-api.service';
import { DTOHRDecisionProfile } from '../../dto/DTOHRDecisionProfile.dto';
import { DTOHRPolicyTask } from '../../dto/DTOHRPolicyTask.dto';

/**
 * Pipe dùng để kiểm tra loại quyết định
 */
@Pipe({ name: 'pipeDecisionType' })
export class DecisionTypePipe implements PipeTransform {
  transform(profile: any): string {
    if (!Ps_UtilObjectService.hasValue(profile.Petition)) {
      switch (profile.DecisionType) {
        case 1: return '<b title="Quyết định tuyển dụng">Tuyển dụng</b>';
        case 2: return '<b title="Quyết định điều chuyển">Điều chuyển</b>';
        case 3: return '<b title="Quyết định kỷ luật">Kỷ luật</b>';
        default: return '';
      }
    }
    else {
      return '<b title="Đơn xin nghỉ việc">Nghỉ việc</b>';
    }
  }
}

@Component({
  selector: 'app-hr-boarding-list',
  templateUrl: './hr-boarding-list.component.html',
  styleUrls: ['./hr-boarding-list.component.scss'],
})
export class HrBoardingListComponent {
  //#region Input Output
  /** @param 1: onboard | 2: Offboard
   */
  @Input() Module: number = 1;

  /**
   * @param 
   * 1 Chuẩn bị Onboarding/Offboarding |
   * 2 Onboarding/Offboarding |
   * 3 Ngưng Onboarding/Offboarding |
   * 4 Onboarded/Offboarded
   */
  @Input() StepProcess: number = 1;

  //#endregion

  @ViewChild('searchFilterGroup') searchFilterGroup: SearchFilterGroupComponent;

  DecisionProfile = new DTOHRDecisionProfile();

  //#region permission
  isToanQuyen: boolean = false;
  isAllowedToCreate: boolean = false;
  isAllowedToVerify: boolean = false;
  isAllowedToVerifyOnboarded: boolean = false
  isPermissionUpdateStatus: false;
  justLoadedChangePermissionAPI: boolean = true
  justLoaded = true;
  actionPerm: DTOActionPermission[] = [];
  dataPerm: DTODataPermission[] = [];
  M_A: boolean = false;
  M_C: boolean = false;
  //#endregion
  //#region variable status
  isFilterActive = true;
  //#endregion

  // Grid Callback function
  getActionDropdownCallback: Function;
  onActionDropdownClickCallback: Function;
  getSelectionPopupCallback: Function;
  onSelectedPopupBtnCallback: Function;
  onSelectCallback: Function;
  onPageChangeCallback: Function;

  // Subscription CallAPi
  arrUnsubscribe: Subscription[] = [];

  //#region Filter
  // - state variable
  isOverdue: boolean = true; // Quá hạn
  isInProgress: boolean = true; // Đang thực hiện
  isWaiting: boolean = false; // Chờ duyệt
  isCompleted: boolean = false; // Hoàn tất
  isSuspended: boolean = false; // Ngưng thực hiện
  isNotExecuted: boolean = false; // Không thực hiện
  isOpenDrawer: boolean = false; // Mở drawer
  isSelectingGrid: boolean = false; // Danh sách đầu việc bên trong master được chọn
  isSelectedPosition3: boolean = false; // Có đang chọn chức danh áp dụng là nhân sự áp dụng không
  isLeader: boolean = false; // Là trưởng đơn vị,...
  isShowAllCount: boolean = false; // Show toàn bộ số lượng đầu việc ở mọi trạng thái

  //#region variable drawer
  isEdit: boolean = false;
  isView: boolean = false;
  currentDrawer: number; //1 : chua thuc hien; 2: khong thuc hien; 3: dang thuc hien ; 4: cho duyet ; 5: ngung thuc hien; 6: hoan tat
  isOpenReason: boolean = false;
  labelReason: string = '';
  disabledApprPos: boolean = false;
  numOfDateOverDuo: number = 0;
  numOfDateImplement: number = 0;
  oldApprovedPositionID: number = 0;
  listReason: DTOListHR[] = [];
  decisionProfile: DTOHRDecisionProfile; // object decision profile

  isMaster: boolean = false; // Toàn quyền
  isCreator: boolean = false; // Quyền tạo
  isApprover: boolean = false; // Quyền duyệt
  isExpanded: boolean = true; // Column can expand
  isLoadingList: boolean = false; // loading of list 
  isLoading: boolean = false; // loading of some else not list 
  isLoadingDropDown: boolean = false; //loading of dropdown 
  isLoadingTree: boolean = false; // loading of tree list
  isOpenDialogAddTask: boolean = false; // Open dialog add task
  isOpenPopupConfirmDelete: boolean = false; // open popup confirm delete task
  isSelectingItemGrid: boolean = false;
  isShowHeader: boolean = false; // show header list
  selectedRowitemDialogOpened = false // Open dialog when select multiple item
  seletedTaskToDelete: DTOHRPolicyTask | DTOHRDecisionTask; // policy task will be deleted
  isDecisionTaskToDelete: boolean = false; // boolean decision task will be deleted
  seletedToolBox: DTOHRPolicyTask; // ToolBox selected
  selectedTaskDeleteException: DTOHRPolicyTask; // Task chứa ngoại lệ chuẩn bị bị xóa
  selectable: SelectableSettings = { enabled: true, mode: 'multiple', drag: false, checkboxOnly: true }; // Setting for selection of grid
  selectedRowitemPopupCallback: Function; // Function callback to selecte item in grid
  clearSelectedRowitemCallback: Function; // Function callback to clear selected item
  uploadEventHandlerCallback: Function // Function callback to import list policy task
  pageSize: number = 25; // pageSize in start
  count: number = 0; // Number of selected items
  initiallyExpanded: boolean = true; // Default treelist is expanded or not
  addPolicyTaskType: number = 1;
  afterAddedTask: boolean = false;
  errorOccurred: any = {};
  currentDate = new Date(); // Khởi tạo ngày hiện tại
  typeMasterDetail: number = 0; //Grid có detail hay không? 0 là không, 1 là có
  pageable: boolean = false; //Grid có pagination hay không? 
  isConfirmDialogShow: boolean = false; // Hiển thị dialog confirm
  isChangedDialogShow: boolean = false; // Hiển thị dialog changed
  isConfirmDialogSent: boolean = false; // Hiển thị dialog send/success
  isLoadingReason: boolean = false; // Loading của dropdown chọn lý do
  isLoadingPosition: boolean = false; // Loading của dropdown chọn chức danh
  reqSortStatus: number = null; // Yêu cầu sắp xếp theo trạng thái
  staffInfor: DTOStaff; // Thông tin nhân sự đang đăng nhập
  hasHiddenPaycheck: boolean = false; // Kiểm tra time user
  detailStaff: DTOEmployeeDetail; // Thông tin chi tiết của nhân sự

  onActionDropDownClickCallback: Function;


  /**
   * @param codeConfirmDialog 1 - Mở lại | 2 - Ngưng thực hiện | 3 - Thực hiện bởi | 4 - Duyệt bởi | 5 - Duyệt | 6 - Hoàn tất | 7 - Gửi duyệt | 8 - Không thực hiện
   */
  codeConfirmDialog: number = 1;
  unsubscribe = new Subject<void>;
  isObligatoryReason: boolean = false; // Có bắt buộc nhập mô tả không
  valueReason: { Code: number, Text: string } = null; // Lý do
  valueAssignee: { Code: number, Text: string } = {
    Code: 0,
    Text: ""
  }; // Assignee được chọn
  valueApprove: { Code: number, Text: string } = {
    Code: 0,
    Text: ""
  }; // Approve được chọn
  valueEmployee: DTOEmployee = null; // Nhân sự được chọn
  isShowStoppedTask: boolean = false;
  isShowPopUpSelect: boolean = false;
  isDisabledEmployee: boolean = true;


  // LIST
  listTask: GridDataResult // List all type task
  listPolicyTask: GridDataResult; // List Policy task
  listSeletedTaskToDelete: string[] = []; // list task will be deleted when select multiple item
  selectedKeys: number[] = []; // List code of selected policy task
  selectedRowitem: DTOHRPolicyTask[] | DTOHRDecisionTask[] = []; // List selected policy task or deicison task
  // selectedRowitemDecision: DTOHRDecisionTask[] = []; // List selected decision task
  btnList: MenuDataItem[] = [] // Button list when selected multiple tasks
  expandedDetailKeys: number[] = [];
  pageSizes: number[] = [25, 50, 75, 100]; // list pagesize
  listTaskHasException: DTOHRPolicyTask[] = []; // list task has exception
  listNameSelected: { mainTitle: string, extraPositions: string, extraTitle: string }; // List Name of items were selected
  listTaskName: string[] = [];
  listEmployee: DTOEmployee[] = [];
  originalListEmployee: DTOEmployee[] = [];
  ItemEmployeeSelect: DTOEmployee = null;
  listPositionApprove: { Code: number, Text: string }[] = [];
  listPositionAssignee: { Code: number, Text: string }[] = [];
  defaultOption: { Code: number, Text: string } = {
    Code: 0,
    Text: '-- Chọn --'
  };
  defaultOptionEmployee: DTOEmployee = new DTOEmployee();
  statusImport: number = 0;
  listSelectItemTask: DTOHRDecisionTask[] | DTOHRPolicyTask[];
  listItemCanChange: DTOHRDecisionTask[];


  // STATE AND FILTERS
  gridState: State = { skip: null, take: null, filter: { logic: 'and', filters: [] }, sort: null } // State
  gridStateTask: State = { filter: { logic: 'and', filters: [] } } // State
  gridStateStaffOrigin: State = { filter: { logic: "and", filters: [] } }
  gridStateStaff: State = { filter: { logic: "and", filters: [] } }
  filterSearchTask: CompositeFilterDescriptor = { logic: 'or', filters: [] } // Filter search


  minDatePicker = Ps_UtilObjectService.addDays(new Date(), 1)

  /**
   * Hàm xử lý khi click vào action trên list
   * @param codeAction code của action được chọn
   */
  onActionList(codeAction: string, item: DTOHRDecisionTask) {
    let listName: string[] = [];
    // this.listSelectItemTask = [];
    // this.listSelectItemTask = this.listSelectItemTask as DTOHRDecisionTask[];
    // this.listSelectItemTask.push(item);

    // Xem chi tiết
    if (codeAction == "k-i-preview") {
      // this.onClickEditTask({ item: item, status: 'View' })

    }

    // Ngưng/không thực hiện
    else if (codeAction == "k-i-minus-outline") {
      item = item as DTOHRDecisionTask
      listName.push(item.FullName);
      if (item.Status == 1) {
        this.codeConfirmDialog = 8;
      } else if (item.Status == 3) {
        this.codeConfirmDialog = 2;
      }
      this.APIGetListHR(5);
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

    // Gửi duyệt
    else if (codeAction == "k-i-redo") {
      listName.push(item.FullName + ' - ' + item.StaffID);
      this.codeConfirmDialog = 7;
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }

    // Hoàn tất/Duyệt
    else if (codeAction == "k-i-check-circle") {
      listName.push(item.FullName + ' - ' + item.StaffID);

      if (this.typeData == 3) {
        this.codeConfirmDialog = 6;
      }
      else if (this.typeData == 4) {
        this.codeConfirmDialog = 5;
      }

      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }

    // Mở lại
    else if (codeAction == "k-i-reset-sm") {
      listName.push(item.FullName);
      this.codeConfirmDialog = 1;
      this.APIGetListHR(5);
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

  }

  /**
   * Hàm format từ list string đầu việc thành "đầu việc chính + x đầu việc"
   * @param listTaskName Danh sách đầu việc
   * @returns Đối tượng chứa mainTitle (Đầu việc chính), extraPositions (Chuỗi "+ x đầu việc"), extraTitle (Chuỗi title khi hover vào "+ x đầu việc")
   */
  formatListName(listName: string[]): { mainTitle: string, extraPositions: string, extraTitle: string } {
    let mainTitle = listName[0] || '';
    let extraPositions = '';
    let extraTitle = '';

    // Nếu có nhiều hơn một đầu việc, tạo chuỗi "x đầu việc" và title chi tiết
    if (listName.length > 1) {
      const quantityPos = listName.length; // Sử dụng trực tiếp chiều dài của mảng

      if (this.isConfirmDialogSent) {
        extraPositions = `${quantityPos} nhân sự`;
      }
      else {
        extraPositions = `${quantityPos} nhân sự`;
      }
      extraTitle = listName.join('\n');
    }

    return { mainTitle, extraPositions, extraTitle };
  }

  //#endregion

  //- filter variable
  filterNeqNotWorking: FilterDescriptor = {
    field: 'Status',
    operator: 'neq',
    value: 1,
    ignoreCase: true,
  }; // Lọc Quá hạn
  filterInProgress: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 3,
    ignoreCase: true,
  }; // Lọc Đang thực hiện
  filterWaiting: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 4,
    ignoreCase: true,
  }; // Lọc Chờ duyệt
  filterCompleted: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 6,
    ignoreCase: true,
  }; // Lọc Hoàn tất
  filterSuspended: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 5,
    ignoreCase: true,
  }; // Lọc Ngưng thực hiện
  filterNotExecuted: FilterDescriptor = {
    field: 'Status',
    operator: 'eq',
    value: 2,
    ignoreCase: true,
  }; // Lọc Không thực hiện
  isFilterDisable: boolean = false;
  //#endregion

  //#region boolean variable
  openedPopupBoarding: boolean = false;
  //#endregion

  /**
  * @param 
  * 1: từ |
  * 2: trước |
  * 3: vào |
  */
  curDateFilterOperator: any = {
    Code: 1,
    TypeFilter: 'từ',
    ValueFilter: 'gte',
  };
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
    if (this.activeViewTasks && this[property].Code !== 3
      || this.activeViewStaff) {
      this.gridState.skip = 0;
      this.onLoadFilter();
    }
  }

  handleDateChange(value: any, property: string) {
    this[property] = value;
    this.onLoadFilter();
  }

  handleOperatorChange(value: any, property: string) {
    this[property] = value;
    if (Ps_UtilObjectService.hasValue(this.curDateFilterValue)) {
      this.gridState.skip = 0;
      this.onLoadFilter();
    }
  }

  // variable grid staff
  ListPickedBoardingProfile: DTOHRDecisionProfile[] = [];
  gridData: DTOHRDecisionProfile[] = [];
  gridViewData = new Subject<any>();
  gridTask: DTOHRDecisionTask[] = [];
  gridTaskResult: GridDataResult;
  listTaskLog: DTOHRDecisionTaskLog[] = [];
  selectedRecipient: string = ''; // Thụ hưởng bởi

  // varible dropdown

  listTypeStaff: DTOListHR[] = [];
  listPosition: DTOPosition[] = [];

  total: number = 0;
  page: number = 1;
  valueSearch: string = '';
  allowActionDropdown = ['detail'];
  //- filter reset
  // sortByFromDate: SortDescriptor = {
  //   field: 'FromDate',
  //   dir: 'desc',
  // };
  filterReturned = {
    field: 'Status',
    operator: 'eq',
    value: 4,
    ignoreCase: true,
  };

  ResetState: State = {
    skip: 0,
    filter: { filters: [], logic: 'or' },
    take: this.pageSize,
    sort: [],
  };

  filterStatusID: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  filterTypeTask: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  filterNumOfDate: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  filterSearchBox: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  //#region unsubcribe
  ngUnsubscribe$ = new Subject<void>();
  //#endregion

  //#region filter header 2
  tempSearch: {
    field: string;
    operator: string;
    value: number;
    ignoreCase: boolean;
  };

  /**
  @param 
  null: tất cả
  1: tuyển dụng - Tháng |
  2: điều chuyển - Tuần |
  3: nghỉ việc - ngày |
  4: kỷ luật
*/
  currentDecisionType: {
    Code: number;
    DecisionType: number;
    DecisionTypeName: string;
  } = { Code: null, DecisionType: null, DecisionTypeName: 'Tất cả' };
  ListDecisionType: {
    Code: number;
    DecisionType: number;
    DecisionTypeName: string;
  }[] = [];
  ListDateFilterOperator = [
    { Code: 1, TypeFilter: 'từ', ValueFilter: 'gte' },
    { Code: 2, TypeFilter: 'trước', ValueFilter: 'lt' },
  ];

  // Filter keyword của input search
  SearchPositionTerm = '';
  //Filter bằng composite của input search
  SearchTermComposite: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  //#endregion

  //#region đối tượng được chọn
  DecisionTaskForm: FormGroup; // form đầu việc của view đầu việc
  BoardingProfile: DTOHRDecisionTask = new DTOHRDecisionTask();
  //#endregion

  //new 
  defautEmployeeFilter: any = { FullName: '-- Chọn --', Code: -1 }
  isLoadingEmployeeAssignee: boolean = false; // Loading của dropdown Thực hiện bởi
  isLoadingEmployeeApprover: boolean = false; // Loading của dropdown Duyệt bởi
  isDropdownAssignee: boolean = true;
  isDropdownPositionAssignee: boolean = true;

  /**
 * @param typeData 1 - Pre-Onboard |
  2 - Pre-Offboard |
  3 - Onboarding |
  4 - Offboarding	|
  5 - Onboarded	|
  6 - Offboarded |
  7 - Ngưng Onboarded |
  8 -  Ngưng Offboarded
 */
  typeData: number = 1; // enum bước của On/Off board
  typeProfile: number = 1; // enum On/Off board

  DataHRDecisionTaskOrigin: DTOHRDecisionTask = new DTOHRDecisionTask()
  DataHRDecisionTask: DTOHRDecisionTask = new DTOHRDecisionTask()

  listHR: DTOListHR[] = []; // Danh sách loại nhân sự áp dụng

  defaultHR: DTOListHR

  listStatusDropdownFitler = []

  //#region variable drawer
  isCreate: boolean = false


  //#region DATE
  minEndDate: Date = new Date()
  dateRemain: number = 0

  deadlineDate: number = 0
  titleReason: string = ''

  resquestChangeStatus: boolean = false
  isDatePickerChange: boolean = false

  listStatusDropdown = [
    { Status: 1, StatusName: 'Chưa thực hiện', actionName: 'Mở lại' },
    { Status: 2, StatusName: 'Không thực hiện', actionName: 'Không thực hiện' },
    { Status: 3, StatusName: 'Đang thực hiện', actionName: 'Mở lại' },
    { Status: 4, StatusName: 'Chờ duyệt', actionName: 'Gửi duyệt' },
    { Status: 5, StatusName: 'Ngưng thực hiện', actionName: 'Ngưng thực hiện' },
    { Status: 6, StatusName: 'Hoàn tất', actionName: 'Hoàn tất' }
  ];

  filteredListHR: DTOListHR[]; // Danh sách loại nhân sự dùng để binding lên drawer
  officalHR: DTOListHR; // Nhân sự áp dụng: Loại chính thức




  constructor(
    private menuService: PS_HelperMenuService,
    private layoutService: LayoutService,
    public domSanititizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private decisionAPIService: HriDecisionApiService,
    private apiHr: StaffApiService,
    public staffApiService: StaffApiService,
    private hriTransitionService: HriTransitionApiService,
    private formBuilder: FormBuilder,
    private staffService: StaffApiService,
    private auth: Ps_AuthService,
  ) { }

  //#region Init
  ngOnInit(): void {
    let that = this;

    //action dropdown
    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this);

    this.getSelectionPopupCallback = this.getSelectionPopup.bind(this);
    this.onSelectedPopupBtnCallback = this.onSelectedPopupBtnClick.bind(this);

    this.onSortChangeCallback = this.sortChange.bind(this);

    this.onSelectCallback = this.selectChange.bind(this);
    this.onPageChangeCallback = this.onPageChange.bind(this);
    this.onActionDropDownClickCallback = this.onActionDropdownClick.bind(this);


    this.menuService.changePermission().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        that.justLoaded = false;
        that.actionPerm = distinct(res.ActionPermission, 'ActionType');

        that.isToanQuyen = that.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        that.isAllowedToCreate = that.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        that.isAllowedToVerify = that.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;
        that.isAllowedToVerifyOnboarded = that.actionPerm.findIndex((s) => s.ActionType == 7) > -1 || false;

        this.M_A = this.isToanQuyen || this.isAllowedToVerify;
        this.M_C = this.isToanQuyen || this.isAllowedToCreate;

        this.selectable.enabled = this.M_A;
      }
    });

    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        that.loadDefault();

        this.APIGetListEmployee(0);
        this.APIGetListHRTypeStaff();
        this.APIGetListHRPolicyPosition();
        this.APIGetListHR(5);
        if (this.StepProcess == 2) {
          this.APIGetListHRDecisionProfileBoarding()
        } else {
          this.APIGetListHRDecisionProfile();
        }
        this.APIGetListHRReasonStop(23);
        // this.onGetCacheStaff()
        this.APIGetEmployeeInfoPortal()
      }
    });
  }

  //#endregion

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadDefault() {
    if (this.StepProcess == 2 && this.activeViewTasks) {
      this.isOverdue = true; // Quá hạn
      this.isInProgress = true; // Đang thực hiện
      this.isCompleted = false; // Hoàn tất
      this.isSuspended = false; // Ngưng thực hiện
      this.isNotExecuted = false; // Không thực hiện
      this.isWaiting = false; // Chờ duyệt
      this.filterInProgress = this.createFilter('Status', 'eq', 3, true);
    }
    else if ([3, 4].includes(this.StepProcess)) {
      this.NumOfDateStart = null;
      this.NumOfDateEnd = null;
    }
    this.filterSearchBox.filters = [];
    this.currentDecisionType = {
      Code: null,
      DecisionType: null,
      DecisionTypeName: 'Tất cả',
    };
    this.curDateFilterOperator = {
      Code: 1,
      TypeFilter: 'từ',
      ValueFilter: 'gte',
    };
    this.curDateFilterValue = null;
    this.gridState.skip = 0;
    this.onLoadFilterDecisionType();
    this.onLoadFilter();
  }

  loadDataBreadcumb() {
    if (this.isFilterActive) {
      this.onLoadFilter();
    }
  }

  /**
   * Hàm nhận giá trị từ pagination khi chuyển trang
   * @param event
   */
  onPageChange(event: PageChangeEvent) {
    this.page = event.skip;
    this.pageSize = event.take;
    this.gridState.skip = event.skip;
    this.gridState.take = event.take;
    this.onLoadFilter();
  }

  /**
   * Hàm xử lí khi user tiến hành filter
   * @param filterDescriptor
   */
  onFilterChange(filterDescriptor: any) {
    this.page = 1;
    this.gridState.skip = 0;
    this.gridState.filter.filters = [];
    if (filterDescriptor.filters[0]?.value != '') {
      this.gridState.filter.filters = [filterDescriptor];
    }
    this.onLoadFilter();
  }

  /**
   * Quyết định tuyền dụng	1
      Quyết định điều chuyển	2
      Quyết định kỷ luật	3
      Quyết định nghỉ việc	4
   */
  onLoadFilterDecisionType() {
    this.ListDateFilterOperator = [];
    this.ListDecisionType = [];
    this.ListDecisionType.push({
      Code: null,
      DecisionType: null,
      DecisionTypeName: 'Tất cả',
    });
    this.ListDateFilterOperator.push(
      { Code: 1, TypeFilter: 'từ', ValueFilter: 'gte' },
      { Code: 2, TypeFilter: 'trước', ValueFilter: 'lt' }
    );

    if (this.StepProcess > 1) {
      this.ListDateFilterOperator.push({
        Code: 3,
        TypeFilter: 'vào',
        ValueFilter: 'eq',
      });
    }

    if (this.Module == 1) {
      this.ListDecisionType.push({
        Code: 1,
        DecisionType: 1,
        DecisionTypeName: 'Tuyển dụng',
      });
      this.ListDecisionType.push({
        Code: 2,
        DecisionType: 2,
        DecisionTypeName: 'Điều chuyển',
      });
    } else {
      this.ListDecisionType.push({
        Code: 2,
        DecisionType: 2,
        DecisionTypeName: 'Điều chuyển',
      });
      this.ListDecisionType.push({
        Code: 4,
        DecisionType: 4,
        DecisionTypeName: 'Nghỉ việc',
      });
      this.ListDecisionType.push({
        Code: 3,
        DecisionType: 3,
        DecisionTypeName: 'Kỉ luật',
      });
    }

    if (this.activeViewTasks) {
      this.ListDecisionType = [
        {
          Code: 1,
          DecisionType: 1,
          DecisionTypeName: 'Tháng',
        },
        {
          Code: 2,
          DecisionType: 2,
          DecisionTypeName: 'Tuần',
        },
        {
          Code: 3,
          DecisionType: 3,
          DecisionTypeName: 'Ngày',
        },
      ];
      this.currentDecisionType = {
        Code: 2,
        DecisionType: 2,
        DecisionTypeName: 'Tuần',
      };
    }
  }

  //#region filter group

  onLoadFilter() {
    // reset filler
    this.pageSizes = [...this.layoutService.pageSizes];
    this.gridState.take = this.pageSize;
    this.gridState.filter.filters = [];
    this.gridState.sort = [];
    this.filterTypeTask.filters = [];
    this.filterStatusID.filters = [];
    this.filterNumOfDate.filters = [];

    // Add filter cho checkbox header 2
    if (Ps_UtilObjectService.hasValue(this.StepProcess) && this.activeViewStaff) {
      this.gridState.filter.filters.push({
        field: 'Status',
        operator: 'eq',
        value: this.StepProcess,
        ignoreCase: true,
      });
    }

    // Chỉ thêm khi đang ở view nhân sự
    if (this.activeViewStaff) {
      this.gridState.filter.filters.push({
        field: 'BoardingType',
        operator: 'eq',
        value: this.Module,
        ignoreCase: true,
      });

      this.gridState.sort = [{ "field": "Code", "dir": "desc" }];
    }

    if (this.activeViewTasks) {

      // Đầu việc đang thực hiện
      if (this.isInProgress) {
        this.filterStatusID.filters.push(this.filterInProgress);
      }

      // Đầu việc chờ duyệt
      if (this.isWaiting) {
        this.filterStatusID.filters.push(this.filterWaiting);
      }

      // Đầu việc hoàn tất
      if (this.isCompleted) {
        this.filterStatusID.filters.push(this.filterCompleted);
      }

      // Đầu việc ngưng thực hiện
      if (this.isSuspended) {
        this.filterStatusID.filters.push(this.filterSuspended);
      }

      // Đầu việc không  thực hiện
      if (this.isNotExecuted) {
        this.filterStatusID.filters.push(this.filterNotExecuted);
      }

      // filter quá hạn
      if (this.isOverdue) {
        this.gridState.filter.filters.push({ field: 'IsOverdue', operator: 'eq', value: true });
      } else {
        this.gridState.filter.filters.push({ field: 'IsOverdue', operator: 'eq', value: false });
      }

      // Push thêm filter không lấy những công viêc chưa thực hiện 
      this.gridState.filter.filters.push(this.filterNeqNotWorking);
    }

    // filter search
    if (Ps_UtilObjectService.hasListValue(this.filterStatusID.filters)) {
      this.gridState.filter.filters.push(this.filterStatusID);
    }

    // filter search
    if (Ps_UtilObjectService.hasListValue(this.filterSearchBox.filters)) {
      this.gridState.filter.filters.push(this.filterSearchBox);
    }

    // Filter phân loại
    if (Ps_UtilObjectService.hasValue(this.currentDecisionType.DecisionType) && this.activeViewStaff) {
      if (this.currentDecisionType.DecisionType == 4) {
        this.gridState.filter.filters.push({ field: 'Petition', operator: 'isnotnull' });
      }
      else {
        this.gridState.filter.filters.push({ field: 'DecisionType', operator: 'eq', value: this.currentDecisionType.DecisionType, ignoreCase: true });
      }
    }

    // Filter 'đầu việc theo'
    if (Ps_UtilObjectService.hasValue(this.currentDecisionType.DecisionType) && this.activeViewTasks) {
      // Filter đầu việc theo tháng
      if (this.currentDecisionType.DecisionType == 1) {
        const monthRange = this.getStartAndEndOfMonth();
        // this.filterTypeTask.filters.push({ field: 'EndDate', operator: 'gte', value: monthRange.startOfMonth }, { field: 'EndDate', operator: 'lte', value: monthRange.endOfMonth });
        this.filterTypeTask.filters.push({ field: 'EndDate', operator: 'lte', value: monthRange.endOfMonth });
      }

      // Filter đầu việc theo tuần
      if (this.currentDecisionType.DecisionType == 2) {
        const weekRange = this.getStartAndEndOfWeek();
        // this.filterTypeTask.filters.push({ field: 'EndDate', operator: 'gte', value: weekRange.startOfWeek }, { field: 'EndDate', operator: 'lte', value: weekRange.endOfWeek });
        this.filterTypeTask.filters.push({ field: 'EndDate', operator: 'lte', value: weekRange.endOfWeek });
      }
    }



    // Filter ngày bắt đầu/ngừng/boaded - filter đầu việc theo ngày
    if (Ps_UtilObjectService.hasValue(this.curDateFilterValue) && (this.activeViewStaff || this.activeViewTasks && this.curDateFilterOperator.Code !== 3)) {
      let filter = {
        field: this.activeViewStaff ? 'StartDate' : 'EndDate',
        operator: this.curDateFilterOperator.ValueFilter,
        value: this.curDateFilterValue.toDateString(),
        ignoreCase: true,
      };
      this.gridState.filter.filters.push(filter);
    } else if (this.activeViewTasks && this.curDateFilterOperator.Code == 3) {
      const startOfDay = this.formatDateToFilter(this.curDateFilterValue, 'Start');
      const endOfDay = this.formatDateToFilter(this.curDateFilterValue, 'End');
      let newFilter: CompositeFilterDescriptor = {
        filters: [
          { field: 'EndDate', operator: 'gte', value: startOfDay },
          { field: 'EndDate', operator: 'lte', value: endOfDay },
        ],
        logic: 'and'
      }
      this.gridState.filter.filters.push(newFilter);
    }

    if (this.filterTypeTask.filters.length > 0) {
      this.gridState.filter.filters.push(this.filterTypeTask);
    }

    // Số ngày boarded/boarding
    if (Ps_UtilObjectService.hasValueString(this.NumOfDateStart) && [3, 4].includes(this.StepProcess)) {
      this.filterNumOfDate.filters.push({
        field: 'NumOfDate',
        operator: 'gte', // lớn hơn hoặc bằng
        value: this.NumOfDateStart,
      });
      this.gridState.skip = 0;
    }

    if (Ps_UtilObjectService.hasValueString(this.NumOfDateEnd) && [3, 4].includes(this.StepProcess)) {
      this.filterNumOfDate.filters.push({
        field: 'NumOfDate',
        operator: 'lte', // nhỏ hơn hoặc bằng
        value: this.NumOfDateEnd,
      });
      this.gridState.skip = 0;
    }

    if (Ps_UtilObjectService.hasListValue(this.filterNumOfDate.filters)) {
      this.gridState.filter.filters.push(this.filterNumOfDate);
    }

    // Nếu là bước boarding và gọi api theo view
    if (this.StepProcess == 2 && this.activeViewTasks) {
      this.gridState.filter.filters.push({ field: 'BoardingType', operator: 'eq', value: this.Module });
      this.APIGetListHRTaskGroup();
    }
    else {
      if (this.StepProcess == 2) {
        this.APIGetListHRDecisionProfileBoarding()
      } else {
        this.APIGetListHRDecisionProfile();
      }
    }
  }


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


  // Tính ngày bắt đầu và kết thúc của tuần hiện tại
  getStartAndEndOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Lấy ngày trong tuần (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
    const startOfWeek = new Date(today); // Bắt đầu từ ngày hôm nay
    const endOfWeek = new Date(today);

    // Nếu là Chủ Nhật, tính về thứ Hai của tuần trước
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    // Tính ngày bắt đầu (Thứ Hai)
    startOfWeek.setDate(today.getDate() - daysToMonday);
    // Tính ngày kết thúc (Chủ Nhật)
    endOfWeek.setDate(today.getDate() + daysToSunday);

    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  }

  // Tính ngày bắt đầu và kết thúc của tháng hiện tại
  getStartAndEndOfMonth() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), 0, 1); // Ngày đầu tiên của năm
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    endOfMonth.setHours(23, 59, 59, 999);

    return { startOfMonth, endOfMonth };
  }

  /**
   *
   * @param field trường dữ liệu
   * @param operator toán tử filter
   * @param value Giá trị cho filter đó
   * @param ignoreCase logic tìm kiếm
   * @returns FilterDescriptor
   */
  createFilter(
    field: string,
    operator: string,
    value: any,
    ignoreCase: boolean = true
  ) {
    return {
      field: field,
      operator: operator,
      value: value,
      ignoreCase: ignoreCase,
    };
  }

  //- Handle search
  handleFilterChangeSearch(event: any) {
    if (event.filters && event.filters.length > 0) {
      if (event.filters[0].value === '') {
        this.gridState.skip = 0;
        this.filterSearchBox.filters = []
        this.onLoadFilter();
      } else if (Ps_UtilObjectService.hasValueString(event)) {
        this.filterSearchBox.filters = event.filters;
        this.tempSearch = event.filters;
        this.gridState.skip = 0;
        this.onLoadFilter();
      }
    }
  }

  // Handle lắng nghe sự thay đổi của checkbox
  selectedChangeCheckbox(event: any, typebtn: string) {
    this[typebtn] = event;
    let con1 = this.isOverdue && this.isInProgress && this.isCompleted && this.isSuspended && this.isNotExecuted;
    let con2 = !this.isOverdue && !this.isInProgress && !this.isCompleted && !this.isSuspended && !this.isNotExecuted;

    if (this.Module == 2) {
      con1 = con1 && this.isWaiting;
      con2 = con2 && !this.isWaiting;
    }

    this.isShowAllCount = con1 || con2;
  }

  filterChange(filterName: string, event: any) {
    this[filterName] = event;
    this.gridState.skip = 0;
    this.onLoadFilter();
  }

  //#endregion filter group

  //#region funcionCallback grid
  handleGetClassGridStaff = () => {
    let list = [
      this.isInProgress ? 1 : null,
      this.isWaiting ? 2 : null,
      this.isCompleted ? 3 : null,
      this.isSuspended ? 4 : null,
      this.isNotExecuted ? 5 : null,
      this.isOverdue ? 6 : null
    ].filter(item => item !== null); // Loại bỏ các giá trị null

    if (list.length == 0) {
      if (this.Module == 2) {
        list = [1, 2, 3, 4, 5, 6];
      }
      else {
        list = [1, 3, 4, 5, 6];
      }
    }

    return `grid-task-${list.length}`;
  }


  selectChange(itemGrid: DTOHRDecisionProfile[]) {
    this.isSelectingGrid = Ps_UtilObjectService.hasListValue(itemGrid);
    this.isFilterActive = !Ps_UtilObjectService.hasListValue(itemGrid);
  }

  onAddDays(date: string | Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  //dropdown
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOPayroll) {
    moreActionDropdown = [];

    // Kiểm tra quyền tạo hoặc toàn quyền
    const canCreateOrAdmin = this.isAllowedToCreate || this.isToanQuyen;

    // Kiểm tra quyền duyệt
    const canVerify = this.isAllowedToVerify || this.isToanQuyen;

    // Đối với On/Offboard hoặc ngưng On/Offboard chỉ có xem chi tiết
    if ([3, 4].includes(this.StepProcess)) {
      return [{ Name: 'Xem chi tiết', Code: 'eye', Link: 'detail', Actived: true }]
    }

    // Push "Chỉnh sửa" khi có quyền tạo hoặc toàn quyền và statusID = 0 hoặc statusID = 4
    if (canVerify) {
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

    // Push "Boarding" khi có quyền duyệt hoặc toàn quyền và nếu là bước chuẩn bị
    if (canVerify && this.StepProcess == 1) {
      moreActionDropdown.push({
        Type: 'Status',
        Name:
          this.Module == 1 && this.StepProcess == 1
            ? 'Onboarding'
            : 'Offboarding',
        Code: 'play',
        Link: '2',
        Actived: true,
        LstChild: [],
      });
    }

    // // Push "Phê duyệt" khi có quyền duyệt hoặc toàn quyền và statusID = 1 hoặc statusID = 3
    // if (canVerify && this.Payroll.Code > 0 && (statusID === 1 || statusID === 3)) {
    //   if(Ps_UtilObjectService.hasValueString(this.Payroll.SalaryName) &&Ps_UtilObjectService.isValidDate2(this.Payroll.EffDate) && this.Payroll.NoOfEmployee > 0){
    //     moreActionDropdown.push({
    //       Type: 'StatusID',
    //       Name: 'Phê duyệt',
    //       Code: 'check-outline',
    //       Link: '2',
    //       Actived: true,
    //       LstChild: [],
    //     });
    //   }

    //   // Push "Trả về" khi có quyền duyệt hoặc toàn quyền và statusID = 1 hoặc statusID = 3
    //   moreActionDropdown.push({
    //     Type: 'StatusID',
    //     Name: 'Trả về',
    //     Code: 'undo',
    //     Link: '4',
    //     Actived: true,
    //     LstChild: [],
    //   });
    // }

    // // Push "Ngưng hiển thị" khi có quyền duyệt hoặc toàn quyền và statusID = 2
    // if (canVerify && this.Payroll.Code > 0 && statusID === 2) {
    //   moreActionDropdown.push({
    //     Name: 'Ngưng áp dụng',
    //     Type: 'StatusID',
    //     Code: 'minus-outline',
    //     Link: '3',
    //     Actived: true,
    //     LstChild: [],
    //   });
    // }

    // // Push "Xóa" khi có quyền tạo hoặc toàn quyền và statusID === 0
    // if (canCreateOrAdmin && this.Payroll.Code > 0 && this.Payroll.NoOfEmployee == 0 && statusID === 0) {
    //   moreActionDropdown.push({
    //     Name: `Xóa ${ctx}`,
    //     Type: 'delete',
    //     Code: 'trash',
    //     Link: 'delete',
    //     Actived: true,
    //     LstChild: [],
    //   });
    // }

    // Sắp xếp theo thứ tự: xem -> chỉnh sửa -> gửi -> duyệt -> ngưng -> trả về
    return moreActionDropdown;
  }

  // Action dropdownlist
  onActionDropdownClick(menu: MenuDataItem, item: DTOHRDecisionProfile) {
    this.ListPickedBoardingProfile = [];
    if (item.Code.toString().length > 0) {
      if (menu.Link == '2') {
        this.ListPickedBoardingProfile.push(item);
        this.openedPopupBoarding = true;
      }

      if (menu.Link == 'edit' || menu.Code == 'pencil' || menu.Code == 'eye' || menu.Link == 'detail') {
        // Nếu là view xem theo đầu việc thì xem chi tiết hoặc chỉnh sửa sẽ mởi drawer
        if (this.activeViewTasks) {
          this.isOpenDrawer = true;
        }
        // Nếu là view xem theo nhân sự thì khi bấm xem chi tiết hoặc chỉnh sửa sẽ navigate vào trang chi tiết
        else {
          this.DecisionProfile = item;

          const urls = {
            1: {
              1: 'hri028-pre-onboarding',
              2: 'hri029-onboarding',
              3: 'hri031-stop-onboarding',
              4: 'hri030-onboarded',
            },
            2: {
              1: 'hri032-pre-offboarding',
              2: 'hri033-offboarding',
              3: 'hri035-stop-offboarding',
              4: 'hri034-offboarded',
            },
          };

          // Lấy URL từ đối tượng urls dựa trên DecisionType và StepProcess
          const URL = urls[this.Module]?.[this.StepProcess] || '';

          // Mở chi tiết nếu URL tồn tại
          if (URL) {
            localStorage.setItem('HRDecisionProfile', JSON.stringify(item));
            this.openDetail(URL);
          }
        }
      }
    }
  }

  getSelectionPopup(selectedList: DTOHRDecisionProfile[]) {
    var moreActionDropdown = new Array<MenuDataItem>();
    this.ListPickedBoardingProfile = selectedList;

    // Push action onboarding/offboarding
    if (this.isToanQuyen || this.isAllowedToVerify) {
      moreActionDropdown.push({
        Type: 'Status',
        Name:
          this.Module == 1 && this.StepProcess == 1
            ? 'Onboarding'
            : 'Offboarding',
        Code: 'play',
        Link: '2',
        Actived: true,
        LstChild: [],
      });
    }

    return moreActionDropdown;
  }

  onSelectedPopupBtnClick(btnType: string, list: any[], value: any) {
    if (btnType == 'Status') {
      // Trạng thái phê duyệt
      if (value == 2 || value == '2') {
        this.ListPickedBoardingProfile = list;
        this.openedPopupBoarding = true;
        this.isSelectingGrid = true;
      }
    }
  }

  pageChange(event: PageChangeEvent) {
    this.gridState.skip = event.skip;
    this.gridState.take = this.pageSize = event.take;
  }
  //#endregion funcionCallback grid

  // // Thêm mới
  // onAdd() {
  //   this.Payroll = new DTOPayroll(null);
  //   sessionStorage.setItem('Payroll', JSON.stringify(this.Payroll));
  //   this.openDetail('detail');
  // }

  /**
   * Mở trang chi tiết
   * @param link tên của UI mới chuyển trang
   */
  openDetail(link: string) {
    let changeModuleData_sst = this.menuService
      .changeModuleData()
      .subscribe((item: ModuleDataItem) => {
        sessionStorage.setItem(
          'DecisionProfile',
          JSON.stringify(this.DecisionProfile)
        );
        var parent = item.ListMenu.find((f) =>
          f.Code.includes(this.Module == 1 ? 'hriOnboard' : 'hriOffboard')
        );
        if (
          Ps_UtilObjectService.hasValue(parent) &&
          Ps_UtilObjectService.hasListValue(parent.LstChild)
        ) {
          var detail = parent.LstChild.find(
            (f) =>
              f.Code.includes(`${link}-list`) || f.Link.includes(`${link}-list`)
          );

          var detail1 = detail.LstChild.find(
            (f) =>
              f.Code.includes(`${link}-detail`) ||
              f.Link.includes(`${link}-detail`)
          );

          this.menuService.activeMenu(detail1);
        }
      });
    this.arrUnsubscribe.push(changeModuleData_sst);
  }

  /**
 * Hàm trả về string quyết định
 * @param code enum type
 * @returns 
 */
  getTypeDecision(code: number): string {
    switch (code) {
      case 1:
        return "Tuyển dụng"
      case 2:
        return "Điều chuyển"
      case 3:
        return "Kỷ luật"
      case 4:
        return "Nghỉ việc"
      default:
        return "(Trống)"
    }
  }

  /**
   * Hàm đổi màu color tùy vào số ngày còn lại
   */
  getColorLeftDate(leftDate: number): string {
    if (leftDate <= 4 && leftDate > 1) {
      return "#F1802E";
    } else if (leftDate <= 1) {
      return "#EB273A";
    }
    return "#000000";
  }

  /**
   * Hàm dùng để set style theo đúng nội dung text
   * @param name name of assignee
   */
  onCheckAssigneeBy(name: string): string {
    if (name === 'Hệ thống') {
      return 'font-style: italic;';
    }
    else if (name === "Nhân sự áp dụng") {
      return 'font-weight: bold;'
    }
  }

  /**
 * Hàm kiểm tra dữ liệu string cho bên dom
 * @param value dữ liệu string cần được kiểm tra
 * @returns 
 */
  checkValueString(value: string): boolean {
    return Ps_UtilObjectService.hasValueString(value);
  }

  /**
* Hàm đổi màu chữ và icon nếu quá hạn
*/
  getColorExpired(endDate: string): string {
    if (Ps_UtilObjectService.hasValueString(endDate)) {
      return (this.currentDate > new Date(endDate)) && (this.typeData !== 1 && this.typeData !== 2) ? 'rgba(235, 39, 58, 1)' : 'black';
    }
  }

  getEndDateByTimeDoing(timeDoing: number): Date | null {
    const startDate = new Date(this.decisionProfile?.StartDate);

    const endDate = Ps_UtilObjectService.addDays(startDate, timeDoing);
    endDate.setHours(23, 59, 59);
    return endDate; // Trả về đối tượng Date
  }


  /**
 * Hàm check status task log
 * @param status code status
 * @param code enum status muốn check
 * @returns 
 */
  checkStatusTaskLog(item: DTOHRDecisionTask, code: number): boolean {
    let status: number = 0;
    if (item.ListHRDecisionTaskLog.length > 0) {
      status = item.ListHRDecisionTaskLog[0].Status;

      if (status == code) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
 * Hàm trả về ngày khởi tạo của trạng thái cần tìm
 * @param listStatusTaskLog danh sách trạng thái đầu việc được truyền vào
 * @param codeStatus code của trạng thái cần tìm
 * @returns 
 */
  getCreateTimeOfStatusLog(listStatusTaskLog: DTOHRDecisionTaskLog[], codeStatus: number): string {
    let createTime = "";
    const itemTaskLog = listStatusTaskLog.find(item => item.Status === codeStatus)

    if (itemTaskLog) {
      createTime = itemTaskLog?.CreatedTime;
    }

    return createTime;
  }

  /**
   * Hàm lấy danh sách action tùy vào nhân sự thực hiện và duyệt
   */
  getActionList(task: DTOHRDecisionTask): string[] {
    let listAction: string[] = [];
    const codeStatus = task.Status;
    // Trạng thái của đầu việc là: Đang thực hiện
    if (codeStatus == 3) {
      // Đối với Onboarding
      if (this.typeData == 3 && this.isPersonalDoTask(task)) {
        listAction.push("k-i-check-circle");
      }
      // Đối với Offboarding
      else if (this.typeData == 4 && this.isPersonalDoTask(task)) {
        listAction.push("k-i-redo");
      }
      // Chỉ người có quyền duyệt mới được ngưng hoặc không thực hiện đầu việc
      if (this.M_A) {
        listAction.push("k-i-minus-outline");
      }
    }
    // Trạng thái của đầu việc là: Chưa thực hiện
    else if (codeStatus == 1) {
      if (this.M_A) {
        listAction.push("k-i-minus-outline");
      }
    }
    // Trạng thái của đầu việc là: Chờ duyệt
    else if (codeStatus == 4) {
      if (this.isPersonalDoTask(task, 'Approved')) {
        listAction.push("k-i-check-circle");
      }
    }
    // Trạng thái của đầu việc là: Hoàn tất
    else if (codeStatus == 6) {
      listAction.push("k-i-preview");
    }
    // Trạng thái của đầu việc là: Ngưng/Không thực hiện
    else if ([2, 5].includes(codeStatus)) {
      // Nếu là task của pre-on/off hoặc on/off boarding
      if ([1, 2, 3, 4].includes(this.typeData) && this.M_A) {
        listAction.push("k-i-reset-sm");
      }
      else {
        listAction.push("k-i-preview");
      }
    }

    if (!Ps_UtilObjectService.hasListValue(listAction)) {
      listAction.push("k-i-preview");
    }

    return listAction;
  }

  /**
     * Hàm kiểm tra xem người đó có quyền hoàn tất hoặc gửi duyệt đầu việc hay không 
     * @param task đầu việc
     * @param type Thực hiện bởi hay Duyệt bởi
     * @returns true nếu có thể
     */
  isPersonalDoTask(task: DTOHRDecisionTask, type: 'Assignee' | 'Approved' = 'Assignee') {
    // Thực hiện bởi
    if (type == 'Assignee') {
      if (task.TypeAssignee == 3) {
        return this.decisionProfile?.Staff == this.detailStaff?.Code;
      }
      return task[type] == this.detailStaff?.Code;
    }

    // Duyệt bởi
    if (type == 'Approved') {
      if (!task.IsLeaderMonitor) {
        return task[type] == this.detailStaff?.Code;
      }
      else {
        const con1 = this.detailStaff?.IsSupervivor && this.decisionProfile?.Department == this.detailStaff?.Department;
        const con2 = this.detailStaff?.IsLeader && this.decisionProfile?.Location == this.detailStaff?.Location;
        return con1 || con2;
      }
    }
  }

  /**
   * Hàm dùng để thêm class vào cho grid
   * @returns 
   */
  handleSetClassGrid = () => {
    return {
      'selecting-item': this.isSelectingItemGrid,
      'grid-typeData-3': this.StepProcess == 3,
      'grid-typeData-4': this.StepProcess == 4,
    };
  };

  /**
   * Hàm kiểm tra phân quyền để show UI của task list
   */
  checkViewOfPermission(): { [key: string]: boolean } {
    if (this.StepProcess == 2 || this.StepProcess == 3) {
      const isView = (this.selectable.enabled == false);

      return {
        'viewDT': isView
      };
    }
  }

  ListMoreActions: MenuDataItem[] = []
  togglePopup(index: any, item: any, anchor: any) {
    this.popupAnchor = anchor;
    this.ListMoreActions = this.getActionDropdownTask(item)
  }

  /**
 * This function provides an available action list for a DTOHRPolicyTask that can handle it
 * @returns list of actions
 */
  getActionDropdownTask(dataItem: DTOHRDecisionTask): MenuDataItem[] {
    const actionEdit: MenuDataItem = { Name: "Chỉnh sửa", Code: "pencil", Actived: true };
    const actionView: MenuDataItem = { Name: "Xem chi tiết", Code: "eye", Actived: true };
    const actionDelete: MenuDataItem = { Name: "Xóa đầu việc", Code: "trash", Actived: true };
    const actionSend: MenuDataItem = { Name: "Gửi duyệt", Code: "redo", Actived: true };
    const actionStop: MenuDataItem = { Name: "Ngưng thực hiện", Code: "minus-outline", Actived: true, Type: 'stopDone', Link: "stop" };
    const actionNotDo: MenuDataItem = { Name: "Không thực hiện", Code: "minus-outline", Actived: true, Type: 'notDone', Link: "stop" };
    const actionComplete: MenuDataItem = { Name: "Hoàn tất", Code: "check-circle", Actived: true };
    const actionApprove: MenuDataItem = { Name: "Duyệt", Code: "check-circle", Actived: true };
    const actionOpen: MenuDataItem = { Name: "Mở lại", Code: "reset", Actived: true };

    // Quy trình On/Offboard
    let valueCheck = 0;
    valueCheck = dataItem.ListHRDecisionTaskLog[0]?.Status;

    switch (valueCheck) {
      // Đầu việc đang ở trạng thái: Chưa thực hiện
      case 1: {
        if (!Ps_UtilObjectService.hasValue(dataItem.Task)) {
          return this.M_A ? [actionEdit, actionNotDo, actionDelete] : [actionView];
        }
        return this.M_A ? [actionEdit, actionNotDo] : [actionView];
      }
      // Đầu việc đang ở trạng thái: Đang thực hiện
      case 3: {
        const isType1Or3 = this.typeProfile === 1 || [3].includes(this.typeData);
        const isType2Or4 = this.typeProfile === 2 || [4].includes(this.typeData);

        if (isType1Or3 || isType2Or4) {
          let listAction = [];

          // Nếu có quyền duyệt thì được chỉnh sửa và ngưng đầu việc
          if (this.M_A) {
            listAction.push(actionEdit, actionStop);
          }

          // Nếu tài khoản hiện tại là người thực hiện đầu việc này
          if (this.isPersonalDoTask(dataItem)) {
            listAction.push(isType1Or3 ? actionComplete : actionSend);
          }

          // Nếu không thoả 2 điều kiện trên
          if (!this.M_A && !this.isPersonalDoTask(dataItem)) {
            listAction = [actionView];
          }

          return listAction;
        }
      }
      // Đầu việc đang ở trạng thái: Chờ duyệt
      case 4: {
        // Nếu tài khoản hiện tại là người thực hiện đầu việc này
        if (this.isPersonalDoTask(dataItem, 'Approved')) {
          return [actionView, actionApprove];
        }
        return [actionView];
      }
      // Đầu việc đang ở trạng thái: Không thực hiện
      // Đầu việc đang ở trạng thái: Ngưng thực hiện
      case 2:
      case 5: {
        if ([1, 2].includes(this.typeData)) {
          return this.M_A ? [actionView, actionOpen] : [actionView];
        }
        else if ([3, 4].includes(this.typeData)) {
          return this.M_A ? [actionEdit, actionOpen] : [actionView];
        }
        else {
          return [actionView];
        }
      }
      // Đầu việc đang ở trạng thái: Hoàn tất
      case 6:
        return [actionView];
      // Mặc định
      default:
        return !this.isApprover && !this.isMaster && !this.isCreator ? [actionView] : [];
    }
  }

  //#endregion

  //#region switch view
  activeViewStaff: boolean = true;
  activeViewTasks: boolean = false;

  /**
   * Chuyển view xem boarding
   * @param view bao gồm 2 view: activeViewStaff | activeViewTasks
   */
  changeView(viewActive: string, viewUnavailable: string) {
    this[viewActive] = true;
    this[viewUnavailable] = false;

    // Set lại trường search theo view cho component search-filter-group
    if (this.activeViewStaff) {
      this.filtersGroup = ['StaffID', 'FullName', 'DepartmentName', 'LocationName', 'PositionName',]
    } else {
      this.filtersGroup = ['TaskName', 'Description', 'FullName', 'StaffID', 'ApprovedID', 'ApprovedName', 'AssigneeID', 'AssigneeName', 'LSTaskID'];
    }

    this.filterSearchBox.filters = [] // reset filter search
    this.curDateFilterValue = null;


    this.currentDecisionType = {
      Code: null,
      DecisionType: null,
      DecisionTypeName: 'Tất cả',
    };
    this.curDateFilterOperator = {
      Code: 1,
      TypeFilter: 'từ',
      ValueFilter: 'gte',
    };

    if (this.activeViewTasks) {
      this.getTypeBoarding();
    }
    this.searchFilterGroup.value = '';
    this.onLoadFilterDecisionType();
    this.onLoadFilter();
  }
  //#endregion

  //#region TASK LOG
  isShowDialogTaskLog: boolean = false;

  icons = { linkVertical: linkVerticalIcon };

  /**
    @param 
    0 là thêm mới
    1 là chỉnh sửa
  */
  statusDrawer: number = 0;

  ListDecisionTask: DTOHRDecisionTask[] = [];
  DataDecisionTask: DTOHRDecisionTask = new DTOHRDecisionTask();

  DataDrawer: DTOHRDecisionTask;

  handleOpenTaskLog() {
    // FILTER TASKLOG
    const filterListTaskLogState: State = {
      filter: { filters: [], logic: 'and' },
    };

    const filterTaskLog: FilterDescriptor = {
      field: 'DecisionTask',
      operator: 'eq',
      value: this.MultiForm.value.Code,
      ignoreCase: true,
    };

    // filterListTaskLog.filters.push(filterTaskLog);
    filterListTaskLogState.filter.filters.push(filterTaskLog);
    this.APIGetListHRDecisionTaskLog(filterListTaskLogState);
    this.isShowDialogTaskLog = true;
  }

  handleCloseTaskLog() {
    this.isShowDialogTaskLog = false;
  }

  handleCloseDrawer(): void {
    this.isOpenDrawer = false;
    this.isView = false;
    this.isEdit = false;
    this.MultiForm.reset();
    this.DecisionProfile = this.MultiForm.value;
    this.dateRemain = 0
    this.isDatePickerChange = false
    this.DecisionProfile = new DTOHRDecisionProfile();
  }

  handleOpenDrawer(): void {
    //Lấy ngày làm
    this.handleCalDate(this.MultiForm.value);
    this.handleCalDeadline(this.MultiForm.get("EndDate").value)

    // Loại nhân sự áp dụng
    if (this.isCreate) {
      this.filteredListHR = [];
    }
    else {
      const gotListHR: number[] = JSON.parse(this.MultiForm.get('ListOfTypeStaff').value);
      if (Ps_UtilObjectService.hasListValue(gotListHR)) {
        this.filteredListHR = this.listHR.filter((item: DTOListHR) => gotListHR.includes(item.OrderBy));
      }
    }
    this.isOpenDrawer = true
    this.openDatePicker()
    this.onGetStatusDropdown()
  }

  mockDataResource = [
    {
      resourceName: 'Máy tính xách tay',
      resourceType: 'Thiết bị điện tử',
      price: 15000000,
    },
    {
      resourceName: 'Máy chiếu',
      resourceType: 'Thiết bị văn phòng',
      price: 5000000,
    },
    {
      resourceName: 'Bàn làm việc',
      resourceType: 'Nội thất',
      price: 2000000,
    },
    {
      resourceName: 'Tủ hồ sơ',
      resourceType: 'Nội thất',
      price: 2500000,
    },
    {
      resourceName: 'Điện thoại di động',
      resourceType: 'Thiết bị điện tử',
      price: 10000000,
    },
    {
      resourceName: 'Ghế văn phòng',
      resourceType: 'Nội thất',
      price: 1200000,
    },
    {
      resourceName: 'Máy in',
      resourceType: 'Thiết bị văn phòng',
      price: 3000000,
    },
  ];

  /**
   * Kiểm tra xe trên drawer show thực hiện bởi hệ thống không
   * @returns
   */
  handleCheckTaskOfSystem(): boolean {
    return this.MultiForm.get('TypeAssignee').value == 1;
  }

  //#endregion

  //#region tài sản thu hồi
  handleAssetRecovery(
    action: string,
    inputRef?: PKendoTextboxComponent,
    data?: { PositionName: string; Code: number; ID: string }
  ) {
    if (action == 'add') {
      this.currentListPosition.unshift({ PositionName: '', Code: 0, ID: null });
    }

    if (action == 'trash') {
      this.currentListPosition.filter((v) => {
        v !== data;
      });
      this.layoutService.onError(`Xóa thành công`);
    }
  }
  //#endregion

  //#region Image

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

  /**
   * Hàm get loại data cho task list
   */
  getTypeDataTaskList(): number {
    if (this.StepProcess == 1) {
      if (this.Module == 1) {
        return 1;
      } else {
        return 2;
      }
    } else if (this.StepProcess == 2) {
      if (this.Module == 1) {
        return 3;
      } else {
        return 4;
      }
    } else if (this.StepProcess == 3) {
      if (this.Module == 1) {
        return 7;
      } else {
        return 8;
      }
    } else if (this.StepProcess == 4) {
      if (this.Module == 1) {
        return 5;
      } else {
        return 6;
      }
    }
  }
  //#endregion

  //#region Pôpup
  //- Kích hoạt Boarding
  handlePopupBoading() {

    if (this.StepProcess == 2) {
      this.APIUpdateHRDecisionProfileBoardingStatus(this.ListPickedBoardingProfile, 2);
    } else {
      this.APIUpdateHRDecisionProfileStatus(this.ListPickedBoardingProfile, 2);
    }
    this.openedPopupBoarding = false;
    this.isSelectingGrid = false;
  }
  //#endregion

  //#region column số ngày boarding
  isExpandFilterNumOfDate: boolean = false;
  NumOfDateStart: number = null;
  NumOfDateEnd: number = null;
  popupAnchor: ElementRef<any>; // lưu anchor
  @ViewChild('anchorNumOfDate', { static: false }) anchorNumOfDate: ElementRef;
  //#endregion

  //#region hàm xử lý popup

  //- popup onboarding/offboarding
  // Hàm này sẽ trả về danh sách tên và mã của các item bị ẩn dưới dạng chuỗi
  onGetRemainingItemsTooltip(): string {
    return this.ListPickedBoardingProfile.slice(2)
      .map((item) => `${item.FullName} - ${item.StaffID}`)
      .join('\n');
  }

  //giấu action list khi user click chỗ khác
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.anchorNumOfDate && !this.anchorNumOfDate.nativeElement.contains(event.target) && this.isExpandFilterNumOfDate) {
      if (!event.target.closest('.block-input-filter-date')) {
        this.isExpandFilterNumOfDate = false;
      }
    }
  }

  //#endregion

  /**
   * Hàm tính số ngày còn lại của task
   */
  getLeftDateTask(endDate: string): number {
    const end = new Date(endDate);
    const currentDate = new Date(new Date());

    // Đặt thời gian của cả hai ngày thành nửa đêm
    end.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Tính số ngày khác biệt
    const diffInTime = currentDate.getTime() - end.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

//   /**
//  * API dùng để lấy thông tin nhân sự
//  * @param code: Code nhân sự
//  */
//   APIGetEmployeeInfo(code: number) {
//     this.staffService.GetEmployeeInfo(code).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
//       if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
//         this.detailStaff = res.ObjectReturn;
//       }
//       else {
//         this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${res.ErrorString}`);
//       }
//     }, (error) => {
//       this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${error}`);
//     })
//   }


  /**
* API dùng để lấy thông tin nhân sự
* @param code: Code nhân sự
*/
  APIGetEmployeeInfoPortal() {
    this.staffService.GetEmployeeInfoPortal().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.detailStaff = res.ObjectReturn;
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${res.ErrorString}`);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${error}`);
    })
  }

  //#region API

//   /**
//  * Hàm dùng để lấy cache staff đang đăng nhập tài khảon
//  */
//   onGetCacheStaff() {
//     this.isLoading = true;
//     let a = this.auth.getCacheUserInfo().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
//       if (Ps_UtilObjectService.hasValue(res)) {
//         this.staffInfor = res;

//         if (Ps_UtilObjectService.hasValue(this.staffInfor.staffID)) {
//           this.APIGetEmployeeInfo(this.staffInfor.staffID);
//         }
//       }
//       this.isLoading = false;
//     });
//     this.arrUnsubscribe.push(a)
//   }


  /**
   * API lấy danh sách hồ sơ boarding
   */
  APIGetListHRDecisionProfile() {
    this.isLoadingList = true;
    const apiText = this.StepProcess == 1 ? `Chuẩn bị ${(this.Module == 1 ? 'Onboarding' : 'Offboarding')}`
      : this.StepProcess == 2 ? `${(this.Module == 1 ? 'Onboarding' : 'Offboarding')}`
        : this.StepProcess == 3 ? `Ngưng  ${(this.Module == 1 ? 'Onboarding' : 'Offboarding')}`
          : `${(this.Module == 1 ? 'Onboarded' : 'Offboarded')}`;
    let a = this.decisionAPIService.GetListHRDecisionProfile(this.gridState).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridData = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total;

        this.gridViewData.next({ data: this.gridData, total: this.total });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách hồ sơ ${apiText}: ${res.ErrorString}`);
      }
      this.isLoadingList = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách hồ sơ ${apiText}: ${err}`);
    });

    this.arrUnsubscribe.push(a)
  }

  /**
 * API lấy danh sách hồ sơ boarding khi ở bước onboarding
 */
  APIGetListHRDecisionProfileBoarding() {
    this.isLoadingList = true;
    const apiText = this.StepProcess == 1 ? `Chuẩn bị ${(this.Module == 1 ? 'Onboarding' : 'Offboarding')}`
      : this.StepProcess == 2 ? `${(this.Module == 1 ? 'Onboarding' : 'Offboarding')}`
        : this.StepProcess == 3 ? `Ngưng  ${(this.Module == 1 ? 'Onboarding' : 'Offboarding')}`
          : `${(this.Module == 1 ? 'Onboarded' : 'Offboarded')}`;
    let DLLPackage = this.Module == 1 ? 'hri029-onboarding-list' : 'hri033-offboarding-list'
    let a = this.decisionAPIService.GetListHRDecisionProfileBoarding(this.gridState, DLLPackage).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridData = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total;

        this.gridViewData.next({ data: this.gridData, total: this.total });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách hồ sơ ${apiText}: ${res.ErrorString}`);
      }
      this.isLoadingList = false;
    }, (err) => {
      this.isLoading = false;
      this.isLoadingList = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách hồ sơ ${apiText}: ${err}`);
    });

    this.arrUnsubscribe.push(a)
  }

  /**
   * Lấy danh sách đầu việc boarding
   */
  APIGetListHRTaskGroup() {
    this.isLoading = true;
    const errMsg = 'Đã xảy ra lỗi khi lấy danh sách đầu việc:';
    let a = this.decisionAPIService.GetListHRTaskGroup(this.gridState).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridTask = res.ObjectReturn.Data;
        // this.gridTask = mockdatatask
        this.gridTaskResult = { data: orderBy(this.gridTask, this.sort), total: res.ObjectReturn.Total };
        // console.log(this.gridTask)
        this.onLoadFilterDate(this.gridTask);
      }
      else {
        this.layoutService.onError(`${errMsg} ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`${errMsg} ${err}`);
    });
    this.arrUnsubscribe.push(a)
  }

  /**
   * API lấy danh sách hồ sơ boarding
   * @param listDTO DTOHRDecisionProfile[]
   * @param status trạng thái hồ sơ sẽ được chuyển
   */
  APIUpdateHRDecisionProfileStatus(listDTO: DTOHRDecisionProfile[], status: number) {
    const apiText = this.Module == 1 ? 'Onboarding' : 'Offboarding';

    let a = this.decisionAPIService.UpdateHRDecisionProfileStatus(listDTO, status).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        if (this.StepProcess == 2) {
          this.APIGetListHRDecisionProfileBoarding()
        } else {
          this.APIGetListHRDecisionProfile();
        }
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.layoutService.onSuccess('Cập nhật trạng thái hồ sơ thành công')
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi tình trạng hồ sơ ${apiText}: ${res.ErrorString}`);
      }
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi tình trạng hồ sơ ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a)
  }

  /**
 * API lấy danh sách hồ sơ boarding khi ở bước boarding
 * @param listDTO DTOHRDecisionProfile[]
 * @param status trạng thái hồ sơ sẽ được chuyển
 */
  APIUpdateHRDecisionProfileBoardingStatus(listDTO: DTOHRDecisionProfile[], status: number) {
    const apiText = this.Module == 1 ? 'Onboarding' : 'Offboarding';
    let DLLPackage = this.Module == 1 ? 'hri029-onboarding-list' : 'hri033-offboarding-list'

    let a = this.decisionAPIService.UpdateHRDecisionProfileBoardingStatus(listDTO, status, DLLPackage).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        if (this.StepProcess == 2) {
          this.APIGetListHRDecisionProfileBoarding()
        } else {
          this.APIGetListHRDecisionProfile();
        }
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.layoutService.onSuccess('Cập nhật trạng thái hồ sơ thành công')
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi tình trạng hồ sơ ${apiText}: ${res.ErrorString}`);
      }
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi tình trạng hồ sơ ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a)
  }

  /**
   * API dùng để lấy lịch sử trạng thái của đầu việc
   * @param filter State
   */
  APIGetListHRDecisionTaskLog(filter: State) {
    let a = this.decisionAPIService.GetListHRDecisionTaskLog(filter).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.isLoading = false;

      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listTaskLog = res.ObjectReturn.Data;
        this.listTaskLog.sort((a, b) => {
          const dateA = new Date(a.CreatedTime).getTime();
          const dateB = new Date(b.CreatedTime).getTime();
          return dateB - dateA; // Sắp xếp giảm dần
        });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy lịch sử thay đổi: ` + res.ErrorString);
      }
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy lịch sử thay đổi: ${err}`);
    });
    this.arrUnsubscribe.push(a)
  }

  /**
   * API lấy loại nhân sự
   */
  APIGetListHRTypeStaff() {
    const typeData = 5; // Định nghĩa giá trị chính xác của typeData
    let a = this.apiHr.GetListHR(typeData).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
        this.listTypeStaff = res.ObjectReturn;
      }
      else[`Đã xảy ra lỗi khi lấy danh sách : ${res.ErrorString}`];
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái : ${error}`);
    });
    this.arrUnsubscribe.push(a)
  }

  listEmployeeAssigneeFilter: DTOEmployee[] = [] // Danh sách nhân sự thực hiện 
  listEmployeeApproverFilter: DTOEmployee[] = [] // Danh sách nhân sự duyệt
  listEmployeeFilter: DTOEmployee[] = [];

  /**
   * API Get EMployee
   * 0 default
   * 1 assignee
   * 2 approve
   */
  APIGetListEmployee(status: 0 | 1 | 2) {
    this.isLoadingEmployeeAssignee = [0, 1].includes(status);
    this.isLoadingEmployeeApprover = [0, 2].includes(status);

    if ([0, 1].includes(status)) {
      this.listEmployeeAssigneeFilter = [];
    }

    if ([0, 2].includes(status)) {
      this.listEmployeeApproverFilter = [];
    }

    let a = this.staffApiService.GetListEmployee(this.gridStateStaff).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listEmployee = res.ObjectReturn.Data;
        if (status == 1) {
          this.listEmployeeAssigneeFilter = res.ObjectReturn.Data;
        }

        if (status == 2) {
          this.listEmployeeApproverFilter = res.ObjectReturn.Data;
        }

        if (!Ps_UtilObjectService.hasListValue(this.listEmployeeAssigneeFilter) && status == 1) {
          this.MultiForm.controls['Assignee'].reset(); // Reset về giá trị mặc định
        }

        if (!Ps_UtilObjectService.hasListValue(this.listEmployeeApproverFilter) && status == 2) {
          this.MultiForm.controls['Approved'].reset(); // Reset về giá trị mặc định
        }

        this.isDropdownPositionAssignee = false;
        this.isDropdownAssignee = false; // Enable Dropdown

      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách nhân viên: ${res.ErrorString}`);
      }
      this.isLoadingEmployeeAssignee = false;
      this.isLoadingEmployeeApprover = false;
    }, (error) => {
      this.isLoadingEmployeeAssignee = false;
      this.isLoadingEmployeeApprover = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách nhân viên: ${error}`);
    });

    this.arrUnsubscribe.push(a)
  }

  /**
* API lấy danh sách chức danh áp dụng
*/
  APIGetListHRReasonStop(Enum: number) {
    let a = this.staffApiService.GetListHR(Enum).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listReason = res.ObjectReturn;
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chức danh áp dụng: ${error}`);
    });

    this.arrUnsubscribe.push(a)
  }


  APIUpdateHRDecisionTask(data: DTOHRDecisionTask) {
    // Đối với chức danh thực hiện là 'Nhân sự áp dụng' thì gán giá trị cho PositionAssignee = null
    if (data.PositionAssignee == -1) {
      data.PositionAssignee = null
    }

    // Kiểm tra loại nhân sự áp dụng của đầu việc
    data.ListOfTypeStaff = JSON.stringify(this.filteredListHR.map((item: DTOListHR) => item.OrderBy));

    // // Cắt chuỗi để check endDate có phải cuối ngày không
    // const splitEndDate = data.EndDate.split('T');
    // if (splitEndDate.length == 1) {
    //   data.EndDate += 'T23:59:59';
    // }

    // Cập nhật EndDate về cuối ngày (UTC)
    if (data.EndDate) {
      const date = new Date(data.EndDate);
      date.setUTCHours(23, 59, 59, 999); // Đặt thời gian về cuối ngày

      data.EndDate = date.toISOString().replace(".999Z", ".000Z");
    }
    const type = this.isEdit ? 'Cập nhật' : 'Thêm mới';
    let a = this.decisionAPIService.UpdateHRDecisionTask(data).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${type} đầu việc thành công`);
        this.APIGetListHRTaskGroup();
        this.handleCloseDrawer()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${type} đầu việc  ` + res.ErrorString);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${type}  đầu việc )}: ${err}`);
    });
    this.arrUnsubscribe.push(a)
  }

  /**
  * API lấy danh sách chức danh áp dụng
  */
  APIGetListHR(ENUM: number) {
    let a = this.staffApiService.GetListHR(ENUM).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listHR = res.ObjectReturn;
        this.officalHR = this.listHR.find(item => item.OrderBy == 2);
      }
    }, (error) => {
      this.layoutService.onError(
        `Đã xảy ra lỗi khi lấy danh sách chức danh áp dụng: ${error}`
      );
    });
    this.arrUnsubscribe.push(a)
  }


  /**
   * Filter dropdown 
   */
  handleFilter(value, searchFields: any, textField: string, option: string) {
    if (option == 'Assignee') {
      if (Ps_UtilObjectService.hasListValue(this.listEmployee)) {
        if (Ps_UtilObjectService.hasListValue(searchFields)) {
          this.listEmployeeAssigneeFilter = this.listEmployee.filter((s) =>
            searchFields.some((field) => {
              const fieldValue = s[field];
              return fieldValue && Ps_UtilObjectService.containsString(fieldValue.toString(), value);
            })
          );
        } else {
          this.listEmployeeAssigneeFilter = this.listEmployee.filter(
            (s) => Ps_UtilObjectService.containsString(s[textField], value)
          );
        }
      }
    }

    if (option == 'Approver') {
      if (Ps_UtilObjectService.hasListValue(this.listEmployee)) {
        if (Ps_UtilObjectService.hasListValue(searchFields)) {
          this.listEmployeeApproverFilter = this.listEmployee.filter((s) =>
            searchFields.some((field) => {
              const fieldValue = s[field];
              return fieldValue && Ps_UtilObjectService.containsString(fieldValue.toString(), value);
            })
          );
        } else {
          this.listEmployeeApproverFilter = this.listEmployee.filter(
            (s) => Ps_UtilObjectService.containsString(s[textField], value)
          );
        }
      }
    }
  }

  /**
   * Lấy danh sách chức danh
   */
  APIGetListHRPolicyPosition() {
    let a = this.hriTransitionService.GetListHRPolicyPosition().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        const position3 = {
          "Code": -1,
          "PositionName": "Nhân sự áp dụng",
          "PositionID": "",
          "Position": -1,
          "IsLeader": false,
          "IsSupervivor": false,
          "DepartmentName": ""
        };

        this.currentListPosition = [
          position3,
          ...res.ObjectReturn,
        ];
        this.currentListApprovedPosition = res.ObjectReturn;
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chức danh: ${error}`);
    });

    this.arrUnsubscribe.push(a)
  }

  /**
 * Xuất excel nhân sự boarded/ngưng boarding theo filter 
 */
  APIGetHRBoardedReportExcel() {
    this.isLoading = true
    var ctx = "Xuất Excel"
    var getfileName = "DecisionBoardedReport.xlsx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a = this.decisionAPIService.GetHRBoardedReportExcel(this.gridState).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res)) {
        Ps_UtilObjectService.getFile(res, getfileName)
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else {
        this.layoutService.onError(`${ctx} thất bại`)
      }
    }, f => {
      this.isLoading = false;
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f?.error?.ExceptionMessage)
    });
    this.arrUnsubscribe.push(a)
  }

  //#endregion

  //#region DRAWER

  // SET CURRENT VALUE DROPDOWN
  currentListPosition: { PositionName: string; Code: number; ID: string }[] = [];
  currentListApprovedPosition: { PositionName: string; Code: number }[] = [];

  listStatusDrodpown: { Status: number; StatusName: String }[] = [];

  /**
 * Get action dropdown status drawer
 */
  onGetStatusDropdown() {
    // Module === 1 là Onboarding | Module === 2 là offboarding.
    this.listStatusDropdownFitler = []; // Khởi tạo danh sách lọc rỗng
    let PermissionUpdateStatusAssignee = this.detailStaff.Code == this.MultiForm.value.Assignee // quyền của người thực hiện bởi
    let PermissionUpdateStatusAssigneeForProfile = this.detailStaff.Code == this.MultiForm.value.DecisionProfile // quyền của cập nhật của nhân sự áp dụng
    let PermissionUpdateStatusApproved = this.detailStaff.Code == this.MultiForm.value.Approved // quyền của người duyệt bởi
    let PermissionUpdateStatusApprovedForIsLeaderMonitor = this.detailStaff.IsLeader && this.detailStaff.Department == this.MultiForm.value.Department
      || this.detailStaff.IsSupervivor && this.detailStaff.Department == this.MultiForm.value.Department
      && this.detailStaff.Location == this.MultiForm.value.Location  // quyền của người duyệt bởi

    const statusMap = new Map<number, number[]>([
      [1, [1, ...(this.isAllowedToVerify || this.isToanQuyen ? [2] : [])]], // Chưa thực hiện, Không thực hiện
      [2, [2, ...(this.isAllowedToVerify || this.isToanQuyen ? [3] : [])]], // Không thực hiện, Đang thực hiện
      [3, this.Module === 1
        ? [...new Set([3, ...(this.isAllowedToVerify || this.isToanQuyen ? [5] : []), ...(PermissionUpdateStatusAssigneeForProfile || PermissionUpdateStatusAssignee  ? [6] : [])])]
        : [...new Set([3, ...(this.isAllowedToVerify || this.isToanQuyen ? [5] : []), ...(PermissionUpdateStatusAssignee ? [4] : [])])]
      ],
      [4, [4, ...(this.MultiForm.value.TypeAssignee == 2 && PermissionUpdateStatusApproved
        || this.MultiForm.value.IsLeaderMonitor && PermissionUpdateStatusApprovedForIsLeaderMonitor ? [6] : [])]], // Chờ duyệt, Hoàn tất
      [5, [5, ...(this.isAllowedToVerify || this.isToanQuyen ? [3] : [])]], // Ngưng thực hiện, Đang thực hiện
      [6, [6]] // Hoàn tất
    ]);

    if (Ps_UtilObjectService.hasValue(this.MultiForm.get('ListHRDecisionTaskLog').value[0].Status)) {
      const statuses = statusMap.get(this.MultiForm.get('ListHRDecisionTaskLog').value[0].Status) || [];
      let temp = this.listStatusDropdown.slice();
      this.listStatusDropdownFitler = temp.filter(action =>
        statuses.includes(action.Status)
      );
    }

  }


  onSetStatusForm() {
    if (this.StepProcess == 1) {
      this.MultiForm.get('Status').setValue(1);
    } else {
      this.MultiForm.get('Status').setValue(3);
    }
  }

  //#region FORM

  MultiForm: UntypedFormGroup;

  /**
 * Tạo và khởi tạo một biểu mẫu (FormGroup) dựa trên các thuộc tính của lớp DTOHRDecisionTask.
 *
 * @returns {UntypedFormGroup} Biểu mẫu (FormGroup) chứa các trường dữ liệu được tạo tự động từ DTOHRDecisionTask.
 *
 * @description
 * - Phương thức sử dụng tất cả các thuộc tính của đối tượng `DTOHRDecisionTask` để tạo ra các điều khiển (controls) tương ứng trong FormGroup.
 * - Các trường `Code` và `Status` sẽ được thêm với ràng buộc `Validators.required`.
 * - Các trường khác được thêm vào mà không có ràng buộc nào.
 *
 * @example
 * const form = this.onLoadForm();
 * console.log(form.value); // Hiển thị giá trị ban đầu của biểu mẫu
 */
  onLoadForm(): UntypedFormGroup {
    const form = this.formBuilder.group({}); // Tạo một FormGroup trống
    const dto = new DTOHRDecisionTask(); // Tạo một đối tượng DTOHRDecisionTask mặc định

    // Lặp qua các thuộc tính của đối tượng DTOHRDecisionTask
    Object.keys(dto).forEach((key) => {
      const value = dto[key]; // Lấy giá trị thuộc tính hiện tại
      if (key === 'Code' || key === 'Status') {
        // Nếu là trường 'Code' hoặc 'Status', thêm điều khiển với Validators.required
        form.addControl(
          key,
          this.formBuilder.control(dto[key], Validators.required)
        );
      } else {
        // Thêm điều khiển cho các trường khác mà không có ràng buộc
        form.addControl(key, this.formBuilder.control(value));
      }
    });

    return form; // Trả về biểu mẫu đã được khởi tạo
  }


  /**
  * Tính toán thời gian còn lại giữa ngày hiện tại và ngày kết thúc.
  * - Nếu thời gian còn lại >= 1 ngày: trả về số ngày còn lại.
  * - Nếu thời gian còn lại < 1 ngày: trả về số giờ còn lại.
  * - Nếu đã hết hạn: trả về thông báo "Đã hết hạn".
  *
  * @returns {string} Chuỗi mô tả thời gian còn lại, bao gồm số ngày hoặc số giờ, hoặc thông báo hết hạn.
  * - Dạng trả về: `/<span class="color-red">{x}</span> ngày` hoặc `/<span class="color-red">{x}</span> giờ` hoặc `<span class="color-red">Đã hết hạn</span>`.
  */
  getRemainingDate(): string {
    // Lấy ngày kết thúc từ form
    const endDate = new Date(this.MultiForm.get('EndDate').value);

    // Lấy ngày hiện tại từ form
    let now = new Date();

    // Nếu đầu việc thuộc chính sách
    // if (this.DataHRDecisionTaskOrigin.Task !== null) {
    //   now = new Date(this.MultiForm.get('DecisionProfileStartDate').value);
    // }else{
    //   now = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].CreatedTime);
    //   for(let i = 0; i < this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length; i++){
    //     if(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].Status == 3){
    //       now = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].CreatedTime);
    //       break;
    //     }
    //   }
    // }

    //Xử lý hoàn tất hết ngày dựa trên ngày đang thực hiện ở tasklog
    now = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].CreatedTime);
    for (let i = 0; i < this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length; i++) {
      if (this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].Status == 3) {
        now = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].CreatedTime);
        break;
      }
    }

    // Tính toán sự chênh lệch giữa hai ngày, tính bằng mili giây
    const diffInMilliseconds = endDate.getTime() - now.getTime();
    // Chuyển đổi mili giây sang số ngày
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Nếu đầu việc đã bị hết hạn
    // if (this.MultiForm.get('IsOverdue').value) {
    //   return `<span class="color-red">Đã hết hạn</span>`;
    // }

    if (diffInDays >= 1) {
      if (Ps_UtilObjectService.hasValue(this.DataHRDecisionTaskOrigin.Task)) {
        // Nếu còn ít nhất 1 ngày
        return `<span class="color-red">${diffInDays}</span> ngày`;
      } else {
        return `<span class="">${diffInDays}</span> ngày`;
      }
    } else {
      if (Ps_UtilObjectService.hasValue(this.DataHRDecisionTaskOrigin.Task)) {
        // Nếu còn ít nhất 1 ngày
        return `<span class="color-red">${diffInDays}</span> ngày`;
      } else {
        return `<span class="">${diffInDays}</span> ngày`;
      }
    }
    // else {
    //   // Nếu dưới 1 ngày, tính số giờ còn lại
    //   const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    //   return diffInHours > 0
    //     ? `<span class="color-red">${diffInHours}</span> giờ`
    //     : `<span class="color-red">Đã hết hạn</span>`;
    // }
  }



  //#endregion

  //#region HANDLE DROPDOWN DRAWER
  onDropdownClick(event, prop: string) {
    const formControl = this.MultiForm.get(prop);
    switch (prop) {
      case 'ListOfTypeStaff':
        this.MultiForm.get(prop)?.setValue(`[${[event]}]`);
        break;

      case 'Status': {
        this.MultiForm.get(prop)?.setValue(event);
        this.getTitleReason(event)
        if (this.titleReason == "mở lại") {
          this.APIGetListHRReasonStop(24)
        } else {
          this.APIGetListHRReasonStop(23)
        }

        if ((this.MultiForm.get("Status").value != this.DataHRDecisionTaskOrigin.Status)) {
          this.resquestChangeStatus = true
          this.MultiForm.get("Reason")?.reset();
          this.MultiForm.get("ReasonDescription")?.reset();

        }
        else {
          this.resquestChangeStatus = false
          this.MultiForm.get('Reason')?.setValue(this.DataHRDecisionTaskOrigin.Reason);
          this.MultiForm.get('ReasonDescription')?.setValue(this.DataHRDecisionTaskOrigin.ReasonDescription);
        }
        break;
      }

      case 'PositionAssignee': {
        this.isSelectedPosition3 = event == -1;
        this.MultiForm.get('AssigneeBy').setValue(null);
        this.MultiForm.get('AssigneeID').setValue(null);
        this.MultiForm.get('Assignee').setValue(null);
        if (event.Position == -1) {
          this.MultiForm.get('TypeAssignee').setValue(3);
          this.MultiForm.get('PositionAssignee').setValue(-1);
          this.MultiForm.get('AssigneePositionName').setValue(null);
        }
        else {
          this.MultiForm.get('TypeAssignee').setValue(2);
          this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: event.Position }];
          this.APIGetListEmployee(1);
          this.MultiForm.get(prop)?.setValue(event.Position);
        }
        break;
      }

      case 'PositionApproved': {
        this.MultiForm.get("Approved")?.reset();
        if (event) {
          this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: event }];
          this.APIGetListEmployee(2);
          this.MultiForm.get(prop)?.setValue(event);
        }
        else {
          this.MultiForm.get("PositionApproved")?.reset();
          this.isDropdownPositionAssignee = true;
        }
        this.codeApprove = null;
        break;
      }

      case 'IsLeaderMonitor': {
        this.isLeader = !this.isLeader;

        if (this.isLeader) {
          this.MultiForm.get('Approved').setValue(null);
          this.MultiForm.get('PositionApproved').setValue(null);
          this.codeApprove = null;
        }

        this.MultiForm.get('IsLeaderMonitor').setValue(this.isLeader);
        break
      }

      // Nhân sự thực hiện
      case 'Assignee':
        formControl?.setValue(event);
        this.codeAssignee = event;
        break;

      // Nhân sự duyệt
      case 'Approved':
        formControl?.setValue(event);
        this.codeApprove = event;
        break;

      default:
        this.MultiForm.get(prop)?.setValue(event);
        break;
    }
  }

  onDatepickerChange(event, prop: string) {
    if (event instanceof Date) {
      this.isDatePickerChange = true
      this.MultiForm.get(prop)?.setValue(event.toISOString());
      this.handleCalDate(this.MultiForm.value);
      this.handleCalDeadline(this.DataHRDecisionTaskOrigin.EndDate)
    }
    else {
      console.error("Sự kiện không phải là đối tượng Date:", event);
    }
  }


  /**
   * Calculate date remain
   */
  handleCalDate(task: DTOHRDecisionTask) {
    const createTime = new Date(task.CreatedTime);
    const startOfEndDate = new Date(task.EndDate);
    const startOfCurrentDate = new Date();
    const startOfStartBoarding = new Date(this.MultiForm.get('DecisionProfileStartDate').value);
    // Đặt giờ về 00:00:00
    createTime.setHours(0, 0, 0, 0);
    startOfEndDate.setHours(0, 0, 0, 0);
    startOfCurrentDate.setHours(0, 0, 0, 0);
    startOfStartBoarding.setHours(0, 0, 0, 0);

    // Trường hợp thêm mới đầu việc (Ngoài bảng đầu việc)
    if (task.Code == 0) {
      return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
    }
    // Trường hợp sửa đầu việc (Ngoài bảng đầu việc)
    if (!task.Task) {
      if (this.isDatePickerChange) {
        return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
      }
      return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfStartBoarding, startOfEndDate);
    }
    // Trường hợp sửa đầu việc (Trong bảng đầu việc)
    if (task.Task) {
      if (this.isDatePickerChange) {
        return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
      }
      return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfStartBoarding, startOfEndDate);
    }
  }

  // /**
  //  * Calculate deadline
  //  */
  // handleCalDeadline(endDate: Date | string) {
  //   const curDate = new Date()
  //   const normalizedEndDate = new Date(endDate)

  //   if (!endDate) {
  //     this.deadlineDate = 0
  //   } else {
  //     curDate.setHours(0, 0, 0, 0);
  //     normalizedEndDate.setHours(0, 0, 0, 0);

  //     this.deadlineDate = Ps_UtilObjectService.getDaysLeft(normalizedEndDate, curDate);
  //   }


  // }

  /**
   * Calculate deadline
   */
  handleCalDeadline(endDate: any) {
    if (!endDate) {
      this.deadlineDate = 0;
      return;
    }

    const curDate = new Date();
    const normalizedEndDate = new Date(endDate);
    curDate.setHours(0, 0, 0, 0);
    normalizedEndDate.setHours(0, 0, 0, 0);

    const getLogTime = (status: number): Date => {
      for (const log of this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog) {
        if (log.Status === status) {
          const logTime = new Date(log.CreatedTime);
          logTime.setHours(0, 0, 0, 0);
          return logTime;
        }
      }
      return new Date(); // Default value if no matching status found
    };

    let referenceTime: Date = curDate;

    switch (this.DataHRDecisionTaskOrigin.Status) {
      case 4: // Nếu trạng thái là gửi duyệt
        referenceTime = getLogTime(4);
        break;

      case 6: // Nếu trạng thái là hoàn thành
        referenceTime = this.Module === 2
          ? getLogTime(4)  // Module 2 lấy thời gian gửi duyệt
          : getLogTime(6); // Các trường hợp khác lấy thời gian hoàn thành
        break;
    }

    this.deadlineDate = Math.abs(Ps_UtilObjectService.getDaysLeft(normalizedEndDate, referenceTime));
  }



  /**
* Datepicke change
*/
  openDatePicker() {
    let startDateValue = '';
    startDateValue = new Date().toISOString();
    // Chuyển đổi startDateValue thành ngày và tính toán minEndDate
    const startDate = startDateValue ? new Date(startDateValue) : null;

    if (startDate && !isNaN(startDate.getTime())) {
      this.minEndDate = Ps_UtilObjectService.addDays(startDate, 1); // Ngày hợp lệ
    } else {
      this.minEndDate = null; // Ngày không hợp lệ hoặc không có giá trị
    }
  }

  onCheckedLeader() {
    if (this.MultiForm.value.IsLeaderMonitor) {
      this.disabledApprPos = false;
      this.MultiForm.get('IsLeaderMonitor').setValue(false);
      if (
        this.oldApprovedPositionID !== 0 ||
        Ps_UtilObjectService.hasValue(this.oldApprovedPositionID)
      ) {
        this.MultiForm.get('ApprovedPositionID').setValue(
          this.oldApprovedPositionID
        );
      }
    } else if (this.MultiForm.value.IsLeaderMonitor == false) {
      this.MultiForm.get('IsLeaderMonitor').setValue(true);
      this.disabledApprPos = true;
      this.MultiForm.get('ApprovedPositionID').setValue(null);
    }
  }

  onCalcNumByEndDate(dataItem) {
    const task = dataItem.ListHRDecisionTaskLog.find((l) => l.Status == 4);
    const sendDate = task ? task.LastModifiedTime : null;
    const endDate = new Date(dataItem.EndDate);
    endDate.setHours(0, 0, 0, 0);

    if (Ps_UtilObjectService.hasValue(sendDate)) {
      sendDate.setHours(0, 0, 0, 0);
    }
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);

    if (
      (!task &&
        dataItem.Status == 3 &&
        Ps_UtilObjectService.getDaysLeft(endDate, newDate) > 0) ||
      (task && Ps_UtilObjectService.getDaysLeft(endDate, sendDate) > 0)
    ) {
      this.numOfDateOverDuo =
        Ps_UtilObjectService.getDaysLeft(endDate, newDate) ||
        Ps_UtilObjectService.getDaysLeft(endDate, sendDate);
    }
  }

  onSubmit() {
    const data = this.MultiForm.value;

    if (
      !Ps_UtilObjectService.hasValue(data.TaskName) ||
      data.TaskName.trim() === ''
    ) {
      this.layoutService.onError('Tên đầu việc không được để trống .');
    } else if (!Ps_UtilObjectService.hasValue(data.Assignee)) {
      this.layoutService.onError('Thực hiện bởi không được để trống .');
    } else if (
      !Ps_UtilObjectService.hasValue(data.EndDate) ||
      data.EndDate.trim() === ''
    ) {
      this.layoutService.onError('Hoàn tất hết ngày không được để trống .');
    } else if (
      !Ps_UtilObjectService.hasValue(data.RecipientStaffID) &&
      !Ps_UtilObjectService.hasListValue(data.ListHRDecisionProfile) &&
      data.RecipientStaffID.trim() === ''
    ) {
      this.layoutService.onError('Nhân sự áp dụng không được để trống .');
    } else {
      const code = data.ListOfTypeStaff?.Code;

      data.ListOfTypeStaff = `[${[code]}]`;
      data.TypeDecision = this.StepProcess;
      // data.BoardingType = this.Module;
      this.APIUpdateHRDecisionTask(data);
      this.handleCloseDrawer();
    }
  }

  //#endregion

  //#endregion
  //#region --------------------------------------------

  //#region HIEU HANDLE

  /** HÀM XỬ LÝ LẤY NGÀY  CỦA CÁC ITEM
   * @param listDecisionTask DANH SÁCH GRID ITEM
   */
  onLoadFilterDate(listDecisionTask: DTOHRDecisionTask[]) {
    this.onGetEndDate(listDecisionTask);
  }

  /**
   * Hàm lấy danh sách nhân sự khi hover vào trạng thái trong grid đầu việc
   * @param dataItem Dữ liệu đầu việc
   * @param status Trạng thái cần lọc
   * @returns Chuỗi thông tin nhân sự dưới dạng "FullName | StaffID", mỗi nhân sự trên một dòng
   */
  onGetListProfileByStatus(dataItem: any, status: number): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Kiểm tra nếu trạng thái là 7
    const isWithinDeadline = (profile: DTOHRDecisionTask, sendDate: Date | null) => {
      return (
        (profile.Status === 3 && Ps_UtilObjectService.getDaysLeft(profile.EndDate, today) > 0) ||
        (sendDate && Ps_UtilObjectService.getDaysLeft(profile.EndDate, sendDate) > 0)
      );
    };

    // Lọc danh sách nhân sự
    const filteredProfiles = dataItem.ListChild.filter((profile) => {
      const task = profile.ListHRDecisionTaskLog.find((l) => l.Status === 4);
      const sendDate = task?.LastModifiedTime || null;

      if (status === 7) {
        return isWithinDeadline(profile, sendDate);
      }

      return status === profile.Status && status !== 7;
    });

    // Hiển thị danh sách nhân sự dưới dạng chuỗi
    return filteredProfiles
      .map((item) => `${item.FullName} | ${item.StaffID}`)
      .join('\n');
  }


  /**
   * HÀM TRẢ RA GIÁ TRỊ END DATE GẦN NHẤT
   *@param dataItem DATAITEM
   * @returns
   */
  onGetEndDate(listDecisionTask: DTOHRDecisionTask[]) {
    let minEndDate: Date;

    listDecisionTask.forEach((s) => {
      if (Ps_UtilObjectService.hasListValue(s.ListChild)) {
        minEndDate = s.ListChild.reduce((minDate, current) => {
          const currentEndDate = new Date(current.EndDate);
          if (!minDate) {
            return currentEndDate;
          }
          return currentEndDate < minDate ? currentEndDate : minDate;
        }, null as Date | null);
      }

      // SET TRƯỜNG ẢO
      s.EndDate = minEndDate.toISOString();
      return minEndDate?.toISOString();
    });
  }

  /**
   * HÀM XỬ LÝ NGÀY QUÁ HẠN GẦN NHẤT
   * @param dataItem DATAITEM
   * @returns
   */
  onGetOverDueDate(dataItem: DTOHRDecisionTask) {
    if (Ps_UtilObjectService.hasListValue(dataItem.ListChild)) {
      let minEndDate: Date;
      let filteredProfiles: DTOHRDecisionTask[] = [];

      // LOGIC LẤY NGÀY QUÁ HẠN
      dataItem.ListChild.filter((profile) => {
        const task = profile.ListHRDecisionTaskLog.find((l) => l.Status == 4);
        const sendDate = task ? task.LastModifiedTime : null;
        if (profile.Status == 3 && Ps_UtilObjectService.getDaysLeft(profile.EndDate, new Date()) > 0) {
          filteredProfiles.push(profile);
        }
        else if (task && Ps_UtilObjectService.getDaysLeft(profile.EndDate, sendDate) > 0) {
          filteredProfiles.push(profile);
        }
      });

      // LOGIC XỬ LÝ NGÀY QUÁ HẠN GẦN NHẤT
      let proFileCheck: DTOHRDecisionTask = new DTOHRDecisionTask();
      minEndDate = filteredProfiles.reduce((minDate, current) => {
        proFileCheck = current;
        let currentEndDate = new Date(current.EndDate);
        if (!minDate) {
          return currentEndDate;
        }
        if (currentEndDate < minDate) {
          return currentEndDate;
        }
        else {
          return minDate;
        }
        // return currentEndDate < minDate ? currentEndDate : minDate;
      }, null as Date | null);

      //LOGIC XỬ LÝ TÍNH NGÀY QUÁ HẠN
      if (Ps_UtilObjectService.hasValue(minEndDate)) {
        minEndDate.setHours(0, 0, 0, 0);
        let newDate = new Date();
        newDate.setHours(0, 0, 0, 0);

        const numOfDay = Ps_UtilObjectService.getDaysDiff(minEndDate, newDate);
        if (numOfDay <= 3) {
          return numOfDay;
        } else {
          return minEndDate?.toISOString();
        }
      }
    }
  }

  /**
   * HÀM XỬ LÝ TEXT HIỂN THỊ ĐỐI VỚI QUÁ HẠN (KIỂM TRA NUMBER HOẶC STRING)
   * @param dataItem DATAITEM
   * @returns
   */
  onGetOverDueText(dataItem: DTOHRDecisionTask): { numsOfDate: number, endDate: Date } {
    if (this.isOverdue) {
      if (Ps_UtilObjectService.hasListValue(dataItem.ListChild)) {
        let maxResult: { numsOfDate: number, endDate: Date } = { numsOfDate: 0, endDate: new Date(dataItem.EndDate) };
        for (const profile of dataItem.ListChild) {
          const status = profile.Status;
          // ONBOARDING
          if (this.Module == 1) {
            // Đang thực hiện
            if (status == 3) {
              const daysLeft = Ps_UtilObjectService.getDaysLeft(new Date(profile.EndDate), new Date());
              if (Math.ceil(daysLeft) > maxResult.numsOfDate) {
                maxResult = { numsOfDate: Math.ceil(daysLeft), endDate: new Date(profile.EndDate) };
              }
            }
            // Hoàn tất
            else if (status == 6) {
              let doneDate = new Date(profile.ListHRDecisionTaskLog.find((l) => l.Status == 6).CreatedTime);
              const daysLeft = Ps_UtilObjectService.getDaysLeft(new Date(profile.EndDate), doneDate);
              if (Math.ceil(daysLeft) > maxResult.numsOfDate) {
                maxResult = { numsOfDate: Math.ceil(daysLeft), endDate: new Date(profile.EndDate) };
              }
            }
          }
          // OFFBOARDING
          else if (this.Module == 2) {
            // Đang thực hiện
            if (status == 3) {
              const daysLeft = Ps_UtilObjectService.getDaysLeft(new Date(profile.EndDate), new Date());
              if (Math.ceil(daysLeft) > maxResult.numsOfDate) {
                maxResult = { numsOfDate: Math.ceil(daysLeft), endDate: new Date(profile.EndDate) };
              }
            }
            // Chờ duyệt hoặc Hoàn tất
            else if ([4, 6].includes(status)) {
              let sentDate = new Date(profile.ListHRDecisionTaskLog.find((l) => l.Status == 4).CreatedTime);
              const daysLeft = Ps_UtilObjectService.getDaysLeft(new Date(profile.EndDate), sentDate);
              if (Math.ceil(daysLeft) > maxResult.numsOfDate) {
                maxResult = { numsOfDate: Math.ceil(daysLeft), endDate: new Date(profile.EndDate) };
              }
            }
          }
        }

        return maxResult;
      }

      // Trả về mặc định khi không có điều kiện thỏa mãn
      return { numsOfDate: 0, endDate: new Date(dataItem.EndDate) };
    }

    return { numsOfDate: 0, endDate: new Date(dataItem.EndDate) };
  }


  onSortChangeCallback: Function;

  public sort: SortDescriptor[] = [
    {
      field: 'EndDate',
    },
  ];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridTaskResult = {
      data: orderBy(this.gridTask, this.sort),
      total: this.gridTask.length,
    };
  }

  onClickEditTask(task: { action: { Name: string; Code: string; Type: string; Link: string; Actived: boolean; }, item: DTOHRDecisionTask }) {
    this.isCreate = false;

    // Kiểm tra dropdown lý do trong drawer
    if ([1, 3].includes(task.item.Status)) {
      this.APIGetListHRReasonStop(24);
    }
    else if ([2, 5].includes(task.item.Status)) {
      this.APIGetListHRReasonStop(23);
    }

    // Kiểm tra mở drawer
    this.isOpenDrawer = true;
    this.MultiForm = this.onLoadForm();
    this.MultiForm.patchValue(task.item);
    this.DataHRDecisionTaskOrigin = { ...task.item }; // Lưu lại dữ liệu gốc
    this.MultiForm.value.ListHRDecisionTaskLog.sort((a, b) => {
      const dateA = new Date(a.CreatedTime).getTime();
      const dateB = new Date(b.CreatedTime).getTime();
      return dateB - dateA; // Sắp xếp giảm dần
    })

    // Binding ngày thực hiện
    this.handleCalDate(this.MultiForm.value);

    // XỬ LÝ SỬA DATA TYPESTAFF ĐỂ BIDING LÊN DROPDOWN
    const typeStaff = this.MultiForm.value.ListOfTypeStaff;

    if (typeof typeStaff == 'string') {
      const num = Number(typeStaff.replace(/[\[\]]/g, ''));
      this.MultiForm.get('ListOfTypeStaff')?.setValue(num);
    }

    // LƯU DATA CHỨC DANH PHÊ DUYỆT
    const ApprovedPositionID = this.MultiForm.value.ApprovedPositionID;
    if (Ps_UtilObjectService.hasValue(ApprovedPositionID)) {
      this.oldApprovedPositionID = ApprovedPositionID;
    }

    this.onCalcNumByEndDate(task.item);
    // Binding loại nhân sự áp dụng
    const list = this.listHR.filter(hr => JSON.parse(task.item.ListOfTypeStaff).includes(hr.OrderBy));
    this.filteredListHR = list;

    // Binding Thụ hưởng bởi
    this.selectedRecipient = this.MultiForm.value.FullName;

    // Lấy title lý do
    this.getTitleReason(this.MultiForm.get('ListHRDecisionTaskLog').value[0].Status)

    // Binding đúng thực hiện bởi và chức danh thực hiện
    this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: task.item.PositionAssignee }];
    this.APIGetListEmployee(1);

    // Binding nhân sự thực hiện
    this.isSelectedPosition3 = this.MultiForm.get('TypeAssignee').value == 3;
    if (this.MultiForm.get('TypeAssignee').value == 3) {
      this.MultiForm.get('PositionAssignee').setValue(-1);
      this.MultiForm.get('TypeAssignee').setValue(3);
    }

    // Set trưởng đơn vị, điểm làm việc
    if (!Ps_UtilObjectService.hasValue(this.MultiForm.get('IsLeaderMonitor')?.value)) {
      this.isLeader = false;
    }
    else {
      this.isLeader = this.MultiForm.get('IsLeaderMonitor')?.value;

      if (this.isLeader) {
        this.MultiForm.get('Approved').setValue(null);
        this.MultiForm.get('PositionApproved').setValue(null);
      }
    }

    // Binding Duyệt bởi
    if (this.Module == 2) {
      this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: this.MultiForm.get('PositionApproved').value }];
      this.APIGetListEmployee(2);
    }

    this.handleCalDeadline(this.MultiForm.get("EndDate").value)
    this.onCheckStatusDrawer(this.DecisionProfile);
    this.onGetStatusDropdown()

    this.codeAssignee = this.MultiForm.get('Assignee').value;
    this.codeApprove = this.MultiForm.get('Approved').value;

    this.resquestChangeStatus = false
  }

  onCheckStatusDrawer(dataItem: DTOHRDecisionProfile) {
    const statusMap = {
      1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
    };

    // Gán giá trị tương ứng từ map hoặc mặc định là undefined
    this.currentDrawer = statusMap[dataItem.Status] ?? undefined;

    // KIỂM TRA STATUS ĐỂ BINDING LIST STATUS CHO DROPDOWN
    this.onGetStatusDropdown();
  }

  /**
   * Hàm lấy enum bước và loại của On/Off board
   */
  getTypeBoarding() {
    if (this.Module == 1) {
      this.typeProfile = 1;
      this.typeData = 3;
    } else if (this.Module == 2) {
      this.typeProfile = 2;
      this.typeData = 4;
    }
  }


  //#region PHU NEW


  checkChangeStatus() {
    if (this.MultiForm.get('Status').value == this.DataHRDecisionTaskOrigin.Status) {
      return false
    }
    else {
      return true
    }
  }

  /**
   * Hàm dùng để check hiển thị lý do và mô tả lý do
   */
  shouldShowElement(): boolean {
    const status = this.MultiForm.get('Status').value;
    const task: DTOHRDecisionTask = this.MultiForm.value;
    task.ListHRDecisionTaskLog.sort((a, b) => {
      const dateA = new Date(a.CreatedTime).getTime(); // Thời gian tạo của phần tử a
      const dateB = new Date(b.CreatedTime).getTime(); // Thời gian tạo của phần tử b
      return dateB - dateA; // Sắp xếp giảm dần (mới nhất lên đầu)
    });
    let listStatus: number[] = [];
    if (!this.M_A) {
      // console.log(1)
      return false;
    }

    if (!Ps_UtilObjectService.hasListValue(task.ListHRDecisionTaskLog) && task.Code > 0) {
      // console.log(2)
      return false;
    }
    else {
      listStatus = task.ListHRDecisionTaskLog.map(item => item.Status);
      // console.log(3)
    }

    // Kiểm tra có đầu việc hay không
    if (!Ps_UtilObjectService.hasValue(task)) {
      // console.log(4)
      return false;
    }

    // Nếu đầu việc chỉ có một tasklog và không có reason thì không hiển thị
    // console.log('task.TypeData == 1',task.TypeData == 1)
    // console.log('task.ListHRDecisionTaskLog.length <= 2',task.ListHRDecisionTaskLog.length <= 2)
    // console.log('[1, 3].includes(status)',[1].includes(status))
    // console.log('status',status)
    if (this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length > 1 && this.DataHRDecisionTaskOrigin.Status == this.MultiForm.value.Status
      && !Ps_UtilObjectService.hasValue(this.DataHRDecisionTaskOrigin.Reason)) {
      // console.log(5)
      return false;
    }

    // console.log(6)

    const con1 = this.checkChangeStatus();

    // Nếu đầu việc có nhiều hơn 1 tasklog và có reason thì hiển thị
    const con2 = this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length > 1
      && Ps_UtilObjectService.hasValue(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].Reason);

    // Nếu trạng thái thay đổi và không phải trạng thái ban đầu khi xem chi tiết đầu việc thì hiển thị để điền lý do
    const con3 = task.Status !== this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].Status;

    // Nếu trạng thái không phải là hoàn tất và không phải là chờ duyệt thì hiển thị
    const con4 = status != 6 && status !== 4;
    // console.log(' task.Status', task.Status)
    // console.log('this.DataHRDecisionTaskOrigin.Status', this.DataHRDecisionTaskOrigin.Status)
    return (con1 || con2 || con3) && con4;
  }

  handleGetHR() {
    const listOfTS = this.MultiForm.get('ListOfTypeStaff').value || [];
    const listOfTSArray = Array.isArray(listOfTS) ? listOfTS : [listOfTS];

    const list = this.listHR.map(hr => listOfTSArray.includes(hr.OrderBy));
    return list;
  }


  /**
   * Hàm dùng để gọi API Thêm mới hoặc cập nhật đầu việc
   */
  handleUpdateTask(option: 'Thêm mới' | 'Cập nhật') {
    const data = this.MultiForm.value;
    const showError = (message: string) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: ${message}`);
    };

    // Kiểm tra các trường hợp thiếu dữ liệu
    if (!Ps_UtilObjectService.hasValueString(data.TaskName)) {
      showError(`thiếu tên đầu việc`);
      return;
    }

    if (!Ps_UtilObjectService.hasValue(data.PositionAssignee) && data.TypeAssignee == 2) {
      showError(`thiếu chức danh thực hiện`);
      return;
    }

    if (!Ps_UtilObjectService.hasValue(data.Assignee) && data.TypeAssignee == 2) {
      showError(`thiếu nhân sự thực hiện`);
      return;
    }

    if (!Ps_UtilObjectService.hasValueString(data.EndDate)) {
      showError(`thiếu ngày hoàn tất`);
      return;
    }

    if (!Ps_UtilObjectService.hasValue(data.PositionApproved) && !data.IsLeaderMonitor && this.Module == 2) {
      showError(`thiếu chức danh duyệt`);
      return;
    }

    if (!Ps_UtilObjectService.hasValue(data.Approved) && !this.isLeader && this.Module == 2) {
      showError(`thiếu nhân sự duyệt`);
      return;
    }

    // if (!Ps_UtilObjectService.hasValue(data.ListOfTypeStaff)) {
    //   showError(`thiếu loại nhân sự áp dụng`);
    //   return;
    // }

    // Kiểm tra trạng thái và lý do
    if (this.checkChangeStatus() && data.Status !== 6 && data.Status !== 4) {
      if (!Ps_UtilObjectService.hasValueString(data.Reason)) {
        showError(`Vui lòng chọn lý do`);
        return;
      }

      if (data.Reason === 104 && !Ps_UtilObjectService.hasValueString(data.ReasonDescription)) {
        showError(`Vui lòng nhập mô tả lý do`);
        return;
      }
    }

    // Gán code nếu thêm mới
    if (option === 'Thêm mới') {
      data.Code = 0;
    }

    // Kiểm tra thay đổi dữ liệu
    if (JSON.stringify(data) === JSON.stringify(this.DataHRDecisionTaskOrigin)) {
      this.handleCloseDrawer();
      return;
    }

    // Reset trạng thái và gọi API
    this.resquestChangeStatus = false;
    this.APIUpdateHRDecisionTask(data);
  }



  /**
   * Get title reason change status
   */
  getTitleReason(status: number) {
    const item = this.listStatusDropdown.find(item => item.Status == status)
    if (item) {
      // Đối với mở lại đầu việc
      if ([1, 3].includes(item.Status)) {
        this.titleReason = "mở lại";
      }
      else {
        this.titleReason = item.StatusName;
      }
    }
  }

  handleGetAction(data) {
    this.DataHRDecisionTask = data.item

    // this.DataHRDecisionTask.DecisionProfile = this.DataHRDecisionProfileMaster.Code
    if (data.status == "Edit") {
      this.isEdit = true
      this.isView = false
      this.isCreate = false
      if (this.DataHRDecisionTask.PositionAssignee) {
        this.isDropdownAssignee = false
      }
    } else {
      this.isEdit = false
      this.isView = true
      this.isCreate = false
    }
    this.statusDrawer = 1
    this.MultiForm = this.onLoadForm();
    this.MultiForm.patchValue(this.DataHRDecisionTask);
    this.DataHRDecisionTaskOrigin = this.MultiForm.value
    this.getTitleReason(this.DataHRDecisionTask.Status)
    this.handleOpenDrawer()
  }

  handleGetNew() {
    // if (data.status == 13) {
    //   this.statusDrawer = 0
    //   this.isEdit = false
    //   this.isView = false
    //   this.isCreate = true
    //   this.MultiForm = this.onLoadForm();
    //   this.MultiForm.patchValue(new DTOHRDecisionTask);
    //   // if(this.DataHRDecisionProfileMaster.Status == 1){
    //   //   this.MultiForm.patchValue({
    //   //     Status: 1
    //   //   })
    //   // }else if(this.DataHRDecisionProfileMaster.Status == 2){
    //   //   this.MultiForm.patchValue({
    //   //     Status: 3
    //   //   })
    //   // }
    //   this.DataHRDecisionTaskOrigin = this.MultiForm.value
    //   this.handleOpenDrawer()
    // }

    this.statusDrawer = 0
    this.isEdit = false
    this.isView = false
    this.isCreate = true
    this.MultiForm = this.onLoadForm();
    const newTask = new DTOHRDecisionTask();
    this.MultiForm.patchValue(newTask);
    // if(this.DataHRDecisionProfileMaster.Status == 1){
    //   this.MultiForm.patchValue({
    //     Status: 1
    //   })
    // }else if(this.DataHRDecisionProfileMaster.Status == 2){
    // this.MultiForm.patchValue({
    //   Status: 3
    // })
    // }
    this.MultiForm.patchValue({
      Status: 3
    })

    this.MultiForm.patchValue({
      ListOfTypeStaff: `[${[2]}]`
    })
    this.DataHRDecisionTaskOrigin = this.MultiForm.value

    this.MultiForm.get('Status').setValue(3);

    this.DecisionProfile.Status = 3;
    this.onGetStatusDropdown();
    this.handleOpenDrawer()
  }

  //#endregion


  //#region HÀM XỬ LÝ CHUNG
  /**
   * Hàm dùng để lấy tổng số lượng đầu việc
   * @param dataItem
   */
  handleGetNumOfTask(dataItem: DTOHRDecisionProfile) {
    if (!Ps_UtilObjectService.hasValue(dataItem)) {
      return 'Trống CV';
    }

    // return dataItem.Total == null ? 0 : dataItem?.TotalTask
  }

  /**
     * Hàm check có hiển thị important không (*)
     * @param field trường tự định nghĩa
     * @returns true nếu hiển thị
     */
  hasImportant(field: string) {
    const selectedCodeReason = this.MultiForm.get('Reason').value;
    const status = this.DataHRDecisionTaskOrigin.Status; // Trạng thái của đầu việc được hiển thị lên drawer
    const condition1 = status == 3 && this.M_A; // "Đang thực hiện"
    const condition2 = [2, 5].includes(status) && this.M_A; // "Không thực hiện" hoặc "Ngưng thực hiện"
    const condition3 = status == 6; // "Hoàn tất"

    // Nếu chỉ có quyền xem hoăc đầu việc ở trạng thái "Hoàn tất"
    if ((!this.M_A && !this.M_C) || condition3) {
      return false;
    };

    switch (field) {

      // Tên đầu việc
      case 'task-name': {
        return this.MultiForm.get('Code').value == 0;
      }

      // Chức danh thực hiện
      case 'position-assignee': {
        return this.MultiForm.get('Code').value >= 0 && ![4, 6].includes(this.DataHRDecisionTaskOrigin.Status);
      }

      // Chức danh phê duyệt
      case 'position-approved': {
        return this.MultiForm.get('Code').value >= 0 && ![4, 6].includes(this.DataHRDecisionTaskOrigin.Status);
      }

      // Duyệt bởi
      case 'approved-by': {
        return this.MultiForm.get('Code').value >= 0 && ![4, 6].includes(this.DataHRDecisionTaskOrigin.Status) && !this.MultiForm.get('IsLeaderMonitor').value;
      }

      // Loại nhân sụ áp dụng
      case 'type-staff': {
        return false;
      }

      // // Hoàn tất Hết ngày
      // case 'end-date': {
      //   return this.MultiForm.get('Code').value >= 0 && ![4, 6].includes(this.MultiForm.get('Status').value);
      // }


      // Thực hiện bởi
      // Hoàn tất hết ngày
      case 'assignee-by':
      case 'end-date': {
        return this.MultiForm.get('Code').value >= 0 && ![4, 6].includes(this.DataHRDecisionTaskOrigin.Status);
      }

      // Lý do chuyển trạng thái
      case 'reason': {
        return this.MultiForm.get('Code').value >= 0 && ![4, 6].includes(this.DataHRDecisionTaskOrigin.Status)
          && this.resquestChangeStatus;
      }

      // Mô tả lý do
      case 'reason-des': {
        return (condition1 || condition2) && selectedCodeReason == 104;
      }

    }
  }

  handleGetSelectingGrid(value: DTOHRDecisionTask[]) {
    this.isSelectingGrid = Ps_UtilObjectService.hasListValue(value);
  }

  /**
   * Code của nhân sự thực hiện
   */
  codeAssignee: number;
  /**
   * Code của nhân sự duyệt
   */
  codeApprove: number;

  /**
   * Hàm dùng để disabled nhân sự duyệt có code = code của nhân sự thực hiện
   * Phục vụ nghiệp vụ nhân sự duyệt không được trùng nhân sự thực hiện
   * @param item 
   * @returns true với item cần disabled
   */
  isItemApproveDisabled = (item: any): boolean => {
    // Item nhân sự duyệt có trùng với nhân sự thực hiện hay không
    const isSame = item.dataItem.Code == this.codeAssignee;
    // Disable item -- Chọn -- hoặc có code == -1(invalid)
    const isInValid = !Ps_UtilObjectService.hasValue(item.dataItem.Code) || item.dataItem.Code == -1;
    // Bản thân người đó không thể duyệt đầu việc được
    const notSelfApprove = item.dataItem.Code == this.DecisionProfile.Staff;
    return isSame || isInValid || notSelfApprove;
  }

  /**
   * Hàm dùng để disabled nhân sự thực hiện có code = code của nhân sự duyệt
   * Phục vụ nghiệp vụ nhân sự duyệt không được trùng nhân sự thực hiện
   * @param item 
   * @returns true với item cần disabled
   */
  isItemAssigneeDisabled = (item: any): boolean => {
    // Item nhân sự thực hiện có trùng với nhân sự duyệt hay không
    const isSame = item.dataItem.Code == this.codeApprove;
    // Disable item -- Chọn -- hoặc có code == -1(invalid)
    const isInValid = !Ps_UtilObjectService.hasValue(item.dataItem.Code) || item.dataItem.Code == -1;
    return isSame || isInValid;
  }


  //#endregion


  //#region Destroy
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }

  //#endregion
}
