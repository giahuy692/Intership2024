import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DTOHRDecisionMaster } from '../../dto/DTOHRDecisionMaster.dto';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, isCompositeFilterDescriptor, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { DTOHRDecisionProfile } from '../../dto/DTOHRDecisionProfile.dto';
import { StaffApiService } from '../../services/staff-api.service';
import { DTOListHR, DTOPersonalInfo } from '../../dto/DTOPersonalInfo.dto';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { HriDecisionApiService } from '../../services/hri-decision-api.service';
import { DTODepartment } from '../../dto/DTODepartment.dto';
import { DTOPosition } from '../../dto/DTOPosition.dto';
import { DTOLocation } from '../../dto/DTOLocation.dto';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { MarNewsProductAPIService } from 'src/app/p-app/p-marketing/shared/services/marnewsproduct-api.service';
import { EnumDialogType } from 'src/app/p-app/p-layout/enum/EnumDialogType';
import { MarBannerAPIService } from 'src/app/p-app/p-marketing/shared/services/marbanner-api.service';
import { DTOEmployee } from '../../dto/DTOEmployee.dto';
import { Day } from '@progress/kendo-date-math';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';
import { PDatePickerComponent } from 'src/app/p-app/p-layout/components/p-datepicker/p-datepicker.component';
import { PKendoEditorComponent } from 'src/app/p-app/p-layout/components/p-kendo-editor/p-kendo-editor.component';

@Component({
  selector: 'app-hr-onboard-decision-detail',
  templateUrl: './hr-onboard-decision-detail.component.html',
  styleUrls: ['./hr-onboard-decision-detail.component.scss']
})
export class HrOnboardDecisionDetailComponent implements OnInit, OnDestroy {
  /**
   * Loại quyết định:
   * - 1: Tuyển dụng
   * - 2: Điều chuyển
   */
  @Input({ required: true }) TypeData: 1 | 2 = 1;

  isProfileDialogOpen: boolean = false;
  isDeleteProfileDialogShow: boolean = false;
  isDeleteDecisionDialogShow: boolean = false;
  isInformationBlockLoading: boolean = false;
  isStoppedDialogShow: boolean = false;
  isStoppedDecisionDialogShow: boolean = false; // Hiển thị dialog xác nhận ngưng quyết định hay không
  isLoadingDropdownReasonStopProfile: boolean = false; // Loading của dropdown chọn lý do ngưng tuyển dụng/diều chuyển 1 profile
  errorOccurred: any = {}
  currentFolderPopup: number = 0;
  valueReason: DTOListHR;
  isObligatoryReason: boolean = false;

  @ViewChild("remark") valueRemark: TextAreaComponent;
  @ViewChild("datepickerEff") datepickerEff: PDatePickerComponent;
  @ViewChild("editor") editor: PKendoEditorComponent;

  //#region Decision
  isAddNew: boolean = true;
  isLockAll: boolean = false;
  decision: DTOHRDecisionMaster = new DTOHRDecisionMaster();
  oldTitleName: string = ''
  oldDescription: string = ''
  arrBtnStatus: { text: string, class: string, code: string, link?: any, type?: string }[] = [];
  stringNull: string = '';

  pickFileCallback: Function
  GetFolderCallback: Function

  // listReason: { Code: number, Text: string }[] = [{
  //   Code: 1,
  //   Text: "Lý do 1",
  // },
  // {
  //   Code: 2,
  //   Text: "Lý do 2",
  // },
  // {
  //   Code: 3,
  //   Text: "Lý do 3",
  // }];

  listReason: DTOListHR[] = [];

  //#endregion

