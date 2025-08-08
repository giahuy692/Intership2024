import { HriDecisionApiService } from './../../services/hri-decision-api.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOHRPetitionMaster } from '../../dto/DTOHRPetitionMaster.dto';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import {
  CompositeFilterDescriptor,
  distinct,
  FilterDescriptor,
  isCompositeFilterDescriptor,
  SortDescriptor,
  State,
} from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOHRDecisionTask } from '../../dto/DTOHRDecisionTask.dto';
import { RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { DTOHRDecisionMaster } from '../../dto/DTOHRDecisionMaster.dto';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOEmployee } from '../../dto/DTOEmployee.dto';
import { DTOListHR } from '../../dto/DTOPersonalInfo.dto';
import { StaffApiService } from '../../services/staff-api.service';
import { Day } from '@progress/kendo-date-math';
import { HriTransitionApiService } from '../../services/hri-transition-api.service';
import { DTOHRPolicyPosition } from '../../dto/DTOHRPolicyPosition.dto';
import {
  MenuDataItem,
  ModuleDataItem,
} from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { PageChangeEvent } from '@progress/kendo-angular-treelist';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { MarNewsProductAPIService } from 'src/app/p-app/p-marketing/shared/services/marnewsproduct-api.service';
import { DTOHRDecisionTaskLog } from '../../dto/DTOHRDecisionTaskLog.dto';
import { PKendoTextboxComponent } from 'src/app/p-app/p-layout/components/p-kendo-textbox/p-textbox.component';
import { PKendodropdownlistComponent } from 'src/app/p-app/p-layout/components/p-kendo-dropdownlist/p-kendo-dropdownlist.component';
import { DTOHRDecisionProfile } from '../../dto/DTOHRDecisionProfile.dto';
//Hoàng làm
import { DTOHRLSTaskCus } from '../../dto/DTOHRTaskCategory.dto';
import { HriTaskCategoryApiService } from '../../services/hri-task-category-api.service';

//Hoàng làm
@Component({
  selector: 'app-hr-offboard-decision-detail',
  templateUrl: './hr-offboard-decision-detail.component.html',
  styleUrls: ['./hr-offboard-decision-detail.component.scss'],
})
/**
 * Component dùng chung cho page Quyết định nghỉ việc, kỷ luật và Đề nghị nghỉ việc
 */
export class HrOffboardDecisionDetailComponent implements OnInit, OnDestroy {
  @Input({ required: true }) TypeData = 5;

  isFilterDisable: boolean = false;
  isAddNew: boolean = false;
  isLockAll: boolean = false;
  isDeleteDecisionDialogShow: boolean = false;
  isConfirmApproveDialogShow: boolean = false;
  isInformationBlockLoading: boolean = false; // Loading của THÔNG TIN NHÂN SỰ
  isDecisionDetailBlockLoading: boolean = false; // Loading của CHI TIẾT QUYẾT ĐỊNH NGHỈ VIỆC
  isRequestDetailBlockLoading: boolean = false; // Loading của CHI TIẾT YÊU CẦU NGHỈ VIỆC
  isResponeDetailBlockLoading: boolean = false; // Loading của PHẢN HỒI ĐƠN (PHÊ DUYỆT HOẶC RÚT ĐƠN HOẶC TỪ CHỐI)
  isTaskListLoading: boolean = false; // Loading của DANH SÁCH ĐẦU VIỆC
  isStoppedDecisionDialogShow: boolean = false;
  isLoadingPage: boolean = false; // Loading trang
  hasPrint: boolean = false; // Có icon in hay không
  hasWord: boolean = false; // Có icon word hay không
  isPetition: boolean = false;
  arrBtnStatus: {
    text: string;
    class: string;
    code: string;
    link?: any;
    type?: string;
  }[] = [];
  errorOccurred: any = {};
  disabledDates: Day[] = [Day.Sunday];

  oldStaffID: string = '';
  petition: DTOHRPetitionMaster = new DTOHRPetitionMaster();
  decision: DTOHRDecisionMaster = new DTOHRDecisionMaster();

  pickFileCallback: Function;
  GetFolderCallback: Function;

  //#region Resignation
  listResignReason: DTOListHR[];
  curReason: DTOListHR = new DTOListHR();
  curSentDate: Date = new Date();
  JoinDate: Date;

  //#endregion

  //#region DRAWER
  isOpenDrawer: boolean = false;
  isAddNewProfile: boolean = false;
  isShowAll: boolean = false;
  isEdit: boolean = false;
  isSeeDetail: boolean = false;
  taskItem: DTOHRDecisionTask = new DTOHRDecisionTask();
  listAssignee: DTOListHR[];
  listApprover: DTOHRPolicyPosition[];
  listApprover2: DTOHRPolicyPosition[];
  curTypeAssignee: DTOListHR = new DTOListHR();
  curPositionApprove: DTOHRPolicyPosition = new DTOHRPolicyPosition();
  curPositionApproveStorage: DTOHRPolicyPosition = new DTOHRPolicyPosition();
  curPositionAssignee: DTOHRPolicyPosition = new DTOHRPolicyPosition();
  curReasonStatusDescription: any;
  DataHRTaskLog: DTOHRDecisionTaskLog[];
  listStatusDropdownFitler = [];

  //#endregion

  //#region Approve
  listDeclineReason: DTOListHR[];
  listStatusApprove: { Code: number; Text: string }[] = [
    { Code: 4, Text: 'Chấp nhận' },
    { Code: 5, Text: 'Từ chối' },
  ];
  approveStatus: { Code: number; Text: string } = {
    Code: 4,
    Text: 'Chấp nhận',
  };
  reasonStatus: { Code: number; Text: string } = { Code: null, Text: null };
  leaveDate: Date;
  valueSearch: any = ''; // Giá trị tìm kiếm
  isLeader: boolean = false; // Có phải là trưởng đơn vị hay không
  tempApprover: DTOHRPolicyPosition = new DTOHRPolicyPosition(); // Lưu trữ giá trị ban đầu của người duyệt
  //#endregion

  //#region GRID
  isDeleteTaskDialogShow: boolean = false;
  gridView = new Subject<any>();
  gridData: DTOHRDecisionTask[] = [];
  page: number = 0;
  pageSize: number = 25;
  pageSizes: number[] = [25, 50, 75, 100];
  total: number = 0;
  selectedTask: DTOHRDecisionTask;
  listReqDelTask: DTOHRDecisionTask[] = [];
  filterSearch: CompositeFilterDescriptor;
  // listTaskTest: DTOHRDecisionTask[] = listTaskTest;

