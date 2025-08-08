import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOStaff, Ps_AuthService, Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOHRDecisionProfile } from '../../dto/DTOHRDecisionProfile.dto';
import { DTOHRDecisionTask } from '../../dto/DTOHRDecisionTask.dto';
import { DTOHRDecisionTaskLog } from '../../dto/DTOHRDecisionTaskLog.dto';
import { linkVerticalIcon } from '@progress/kendo-svg-icons';
import { HriDecisionApiService } from '../../services/hri-decision-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { distinct, FilterDescriptor, SortDescriptor, State } from '@progress/kendo-data-query';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { StaffApiService } from '../../services/staff-api.service';
import { PKendoTextboxComponent } from 'src/app/p-app/p-layout/components/p-kendo-textbox/p-textbox.component';
import { HrTaskListComponent } from '../hr-task-list/hr-task-list.component';
import { DTOEmployee } from '../../dto/DTOEmployee.dto';
import { HriTransitionApiService } from '../../services/hri-transition-api.service';
import { DTOListHR } from '../../dto/DTOPersonalInfo.dto';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { faCircleInfo, faCoffee, faInfo } from '@fortawesome/free-solid-svg-icons';
import { HriTaskCategoryApiService } from '../../services/hri-task-category-api.service';
import { DTOHRLSTaskCus } from '../../dto/DTOHRTaskCategory.dto';

@Component({
  selector: 'app-hr-boarding-detail',
  templateUrl: './hr-boarding-detail.component.html',
  styleUrls: ['./hr-boarding-detail.component.scss']
})
export class HrBoardingDetailComponent implements OnInit, OnDestroy {
  // Enum Type data Chuẩn bị / Boarding / Boarded / Ngưng
  /** @param
   * - Pre-Onboard:	1
   * - Pre-Offboard: 2
   * - Onboarding: 3
   * - Offboarding: 4
   * - Onboarded: 5
   * - Offboarded: 6
   * - Ngưng Onboarded: 7
   * - Ngưng Offboarded: 8
   */
  @Input() TypeData: number

  @ViewChild('gridTaskList') gridTaskList!: HrTaskListComponent

  faCircleInfo = faCircleInfo;

  //variable
  DataHRDecisionProfileMaster: DTOHRDecisionProfile = new DTOHRDecisionProfile()
  DataHRDecisionTask: DTOHRDecisionTask = new DTOHRDecisionTask()
  DataHRDecisionTaskOrigin: DTOHRDecisionTask = new DTOHRDecisionTask()
  DataHRTaskLog: DTOHRDecisionTaskLog[]
  DataTaskChild: DTOHRDecisionTask[] = [];

  deadlineDate: number = 0
  titleReason: string = ''

  //Ngày thử việc
  trialDate: string


  //#region DATE
  minEndDate: Date = new Date
  dateRemain: number = 0


  // actionGrid:

  //boolen
  isShowDialogTaskLog: boolean = false
  isOpenDrawer: boolean = false;
  isShowDetailTransfer: boolean = true
  isShowPopUpSelection: boolean = false;
  resquestChangeStatus: boolean = false
  isDropdownAssignee: boolean = false;
  isDropdownPositionAssignee: boolean = false;
  isLoadingPage: boolean = false; // Loading của cả trang
  hasPositionAssignee: boolean = false; // Có chức danh thực hiện hay không
  hasPositionApprover: boolean = false; // Có chức danh duyệt hay không

  isDatePickerChange: boolean = false
  isSelectedPosition3: boolean = false; // Có đang chọn chức danh áp dụng là nhân sự áp dụng không

  //#region variable drawer
  isEdit: boolean = false;
  isView: boolean = false;
  isCreate: boolean = false
  IsLeaderMonitor: boolean = false; // Là trưởng đơn vị,...
  hasPerToBoarded: boolean = false; // Quyền hoàn tất On/Offboarding
  originStaff: any;


  /**
   * - 0: thêm mới
   * - 1: Cập nhật
   */
  statusDrawer: 0 | 1 = 0;

  //list
  listEmployee: DTOEmployee[] = [];
  listEmployeeAssigneeFilter: DTOEmployee[] = [] // Danh sách nhân sự thực hiện
  listEmployeeApproverFilter: DTOEmployee[] = [] // Danh sách nhân sự duyệt
  defautEmployeeFilter: any = { FullName: '-- Chọn --', Code: -1 }
  listHRLSTask: DTOHRLSTaskCus[] = [] // Danh sách công việc trong đầu công việc
  listHRLSTaskOrigin: DTOHRLSTaskCus[] = [] // Danh sách công việc trong đầu công việc gốc
  listPositionNameTypeAssignee3: { PositionName: string; Code: number }[] = [];
  currentListApprovedPosition: { PositionName: string; Code: number }[] = [];
  currentListPosition: { PositionName: string; Code: number, ID: string }[] = []
  defaultListPosition: { PositionName: string; Code: number, ID: string } = { PositionName: "-- Chọn --", Code: -1, ID: null };
  gridStateTaskOrigin: State = { filter: { logic: "and", filters: [] } }
  listTaskOrgin: DTOHRDecisionTask[];

  petition: number; // Code của đơn xin nghỉ việc nếu có

  listTypeStaff: { ID: number, name: string }[] = [
    { ID: 1, name: "Chính thức" },
    { ID: 2, name: "Không chính thức" },
  ]
  defaultListTypeStaff: { ID: number, name: string } = { ID: -1, name: "-- Chọn --" }

  listStatus: { name: string, ID: number }[] = [
    { name: "Chưa thực hiện", ID: 1 },
    { name: "Không thực hiện", ID: 2 },
    { name: "Đang thực hiện", ID: 3 },
    { name: "Chờ duyệt", ID: 4 },
    { name: "Ngưng thực hiện", ID: 5 },
    { name: "Hoàn tất", ID: 6 }
  ];

  listStatusDropdown = [
    { Status: 1, StatusName: 'Chưa thực hiện' },
    { Status: 2, StatusName: 'Không thực hiện' },
    { Status: 3, StatusName: 'Đang thực hiện' },
    { Status: 4, StatusName: 'Chờ duyệt' },
    { Status: 5, StatusName: 'Ngưng thực hiện' },
    { Status: 6, StatusName: 'Hoàn tất' }
  ];

  statusDropdownDefault: { Status: number, StatusName: string } = { Status: -1, StatusName: '-- Chọn --' }

  listStatusDropdownFitler = []
  OriginStatusSelect: number
  defaultStatus: { ID: number, name: string } = { ID: -1, name: "-- Chọn --" }
  listHR: DTOListHR[] = []; // Danh sách loại nhân sự áp dụng
  listHRFiltered: DTOListHR[] = []; // Danh sách loại nhân sự áp dụng
  listReason: DTOListHR[] = []
  listReasonFiltered: DTOListHR[] = [];
  defaultHR: DTOListHR
  DecisionTaskForm: FormGroup; // form đầu việc của view đầu việc
  currentDate: Date = new Date(); // Ngày hiện tại
  currentSortStatus: number = null; // Trạng thái sắp xếp hiện tại
  isOnOfLSTask: boolean = true; // Trong bảng đầu việc hay không
  taskSelected: DTOHRLSTaskCus = null; // Công việc được chọn từ combobox
  hasTaskSelected: boolean = false; // Có công việc đang được chọn hay không

  //unsubcribe
  destroy$ = new Subject<void>();
  arrSub: Subscription[] = []

  // Phân quyền
  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isMaster: boolean = false;
  isCreator: boolean = false;
  isApprover: boolean = false;
  isAllowedToViewOnly: boolean = false;
  M_C: boolean = false;
  M_A: boolean = false;

  //Loading
  isLoading: boolean = false;
  isLoadingEmployeeAssignee: boolean = false; // Loading của dropdown Thực hiện bởi
  isLoadingEmployeeApprover: boolean = false; // Loading của dropdown Duyệt bởi
  isLoadingReason: boolean = false;
  isLoadingCombobox: boolean = false; // Loading của combobox đầu việc

  //icon
  icons = { linkVertical: linkVerticalIcon }

  //state
  gridStateStaff: State = { filter: { logic: "and", filters: [] } }
  gridStateTask: State = { filter: { logic: "and", filters: [] } }
  gridStateHRLSTask: State = { filter: { logic: "and", filters: [{ field: 'Status', value: 2, operator: 'eq', ignoreCase: true }] } }
  gridStateTaskLog: State = { filter: { logic: "and", filters: [] } }
  // this.gridState.filter.filters = [{ field: 'DecisionProfile', operator: 'eq', value: this.decisionProfile.Code}];

  // statusDrawer: number = 0;

  defautCurrentHR: { FullName: string; Code: number, ID: string } = { ID: "", FullName: "-- Chọn --", Code: -1 }

  // ListDecisionTask: DTOHRDecisionTask[] = listTaskTest
  // DataDecisionTask: DTOHRDecisionTask = listTaskTest[0]

  DataDrawer: DTOHRDecisionTask

  //#region Varible render UI
  nameDecision: string = ''
  boardingType: string = ''
  filteredListHR: any; // Danh sách loại nhân sự dùng để binding lên drawer
  officalHR: DTOListHR; // Nhân sự áp dụng: Loại chính thức
  staffInfor: DTOStaff; // Thông tin nhân sự đang đăng nhập
  hasHiddenPaycheck: boolean = false; // Kiểm tra time user
  detailStaff: any; // Thông tin chi tiết của nhân sự


  //#region  MOCK DATA


  //#region FORM

