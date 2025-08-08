import { HriDecisionApiService } from '../../services/hri-decision-api.service';
import { DTOHRPolicyTask } from '../../dto/DTOHRPolicyTask.dto';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Pipe, PipeTransform, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, distinct, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { DTOStaff, Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOHRPolicyPosition } from '../../dto/DTOHRPolicyPosition.dto';
import { DTOHRPolicyLocation } from '../../dto/DTOHRPolicyLocation.dto';
import { DTOHRPolicyTypeStaff } from '../../dto/DTOHRPolicyTypeStaff.dto';
import { DTOHRPolicyMaster } from '../../dto/DTOHRPolicyMaster.dto';
import { ConfigAPIService } from 'src/app/p-app/p-config/shared/services/config-api.service';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { MarBannerAPIService } from 'src/app/p-app/p-marketing/shared/services/marbanner-api.service';
import { TransitionService } from '../../services/transition.service';
import { PKendoGridComponent } from 'src/app/p-app/p-layout/components/p-kendo-grid/p-kendo-grid.component';
import { TreeListComponent } from '@progress/kendo-angular-treelist';
import { DTOHRDecisionTask } from '../../dto/DTOHRDecisionTask.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOHRDecisionProfile } from '../../dto/DTOHRDecisionProfile.dto';
import { StaffApiService } from '../../services/staff-api.service';
import { DTOListHR } from '../../dto/DTOPersonalInfo.dto';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { DTOEmployee, DTOEmployeeDetail } from '../../dto/DTOEmployee.dto';
import { DTOHRDecisionTaskLog } from '../../dto/DTOHRDecisionTaskLog.dto';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';

type HRPolicyItem = DTOHRPolicyPosition | DTOHRPolicyLocation | DTOHRPolicyTypeStaff;

/**
 * ### Component provide a list of task with required input:
 * - policyMaster: Object policy master
 * - typeApply
 * ### Component provide output:
 * - onClickButtonAdd: Event click buttons Add
 * - onClickToolBox: Event click buttons action in tool box
 * - isSelectingGrid: Event click check box
 * - addedTask: Event click added task
 * - numOfTaskAfterChangeData: Event is called when list policy task change and return number of task after change
 */

@Component({
  selector: 'app-hr-task-boarding',
  templateUrl: './hr-task-boarding.component.html',
  styleUrls: ['./hr-task-boarding.component.scss']
})
export class HrTaskBoardingComponent implements OnInit, OnDestroy {
  //#region Input, Ouput & Variables
  // SUBJECT
  destroy = new Subject<any>(); // Use to unscribe


  // INPUT
  @Input() policyMaster: DTOHRPolicyMaster = new DTOHRPolicyMaster(); // Object policy master
  @Input() typeApplyPosition: number = 1; // Phạm vi áp dụng
  @Input() GridIndex: number = 1; // dùng để phân biệt grid khác nhau trong vòng lập
  @Input() GridIndexSelected: number = null



  /**
    @param typeList typeList | 1 là policy task bên on/off task board |
                               2 là các trang onboard/offboard nhưng ngoài list |
                               3 là trong detail
   */
  @Input({ required: true }) typeList: number = 1; // loại danh sách

  /**
   * Loại boarding với:
   * - 1: ON
   * - 2: OFF
   */
  @Input() typeProfile: number = 1;

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
  @Input() typeData: number = 1;
  @Input() listDecisionTask: DTOHRDecisionTask[]; // list decision task
  @Input() decisionProfile: DTOHRDecisionProfile; // object decision profile
  @Input() decisionTask: DTOHRDecisionTask; // object decision task
  @Input() detailStaff: DTOEmployeeDetail; // Thông tin nhân sự đăn nhập


  // VARIABLE
  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isMaster: boolean = false; // Toàn quyền
  isCreator: boolean = false; // Quyền tạo
  isApprover: boolean = false; // Quyền duyệt
  M_A: boolean = false; // Master and Approver
  M_C: boolean = false; // Master and Creator
  isExpanded: boolean = true; // Column can expand
  isLoading: boolean = false; // loading of list 
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
  selectedPolicyTaskLimit: HRPolicyItem; // Selected policy task limit to delete
  selectable: SelectableSettings = { enabled: true, mode: 'multiple', drag: false, checkboxOnly: true }; // Setting for selection of grid
  selectedRowitemPopupCallback: Function; // Function callback to selecte item in grid
  clearSelectedRowitemCallback: Function; // Function callback to clear selected item
  uploadEventHandlerCallback: Function // Function callback to import list policy task
  pageSize: number = 25; // pageSize in start
  count: number = 0; // Number of selected items
  initiallyExpanded: boolean = true; // Default treelist is expanded or not
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

  /**
   * @param codeConfirmDialog 
    3 - Mở lại | 5 - Ngưng thực hiện | 3 - Thực hiện bởi | 6 - Hoàn tất 
  | 4 - Gửi duyệt | 2 - Không thực hiện
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
  listReason: DTOListHR[] = [];
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
  listSelectItemTask: DTOHRDecisionTask[]
  listItemCanChange: DTOHRDecisionTask[];

  /**
   * Danh sách các API để unscribe khi component bị destroy
   */
  arrSub: Subscription[] = [];


  // STATE AND FILTERS
  gridState: State = { skip: null, take: null, filter: { logic: 'and', filters: [] }, sort: [{ "field": "OrderBy", "dir": "asc" }] } // State
  gridStateTask: State = { filter: { logic: 'and', filters: [] }, sort: [{ "field": "OrderBy", "dir": "asc" }] } // State
  gridStateStaffOrigin: State = { filter: { logic: "and", filters: [] } }
  gridStateStaff: State = { filter: { logic: "and", filters: [] } }
  filterSearchTask: CompositeFilterDescriptor = { logic: 'or', filters: [] } // Filter search

  btnActionDelete = { Name: "Xóa đầu việc", Code: "trash", Type: 'Delete', Link: "delete", Actived: true };
  btnActionAssignee = { Name: "Thực hiện bởi", Code: "user", Type: 'AssigneeBy', Link: "assigneeBy", Actived: true };
  btnActionApprover = { Name: "Duyệt bởi", Code: "paste", Type: 'ApprovedBy', Link: "approvedBy", Actived: true };
  btnActionDone = { Name: "Hoàn tất", Code: "check-circle", Type: 'Success', Link: "6", Actived: true };

  btnActionEdit = { Name: "Chỉnh sửa", Code: "pencil", Type: 'pencil', Link: "pencil", Actived: true };
  btnActionSeen = { Name: "Xem chi tiết", Code: "eye", Type: 'eye', Link: "eye", Actived: true };

  btnActionNo = { Name: "Không thực hiện", Code: "minus-outline", Type: 'NotDo', Link: "2", Actived: true };
  btnActionReOpen = { Name: "Mở lại", Code: "reset", Type: 'Open', Link: "3", Actived: true };
  btnActionSend = { Name: "Gửi duyệt", Code: "redo", Type: 'Sent', Link: "4", Actived: true };
  btnActionStop = { Name: "Ngưng thực hiện", Code: "minus-outline", Type: 'Stop', Link: "5", Actived: true };

  ListActionStatus = [this.btnActionDelete, this.btnActionAssignee, this.btnActionApprover, this.btnActionDone, this.btnActionNo, this.btnActionReOpen, this.btnActionSend, this.btnActionStop];

  @Output() onClickButtonAdd = new EventEmitter() // Event click buttons Add
  @Output() onClickToolBox = new EventEmitter() // Event click buttons action in tool box
  @Output() onSelectingGrid = new EventEmitter() // Event click check box
  @Output() addedTask = new EventEmitter() // Event click added task
  @Output() numOfTaskAfterChangeData = new EventEmitter() // Event is called when list policy task change
  @Output() onClickEditTask = new EventEmitter() // Event click action edit
  @Output() onUpdateTaskList = new EventEmitter() // Event update task list
  @Output() allTaskComplete = new EventEmitter() // Event all task of typeStaff = 1 are complete




  onPageChangeCallback: Function;
  onActionDropDownClickCallback: Function;
  getActionDropdownCallback: Function;
  onSelectedPopupBtnCallback: Function
  getSelectionPopupCallback: Function
  onSelectCallback: Function
  onSortChangeCallback: Function
  //#endregion


  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  @ViewChildren('search') childSearch: any;
  @ViewChildren('grid') childGrid: PKendoGridComponent;
  @ViewChildren('tree') childTree: TreeListComponent;
  @ViewChildren('detailTemplate') childDetailTemplate: ElementRef;
  @ViewChild("remark") valueRemark: TextAreaComponent;
  @ViewChild("dropdownList") valueDropdown: DropDownListComponent;



  constructor(
    public menuService: PS_HelperMenuService,
    private hriDecisionApiService: HriDecisionApiService,
    private layoutService: LayoutService,
    public apiService: ConfigAPIService,
    public layoutApiService: LayoutAPIService,
    public marService: MarBannerAPIService,
    public transitionService: TransitionService,
    public domSanititizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
    private staffService: StaffApiService,
  ) { }