  gridState: State = {
    skip: this.page,
    take: this.pageSize,
    sort: [{ field: 'Code', dir: 'desc' }],
    filter: { filters: [], logic: 'and' },
  };

  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  };

  onPageChangeCallback: Function;
  onActionDropDownClickCallback: Function;
  onSelectCallback: Function;
  onSelectedPopupBtnCallback: Function;
  getActionDropdownCallback: Function;
  getSelectionPopupCallback: Function;
  onSortChangeCallback: Function;
  //#endregion

  //#region ENUM
  /**
   * Quyết định nghỉ việc
   */
  ResignationENUM: number = 4;
  /**
   * Quyết định kỷ luật
   */
  TerminationENUM: number = 3;
  /**
   * Đơn xin nghỉ việc
   */
  PetitionENUM: number = 5;
  //#endregion

  //#region Permission
  justLoadedChangePermissionAPI: boolean = true;
  justLoaded: boolean = true;
  actionPerm: any;
  isAllowedToCreate: boolean = false;
  isAllowedToVerify: boolean = false;
  isMaster: boolean = false;
  M_A: boolean = false;
  M_C: boolean = false;
  /**
   * Danh sách quyền
   * - 0. Master
   * - 1. Creator
   * - 2. Approver
   */
  listPermission: number[] = [];
  listSelectedTask: DTOHRDecisionTask[] = []; // Danh sách các đầu việc được chọn

  isStoppedPetitionDialogShow: boolean = false;
  isLoadingReason: boolean = false; // Loading của dropdown chọn lý do
  listReason: DTOListHR[] = [];
  isObligatoryReason: boolean = false; // Có bắt buộc nhập mô tả không

  ReasonStatusDescription: string = null;

  //#endregion

  // Hoàng làm
  hasTaskSelected: boolean = false;
  taskSelected: DTOHRLSTaskCus = null;
  dataHRDecisionTaskHandler = new DTOHRDecisionTask();
  isLoadingCombobox: boolean = false;
  listHRLSTask: DTOHRLSTaskCus[] = []; // Danh sách công việc trong đầu công việc
  listHRLSTaskOrigin: DTOHRLSTaskCus[] = []; // Danh sách công việc trong đầu công việc gốc
  gridStateHRLSTask: State = { filter: { logic: 'and', filters: [{ field: 'Status', value: 2, operator: 'eq', ignoreCase: true }] } };
  destroy$ = new Subject<void>();
  isOnOfLSTask: boolean = true;
  gridStateTaskOrigin: State = { filter: { logic: "and", filters: [] } }
  listTaskOrgin: DTOHRDecisionTask[];

  // Hoàng làm
  currentDate: Date = new Date();
  unsubscribe = new Subject<void>();
  arrSub: Subscription[] = [];

  @ViewChild('staffTextbox') staffTextbox: PKendoTextboxComponent;
  @ViewChild('dropdownReason') dropdownReason: PKendodropdownlistComponent;

  constructor(
    private menuService: PS_HelperMenuService,
    private domSanititizer: DomSanitizer,
    private decisionService: HriDecisionApiService,
    private layoutService: LayoutService,
    private staffService: StaffApiService,
    private hriTransitionService: HriTransitionApiService,
    private apiServiceMar: MarNewsProductAPIService,
    // Hoàng thêm
    private taskCategoryService: HriTaskCategoryApiService
  ) {}

  ngOnInit(): void {
    let a = this.menuService
      .changePermission()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: DTOPermission) => {
        if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
          this.justLoaded = false;
          this.actionPerm = distinct(res.ActionPermission, 'ActionType');

          this.isMaster =
            this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
          this.isAllowedToCreate =
            this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
          this.isAllowedToVerify =
            this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;

          this.M_A = this.isMaster || this.isAllowedToVerify;
          this.M_C = this.isMaster || this.isAllowedToCreate;

          this.listPermission = [
            this.isMaster && 0,
            this.isAllowedToCreate && 1,
            this.isAllowedToVerify && 2,
          ];
        }
      });

    this.currentDate.setHours(0, 0, 0, 0);
    this.curSentDate.setHours(0, 0, 0, 0);

    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.onActionDropDownClickCallback = this.onMoreActionItemClick.bind(this);
    this.onPageChangeCallback = this.onPageChange.bind(this);
    this.onSortChangeCallback = this.sortChange.bind(this);
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this);
    this.onSelectCallback = this.onGridItemSelect.bind(this);
    this.onSelectedPopupBtnCallback =
      this.onSelectionActionItemClick.bind(this);

    this.pickFileCallback = this.pickFile.bind(this);
    this.GetFolderCallback = this.GetFolderWithFile.bind(this);

    let b = this.menuService
      .changePermissionAPI()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        if (
          Ps_UtilObjectService.hasValue(res) &&
          this.justLoadedChangePermissionAPI
        ) {
          this.justLoadedChangePermissionAPI = false;

          if (this.TypeData == this.PetitionENUM) {
            this.APIGetListHRReason();
          }

          this.getCache();
          // this.setupBtnStatus();
          this.APIGetListHR(5);
          if (this.TypeData == this.TerminationENUM) {
            this.APIGetListHR(22);
          } else {
            this.APIGetListHR(19);
          }
          this.APIGetListHR(21);
          this.APIGetListHRPolicyPosition();

          this.JoinDate = new Date(
            new Date(this.petition.JoinDate).setDate(
              new Date(this.petition.JoinDate).getDate() + 1
            )
          );
        }
      });
    this.arrSub.push(a, b);
  }

  /**
   * Hàm lấy cache
   */
  getCache() {
    const cacheDecision = JSON.parse(localStorage.getItem('HrDecisionMaster'));
    const cachePetition = JSON.parse(localStorage.getItem('HrPetitionMaster'));

    // Nếu có thông tin đơn thì mới loading cho các block
    if (
      Ps_UtilObjectService.hasValue(cachePetition) &&
      cachePetition.Code !== 0
    ) {
      this.isInformationBlockLoading = true;
      this.isDecisionDetailBlockLoading = true;
      this.isTaskListLoading = true;
      this.isRequestDetailBlockLoading = true;
      this.isResponeDetailBlockLoading = true;
    }

    // Nếu là đơn xin nghỉ việc
    if (this.TypeData == this.PetitionENUM) {
      if (Ps_UtilObjectService.hasValue(cachePetition)) {
        this.petition = cachePetition;
        this.isAddNew = this.petition.Code == 0;

        // Thêm mới
        if (this.isAddNew) {
          this.isInformationBlockLoading = false;
        }

        // Đơn có sẵn
        else {
          this.APIGetHRPetitionMaster(this.petition); // Lấy thông tin đơn/yêu cầu/quyết định
        }
      }
      return;
    }

    // Nếu là quyết định nghỉ việc
    if (this.TypeData == this.ResignationENUM) {
      if (Ps_UtilObjectService.hasValue(cacheDecision)) {
        this.decision = cacheDecision;
        this.decision.TypeData = 3;

        this.isAddNew = this.decision.Code == 0;

        // Tạo mới
        if (this.isAddNew) {
          this.isInformationBlockLoading = false;
        }
        // Quyết định có sẵn
        else {
          this.APIGetHRDecisionMaster();

          // Lấy thông tin nhân sự
          const employee = new DTOEmployee();
          employee.StaffID = this.decision.StaffID;
          this.APIGetHREmployeeByID(employee, []);
        }
      }
      return;
    }

    // // Quyết định kỷ luật
    // if (this.TypeData != this.TerminationENUM) {
    //   this.loadFilter();
    // }
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

    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}T${hours}:${minutes}:${seconds}`;
  }

  /**
   * Hàm thiết lập các nút chức năng trên header
   */
  setupBtnStatus() {
    this.arrBtnStatus = [];

    this.M_A = this.isMaster || this.isAllowedToVerify;
    this.M_C = this.isMaster || this.isAllowedToCreate;

    // Không có quyền duyệt thì không được chỉnh sửa danh sách đầu việc
    this.selectable.enabled = this.M_A;

    // Kiểm tra quyền tạo hoặc toàn quyền
    const canCreateOrAdmin =
      this.listPermission.includes(0) || this.listPermission.includes(1);
    // Kiểm tra quyền duyệt
    const canVerify =
      this.listPermission.includes(0) || this.listPermission.includes(2);
    // Kiểm tra có phải là đơn xin nghỉ việc hay không
    this.isPetition = this.TypeData == this.PetitionENUM;
    var petitionStatus = this.petition.Status;

    //Kiểm tra ngày hiệu lực
    const startOfDate = this.formatDateToFilter(new Date(), 'Start');
    const startOfEffDate = this.formatDateToFilter(
      new Date(this.decision.EffDate),
      'Start'
    );
    const canStop =
      Ps_UtilObjectService.getDaysLeft(startOfDate, startOfEffDate) > 0;
    const con1 = [0, 4].includes(this.decision.Status);
    const con2 = [1, 3].includes(this.decision.Status);

    // Đối với quyết định
    if (this.decision.Code != 0) {
      const status = this.decision.Status;
      // Trạng thái hiện tại: Đang soạn thảo và trả về
      if (canCreateOrAdmin && con1) {
        this.arrBtnStatus.push({
          text: 'GỬI DUYỆT',
          class: 'k-button btn-hachi hachi-primary',
          code: 'redo',
          link: 1,
          type: 'status',
        });
      }
      // Trạng thái hiện tại: Gửi duyệt hoặc Ngưng áp dụng
      else if (canVerify && this.decision.Status == 1) {
        this.arrBtnStatus.push({
          text: 'TRẢ VỀ',
          class: 'k-button btn-hachi hachi-warning hachi-secondary',
          code: 'undo',
          link: 4,
          type: 'status',
        });
        this.arrBtnStatus.push({
          text: 'DUYỆT ÁP DỤNG',
          class: 'k-button btn-hachi hachi-primary',
          code: 'check-outline',
          link: 2,
          type: 'status',
        });
      }
      // Trạng thái hiện tại: Duyệt áp dụng
      else if (canVerify && status === 2) {
        if (
          this.TypeData == this.TerminationENUM ||
          (this.TypeData == this.ResignationENUM && canStop)
        ) {
          this.arrBtnStatus.push({
            text: 'NGƯNG HIỂN THỊ',
            class: 'k-button btn-hachi hachi-warning',
            code: 'minus-outline',
            link: 3,
            type: 'status',
          });
        }
        this.arrBtnStatus.push({
          text: '',
          class: 'k-button export-print',
          code: 'print',
          link: 6,
          type: 'export',
        });
        this.arrBtnStatus.push({
          text: '',
          class: 'k-button export-word',
          code: 'file-word',
          link: 7,
          type: 'export',
        });

        this.hasPrint = true;
      }
    }
    // Nếu là đơn xin nghỉ
    else if (this.isPetition) {
      // Push "Gửi đơn" khi có quyền tạo hoặc toàn quyền và status = 1
      if (canCreateOrAdmin && petitionStatus === 1 && this.petition.Code != 0) {
        this.arrBtnStatus.push({
          text: 'GỬI ĐƠN',
          class: 'k-button btn-hachi hachi-primary',
          code: 'redo',
          link: 2,
          type: 'status',
        });
        this.arrBtnStatus.unshift({
          text: 'XÓA ĐƠN',
          class: 'k-button btn-hachi hachi-warning',
          code: 'trash',
          type: 'delete',
          link: 5,
        });
      }
    }

    if (
      (this.isAllowedToVerify || this.isMaster) &&
      this.TypeData != this.ResignationENUM &&
      this.petition.Code !== 0 &&
      this.petition.Status == 4
    ) {
      this.arrBtnStatus.push({
        text: 'Ngưng nghỉ việc',
        class: 'k-button btn-hachi hachi-warning',
        code: 'minus-outline',
        type: 'stop',
        link: 0,
      });
    }

    if (
      canCreateOrAdmin &&
      this.TypeData != this.ResignationENUM &&
      this.petition.Code !== 0
    ) {
      this.arrBtnStatus.push({
        text: 'Thêm MỚI ĐƠN',
        class: 'k-button btn-hachi hachi-primary',
        code: 'plus',
        type: 'add',
        link: 0,
      });
    }
  }

  onBreadCrumbClick() {
    this.getCache();
    // this.loadFilter();
  }

  /**
   * Function chuyển sang trang thông tin gốc
   */
  onSeeInfoClick() {
    let a = this.menuService
      .changeModuleData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((item: ModuleDataItem) => {
        var parent = item.ListMenu.find((f) => f.Code == 'hriStaff');
        if (
          Ps_UtilObjectService.hasValue(parent) &&
          Ps_UtilObjectService.hasListValue(parent.LstChild)
        ) {
          var detail = parent.LstChild.find(
            (f) =>
              f.Code.includes('hr001-staff-detail') ||
              f.Link.includes('/hri/hr001-staff-list')
          );
          if (
            Ps_UtilObjectService.hasValue(detail) &&
            Ps_UtilObjectService.hasListValue(detail.LstChild)
          ) {
            var detail2 = detail.LstChild.find(
              (f) =>
                f.Code.includes('hr001-staff-detail') ||
                f.Link.includes('/hri/hr001-staff-detail')
            );
            const Staff = new DTOEmployee();
            Staff.Code = this.petition.Staff;
            localStorage.setItem('Staff', JSON.stringify(Staff));
            this.menuService.selectedMenu(detail, parent);
            this.menuService.activeMenu(detail2);
          }
        }
      });
    this.arrSub.push(a);
  }

  /**
   * Hàm xử lí sự kiện click của các btn trên header
   * @param typeBtn
   * @param codeStatus
   */
  onHeaderBtnClick(typeBtn: string, codeStatus: number) {
    if (typeBtn == 'status') {
      this.onUpdateStatus(codeStatus);
    } else if (typeBtn == 'add') {
      if (this.TypeData == this.PetitionENUM) {
        this.onAddNewPetition();
      } else {
        this.onAddNewDecision();
      }
    } else if (typeBtn == 'delete') {
      this.isDeleteDecisionDialogShow = true;
    } else if (typeBtn == 'docx') {
      this.APIGetHRStaffLeaveReportWord();
    } else if (typeBtn == 'stop') {
      if ([1, 2].includes(this.petition.BoardingProfile.Status)) {
        this.isStoppedPetitionDialogShow = true;
      } else {
        this.layoutService.onWarning(
          'Nhân sự đã hoàn tất quá trình offboarding!'
        );
      }
    }
  }

  /**
   * Hàm xử lí khi bấm thêm mới Đơn
   */
  onAddNewPetition() {
    this.isAddNew = true;
    this.isLockAll = false;
    this.petition = new DTOHRPetitionMaster();
    this.curReason = this.listResignReason.find(
      (reason) => reason.Code == null
    ); // Reset lý do
    this.approveStatus = { Code: 4, Text: 'Chấp nhận' };
    this.reasonStatus = { Code: null, Text: null };
    localStorage.setItem('HrPetitionMaster', JSON.stringify(this.petition));

    this.setupBtnStatus();
  }

  /**
   * Hàm xử lí khi bấm thêm mới quyết định
   */
  onAddNewDecision() {
    this.isAddNew = true;
    this.isLockAll = false;
    this.decision = new DTOHRDecisionMaster();
    this.petition = new DTOHRPetitionMaster();
    localStorage.setItem('HrDecisionMaster', JSON.stringify(this.decision));
    this.setupBtnStatus();
  }

  /**
   * Hàm thực hiện khi bấm thêm mới đầu việc
   */
  onAddNewTask() {
    this.isOpenDrawer = true;
    this.taskItem = new DTOHRDecisionTask();
    this.taskSelected = null;
    this.taskItem.OrderBy = 1;
    this.taskItem.DateDuration = 5;
    this.curPositionAssignee.Position = -1;
    this.curPositionApprove.Position = null;
    this.hasTaskSelected = false;
    //Hoàng làm
    this.APIGetListHRLSTask();
  }

  onSearchChange(value: any) {
    this.valueSearch = value;
  }

  /**
   * Hàm xử lí khi user tiến hành filter
   * @param filterDescriptor
   */
  onFilterChange(filterDescriptor: any) {
    this.page = 0;
    this.gridState.skip = 0;
    this.gridState.filter.filters = [];

    this.filterSearch = filterDescriptor;

    this.loadFilter();
  }

  /**
   * Hàm xử li load filter cho grid
   */
  loadFilter() {
    //Kiểm tra nếu như filter descriptor đã tồn tại
    const containedDescriptor = this.gridState.filter.filters.findIndex(
      (v: FilterDescriptor | CompositeFilterDescriptor) => {
        return !isCompositeFilterDescriptor(v) && v.field === 'Petition';
      }
    );

    if (
      Ps_UtilObjectService.hasValueString(this.valueSearch) &&
      Ps_UtilObjectService.hasListValue(this.filterSearch.filters)
    ) {
      this.gridState.filter.filters.push(this.filterSearch);
    }

    if (containedDescriptor == -1 && !this.isAddNew) {
      // this.gridState.filter.filters.push({ field: 'TypeData', operator: 'eq', value: this.petition.TypeData });
      this.gridState.filter.filters.push({
        field: 'Petition',
        operator: 'eq',
        value: this.petition.Code,
      });
    }

    this.APIGetListHRDecisionTask();
  }

  /**
   * Hàm xử lí đóng mở drawer
   * @param isOpen
   */
  onToggleDrawer(isOpen = true) {
    this.isOpenDrawer = isOpen;
    this.isLeader = false;
    this.tempApprover = new DTOHRPolicyPosition();
    this.dataHRDecisionTaskHandler = new DTOHRDecisionTask();
    this.hasTaskSelected = false;
    this.taskItem = new DTOHRDecisionTask();
  }
  //Hoàng thêm hàm
  // /**
  //  * Hàm xử lí đóng mở drawer Decision
  //  * @param isOpen
  //  */
  // onToggleDrawerDecision(isOpen = true) {
  //   this.isOpenDrawer = isOpen;
  //   this.isLeader = false;
  //   this.hasTaskSelected = false;
  //   this.taskItem = new DTOHRDecisionTask();
  // }

  /**
   * Hàm xử lí chức năng cho các nút trên drawer
   * @param typeBtn
   */
  onDrawerBtnClick(typeBtn: string) {
    if (typeBtn == 'delete') {
      this.isDeleteTaskDialogShow = true;
      return;
    }

    // Đối với cập nhật đầu việc
    this.taskItem.ListOfTypeStaff = '[' + 2 + ']';

    let tempTask = JSON.parse(JSON.stringify(this.taskItem)); // Clone object
    // Nhân sự áp dụng
    if (Ps_UtilObjectService.hasValue(this.curPositionAssignee)) {
      // console.log(this.curPositionAssignee.Position)

      if (this.curPositionAssignee.Position == -1) {
        tempTask.AssigneeBy = null;
        tempTask.AssigneeName = null;
        tempTask.AssigneePositionName = null;
        tempTask.TypeAssignee = 3;
        tempTask.PositionAssignee = null;
      } else {
        tempTask.PositionAssignee = this.curPositionAssignee.Position;
        tempTask.TypeAssignee = 2;
      }
    }

    // Kiểm tra nếu TypeAssignee là 0 thì set về null để check điều kiện
    if (tempTask.TypeAssignee == 0) {
      tempTask.TypeAssignee = null;
    }

    tempTask.PositionApproved = this.curPositionApprove.Position;
    tempTask.TypeData = 4;
    tempTask.LSTask = this.dataHRDecisionTaskHandler.LSTask;
    // console.log(tempTask)
    if (this.onRequiredFieldCheck(tempTask, false, 2)) {
      this.taskItem = tempTask;
      this.APIUpdateHRDecisionTask(this.taskItem);
    }
  }

  /**
   * Hàm xử update trạng thái quyết định
   * @param status
   */
  onUpdateStatus(status: number) {
    //Nếu các trường bắt buộc đủ thông tin thì gọi API
    const tempPetition = JSON.parse(JSON.stringify(this.petition));

    // Đối với đơn xin nghỉ việc
    if (this.TypeData == this.PetitionENUM) {
      tempPetition.Status = status;
      // Nếu chấp nhận
      if (status == 4) {
        if (this.onRequiredFieldCheck(tempPetition, false, 1)) {
          this.isLoadingPage = true;
          this.APIUpdateHRPetitonMaster(
            tempPetition,
            [
              'LeaveDateApproved',
              'ReasonStatusDescription',
              'Status',
              'SentDate',
            ],
            2
          );
        }
      }
      // Nếu từ chối
      else if (status == 5) {
        if (!Ps_UtilObjectService.hasValue(this.reasonStatus.Code)) {
          this.layoutService.onError(
            'Đã xảy ra lỗi khi từ chối đơn xin nghỉ: Chưa chọn lý do từ chối'
          );
          return;
        } else {
          if (
            this.reasonStatus.Code == 78 &&
            !Ps_UtilObjectService.hasValueString(
              this.petition.ReasonStatusDescription
            )
          ) {
            this.layoutService.onError(
              'Đã xảy ra lỗi khi từ chối đơn xin nghỉ: Chưa nhập mô tả lý do từ chối'
            );
            return;
          } else {
            if (this.onRequiredFieldCheck(tempPetition)) {
              this.petition.ReasonStatus = this.reasonStatus.Code;
              tempPetition.ReasonStatus = this.reasonStatus.Code;
              this.isLoadingPage = true;
              this.APIUpdateHRPetitonMaster(
                tempPetition,
                [
                  'Status',
                  'SentDate',
                  'ReasonStatus',
                  'ReasonStatusDescription',
                ],
                1
              );
            }
          }
        }
      } else {
        if (this.onRequiredFieldCheck(tempPetition)) {
          this.isLoadingPage = true;
          this.APIUpdateHRPetitonMaster(tempPetition, ['Status', 'SentDate']);
        }
      }
    }
    // Đối với quyết định
    else {
      const tempDecision = JSON.parse(JSON.stringify(this.decision));
      tempDecision.Status = status;
      if (this.onRequiredFieldCheck(tempPetition, false, 3)) {
        if (status == 2) {
          this.isConfirmApproveDialogShow = true;
        } else if (status == 3) {
          this.isStoppedDecisionDialogShow = true;
        } else {
          this.isLoadingPage = true;
          this.APIUpdateHRDecisionMasterStatus([this.decision], status);
        }
      }
    }
  }

  /**
   * Hàm dùng để check xem field đó có cần hiển thị important hay không
   * @param field tự định nghĩa
   * @returns true nếu hiển thị
   */
  isVisible(field: string) {
    const condition1 = this.TypeData == this.PetitionENUM; // Đơn xin nghỉ việc
    const condition2 = this.TypeData == this.ResignationENUM; // Quyết định nghỉ việc

    switch (field) {
      // Lý do từ chối đơn
      case 'reason-decline': {
        return this.petition.Status == 2 && condition1;
      }

      // Mô tả lý do từ chối đơn
      case 'des-reason-decline': {
        return (
          this.petition.Status == 2 &&
          this.reasonStatus.Code == 78 &&
          condition1
        );
      }

      // Mô tả chi tiết lý do nghỉ việc
      case 'des-reason': {
        // Lý do khác
        return (
          this.petition.Reason == 68 && this.petition.Status == 1 && condition1
        );
      }
    }

    return true;
  }

  /**
   * Hàm dùng để check các trường bắt buộc của quyết định
   * @param isSkipMsg bỏ qua thông báo mặc định là false
   * @returns true | false
   */
  onRequiredFieldCheck(
    value: any,
    isSkipMsg: boolean = false,
    typeReq: number = 0
  ) {
    const type =
      this.TypeData == this.PetitionENUM ? 'đơn xin nghỉ' : 'quyết định';
    let msgStr = `Đã xảy ra lỗi khi cập nhật trạng thái ${type}: thiếu `;
    if (typeReq == 0) {
      if (this.TypeData == this.PetitionENUM) {
        if (!Ps_UtilObjectService.hasValueString(value.StaffID)) {
          if (!isSkipMsg) {
            this.layoutService.onError(msgStr + 'thông tin nhân sự');
          }
          return false;
        }

        if (!Ps_UtilObjectService.hasValueString(value.LeaveDate)) {
          if (!isSkipMsg) {
            this.layoutService.onError(msgStr + 'ngày dự kiến nghỉ việc');
          }
          return false;
        }

        if (!Ps_UtilObjectService.hasValueString(value.ReasonName)) {
          if (!isSkipMsg) {
            this.layoutService.onError(msgStr + 'lý do nghỉ việc');
          }
          return false;
        }

        if (
          !Ps_UtilObjectService.hasValueString(value.ReasonDescription) &&
          this.petition.Status == 1 &&
          this.petition.Reason == 68
        ) {
          if (!isSkipMsg) {
            this.layoutService.onError(
              msgStr + `mô tả chi tiết lý do nghỉ việc`
            );
          }
          return false;
        }
      }
    } else if (typeReq == 1) {
      const LeaveDateApproved = new Date(value.LeaveDateApproved);
      const currentDate = new Date();
      LeaveDateApproved.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      if (this.TypeData == this.PetitionENUM) {
        if (
          !Ps_UtilObjectService.hasValueString(value.LeaveDateApproved) &&
          value.Status == 4
        ) {
          if (!isSkipMsg) {
            this.layoutService.onError(
              msgStr + 'ngày nghỉ việc được phê duyệt'
            );
          }
          return false;
        }
        // Chỉ so sánh ngày, bỏ qua giờ phút giây
        else if (
          Ps_UtilObjectService.hasValueString(value.LeaveDateApproved) &&
          Ps_UtilObjectService.getDaysLeft(LeaveDateApproved, currentDate) >
            0 &&
          value.Status == 4
        ) {
          if (!isSkipMsg) {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi cập nhật trạng thái ${type}: Ngày nghỉ việc được phê duyệt phải lớn hơn hoặc bằng ngày hiện tại`
            );
          }
          return false;
        } else if (
          !Ps_UtilObjectService.hasValueString(value.ReasonStatusDescription) &&
          value.Status == 4
        ) {
          if (!isSkipMsg) {
            this.layoutService.onError(msgStr + 'điều kiện nghỉ việc');
          }
          return false;
        }
      }
    } else if (typeReq == 2) {
      if (!Ps_UtilObjectService.hasValueString(value.TaskName)) {
        if (!isSkipMsg) {
          this.layoutService.onError(msgStr + 'tên đầu việc');
        }
        return false;
      }

      if (value.TypeAssignee == 2) {
        // console.log(value)
        if (!Ps_UtilObjectService.hasValue(value.PositionAssignee)) {
          if (!isSkipMsg) {
            this.layoutService.onError(msgStr + 'thực hiện bởi');
          }
          return false;
        }
      } else if (!Ps_UtilObjectService.hasValue(value.TypeAssignee)) {
        if (!isSkipMsg) {
          this.layoutService.onError(msgStr + 'thực hiện bởi');
        }
        return false;
      }

      if (!Ps_UtilObjectService.hasValue(value.DateDuration)) {
        if (!isSkipMsg) {
          this.layoutService.onError(msgStr + 'thời gian hoàn tất');
        }
        return false;
      }

      if (
        !Ps_UtilObjectService.hasValue(value.PositionApproved) &&
        !this.isLeader
      ) {
        if (!isSkipMsg) {
          this.layoutService.onError(msgStr + 'duyệt bởi');
        }
        return false;
      }
    }
    return true;
  }

  /**
   * Hàm xử lí lấy ảnh bắt các lỗi có thể xảy ra
   * @param str
   * @param imageKey
   * @returns
   */
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
    }

    return '../../../../../assets/img/icon/icon-nonImageThumb.svg';
  }

  handleError(imageKey: string) {
    this.errorOccurred[imageKey] = true;
  }

  /**
   * Hàm lấy ảnh từ nguồn hachi
   * @param str
   * @returns
   */
  getResHachi(str: string) {
    let a = Ps_UtilObjectService.removeImgRes(str);
    return Ps_UtilObjectService.getImgResHachi(a);
  }

  /**
   * Hàm dùng để set style theo đúng nội dung text
   * @param name name of assignee
   */
  onCheckAssigneeBy(name: string): string {
    if (name === 'Hệ thống') {
      return 'font-style: italic;';
    }
    if (name === 'Nhân sự áp dụng') {
      return 'font-weight: 600;';
    }
  }

  /**
   * Hàm kiểm tra xem đơn có được nộp sớm hơn dự kiến quy định hay không (hiện tại là 30 ngày kể từ ngày hiện tại);
   */
  isPetitionEarly() {
    // Đang soạn thảo
    if (this.petition.Status == 1) {
      return (
        Ps_UtilObjectService.getDaysLeft(
          this.currentDate,
          this.petition.LeaveDate
        ) < 30
      );
    }
    return false;
  }

  /**
   * Hàm lấy ngày nghỉ việc hợp lệ
   */
  getLeaveDayAvailable() {
    const date = Ps_UtilObjectService.addDays(this.currentDate, 30);
    date.setHours(0, 0, 0, 0);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  /**
   * HÀM XỬ LÝ CHECKBOX Trưởng đơn vị, Q.lý điểm làm việc
   * @param taskItem CONG  VIEC
   */

  onCheckedLeader(taskItem: DTOHRDecisionTask) {
    this.isLeader = !this.isLeader;
    let defaultValue: DTOHRPolicyPosition = {
      Code: null,
      PositionName: '-- Chọn --',
      PositionID: null,
      Position: null,
      IsLeader: null,
      IsSupervivor: null,
      DepartmentName: null,
      TypeData: null,
      StatusName: null,
      ListLocation: null,
      ListException: [],
    };

    if (this.isLeader) {
      this.tempApprover = { ...defaultValue };
    } else {
      this.tempApprover = this.curPositionApproveStorage;
      this.curPositionApprove = this.tempApprover;
    }
  }

  /**
   * Hàm chung xử lí khi giá trị thay đổi
   * @param props properties
   * @param TypeValueChange phân loại
   * @param value giá trị
   */
  onValueChanged(props: string[], TypeValueChange: number = 0, value?: any) {
    props.push('SentDate');
    if (TypeValueChange == 0) {
      if (this.isAddNew) {
        this.petition.TypeData = 1; //Nghỉ việc
        this.petition.IsSelf = false;
        this.petition.SentDate = this.currentDate.toString();
        this.curSentDate = Ps_UtilObjectService.addDays(this.curSentDate, 1);
        this.petition.Reason = value?.Code;

        props.push('Code');
        props.push('TypeData');
        props.push('IsSelf');
        props.push('Status');
        props.push('Staff');
        props.push('SentDate');
        props.push('LeaveDate');
      }

      // Dùng cho nhập mã nhân sự để tìm thông tin nhân sự binding lên block THÔNG TIN NHÂN SỰ
      if (props[0] == 'StaffID') {
        const employee = new DTOEmployee();
        employee.StaffID = this.petition.StaffID;
        this.curReason = this.listResignReason.find(
          (reason) => reason.Code == null
        ); // Reset lý do
        this.APIGetHREmployeeByID(employee, props);
        return;
      }

      // Cập nhật ngày gửi
      if (props[0] == 'SentDate') {
        this.petition.SentDate = value;
        const sentDate = new Date(this.petition.SentDate);
        const leaveDate = new Date(this.petition.LeaveDate);

        if (Ps_UtilObjectService.getDaysLeft(sentDate, leaveDate) > 0) {
          this.APIUpdateHRPetitonMaster(this.petition, props);
        } else {
          props.push('LeaveDate');
          this.petition.LeaveDate = Ps_UtilObjectService.addDays(
            new Date(this.petition.SentDate),
            30
          ).toString();
          this.APIUpdateHRPetitonMaster(this.petition, props);
        }

        return;
      }

      // Cập nhật trạng thái đơn, mô tả lý do, ngày nghỉ việc được duyệt
      if (
        [
          'ReasonStatusDescription',
          'ReasonStatus',
          'LeaveDateApproved',
        ].includes(props[0])
      ) {
        this.petition[props[0]] = value;
      }

      // Cập nhật lý do nghỉ việc
      if (props[0] == 'Reason') {
        this.petition.Reason = value?.Code;
      }

      this.APIUpdateHRPetitonMaster(this.petition, props);

      return;
    } else if (TypeValueChange == 1) {
      if (props[0] == 'approveStatus') {
        if (this.approveStatus.Code != value?.Code) {
          this.petition.ReasonStatusDescription = '';
          props.push('ReasonStatusDescription');
          this.APIUpdateHRPetitonMaster(this.petition, props);
        }

        this.approveStatus.Code = value?.Code;
        if (this.approveStatus.Code == 4) {
          this.loadFilter();
        }
      } else if (props[0] == 'ReasonStatus') {
        this.reasonStatus.Code = value?.Code;
      } else {
        this.petition[props[0]] = value?.Code;
        this.APIUpdateHRPetitonMaster(this.petition, props);
      }
    } else if (TypeValueChange == 2) {
      this[props[0]] = value;
      if (props[0] == 'curPositionApprove') {
        this.curPositionApproveStorage = value;
      }
      if (props[0] == 'curPositionAssignee') {
        this.curPositionAssignee = value;
      }
    } else if (TypeValueChange == 3) {
      this.APIUpdateHRDecisionMaster(this.decision, props);
    }
  }

  //#region GRID
  /**
   * Hàm lấy các action khi user nhấn nút more action
   * @param moreActionDropdown
   * @param dataItem
   * @returns
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any) {
    moreActionDropdown = [];
    var status = this.petition.Status;
    this.taskItem = JSON.parse(JSON.stringify(dataItem));

    if (status == 2 && this.M_A) {
      moreActionDropdown.push({
        Name: 'Chỉnh sửa',
        Code: 'pencil',
        Type: 'edit',
        Actived: true,
      });
      moreActionDropdown.push({
        Name: 'Xóa đầu việc',
        Code: 'trash',
        Type: 'delete',
        Actived: true,
      });
    } else {
      moreActionDropdown.push({
        Name: 'Xem chi tiết',
        Code: 'eye',
        Type: 'detail',
        Actived: true,
      });
    }
    return moreActionDropdown;
  }

  /**
   * Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
   * @param arrItem
   * @returns MenuDataItem[]
   */
  getSelectionPopupAction(arrItem: any[]) {
    const actionDelete = {
      Name: 'Xóa đầu việc',
      Code: 'trash',
      Type: 'Delete',
      Link: 'delete',
      Actived: true,
    };

    return [actionDelete];
  }

  /**
   * Hàm dùng để thực hiện các action trên popup chọn nhiều
   * @param btnType loại button
   * @param listSelectedItem danh sách item được chọn
   * @param value
   */
  onSelectionActionItemClick(
    btnType: string,
    listSelectedItem: any[],
    value: any
  ) {
    // Chọn xóa đầu việc
    if (btnType === 'Delete') {
      this.listSelectedTask = listSelectedItem;

      this.isDeleteTaskDialogShow = true;
    }
  }

  /**
   * Hàm nhận giá trị từ grid khi item được chọn
   * @param isSelected
   */
  onGridItemSelect(isSelected: boolean) {
    this.isFilterDisable = isSelected;
  }

  /**
   * Hàm đổi màu chữ và icon nếu quá hạn
   */
  getColorExpired(isOverDue: boolean): string {
    return isOverDue ? 'rgba(235, 39, 58, 1)' : 'black';
  }

  /**
   * Hàm xử lí action được chọn trên popup
   * @param menu menu action đã nhấn
   * @param item chính sách được chọn
   */
  onMoreActionItemClick(menu: MenuDataItem, item: any) {
    this.taskItem = item;
    // Kiểm tra nếu là Chỉnh sửa hoặc Xem chi tiết
    if (
      ['eye', 'pencil'].includes(menu.Code) ||
      ['edit', 'detail'].includes(menu.Link)
    ) {
      // Kiểm tra xem có thể chỉnh sửa và xem chi tiết
      this.isEdit = menu.Code == 'pencil';
      this.isSeeDetail = menu.Code == 'eye';

      // Mở drawer
      this.isOpenDrawer = Ps_UtilObjectService.hasValue(this.petition.Status);
      this.isShowAll = true;

      this.curPositionAssignee.Position =
        this.taskItem.TypeAssignee == 3 ? -1 : this.taskItem.PositionAssignee;

      // Trưởng đơn vị, qli điểm làm việc
      this.isLeader = this.taskItem.IsLeaderMonitor;

      // Duyệt bởi
      this.curPositionApprove.Position = this.taskItem.PositionApproved;
      this.tempApprover = this.curPositionApprove;

      return;
    }

    // Nếu là xóa đầu việc
    if (menu.Link == 'delete' || menu.Code == 'trash') {
      this.isDeleteTaskDialogShow = true;
    }
  }

  onActionTask(action: string, data: DTOHRDecisionTask, status?: number) {
    this.taskItem = data;
    this.isSeeDetail = action == 'see';
    this.isEdit = action == 'edit';
    this.isDeleteTaskDialogShow = action == 'trash';

    // Binding các trường đặc biệt
    if (this.isEdit || this.isSeeDetail) {
      this.curPositionAssignee.Position =
        this.taskItem.TypeAssignee == 3 ? -1 : this.taskItem.PositionAssignee;

      // Trưởng đơn vị, qli điểm làm việc
      this.isLeader = this.taskItem.IsLeaderMonitor;

      // Duyệt bởi
      this.curPositionApprove.Position = this.taskItem.PositionApproved;
      this.tempApprover = this.curPositionApprove;
    }

    this.isOpenDrawer = true;
  }

  /**
   * Get action dropdown status drawer
   */
  listStatusDropdown = [
    { Status: 1, StatusName: 'Chưa thực hiện' },
    { Status: 2, StatusName: 'Không thực hiện' },
    { Status: 3, StatusName: 'Đang thực hiện' },
    { Status: 4, StatusName: 'Chờ duyệt' },
    { Status: 5, StatusName: 'Ngưng thực hiện' },
    { Status: 6, StatusName: 'Hoàn tất' },
  ];
  onGetStatusDropdown() {
    this.listStatusDropdownFitler = [];
    if (Ps_UtilObjectService.hasValue(this.petition.Status)) {
      const TaskStatus = this.taskItem.ListHRDecisionTaskLog[0].Status;

      switch (TaskStatus) {
        case 1: // Chưa thực hiện
          this.listStatusDropdownFitler = this.listStatusDropdown.filter(
            (status) => status.Status === 1 || status.Status === 2
          );
          break;

        case 2: // Không thực hiện
          if (this.petition.Status !== 4) {
            this.listStatusDropdownFitler = this.listStatusDropdown.filter(
              (status) => status.Status === 2 || status.Status === 1
            );
          } else {
            this.listStatusDropdownFitler = this.listStatusDropdown.filter(
              (status) => status.Status === 2 || status.Status === 3
            );
          }
          break;

        case 3: // Đang thực hiện
          this.listStatusDropdownFitler = this.listStatusDropdown.filter(
            (status) =>
              status.Status === 3 || status.Status === 5 || status.Status === 4
          );
          break;

        case 4: // Chờ duyệt
          this.listStatusDropdownFitler = this.listStatusDropdown.filter(
            (status) => status.Status === 4 || status.Status === 6
          );
          break;

        case 5: // Ngưng thực hiện
          this.listStatusDropdownFitler = this.listStatusDropdown.filter(
            (status) =>
              status.Status === 3 || status.Status === 5 || status.Status === 6
          );
          break;

        case 6: // Hoàn tất
          this.listStatusDropdownFitler = this.listStatusDropdown.filter(
            (status) => status.Status === 6
          );
          break;

        default:
          this.listStatusDropdownFitler = [];
          break;
      }
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

    this.APIGetListHRDecisionTask();
  }

  /**
   * Hàm dùng để sắp xếp dữ liệu
   * @param event
   */
  sortChange(event: SortDescriptor[]) {
    this.gridState.sort = event;
    if (this.TypeData == this.ResignationENUM) {
      this.APIGetListHRDecisionTask();
    }
  }

  /**
   * Hàm dùng để khi mở dropdown Thực hiện bởi thì style cho 'Nhân sự áp dụng'
   */
  onStyleForApplyHR() {
    const listPopupElement = document.querySelectorAll('kendo-popup');
    const popup =
      listPopupElement[listPopupElement.length - 1]?.querySelector(
        'kendo-list'
      );
    const listli = popup?.querySelectorAll('li');
    if (listli) {
      listli[0].style.display = 'none';
      listli[1].style.fontWeight = '600';
      listli[1].style.borderBottom = '1px solid black';
    }
  }

  /**
   * Hàm xử lí hiển thị popup folder
   */
  onUploadImg() {
    this.layoutService.folderDialogOpened = true;
  }

  /**
   * Hàm xử lí khi người dùng chọn file hình ảnh cho texteditor
   * @param e
   * @param width
   * @param height
   */
  pickFile(e: DTOCFFile, width, height) {
    this.layoutService.getEditor().embedImgURL(e, width, height);
    this.layoutService.setFolderDialog(false);
  }

  /**
   * Hàm lấy ảnh từ component app folder với folder bài viết chính sách
   * @param childPath
   * @returns
   */
  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog()) {
      return this.apiServiceMar.GetFolderWithFile(childPath, 17);
    }
    //17 = folder bài viết chính sách
  }

  /**
   * Hàm xử lý đóng, mở dialog
   * @param value
   */
  toggleDialog(value: number) {
    // Dialog xóa quyết định
    if (value == 0) {
      this.isDeleteDecisionDialogShow = !this.isDeleteDecisionDialogShow;
    }
    // Dialog hoàn tất đầu việc
    else if (value == 1) {
      this.isConfirmApproveDialogShow = !this.isConfirmApproveDialogShow;
    }
    // Dialog xóa đầu việc
    else if (value == 2) {
      this.isDeleteTaskDialogShow = !this.isDeleteTaskDialogShow;

      if (Ps_UtilObjectService.hasListValue(this.listSelectedTask)) {
        this.listSelectedTask = [];
      }
    }
  }

  /**
   * Hàm xử lý khi dialog được confirm đồng ý
   * @param value
   */
  onDiaglogConfirm(value: number) {
    let listItemTask: DTOHRDecisionTask[] = [];
    const errMsg = 'Đã xảy ra lỗi khi';

    // Trường hợp xóa master - button xóa ở header
    if (value == 0) {
      this.isLoadingPage = true;
      if (this.isPetition) {
        this.APIDeleteHRPetition(this.petition);
      } else {
        this.APIDeleteHRDecisionMaster([this.decision]);
      }
    } else if (value == 1) {
      this.isLoadingPage = true;
      this.APIUpdateHRDecisionMasterStatus([this.decision], 2);
    } else if (value == 2) {
      // Đối với xóa nhiều đầu việc
      if (Ps_UtilObjectService.hasListValue(this.listSelectedTask)) {
        listItemTask = this.listSelectedTask;
      }
      // Đối với xóa 1 đầu việc ở dropdown
      else {
        listItemTask = [this.taskItem];
      }

      this.APIDeleteHRDecisionTask(listItemTask);
    }
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

  //#endregion

  //#region API

  /**
   * API Lấy danh sách đầu việc
   */
  /**
// Hoàng làm
 * API dùng để lấy danh sách đầu công việc
 */
  APIGetListHRLSTask() {
    const apiText = 'Đầu công việc';
    let a = this.taskCategoryService
      .GetListHRLSTask(this.gridStateHRLSTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.listHRLSTask = res.ObjectReturn.Data;
            this.listHRLSTaskOrigin = res.ObjectReturn.Data;
            this.APIGetListHRDecisionTaskOrigin();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`
            );
          }
        },
        (err) => {
          this.layoutService.onError(
            `Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`
          );
        }
      );

    this.arrSub.push(a);
  }
  // Hoàng làm
  APIGetListHRDecisionTask() {
    this.isTaskListLoading = true;
    let a = this.decisionService
      .GetListHRDecisionTask(this.gridState)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.gridData = res.ObjectReturn.Data;
            this.total = res.ObjectReturn.Total;

            if (this.gridData.length <= 0 && this.total != 0) {
              this.page -= 1;
              this.gridState.skip -= 1;
              this.APIGetListHRDecisionTask();
            }

            this.gridView.next({ data: this.gridData, total: this.total });
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi lấy danh sách đầu việc: ` + res.ErrorString
            );
          }
          this.isTaskListLoading = false;
        },
        (err) => {
          this.isTaskListLoading = false;
          this.layoutService.onError(
            `Đã xảy ra lỗi khi lấy danh sách đầu việc: ${err}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
 * API dùng để lấy danh sách các đầu việc gốc
 */
  APIGetListHRDecisionTaskOrigin() {
    this.isLoadingCombobox = true;
    this.gridStateTaskOrigin.filter.filters = [];
    this.gridStateTaskOrigin.filter.filters.push({ field: 'Petition', operator: 'eq', value: this.petition.Code})
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

  /**
   * API Lấy đơn xin nghỉ việc
   * @param dto DTOHRPetitionMaster
   */
  APIGetHRPetitionMaster(dto: DTOHRPetitionMaster) {
    this.isRequestDetailBlockLoading = true;
    this.isResponeDetailBlockLoading = true;
    this.isDecisionDetailBlockLoading = true;

    let a = this.decisionService
      .GetHRPetitionMaster(dto)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.petition = res.ObjectReturn;
            this.oldStaffID = this.petition.StaffID;
            this.curReason.Code = this.petition.Reason;
            this.curReason.ListName = this.petition.ReasonName;
            this.reasonStatus.Code = this.petition.ReasonStatus;
            this.reasonStatus.Text = this.petition.ReasonStatusName;
            if (this.petition.Status == 4 || this.petition.Status == 5) {
              const approveObj: { Code: number; Text: string } = {
                Code: this.petition.Status,
                Text: this.petition.StatusName,
              };
              this.approveStatus = approveObj;
            }
            this.curSentDate = new Date(
              new Date(this.petition.SentDate).setDate(
                new Date(this.petition.SentDate).getDate() + 1
              )
            );
            this.curSentDate.setHours(0, 0, 0, 0);

            this.leaveDate = new Date(this.petition.LeaveDate);

            this.setupBtnStatus();
            // Nếu là đơn xin nghỉ việc có trạng thái là chấp nhận đơn
            if (this.approveStatus.Code == 4) {
              this.loadFilter();
            }
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi lấy đơn xin nghỉ việc: ` + res.ErrorString
            );
          }

          this.isRequestDetailBlockLoading = false;
          this.isResponeDetailBlockLoading = false;
          this.isDecisionDetailBlockLoading = false;
          this.isInformationBlockLoading = false;
        },
        (err) => {
          this.isRequestDetailBlockLoading = false;
          this.isResponeDetailBlockLoading = false;
          this.isDecisionDetailBlockLoading = false;
          this.isInformationBlockLoading = false;
          this.layoutService.onError(
            `Đã xảy ra lỗi khi lấy đơn xin nghỉ việc: ${err}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API lấy thông tin hồ sơ bằng ID
   * @param DTOPersonalInfo
   */
  APIGetHREmployeeByID(DTOEmployee: DTOEmployee, props: string[]) {
    this.isInformationBlockLoading = true;
    let a = this.decisionService
      .GetHREmployeeByID(DTOEmployee)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (
            Ps_UtilObjectService.hasValue(res) &&
            Ps_UtilObjectService.hasValue(res.ObjectReturn) &&
            res.StatusCode == 0
          ) {
            const employee = res.ObjectReturn;
            this.petition.FullName = employee.FullName;
            this.petition.ImageThumb = employee.ImageThumb;
            this.petition.GenderName = employee.GenderName;
            this.petition.BirthDate = employee.BirthDate;
            this.petition.DepartmentName = employee.DepartmentName;
            this.petition.PositionName = employee.CurrentPositionName;
            this.petition.LocationName = employee.LocationName;
            this.petition.JoinDate = employee.JoinDate;
            this.petition.TypeStaffName = employee.TypeDataName;
            this.petition.Staff = employee.Code;
            this.petition.StaffID = employee.StaffID;

            this.isShowAll = true;
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi lấy thông tin cá nhân: ` + res.ErrorString
            );
            if (this.isAddNew) {
              this.petition.StaffID = '';
            } else {
              this.petition.StaffID = this.oldStaffID;
            }
            this.isShowAll = false;
          }
          this.isRequestDetailBlockLoading = false;
          this.isInformationBlockLoading = false;
        },
        (err) => {
          this.layoutService.onError(
            `Đã xảy ra lỗi khi lấy thông tin cá nhân: ${err}`
          );
          this.isRequestDetailBlockLoading = false;
          this.isInformationBlockLoading = false;
          if (this.isAddNew) {
            this.petition.StaffID = '';
          } else {
            this.petition.StaffID = this.oldStaffID;
          }
          this.isShowAll = false;
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách cho dropdown theo ENUM
   */
  APIGetListHR(typeData: number) {
    const errMsg = 'Đã xảy ra lỗi khi lấy danh sách lý do:';

    let a = this.staffService
      .GetListHR(typeData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            if (typeData == 19 || typeData == 22) {
              this.listResignReason = res.ObjectReturn;

              // Thêm item null vào danh sách lý do
              const nullReason = new DTOListHR();
              nullReason.Code = null;
              nullReason.ListName = '-- Chọn --';
              this.listResignReason.unshift(nullReason);

              if (this.isAddNew) {
                // Lý do ban đầu sẽ là -- Chọn --
                this.curReason = this.listResignReason.find(
                  (reason) => reason.Code == null
                );
              }
            } else if (typeData == 21) {
              this.listDeclineReason = res.ObjectReturn;
            } else if (typeData == 5) {
              this.listAssignee = res.ObjectReturn;
              this.curTypeAssignee.OrderBy = this.listAssignee.find(
                (item) => item.Code == 12
              ).OrderBy;
            }
          } else {
            this.layoutService.onError(`${errMsg} ${res.ErrorString}`);
          }
        },
        (err) => {
          this.layoutService.onError(`${errMsg} ${err}`);
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API cập nhật thông tin đề nghị
   * @param DTOPetition Đề nghị cần update
   * @param Properties Props cần update
   * @param action Điều kiện xét thêm nếu có
   */
  APIUpdateHRPetitonMaster(
    DTOPetition: DTOHRPetitionMaster,
    Properties: string[],
    action?: any
  ) {
    const TypeUpdate = DTOPetition.Code == 0 ? 'Thêm mới' : 'Cập nhật';
    const ctx =
      this.TypeData == this.PetitionENUM ? 'đơn xin nghỉ việc' : 'quyết định';

    if (DTOPetition.Status == 1) {
      this.isRequestDetailBlockLoading = true;
    }

    // 1. Nếu là từ chối đơn xin nghỉ
    // 2. Nếu là chấp nhận đơn xin nghỉ
    if ([1, 2].includes(action) && !this.isLoadingPage) {
      this.isResponeDetailBlockLoading = true;
    }

    // Nếu thêm mới đơn thì block thông tin nhân sự loading 1 lần
    if (this.petition.Code == 0) {
      this.isInformationBlockLoading = true;
    }

    let a = this.decisionService
      .UpdateHRPetitionMaster(DTOPetition, Properties)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.petition = res.ObjectReturn;
            this.oldStaffID = this.petition.StaffID;

            this.JoinDate = Ps_UtilObjectService.addDays(
              new Date(this.petition.JoinDate),
              1
            );
            this.curSentDate = Ps_UtilObjectService.addDays(
              new Date(this.petition.SentDate),
              1
            );
            this.curSentDate.setHours(0, 0, 0, 0);

            if (action == 2) {
              this.loadFilter();
            }

            // Đối với thêm mới đơn xin nghỉ việc
            if (this.isAddNew || DTOPetition.Code == 0) {
              this.isAddNew = false;
            }

            // Đối với quyết định kỷ luật
            if (this.TypeData == this.TerminationENUM) {
              this.decision.Petition = this.petition.Code;
              this.decision.TypeData = this.TypeData;
              const tempProps = [];
              if (this.isAddNew) {
                tempProps.push('Code');
                tempProps.push('TypeData');
                tempProps.push('EffDate');
                tempProps.push('Petition');
                this.APIUpdateHRDecisionMaster(this.decision, tempProps);
              }
            }

            localStorage.setItem(
              'HrPetitionMaster',
              JSON.stringify(this.petition)
            );

            if (Ps_UtilObjectService.hasListValue(this.listResignReason)) {
              this.curReason = this.listResignReason.find(
                (reason) => reason.Code == this.petition.Reason
              );
            } else {
              this.curReason = null;
            }

            this.setupBtnStatus();

            this.layoutService.onSuccess(`${TypeUpdate} ${ctx}  thành công`);
          } else {
            if (this.TypeData != this.TerminationENUM) {
              // Nếu thêm đơn xin nghỉ bị lỗi thì reset lý do về -- Chọn--
              if (this.TypeData == this.PetitionENUM && this.isAddNew) {
                this.curReason = this.listResignReason.find(
                  (reason) => reason.Code == null
                ); // Reset lý do
                this.dropdownReason.reset();
              }

              this.layoutService.onError(
                `Đã xảy ra lỗi khi ${TypeUpdate} ${ctx}: ${res.ErrorString}`
              );
            }
          }
          this.isResponeDetailBlockLoading = false;
          this.isTaskListLoading = false;
          this.isRequestDetailBlockLoading = false;
          this.isInformationBlockLoading = false;
          this.isLoadingPage = false;
        },
        (err) => {
          this.isResponeDetailBlockLoading = false;
          this.isTaskListLoading = false;
          this.isRequestDetailBlockLoading = false;
          this.isInformationBlockLoading = false;
          this.isLoadingPage = false;
          // Nếu thêm đơn xin nghỉ bị lỗi thì reset lý do về -- Chọn--
          if (this.TypeData == this.PetitionENUM && this.isAddNew) {
            this.curReason = this.listResignReason.find(
              (reason) => reason.Code == null
            ); // Reset lý do
            this.dropdownReason.reset();
          }
          this.layoutService.onError(
            `Đã xảy ra lỗi khi ${TypeUpdate} đề nghị: ${err}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API lấy quyết định
   */
  APIGetHRDecisionMaster() {
    this.isInformationBlockLoading = true;
    const apiText =
      this.TypeData == this.TerminationENUM ? 'kỷ luật' : 'nghỉ việc';
    let a = this.decisionService
      .GetHRDecisionMaster(this.decision)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (
            Ps_UtilObjectService.hasValue(res) &&
            Ps_UtilObjectService.hasValue(res.ObjectReturn) &&
            res.StatusCode == 0
          ) {
            this.decision = res.ObjectReturn;
            localStorage.setItem(
              'HrDecisionMaster',
              JSON.stringify(this.decision)
            );
            const status = this.decision.Status;

            this.isLockAll = !(
              ([0, 4].includes(status) &&
                (this.isAllowedToCreate || this.isMaster)) ||
              (status == 1 && (this.isAllowedToVerify || this.isMaster))
            );

            this.setupBtnStatus();
            const tempPetition = new DTOHRPetitionMaster();
            tempPetition.Code = this.decision.Petition;
            tempPetition.LeaveDate = '';
            tempPetition.LeaveDateApproved = '';

            // Buộc thêm đại để get được api tránh lỗi "Null object cannot be converted to a value type"
            tempPetition.Staff = 0;
            tempPetition.IsSelf = false;
            tempPetition.TypeData = 0;
            this.APIGetHRPetitionMaster(tempPetition);
          } else {
            this.layoutService.onError(
              'Đã xảy ra lỗi khi lấy thông tin quyết định ${apiText}: ' +
                res.ErrorString
            );
          }
          this.isInformationBlockLoading = false;
          this.isDecisionDetailBlockLoading = false;
          this.isResponeDetailBlockLoading = false;
        },
        (err) => {
          this.layoutService.onError(
            `Đã xảy ra lỗi khi lấy thông tin quyết định ${apiText}: ${err}`
          );
          this.isInformationBlockLoading = false;
          this.isDecisionDetailBlockLoading = false;
          this.isResponeDetailBlockLoading = false;
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API cập nhật thông tin quyết định
   * @param DTODecision Quyết định cần update
   * @param Properties Props cần update
   */
  APIUpdateHRDecisionMaster(
    DTODecision: DTOHRDecisionMaster,
    Properties: string[]
  ) {
    const TypeUpdate =
      DTODecision.Code == 0 ? 'Thêm mới' : 'Cập nhật thông tin';
    const apiText = 'nghỉ việc';

    if (DTODecision.Code == 0) {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      DTODecision.EffDate = date.toISOString();
    }

    let a = this.decisionService
      .UpdateHRDecisionMaster(DTODecision, Properties)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.decision = res.ObjectReturn;
            this.isAddNew = false;
            localStorage.setItem(
              'HrDecisionMaster',
              JSON.stringify(this.decision)
            );
            this.setupBtnStatus();
            this.layoutService.onSuccess(
              `${TypeUpdate} quyết định ${apiText} thành công`
            );
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${TypeUpdate} quyết định ${apiText}: ` +
                res.ErrorString
            );
          }
        },
        (err) => {
          this.layoutService.onError(
            `Đã xảy ra lỗi khi ${TypeUpdate} quyết định ${apiText}: ${err}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API cập nhật trạng thái quyết định
   * @param listDTODecision danh sách quyết định cần update
   * @param reqStatus Status cần update
   */
  APIUpdateHRDecisionMasterStatus(
    listDTODecision: DTOHRDecisionMaster[],
    reqStatus: number
  ) {
    const apiText =
      this.TypeData == this.TerminationENUM ? 'kỷ luật' : 'nghỉ việc';
    const errMsg = `Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${apiText}:`;

    let a = this.decisionService
      .UpdateHRDecisionMasterStatus(listDTODecision, reqStatus)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.isConfirmApproveDialogShow = false; // Đóng dialog
            this.APIGetHRDecisionMaster(); // Get lại quyết định

            this.layoutService.onSuccess(
              `Cập nhật trạng thái quyết định ${apiText} thành công`
            );
            reqStatus == 3 ? (this.isStoppedDecisionDialogShow = false) : null;
          } else {
            this.layoutService.onError(`${errMsg} ${res.ErrorString}`);
          }
          this.isLoadingPage = false;
        },
        (err) => {
          this.layoutService.onError(`${errMsg} ${err}`);
          this.isLoadingPage = false;
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách chức danh
   */
  APIGetListHRPolicyPosition() {
    let a = this.hriTransitionService
      .GetListHRPolicyPosition()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            const tempList = [
              { PositionName: 'Nhân sự áp dụng', Position: -1 },
            ];

            this.listApprover = [...tempList, ...res.ObjectReturn];
            this.listApprover2 = res.ObjectReturn;
          }
        },
        (error) => {
          this.layoutService.onError(
            `Đã xảy ra lỗi khi lấy danh sách chức danh: ${error}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API cập nhật thông tin đầu việc
   * @param task đầu việc cần update
   */
  APIUpdateHRDecisionTask(task: DTOHRDecisionTask) {
    const TypeUpdate = task.Code == 0 ? 'Thêm mới' : 'Cập nhật';
    const errMsg = `Đã xảy ra lỗi khi ${TypeUpdate} đầu việc:`;

    task.Petition = this.petition.Code;
    task.IsLeaderMonitor = this.isLeader;

    // Nếu là trưởng đơn vị, quản lý điểm làm việc thì gán giá trị null cho Approve và PositionApproved
    if (this.isLeader) {
      task.Approved = null;
      task.PositionApproved = null;
    }

    let a = this.decisionService
      .UpdateHRDecisionTask(task)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.taskItem = res.ObjectReturn;
            this.onToggleDrawer(false);
            this.layoutService.onSuccess(`${TypeUpdate} đầu việc thành công`);

            if (!this.isOpenDrawer) {
              this.loadFilter();
            }
          } else {
            this.layoutService.onError(`${errMsg} ${res.ErrorString}`);
          }
        },
        (err) => {
          this.layoutService.onError(`${errMsg} ${err}`);
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API xoá đầu việc
   * @param DTOHRDecisionTask đầu việc cần xoá
   */
  APIDeleteHRDecisionTask(ListDTo: DTOHRDecisionTask[]) {
    this.isDeleteTaskDialogShow = false;
    let a = this.decisionService
      .DeleteHRDecisionTask(ListDTo)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`Xoá đầu việc thành công`);
            this.APIGetListHRDecisionTask();
            this.onToggleDrawer(false);
            this.layoutService
              .getSelectionPopupComponent()
              .closeSelectedRowitemDialog();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi xoá đầu việc: ` + res.ErrorString
            );
          }
        },
        (err) => {
          this.layoutService.onError(`Đã xảy ra lỗi khi xoá đầu việc: ${err}`);
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API Xoá quyết định
   * @param listDTODecision
   */
  APIDeleteHRDecisionMaster(listDTODecision: DTOHRDecisionMaster[]) {
    let a = this.decisionService
      .DeleteHRDecisionMaster(listDTODecision)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`Xoá quyết định thành công`);
            this.onAddNewDecision();
            this.isDeleteDecisionDialogShow = false;
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi xoá quyết định: ` + res.ErrorString
            );
            this.isLoadingPage = false;
          }
        },
        (err) => {
          this.layoutService.onError(
            `Đã xảy ra lỗi khi xoá quyết định: ${err}`
          );
          this.isLoadingPage = false;
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API xóa đơn đề nghị
   * @param DTOHRPetitionMaster đơn đề nghị cần xóa
   */
  APIDeleteHRPetition(DTOHRPetitionMaster: DTOHRPetitionMaster) {
    let a = this.decisionService
      .DeleteHRPetition(DTOHRPetitionMaster)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`Xoá đơn đề nghị thành công`);
            this.onAddNewPetition();
            this.isDeleteDecisionDialogShow = false;
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi xoá đơn đề nghị: ${res.ErrorString}`
            );
          }
          this.isLoadingPage = false;
        },
        (err) => {
          this.isLoadingPage = false;
          this.layoutService.onError(
            `Đã xảy ra lỗi khi xoá đơn đề nghị: ${err}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * Xuất word nhân sự quyết định nghỉ việc được duyệt
   */
  APIGetHRStaffLeaveReportWord() {
    var ctx = 'Xuất Word';
    var getfileName = 'StaffLeaveReportWord';
    this.layoutService.onInfo(`Đang xử lý ${ctx}`);

    const initialState: State = {
      take: null,
      sort: null,
      filter: {
        filters: [
          {
            field: 'Petition',
            operator: 'eq',
            value: this.petition.Code,
            ignoreCase: true,
          },
        ],
        logic: 'and',
      },
      skip: null,
    };

    let a = this.decisionService
      .GetHRStaffLeaveReportWord(initialState)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res)) {
            Ps_UtilObjectService.getFile(res, getfileName, 1);
            this.layoutService.onSuccess(`${ctx} thành công`);
          } else {
            this.layoutService.onError(`${ctx} thất bại`);
          }
        },
        (f) => {
          this.layoutService.onError(
            `Xảy ra lỗi khi ${ctx}. ` + f?.error?.ExceptionMessage
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API cập nhật trạng thái của profile
   * @param listDTO DTOHRDecisionProfile[]
   * @param status trạng thái sẽ chuyển
   */
  APIUpdateHRDecisionProfileStatus(
    listDTO: DTOHRDecisionProfile[],
    status: number
  ) {
    // this.isLoading = true;
    let a = this.decisionService
      .UpdateHRDecisionProfileStatus(listDTO, status)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          // this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(
              'Cập nhật trạng thái hồ sơ thành công'
            );
            this.APIGetHRPetitionMaster(this.petition);
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ của ${this.petition.FullName}}: ` +
                res.ErrorString
            );
          }
          // this.isLoadingPage = false;
        },
        (err) => {
          // this.isLoadingPage = false;
          this.layoutService.onError(
            `Đã xảy ra lỗi khi cập nhât trạng thái hồ sơ của ${this.petition.FullName}}: ${err}`
          );
        }
      );

    this.arrSub.push(a);
  }

  /**
   * API dùng để Update trạng thái hồ sơ
   * @param listDTO DTOHRDecisionProfile[]
   * @param status trạng thái hồ sơ sẽ được chuyển
   */
  APIUpdateHRDecisionProfileBoardingStatus(
    listDTO: DTOHRDecisionProfile[],
    status: number
  ) {
    let DLLPackage = 'hri025-resignation-request-list';

    let a = this.decisionService
      .UpdateHRDecisionProfileBoardingStatus(listDTO, status, DLLPackage)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(
              'Cập nhật trạng thái hồ sơ thành công'
            );
            this.APIGetHRPetitionMaster(this.petition);
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi tình trạng hồ sơ của ${this.petition.FullName}: ${res.ErrorString}`
            );
          }
          this.isLoadingPage = false;
        },
        (err) => {
          this.isLoadingPage = false;
          this.layoutService.onError(
            `Đã xảy ra lỗi khi tình trạng hồ sơ của ${this.petition.FullName}: ${err}`
          );
        }
      );
    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách lý do
   */
  APIGetListHRReason() {
    let enumCode: number = 25;
    // this.isLoadingReason = true;

    let a = this.staffService
      .GetListHR(enumCode)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.listReason = res.ObjectReturn;
            // this.isLoadingReason = false;
          } else {
            this.layoutService.onError(
              'Đã xảy ra lỗi khi lấy lý do: ' + res.ErrorString
            );
          }
        },
        (err) => {
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy lý do: ${err}`);
        }
      );

    this.arrSub.push(a);
  }

  /**
   * Hàm trả về ngày khởi tạo của trạng thái cần tìm
   * @param listStatusTaskLog danh sách trạng thái đầu việc được truyền vào
   * @param codeStatus code của trạng thái cần tìm
   * @returns
   */
  getCreateTimeOfStatusLog(
    listStatusTaskLog: DTOHRDecisionTaskLog[],
    codeStatus: number
  ): string {
    const itemTaskLog = listStatusTaskLog.find(
      (item) => item.Status === codeStatus
    );

    if (Ps_UtilObjectService.hasValue(itemTaskLog)) {
      return itemTaskLog.CreatedTime;
    }

    return '';
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

      return status == code;
    }
  }

  /**
   * Hàm dùng để thêm class vào cho tr của grid
   * @param context
   * @returns
   */
  rowCallback = (context: RowClassArgs) => {
    if (this.TypeData == this.ResignationENUM) {
      if (
        Ps_UtilObjectService.hasListValue(
          context.dataItem.ListHRDecisionTaskLog
        )
      ) {
        return {
          'item-send': context.dataItem.ListHRDecisionTaskLog[0]?.Status == 4,
          'item-complete':
            context.dataItem.ListHRDecisionTaskLog[0]?.Status == 6,
          'item-stop':
            context.dataItem.ListHRDecisionTaskLog[0]?.Status == 2 ||
            context.dataItem.ListHRDecisionTaskLog[0]?.Status == 5,
        };
      }
    }
  };
  // Hoàng làm
  /**
   * Filter dropdown
   */
  handleFilter(value, searchFields: any[], textField: string) {
    if (Ps_UtilObjectService.hasListValue(this.listHRLSTaskOrigin)) {
      if (Ps_UtilObjectService.hasListValue(searchFields)) {
        this.listHRLSTask = this.listHRLSTaskOrigin.filter((s) =>
          searchFields.some((field) => {
            const fieldValue = s[field];
            return (
              fieldValue &&
              Ps_UtilObjectService.containsString(fieldValue.toString(), value)
            );
          })
        );
      } else {
        this.listHRLSTask = this.listHRLSTaskOrigin.filter((s) =>
          Ps_UtilObjectService.containsString(s[textField], value)
        );
      }
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
      this.dataHRDecisionTaskHandler.TaskName = task.Name;
      this.dataHRDecisionTaskHandler.LSTask = task.Code;
      this.dataHRDecisionTaskHandler.LSTaskID = task.ID;
      this.dataHRDecisionTaskHandler.Description = task.Description;
      this.taskItem.TaskName = task.Name;
      this.taskItem.LSTaskID = task.ID;
      this.taskItem.Description = task.Description;
    } else {
      this.taskSelected = null;
      this.hasTaskSelected = false;
      this.dataHRDecisionTaskHandler.TaskName = '';
      this.dataHRDecisionTaskHandler.LSTask = null;
      this.dataHRDecisionTaskHandler.LSTaskID = null;
      this.dataHRDecisionTaskHandler.Description = '';
    }
  }
  // Hoàng làm
  /**
   * Hàm trả về true nếu task bị quá hạn
   */
  checkExpired(isOverDue: boolean): boolean {
    return isOverDue;
  }

  valueResonchange(event: any) {
    this.petition.BoardingProfile.ReasonStatus = event.Code;
    if (event.Code == 104) {
      this.isObligatoryReason = true;
    } else {
      this.isObligatoryReason = false;
    }
  }

  /**
   * Hàm xử lý ngưng đơn
   */
  handleStopPetition() {
    this.petition.BoardingProfile.ReasonStatusDescription =
      this.ReasonStatusDescription;
    if (this.isObligatoryReason) {
      if (
        !Ps_UtilObjectService.hasValueString(
          this.petition.BoardingProfile.ReasonStatusDescription
        )
      ) {
        this.layoutService.onWarning('Vui lòng nhập mô tả lý do');
        return;
      }
    }

    // Khi hồ sơ đang chuẩn bị boarding
    if (this.petition.BoardingProfile.Status == 1) {
      this.APIUpdateHRDecisionProfileStatus([this.petition.BoardingProfile], 3);
    } else {
      this.petition.BoardingProfile.ReasonStatus = 103;
      this.APIUpdateHRDecisionProfileBoardingStatus(
        [this.petition.BoardingProfile],
        3
      );
    }
    this.isStoppedPetitionDialogShow = false;
  }

  //#endregion

  ngOnDestroy(): void {
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
    this.arrSub.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