  MultiForm: UntypedFormGroup;

  constructor(
    public domSanititizer: DomSanitizer,
    private decisionService: HriDecisionApiService,
    public menuService: PS_HelperMenuService,
    private layoutService: LayoutService,
    public staffApiService: StaffApiService,
    private hriTransitionService: HriTransitionApiService,
    private formBuilder: FormBuilder,
    private auth: Ps_AuthService,
    private taskCategoryService: HriTaskCategoryApiService,

  ) { }


  mockDataResource = [
    {
      resourceName: "Máy tính xách tay",
      resourceType: "Thiết bị điện tử",
      price: 15000000
    },
    {
      resourceName: "Máy chiếu",
      resourceType: "Thiết bị văn phòng",
      price: 5000000
    },
    {
      resourceName: "Bàn làm việc",
      resourceType: "Nội thất",
      price: 2000000
    },
    {
      resourceName: "Tủ hồ sơ",
      resourceType: "Nội thất",
      price: 2500000
    },
    {
      resourceName: "Điện thoại di động",
      resourceType: "Thiết bị điện tử",
      price: 10000000
    },
    {
      resourceName: "Ghế văn phòng",
      resourceType: "Nội thất",
      price: 1200000
    },
    {
      resourceName: "Máy in",
      resourceType: "Thiết bị văn phòng",
      price: 3000000
    }
  ];


  /**
   * INIT
   */
  ngOnInit(): void {
    this.handleGetCache()
    this.MultiForm = this.onLoadForm();
    this.MultiForm.patchValue(new DTOHRDecisionTask);

    this.menuService.changePermission().pipe(takeUntil(this.destroy$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');
        this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isApprover = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;

        this.M_A = this.isMaster || this.isApprover;
        this.M_C = this.isMaster || this.isCreator;

        //Chỉ được xem
        this.isAllowedToViewOnly = !this.M_A;
      }
    });