  //#region GRID
  isLoading: boolean = true;
  isFilterDisable: boolean = false;
  gridView = new Subject<any>();
  gridData: DTOHRDecisionProfile[] = []
  page: number = 0;
  pageSize: number = 25
  pageSizes: number[] = [25, 50, 75, 100];
  total: number = 0;
  selectedProfile: DTOHRDecisionProfile;
  listReqDelProfile: DTOHRDecisionProfile[] = []

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
  }

  filterSearch: CompositeFilterDescriptor;

  onPageChangeCallback: Function;
  onActionDropDownClickCallback: Function;
  onSelectCallback: Function;
  onSelectedPopupBtnCallback: Function;
  getActionDropdownCallback: Function;
  getSelectionPopupCallback: Function;
  uploadEventHandlerCallback: Function;
  isEffectiveDate: boolean;
  isShowReasonStatus: boolean;

  //#endregion

  //#region DRAWER
  isOpenDrawer: boolean = false
  isListTypeHrFetched: boolean = false;
  isAddNewProfile: boolean = false;
  isShowAll: boolean = false;
  isEdit: boolean = false;
  isListDepartmentLoading: boolean = false; // Loading của dropdown Đơn vị điều chuyển
  isListTypePositionLoading: boolean = false; // Loading của dropdown Loại hình chức danh điều chuyển
  isListPositionLoading: boolean = false; // Loading của dropdown Chức danh điều chuyển
  isListLocationLoading: boolean = false; // Loading của dropdown Điểm làm việc điều chuyển
  isListTypeStaffLoading: boolean = false; // Loading của dropdown Loại nhân sự tuyển dụng/điều chuyển
  isSeeDetail: boolean = false
  isDepartmentDisable: boolean;
  isPositionDisable: boolean;
  isLocationDisable: boolean;
  isLoadingPage: boolean = false; // Loading của cả trang

  decisionProfile: DTOHRDecisionProfile = new DTOHRDecisionProfile();

  curDepartment: DTODepartment = new DTODepartment();
  curPosition: DTOPosition = new DTOPosition();
  curLocation: DTOLocation = new DTOLocation();
  curTypeHr: DTOListHR = new DTOListHR();
  curTypePosition: DTOListHR = new DTOListHR();
  oldDepartment: DTODepartment = new DTODepartment();
  oldPosition: DTOPosition = new DTOPosition();
  oldLocation: DTOLocation = new DTOLocation();
  oldTypeHr: DTOListHR = new DTOListHR();
  oldDateInput: Date;
  oldNote: string;
  oldReason: string;
  oldProbationPeriodDays: number;
  oldTypePosition: number;

  listDepartment: DTODepartment[]
  listPosition: DTOPosition[]
  listLocation: DTOLocation[]
  listTypeHR: DTOListHR[];
  listTypePosition: DTOListHR[];
  profileProps: string[];
  disabledDates: Day[] = [Day.Sunday];
  valueSearch: any = ''; // giá trị tìm kiếm
  minProbationPeriodDate: Date = null; // min của ngày kết thúc thử việc

  typeHrDefaultItem: DTOListHR = { Code: 0, ListID: '', ListName: '-- Chọn -- ', OrderBy: 0, TypeData: 0 }
  defaultDepartmentItem: DTODepartment = new DTODepartment();
  defaultPositionItem: DTOPosition = new DTOPosition();
  defaultLocationItem: DTOLocation = new DTOLocation();
  defaultTypeStaffItem: DTOListHR = new DTOListHR();

  isItemDisableCallback: Function;
  isLocationTreeDisableCallback: Function;
  pickStaffFileCallback: Function;
  GetStaffFolderCallback: Function;
  //#endregion

  //#region ENUM
  /**
   * ENUM quyết định tuyển dụng
   */
  HiringENUM: number = 1;
  /**
   * ENUM quyết định điều chuyển
   */
  TransferingENUM: number = 2;
  TypeHrENUM: number = 5
  confirm = EnumDialogType.Confirm
  //#endregion

  //#region Permission
  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true;
  actionPerm: any;
  isAllowedToCreate: boolean = false;
  isAllowedToVerify: boolean = false;
  isMaster: boolean = false;
  M_A: boolean = false;
  M_C: boolean = false;
  //#endregion

  currentDate: Date;
  unsubscribe = new Subject<void>;

  /**
   * Danh sách các API để unscribe khi component bị destroy
   */
  arrSub: Subscription[] = [];

  constructor(private menuService: PS_HelperMenuService,
    private staffService: StaffApiService,
    private layoutService: LayoutService,
    private decisionService: HriDecisionApiService,
    private domSanititizer: DomSanitizer,
    private apiServiceMar: MarNewsProductAPIService,
    private apiGetTemplateService: MarBannerAPIService,
  ) { }


  ngOnInit(): void {
    //Phân quyền
    let a = this.menuService.changePermission().pipe(takeUntil(this.unsubscribe)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false
        this.actionPerm = distinct(res.ActionPermission, "ActionType")

        this.isMaster = this.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        this.isAllowedToCreate = this.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        this.isAllowedToVerify = this.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

        this.M_A = this.isMaster || this.isAllowedToVerify;
        this.M_C = this.isMaster || this.isAllowedToCreate;
      }
    })
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);

    this.pickFileCallback = this.pickFile.bind(this)
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)

    this.pickStaffFileCallback = this.pickStaffFile.bind(this)
    this.GetStaffFolderCallback = this.GetStaffFolderWithFile.bind(this)

    this.onSelectCallback = this.onGridItemSelect.bind(this)

    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this)

    this.onActionDropDownClickCallback = this.onMoreActionItemClick.bind(this)
    this.onSelectedPopupBtnCallback = this.onSelectionActionItemClick.bind(this)

    this.onPageChangeCallback = this.onPageChange.bind(this);

    // this.isItemDisableCallback = this.isTreeItemDisable.bind(this);
    this.isLocationTreeDisableCallback = this.isLocationTreeItemDisable.bind(this);

    this.uploadEventHandlerCallback = this.uploadEventHand.bind(this);

    this.isLoading = false;

    // Loại nhân sự tuyển dụng mặc định
    this.curTypeHr.OrderBy = null;
    this.oldTypeHr.OrderBy = null;
    // Loại hình chức danh tuyển dụng mặc định
    this.curTypePosition.OrderBy = null;

    this.defaultDepartmentItem.Department = '-- Chọn --'
    this.defaultDepartmentItem.StatusID = 2
    this.defaultPositionItem.Position = '-- Chọn --'
    this.defaultPositionItem.StatusID = 2
    this.defaultLocationItem.LocationName = '-- Chọn --'
    this.defaultLocationItem.StatusID = 2

    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.getCache()
        this.setupBtnStatus();
        this.APIGetListDepartment();
        this.APIGetListHR(5);
        this.APIGetListHR(28);
      }
    })

    this.arrSub.push(a, b);
  }

  /**
   * Hàm thiết lập các nút chức năng trên header
   */
  setupBtnStatus() {
    this.arrBtnStatus = [];

    const status = this.decision.Status;
    const con1 = this.M_C && [0, 4].includes(status);
    const con2 = con1 || (this.M_A && [1, 2].includes(status)); // Kiểm tra checkbox của danh sách tuyển dụng

    //Kiểm tra ngày hiệu lực
    this.checkIsEffectiveDate();

    if (this.decision.Code != 0) {
      this.selectable.enabled = con2;

      // Push "Gửi duyệt" khi có quyền tạo hoặc toàn quyền và status = 0 hoặc status = 4
      if (con1) {
        this.arrBtnStatus.push({ text: 'GỬI DUYỆT', class: 'k-button btn-hachi hachi-primary', code: 'redo', link: 1, type: 'status', });
      }

      // Push "Phê duyệt và Trả về" khi có quyền duyệt hoặc toàn quyền và status = 1 hoặc status = 3 và chưa đến ngày hiệu lực
      if (this.M_A && status === 1) {
        // Push "Trả về" khi có quyền duyệt hoặc toàn quyền và status = 1
        this.arrBtnStatus.push({ text: 'TRẢ VỀ', class: 'k-button btn-hachi hachi-warning hachi-secondary', code: 'undo', link: 4, type: 'status' });
        this.arrBtnStatus.push({ text: 'DUYỆT ÁP DỤNG', class: 'k-button btn-hachi hachi-primary', code: 'check-outline', link: 2, type: 'status' });
      }

      // Push "Huỷ quyết định" khi có quyền duyệt hoặc toàn quyền và status = 2
      if (this.M_A && status === 2) {
        this.arrBtnStatus.push({ text: 'HUỶ QUYẾT ĐỊNH', class: 'k-button btn-hachi hachi-warning', code: 'minus-outline', link: 3, type: 'status' });
      }

      // Push "Xóa" khi có quyền tạo hoặc toàn quyền và status === 0
      if (this.M_C && this.decision.Status == 0) {
        this.arrBtnStatus.unshift({ text: 'XÓA QUYẾT ĐỊNH', class: 'k-button btn-hachi hachi-warning', code: 'trash', type: 'delete', link: 5 });
      }
    }

    if (this.M_C && this.decision.Code !== 0) {
      this.arrBtnStatus.push({ text: 'THÊM MỚI QUYẾT ĐỊNH', class: 'k-button btn-hachi hachi-primary', code: 'plus', type: 'add', link: 0 });
    }
  }

  /**
   * Hàm xử lí sự kiện click của các btn trên header
   * @param typeBtn
   * @param codeStatus
   */
  onHeaderBtnClick(typeBtn: string, codeStatus: number) {
    // Thêm mới quyết định
    if (typeBtn == 'add') {
      this.onAddNew();
    }
    // Xoá quyết định
    else if (typeBtn == 'delete') {
      this.isDeleteDecisionDialogShow = true;
    }
    // Cập nhật trạng thái
    if (typeBtn == 'status') {
      this.onUpdateStatus(codeStatus)
    }
  }

  /**
   * Hàm kiểm tra xem đã đến ngày hiệu lực chưa
   */
  checkIsEffectiveDate() {
    const checkEffectiveDate = (Ps_UtilObjectService.getDaysLeft(this.currentDate, this.decision.EffDate) > 0)
    this.isEffectiveDate = !checkEffectiveDate;
  }

  /**
   * Hàm xử lí khi nhấn vào breadcrumb
   */
  onBreadCrumbClick() {
    if (!this.isFilterDisable && this.decision.Code !== 0) {
      this.gridState.filter.filters = []
      this.APIGetHRDecisionMaster()
      // this.loadFilter();
    }
  }

  /**
   * Hàm xử lí khi người dùng ấn thêm mới quyết định
   */
  onAddNew() {
    // Reset giá trị cũ
    this.oldTitleName = '';
    this.oldDescription = '';
    this.oldDateInput = null;
    this.oldDepartment = new DTODepartment();
    this.oldPosition = new DTOPosition();
    this.oldLocation = new DTOLocation();
    this.oldTypeHr = new DTOListHR();
    this.oldNote = '';
    this.oldReason = '';
    this.oldProbationPeriodDays = null;
    this.oldTypePosition = null;

    this.isAddNew = true;
    this.isLockAll = false;
    this.decision = new DTOHRDecisionMaster();
    this.decision.TypeData = this.TypeData;
    this.decision.EffDate = null;
    this.datepickerEff.value = null;
    this.gridData = [];
    this.gridView.next({ data: this.gridData, total: this.total });
    this.setupBtnStatus();
    localStorage.setItem('HrDecisionMaster', JSON.stringify(this.decision));
  }

  /**
   * Hàm xử update trạng thái quyết định
   * @param status
   */
  onUpdateStatus(status: number) {
    // Nếu trạng thái được nhấn là gửi duyệt hoặc duyệt áp dụng
    if ([1, 2].includes(status)) {
      //Nếu các trường bắt buộc đủ thông tin thì gọi API
      if (this.onRequiredFieldCheck()) {
        this.isLoadingPage = true;
        this.APIUpdateHRDecisionMasterStatus([this.decision], status)
      }
    }
    // Nếu huỷ quyết định
    else if (status == 3) {
      this.handleDialogStopDecision(1);
    }
    else {
      this.isLoadingPage = true;
      this.APIUpdateHRDecisionMasterStatus([this.decision], status)
    }
  }

  /**
   * Hàm xử lí hiển thị popup folder
   * @param value
   */
  onUploadImg(value: number) {
    this.currentFolderPopup = value;
    this.layoutService.folderDialogOpened = true
  }

  /**
   * Hàm xử lí khi người dùng chọn file hình ảnh cho texteditor
   * @param e
   * @param width
   * @param height
   */
  pickFile(e: DTOCFFile, width, height) {
    this.layoutService.getEditor().embedImgURL(e, width, height)
    this.layoutService.setFolderDialog(false)
  }

  /**
 * Hàm xử lí khi người dùng chọn file hình ảnh cho drawer
 * @param e
 * @param width
 * @param height
 */
  pickStaffFile(e: DTOCFFile, width, height) {
    this.decisionProfile.ImageThumb = e?.PathFile.replace('~', '')
    this.layoutService.setFolderDialog(false)
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
   * Hàm lấy ảnh từ component app folder với folder cơ cấu tổ chức
   * @param childPath
   * @returns
   */
  GetStaffFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog()) {
      return this.apiServiceMar.GetFolderWithFile(childPath, 14);
    }
    //14 = folder cơ cấu tổ chức
  }

  /**
   * Hàm dùng để check các trường bắt buộc của quyết định
   * @param isSkipMsg bỏ qua thông báo mặc định là false
   * @returns true | false
   */
  onRequiredFieldCheck(isSkipMsg: boolean = false) {
    const typeDecision = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển'
    let msgStr = `Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${typeDecision} ${this.decision.DecisionID ?? 'không xác định'}: thiếu `;

    // Kiểm tra quyết định có tiêu đề không?
    if (!Ps_UtilObjectService.hasValueString(this.decision.DecisionName)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + 'Tiêu đề')
      }
      return false;
    }

    // Kiểm tra quyết định có ngày hiệu lực?
    else if (!Ps_UtilObjectService.hasValueString(this.decision.EffDate)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + 'Ngày hiệu lực')
      }
      return false;
    }

    const effDate = new Date(this.decision.EffDate);
    const currentDate = new Date();

    // Chỉ so sánh ngày, bỏ qua giờ phút giây
    if (
      Ps_UtilObjectService.hasValueString(this.decision.EffDate) &&
      effDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
    ) {
      if (!isSkipMsg) {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${typeDecision} ${this.decision.DecisionID}: Ngày hiệu lực phải là hiện tại hoặc tương lai.`);
      }
      return false;
    }

    else if (!Ps_UtilObjectService.hasListValue(this.gridData)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `Danh sách ${typeDecision}`)
      }
      return false;
    }

    return true;
  }

  /**
   * Hàm xử lí khi nhấn nút thêm mới hồ sơ
   */
  onAddNewProfile() {
    this.isOpenDrawer = true;
    this.isAddNewProfile = true;
    this.isShowAll = false;
    this.decisionProfile = new DTOHRDecisionProfile();
    this.curDepartment.Code = this.decisionProfile.Department;
    this.curPosition.Code = this.decisionProfile.Position;
    this.curLocation.Code = this.decisionProfile.Location;

    // Loại nhân sự tuyển dụng mặc định
    this.curTypeHr.OrderBy = null;
    this.oldTypeHr.OrderBy = null;
    // Loại hình chức danh tuyển dụng mặc định
    this.curTypePosition.OrderBy = null;

    this.assignDefaultDropValue();
  }

  /**
   * Hàm nhận giá trị từ grid khi có item được chọn
   * @param isSelected
   */
  onGridItemSelect(isSelected: boolean) {
    this.isFilterDisable = isSelected;
  }

  /**
   * Hàm lấy các action khi user nhấn nút more action
   * @param moreActionDropdown
   * @param dataItem
   * @returns
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any) {
    moreActionDropdown = []
    var statusDecision = this.decision.Status
    this.decisionProfile = JSON.parse(JSON.stringify(dataItem))

    // Action chỉnh sửa và xoá hồ sơ
    if (([0, 4].includes(statusDecision) && this.M_C) || (statusDecision == 1 && this.M_A)) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Type: 'edit', Actived: true })
      moreActionDropdown.push({ Name: "Xóa hồ sơ", Code: "trash", Type: 'delete', Actived: true })
    }
    else if (statusDecision == 2 && this.M_A && ([1, 2].includes(dataItem.Status) || [1, 2].includes(dataItem.DecisionProfileChild?.Status))) {
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Type: 'detail', Actived: true })
      // Không được phép ngưng khi hồ sơ onboarded hoặc ngưng
      if (this.TypeData == 1 && (dataItem.Status == 1 || dataItem.Status == 2)) {
        moreActionDropdown.push({ Name: "Ngưng tuyển dụng", Code: "minus-outline", Type: 'StatusID', Actived: true })
      }
      // Không được phép ngưng khi hồ sơ có một quy trình onboard/offboard bị ngưng
      else if (
        this.TypeData == 2 &&
        !(dataItem.Status === 3 || dataItem.DecisionProfileChild?.Status === 3) &&
        !(dataItem.Status === 4 && dataItem.DecisionProfileChild?.Status === 4)
      ) {
        moreActionDropdown.push({ Name: "Ngưng điều chuyển", Code: "minus-outline", Type: 'StatusID', Actived: true });
      }

    }

    if (!Ps_UtilObjectService.hasListValue(moreActionDropdown)) {
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Type: 'detail', Actived: true })
    }
    return moreActionDropdown;
  }

  /**
   * Hàm lấy các action cho popup khi người dùng chọn nhiều item
   * @param arrItem
   * @returns
   */
  getSelectionPopupAction(arrItem: any[]) {
    var moreActionDropdown = new Array<MenuDataItem>()
    var status = this.decision.Status

    if (((status == 0 || status == 4) && (this.isAllowedToCreate || this.isMaster)) || (status == 1 && (this.isAllowedToVerify || this.isMaster))) {
      moreActionDropdown.push({ Name: "Xóa hồ sơ", Code: "trash", Type: 'Delete', Link: "delete", Actived: true })
    }

    if (status == 2) {
      moreActionDropdown.push({ Name: "Xuất Offer", Code: "file-word", Type: 'Word', Link: "ExportWord", Actived: true })
    }
    return moreActionDropdown
  }

  convertIconToImage(inputHtml: string, fileType: string) {
    // // Map các kiểu file sang đường dẫn ảnh tương ứng
    // const fileTypeToImageMap: Record<string, string> = {
    //   word: 'assets/img/logo/docx.svg',
    //   excel: 'assets/img/logo/xlsx.svg',
    //   pdf: 'assets/img/logo/pdf.svg',
    //   // Thêm các file type khác nếu cần
    // };

    // // Tìm đường dẫn ảnh dựa vào fileType
    // const imageSrc = fileTypeToImageMap[fileType.toLowerCase()] || '';

    // if (!imageSrc) {
    //   throw new Error(`File type "${fileType}" không được hỗ trợ.`);
    // }

    // Tạo thẻ <img> thay thế
    inputHtml = inputHtml.replace(
      // /<span class=".*?k-icon"><\/span>/,
      /<img class="k-image" src="assets\\img\\logo\\xlsx.svg">/,
      `/<img class="k-image" src="assets\img\logo\docs.svg" />/`
    );
  }

  /**
   * Hàm xử lí action được chọn trên popup
   * @param menu menu action đã nhấn
   * @param item chính sách được chọn
   */
  onMoreActionItemClick(menu: MenuDataItem, item: any) {
    if (menu.Link == 'edit' || menu.Code == 'pencil' || menu.Code == "eye" || menu.Link == 'detail') {

      this.isEdit = menu.Code == 'pencil';
      this.isSeeDetail = menu.Code == 'eye';
      this.isOpenDrawer = true;
      this.isShowAll = true;

      this.oldTypeHr.OrderBy = this.curTypeHr.OrderBy;
      this.oldDateInput = new Date(this.decisionProfile.JoinDate);
      this.oldNote = this.decisionProfile.Remark;
      this.oldReason = this.decisionProfile.Reason;
      this.oldProbationPeriodDays = this.decisionProfile.ProbationPeriodDays;
      this.oldTypePosition = this.decisionProfile.TypePosition;

      // Lấy các thông tin về vị trí cũ
      this.oldDepartment.Code = item?.OldDepartment;
      this.oldPosition.Code = item?.OldPosition;
      this.oldLocation.Code = item?.OldLocation;

      // Lấy các thông tin về vị trí mới
      this.curDepartment.Code = item?.Department;
      this.curDepartment.Department = item?.DepartmentName;
      this.curPosition.Code = item?.Position;
      this.curPosition.Position = item?.PositionName;
      this.curLocation.Code = item?.Location;
      this.curLocation.LocationName = item?.LocationName;

      // Loại hình chức danh
      this.curTypePosition.OrderBy = item.TypePosition;

      // Loại nhân sự tuyển dụng/điều chuyển
      this.curTypeHr.OrderBy = item.TypeStaff;
      this.oldTypeHr.OrderBy = item.TypeStaff;

      this.APIGetListDepartment();
      this.assignDefaultDropValue()
    }
    else if (menu.Link == 'delete' || menu.Code == 'trash') {
      this.listReqDelProfile = []
      this.listReqDelProfile.push(item)
      this.isDeleteProfileDialogShow = true
    }
    else if (menu.Link == '3' || menu.Code == "minus-outline") {
      this.isStoppedDialogShow = true;
      setTimeout(() => {
        if (this.TypeData == 2) {
          this.toggleBorder('return');
        }
      }, 1)
      this.APIGetListHR(5);
    }
  }


  /**
     * Hàm xử lí action được chọn trên dialog
     * @param btnType Loại action đã nhấn
     * @param listSelectedItem List các item đã được chọn
     * @param value Value của action đã nhấn
     */
  onSelectionActionItemClick(btnType: string, listSelectedItem: any[], value: any) {

    if (btnType == 'Delete') {
      this.listReqDelProfile = listSelectedItem
      if (Ps_UtilObjectService.hasListValue(this.listReqDelProfile)) {
        this.isDeleteProfileDialogShow = true;
      }
    }


    if (btnType == 'Word') {
      this.listReqDelProfile = listSelectedItem
      if (Ps_UtilObjectService.hasListValue(this.listReqDelProfile)) {
        this.APIGetHRDecisionProfileReportWord(this.listReqDelProfile)
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
    this.gridState.skip = event.skip
    this.gridState.take = event.take

    this.loadFilter();
  }

  /**
   * Hàm lấy cache
   */
  getCache() {
    const cacheItem = JSON.parse(localStorage.getItem('HrDecisionMaster'));
    if (Ps_UtilObjectService.hasValue(cacheItem)) {
      this.decision = cacheItem
      if (this.decision.Code == 0) {
        this.isAddNew = true;
        this.isInformationBlockLoading = false;
      } else {
        this.isAddNew = false;
        this.APIGetHRDecisionMaster();
        // this.loadFilter()
      }
    }
  }

  /**
   * Hàm load data danh sách nhân sự trong quyết định tuyển dụng/điều chuyển
   */
  loadFilter() {
    this.gridState.filter.filters = [];

    //Kiểm tra nếu như filter descriptor đã tồn tại
    const containedDescriptor = this.gridState.filter.filters.findIndex((v: FilterDescriptor | CompositeFilterDescriptor) => {
      return !isCompositeFilterDescriptor(v) && v.field === 'Decision';
    });

    if (containedDescriptor == -1) {
      this.gridState.filter.filters.push(
        {
          field: 'Decision',
          operator: 'eq',
          ignoreCase: false,
          value: this.decision.Code
        }
      )
    }

    if (Ps_UtilObjectService.hasValueString(this.valueSearch) && Ps_UtilObjectService.hasListValue(this.filterSearch.filters)) {
      this.gridState.filter.filters.push(this.filterSearch);
    }

    // Nếu ở điều chuyển
    if (this.TypeData == this.TransferingENUM) {
      this.gridState.filter.filters.push({ field: 'DecisionProfileChild', operator: 'neq', value: null })
    }
    // Nếu ở tuyển dụng
    else if (this.TypeData == this.HiringENUM) {
      // Loại boarding là on hay off
      this.gridState.filter.filters.push({ field: 'BoardingType', operator: 'eq', value: 1 })
    }

    // Loại quyết định là tuyển dụng hay điều chuyển
    this.gridState.filter.filters.push({ field: 'DecisionType', operator: 'eq', value: this.TypeData })

    this.APIGetListHRDecisionProfile()
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

    this.filterSearch = filterDescriptor;

    this.loadFilter();
  }

  /**
   * Hàm xử lí khi user nhấn nút lưu ở text editor
   * @param value
   */
  onSaveEditContent(value: any) {
    // if (Ps_UtilObjectService.hasValueString(value?.trim())) {
    this.decision.Description = value;
    this.APIUpdateHRDecisionMaster(this.decision, ['Description']);
    // }
    // else {
    //   this.decision.Description = this.oldDescription + ' '
    // }
  }

  /**
   * Hàm chung xử lí khi giá trị thay đổi
   * @param props properties
   * @param TypeValueChange phân loại
   * @param value giá trị
   */
  onValueChanged(props: string[], TypeValueChange: number = 0, value?: any) {
    if (Ps_UtilObjectService.hasValue(value) && Ps_UtilObjectService.hasListValue(value.ListChild)) {
      this.layoutService.onWarning('Đã xảy ra lỗi khi chọn điểm làm việc: Bạn không được chọn nhóm điểm làm việc');
      this.curLocation = this.defaultLocationItem;
      return;
    }

    if (TypeValueChange == 0) {
      if (this.isAddNew) {
        props.push('Code')
        props.push('TypeData')
        props.push('EffDate')
      }

      if (props[0] == 'DecisionName') {
        if (!this.oldValueCheck(this.oldTitleName, this.decision.DecisionName)) {
          this.APIUpdateHRDecisionMaster(this.decision, props);
        }
        else {
          this.decision.DecisionName = this.oldTitleName;
        }
      } else {
        this.APIUpdateHRDecisionMaster(this.decision, props);
      }
    }
    else if (TypeValueChange == 1) {
      if (this.isAddNewProfile) {
        if (this.TypeData == 1) {
          const personalInfo = new DTOPersonalInfo();
          personalInfo.IdentityNo = this.decisionProfile.IdentityNo;
          this.APIGetHRPersonalProfileByCICN(personalInfo);
        }
        else if (this.TypeData == 2) {
          const employee = new DTOEmployee();
          employee.StaffID = this.decisionProfile.StaffID;
          this.APIGetHREmployeeByID(employee)
        }
      }
    }
    else if (TypeValueChange == 2) {

      this[props[0]] = value

      if (props[0] == 'curDepartment') {
        this.curPosition.Code = null;
        this.curLocation.Code = null;
        this.APIGetListPositionDepartment()
        this.APIGetListLocationDepartment()
      }
      else if (props[0] == 'curPosition') {
        // if (this.curPosition.Code == 0 || !this.curPosition.Code) {
        this.curLocation = this.defaultLocationItem;
        this.curPosition.Code = value.Code;
        // }
      }
      else if (props[0] == 'curLocation') {
        this.curLocation.Code = value.Code;
      }
      this.assignDefaultDropValue()
    }
    else if (TypeValueChange == 3) {
      // Nếu chọn loại hình chức danh
      if (props[0] == 'TypePosition') {
        this.curTypePosition.OrderBy = value.OrderBy;
        this.decisionProfile.TypePosition = value.OrderBy;
      }
      // Loại nhân sự tuyển dụng / điều chuyển
      else if (props[0] == 'TypeStaff') {
        this.curTypeHr.OrderBy = value.OrderBy;
        this.decisionProfile.TypeStaff = value.OrderBy;
      }
    }
  }

  /**
   * Kiểm tra giá trị cũ và mới
   * @param oldValue Giá trị cũ
   * @param newValue Giá trị mới
   * @returns true khi trùng hoặc false không trùng
   */
  oldValueCheck(oldValue: any, newValue: any): boolean {
    if (oldValue.trim() === newValue.trim() || newValue.trim() === '') {
      return true;
    }
    return false;
  }

  /**
   * Hàm xử lí khi đóng drawer
   */
  onCloseDrawer() {
    this.isOpenDrawer = false;
    this.isAddNewProfile = false;
    this.isEdit = false;
    this.isSeeDetail = false;
    this.isShowAll = false;
    this.curTypeHr = JSON.parse(JSON.stringify(this.typeHrDefaultItem))
    this.assignDefaultDropValue();
  }


  /**
   * Hàm gán giá trị default cho dropdown trên drawer
   * Nếu chưa chọn department thì set default cho location và positon
   * Nếu chưa chọn position thì set default cho location
   */
  assignDefaultDropValue() {
    if (this.curDepartment.Code == 0 || !this.curDepartment.Code || !Ps_UtilObjectService.hasValue(this.curDepartment)) {
      this.curDepartment = JSON.parse(JSON.stringify(this.defaultDepartmentItem))
      this.curPosition = JSON.parse(JSON.stringify(this.defaultPositionItem))
      this.curLocation = JSON.parse(JSON.stringify(this.defaultLocationItem))
    }
    else if (this.curPosition.Code == 0 || !this.curPosition.Code || !Ps_UtilObjectService.hasValue(this.curPosition)) {
      this.curPosition = JSON.parse(JSON.stringify(this.defaultPositionItem))
      this.curLocation = JSON.parse(JSON.stringify(this.defaultLocationItem))
    }
    else if (this.curLocation.Code == 0 || !this.curLocation.Code || !Ps_UtilObjectService.hasValue(this.curLocation)) {
      this.curLocation = JSON.parse(JSON.stringify(this.defaultLocationItem))
    }
  }

  /**
   * Hàm xử lí cho các nút action trên drawer
   * @param TypeBtn
   */
  onDrawerBtnClick(TypeBtn?: string) {
    if (TypeBtn === 'Delete') {
      this.isDeleteProfileDialogShow = true;
      this.listReqDelProfile = [this.decisionProfile];
      return;
    }

    // Gán thông tin cơ bản
    Object.assign(this.decisionProfile, {
      Decision: this.decision.Code,
      Department: this.curDepartment.Code,
      DepartmentName: this.curDepartment.Department,
      Position: this.curPosition.Code,
      PositionName: this.curPosition.Position,
      Location: this.curLocation.Code,
      LocationName: this.curLocation.LocationName,
    });

    if (TypeBtn === 'Add') {
      this.decisionProfile.TypeStaff = null;
      // console.log(this.decisionProfile);
    }

    if (!this.onRequiredValueCheck(this.decisionProfile)) {
      return;
    }

    // Nếu cập nhật
    if (TypeBtn === 'Update') {
      // const isDataChanged =
      //   this.oldDepartment.Code !== this.curDepartment.Code ||
      //   this.oldPosition.Code !== this.curPosition.Code ||
      //   this.oldLocation.Code !== this.curLocation.Code ||
      //   this.oldTypeHr.OrderBy !== this.curTypeHr.OrderBy ||
      //   Ps_UtilObjectService.getDaysDiff(this.oldDateInput, new Date(this.decisionProfile.JoinDate)) !== 0 ||
      //   ([1, 2].includes(this.TypeData) && (this.oldNote !== this.decisionProfile.Remark || this.oldProbationPeriodDays !== this.decisionProfile.ProbationPeriodDays || this.oldTypePosition !== this.decisionProfile.TypePosition)) ||
      //   (this.TypeData === 2 && (this.oldNote !== this.decisionProfile.Remark || this.oldReason !== this.decisionProfile.Reason));

      // if (isDataChanged) {
      this.APIUpdateHRDecisionProfile(this.decisionProfile);
      // }
      // else {
      //   this.onCloseDrawer();
      // }
    }
    else {
      this.APIUpdateHRDecisionProfile(this.decisionProfile);
    }
  }

  /**
   * Thông tin cần nhập trong dialog Huỷ quyết định có valid không
   * @param typeData 1: 'Tuyển dụng' | 2: 'Điều chuyển'
   * @param hasNotify Có thông báo lên khi gặp lỗi hay không. Default = false
   * @return true nếu các thông tin đã valid và đầy đủ
   */
  isValidDialogStopDecision(typeData: number, hasNotify: boolean = false) {
    const typeDataName = typeData == this.HiringENUM ? 'tuyển dụng' : typeData == this.TransferingENUM ? 'điều chuyển' : 'quyết định';
    const msgError = `Đã xảy ra lỗi khi huỷ ${typeDataName}:`

    // Nếu là tuyển dụng hoặc điều chuyển
    if (typeData == this.HiringENUM || typeData == this.TransferingENUM) {
      // Thiếu lý do
      if (!Ps_UtilObjectService.hasValue(this.valueReason)) {
        if (hasNotify) {
          this.layoutService.onError(`${msgError}: Chưa chọn lý do, vui lòng chọn lý do huỷ`);
        }
        return false;
      }
      // Lý do là lý do khác. Yêu cầu thêm mô tả lý do
      const conHiring = this.valueReason.Code == 119 && typeData == this.HiringENUM;
      const conTransfering = this.valueReason.Code == 113 && typeData == this.TransferingENUM;
      const hasDes = Ps_UtilObjectService.hasValueString(this.valueRemark.value);
      if ((conHiring || conTransfering) && !hasDes) {
        if (hasNotify) {
          this.layoutService.onError(`${msgError}: Chưa nhập mô tả lý do, vui lòng nhập mô tả lý do huỷ`);
        }
        return false;
      }
      // Hướng xử lý ngưng điều chuyển
      if (typeData == this.TransferingENUM && !this.isQuitChecked && !this.isReturnChecked) {
        if (hasNotify) {
          this.layoutService.onError(`${msgError}: Chưa hướng xử lý, vui lòng hướng xử lý`);
        }
        return false;
      }
      // Khi đã valid và nhập đầy đủ
      return true;
    }
    else {
      if (hasNotify) {
        this.layoutService.onError(`${msgError}: Loại quyết định không tồn tại`);
      }
      return false;
    }
  }

  /**
   * Hàm dùng để tương tác với dialog ngưng quyết định
   * @param option 1. Mở dialog | 2. Đóng dialog | 3. Xác nhận huỷ quyết định
   */
  handleDialogStopDecision(option: number) {
    // 1. Mở dialog
    if (option == 1) {
      this.isStoppedDecisionDialogShow = true;
      this.isReturnChecked = true;
      this.isQuitChecked = false;

      if (this.TypeData == this.HiringENUM) {
        this.APIGetListHR(26);
      }
      if (this.TypeData == this.TransferingENUM) {
        this.APIGetListHR(25);
      }
      return;
    }
    // 2. Đóng dialog
    if (option == 2) {
      this.isStoppedDecisionDialogShow = false;
      return;
    }
    // 3. Xác nhận huỷ quyết định
    if (option == 3) {
      if (this.isValidDialogStopDecision(this.TypeData, true)) {
        if (this.TypeData == this.TransferingENUM) {
          this.decision.TypeStop = this.isReturnChecked ? 1 : 2;
        }
        // Gán các thông tin lý do
        this.decision.ReasonStatus = this.valueReason.Code;
        this.decision.ReasonStatusDescription = this.valueRemark.value;
        // Gọi API cập nhật trạng thái quyết định
        this.APIUpdateHRDecisionMasterStatus([this.decision], 3);
      }
    }
  }


  /**
   * Hàm check các trưởng bắt buộc của drawer
   * @param DTO
   * @param isSkipMsg
   * @returns
   */
  onRequiredValueCheck(DTO: DTOHRDecisionProfile, isSkipMsg: boolean = false) {
    const TypeUpdate = DTO.Code == 0 ? 'Thêm mới thông tin' : 'Cập nhật thông tin';
    const toastText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển'
    const toastText2 = this.TypeData == this.HiringENUM ? 'công tác' : 'điều chuyển'
    const toastText3 = this.TypeData == this.HiringENUM ? '' : 'điều chuyển'

    let msgStr = `Đã xảy ra lỗi khi ${TypeUpdate} ${toastText}: Thiếu `;
    if ((!Ps_UtilObjectService.hasValue(DTO.PersonalProfile)) && this.TypeData == this.HiringENUM) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `CMND/CCCD`)
      }
      return false;
    }
    else if ((!Ps_UtilObjectService.hasValue(DTO.StaffID)) && this.TypeData == this.TransferingENUM) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `mã nhân sự`)
      }
      return false;
    }
    else if ((!Ps_UtilObjectService.hasValue(DTO.Cellphone)) && this.TypeData == this.HiringENUM) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `số điện thoại`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.CurrentDepartmentName) && this.TypeData == this.TransferingENUM) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `đơn vị hiện tại`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.CurrentPositionName) && this.TypeData == this.TransferingENUM) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `chức danh hiện tại`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.CurrentLocationName) && this.TypeData == this.TransferingENUM) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `điểm làm việc hiện tại`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.Department) || DTO.Department == 0) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `đơn vị ${toastText2}`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.Position) || DTO.Position == 0) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `chức danh ${toastText}`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.TypePosition) || DTO.Position == 0) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `loại hình chức danh ${toastText}`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.Location) || DTO.Location == 0) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `điểm làm việc ${toastText3}`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(this.curTypeHr.OrderBy)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `loại nhân sự ${toastText3}`)
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(DTO.JoinDate?.toString())) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `ngày vào làm`)
      }
      return false;
    }

    else if (this.TypeData == this.HiringENUM && !Ps_UtilObjectService.hasValueString(DTO.ProbationPeriodDays?.toString())) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + `thử việc`)
      }
      return false;
    }

    return true
  }

  /**
   * Hàm check disable item cho dropdown list
   * @param item
   * @returns
   */
  isItemDisable = (item: any): boolean => {
    return item.dataItem.StatusID != 2
  }

  /**
   * Hàm check disable item cho dropdowntree
   * @param dataItem
   * @returns
   */
  isTreeItemDisable = (dataItem: any): boolean => {
    return dataItem?.StatusID != 2
  }


  /**
     * Hàm check disable item cho dropdowntree location
     * @param dataItem
     * @returns
     */
  isLocationTreeItemDisable = (dataItem: any): boolean => {
    if (this.oldPosition.Code == this.curPosition.Code && this.oldDepartment.Code == this.curDepartment.Code) {
      return this.oldLocation.Code == dataItem.Code;
    }
    return !dataItem.IsChoose;
  }

  /**
   * Display group button add
   * @returns true if availabel
   */
  checkDisplayGroupButtonAdd() {
    if (!this.isAllowedToVerify && !this.isMaster && !this.isAllowedToCreate) {
      return false;
    }

    if (this.decision.Status == 0 || this.decision.Status == 4) {
      if (this.isAllowedToCreate || this.isMaster) {
        return true;
      }
    }
    if (this.decision.Status == 1) {
      if (this.isAllowedToVerify || this.isMaster) {
        return true;
      }
    }
    return false;
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
      if (this.errorOccurred[imageKey]) { return this.getResHachi(a); }
      else {
        return this.domSanititizer.bypassSecurityTrustResourceUrl(Ps_UtilObjectService.getImgRes(a));
      }
    }
    else {
      return '../../../../../assets/img/icon/icon-nonImageThumb.svg'
    }

  }
  handleError(imageKey: string) { this.errorOccurred[imageKey] = true; }

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
   * Hàm lấy các tên bị ẩn cho popup xoá
   * @returns
   */
  getRemainingProfileNames(): string {
    return this.listReqDelProfile.slice(2).map(item => item.FullName).join('\n');
  }

  /**
   * Hàm toggle popup xoá quyết định
   */
  toggleDeleteDecisionDialog() {
    this.isDeleteDecisionDialogShow = !this.isDeleteDecisionDialogShow
  }

  /**
   * Hàm toggle popup xoá ảnh hồ sơ
   */
  toggleProfileDialog() {
    this.isProfileDialogOpen = !this.isProfileDialogOpen
  }

  /**
   * Hàm toggle popup xoá hồ sơ
   */
  toggleDeleteProfileDialog() {
    this.isDeleteProfileDialogShow = !this.isDeleteProfileDialogShow
  }

  /**
* Hàm toggle popup ngưng tuyển dụng/ điều chuyển
*/
  toggleStoppedDialog() {
    this.isStoppedDialogShow = false;
    this.valueReason = null;
  }

  /**
   * Hàm xử lí xoá ảnh hồ so
   */
  deleteProfileImg() {
    this.decisionProfile.ImageThumb = ''
    this.toggleProfileDialog()
  }

  /**
   * Hàm xử lí confirm dialog
   * @param dialog 1: xoá quyết định | 2 xoá hồ sơ trong quyết định
   */
  onDiaglogConfirm(dialog: number) {
    // Xóa quyết định
    if (dialog == 1) {
      if (Ps_UtilObjectService.hasListValue(this.gridData)) {
        return this.layoutService.onError('Đã xảy ra lỗi khi xóa quyết định: Còn danh sách hồ sơ');
      }
      this.APIDeleteHRDecisionMaster([this.decision])
    }
    // Xóa hồ sơ bên trong quyết định
    else if (dialog == 2) {
      this.APIDeleteHRDecisionProfile(this.listReqDelProfile);
    }
  }

  /**
   * Hàm lấy value reason khi change select
   * @param value value reason được chọn
   */
  getValueChangeDropdownReason(value: DTOListHR) {
    this.valueReason = value;
    const conHiring = value.Code == 119 && this.TypeData == this.HiringENUM;
    const conTransfering = value.Code == 113 && this.TypeData == this.TransferingENUM;
    this.isObligatoryReason = conHiring || conTransfering;
  }

  /**
   * Hàm xử lý khi chọn confirm của dialog ngưng
   */
  onDiaglogConfirmStopped() {
    let listDecisionProfile: DTOHRDecisionProfile[] = [];
    let tempProfile: DTOHRDecisionProfile = { ...this.decisionProfile };

    // Kiểm tra giá trị reason
    const isReasonValid = Ps_UtilObjectService.hasValue(this.valueReason) && Ps_UtilObjectService.hasValue(this.valueReason.Code);

    if (!isReasonValid) {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ của ${this.decisionProfile.FullName}: Chưa chọn lý do, vui lòng chọn lý do `);
      return;
    }

    // Gán các giá trị chung
    Object.assign(tempProfile, {
      ReasonStatusDescription: this.valueRemark.value,
      ReasonStatus: this.valueReason.Code,
    });

    // Kiểm tra và xử lý lý do bắt buộc
    if (this.isObligatoryReason && !Ps_UtilObjectService.hasValueString(this.valueRemark.value)) {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ của ${this.decisionProfile.FullName}: Chưa nhập mô tả, vui lòng nhập mô tả `);
      return;
    }

    // Kiểm tra hình thức xử lý
    if (!this.isReturnChecked && !this.isQuitChecked && this.TypeData == this.TransferingENUM) {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ của ${this.decisionProfile.FullName}: Chưa chọn hình thức xử lý `);
      return;
    }

    tempProfile.TypeStop = this.isReturnChecked ? 1 : 2;

    // Xử lý cho từng loại dữ liệu
    if ([1, 2].includes(this.TypeData)) {
      listDecisionProfile.push(tempProfile);
    }

    // Gọi API cập nhật
    this.APIUpdateHRDecisionProfileStatus(listDecisionProfile, 3);
  }



  /**
   * Hàm xử lí hiển thị mã nhân sự nếu quyết định đã được duyệt và tới ngày hiệu lực
   * @returns
   */
  checkStaffIDVisibility(): boolean {
    const con1 = [2, 3].includes(this.decision.Status);
    return !(con1 || this.TypeData == 2)
  }

  onImportExcel() {
    this.layoutService.setImportDialog(true)
    this.layoutService.setExcelValid(true)
  }

  uploadEventHand(e: File) {
    this.APIImportExcelPosition(e)
  }

  /**
   * Hàm check value string dùng bên HTML
   * @param value
   * @returns
   */
  checkValueString(value: string): boolean {
    if (Ps_UtilObjectService.hasValueString(value)) {
      return true;
    }

    return false;
  }

  /**
   * Hàm trả về chuỗi string trạng thái của hồ sơ trong quyết định
   * @param status code status hồ sơ trong quyết định
   * @param typeBoard loại quyết định
   * @returns
   */
  formatStringValueStatus(status, typeBoard): string {
    let valueString = "";
    if (typeBoard == 1) {
      switch (status) {
        case 1:
          valueString = "Chuẩn bị Onboarding";
          break;
        case 2:
          valueString = "Onboarding";
          break;
        case 3:
          valueString = "Ngưng Onboarding";
          break;
        case 4:
          valueString = "Hoàn tất Onboarding";
          break;
      }
    } else {
      switch (status) {
        case 1:
          valueString = "Chuẩn bị Offboarding";
          break;
        case 2:
          valueString = "Offboarding";
          break;
        case 3:
          valueString = "Ngưng Offboarding";
          break;
        case 4:
          valueString = "Hoàn tất Offboarding";
          break;
      }
    }
    return valueString;
  }

  /**
   * Check box "Trở lại vị trí cũ" được check hay không
   * Default: true
   */
  isReturnChecked: boolean = true;
  /**
   * Check box "Nghỉ việc" được check hay không
   * Default: true
   */
  isQuitChecked: boolean = false;

  /**
   * Hàm xử lý khi check radio return hoặc quit
   * @param radio return: 'Trở lại vị trí cũ' | quit: 'Nghỉ việc'
   */
  toggleBorder(radio: 'return' | 'quit') {
    // Trở lại vị trí cũ
    if (radio === 'return') {
      this.isReturnChecked = true;
      this.isQuitChecked = false;
    }
    // Nghỉ việc
    else if (radio === 'quit') {
      this.isReturnChecked = false;
      this.isQuitChecked = true;
    }
  }


  /**
   * Hàm xử lý khi thay đổi ngày bắt đầu hoặc kết thúc thử việc
   * @param date ngày bắt đầu/kết thúc thử việc
   * @param type 1.ngày bắt đầu, 2.ngày kết thúc
   */
  handleChangeSelectDate(date: Date, type: number) {
    // Ngày đang select là ngày bắt đầu
    if (type == 1) {
      if (Ps_UtilObjectService.hasValueString(this.decisionProfile.JoinDate)) {
        // Lấy ngày nhỏ nhất cho date picker của ngày kết thúc = ngày bắt đầu + 1
        this.minProbationPeriodDate = Ps_UtilObjectService.addDays(new Date(this.decisionProfile.JoinDate), 1);

        let dateOfEnd = new Date(this.decisionProfile.ProbationPeriodDate);
        // Tính ngày kết thúc mặc định bằng ngày thử việc + 60
        dateOfEnd = Ps_UtilObjectService.addDays(new Date(this.decisionProfile.JoinDate), 60);
        dateOfEnd = Ps_UtilObjectService.addHours(dateOfEnd, 7);
        // Ép kiểu string cho ngày kết thúc
        this.decisionProfile.ProbationPeriodDate = dateOfEnd.toISOString();
        // Tính số ngày thử việc = ngày kết thúc - ngày bắt đầu, làm tròn
        this.decisionProfile.ProbationPeriodDays = Math.round(
        Ps_UtilObjectService.getDaysLeft(this.decisionProfile.JoinDate, this.decisionProfile.ProbationPeriodDate));
      }
    }
    // Ngày đang select là ngày kết thúc
    else {
      if (Ps_UtilObjectService.hasValueString(this.decisionProfile.JoinDate) && Ps_UtilObjectService.hasValueString(this.decisionProfile.ProbationPeriodDate)) {
        this.decisionProfile.ProbationPeriodDays = Math.round(
        Ps_UtilObjectService.getDaysLeft(this.decisionProfile.JoinDate, this.decisionProfile.ProbationPeriodDate));
      }
    }
  }

  //#region API

  /**
   * API lấy danh sách loại nhân sự/loại hình nhân sự
   */
  APIGetListHR(TypeHrENUM: number) {
    // Nếu đang mở các popup ngưng
    if (this.isStoppedDialogShow || this.isStoppedDecisionDialogShow) {
      let enumType = 26;
      if (this.TypeData == 2) {
        enumType = 25;
      }
      this.isLoadingDropdownReasonStopProfile = true;
      let a = this.staffService.GetListHR(enumType).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
        if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
          this.listReason = res.ObjectReturn;
        }
        else {
          this.layoutService.onError('Đã xảy ra lỗi khi lấy lý do: ' + res.ErrorString);
        }
        this.isLoadingDropdownReasonStopProfile = false;
      }, (err) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy lý do: ${err}`);
        this.isLoadingDropdownReasonStopProfile = false;
      })

      this.arrSub.push(a);
    }
    else {
      this.isListTypePositionLoading = true;
      let a = this.staffService.GetListHR(TypeHrENUM).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
        if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
          if (TypeHrENUM == 5) {
            if (this.TypeData == 1) {
              this.listTypeHR = [...res.ObjectReturn];
            }
            else if (this.TypeData == 2) {
              this.listTypeHR = [...res.ObjectReturn].filter(item => item.OrderBy !== 3);
            }
          }
          else {
            if (this.TypeData == 1) {
              this.listTypePosition = [...res.ObjectReturn];
            }
            else if (this.TypeData == 2) {
              this.listTypePosition = [...res.ObjectReturn].filter(item => item.OrderBy !== 2);
            }
          }
        }
        else {
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách loại ${TypeHrENUM == 5 ? 'nhân sự' : 'hình chức danh'}: ` + res.ErrorString);
        }
        this.isListTypePositionLoading = false;
      }, (err) => {
        this.isListTypePositionLoading = false;
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách loại ${TypeHrENUM == 5 ? 'nhân sự' : 'hình chức danh'}: ${err}`);
      })

      this.arrSub.push(a);
    }
  }

  /**
   * API lấy danh sách đơn vị
   */
  APIGetListDepartment() {
    const temp = new DTODepartment();
    temp['Code'] = 0, temp['IsTree'] = true;
    this.isListDepartmentLoading = true;

    let a = this.decisionService.GetListDepartment(temp).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.isListDepartmentLoading = false
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listDepartment = res.ObjectReturn
        this.listDepartment.unshift(this.defaultDepartmentItem)
        this.APIGetListPositionDepartment()
        this.APIGetListLocationDepartment()
      }
      else {
        this.layoutService.onError('Đã xảy ra lỗi khi lấy danh sách đơn vị');
      }
    }, (err) => {
      this.isListDepartmentLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách đơn vị: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách chức danh
   */
  APIGetListPositionDepartment() {
    this.isListPositionLoading = true;

    let a = this.decisionService.GetListPositionDepartment(this.curDepartment).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listPosition = res.ObjectReturn
      }
      else {
        this.layoutService.onError('Đã xảy ra lỗi khi lấy danh sách chức danh');
      }
      this.isListPositionLoading = false;
    }, (err) => {
      this.isListPositionLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách chức danh: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách điểm làm việc
   */
  APIGetListLocationDepartment() {
    this.isListLocationLoading = true;

    let a = this.decisionService.GetListLocationDepartment(this.curDepartment).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listLocation = res.ObjectReturn
        this.listLocation.unshift(this.defaultLocationItem)
      }
      else {
        this.layoutService.onError('Đã xảy ra lỗi khi lấy danh sách điểm làm việc');
      }
      this.isListLocationLoading = false;
    }, (err) => {
      this.isListLocationLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách điểm làm việ: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy quyết định
   */
  APIGetHRDecisionMaster() {
    this.isInformationBlockLoading = true;
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển';

    let a = this.decisionService.GetHRDecisionMaster(this.decision).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.isInformationBlockLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.decision = res.ObjectReturn
        this.oldTitleName = this.decision.DecisionName
        this.oldDescription = this.decision.Description
        localStorage.setItem('HrDecisionMaster', JSON.stringify(this.decision));
        const status = this.decision.Status

        this.checkIsEffectiveDate();

        this.loadFilter();

        const con = ((status == 0 || status == 4) && (this.isAllowedToCreate || this.isMaster)) || (status == 1 && (this.isAllowedToVerify || this.isMaster));
        this.isLockAll = !con;

        this.setupBtnStatus()
      }
      else {
        this.layoutService.onError('Đã xảy ra lỗi khi lấy thông tin quyết định: ' + res.ErrorString);
      }
    }, (err) => {
      this.isInformationBlockLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin quyết định ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy danh sách hồ sơ điều chuyển/ tuyển dụng
   */
  APIGetListHRDecisionProfile() {
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển'
    this.isLoading = true
    let a = this.decisionService.GetListHRDecisionProfile(this.gridState).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.isLoading = false
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridData = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total
        if (this.gridData.length <= 0 && this.total != 0) {
          this.page -= 1;
          this.gridState.skip -= 1;
          this.loadFilter();
        }
        this.gridView.next({ data: this.gridData, total: this.total });
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách hồ sơ ${apiText}: ` + res.ErrorString);
      }
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách hồ sơ ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy hồ sơ tuyển dụng/ điều chuyển
   */
  APIGetHRDecisionProfile() {
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển'
    let a = this.decisionService.GetHRDecisionProfile(this.decisionProfile).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.decisionProfile = res.ObjectReturn
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy hồ sơ ${apiText}: ` + res.ErrorString);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy hồ sơ ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API cập nhật thông tin quyết định
   * @param DTODecision Quyết định cần update
   * @param Properties Props cần update
   */
  APIUpdateHRDecisionMaster(DTODecision: DTOHRDecisionMaster, Properties: string[]) {
    const TypeUpdate = DTODecision.Code == 0 ? 'Thêm mới' : 'Cập nhật thông tin';
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển'

    if (DTODecision.Code == 0) {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      DTODecision.EffDate = date.toISOString();
    }

    let a = this.decisionService.UpdateHRDecisionMaster(DTODecision, Properties).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.decision = res.ObjectReturn
        this.oldTitleName = this.decision.DecisionName
        this.oldDescription = this.decision.Description
        this.isAddNew = false;
        localStorage.setItem('HrDecisionMaster', JSON.stringify(this.decision));
        this.setupBtnStatus();
        this.layoutService.onSuccess(`${TypeUpdate} quyết định ${apiText} thành công`);
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${TypeUpdate} quyết định ${apiText}: ` + res.ErrorString);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${TypeUpdate} quyết định ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API cập nhật trạng thái quyết định
   * @param listDTODecision danh sách quyết định cần update
   * @param reqStatus Status cần update
   */
  APIUpdateHRDecisionMasterStatus(listDTODecision: DTOHRDecisionMaster[], reqStatus: number) {
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển';
    this.isLoadingPage = true;

    let a = this.decisionService.UpdateHRDecisionMasterStatus(listDTODecision, reqStatus).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.handleDialogStopDecision(2);
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Cập nhật trạng thái quyết định ${apiText} thành công`);
        this.APIGetHRDecisionMaster();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${apiText}: ` + res.ErrorString);
      }
      this.isLoadingPage = false;
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${apiText}: ${err}`);
      this.isLoadingPage = false;
    })

    this.arrSub.push(a);
  }

  /**
   * API cập nhật hồ sơ
   * @param DTODecisionProfile
   */
  APIUpdateHRDecisionProfile(DTODecisionProfile: DTOHRDecisionProfile) {
    const TypeUpdate = DTODecisionProfile.Code == 0 ? 'Thêm mới' : 'Cập nhật thông tin';
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển'

    // Đối với quyết định tuyển dụng hay điều chuyển thì phải set Petion(Chi đối với đơn xin nghỉ) = null
    if ([this.HiringENUM, this.TransferingENUM].includes(this.TypeData)) {
      DTODecisionProfile.Petition = null;
    }

    // Do bước trước khi call API set TypeStaff null để xử lý logic khác nên phải set lại ở bước này
    if (!Ps_UtilObjectService.hasValue(DTODecisionProfile.TypeStaff) && Ps_UtilObjectService.hasValue(this.curTypeHr.OrderBy)) {
      this.decisionProfile.TypeStaff = this.curTypeHr.OrderBy;
    }

    let a = this.decisionService.UpdateHRDecisionProfile(DTODecisionProfile).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${TypeUpdate} ${apiText} thành công`);
        this.onCloseDrawer();
        this.APIGetHRDecisionMaster();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${TypeUpdate}  ${apiText}: ` + res.ErrorString);
        if (DTODecisionProfile.Code != 0) {
          this.loadFilter();
        }
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${TypeUpdate} ${apiText}: ${err}`);
      if (DTODecisionProfile.Code != 0) {
        this.loadFilter();
      }
    })

    this.arrSub.push(a);
  }

  /**
   * API cập nhật trạng thái hồ sơ
   * @param DTODecisionProfile
   */
  APIUpdateHRDecisionProfileStatus(ListDTO: DTOHRDecisionProfile[], Status: number) {
    let a = this.decisionService.UpdateHRDecisionProfileStatus(ListDTO, Status).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Cập nhật trạng thái hồ sơ thành công`);
        this.onCloseDrawer();
        this.isStoppedDialogShow = false;
        this.APIGetHRDecisionMaster();
        // this.loadFilter();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ: ${res.ErrorString}`);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API Xoá quyết định
   * @param listDTODecision
   */
  APIDeleteHRDecisionMaster(listDTODecision: DTOHRDecisionMaster[]) {
    this.isDeleteDecisionDialogShow = false;
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển';

    let a = this.decisionService.DeleteHRDecisionMaster(listDTODecision).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Xoá quyết định ${apiText} thành công`);
        this.onAddNew()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xoá quyết định ${apiText}: ` + res.ErrorString);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi xoá quyết định ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API xoá hồ sơ
   * @param listDTODecisionProfile
   */
  APIDeleteHRDecisionProfile(listDTODecisionProfile: DTOHRDecisionProfile[]) {
    this.isDeleteProfileDialogShow = false;
    const apiText = this.TypeData == this.HiringENUM ? 'tuyển dụng' : 'điều chuyển';

    let a = this.decisionService.DeleteHRDecisionProfile(listDTODecisionProfile).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Xoá thông tin ${apiText} thành công`);
        if (this.isOpenDrawer) {
          this.onCloseDrawer()
        }
        this.APIGetListHRDecisionProfile();
        this.APIGetHRDecisionMaster();
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xoá thông tin ${apiText}: ` + res.ErrorString);
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi xoá thông tin ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy thông tin hồ sơ bằng CCCD/CMND
   * @param DTOPersonalInfo
   */
  APIGetHRPersonalProfileByCICN(DTOPersonalInfo: DTOPersonalInfo) {
    let a = this.decisionService.GetHRPersonalProfileByCICN(DTOPersonalInfo).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        const personalProfile = res.ObjectReturn;

        // Gán giá trị cho decisionProfile
        Object.assign(this.decisionProfile, {
          FullName: personalProfile.FullName,
          ImageThumb: personalProfile.ImageThumb,
          GenderName: personalProfile.GenderName,
          BirthDate: personalProfile.BirthDate,
          Cellphone: personalProfile.Cellphone,
          Email: personalProfile.Email,
          PersonalProfile: personalProfile.Code,
          TypeStaff: 1,
          TypeStaffName: 'Nhân viên không chính thức',
        });

        this.isShowAll = true;
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin cá nhân: ` + res.ErrorString);
        this.isShowAll = false;
        this.decisionProfile = new DTOHRDecisionProfile()
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin cá nhân: ${err}`);
      this.decisionProfile = new DTOHRDecisionProfile()
      this.isShowAll = false;
    })

    this.arrSub.push(a);
  }

  /**
   * API lấy thông tin hồ sơ bằng CCCD/CMND
   * @param DTOPersonalInfo
   */
  APIGetHREmployeeByID(DTOEmployee: DTOEmployee) {
    let a = this.decisionService.GetHREmployeeByID(DTOEmployee).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        const employee = res.ObjectReturn;
        Object.assign(this.decisionProfile, {
          FullName: employee.FullName,
          ImageThumb: employee.ImageThumb,
          GenderName: employee.GenderName,
          BirthDate: employee.BirthDate,
          Cellphone: employee?.CellPhone,
          Email: employee.Email,
          PersonalProfile: employee.ProfileID,
          Staff: employee.Code,
          CurrentDepartmentName: employee.DepartmentName,
          CurrentPositionName: employee.CurrentPositionName,
          CurrentLocationName: employee.LocationName,
          // TypeStaff: 1,
          // TypeStaffName: 'Nhân viên không chính thức',
        });

        if (this.TypeData == this.TransferingENUM) {
          this.decisionProfile.StaffJoinDate = employee.JoinDate;
        }

        this.oldDepartment.Code = employee?.Department;
        this.oldDepartment.Department = employee?.DepartmentName;
        this.oldPosition.Code = employee?.CurrentPosition;
        this.oldLocation.Code = employee?.Location;

        this.isShowAll = true;
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin cá nhân: ` + res.ErrorString);
        this.isShowAll = false;
        this.decisionProfile = new DTOHRDecisionProfile()
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy thông tin cá nhân: ${err}`);
      this.decisionProfile = new DTOHRDecisionProfile()
      this.isShowAll = false;
    })

    this.arrSub.push(a);
  }


  /**
   * Dowload template import danh sách hồ sơ
   */
  APIDownloadExcel() {
    var ctx = "Download Excel Template"
    var getfilename = "DecisionProfileTemplate.xlsx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a = this.apiGetTemplateService.GetTemplate(getfilename).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res != null) {
        Ps_UtilObjectService.getFile(res)
        this.layoutService.onSuccess(`${ctx} thành công`);
      }
      else {
        this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + res.ErrorString)
      }
    }, f => {
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f.error.ExceptionMessage)
    });

    this.arrSub.push(a);
  }

  /**
   * API import profile bằng excel
   * @param file DecisionProfileTemplate
   */
  APIImportExcelPosition(file) {
    this.isLoading = true
    var ctx = "Import Excel"

    let a = this.decisionService.ImportHRDecisionProfile(file, this.decision.Code).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res) && !Ps_UtilObjectService.hasValueString(res.ErrorString)) {
        this.layoutService.onSuccess(`${ctx} thành công`);
        this.layoutService.setImportDialogMode(1);
        this.layoutService.setImportDialog(false);
        this.layoutService.getImportDialogComponent().inputBtnDisplay();
        this.loadFilter()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`);
      }
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${err}`)
    })

    this.arrSub.push(a);
  }

  /**
   * Xuất các profile đã hoàn tất tuyển dụng, điều chuyển.
   */
  APIGetHRDecisionProfileReportExcel() {
    this.isLoading = true
    var ctx = "Xuất Excel"
    var getfileName = "DecisionBoardedReport.xlsx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a = this.decisionService.GetHRDecisionProfileReportExcel(this.decision.Code).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
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

    this.arrSub.push(a);
  }

  /**
   * Xuất các profile đã hoàn tất tuyển dụng, điều chuyển.
   */
  APIGetHRDecisionProfileReportWord(ListHRDecisionProfile: DTOHRDecisionProfile[]) {
    this.isLoading = true
    var ctx = "Xuất Word"
    var getfileName = "DecisionProfileReportWord.docx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a = this.decisionService.GetHRDecisionProfileReportWord(ListHRDecisionProfile).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.isLoading = false;
      if (Ps_UtilObjectService.hasValue(res)) {
        Ps_UtilObjectService.getFile(res, getfileName, 2)
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else {
        this.layoutService.onError(`${ctx} thất bại`)
      }
    }, f => {
      this.isLoading = false;
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f)
    });

    this.arrSub.push(a);
  }

  //#endregion

  //#region VISIBILITY
  /**
   * Hàm check có hiển thị important không (*)
   * @param field trường tự định nghĩa
   */
  isVisible(field: string) {
    const status = this.decision.Status; // Trạng thái của quyết định
    const type = this.TypeData; // 1 là điều chuyển | 2 là tuyển dụng

    const condition1 = [0, 4].includes(status) && this.M_C;
    const condition2 = status == 1 && this.M_A;

    // Nếu chỉ có quyền xem
    if (!this.M_A && !this.M_C) {
      return false
    }

    switch (field) {
      case 'im-EffDate': // Important Thời gian hiệu lực của block THÔNG TIN QUYẾT ĐỊNH
      case 'im-titleDecision': // Important title của quyết định
      case 'im-listProfile': // Important title của Danh sách hồ sơ
      case 'dd-department': // Dropdown Đơn vị công tác | Đơn vị điều chuyển
      case 'dd-position': // Dropdown Chức danh tuyển dụng | Chức danh điều chuyển
      case 'dd-location': // Dropdown Điểm làm việc | Điểm làm việc điều chuyển
      case 'im-joinDate': // Important Ngày vào làm
      case 'im-probationPeriodDays': // Important Sô ngày thử việc
      case 'note-footer': // Note bên dưới footer
      case 'dropdown-type-staff': // Dropdown Loại nhân sự tuyển dụng | điều chuyển
      case 'im-type-staff': // Important của Loại nhân sự tuyển dụng | điều chuyển
        return (condition1 || condition2);

      case 'date-picker-eff-date': // Datepicker Thời gian hiệu lực
        return (condition1 || condition2) && !this.isFilterDisable && !this.isAddNew;

      // Số CMND/CCCD | Mã nhân sự
      case 'IdNo-StaffID': {
        // Nếu trạng thái "Duyệt và Ngưng"
        if ([2, 3].includes(status) || this.isEdit || this.isSeeDetail) {
          return false;
        }
        return true;
      }
    }
  }
  //#endregion
  ngOnDestroy(): void {
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
}