  //#region Lifecycle Hooks
  ngOnInit(): void {
    // Check permission
    let a = this.menuService.changePermission().pipe(takeUntil(this.destroy)).subscribe((res: DTOPermission) => {
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

    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.destroy)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.isLoading = true;
        // Kiểm tra loại danh sách
        // Nếu là danh sách đầu việc của bảng đầu việc
        if (this.typeList == 2) {
          this.gridState.skip = null;
          this.gridState.take = null;

          //Nếu listDecisionTask là input được truyền vào có data
          if (Ps_UtilObjectService.hasListValue(this.listDecisionTask)) {
            this.listTask = { data: this.listDecisionTask, total: this.listDecisionTask.length };
            this.isLoading = false;
          }
        }
      }
    })

    this.clearSelectedRowitemCallback = this.onClearSelection.bind(this);
    this.selectedRowitemPopupCallback = this.onSelectedPopupBtnClick.bind(this);
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this);
    this.onSelectedPopupBtnCallback = this.onSelectionActionItemClick.bind(this);
    this.onSelectCallback = this.onGridItemSelect.bind(this);
    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.onPageChangeCallback = this.onPageChange.bind(this);
    this.onActionDropDownClickCallback = this.onActionDropdownClick.bind(this);

    this.arrSub.push(a, b);
  }


  ngOnDestroy(): void {
    // this.destroy.next();
    // this.destroy.complete();
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
  //#endregion


  //#region API
  /**
   * API dùng để lấy thông tin nhân sự
   * @param code: Code nhân sự
   */
  APIGetEmployeeInfo(code: number) {
    let a = this.staffService.GetEmployeeInfo(code).pipe(takeUntil(this.destroy)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.detailStaff = res.ObjectReturn;
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${res.ErrorString}`);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${error}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách lý do
   */
  APIGetListHR() {
    let enumCode: number;
    if (this.codeConfirmDialog == 3) {
      enumCode = 24;
    }
    else if (this.codeConfirmDialog == 5) {
      enumCode = 23;
    }
    else if (this.codeConfirmDialog == 5) {
      enumCode = 23;
    }
    this.isLoadingReason = true;

    let a = this.staffService.GetListHR(enumCode).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listReason = res.ObjectReturn;
        this.isLoadingReason = false;
      }
      else {
        this.layoutService.onError('Đã xảy ra lỗi khi lấy lý do: ' + res.ErrorString);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy lý do: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * Get List Employee
   */
  APIGetListEmployee() {
    this.isLoadingDropDown = true;

    let a = this.staffService.GetListEmployee(this.gridStateStaff).pipe(takeUntil(this.destroy)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listEmployee = res.ObjectReturn.Data;
        this.originalListEmployee = this.listEmployee;
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách nhân viên: ${res.ErrorString}`)
      }
      this.isLoadingDropDown = false;
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.isLoadingDropDown = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách nhân viên: ${error} `)
    })

    this.arrSub.push(a);
  }

  /**
   * API Cập nhật đầu việc
   * @param listDTO DTOHRDecisionTask[]
   * @param properties string[]
   * @param isHideTask Có ẩn đầu việc chưa thực hiện thuộc loại nhân sự mà nhân sự hiện tại không thể thực hiện hay không 
   */
  APIUpdateListHRDecisionTask(listDTO: DTOHRDecisionTask[], properties: string[], isHideTask: boolean = false, isNotify: boolean = true) {
    this.isLoading = true;
    let a = this.hriDecisionApiService.UpdateListHRDecisionTask(listDTO, properties).pipe(takeUntil(this.destroy)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        if (isNotify) {
          this.layoutService.onSuccess('Cập nhật đầu việc thành công');
        }
        this.toggleClosedDialog();
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
        this.onUpdateTaskList.emit(true);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật đầu việc: ` + res.ErrorString);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật đầu việc: ` + err);
    });

    this.arrSub.push(a);
  }


  //#region Hàm dùng chung 
  /**
   * Hàm dùng để tính còn bao nhiêu tiếng nữa hết ngày
   * @returns số giờ còn lại
   */
  handleGetHoursUntilEndOfDay(): number {
    const now = new Date(); // Lấy thời gian hiện tại
    const endOfDay = new Date(now); // Sao chép thời gian hiện tại
    endOfDay.setHours(23, 59, 59, 999); // Đặt thời gian thành cuối ngày (23:59:59.999)

    // Tính chênh lệch thời gian theo milliseconds
    const diffInMilliseconds = endOfDay.getTime() - now.getTime();

    // Chuyển đổi từ milliseconds sang giờ và làm tròn xuống
    const hoursRemaining = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    return hoursRemaining;
  }

  /**
   * Display button of exception
   * @param type button delete or stop
   * @returns true if availabel 
   */
  onCheckDisplayButtonException(type: string): boolean {
    // Chỉ quyền xem
    const canViewOnly = !this.isApprover && !this.isMaster && !this.isCreator;
    if (canViewOnly) {
      return false;
    }

    const creatorOrMaster = this.isCreator || this.isMaster;
    const approverOrMaster = this.isApprover || this.isMaster;

    // Đối với nút Xóa
    if (type === 'delete') {
      return (
        (this.policyMaster.Status === 0 || this.policyMaster.Status === 4) && creatorOrMaster ||
        this.policyMaster.Status === 1 && approverOrMaster
      );
    }

    // Đối với nút ngưng hiển thị
    if (type === 'stop') {
      return this.policyMaster.Status === 2 && (this.isApprover || this.isMaster);
    }

    return false;
  }


  /**
   * Hàm kiểm tra phân quyền để show UI của policy task list
   */
  checkViewOfPermission(): { [key: string]: boolean } {
    const isView = (this.selectable.enabled == false);

    return {
      'viewDT': isView
    };
  }


  /**
   * Display group button add
   * @returns true if availabel
   */
  onCheckDisplayGroupButtonAdd() {
    if (!this.isApprover && !this.isMaster && !this.isCreator) {
      return false;
    }
    return true;
  }


  /**
   * This function provide optional output whenever click on buttons add
   * @param button Type of button is ExistingTask or NewTask. 
   * - 10 is 'Thêm đầu việc có sẵn'
   * - 11 is 'Thêm đầu việc từ bảng đầu việc khác'
   * - 12 is 'Thêm mới đầu việc policy'
   * - 13 is 'Thêm mới đầu việc decision'

   */
  onClickButtonHeader(button: 10 | 11 | 12 | 13) {
    if (button !== 13) {
      if (button == 10 || button == 11) {
        this.isOpenDialogAddTask = true;
      }
      this.onClickButtonAdd.emit({ item: new DTOHRPolicyTask(), status: button });
    }
    else {
      this.onClickButtonAdd.emit({ item: new DTOHRDecisionTask(), status: button });
    }
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
   * This function identifies the input object as DTOHRPolicyLocation, DTOHRPolicyPosition, or DTOHRPolicyTypeStaff or DTOHRDecisionTask
   * @param dto object to identify
   * @returns the type of the object as a string
   */
  onIdentifyDTO(dto: DTOHRPolicyPosition | DTOHRPolicyLocation | DTOHRPolicyTypeStaff | DTOHRDecisionTask): string {
    if (!dto) { return 'Unknown'; }

    // Nếu là DTOHRPolicyPosition
    if ('PositionName' in dto && Ps_UtilObjectService.hasValueString(dto['PositionName'])) {
      return 'DTOHRPolicyPosition';
    }

    // Nếu là DTOHRPolicyLocation
    if ('LocationName' in dto && Ps_UtilObjectService.hasValueString(dto['LocationName'])) {
      return 'DTOHRPolicyLocation';
    }

    // Nếu là DTOHRPolicyTypeStaff
    if ('TypeStaffName' in dto && dto['PositionName'] == null && dto['LocationName'] == null && Ps_UtilObjectService.hasValueString(dto['TypeStaffName'])) {
      return 'DTOHRPolicyTypeStaff';
    }

    // Nếu là DTOHRDecisionTask
    if ('ListHRDecisionProfile' in dto && dto['PositionName'] == null && dto['LocationName'] == null && Ps_UtilObjectService.hasValueString(dto['TypeStaffName'])) {
      return 'DTOHRDecisionTask';
    }

    return 'Unknown';
  }

  //Kiểm tra đó là dto gì
  public isDTOCheck(item: any, isWhatDTO: 'DTOHRDecisionTask'): item is DTOHRDecisionTask;
  public isDTOCheck(item: any, isWhatDTO: 'DTOHRPolicyTask'): item is DTOHRPolicyTask;
  public isDTOCheck(item: any, isWhatDTO: 'DTOHRDecisionProfile'): item is DTOHRDecisionProfile;
  public isDTOCheck(item: any, isWhatDTO: string): boolean {
    if (!item) {
      return false;
    }
    switch (isWhatDTO) {
      case 'DTOHRDecisionTask':
        return 'ListChild' in item;
      case 'DTOHRPolicyTask':
        return 'HasException' in item;
      case 'DTOHRDecisionProfile':
        return 'ListStatusTask' in item;
      default:
        return false;
    }
  }

  /**
   * This function is called when want to get icon base on DTO
   * @param dto object want to check DTO
   * @returns class of kendo icon
   */
  getIconByDTO(dto: HRPolicyItem): string {
    if (this.onIdentifyDTO(dto) === 'DTOHRPolicyPosition') {
      return 'user';
    }
    if (this.onIdentifyDTO(dto) === 'DTOHRPolicyLocation') {
      return 'location-dot';
    }
    if (this.onIdentifyDTO(dto) === 'DTOHRPolicyTypeStaff') {
      return 'user-group';
    }
    return 'triangle-exclamation';
  }

  /**
   * This function is called when want to get name of obj but don't know what type of obj
   * @returns obj.PositionName | obj.LocationName | obj.TypeStaffName
   */
  getNameDTO() {
    const obj = this.selectedPolicyTaskLimit;
    if (this.onIdentifyDTO(obj) === 'DTOHRPolicyPosition') {
      return obj['PositionName'];
    }
    else if (this.onIdentifyDTO(obj) === 'DTOHRPolicyLocation') {
      return obj['LocationName'];
    }
    else if (this.onIdentifyDTO(obj) === 'DTOHRPolicyTypeStaff') {
      return obj['TypeStaffName'];
    }
    return 'Ngoại lệ';
  }

  // Sự kiện khi click ra ngoài màn hình
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.tool-box')) {
      this.seletedToolBox = null;
      const cell9s = document.querySelectorAll('td.k-table-td[aria-colindex="9"]');
      cell9s?.forEach(cell => cell.classList.remove('active'));
      const cell10s = document.querySelectorAll('td.k-table-td[aria-colindex="10"]');
      cell10s?.forEach(cell => cell.classList.remove('active'));
    }

    if ((event.target as HTMLElement).closest('.exception')) {
      const spanElement = event.target as HTMLElement;
      const targetCode = spanElement?.getAttribute('code-task');

      const cell0s = document.querySelectorAll('td.k-table-td[aria-colindex="1"]');
      cell0s.forEach(cell => {
        const aElement = cell.querySelector('a');
        if (aElement) {
          if (aElement.getAttribute('code-task') === targetCode) {
            aElement.click();
          }
        }
      })


    }
  }

  /**
  * Hàm kiểm tra xem người đó có quyền hoàn tất hoặc gửi duyệt đầu việc hay không 
  * @param task đầu việc
  * @param type Thực hiện bởi hay Duyệt bởi
  * @returns true nếu có thể
  */
  isPersonalDoTask(task: DTOHRDecisionTask, type: 'Assignee' | 'Approved' = 'Assignee') {
    let PermissionUpdateStatusAssignee = this.detailStaff.Code == task.Assignee // quyền của người thực hiện bởi
    let PermissionUpdateStatusAssigneeForProfile = this.detailStaff.Code == task.DecisionProfile // quyền của cập nhật của nhân sự áp dụng
    let PermissionUpdateStatusApproved = this.detailStaff.Code == task.Approved // quyền của người duyệt bởi
    let PermissionUpdateStatusApprovedForIsLeaderMonitor = this.detailStaff.IsLeader && this.detailStaff.Department == task.Department
      || this.detailStaff.IsSupervivor && this.detailStaff.Department == task.Department
      && this.detailStaff.Location == task.Location  // quyền của người duyệt bởi

    // Thực hiện bởi
    if (type == 'Assignee') {
      if (task.TypeAssignee == 3) {
        // Nếu là nhân sự áp dụng
        return PermissionUpdateStatusAssigneeForProfile
      }
      // Nếu là chức danh
      return PermissionUpdateStatusAssignee
    }

    // Duyệt bởi
    else if (type == 'Approved') {
      // Nếu không phải trưởng đơn vị và quản lý điểm làm việc
      if (!task.IsLeaderMonitor) {
        return PermissionUpdateStatusApproved
      }
      else {
        return PermissionUpdateStatusApprovedForIsLeaderMonitor;
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Tab' && this.count > 0) {
      event.preventDefault();
    }
  }

  /**
   * This function make dialog add task close. value.num == 1 => call api
   * @param e 
   */
  closeDialogAddTask(value: { num: number, tasks: DTOHRPolicyTask[] }) {
    this.isOpenDialogAddTask = false;
    if (value.num == 1) {
      this.expandedDetailKeys = [];
      this.afterAddedTask = true;
      const listTemp = this.listTask.data;
      this.listTask.data = [];
      this.listTask.total = listTemp.length;

      listTemp.forEach(item => {
        this.listTask.data.push(item);
      })
    }
  }

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
   * Hàm đổi màu chữ và icon nếu quá hạn
   */
  getColorExpired(isOverDue: boolean): string {
    return isOverDue ? 'rgba(235, 39, 58, 1)' : 'black';
  }

  /**
   * Hàm trả về true nếu task bị quá hạn
   */
  checkExpired(isOverDue: boolean): boolean {
    if (isOverDue) {
      return true;
    }
    return false;
  }

  /**
   * Hàm tính số ngày còn lại của task
   */
  getLeftDateTask(endDate: string): number {
    const end = new Date(endDate);
    const currentDate = new Date(this.currentDate);

    // Đặt thời gian của cả hai ngày thành nửa đêm
    end.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Tính số ngày khác biệt
    const diffInTime = end.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays;
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
   * Hàm lấy danh sách action tùy vào nhân sự thực hiện và duyệt
  @param task đầu việc
  @param 
    btnActionDelete = { Name: "Xóa đầu việc", Code: "trash", Type: 'Delete', Link: "delete", Actived: true };
    btnActionAssignee = { Name: "Thực hiện bởi", Code: "user", Type: 'AssigneeBy', Link: "assigneeBy", Actived: true };
    btnActionApprover = { Name: "Duyệt bởi", Code: "paste", Type: 'ApprovedBy', Link: "approvedBy", Actived: true };
    btnActionDone = { Name: "Hoàn tất", Code: "check-circle", Type: 'Success', Link: "6", Actived: true };
    
    btnActionEdit = { Name: "Chỉnh sửa", Code: "pencil", Type: 'pencil', Link: "pencil", Actived: true };
    btnActionSeen = { Name: "Xem chi tiết", Code: "eye", Type: 'eye', Link: "eye", Actived: true };

    btnActionNo = { Name: "Không thực hiện", Code: "minus-outline", Type: 'NotDo', Link: "2", Actived: true };
    btnActionReOpen = { Name: "Mở lại", Code: "reset", Type: 'Open', Link: "3", Actived: true };
    btnActionSend = { Name: "Gửi duyệt", Code: "redo", Type: 'Sent', Link: "4", Actived: true };
    btnActionStop = { Name: "Ngưng thực hiện", Code: "minus-outline", Type: 'Stop', Link: "5", Actived: true };
   */
  getActionList(task: DTOHRDecisionTask): { Name: string; Code: string; Type: string; Link: string; Actived: boolean; }[] {
    let listAction: { Name: string; Code: string; Type: string; Link: string; Actived: boolean; }[] = []; // Khởi tạo danh sách lọc rỗng
    let PermissionUpdateStatusAssignee = this.detailStaff.Code == task.Assignee // quyền của người thực hiện bởi
    let PermissionUpdateStatusAssigneeForProfile = this.detailStaff.Code == task.DecisionProfile // quyền của cập nhật của nhân sự áp dụng
    let PermissionUpdateStatusApproved = this.detailStaff.Code == task.Approved // quyền của người duyệt bởi
    let PermissionUpdateStatusApprovedForIsLeaderMonitor = this.detailStaff.IsLeader && this.detailStaff.Department == task.Department
      || this.detailStaff.IsSupervivor && this.detailStaff.Department == task.Department
      && this.detailStaff.Location == task.Location  // quyền của người duyệt bởi
    const codeStatus = task.ListHRDecisionTaskLog[0].Status;

    // Đảm bảo list log được sắp xếp theo thời gian tạo mới nhất
    task.ListHRDecisionTaskLog.sort((a, b) => {
      const dateA = new Date(a.CreatedTime).getTime();
      const dateB = new Date(b.CreatedTime).getTime();
      return dateB - dateA; // Sắp xếp giảm dần
    });

    const statusMap = new Map<number, number[]>([
      [1, [...(this.isApprover || this.isMaster ? [2] : [])]], // Chưa thực hiện, Không thực hiện
      [2, [...(this.isApprover || this.isMaster ? [3] : [])]], // Không thực hiện, Đang thực hiện
      [3, this.typeData === 3
        ? [...new Set([...(this.isApprover || this.isMaster ? [5] : []), ...(PermissionUpdateStatusAssigneeForProfile || PermissionUpdateStatusAssignee ? [6] : [])])]
        : this.typeData === 4 ? [...new Set([...(this.isApprover || this.isMaster ? [5] : []), ...(PermissionUpdateStatusAssignee ? [4] : [])])] : []
      ],
      [4, [...(task.TypeAssignee == 2 && PermissionUpdateStatusApproved
        || task.IsLeaderMonitor && PermissionUpdateStatusApprovedForIsLeaderMonitor ? [6] : [])]], // Chờ duyệt, Hoàn tất
      [5, [...(this.isApprover || this.isMaster ? [3] : [])]], // Ngưng thực hiện, Đang thực hiện
      [6, []] // Hoàn tất
    ]);

    if (Ps_UtilObjectService.hasValue(task.ListHRDecisionTaskLog[0].Status)) {
      const listActionUpdateStatus = statusMap.get(task.ListHRDecisionTaskLog[0].Status) || [];
      let temp = this.ListActionStatus.slice();
      listAction = temp.filter(action => listActionUpdateStatus.includes(Number(action.Link))
      );
    }

    // Nếu có toàn quyền và quyền duyệt
    // và đầu việc chưa hoàn tất và chờ duyệt
    if (this.M_A && ![4, 6].includes(task.ListHRDecisionTaskLog[0].Status)) {
      listAction.unshift(this.btnActionEdit);
    }
    // Nếu không thì xem
    else {
      listAction.unshift(this.btnActionSeen);
    }

    return listAction;
  }


  //#endregion


  //#region Filter
  /**
   * - This function will return list filters in CompositeFilterDescriptor
   * - Field to compare is defined at hr-task-list component
   * @param event 
   */
  handleSearchTask(event: any) {
    if (!Ps_UtilObjectService.hasValueString(event.filters[0]?.value)) {
      this.filterSearchTask.filters = [];
    }
    else {
      this.filterSearchTask.filters = event.filters;
    }
  }


  // Init State


  //#region Xử lý list
  /**
   * Hàm nhận giá trị từ grid khi item được chọn
   * @param isSelected 
   */
  onGridItemSelect(ListSelected: DTOHRDecisionTask[]) {
    this.isSelectingItemGrid = Ps_UtilObjectService.hasListValue(ListSelected);
    this.onSelectingGrid.emit(ListSelected);
  }


  /**
   * Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
   * @param arrItem 
   * @returns MenuDataItem[]
   */
  getSelectionPopupAction(arrItem: any[]) {
    if (arrItem.length > 0) {
      this.GridIndexSelected = this.GridIndex
    }
    else {
      this.GridIndexSelected = null
    }

    // Với quy trình On/Offboard
    let listAction: any[] = [];
    let itemStatus = 0;

    arrItem.find(item => {
      itemStatus = item.ListHRDecisionTaskLog[0].Status;
      // Nếu đầu việc chưa hoàn tất và không phải hệ thống thực hiện
      if (itemStatus !== 6 && item.TypeAssignee == 2) {
        if (this.handleCheckItemList(listAction, "Thực hiện bởi") && this.M_A) {
          listAction.push(this.btnActionAssignee);
        }
      }
      // Nếu profile là offboard
      if (this.typeProfile == 2) {
        if (this.handleCheckItemList(listAction, "Duyệt bởi") && this.M_A) {
          listAction.push(this.btnActionApprover);
        }
      }
      // Đầu việc đang ở trạng thái: Đang thực hiện
      if (itemStatus == 3) {
        if (this.handleCheckItemList(listAction, "Ngưng thực hiện") && this.M_A) {
          listAction.push(this.btnActionStop);
        }
        //Nếu profile là onboard
        if (this.typeProfile == 1) {
          if (this.handleCheckItemList(listAction, "Hoàn tất") && this.isPersonalDoTask(item)) {
            listAction.push(this.btnActionDone);
          }
        }
        //Nếu profile là offboard
        else if (this.typeProfile == 2) {
          if (this.handleCheckItemList(listAction, "Gửi duyệt") && this.isPersonalDoTask(item)) {
            listAction.push(this.btnActionSend);
          }
        }
      }
      // Đầu việc đang ở trạng thái: Không thực hiện hoặc Ngưng thực hiện
      else if ([2, 5].includes(itemStatus)) {
        if (this.handleCheckItemList(listAction, "Mở lại") && this.M_A) {
          listAction.push(this.btnActionReOpen);
        }
      }
      // Đầu việc đang ở trạng thái: Chờ duyệt
      else if (itemStatus == 4) {
        if (this.handleCheckItemList(listAction, "Duyệt") && this.isPersonalDoTask(item, 'Approved')) {
          listAction.push(this.btnActionDone);
        }
      }
      // Đầu việc đang ở trạng thái: Chưa thực hiện
      else if (itemStatus == 1) {
        if (this.handleCheckItemList(listAction, "Không thực hiện") && this.M_A) {
          listAction.push(this.btnActionNo);
        }

      }
    })

    // Đảm bảo "Thực hiện bởi" và "Duyệt bởi" nằm cuối cùng
    listAction = listAction.filter(action => action.Name !== "Thực hiện bởi" && action.Name !== "Duyệt bởi")
      .concat(
        listAction.filter(action => action.Name === "Thực hiện bởi" || action.Name === "Duyệt bởi")
      );

    this.addDividerBeforeUserBox();
    return listAction;

  }

  /**
   * Hàm kiểm tra list action đã có action đó chưa?
   */
  handleCheckItemList(listItem: any[], name: string): boolean {
    return !listItem.some(item => item.Name === name);
  }

  /**
   * Hàm dùng để thực hiện các action trên popup chọn nhiều
   * @param btnType loại button
   * @param listSelectedItem danh sách item được chọn
   * @param value 
   */
  onSelectionActionItemClick(btnType: string, listSelectedItem: any[], value: any) {
    let listName: string[] = [];
    let listAssignee: { Code: number, Text: string }[] = [];
    let listApprove: { Code: number, Text: string }[] = [];
    this.listSelectItemTask = listSelectedItem;

    // Chọn xóa đầu việc
    if (btnType === 'Delete') {
      // Khi ở task list policy
      this.selectedRowitem = listSelectedItem;
      this.isOpenPopupConfirmDelete = true;
    }

    // Chọn mở lại
    else if (btnType === 'Open') {
      this.codeConfirmDialog = 3;
      listSelectedItem.map(item => listName.push(item.FullName))

      this.APIGetListHR();
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

    // Chọn ngưng thực hiện
    else if (btnType === 'Stop') {
      this.codeConfirmDialog = 5;
      listSelectedItem.map(item => listName.push(item.FullName))

      this.APIGetListHR();
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

    // Chọn không thực hiện
    // else if (btnType === 'NotDo') {
    //   this.codeConfirmDialog = 2;
    //     listSelectedItem.map(item => listName.push(item.FullName))

    //   this.APIGetListHR();
    //   this.listNameSelected = this.formatListName(listName);
    //   this.isConfirmDialogShow = true;
    // }

    // Chọn thực hiện bởi
    else if (btnType === 'AssigneeBy') {
      this.codeConfirmDialog = 7;
      this.handleChangeSelectDropdown();
      listSelectedItem.forEach(item => {
        // Nếu đầu việc không phải do hệ thống hoặc nhân sự áp dụng thực hiện
        if (item.TypeAssignee == 2) {
          // Kiểm tra nếu item.PositionAssignee đã tồn tại trong listAssignee
          const isDuplicate = listAssignee.some(assignee => assignee.Code === item.PositionAssignee);
          if (!isDuplicate) {
            // Nếu chưa tồn tại, push item mới vào listAssignee
            listAssignee.push({
              Code: item.PositionAssignee,
              Text: item.AssigneePositionName
            });
          }
        }
      });

      listSelectedItem.map(item => listName.push(item.FullName + ' - ' + item.StaffID));

      // this.APIGetListEmployee();
      this.listPositionAssignee = listAssignee;
      this.listNameSelected = this.formatListName(listName);
      this.isChangedDialogShow = true;
    }

    // Chọn duyệt bởi
    else if (btnType === 'ApprovedBy') {
      this.codeConfirmDialog = 8;
      this.handleChangeSelectDropdown();
      listSelectedItem.map(item => {
        const isDuplicate = listApprove.some(approve => approve.Code === item.PositionApproved);
        if (!isDuplicate) {
          // Nếu chưa tồn tại, push item mới vào listApprove
          listApprove.push({
            Code: item.PositionApproved,
            Text: item.ApprovedPositionName
          });
        }
      });

      listSelectedItem.map(item => listName.push(item.FullName + ' - ' + item.StaffID));


      // this.APIGetListEmployee();
      this.listPositionApprove = listApprove;
      this.listNameSelected = this.formatListName(listName);
      this.isChangedDialogShow = true;
    }

    // Chọn gửi duyệt
    else if (btnType === 'Sent') {
      listSelectedItem.map(item => listName.push(item.FullName + ' - ' + item.StaffID));

      this.codeConfirmDialog = 4;
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }

    // Chọn hoàn tất
    else if (btnType === 'Success') {
      listSelectedItem.map(item => listName.push(item.FullName + ' - ' + item.StaffID));

      this.codeConfirmDialog = 6;
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }

    // Chọn duyệt
    else if (btnType === 'Approve') {
      listSelectedItem.map(item => listName.push(item.FullName + ' - ' + item.StaffID));

      this.codeConfirmDialog = 6;
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }
  }

  /**
   * Hàm dùng để thêm class vào cho tr của grid
   * @param context 
   * @returns 
   */
  rowCallback = (context: RowClassArgs) => {
    if (Ps_UtilObjectService.hasListValue(context.dataItem.ListHRDecisionTaskLog)) {
      return {
        'item-send': context.dataItem.ListHRDecisionTaskLog[0]?.Status == 4,
        'item-complete': context.dataItem.ListHRDecisionTaskLog[0]?.Status == 6,
        'item-stop': context.dataItem.ListHRDecisionTaskLog[0]?.Status == 2
          || context.dataItem.ListHRDecisionTaskLog[0]?.Status == 5
      };
    }
  };

  /**
   * Hàm dùng để thêm class vào cho grid
   * @returns 
   */
  handleSetClassGrid = () => {
    return {
      'grid-type-1': this.typeApplyPosition === 1,
      'grid-type-2': this.typeApplyPosition === 2,
      'grid-onboarding': this.policyMaster.TypeData === 1,
      'grid-offboarding': this.policyMaster.TypeData === 2,
      'grid-noinput': this.policyMaster.Status === 2 || this.policyMaster.Status === 3,
      'grid-approve': this.policyMaster.Status === 2,
      'grid-stop': this.policyMaster.Status === 3,
      'selecting-item': this.isSelectingItemGrid,
      'grid-typeData-1': this.typeData == 1,
      'grid-typeData-2': this.typeData == 2,
      'grid-typeData-3': this.typeData == 3,
      'grid-typeData-4': this.typeData == 4,
      'grid-typeData-5': this.typeData == 5,
      'grid-typeData-6': this.typeData == 6,
      'grid-typeData-7': this.typeData == 7,
      'grid-typeData-8': this.typeData == 8,
    };
  };

  /**
  * Hàm dùng để thêm class vào cho tr của treelist
  * @param context 
  * @returns 
  */
  handleSetClassRowTreeList = (context: RowClassArgs) => {
    return {
      'row-level-1': context.dataItem.Level === 1
    }
  }




  /**
   * Clear list policy task into []
   */
  handleClearListPolicyTask() {
    this.listTask = { data: [], total: 0 };
  }

  /**
   * Have task exception?
   * @param task task want to check exception
   * @returns true or false
   */
  hasException(task: DTOHRPolicyTask) {
    // If policy has task exception
    if (task.HasException) {
      return true;
    }
    return false;
  }

  /**
   * This function is called when want to get number of list staff type
   * @param task task want to check
   * @returns number of list staff type
   */
  getNumOfListStaffType(task: DTOHRPolicyTask) {
    if (task && Ps_UtilObjectService.hasListValue(task.ListStaffType)) {
      const count: number = task.ListStaffType.length;
      return count;
    }
    return 0;
  }

  /**
 * Tính số ngày hoặc giờ còn lại trước khi đến hạn.
 *
 * @returns {string} - Trả về chuỗi số ngày hoặc số giờ còn lại. Nếu đã hết hạn, trả về "Đã hết hạn".
 * 
 * - Nếu thời gian còn lại >= 1 ngày: Trả về số ngày (ví dụ: "4 ngày").
 * - Nếu thời gian còn lại < 1 ngày: Trả về số giờ (ví dụ: "8 giờ").
 * - Nếu hết hạn (thời gian hiện tại vượt quá EndDate): Trả về "Đã hết hạn".
 */
  getRemainingDate(item): string {
    const endDate = new Date(item.EndDate); // Lấy giá trị EndDate từ form
    const now = new Date(); // Ngày hiện tại
    const diffInMs = endDate.getTime() - now.getTime(); // Khoảng cách tính bằng milliseconds

    if (diffInMs <= 0) {
      return 'Đã hết hạn';
    }

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Chuyển đổi milliseconds sang giờ
    const diffInDays = Math.floor(diffInHours / 24); // Chuyển đổi giờ sang ngày

    if (diffInDays >= 1) {
      return `${diffInDays} ngày`;
    } else {
      return `${diffInHours} giờ`;
    }
  }

  /**
   * This function provides an available action list for a DTOHRPolicyTask that can handle it
   * @returns list of actions
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOHRDecisionTask): MenuDataItem[] {
    let listAction: { Name: string; Code: string; Type: string; Link: string; Actived: boolean; }[] = []; // Khởi tạo danh sách lọc rỗng
    let PermissionUpdateStatusAssignee = this.detailStaff.Code == dataItem.Assignee // quyền của người thực hiện bởi
    let PermissionUpdateStatusAssigneeForProfile = this.detailStaff.Code == dataItem.DecisionProfile // quyền của cập nhật của nhân sự áp dụng
    let PermissionUpdateStatusApproved = this.detailStaff.Code == dataItem.Approved // quyền của người duyệt bởi
    let PermissionUpdateStatusApprovedForIsLeaderMonitor = this.detailStaff.IsLeader && this.detailStaff.Department == dataItem.Department
      || this.detailStaff.IsSupervivor && this.detailStaff.Department == dataItem.Department
      && this.detailStaff.Location == dataItem.Location  // quyền của người duyệt bởi
    const codeStatus = dataItem.ListHRDecisionTaskLog[0].Status;

    // Đảm bảo list log được sắp xếp theo thời gian tạo mới nhất
    dataItem.ListHRDecisionTaskLog.sort((a, b) => {
      const dateA = new Date(a.CreatedTime).getTime();
      const dateB = new Date(b.CreatedTime).getTime();
      return dateB - dateA; // Sắp xếp giảm dần
    });

    const statusMap = new Map<number, number[]>([
      [1, [...(this.isApprover || this.isMaster ? [2] : [])]], // Chưa thực hiện, Không thực hiện
      [2, [...(this.isApprover || this.isMaster ? [3] : [])]], // Không thực hiện, Đang thực hiện
      [3, this.typeData === 3
        ? [...new Set([...(this.isApprover || this.isMaster ? [5] : []), ...(PermissionUpdateStatusAssigneeForProfile ? [6] : [])])]
        : this.typeData === 4 ? [...new Set([...(this.isApprover || this.isMaster ? [5] : []), ...(PermissionUpdateStatusAssignee ? [4] : [])])] : []
      ],
      [4, [...(dataItem.TypeAssignee == 2 && PermissionUpdateStatusApproved
        || dataItem.IsLeaderMonitor && PermissionUpdateStatusApprovedForIsLeaderMonitor ? [6] : [])]], // Chờ duyệt, Hoàn tất
      [5, [...(this.isApprover || this.isMaster ? [3] : [])]], // Ngưng thực hiện, Đang thực hiện
      [6, []] // Hoàn tất
    ]);

    if (Ps_UtilObjectService.hasValue(dataItem.ListHRDecisionTaskLog[0].Status)) {
      const listActionUpdateStatus = statusMap.get(dataItem.ListHRDecisionTaskLog[0].Status) || [];
      let temp = this.ListActionStatus.slice();
      listAction = temp.filter(action => listActionUpdateStatus.includes(Number(action.Link))
      );
    }

    // Nếu có toàn quyền và quyền duyệt
    // và đầu việc chưa hoàn tất và chờ duyệt
    // và có quyền cập nhật trạng thái của người thực hiện và người duyệt thì được phép chỉnh sửa
    if (this.M_A && ![4, 6].includes(dataItem.ListHRDecisionTaskLog[0].Status)) {
      listAction.unshift(this.btnActionEdit);
    }
    // Nếu không thì xem
    else {
      listAction.unshift(this.btnActionSeen);
    }

    return listAction;
  }

  /**
   * Hàm xử lý thêm div divider trước "Thực hiện bởi", "Duyệt bởi"
   */
  addDividerBeforeUserBox(): void {
    // Tìm và xóa tất cả các phần tử cũ có class 'divider-add'
    const dividersOld = this.el.nativeElement.querySelectorAll('.divider-add');
    dividersOld.forEach((divider: HTMLElement) => {
      const parent = divider.parentNode;
      if (parent) {
        this.renderer.removeChild(parent, divider);
      }
    });

    setTimeout(() => {
      const boxBtns = this.el.nativeElement.querySelectorAll('.box.box-btn');
      for (let i = 0; i < boxBtns.length; i++) {
        const boxBtn = boxBtns[i] as HTMLElement;
        if (boxBtn.querySelector('.k-i-user')) {
          const divider = this.renderer.createElement('div');
          this.renderer.addClass(divider, 'divider-add');
          const parent = boxBtn.parentNode;
          if (parent) {
            this.renderer.insertBefore(parent, divider, boxBtn);
          }
          break; // Dừng vòng lặp sau khi đã thêm divider
        }
      }
    }, 1);
  }



  /**
   * Check xem có thể dùng check box để xóa đầu việc hay không
   * @returns true nếu có thể
   */
  onCheckDeletableTask() {
    if (this.policyMaster.Status === 0 || this.policyMaster.Status === 4) {
      if (this.isCreator || this.isMaster) {
        return true;
      }
    }

    if (this.policyMaster.Status === 1) {
      if (this.isApprover || this.isMaster) {
        return true;
      }
    }

    return false;
  }

  /**
   * The event onclick on action dropdown list callback function
   * @param action button action is clicked
   * @param item task will be handle
   */
  onActionDropdownClick(action: MenuDataItem, item: DTOHRPolicyTask | DTOHRDecisionTask) {
    let listName: string[] = [];
    this.listSelectItemTask = [];

    this.listSelectItemTask = this.listSelectItemTask as DTOHRDecisionTask[];
    this.listSelectItemTask.push(item as DTOHRDecisionTask);


    if (action.Code === 'trash') {

      let listItem: DTOHRDecisionTask[] = [];
      this.isDecisionTaskToDelete = true;
      this.seletedTaskToDelete = item as DTOHRDecisionTask;
      listItem.push(item as DTOHRDecisionTask);
      this.selectedRowitem = listItem

      this.isOpenPopupConfirmDelete = true;
    }

    else if (action.Code === 'pencil') {
      this.onClickEditTask.emit({ item: item as DTOHRDecisionTask, status: 'Edit' })

    }

    else if (action.Code === 'eye') {
      this.onClickEditTask.emit({ item: item as DTOHRDecisionTask, status: 'View' })

    }

    else if (action.Code === 'reset') {
      this.codeConfirmDialog = 3;
      item = item as DTOHRDecisionTask;
      listName.push(item.FullName);
      this.APIGetListHR();
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

    else if (action.Code === 'minus-outline') {
      this.codeConfirmDialog = 5;
      item = item as DTOHRDecisionTask
      listName.push(item.FullName);
      this.APIGetListHR();
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

    else if (action.Code === 'check-circle') {
      this.codeConfirmDialog = 6;
      item = item as DTOHRDecisionTask;
      listName.push(item.FullName + ' - ' + item.StaffID);
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }
    else if (action.Code === 'redo') {
      this.codeConfirmDialog = 4;
      item = item as DTOHRDecisionTask;
      listName.push(item.FullName + ' - ' + item.StaffID);
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }
    // else if (action.Code === 'close-outline') {
    //   listName.push(this.decisionProfile.FullName);
    //   this.codeConfirmDialog = 8;
    //   this.APIGetListHR();
    //   this.listNameSelected = this.formatListName(listName);
    //   this.isConfirmDialogShow = true;
    // }
  }

  /**
   * This function is called whenever toggle on toolbox (...)
   * @param dataItem task is handled
   */
  toggleToolBox(dataItem: DTOHRPolicyTask) {
    if (this.seletedToolBox !== dataItem) {
      this.seletedToolBox = dataItem;
    } else {
      this.seletedToolBox = null;
    }

    // Remove 'active' class from all cells
    const cell9s = document.querySelectorAll('td.k-table-td[aria-colindex="9"]');
    cell9s.forEach(cell => cell.classList.remove('active'));

    const cell10s = document.querySelectorAll('td.k-table-td[aria-colindex="10"]');
    cell10s.forEach(cell => cell.classList.remove('active'));

    const cell11s = document.querySelectorAll('td.k-table-td[aria-colindex="11"]');
    cell11s.forEach(cell => cell.classList.remove('active'));

    // Add 'active' class to the clicked cell
    const cell9 = (event.target as HTMLElement).closest('td.k-table-td[aria-colindex="9"]');
    if (cell9) {
      cell9.classList.add('active');
    }

    // Add 'active' class to the clicked cell
    const cell10 = (event.target as HTMLElement).closest('td.k-table-td[aria-colindex="10"]');
    if (cell10) {
      cell10.classList.add('active');
    }

    // Add 'active' class to the clicked cell
    const cell11 = (event.target as HTMLElement).closest('td.k-table-td[aria-colindex="11"]');
    if (cell11) {
      cell11.classList.add('active');
    }
  }

  /**
   * The event is called whenever wanna close popup confirm delete 
   */
  closePopupConfirmDeleteTask() {
    this.isOpenPopupConfirmDelete = false;
    this.seletedTaskToDelete = null;
    this.selectedPolicyTaskLimit = null;
    this.selectedTaskDeleteException = null;
    this.isDecisionTaskToDelete = false;
    this.selectedRowitem = [];
  }

  /**
   * The event is called whenever wanna delete task
   */
  handleDeleteListPolicyTask() {
    let listDeletePolicyTask: DTOHRPolicyTask[] = [];
    if (this.seletedTaskToDelete) {
      listDeletePolicyTask.push(this.seletedTaskToDelete as DTOHRPolicyTask);
    }
    else {
      this.selectedRowitem.forEach(item => {
        if (this.isDTOCheck(item, 'DTOHRPolicyTask')) {
          listDeletePolicyTask = this.selectedRowitem as DTOHRPolicyTask[];
        }
        return;
      })
    }
    this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
  }

  expandDetailsBy = (dataItem: any): number => {
    return dataItem;
  };

  /**
   * This event is called whenever want to clear all selection
   */
  onClearSelection() {
    this.count = 0;
    this.selectedKeys = [];
    this.selectedRowitem = [];
    this.selectedRowitemDialogOpened = false;
    this.listSeletedTaskToDelete = [];

    const pagers = document.querySelectorAll('kendo-pager');
    pagers?.forEach(item => {
      item.classList.remove('disabled');
    })

    this.onSelectingGrid.emit(null);
  }

  /**
   * The event is called whenever click button that on popup when click items on grid
   * @param btnType button will be appeared on dialog when select multiple item
   */
  onSelectedPopupBtnClick(btnType: string) {
    // Delete list task
    if (btnType === "1") {
      this.isOpenPopupConfirmDelete = true;
      this.listSeletedTaskToDelete = (this.selectedRowitem as (DTOHRPolicyTask | DTOHRDecisionTask)[])
        ?.filter((item): item is DTOHRPolicyTask => 'Policy' in item)
        .map(item => item.TaskName);
    }
  }

  /**
   * The event is called whenever toggle on pager of grid
   * @param event 
   */
  onPageChange(event: PageChangeEvent) {
    this.pageSize = event.take;
    this.gridState.skip = event.skip;
    this.gridState.take = event.take;
  }

  /**
   * Fetch data ra list
   * @param item 
   * @returns 
   */
  fetchChildren = (item?: HRPolicyItem): HRPolicyItem[] | undefined => {
    if (item && item.ListException) {
      let children: HRPolicyItem[] = [];
      if (Ps_UtilObjectService.hasListValue(item.ListException)) {
        children.push(...item.ListException)
      }
      return children;
    }
    return undefined;
  };

  /**
   * Check that item has children or not
   * @param item obj need check
   * @returns 
   */
  hasChildren = (item: HRPolicyItem): boolean => {
    const children = this.fetchChildren(item);
    return children !== undefined && children.length > 0;
  };

  /**
   * Check item in exception task can be deleted
   * @param dto task need to check
   * @returns true if deleteable
   */
  onCheckDeletableException(dto: HRPolicyItem): boolean {
    const creatorOrMaster = this.isCreator || this.isMaster;
    const approverOrMaster = this.isApprover || this.isMaster;

    // Quyền xem
    if (!creatorOrMaster && !approverOrMaster) {
      return false;
    }

    // Nếu không chứa ngoại lệ con
    if (!Ps_UtilObjectService.hasListValue(dto.ListException)) {
      // Đối với Đang soạn thảo hoặc Trả về
      if (this.policyMaster.Status == 0 || this.policyMaster.Status == 4) {
        if (creatorOrMaster) {
          return true;
        }
      }

      // Đối với Gửi duyệt
      if (this.policyMaster.Status == 1 && approverOrMaster) {
        return true;
      }
    }
    return false
  }

  /**
   * This function is called when click on delete policy task exception button 
   * @param dto task limit want to handle
   */
  toogleButtonPolicyTaskLimit(dto: HRPolicyItem, action: 'delete' | 'stop', task?: DTOHRPolicyTask) {
    this.selectedTaskDeleteException = task;
    // Delete policy task exception
    if (action === 'delete') {
      this.selectedPolicyTaskLimit = dto;
      this.isOpenPopupConfirmDelete = true;
    }
  }

  /**
   * Hàm dùng để lấy các loại nhân sự áp dụng để hover title
   * @param task 
   */
  getListStaffTypeTitle(task: DTOHRPolicyTask) {
    const list: string[] = task?.ListStaffType.map(item => item.TypeStaffName);
    return list.slice(1).join(',\n');
  }

  /**
   * Hàm dùng để lấy các đầu việc cần xóa để hover
   * @param task 
   */
  getListTaskTitle() {
    const list: string[] = this.selectedRowitem.map(item => item.TaskName);
    return list.slice(2).join(',\n');
  }

  /**
   * Hàm set typeProfile (On/Off) dựa theo input typeData
   */
  getTypeProfile() {
    this.typeProfile = [1, 3, 5, 7].includes(this.typeData) ? 1 : 2;
  }

  /**
   * Hàm lấy danh sách tên đầu việc khi select nhiều đầu việc
   * @returns trả về danh sách tên đầu việc
   */
  getListTaskName(item: DTOHRDecisionTask): string[] {
    let listTaskName: string[] = [];
    listTaskName.push(item.TaskName);
    // this.selectedRowitem.map(item => listTaskName.push(item.TaskName));
    return listTaskName;
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


  /**
   * Hàm lấy value reason khi change select
   * @param value value reason được chọn
   */
  getValueChangeDropdown(value: { Code: number, Text: string }) {
    // console.log(value)
    this.valueReason = value;
    // Mở lại
    if (this.codeConfirmDialog == 3) {
      if (value.Code == 109) {
        this.isObligatoryReason = true;
      }
      else {
        this.isObligatoryReason = false;
      }
    }
    // Ngưng thực hiện
    else if (this.codeConfirmDialog == 5) {
      if (value.Code == 104) {
        this.isObligatoryReason = true;
      }
      else {
        this.isObligatoryReason = false;
      }
    }
    // thực hiện bởi
    // else if (this.codeConfirmDialog == 3) {
    //   this.valueAssignee = value;
    //   this.handleChangeSelectDropdown();
    //   this.gridStateStaff = this.gridStateStaffOrigin;
    //   this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: value.Code }];

    //   if (value.Code !== 0) {
    //     this.isDisabledEmployee = false;
    //     this.APIGetListEmployee();
    //   } else {
    //     this.isDisabledEmployee = true;
    //   }
    // }
    // duyệt bởi
    // else if (this.codeConfirmDialog == 4) {
    //   this.valueApprove = value;
    //   this.handleChangeSelectDropdown();
    //   this.gridStateStaff = this.gridStateStaffOrigin;
    //   this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: value.Code }];

    //   if (value.Code !== 0) {
    //     this.isDisabledEmployee = false;
    //     this.APIGetListEmployee();
    //   } else {
    //     this.isDisabledEmployee = true;
    //   }
    // }
    else if (this.codeConfirmDialog == 2) {
      if (value.Code == 104) {
        this.isObligatoryReason = true;
      }
      else {
        this.isObligatoryReason = false;
      }
    }
  }

  handleChangeSelectDropdown() {
    this.defaultOptionEmployee.Code = 0;
    this.defaultOptionEmployee.FirstName = "-- Chọn --";
    if (Ps_UtilObjectService.hasValue(this.valueDropdown)) {
      this.valueDropdown.value = this.defaultOptionEmployee;
    }
    this.valueEmployee = this.defaultOptionEmployee;
  }

  /**
   * Hàm lấy giá trị nhân sự được chọn từ dropdown
   * @param value item nhân sự được chọn 
   */
  getValueChangeEmployee(value: DTOEmployee) {
    // console.log(value);
    this.valueEmployee = value;
  }



  /**
  * Hàm toggle popup ngưng tuyển dụng/ điều chuyển
  */
  toggleClosedDialog() {
    this.isConfirmDialogShow = false;
    this.isChangedDialogShow = false;
    this.isConfirmDialogSent = false;
    this.isObligatoryReason = false;
    this.valueReason = null;
    this.valueRemark = null;
    this.valueApprove = null;
    this.valueAssignee = null;
    this.valueEmployee = null;
    this.isDisabledEmployee = true;
    this.listEmployee = [];
  }

  /**
   * Hàm confirm dialog ngưng/không/mở đầu việc
   */
  onDiaglogConfirm() {
    if (this.isObligatoryReason) {
      if (!Ps_UtilObjectService.hasValueString(this.valueRemark.value)) {
        if (this.codeConfirmDialog == 3) {
          this.layoutService.onError(`Đã xảy ra lỗi khi mở lại đầu việc: Chưa nhập mô tả`);
        } else if (this.codeConfirmDialog == 5) {
          this.layoutService.onError(`Đã xảy ra lỗi khi ngưng thực hiện đầu việc: Chưa nhập mô tả`);
        } else if (this.codeConfirmDialog == 2) {
          this.layoutService.onError(`Đã xảy ra lỗi khi chuyển sang không thực hiện đầu việc: Chưa nhập mô tả`);
        }
      } else {
        // console.log(this.listSelectItemTask)
        this.getListCanChangedStatus(this.listSelectItemTask);
        this.toggleClosedDialog();
        this.isConfirmDialogShow = false;
      }
    } else {
      if (!Ps_UtilObjectService.hasValue(this.valueReason) || !Ps_UtilObjectService.hasValue(this.valueReason.Code)) {
        if (this.codeConfirmDialog == 3) {
          this.layoutService.onError(`Đã xảy ra lỗi khi mở lại đầu việc: Chưa chọn lí do`);
        } else if (this.codeConfirmDialog == 5) {
          this.layoutService.onError(`Đã xảy ra lỗi khi ngưng thực hiện đầu việc: Chưa chọn lí do`);
        } else if (this.codeConfirmDialog == 2) {
          this.layoutService.onError(`Đã xảy ra lỗi khi chuyển sang không thực hiện đầu việc: Chưa chọn lí do`);
        }
      } else {
        this.getListCanChangedStatus(this.listSelectItemTask);
        this.toggleClosedDialog();
      }
    }
  }

  /**
   * Hàm confirm dialog thay đổi thực hiện/duyệt bởi
   */
  onDialogConfirmChangedInfo() {
    if (Ps_UtilObjectService.hasValue(this.valueEmployee) && this.valueEmployee.Code !== 0) {
      if (this.codeConfirmDialog == 3) {
        if (this.valueAssignee.Code == 0) {
          this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật thông tin đầu việc: Chưa chọn chức danh thực hiện`);
        } else {
          this.getListCanChangedStatus(this.listSelectItemTask);
          this.toggleClosedDialog();
        }
      }
      else if (this.codeConfirmDialog == 4) {
        if (this.valueApprove.Code == 0) {
          this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật thông tin đầu việc: Chưa chọn chức danh duyệt`);
        } else {
          this.getListCanChangedStatus(this.listSelectItemTask);
          this.toggleClosedDialog();
        }
      }
    } else {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật thông tin đầu việc: Chưa chọn nhân sự`);
    }
  }

  /**
 * Hàm confirm dialog duyệt/gửi duyệt/hoàn tất đầu việc
 */
  onDialogConfirmTask() {
    this.getListCanChangedStatus(this.listSelectItemTask);
    this.toggleClosedDialog();
  }

  /**
   * Hàm chuyển trạng thái tất cả đầu việc tùy vào trạng thái được chuyển của profile
   * @param isHideTask Có ẩn đầu việc chưa thực hiện thuộc loại nhân sự mà nhân sự hiện tại không thể thực hiện hay không
   */
  ChangeStatusAllTask(isHideTask: boolean = false) {
    let listProperties: string[] = [];
    let listTaskCanChange: DTOHRDecisionTask[] = [];
    this.decisionProfile.Status = 2;

    this.listTask.data.map((task: DTOHRDecisionTask) => {
      if (this.decisionProfile.Status == 2 && task.TypeAssignee == 1) {
        if (task.Status == 1) {
          task.Status = 6;
          listProperties.push('Status');
          listTaskCanChange.push(task);
        }
      }
    })
  }


  /**
   * Hàm kiểm tra dữ liệu string cho bên dom
   * @param value dữ liệu string cần được kiểm tra
   * @returns 
   */
  checkValueString(value: string): boolean {
    return Ps_UtilObjectService.hasValueString(value);
  }


  getEndDateByTimeDoing(timeDoing: number): Date | null {
    const startDate = new Date(this.decisionProfile?.StartDate);

    const endDate = Ps_UtilObjectService.addDays(startDate, timeDoing);
    endDate.setHours(23, 59, 59);
    return endDate; // Trả về đối tượng Date
  }

  /**
   * Hàm check danh sách có thể đổi trạng thái
   */
  getListCanChangedStatus(listData: DTOHRDecisionTask[]) {
    let listProperties: string[] = [];
    let listCanChange: DTOHRDecisionTask[] = [];

    //Mở lại
    if (this.codeConfirmDialog == 3) {
      listProperties.push('Status', 'Reason', 'ReasonDescription');
      listData.map(item => {
        if (item.Status == 2 || item.Status == 5) {
          if (this.typeData == 1 || this.typeData == 2) {
            item.Status = 1;
          } else {
            if (item.TypeAssignee == 1) {
              item.Status = 6;
            } else {
              item.Status = 3;
            }
          }
          item.Reason = this.valueReason.Code;
          item.ReasonDescription = this.valueRemark.value;
          listCanChange.push(item);
        }
      })
    }
    //Ngưng thực hiện
    else if (this.codeConfirmDialog == 5) {
      listProperties.push('Status', 'Reason', 'ReasonDescription');
      listData.map(item => {
        if (item.Status == 3) {
          item.Status = 5;
          item.Reason = this.valueReason.Code;
          item.ReasonDescription = this.valueRemark.value;
          listCanChange.push(item);
        }
      })
    }
    //Thực hiện bởi
    else if (this.codeConfirmDialog == 7) {
      listProperties.push('Assignee', 'AssigneeID', 'AssigneeName');
      listData.map(item => {
        if (item.PositionAssignee == this.valueAssignee.Code && (item.TypeAssignee !== 1 && item.Status !== 6)) {
          item.Assignee = this.valueEmployee.Code;
          item.AssigneeID = this.valueEmployee.StaffID;
          item.AssigneeName = this.valueEmployee.LastName + ' ' + this.valueEmployee.MiddleName + ' ' + this.valueEmployee.FirstName
          listCanChange.push(item);
        }
      })
    }
    //Duyệt bởi
    else if (this.codeConfirmDialog == 8) {
      listProperties.push('Approved', 'ApprovedID', 'ApprovedName');
      listData.map(item => {
        if ((item.PositionApproved == this.valueApprove.Code) && item.Status !== 6) {
          item.Approved = this.valueEmployee.Code;
          item.ApprovedID = this.valueEmployee.StaffID;
          item.ApprovedName = this.valueEmployee.LastName + ' ' + this.valueEmployee.MiddleName + ' ' + this.valueEmployee.FirstName
          listCanChange.push(item);
        }
      })
    }
    //Hoàn tất đầu việc
    else if (this.codeConfirmDialog == 6) {
      listProperties.push('Status');
      listData.map(item => {
        // Nếu ở bước onboarding (typeData == 3) và đầu việc: đang thực hiện và có đủ thông tin để có thể chuyển trạng thái
        // Nếu ở bước offboarding (typeData == 4) và đầu việc: Chờ duyệt và có đủ thông tin để có thể chuyển trạng thái
        if ((this.typeData == 3 && item.Status == 3 || this.typeData == 4 && item.Status == 4)) {
          item.Status = 6;
          listCanChange.push(item);
        }
      })
    }
    //Gửi duyệt đầu việc
    else if (this.codeConfirmDialog == 4) {
      listProperties.push('Status');
      listData.map(item => {
        if (item.Status == 3) {
          item.Status = 4;
          listCanChange.push(item);
        }
      })
    }
    //Không thực hiện
    else if (this.codeConfirmDialog == 2) {
      listProperties.push('Status', 'Reason', 'ReasonDescription');
      listData.map(item => {
        if (item.Status == 1) {
          item.Status = 2;
          item.Reason = this.valueReason.Code;
          item.ReasonDescription = this.valueRemark.value;
          listCanChange.push(item);
        }
      })
    }

    this.listItemCanChange = listCanChange as DTOHRDecisionTask[];
    this.APIUpdateListHRDecisionTask(this.listItemCanChange, listProperties);
  }

  /**
   * Hàm kiểm tra xem đầu việc có đủ thông tin để có thể chuyển trạng thái không
   */
  handleCheckConditionTask(task: DTOHRDecisionTask): boolean {
    if (this.typeData == 3 && Ps_UtilObjectService.hasValueString(task.Assignee)) {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái đầu việc: Chưa chọn nhân sự thực hiện`)
      return false;
    }
    if (this.typeData == 3 && (Ps_UtilObjectService.hasValueString(task.Assignee) || task.TypeAssignee !== 2)) {
      return false;
    } else if (this.typeData == 4 && (Ps_UtilObjectService.hasValueString(task.Approved) || task.IsLeaderMonitor == true)) {
      return false;
    }
    else {
      return true;
    }
  }

  /**
   * Hàm đổi màu dialog
   * @returns 
   */
  getColorDialog(): string {
    if (this.codeConfirmDialog == 3 || this.codeConfirmDialog == 2) {
      return "rgba(241, 128, 46, 1)";
    } else if (this.codeConfirmDialog == 5) {
      return "rgba(216, 44, 18, 1)";
    } else if (this.codeConfirmDialog == 3 || this.codeConfirmDialog == 4) {
      return "rgba(26, 102, 52, 1)";
    }
  }


  handleFilter(value: string) {
    const searchValue = value.toLowerCase();
    this.listEmployee = this.originalListEmployee.filter((s) => {
      const fullName = `${s.LastName} ${s.MiddleName} ${s.FirstName}`.toLowerCase();
      return (
        fullName.includes(searchValue) ||
        (s.StaffID && s.StaffID.toLowerCase().includes(searchValue))
      );
    });
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
        return ""
    }
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
   * Hàm trả về code status dựa vào tên status
   * @param statusName tên status được truyền vào
   * @returns 
   */
  // getCodeStatusTaskLog(statusName: string): number {
  //   switch (statusName) {
  //     case "Chưa thực hiện":
  //       return 1;
  //     case "Không thực hiện":
  //       return 2;
  //     case "Đang thực hiện":
  //       return 3;
  //     case "Chờ duyệt":
  //       return 4;
  //     case "Ngưng thực hiện":
  //       return 5;
  //     case "Hoàn tất":
  //       return 6;
  //   }
  // }

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
   * Hàm kiểm tra xem bên trong filter đã có filter truyền vào hay chưa
   * @param obj filter hiện tại
   * @param target filter muốn kiểm tra
   * @returns true nếu đã tồn tại
   */
  hasMatchingFilter(obj: any, target: any): boolean {
    if (Array.isArray(obj)) {
      return obj.some((item) => this.hasMatchingFilter(item, target));
    } else if (obj && typeof obj === 'object') {
      if (JSON.stringify(obj) === JSON.stringify(target)) {
        return true;
      }
      return Object.values(obj).some((value) => this.hasMatchingFilter(value, target));
    }
    return false;
  }

  /**
   * Hàm kiểm tra show hoặc không show các đầu việc "Không", "Ngưng" thực hiện
   */
  checkShowStoppedTask() {
    if (!this.isShowStoppedTask) {
      if (this.decisionProfile.Status !== 1) {
        const neqStatus: CompositeFilterDescriptor = {
          logic: 'and',
          filters: [
            { field: 'Status', operator: 'neq', value: 2 },
            { field: 'Status', operator: 'neq', value: 5 }
          ]
        }

        if (!this.hasMatchingFilter(this.gridState, neqStatus)) {
          this.gridState.filter.filters.push(neqStatus);
        }
      }
    }
  }


  sortListByStatus(inputList: any[], targetStatus: number): any[] {
    return inputList.sort((a, b) => {
      const now = new Date(); // Ngày hiện tại

      if (targetStatus === 7) {
        // So sánh nếu Status = 7
        const aOverdue = a.EndDate && new Date(a.EndDate) <= now; // Quá hạn hoặc bằng
        const bOverdue = b.EndDate && new Date(b.EndDate) <= now; // Quá hạn hoặc bằng

        // Đưa các item quá hạn lên đầu
        if (aOverdue && !bOverdue) {
          return -1;
        }
        if (bOverdue && !aOverdue) {
          return 1;
        }
      }

      // Logic thông thường theo Status
      if (a.Status === targetStatus && b.Status !== targetStatus) {
        return -1;
      }
      if (b.Status === targetStatus && a.Status !== targetStatus) {
        return 1;
      }

      // Giữ nguyên thứ tự nếu không khớp điều kiện
      return 0;
    });
  }

  requestSortData(targetStatus: number): void {
    this.reqSortStatus = targetStatus;
    this.listTask.data = this.sortListByStatus(this.listTask.data, targetStatus);
  }

  /**
   * Hàm kiểm tra trường
   */
  onCheckFieldRequied(item: DTOHRDecisionTask) {
    const showError = (message: string) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật đầu việc: ${message}`);
    };

    // Kiểm tra các trường hợp thiếu dữ liệu
    if (!Ps_UtilObjectService.hasValueString(item.TaskName)) {
      showError(`thiếu tên đầu việc`);
      return false;
    }

    if (!Ps_UtilObjectService.hasValue(item.PositionAssignee) && item.TypeAssignee == 2) {
      showError(`thiếu chức danh thực hiện`);
      return false;
    }

    if (!Ps_UtilObjectService.hasValue(item.Assignee) && item.TypeAssignee == 2) {
      showError(`thiếu nhân sự thực hiện`);
      return false;
    }

    if (!Ps_UtilObjectService.hasValueString(item.EndDate)) {
      showError(`thiếu ngày hoàn tất`);
      return false;
    }

    if (!Ps_UtilObjectService.hasValue(item.PositionApproved) && !item.IsLeaderMonitor && this.typeData == 4) {
      showError(`thiếu chức danh duyệt`);
      return false;
    }

    if (!Ps_UtilObjectService.hasValue(item.Approved) && !item.IsLeaderMonitor && this.typeData == 4) {
      showError(`thiếu nhân sự duyệt`);
      return false;
    }

    if (!Ps_UtilObjectService.hasListValue(JSON.parse(item.ListOfTypeStaff))) {
      showError(`thiếu loại nhân sự áp dụng`);
      return false;
    }

    return true;
  }

  /**
   * Hàm xử lý khi click vào action trên list
   * @param codeAction code của action được chọn
    btnActionDelete = { Name: "Xóa đầu việc", Code: "trash", Type: 'Delete', Link: "delete", Actived: true };
    btnActionAssignee = { Name: "Thực hiện bởi", Code: "user", Type: 'AssigneeBy', Link: "assigneeBy", Actived: true };
    btnActionApprover = { Name: "Duyệt bởi", Code: "paste", Type: 'ApprovedBy', Link: "approvedBy", Actived: true };
    btnActionDone = { Name: "Hoàn tất", Code: "check-circle", Type: 'Success', Link: "6", Actived: true };

    btnActionEdit = { Name: "Chỉnh sửa", Code: "pencil", Type: 'pencil', Link: "pencil", Actived: true };
    btnActionSeen = { Name: "Xem chi tiết", Code: "eye", Type: 'eye', Link: "eye", Actived: true };

    btnActionNo = { Name: "Không thực hiện", Code: "minus-outline", Type: 'NotDo', Link: "2", Actived: true };
    btnActionReOpen = { Name: "Mở lại", Code: "reset", Type: 'Open', Link: "3", Actived: true };
    btnActionSend = { Name: "Gửi duyệt", Code: "redo", Type: 'Sent', Link: "4", Actived: true };
    btnActionStop = { Name: "Ngưng thực hiện", Code: "minus-outline", Type: 'Stop', Link: "5", Actived: true };
   */
  onActionList(action: { Name: string; Code: string; Type: string; Link: string; Actived: boolean; }, item: DTOHRDecisionTask) {
    // Kiểm tra có thông tin đầy đủ của các trường bắt buộc, nếu như pass thì mới thực hiện các logic tiếp theo nếu không thì báo lỗi trả về
    if (!['eye', 'pencil'].includes(action.Code) && !this.onCheckFieldRequied(item)) {
      return
    }

    let listName: string[] = [];
    this.listSelectItemTask = [];
    this.listSelectItemTask = this.listSelectItemTask as DTOHRDecisionTask[];
    this.listSelectItemTask.push(item);
    // Popup 3: Mở lại, 5: Ngưng thực hiện, 6: Hoàn tất, 4: Gửi duyệt, 2: Không thực hiện
    this.codeConfirmDialog = Number(action.Link);

    // Xem chi tiết
    if (action.Code == "eye") {
      this.onClickEditTask.emit({ item: item, action: action })
    }
    else if (action.Code == "pencil") {
      this.onClickEditTask.emit({ item: item, action: action })
    }
    // Ngưng/không thực hiện
    else if (action.Code == "minus-outline") {
      item = item as DTOHRDecisionTask
      listName.push(item.FullName);
      this.APIGetListHR();
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

    // Gửi duyệt
    else if (action.Code == "redo") {
      listName.push(item.FullName + ' - ' + item.StaffID);

      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }

    // Hoàn tất
    else if (action.Code == "check-circle") {

      listName.push(item.FullName + ' - ' + item.StaffID);
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogSent = true;
    }

    // Mở lại
    else if (action.Code == "reset") {
      listName.push(item.FullName);
      this.APIGetListHR();
      this.listNameSelected = this.formatListName(listName);
      this.isConfirmDialogShow = true;
    }

  }

  /**
   * Hàm dùng để lấy họ và tên
   * @param dataItem Nhân sự
   */
  handleGetFullName(dataItem: DTOEmployee) {
    if (!Ps_UtilObjectService.hasValue(dataItem)) {
      return '';
    }

    let lastName = dataItem.LastName;
    let middleName = dataItem.MiddleName;
    let firstName = dataItem.FirstName;

    if (!Ps_UtilObjectService.hasValueString(dataItem.LastName)) {
      lastName = '';
    }

    if (!Ps_UtilObjectService.hasValueString(dataItem.MiddleName)) {
      middleName = '';
    }

    if (!Ps_UtilObjectService.hasValueString(dataItem.FirstName)) {
      firstName = '';
    }

    return `${lastName} ${middleName} ${firstName}`;
  }

  //#endregion
}

/**
 * Pipe dùng để kiểm tra loại quyết định
 */
@Pipe({ name: 'pipeDecisionType' })
export class DecisionTypePipe implements PipeTransform {
  transform(profile: DTOHRDecisionTask): string {
    if (profile.TypeDecision !== null) {
      switch (profile.TypeDecision) {
        case 1: return '<b title="Quyết định tuyển dụng">Tuyển dụng</b>';
        case 2: return '<b title="Quyết định điều chuyển">Điều chuyển</b>';
        case 3: return '<b title="Quyết định kỷ luật">Kỷ luật</b>';
        default: return '';
      }
    } else {
      return '<b title="Đơn xin nghỉ việc">Nghỉ việc</b>';
    }
  }
}