    this.menuService.changePermissionAPI().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        if ((this.TypeData == 3 || this.TypeData == 4) && this.DataHRDecisionProfileMaster.Status == 2) {
          this.APIGetHRDecisionProfileBoarding(this.DataHRDecisionProfileMaster)
        } else {
          this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster)
        }
        this.APIGetListHRPolicyPosition()
        this.APIGetListHR()
        this.APIGetListHRReasonStop(23)
        this.APIGetEmployeeInfoPortal()
        // this.onGetCacheStaff();
      }
    })
  }

  /**
   * Lấy cache quyết định từ trang list
   */
  handleGetCache() {
    const result = localStorage.getItem('HRDecisionProfile');
    if (Ps_UtilObjectService.hasValue(result)) {
      this.DataHRDecisionProfileMaster = JSON.parse(result);
    }
  }


  //#region  API
  /**
   * Hàm dùng để lấy cache staff đang đăng nhập tài khảon
   */
  // onGetCacheStaff() {
  //   this.isLoading = true;
  //   let a = this.staffApiService.GetEmployeeInfoPortal().pipe(takeUntil(this.destroy$)).subscribe((res) => {
  //     if (Ps_UtilObjectService.hasValue(res)) {
  //       this.detailStaff = res.ObjectReturn;
  //       this.checkAccess();
  //     }
  //     this.isLoading = false;
  //   });

  //   this.arrSub.push(a);
  // }

  checkAccess() {
    this.hasHiddenPaycheck = false;
    var currentTime = Date.now();
    // Tính thời gian đã trôi qua từ lần truy cập đến hiện tại
    var accessTime = (this.detailStaff as any).accessTime;
    var elapsedTime = (currentTime - accessTime) / 60000;
    // Kiểm tra xem thời gian đã trôi qua có lớn hơn 5 phút không
    if (elapsedTime >= 5) {
      this.hasHiddenPaycheck = true;
      localStorage.removeItem('timeAccessPaycheck');
    }
  }

  // /**
  //  * API dùng để lấy thông tin nhân sự
  //  * @param code: Code nhân sự
  //  */
  // APIGetEmployeeInfo(code: number) {
  //   let a = this.staffApiService.GetEmployeeInfo(code).pipe(takeUntil(this.destroy$)).subscribe((res) => {
  //     if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
  //       this.detailStaff = res.ObjectReturn;

  //     }
  //     else {
  //       this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${res.ErrorString}`);
  //     }
  //   }, (error) => {
  //     this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin nhân sự: " ${error}`);
  //   })

  //   this.arrSub.push(a);
  // }


  /**
 * API dùng để lấy thông tin nhân sự
 * @param code: Code nhân sự
 */
  APIGetEmployeeInfoPortal() {
    let a = this.staffApiService.GetEmployeeInfoPortal().pipe(takeUntil(this.destroy$)).subscribe((res) => {
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
   * API lấy thông tin hồ sơ
   * @param req DTOHRDecisionProfile
   */
  APIGetHRDecisionProfile(req: DTOHRDecisionProfile) {
    if (this.TypeData == 2) {
      req.StartDate = null;
    }
    this.isLoading = true;

    // Format lại StartDate
    req.StartDate = this.formatDateToCustomFormat(new Date(req.StartDate));

    let a = this.decisionService.GetHRDecisionProfile(req).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.DataHRDecisionProfileMaster = res.ObjectReturn;
        if (!this.DataHRDecisionProfileMaster.StartDate) {
          this.DataHRDecisionProfileMaster.StartDate = Ps_UtilObjectService.addDays(new Date(), 1).toString();
        }
        localStorage.setItem('HRDecisionProfile', JSON.stringify(this.DataHRDecisionProfileMaster));
        this.gridStateTask.filter.filters = [{ field: 'DecisionProfile', operator: 'eq', value: res.ObjectReturn.Code }];

        if (Ps_UtilObjectService.hasValue(this.DataHRDecisionProfileMaster.ProbationPeriodDays)) {
          this.getTrialDate(new Date(this.DataHRDecisionProfileMaster.JoinDate), this.DataHRDecisionProfileMaster.ProbationPeriodDays);
        }

        // Đối với đơn xin nghỉ việc thì gán thêm petition
        if (Ps_UtilObjectService.hasValue(res.ObjectReturn.Petition) && [2, 4, 6, 8].includes(this.TypeData)) {
          this.petition = res.ObjectReturn.Petition;
        }
        else {
          this.petition = null;
        }

        this.handleGetNameDecision(res.ObjectReturn.DecisionType)
        this.checkBoardingType(res.ObjectReturn.BoardingType)

      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Thông tin: ${res.ErrorString}`);
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy Thông tin: ${err}`);
    });

    this.arrSub.push(a);
  }

  /**
   * API lấy thông tin hồ sơ (Dùng tại bước boarding)
   * @param req DTOHRDecisionProfile
   */
  APIGetHRDecisionProfileBoarding(req: DTOHRDecisionProfile) {
    if (this.TypeData == 2) {
      req.StartDate = null;
    }
    this.isLoading = true;

    // Format lại StartDate
    req.StartDate = this.formatDateToCustomFormat(new Date(req.StartDate));
    let DLLPackage = this.TypeData == 3 ? 'hri029-onboarding-list' : this.TypeData == 4 ? 'hri033-offboarding-list' : null;

    let a = this.decisionService.GetHRDecisionProfileBoarding(req, DLLPackage).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.DataHRDecisionProfileMaster = res.ObjectReturn;
        if (!this.DataHRDecisionProfileMaster.StartDate) {
          this.DataHRDecisionProfileMaster.StartDate = Ps_UtilObjectService.addDays(new Date(), 1).toString();
        }
        localStorage.setItem('HRDecisionProfile', JSON.stringify(this.DataHRDecisionProfileMaster));
        this.gridStateTask.filter.filters = [{ field: 'DecisionProfile', operator: 'eq', value: res.ObjectReturn.Code }];

        if (Ps_UtilObjectService.hasValue(this.DataHRDecisionProfileMaster.ProbationPeriodDays)) {
          this.getTrialDate(new Date(this.DataHRDecisionProfileMaster.JoinDate), this.DataHRDecisionProfileMaster.ProbationPeriodDays);
        }

        // Đối với đơn xin nghỉ việc thì gán thêm petition
        if (Ps_UtilObjectService.hasValue(res.ObjectReturn.Petition) && [2, 4, 6, 8].includes(this.TypeData)) {
          this.petition = res.ObjectReturn.Petition;
        }
        else {
          this.petition = null;
        }

        this.handleGetNameDecision(res.ObjectReturn.DecisionType)
        this.checkBoardingType(res.ObjectReturn.BoardingType)

      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Thông tin: ${res.ErrorString}`);
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy Thông tin: ${err}`);
    });

    this.arrSub.push(a);
  }

  /**
   * API cập nhật trạng thái của profile
   * @param listDTO DTOHRDecisionProfile[]
   * @param status trạng thái sẽ chuyển
   */
  APIUpdateHRDecisionProfileStatus(listDTO: DTOHRDecisionProfile[], status: number) {
    this.isLoading = true;
    let a = this.decisionService.UpdateHRDecisionProfileStatus(listDTO, status).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.isLoading = false;
      this.isLoadingPage = false;
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        // this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster);
        if ((this.TypeData == 3 || this.TypeData == 4) && this.DataHRDecisionProfileMaster.Status == 2) {
          this.APIGetHRDecisionProfileBoarding(this.DataHRDecisionProfileMaster)
        } else {
          this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster)
        }

        // if (status == 2) {
        //   this.gridTaskList.ChangeStatusAllTask(true);
        // }

        switch (this.TypeData) {
          case 1:
            this.TypeData = 3;
            this.gridTaskList.typeData = 3;
            this.gridTaskList.onGetCacheStaff();
            this.gridTaskList.onFilterData();
            break
          case 2:
            this.TypeData = 4;
            this.gridTaskList.typeData = 4;
            this.gridTaskList.onGetCacheStaff();
            this.gridTaskList.onFilterData();
            break
          case 3:
            this.TypeData = 6;
            break
          case 4:
            this.TypeData = 8;
            break
        }

        this.layoutService.onSuccess("Cập nhật trạng thái hồ sơ thành công");
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái ${this.handleGetNameTitle(this.TypeData)}: ` + res.ErrorString);
      }
    }, (err) => {
      this.isLoading = false;
      this.isLoadingPage = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhât trạng thái ${this.handleGetNameTitle(this.TypeData)}: ${err}`);
    });

    this.arrSub.push(a);
  }


  /**
   * API Get EMployee
   * - 0: default
   * - 1: assignee
   * - 2: approve
   */
  APIGetListEmployee(status: 0 | 1 | 2) {
    this.isLoadingEmployeeAssignee = [0, 1].includes(status);
    this.isLoadingEmployeeApprover = [0, 2].includes(status);

    if ([0, 1].includes(status)) {
      this.listEmployeeAssigneeFilter = [];
    }
    else if ([0, 2].includes(status)) {
      this.listEmployeeApproverFilter = [];
    }

    let a = this.staffApiService.GetListEmployee(this.gridStateStaff).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listEmployee = res.ObjectReturn.Data;
        if (status == 1) {
          this.listEmployeeAssigneeFilter = res.ObjectReturn.Data;
        }
        else if (status == 2) {
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

    this.arrSub.push(a);
  }


  /**
   * Lấy danh sách chức danh
   */
  APIGetListHRPolicyPosition() {
    let a = this.hriTransitionService.GetListHRPolicyPosition().pipe(takeUntil(this.destroy$)).subscribe((res) => {
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

    this.arrSub.push(a);
  }

  /**
  * API cập nhật đầu việc
  */
  APIUpdateHRDecisionTask(data: DTOHRDecisionTask) {
    // Đối với chức danh thực hiện là 'Nhân sự áp dụng' thì gán giá trị cho PositionAssignee = null
    if (data.PositionAssignee == -1) {
      data.PositionAssignee = null
    }

    if (Ps_UtilObjectService.hasValue(this.DataHRDecisionProfileMaster.Petition)) {
      data.Petition = this.DataHRDecisionProfileMaster.Petition;
    }

    // Kiểm tra loại nhân sự áp dụng của đầu việc
    data.ListOfTypeStaff = JSON.stringify(this.filteredListHR.map((item: DTOListHR) => item.OrderBy));

    // Cắt chuỗi để check endDate có phải cuối ngày không
    const splitEndDate = data.EndDate.split('T');
    if (splitEndDate.length == 1) {
      data.EndDate += 'T23:59:59';
    }
    let a = this.decisionService.UpdateHRDecisionTask(data).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${this.isCreate ? 'Thêm' : 'Cập nhật'} đầu việc thành công`)

        this.handleCloseDrawer();
        // Sau khi đóng drawer thì load lại danh sách đầu việc
        if (!this.isOpenDrawer) {
          this.gridTaskList.APIGetListHRDecisionTask();
        }

        if ((this.TypeData == 3 || this.TypeData == 4) && this.DataHRDecisionProfileMaster.Status == 2) {
          this.APIGetHRDecisionProfileBoarding(this.DataHRDecisionProfileMaster)
        } else {
          this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster)
        }

        // this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${this.isCreate ? 'thêm' : 'cập nhật'} đầu việc ${this.handleGetNameTitle(this.TypeData)}: ${res.ErrorString}`);
      }
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi ${this.isCreate ? 'thêm' : 'cập nhật'} đầu việc ${this.handleGetNameTitle(this.TypeData)}: ${err}`);
    });

    this.arrSub.push(a);
  }

  /**
   * Lấy thông tin tasklog
   */
  APIGetListHRDecisionTaskLog(filter: State) {
    let a = this.decisionService.GetListHRDecisionTaskLog(filter).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.DataHRTaskLog = res.ObjectReturn.Data;
        this.DataHRTaskLog.sort((a, b) => {
          const dateA = new Date(a.CreatedTime).getTime();
          const dateB = new Date(b.CreatedTime).getTime();
          return dateB - dateA; // Sắp xếp giảm dần
        });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy lịch sử thay đổi: ` + res.ErrorString);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy lịch sử thay đổi: ${err}`);
    });

    this.arrSub.push(a);
  }


  /**
  * API lấy danh sách chức danh áp dụng
  */
  APIGetListHR() {
    let a = this.staffApiService.GetListHR(5).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listHR = res.ObjectReturn;
        this.officalHR = this.listHR.find(item => item.OrderBy == 2);
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chức danh áp dụng: ${error}`);
    });

    this.arrSub.push(a);
  }


  /**
  * API lấy danh sách chức danh áp dụng
  */
  APIGetListHRReasonStop(Enum: number) {
    this.isLoadingReason = true;

    let a = this.staffApiService.GetListHR(Enum).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listReason = res.ObjectReturn;
        this.listReasonFiltered = res.ObjectReturn;
        this.isLoadingReason = false;
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chức danh áp dụng: ${error}`);
      this.isLoadingReason = false
    });

    this.arrSub.push(a);
  }

  /**
  * API dùng để Update trạng thái hồ sơ
  * @param listDTO DTOHRDecisionProfile[]
  * @param status trạng thái hồ sơ sẽ được chuyển
  */
  APIUpdateHRDecisionProfileBoardingStatus(listDTO: DTOHRDecisionProfile[], status: number) {
    const apiText = this.TypeData == 3 ? 'Onboarding' : this.TypeData == 4 ? 'Offboarding' : '';
    let DLLPackage = this.TypeData == 3 ? 'hri029-onboarding-list' : this.TypeData == 4 ? 'hri033-offboarding-list' : null;

    let a = this.decisionService.UpdateHRDecisionProfileBoardingStatus(listDTO, status, DLLPackage).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.APIGetHRDecisionProfileBoarding(this.DataHRDecisionProfileMaster);
        this.TypeData = this.TypeData == 3 ? 6 : 8;
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog()
        this.layoutService.onSuccess('Cập nhật trạng thái hồ sơ thành công')
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi tình trạng hồ sơ ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
      this.isLoadingPage = false;
    }, (err) => {
      this.isLoading = false;
      this.isLoadingPage = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi tình trạng hồ sơ ${apiText}: ${err}`);
    });
    this.arrSub.push(a)
  }


  /**
   * API dùng để lấy danh sách đầu công việc
   */
  APIGetListHRLSTask() {
    const apiText = "Đầu công việc";
    let a = this.taskCategoryService.GetListHRLSTask(this.gridStateHRLSTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
          this.listHRLSTask = res.ObjectReturn.Data;
          this.listHRLSTaskOrigin = res.ObjectReturn.Data;
          this.APIGetListHRDecisionTask();
        } else {
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`);
        }
      }, (err) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
      });

    this.arrSub.push(a);
  }

  /**
 * API dùng để lấy danh sách các đầu việc khi đã vô quy trình on offboard
 */
  APIGetListHRDecisionTask() {
    this.isLoadingCombobox = true;
    this.gridStateTaskOrigin.filter.filters = [];
    this.gridStateTaskOrigin.filter.filters.push({ field: 'DecisionProfile', operator: 'eq', value: this.DataHRDecisionProfileMaster.Code })
    let a = this.decisionService.GetListHRDecisionTask(this.gridStateTaskOrigin).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listTaskOrgin = res.ObjectReturn.Data;
        this.handleFilterObjectExisted(this.listTaskOrgin);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách đầu việc: " ${res.ErrorString}`);
      }

      this.isLoadingCombobox = false;
    }, (error) => {
      this.isLoadingCombobox = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách đầu việc: " ${error}`);
    });

    this.arrSub.push(a);
  }

  //#endregion


  //#region LOADING DATA
  /**
   * Load data breadcrumb
   */
  loadData() {
    // this.gridStateTask.filter.filters = [{ field: 'DecisionProfile', operator: 'eq', value: this.DataHRDecisionProfileMaster.Code }];
    // if(this.DataHRDecisionProfileMaster.Status == 2){
    //   this.gridStateTask.filter.filters.push({
    //     logic: 'and',
    //     filters: [
    //       { field: 'Status', operator: 'neq', value: 2 },
    //       { field: 'Status', operator: 'neq', value: 5 }
    //     ]
    //   });
    // }
    // this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster)
    if ((this.TypeData == 3 || this.TypeData == 4) && this.DataHRDecisionProfileMaster.Status == 2) {
      this.APIGetHRDecisionProfileBoarding(this.DataHRDecisionProfileMaster)
    } else {
      this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster)
    }
    this.handleLoadGrid()

  }

  /**
   * Request loading grid task
   */
  handleLoadGrid() {
    if (this.DataHRDecisionProfileMaster.Status == 1 || this.DataHRDecisionProfileMaster.Status == 2) {
      this.gridStateTask.filter.filters = [{ field: 'DecisionProfile', operator: 'eq', value: this.DataHRDecisionProfileMaster.Code }];
    }

    this.gridTaskList.APIGetListHRDecisionTask()
  }

  //#region XỬ LÍ UI

  /**
   * Lấy tên để binding các title và lable html
   * @param Type
   * @returns
   */
  handleGetNameTitle(Type: number): string {
    switch (Type) {
      case 1:
      case 3:
      case 5:
      case 7:
        return "Onboarding";
      case 2:
      case 4:
      case 6:
      case 8:
        return "Offboarding";
      default:
        return "";
    }
  }


  /**
   * Hàm set status để lấy class style cho các chữ
   * @param status
   * @returns
   */
  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'pre-status-text';
      case 2:
        return 'on-off-status-text';
      case 3:
        return 'stop-status-text';
      case 4:
        return 'onboarded-status-text';
      default:
        return '';
    }
  }

  /**
   * hàm để thay đổi nút action góc trên bên phải
   * @param status
   * @returns
   */
  handleGetButtonAction(status: number): { name: string, icon: string } {
    switch (status) {
      case 1:
        return { name: 'onboarding', icon: 'k-i-check-outline' }
      case 2:
        return { name: 'offboarding', icon: 'k-i-check-outline' }
      case 3:
        return { name: 'onboarded', icon: 'k-i-check-outline' }
      case 4:
        return { name: 'offboarded', icon: 'k-i-check-outline' }
    }
  }


  /**
   * Hàm trả về tên của Decision
   * @param status
   */
  handleGetNameDecision(status: number) {
    switch (status) {
      case 1:
        this.nameDecision = "Tuyển dụng";
        break
      case 2:
        this.nameDecision = "Điều chuyển";
        break
      case 3:
        this.nameDecision = "Kỷ luật";
        break
      case 4:
        this.nameDecision = "Nghỉ việc";
        break
      default:
        this.nameDecision = "Không xác định";
        break
    }
  }


  /**
   * Hàm ẩn hoặc hiện block 1 đối với điều chuyển
   */
  handleActionDetailTransfer() {
    if (this.isShowDetailTransfer) {
      this.isShowDetailTransfer = false
    } else {
      this.isShowDetailTransfer = true
    }
  }

  /**
   * Kiểm tra xe trên drawer show thực hiện bởi hệ thống không
   * @returns
   */
  handleCheckTaskOfSystem(): boolean {
    if (this.DataHRDecisionTaskOrigin.TypeAssignee == 1) {
      return true
    } else {
      return false
    }
  }

  /**
  * Hàm dùng để lấy loại của drawer là chính sách hay đầu việc
  * @param statusDrawer trạng thái được truyền vào là số được quy định sẵn
  * @returns
  */
  handleGetTypeOfDrawer(statusDrawer: number) {
    // Thuộc về chức danh
    // const listStatusPolicyButton: number[] = [1, 2, 3, 4];
    // if (listStatusPolicyButton.includes(statusDrawer)) {
    //   return { Type: 0, Name: 'Thông tin chức danh' };
    // }

    // // Thuộc về đầu việc. 12: Thêm mới -- 13: Chỉnh sửa -- 14: Xem chi tiết
    // const listStatusPolicyTaskButton: number[] = [12, 13, 14];
    // if (listStatusPolicyTaskButton.includes(statusDrawer)) {
    //   return { Type: 1, Name: 'Thông tin đầu việc' };
    // }
  }

  /**
   * Đóng drawer
   */
  handleCloseDrawer(): void {
    this.isOpenDrawer = false;
    this.DataHRDecisionTask = new DTOHRDecisionTask
    this.DataHRDecisionTaskOrigin = new DTOHRDecisionTask
    this.MultiForm.reset()
    this.resquestChangeStatus = false
    this.isEdit = false;
    this.isView = false;
    this.isCreate = false;
    this.dateRemain = 0;
    this.isDropdownAssignee = false;
    this.isDatePickerChange = false;
    this.IsLeaderMonitor = false;
    this.taskSelected = null;
    this.hasTaskSelected = false;
    // this.isOnOfLSTask = false;
  }

  /**
   * Mở drawer
   */
  handleOpenDrawer(): void {
    const assignee = this.MultiForm.get('PositionAssignee').value;
    if (Ps_UtilObjectService.hasValue(assignee)) {
      this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: assignee }]
      this.APIGetListEmployee(0);
    }

    // Lấy số ngày thực hiện
    this.handleCalDate(this.MultiForm.value);
    this.handleCalDeadline(this.MultiForm.get("EndDate").value);

    // Loại nhân sự áp dụng
    if (this.isCreate) {
      this.filteredListHR = [];
    }
    else {
      let gotListHR: any[] = JSON.parse(this.MultiForm.get('ListOfTypeStaff').value);

      if (Ps_UtilObjectService.hasListValue(gotListHR)) {
        this.filteredListHR = this.listHR.filter((item: DTOListHR) => gotListHR.includes(item.OrderBy));
      }
    }

    // Code nhân sự thực hiện
    this.codeAssignee = this.MultiForm.get('Assignee').value;
    // Code nhân sự duyệt
    this.codeApprove = this.MultiForm.get('Approved').value;

    this.isOpenDrawer = true;
    this.openDatePicker()
    this.onGetStatusDropdown()
  }

  /**
   * Nút Action bên phải
   */
  handleButtonHeaderClick(): void {

  }

  // tài sản thu hồi
  handleAssetRecovery(action: string, inputRef?: PKendoTextboxComponent, data?: { PositionName: string; Code: number; ID: string }) {
    if (action == 'add') {
      this.currentListPosition.unshift({ PositionName: '', Code: -2, ID: null });
    }

    if (action == 'trash') {
      this.currentListPosition.filter((v) => { v !== data })
      this.layoutService.onError(
        `Xóa thành công`
      );
    }
  }

  /**
   * Filter dropdown
   */
  handleFilter(value, searchFields: any[], textField: string, option: string) {
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

    else if (option == 'Approver') {
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

    else if (option == 'Task') {
      if (Ps_UtilObjectService.hasListValue(this.listHRLSTaskOrigin)) {
        if (Ps_UtilObjectService.hasListValue(searchFields)) {
          this.listHRLSTask = this.listHRLSTaskOrigin.filter((s) =>
            searchFields.some((field) => {
              const fieldValue = s[field];
              return fieldValue && Ps_UtilObjectService.containsString(fieldValue.toString(), value);
            })
          );

        } else {
          this.listHRLSTask = this.listHRLSTaskOrigin.filter(
            (s) => Ps_UtilObjectService.containsString(s[textField], value)
          );
        }
      }
    }
  }

  /**
   * Kiểm tra hiển thị block vị trí trước Onboarding
   */
  shouldDisplayBlock(): boolean {
    if (!this.DataHRDecisionProfileMaster || ![1, 3, 5, 7].includes(this.TypeData)) {
      return false;
    }

    const master = this.DataHRDecisionProfileMaster;

    // Kiểm tra sự khác biệt giữa các giá trị, bao gồm cả trường hợp null
    const isPositionDifferent = master.PositionName !== master.CurrentPositionName;
    const isDepartmentDifferent = master.DepartmentName !== master.CurrentDepartmentName;
    const isLocationDifferent = master.LocationName !== master.CurrentLocationName;

    // Kiểm tra nếu cả ba giá trị CurrentPositionName, CurrentDepartmentName, CurrentLocationName đều là null
    const isAllNull = master.CurrentPositionName === null &&
      master.CurrentDepartmentName === null &&
      master.CurrentLocationName === null;

    // Nếu cả ba giá trị đều là null thì không hiển thị block
    if (isAllNull) {
      return false;
    }

    return master.DecisionType !== 2 &&
      (isPositionDifferent || isDepartmentDifferent || isLocationDifferent);
  }

  //#region Image
  errorOccurred: any = {};
  getResHachi(str: string) {
    let a = Ps_UtilObjectService.removeImgRes(str);
    return Ps_UtilObjectService.getImgResHachi(a);
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


  // //#region TASK LOG
  // handleOpenTaskLog(data: DTOHRDecisionTask) {
  //   data.Code = 354
  //   this.gridStateTaskLog.filter.filters = [{field: 'DecisionTask', operator: 'eq', value: data.Code}]
  //   this.APIGetListTaskLog()
  //   this.isShowDialogTaskLog = true
  // }

  /**
   * Đóng tasklog
   */
  handleCloseTaskLog() {
    this.isShowDialogTaskLog = false
  }


  //#region EXCEL

  onImportExcel() {

  }

  downloadExcel() {

  }

  exportExcel() {

  }

  //#region Logic code

  /**
   * Có hiển thị trường nào đó hay không. Có thể dùng để disable các field cần thiết
   * @param field trường tự định nghĩa
   * @returns true nếu hiển thị hoặc có thể EDIT
   */
  isVisible(field: string) {
    // Trạng thái của profile
    const status = this.DataHRDecisionProfileMaster.Status;

    // Đối với nhân sự không có quyền
    if (!this.M_A) {
      return false;
    }

    switch (field) {
      case 'dropdown-status': // Dropdown trạng thái
      case 'note-footer': // Note ở footer
        return this.isEdit || this.isCreate;
    }

    return true;
  }


  /**
   * Thêm một ngày
   * @param joinDateStr
   * @returns
   */
  addOneDayToJoinDate(joinDateStr: Date): string | null {
    const Date = Ps_UtilObjectService.addDays(joinDateStr, 1)
    return Date.toString()
  }


  /**
   * Lấy ngày thử việc
   */
  getTrialDate(Date: Date, num: number) {
    this.trialDate = Ps_UtilObjectService.addDays(Date, num).toString()
  }


  /**
   * Thêm hoặc sửa task
   */
  handleUpdateTask(option: 'Thêm mới' | 'Cập nhật') {
    const data: DTOHRDecisionTask = this.MultiForm.value;
    // const hasIDTask = Array.isArray(this.DataTaskChild) && this.DataTaskChild.some(item => item.LSTaskID === data.LSTaskID);

    if (!Ps_UtilObjectService.hasValueString(data.TaskName)) {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Nhập thiếu tên đầu việc`);
      return;
    }

    // if (hasIDTask) {
    //   this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Đã tồn tại đầu việc với mã ${data.LSTaskID} trong bảng công việc`);
    //   return;
    // }

    if (data.TypeAssignee == 0) {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Chọn thiếu chức danh thực hiện`);
      return;
    }

    if (data.TypeAssignee == 2) {
      if (!Ps_UtilObjectService.hasValueString(data.Assignee) || data.Assignee == -1) {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Chọn thiếu nhân sự thực hiện`);
        return;
      }
    }

    if (!Ps_UtilObjectService.hasValueString(data.EndDate)) {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Chọn thiếu ngày hoàn tất`);
      return;
    }

    if (this.TypeData == 2 || this.TypeData == 4 || this.TypeData == 6 || this.TypeData == 8) {
      if (!Ps_UtilObjectService.hasValueString(data.Approved) && !this.IsLeaderMonitor) {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Chọn thiếu nhân sự duyệt`);
        return;
      }
    }

    if (!Ps_UtilObjectService.hasListValue(this.filteredListHR)) {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Chọn thiếu loại nhân sự áp dụng`);
      return;
    }

    if (this.checkChangeStatus()) {
      if (data.Status != 6 && data.Status != 4) {
        if (!Ps_UtilObjectService.hasValueString(data.Reason)) {
          this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Vui lòng chọn lý do`);
          return;
        } else {
          if (data.Reason == 104) {
            if (!Ps_UtilObjectService.hasValueString(data.ReasonDescription)) {
              this.layoutService.onError(`Đã xảy ra lỗi khi ${option} đầu việc: Vui lòng nhập mô tả lý do`);
              return;
            }
          }
        }
      }
    }

    if (option == "Thêm mới") {
      data.DecisionProfile = this.DataHRDecisionProfileMaster.Code
      data.Code = 0;
      data.ListHRDecisionProfile = []

      // Thêm loại Onboarding hoặc Offboarding
      if ([1, 3].includes(this.TypeData)) {
        data.DecisionTypeName = 'Onboarding';
      }

      if ([2, 4].includes(this.TypeData)) {
        data.DecisionTypeName = 'Offboarding';
      }
    }

    if (JSON.stringify(data) === JSON.stringify(this.DataHRDecisionTaskOrigin)) {
      this.handleCloseDrawer()
      return
    }
    this.resquestChangeStatus = false
    this.APIUpdateHRDecisionTask(data)
  }

  /**
   * Hàm dùng để sort danh sách đầu việc theo trạng thái với
   * @param status 1: Chưa thực hiện, 2: Không thực hiện, 3: Quá hạn, 4: Đang thực hiện, 5: Hoàn tất, 6: Ngưng thực hiện, 7: Chờ duyệt
   */
  handleSortList(status: number) {
    this.currentSortStatus = status;
    this.gridTaskList.requestSortData(status);
  }

  /**
   * Load form
   */
  onLoadForm(): UntypedFormGroup {
    const form = this.formBuilder.group({});
    const dto = new DTOHRDecisionTask(); // Khởi tạo đối tượng DTO

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
   * Action khi các dropdown thực hiện
   * @param event value
   * @param prop name dropdown action
   */
  onDropdownClick(event, prop: string) {
    const formControl = this.MultiForm.get(prop);
    switch (prop) {
      // Nhân sự áp dụng
      case 'ListOfTypeStaff':
        formControl?.setValue(`[${[event]}]`);
        break;

      // Trạng thái đầu việc
      case 'Status':
        this.getTitleReason(event)
        if (this.titleReason == "mở lại") {
          this.APIGetListHRReasonStop(24)
        } else {
          this.APIGetListHRReasonStop(23)
        }
        if (this.MultiForm.get("Status").value != this.DataHRDecisionTaskOrigin.Status) {
          this.resquestChangeStatus = true
          this.MultiForm.get("Reason")?.reset();
          this.MultiForm.get("ReasonDescription")?.reset();
        } else {
          this.resquestChangeStatus = false
          this.MultiForm.get('Reason')?.setValue(this.DataHRDecisionTaskOrigin.Reason);
          this.MultiForm.get('ReasonDescription')?.setValue(this.DataHRDecisionTaskOrigin.ReasonDescription);
        }
        break;

      // Chức danh thực hiện
      case 'PositionAssignee':
        if (event || event == -1) {
          this.isSelectedPosition3 = event == -1;
          if (event == -1) {
            this.MultiForm.get('TypeAssignee').setValue(3);
            this.MultiForm.get('PositionAssignee').setValue(-1);
            this.MultiForm.get('AssigneePositionName').setValue(null);
            this.MultiForm.get('AssigneeBy').setValue(null);
            this.MultiForm.get('AssigneeID').setValue(null);
            this.MultiForm.get('Assignee').setValue(null);
          }
          else {
            this.MultiForm.get('TypeAssignee').setValue(2);
            this.MultiForm.get('Assignee').setValue(null);
            this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: event }];
            this.APIGetListEmployee(1);
            formControl?.setValue(event);
          }
          this.hasPositionAssignee = true;
        }
        else {
          this.MultiForm.get("Assignee")?.reset();
          this.isDropdownAssignee = false;
          this.hasPositionAssignee = false;
        }
        this.codeAssignee = null;
        break;

      // Chức danh duyệt
      case 'PositionApproved':
        if (event) {
          this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: event }];
          this.APIGetListEmployee(2);
          formControl?.setValue(event);
          this.hasPositionApprover = true;
        }
        else {
          this.MultiForm.get("PositionApproved")?.reset();
          this.isDropdownPositionAssignee = false;
          this.hasPositionApprover = false;
        }
        this.codeApprove = null;
        break;

      // Trưởng đơn vị, qli điểm làm việc
      case 'IsLeaderMonitor':
        this.IsLeaderMonitor = !this.IsLeaderMonitor;

        if (this.IsLeaderMonitor) {
          this.MultiForm.get('Approved').setValue(null);
          this.MultiForm.get('PositionApproved').setValue(null);
          this.codeApprove = null
        }
        else {

          this.hasPositionApprover = false;
        }

        // Reset danh sách Duyệt bởi
        this.listEmployeeApproverFilter = [];


        this.MultiForm.get('IsLeaderMonitor').setValue(this.IsLeaderMonitor);
        break;


      // Ngoài bảng đầu việc
      case 'IsOutOfTableTask':
        // this.isOnOfLSTask = !this.isOnOfLSTask;
        if (this.isOnOfLSTask) {
          this.APIGetListHRLSTask();
        }

        this.taskSelected = null;
        this.hasTaskSelected = false;
        this.MultiForm.get('TaskName').reset();
        this.MultiForm.get('LSTask').reset();
        this.MultiForm.get('Description').reset();
        break;

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

      // Mặc định
      default:
        formControl?.setValue(event);
        break;
    }
  }


  /**
   * Datepicke change
   */
  openDatePicker() {
    let startDateValue = '';

    // Xác định giá trị startDateValue dựa trên TypeData
    if (this.TypeData === 1 || this.TypeData === 2) {
      const formStartDate = this.MultiForm.get("StartDate").value;
      startDateValue = formStartDate
        ? formStartDate
        : Ps_UtilObjectService.addDays(new Date(this.DataHRDecisionProfileMaster.StartDate), 0).toString();
    } else if (this.TypeData === 3 || this.TypeData === 4) {
      startDateValue = new Date().toISOString();
    }

    // Chuyển đổi startDateValue thành ngày và tính toán minEndDate
    // Min của ngày kết thúc đầu việc sẽ là ngày hiện tại + 1
    const startDate = startDateValue ? new Date(this.currentDate) : null;

    if (startDate && !isNaN(startDate.getTime())) {
      this.minEndDate = Ps_UtilObjectService.addDays(startDate, 1); // Ngày hợp lệ
    } else {
      this.minEndDate = null; // Ngày không hợp lệ hoặc không có giá trị
    }
  }


  /**
   * Action khi các datepicker thực hiện
   * @param event value
   * @param prop name dropdown action
   */
  onDatepickerChange(event: any, prop: string) {
    if (event instanceof Date) {
      this.isDatePickerChange = true;
      // Sử dụng local time thay vì ISO
      this.MultiForm.get(prop)?.setValue(event.toLocaleDateString('en-CA')); // yyyy-MM-dd
      this.handleCalDate(this.MultiForm.value);
      this.handleCalDeadline(this.MultiForm.get("EndDate").value);
    } else {
      console.error("Sự kiện không phải là đối tượng Date:", event);
    }
  }


  /**
   * Open tasklog
   */
  handleOpenTaskLog() {
    // FILTER TASKLOG
    const filterListTaskLogState: State = {
      filter: { filters: [], logic: 'and' },
      sort: []
    };

    const filterTaskLog: FilterDescriptor = {
      field: 'DecisionTask',
      operator: 'eq',
      value: (this.DataHRDecisionTask as any).Code,
      ignoreCase: true,
    };

    const sortTaskLog: SortDescriptor = {
      field: 'CreatedTime',
      dir: 'desc',
    };
    // filterListTaskLog.filters.push(filterTaskLog);
    filterListTaskLogState.filter.filters.push(filterTaskLog);
    filterListTaskLogState.sort.push(sortTaskLog);
    this.APIGetListHRDecisionTaskLog(filterListTaskLogState);
    this.isShowDialogTaskLog = true;
  }

  /**
   * Get action dropdown status drawer
   */
  onGetStatusDropdown() {
    this.listStatusDropdownFitler = []
    if (Ps_UtilObjectService.hasValue(this.DataHRDecisionTask.Status)) {
      if ([1, 2].includes(this.TypeData)) {
        this.listStatusDropdownFitler = this.listStatusDropdown.filter(status => [1, 2].includes(Number(status.Status)));
      }
      else if (this.TypeData == 3) {
        this.listStatusDropdownFitler = this.listStatusDropdown.filter(status => [2, 3, 5, 6].includes(Number(status.Status)));
      }
      else if (this.TypeData == 4) {
        this.listStatusDropdownFitler = this.listStatusDropdown.filter(status => [2, 3, 4, 5, 6].includes(Number(status.Status)));
      }
      else if ([5, 6, 7, 8].includes(this.TypeData)) {
        this.listStatusDropdownFitler = this.listStatusDropdown;
      }
    }
  }

  /**
   * Hàm dùng để disabled những item có Position null trong dropdown Chức danh duyệt bởi
   * @param item
   * @returns true với item cần disabled
   */
  isItemNullPositionApproveDisable = (item: any): boolean => {
    return !Ps_UtilObjectService.hasValue(item.dataItem.Position);
  }

  /**
   * Hàm dùng để disabled những item có Code null hoặc bằng -1 trong dropdown
   * @param item
   * @returns true với item cần disabled
   */
  isItemDisableInvalidCode = (item: any): boolean => {
    return !Ps_UtilObjectService.hasValue(item.dataItem.Code) || item.dataItem.Code == -1;
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
    const notSelfApprove = item.dataItem.Code == this.DataHRDecisionProfileMaster.Staff;
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

  /**
   * Hàm check disable item cho dropdown list trạng thái đầu việc trong drawer
   * @param item
   * @returns
   */
  isItemDisable = (item: any): boolean => {
    if (Ps_UtilObjectService.hasValue(this.DataHRDecisionTask.Status)) {
      const status = this.DataHRDecisionTask.Status;
      if ([1, 2].includes(this.TypeData)) {
        return ![1, 2].includes(item.dataItem.Status);
      }
      // Đối với Onboarding
      if (this.TypeData == 3) {
        // Vừa là người thực hiện vừa là người có thể duyệt
        if (this.isPersonalDoTask(this.DataHRDecisionTask) && this.M_A) {
          // Nếu đầu việc là: Đang thực hiện
          if (status == 3) {
            return ![3, 5, 6].includes(item.dataItem.Status);
          }
          // Nếu đầu việc là: Ngưng/Không thực hiện
          if ([2, 5].includes(status)) {
            if (status == 2) {
              return ![2, 3].includes(item.dataItem.Status);
            }
            if (status == 5) {
              return ![5, 3].includes(item.dataItem.Status);
            }
          }
        }
        // Nếu chỉ là người thực hiện
        if (this.isPersonalDoTask(this.DataHRDecisionTask) && !this.M_A) {
          // Nếu đầu việc là: Đang thực hiện
          if (status == 3) {
            return [3, 6].includes(item.dataItem.Status);
          }
        }
        // Nếu chỉ là người duyệt
        if (!this.isPersonalDoTask(this.DataHRDecisionTask) && this.M_A) {
          // Nếu đầu việc là: Đang thực hiện
          if (status == 3) {
            return ![3, 5].includes(item.dataItem.Status);
          }
          // Nếu đầu việc là: Ngưng/Không thực hiện
          if ([2, 5].includes(status)) {
            if (status == 2) {
              return ![2, 3].includes(item.dataItem.Status);
            }
            if (status == 5) {
              return ![5, 3].includes(item.dataItem.Status);
            }
          }
        }
      }
      // Đối với Offboarding
      if (this.TypeData == 4) {
        // Nếu đầu việc là: Đang thực hiện
        if (status == 3) {
          // Vừa là người thực hiện vừa là người có thể duyệt
          if (this.isPersonalDoTask(this.DataHRDecisionTask) && this.M_A) {
            return ![3, 4, 5].includes(item.dataItem.Status);
          }
          // Chỉ là người thực hiện
          if (this.isPersonalDoTask(this.DataHRDecisionTask) && !this.M_A) {
            return ![3, 4].includes(item.dataItem.Status);
          }
          // Chỉ là người có quyền duyệt
          if (!this.isPersonalDoTask(this.DataHRDecisionTask) && this.M_A) {
            return ![3, 5].includes(item.dataItem.Status);
          }
        }
        // Nếu đầu việc là: Chờ duyệt
        if (status == 4) {
          // Vừa là người duyệt đầu việc vừa là người có thể duyệt
          if (this.isPersonalDoTask(this.DataHRDecisionTask, 'Approved')) {
            return ![4, 6].includes(item.dataItem.Status);
          }
        }
        // Nếu đầu việc là: Ngưng/Không thực hiện
        if ([2, 5].includes(status)) {
          if (this.M_A) {
            if (status == 2) {
              return ![2, 3].includes(item.dataItem.Status);
            }
            if (status == 5) {
              return ![5, 3].includes(item.dataItem.Status);
            }
          }
        }
      }
      return true;
    }
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
        return this.DataHRDecisionProfileMaster?.Staff == this.detailStaff?.Code;
      }
      return task[type] == this.detailStaff?.Code;
    }

    // Duyệt bởi
    if (type == 'Approved') {
      if (!task.IsLeaderMonitor) {
        return task[type] == this.detailStaff?.Code;
      }
      else {
        const con1 = this.detailStaff?.IsSupervivor && this.DataHRDecisionProfileMaster?.Department == this.detailStaff?.Department && this.DataHRDecisionProfileMaster?.Location == this.detailStaff?.Location;
        const con2 = this.detailStaff?.IsLeader && this.DataHRDecisionProfileMaster?.Department == this.detailStaff?.Department;
        return con1 || con2;
      }
    }
  }

  /**
   * Parse and return value HR
   */
  handleGetHR(HR: string) {
    if (HR) {
      return JSON.parse(HR)[0]
    }
  }

  handleGetStatus(status: number) {
    if (status) {
      return this.listStatusDropdown[status]
    }
  }

  /**
   * check status was change when open drawer
   */
  checkChangeStatus() {
    if (this.MultiForm.get('Status').value == this.DataHRDecisionTaskOrigin.Status) {
      return false
    } else {
      return true
    }
  }

  /**
   * Hàm dùng để check hiển thị lý do và mô tả lý do
   */
  shouldShowElement(): boolean {
    const status = this.MultiForm.get('Status').value;
    const task: DTOHRDecisionTask = this.MultiForm.value;
    let listStatus: number[] = [];

    if (!this.M_A) {
      return false;
    }

    if (!Ps_UtilObjectService.hasListValue(task.ListHRDecisionTaskLog) && this.statusDrawer == 1) {
      return false;
    }
    else {
      listStatus = task.ListHRDecisionTaskLog.map(item => item.Status);
    }

    // Kiểm tra có đầu việc hay không
    if (!Ps_UtilObjectService.hasValue(task)) {
      return false;
    }

    // Nếu như trạng thái hiện tại là "Đang thực hiện" hoặc "Chưa thực hiện" nhưng chỉ đối với đầu việc chưa từng ngưng hay không thực hiện
    if (!Ps_UtilObjectService.hasValue(task.Reason) && [1, 3].includes(status) && !Ps_UtilObjectService.hasValue(this.DataHRDecisionTaskOrigin.Reason)) {
      return false;
    }

    const con1 = this.checkChangeStatus();
    const con2 = this.DataHRDecisionTask?.ListHRDecisionTaskLog.length > 1 && this.statusDrawer != 0;
    const con3 = status != 6 && status !== 4;

    return (con1 || con2) && con3;
  }


  /**
   * return name of type boarding
   */
  checkBoardingType(type: number) {
    if (type == 1) {
      this.boardingType = 'Onboarding'
    }
    else if (type == 2) {
      this.boardingType = 'Offboarding'
    }
  }

  /**
   * Calculate date remain
   */
  handleCalDate(task: DTOHRDecisionTask) {
    if (!Ps_UtilObjectService.hasValueString(task.EndDate)) {
      return this.dateRemain = 0;
    }
    // const createTime = new Date(task.CreatedTime);
    const startOfEndDate = new Date(task.EndDate);
    const startOfCurrentDate = new Date();
    const startOfStartBoarding = new Date(this.DataHRDecisionProfileMaster.StartDate);
    // Đặt giờ về 00:00:00
    // createTime.setHours(0, 0, 0, 0);
    startOfEndDate.setHours(0, 0, 0, 0);
    startOfCurrentDate.setHours(0, 0, 0, 0);
    startOfStartBoarding.setHours(0, 0, 0, 0);

    // Trường hợp thêm mới đầu việc (Ngoài bảng đầu việc)
    if (task.Code == 0) {
      return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
    }
    // Trường hợp sửa đầu việc (Ngoài bảng đầu việc)
    if (!task.Task) {
      if (this.isDatePickerChange || [1, 2].includes(this.TypeData)) {
        return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
      }
      let createTime = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].CreatedTime);
      for (let i = 0; i < this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length; i++) {
        if (this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].Status == 3) {
          createTime = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].CreatedTime);
          break;
        }
      }
      createTime.setHours(0, 0, 0, 0);
      return this.dateRemain = Ps_UtilObjectService.getDaysLeft(createTime, startOfEndDate);
    }
    // Trường hợp sửa đầu việc (Trong bảng đầu việc)
    if (task.Task) {
      if ([1, 2].includes(this.TypeData)) {
        return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
      } else {
        let createTime = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].CreatedTime);
        for (let i = 0; i < this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length; i++) {
          if (this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].Status == 3) {
            createTime = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].CreatedTime);
            break;
          }
        }
        createTime.setHours(0, 0, 0, 0);
        return this.dateRemain = Ps_UtilObjectService.getDaysLeft(createTime, startOfEndDate);
      }

      // if(this.isDatePickerChange && ![1, 2].includes(this.TypeData)){
      //   return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfCurrentDate, startOfEndDate);
      // }

      // let createTime = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[0].CreatedTime);
      // for(let i = 0; i < this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog.length; i++){
      //   if(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].Status == 3){
      //     createTime = new Date(this.DataHRDecisionTaskOrigin.ListHRDecisionTaskLog[i].CreatedTime);
      //     break;
      //   }
      // }
      // createTime.setHours(0, 0, 0, 0);
      // return this.dateRemain = Ps_UtilObjectService.getDaysLeft(createTime, startOfEndDate);

      // return this.dateRemain = Ps_UtilObjectService.getDaysLeft(startOfStartBoarding, startOfEndDate);
    }
  }


  // handleCalDate(createTime: any, endDate: any) {
  //   // Đảm bảo startDate và endDate là đối tượng Date
  //   let normalizedCurrentDate: Date = new Date();
  //   let normalizedEndDate: Date = new Date(endDate);
  //   let normalizedCreateTime: Date = new Date(createTime);
  //   let normalizedStartDateEstimate: Date = new Date(this.DataHRDecisionProfileMaster.StartDate);

  //   // Kiểm tra nếu normalizedCurrentDate và normalizedEndDate là ngày hợp lệ
  //   if (isNaN(normalizedCurrentDate.getTime()) || isNaN(normalizedEndDate.getTime())) {
  //     return 0; // Hoặc xử lý lỗi phù hợp
  //   }

  //   // Đặt giờ về 00:00:00
  //   normalizedCurrentDate.setHours(0, 0, 0, 0);
  //   normalizedEndDate.setHours(0, 0, 0, 0);
  //   normalizedCreateTime.setHours(0, 0, 0, 0);
  //   normalizedStartDateEstimate.setHours(0, 0, 0, 0);

  //   if (!normalizedCurrentDate || !normalizedEndDate || !normalizedCreateTime) {
  //     return 0;
  //   }
  //   else {
  //     // Ở bước chuẩn bị on/offboarding
  //     if (this.DataHRDecisionProfileMaster.Status == 1) {
  //       this.dateRemain = Ps_UtilObjectService.getDaysLeft(normalizedCurrentDate, normalizedEndDate);
  //     }
  //     // Ở bước on/offboarding
  //     else if (this.DataHRDecisionProfileMaster.Status == 2) {
  //       // Nếu đầu việc được thêm mới hoặc Nếu đầu việc được sửa
  //       if (this.MultiForm.get('Code').value == 0 || this.isDatePickerChange) {
  //         this.dateRemain = Ps_UtilObjectService.getDaysLeft(normalizedCreateTime, normalizedEndDate);
  //       }
  //       else {
  //         this.dateRemain = Ps_UtilObjectService.getDaysLeft(normalizedStartDateEstimate, normalizedEndDate);
  //       }
  //     }
  //     // Ở bước on/offboared hoặc ngưng
  //     else if ([3, 4].includes(this.DataHRDecisionProfileMaster.Status)) {
  //       if (Ps_UtilObjectService.hasValueString(this.DataHRDecisionProfileMaster.StartDate)) {
  //         let startDate = new Date(this.DataHRDecisionProfileMaster.StartDate);
  //         startDate.setHours(0, 0, 0, 0);

  //         this.dateRemain = Ps_UtilObjectService.getDaysLeft(startDate, normalizedEndDate);
  //       }
  //     }
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
        referenceTime = this.DataHRDecisionTaskOrigin.DecisionTypeName === 'Offboarding'
          ? getLogTime(4)  // Offboarding lấy thời gian gửi duyệt
          : getLogTime(6); // Các trường hợp khác lấy thời gian hoàn thành
        break;
    }

    this.deadlineDate = Math.abs(Ps_UtilObjectService.getDaysLeft(normalizedEndDate, referenceTime));
  }


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

  /**
   * Check offboard
   * @returns true nếu có thể Boarded
   */
  checkOnboarded(data: DTOHRDecisionTask[]): boolean {
    const dataFilter = data.filter(item => item.Status === 3 || item.Status === 4);
    return !Ps_UtilObjectService.hasListValue(dataFilter);
  }

  /**
   * Hàm dùng để kiểm tra có dữ liệu ở block thông tin hay không
   * @param text
   * @returns nếu không trả về (Trống)
   */
  handleCheckTextBlank(text: any) {
    if (Ps_UtilObjectService.hasValue(text)) {
      return `<span title='${text}' class='text'>${text}</span>`;
    }
    return '<i class="blank-text">(Trống)</i>';
  }

  /**
   * Hàm check hiển thị hay không của 1 field nào đó
   * @param field tự định nghĩa
   * @returns true nếu hiển thị
   */
  handleVisibleField(field: string): boolean {
    let profile: DTOHRDecisionProfile;

    if (Ps_UtilObjectService.hasValue(this.DataHRDecisionProfileMaster)) {
      profile = this.DataHRDecisionProfileMaster;
    }

    switch (field) {
      // Ngày kết thúc thử việc
      case 'trial-date-end': {
        return profile.Status == 2 && profile.BoardingType == 1 && profile.DecisionType == 1;
      }

      // Điểm làm việc
      case 'location': {
        return profile.LocationName !== profile.CurrentLocationName;
      }

      // Đơn vị
      case 'department': {
        return profile.DepartmentName !== profile.CurrentDepartmentName;
      }

      // Chức danh
      case 'position': {
        return profile.PositionName !== profile.CurrentPositionName;
      }

      // Chức danh
      case 'typePositionName': {
        return profile.TypePositionName !== profile.CurrentTypePositionName;
      }

      // Thông tin điều chuyển thêm
      case 'detail-transfer': {
        return profile.DecisionType == 2 && this.TypeData == 3 && this.isShowDetailTransfer;
      }
    }
  }



  //#region ACTION
  handleUpdateStatus(data: DTOHRDecisionProfile, typeData: number) {
    if (Ps_UtilObjectService.hasValue(data.Code)) {
      if (this.TypeData == 2) {
        data.StartDate = null;
      }

      // Kiểm tra điều kiện task
      const condOfTask = !this.gridTaskList.listTask.data.some(
        (item) =>
          (item.Status !== 2 && item.Status !== 5) && !this.gridTaskList.isValidTask(item)
      );


      if (condOfTask) {
        // Nếu chuẩn bị Onboarding hoặc Offboarding
        if ([1, 2].includes(typeData)) {
          this.isLoadingPage = true;
          this.APIUpdateHRDecisionProfileStatus([data], 2);
          return;
        }

        // Nếu đang Onboarding hoặc Offboarding
        if ([3, 4].includes(typeData)) {
          if (this.checkOnboarded(this.gridTaskList.listTask.data)) {
            this.isLoadingPage = true;
            this.APIUpdateHRDecisionProfileBoardingStatus([data], 4);
            // this.APIUpdateHRDecisionProfileStatus([data], 4)
          }
          else {
            this.layoutService.onError("Đã xảy ra lỗi khi cập nhật trạng thái: Tất cả đầu việc cần thiết chưa được hoàn thành!")
          }
        }
      } else {
        this.layoutService.onError("Đã xảy ra lỗi khi cập nhật trạng thái: Có công việc không đủ thông tin!")
      }
    }
  }

  /**
   * Hàm dùng để check xem có đầu việc nào bên trong danh sách đầu việc còn thiếu thông tin hay không
   * @param data danh sách đầu việc
   * @param typeData Input TypeData
   * @returns
   */
  checkProperties(data: DTOHRDecisionTask[], typeData: number = this.TypeData): { ItemIndex: number; MissingProperties: string[] }[] {
    if (typeData !== 1 && typeData !== 2) {
      return null;
    }

    const requiredProperties = [
      "AssigneeName", "AssigneeID", "AssigneePositionName", "TaskName", "ListOfTypeStaff"
    ];

    if (typeData == 2) {
      requiredProperties.push("ApprovedPositionName", "ApprovedName", "ApprovedID");
    }

    const results = data.map((item, index) => {
      const missingProperties: string[] = [];

      requiredProperties.forEach((prop) => {
        if (!item.hasOwnProperty(prop) || !Ps_UtilObjectService.hasValue(item[prop])) {
          if (item.Status == 1 && item.TypeAssignee == 2) {
            missingProperties.push(prop);
          }
        }
      });

      return {
        ItemIndex: index,
        MissingProperties: missingProperties
      };
    });

    // Lọc những item có MissingProperties không rỗng
    return results.filter(result => result.MissingProperties.length > 0);
  }

  /**
   * Hàm dùng để lấy action từ dropdown list
   * @param data
   */
  handleGetAction(data: any) {
    this.DataHRDecisionTask = data.item;
    this.DataHRDecisionTask.DecisionProfile = this.DataHRDecisionProfileMaster.Code;

    // Kiểm tra quyền tương tác
    this.isEdit = data.status == "Edit";
    this.isView = !this.isEdit;
    this.isCreate = false;

    // Đối với chỉnh sửa
    if (data.status == "Edit") {
      if (Ps_UtilObjectService.hasValue(this.DataHRDecisionTask.PositionAssignee)) {
        this.isDropdownAssignee = false;
      }
    }

    // Lấy danh sách lý do
    if ([2, 5].includes(this.DataHRDecisionTask.Status)) {
      this.APIGetListHRReasonStop(23)
    }
    else {
      this.APIGetListHRReasonStop(24)
    }

    // Drawer cập nhật hoặc xem chi tiết
    this.statusDrawer = 1;
    this.MultiForm = this.onLoadForm();
    this.MultiForm.patchValue(this.DataHRDecisionTask);
    this.DataHRDecisionTaskOrigin = this.MultiForm.value
    this.getTitleReason(this.DataHRDecisionTask.Status)

    // Set trưởng đơn vị, điểm làm việc
    if (!Ps_UtilObjectService.hasValue(this.MultiForm.get('IsLeaderMonitor')?.value)) {
      this.IsLeaderMonitor = false;
    }
    else {
      this.IsLeaderMonitor = this.MultiForm.get('IsLeaderMonitor')?.value;

      if (this.IsLeaderMonitor) {
        this.MultiForm.get('Approved').setValue(null);
        this.MultiForm.get('PositionApproved').setValue(null);
      }
    }

    // Đối với chuẩn bị On/Offboarding
    if ([1, 2].includes(this.TypeData) && !Ps_UtilObjectService.hasValueString(this.DataHRDecisionProfileMaster.EndDate) && !Ps_UtilObjectService.hasValueString(data.item.EndDate)) {
      const tempDate = Ps_UtilObjectService.addDays(new Date(this.DataHRDecisionProfileMaster.StartDate), this.MultiForm.get('DateDuration')?.value)
      this.MultiForm.get('EndDate')?.setValue(tempDate);
    }

    // Đối với On/Offboarding
    if ([3, 4].includes(this.TypeData) && !Ps_UtilObjectService.hasValueString(this.DataHRDecisionProfileMaster.EndDate) && !Ps_UtilObjectService.hasValueString(data.item.EndDate)) {
      const tempDate = Ps_UtilObjectService.addDays(this.currentDate, this.MultiForm.get('DateDuration')?.value)
      this.MultiForm.get('EndDate')?.setValue(tempDate);
    }

    // Binding nhân sự thực hiện
    this.isSelectedPosition3 = this.MultiForm.get('TypeAssignee').value == 3;

    // Nhân sự áp dụng
    if (this.MultiForm.get('TypeAssignee').value == 3) {
      this.MultiForm.get('PositionAssignee').setValue(-1);
      this.MultiForm.get('TypeAssignee').setValue(3);
    }
    else if (this.MultiForm.get('TypeAssignee').value == 2) {
      this.MultiForm.get('PositionAssignee').setValue(data.item.PositionAssignee);
      this.MultiForm.get('TypeAssignee').setValue(2);
      this.MultiForm.get('Assignee').setValue(data.item.Assignee);
      this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: this.MultiForm.get('PositionAssignee').value }];
      this.APIGetListEmployee(1);
    }

    // Binding Duyệt bởi
    if ([2, 4, 6, 8].includes(this.TypeData)) {
      this.gridStateStaff.filter.filters = [{ field: 'CurrentPosition', operator: 'eq', value: this.MultiForm.get('PositionApproved').value }];
      this.APIGetListEmployee(2);
    }

    // Disable dropdown Thực hiện bởi, Duyệt bởi
    this.hasPositionAssignee = Ps_UtilObjectService.hasValue(this.MultiForm.get('PositionAssignee').value);
    this.hasPositionApprover = Ps_UtilObjectService.hasValue(this.MultiForm.get('PositionApproved').value);

    this.handleOpenDrawer();
  }

  handleGetUpdateStatusTask(e: any) {
    if (e) {
      // this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster);
      if ((this.TypeData == 3 || this.TypeData == 4) && this.DataHRDecisionProfileMaster.Status == 2) {
        this.APIGetHRDecisionProfileBoarding(this.DataHRDecisionProfileMaster)
      } else {
        this.APIGetHRDecisionProfile(this.DataHRDecisionProfileMaster)
      }
    }
  }

  handleGetNew(data) {
    if (data.status == 13) {
      this.APIGetListHRLSTask();
      this.statusDrawer = 0
      this.isEdit = false
      this.isView = false
      this.isCreate = true
      this.MultiForm = this.onLoadForm();
      this.MultiForm.patchValue(new DTOHRDecisionTask);
      this.hasPositionApprover = false;
      this.hasPositionAssignee = false;
      this.isSelectedPosition3 = false;

      if (this.DataHRDecisionProfileMaster.Status == 1) {
        this.MultiForm.patchValue({
          Status: 1
        })
      } else if (this.DataHRDecisionProfileMaster.Status == 2) {
        this.MultiForm.patchValue({
          Status: 3
        })
      }
      this.DataHRDecisionTaskOrigin = this.MultiForm.value
      this.handleOpenDrawer()
    }
  }

  /**
   * Hàm kiểm tra danh sách đầu việc có đang select items không?
   */
  onGetPopupAction(value: boolean) {
    this.isShowPopUpSelection = value;
  }

  /**
   * Hàm trả về true nếu thỏa điều kiện show button update status profile
   * @returns
   */
  checkShowButtonUpdate(): boolean {
    if ([1, 2].includes(this.TypeData)) {
      return this.DataHRDecisionProfileMaster.Status == 1;
    }
    if ([3, 4].includes(this.TypeData)) {

      if (Ps_UtilObjectService.hasValue(this.detailStaff) && Ps_UtilObjectService.hasValue(this.DataHRDecisionProfileMaster)) {
        const checkHasPerToBoarded = this.actionPerm.findIndex((s) => s.ActionType == 7) > -1 || false;
        const checkDepartment = this.DataHRDecisionProfileMaster.Department == this.detailStaff.Department;
        const checkLocation = this.DataHRDecisionProfileMaster.Location == this.detailStaff.Location;
        if (checkHasPerToBoarded && this.DataHRDecisionProfileMaster.Status == 2) {
          // console.log((this.detailStaff?.IsSupervivor && checkDepartment && checkLocation) || (this.detailStaff?.IsLeader && checkDepartment) || (checkDepartment && checkLocation))
          return (this.detailStaff?.IsSupervivor && checkDepartment && checkLocation) || (this.detailStaff?.IsLeader && checkDepartment) || (checkDepartment && checkLocation);
        } else {
          return false;
        }
      }
      // return this.DataHRDecisionProfileMaster.Status == 2 && this.hasPerToBoarded;
    }
    return false;
  }

  /**
   * Hàm format ngày thành 2024-27-12T16:57:44
   * @param date ngày có kiểu giống 'Fri Dec 27 2024 16:57:44 GMT+0700 (Indochina Time)'
   * @returns
   */
  formatDateToCustomFormat(date: Date): string {
    // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Kết hợp theo định dạng yêu cầu
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  /**
   * Hàm kiểm tra item của loại nhân sự áp dụng có bị disabled hay không
   * @param dataItem item trong multiselect
   * @returns false nếu thoả disabled
   */
  isDisabledItemTypeStaff(dataItem: any) {
    if ([3, 4].includes(this.TypeData)) {
      return this.DataHRDecisionProfileMaster.TypeStaff != dataItem.OrderBy;
    }
  }

  /**
   * Hàm xử lý khi đổi selection của combobox
   * @param task
   */
  onChangeTaskList(task: DTOHRLSTaskCus) {
    if (Ps_UtilObjectService.hasValue(task)) {
      this.taskSelected = task;
      this.hasTaskSelected = true;
      this.MultiForm.get('TaskName').setValue(this.taskSelected.Name);
      this.MultiForm.get('LSTask').setValue(this.taskSelected.Code);
      this.MultiForm.get('LSTaskID').setValue(this.taskSelected.ID);
      this.MultiForm.get('Description').setValue(this.taskSelected.Description);
    } else {
      this.taskSelected = null;
      this.hasTaskSelected = false;
      this.MultiForm.get('TaskName').reset();
      this.MultiForm.get('LSTask').reset();
      this.MultiForm.get('LSTaskID').reset();
      this.MultiForm.get('Description').reset();
    }
  }

  /**
   * Handle get list task từ hr-task-list
   */
  getListTaskOutPut(listTask: DTOHRDecisionTask[]) {
    this.DataTaskChild = listTask;
  }

  /**
   * Hàm xử lý lọc LSTaskID đã tồn tại ra khỏi list LSTask
   * @param listOrigin
   */
  handleFilterObjectExisted(listOrigin: DTOHRDecisionTask[]) {
    // Tạo Set chứa tất cả LSTaskID trong listHRPolicyTask để tra cứu nhanh
    const hrPolicyTaskIDs = new Set(listOrigin.map(task => task.LSTaskID));

    // Lọc listTask, loại bỏ những task có LSTaskID đã tồn tại trong listHRPolicyTask
    this.listHRLSTask = this.listHRLSTask.filter(item => !hrPolicyTaskIDs.has(item.ID));
    this.listHRLSTaskOrigin = this.listHRLSTask;
  }


  ngOnDestroy(): void {
    // this.destroy$.next()
    // this.destroy$.complete()
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
}
