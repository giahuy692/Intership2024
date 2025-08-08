import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-treelist';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { MenuDataItem, ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { DTOResponse, Ps_UtilObjectService } from 'src/app/p-lib';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOHRDecisionMaster } from '../../dto/DTOHRDecisionMaster.dto';
import { HriDecisionApiService } from '../../services/hri-decision-api.service';
import { DTOListHR } from '../../dto/DTOPersonalInfo.dto';
import { StaffApiService } from '../../services/staff-api.service';
import { TextAreaComponent } from '@progress/kendo-angular-inputs';


@Component({
  selector: 'app-hr-onboard-decision-list',
  templateUrl: './hr-onboard-decision-list.component.html',
  styleUrls: ['./hr-onboard-decision-list.component.scss']
})
export class HrOnboardDecisionListComponent implements OnInit, OnDestroy {

  //#region Input Output
  /**
   * Loại quyết định
   * 1: Quyết định tuyển dụng
   * 2: Quyết định điều chuyển
   */
  @Input({ required: true }) TypeDecision: 1 | 2 = 1;
  //#endregion

  //#region Varible
  childMenuItem: string = 'hriDecision'
  childMenuItem2: string = ''
  childMenuItem3: string = ''

  //phân quyền
  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true
  actionPerm: DTOActionPermission[] = []
  isMaster: boolean = false;
  isCreator: boolean = false;
  isApprover: boolean = false;
  isAllowedToViewOnly: boolean = false
  uploadEventHandlerCallback: Function
  isStoppedDecisionDialogShow: boolean = false; // Hiển thị dialog xác nhận ngưng quyết định hay không
  isLoadingDropdownReasonStopProfile: boolean = false; // Loading của dropdown chọn lý do ngưng tuyển dụng/diều chuyển 1 profile

  //varible disable grid
  isFilterDisable: boolean = false;

  //checkbox
  isDraft: boolean = true;
  isSent: boolean = true;
  isApproved: boolean = false;
  isSuspended: boolean = false;
  isLoading: boolean = false;

  //Grid
  curDate: Date = new Date()

  //decision selected
  selectedDecision: DTOHRDecisionMaster = new DTOHRDecisionMaster();

  //grid view
  gridView = new Subject<any>();
  pageSizes: number[] = [25, 50, 75, 100];
  pageSize: number = 25
  page: number = 0;

  // State của grid
  gridState: State = {
    skip: this.page,
    take: this.pageSize,
    sort: [{ field: 'Code', dir: 'desc' }],
    filter: { filters: [], logic: 'and' },
  };

  // Data nhận về từ grd
  gridData: DTOHRDecisionMaster[] = []
  total: number = 0

  //Filter bằng composite của input search
  SearchTermComposite: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  // Filter của nhóm status
  StatusFilterComposite: CompositeFilterDescriptor = { logic: 'or', filters: [] };

  //Filter của trạng thái Đang soạn thảo
  draftDescriptor: FilterDescriptor = {
    field: 'Status',
    value: 0,
    operator: 'eq',
    ignoreCase: true
  }
  //Filter của trạng thái Gửi duyệt
  sentDescriptor: FilterDescriptor = {
    field: 'Status',
    value: 1,
    operator: 'eq',
    ignoreCase: true
  }
  //Filter của trạng thái Duyệt áp dụng
  approvedDescriptor: FilterDescriptor = { field: '', operator: '', value: '' }
  //Filter của trạng thái Ngưng áp dụng
  suspendedDescriptor: FilterDescriptor = { field: '', operator: '', value: '' }
  //Filter của trạng thái Trả về
  returnedDescriptor: FilterDescriptor = {
    field: 'Status',
    value: 4,
    operator: 'eq',
    ignoreCase: true
  }

  //Filter của input ngày hiệu lực
  dateFilterDescriptor: FilterDescriptor = { field: '', operator: '', value: '' }


  //Setting Selectable cho grid
  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  }

  //Filter của loại quyết định
  // typeDecisionDescriptor: FilterDescriptor = { field: 'TypeData', operator: 'eq', value: '' }

  unsubscribe = new Subject<void>;

  onPageChangeCallback: Function
  onActionDropDownClickCallback: Function
  onSelectCallback: Function
  onSelectedPopupBtnCallback: Function
  getActionDropdownCallback: Function
  getSelectionPopupCallback: Function

  isDialogShow: boolean = false
  ListDeleteDecisionReq: DTOHRDecisionMaster[] = [];

  // Data dropdown của filter ngày hiệu lực
  ListDateFilterOperator = [{ Code: 1, TypeFilter: 'từ', ValueFilter: 'gte' }, { Code: 2, TypeFilter: 'trước', ValueFilter: 'lt' }];
  // Operator hiện tại được chọn của dropdown filter ngày hiệu lực
  curDateFilterOperator = { Code: 1, TypeFilter: 'từ', ValueFilter: 'gte' }

  curDateFilterValue: any = null;

  keySearch: string = ""

  /**
   * ENUM quyết định tuyển dụng
   */
  HiringENUM: number = 1;
  /**
   * ENUM quyết định điều chuyển
   */
  TransferingENUM: number = 2;
  /**
   * Danh sách lý do
   */
  listReason: DTOListHR[] = [];
  @ViewChild("remark") valueRemark: TextAreaComponent;

  /**
   * Danh sách các API để unscribe khi component bị destroy
   */
  arrSub: Subscription[] = [];

  //#endregion

  constructor(
    private menuService: PS_HelperMenuService,
    private decisionService: HriDecisionApiService,
    private layoutService: LayoutService,
    private staffService: StaffApiService,
  ) { }

  //#region Init
  ngOnInit(): void {
    if (this.TypeDecision == 1) {
      this.childMenuItem2 = 'hri023-decision-hiring-list'
      this.childMenuItem3 = 'hri023-decision-hiring-detail'
    } else if (this.TypeDecision == 2) {
      this.childMenuItem2 = 'hri024-transfer-decision-list'
      this.childMenuItem3 = 'hri024-transfer-decision-detail'
    }

    //Phân quyền ứng dụng
    let a = this.menuService.changePermission().pipe(takeUntil(this.unsubscribe)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');
        //action permission
        this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isApprover = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;
        this.isAllowedToViewOnly = this.actionPerm.findIndex(s => s.ActionType == 6) > -1 && !Ps_UtilObjectService.hasListValue(this.actionPerm.filter(s => s.ActionType != 6))
      }
    })

    this.onSelectCallback = this.handleGridItemSelect.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this)
    this.onActionDropDownClickCallback = this.handleMoreActionItemClick.bind(this)
    this.onSelectedPopupBtnCallback = this.handleSelectionActionItemClick.bind(this)
    this.onPageChangeCallback = this.handlePageChange.bind(this)
    this.curDate.setHours(0, 0, 0, 0)
    this.gridView.next({ data: this.gridData, total: this.total });
    
    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false 
        this.handleLoadFilter();  
      }
    })

    this.arrSub.push(a, b);
  }

  //#endregion


  //#region API
  /**
  * API lấy danh sách thông tin quyết định
  */
  APIGetListHRDecisionMaster() {
    let apiText = " "
    if (this.TypeDecision == 1) {
      apiText = "Quyết định tuyển dụng "
    }
    if (this.TypeDecision == 2) {
      apiText = "Quyết định điều chuyển "
    }

    let a = this.decisionService.GetListHRDecisionMaster(this.gridState, this.keySearch, this.TypeDecision).pipe(takeUntil(this.unsubscribe)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridData = res.ObjectReturn.Data;
        this.total = res.ObjectReturn.Total
        this.gridView.next({ data: this.gridData, total: this.total });
        if (this.gridData.length <= 0 && this.total != 0) {
          this.page = this.page - 1;
          this.gridState.skip = this.gridState.skip - 1
          this.APIGetListHRDecisionMaster()
        }
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`)
      }
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
   * API thay đổi trạng thái quyết định
   * @param listDTO Danh sách quyết định muốn thay đổi
   * @param reqStatus Trạng thái muốn chuyển
   */
  APIUpdateHRDecisionMasterStatus(listDTO: DTOHRDecisionMaster[], reqStatus: number) {
    const apiText = "Cập nhật trạng thái quyết định"
    this.isLoading = true;

    let a = this.decisionService.UpdateHRDecisionMasterStatus(listDTO, reqStatus).pipe(takeUntil(this.unsubscribe)).subscribe((res: DTOResponse) => {
      this.handleDialogStopDecision(2);
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(apiText + ' thành công')
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
        this.handleLoadFilter();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`);
      this.isLoading = false;
    })

    this.arrSub.push(a);
  }

  /**
   * API xoá quyết định
   * @param listDTO danh sách quyết định cần xoá
   * @returns 
   */
  APIDeleteHRDecisionMaster(listDTO: DTOHRDecisionMaster[]) {
    const apiText = "Xoá quyết định";

    let a = this.decisionService.DeleteHRDecisionMaster(listDTO).pipe(takeUntil(this.unsubscribe)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(apiText + ' thành công')
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
        this.handleLoadFilter();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`)
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`);
    })

    this.arrSub.push(a);
  }

  /**
  * API lấy danh sách lý do
  * @param typeData enum được định nghĩa
  */
  APIGetListHR(typeData: number, loading: string) {
    this[loading] = true;

    let a = this.staffService.GetListHR(typeData).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listReason = res.ObjectReturn;
      }
      else {
        this.layoutService.onError('Đã xảy ra lỗi khi lấy lý do: ' + res.ErrorString);
      }
      this[loading] = false;
    }, (err) => {
      this[loading] = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy lý do: ${err}`);
    })

    this.arrSub.push(a);
  }
  //#endregion


  //#region  Handle Page
  /**
   * Hàm nhận value từ component filter
   * @param value Giá trị từ component truyền ra
   * @param varaiable Tên biến cần gán giá trị vào
   * Trả về trang 1 khi filter
   */
  handleFilterChange(value: any, varaiable?: string, loadProcess: boolean = true) {
    this.page = 0;
    this.gridState.skip = 0;
    if (Ps_UtilObjectService.hasValue(varaiable)) {
      this[varaiable] = JSON.parse(JSON.stringify(value));
      //Nếu là filter search thì kiểm tra xem value nhập có là rỗng hay không
      if (Ps_UtilObjectService.containsString(varaiable, 'SearchTermComposite')) {
        //Nếu không có giá trị thì set rỗng
        if (!Ps_UtilObjectService.hasValueString(value.filters[0]?.value)) {
          this.SearchTermComposite.filters = []
          this.keySearch = ""
        } else {
          this.keySearch = value.filters[0]?.value
        }
      }

      //Nếu là filter ngày thì lấy value chính xác với múi giờ
      if (Ps_UtilObjectService.containsString(varaiable, 'curDateFilterValue')) {
        this.curDateFilterValue = new Date(value).toDateString() + " " + new Date(value).toLocaleTimeString([], { hour12: false });
      }
    }

    // Kiểm tra nếu là dropdown chọn operator cho filter ngày
    const isDateFilterOperator = Ps_UtilObjectService.containsString(varaiable, 'curDateFilterOperator');

    // Nếu là filter ngày và giá trị không phải null hoặc nếu không phải filter ngày mà loadProcess là true
    if ((isDateFilterOperator && Ps_UtilObjectService.hasValue(this.curDateFilterValue)) || (!isDateFilterOperator && loadProcess)) {
      this.handleLoadFilter();
    }

  }

  /**
   * Hàm tổng hợp filter và filter data
   */
  handleLoadFilter() {
    if (!this.isFilterDisable) {
      this.isLoading = true;
      this.gridState.filter.filters = [];
      this.StatusFilterComposite.filters = [];

      // this.handlePushFilter(this.gridState.filter, this.typeDecisionDescriptor, true);

      this.handlePushFilter(this.StatusFilterComposite, this.draftDescriptor, this.isDraft);
      this.handlePushFilter(this.StatusFilterComposite, this.sentDescriptor, this.isSent);
      this.handlePushFilter(this.StatusFilterComposite, this.approvedDescriptor, this.isApproved);
      this.handlePushFilter(this.StatusFilterComposite, this.suspendedDescriptor, this.isSuspended);

      //Nếu trạng thái đang soạn thảo được check thì push thêm trạng thái trả về vào Composite
      if (this.isDraft) {
        this.handlePushFilter(this.StatusFilterComposite, this.returnedDescriptor, this.isDraft);
      }

      this.dateFilterDescriptor = this.handleGenerateFilterDescriptor('EffDate', this.curDateFilterOperator.ValueFilter, this.curDateFilterValue)

      // this.handlePushFilter(this.gridState.filter, null, null, this.SearchTermComposite);
      this.handlePushFilter(this.gridState.filter, null, null, this.StatusFilterComposite);
      this.handlePushFilter(this.gridState.filter, this.dateFilterDescriptor, true)
      this.APIGetListHRDecisionMaster();
    }
  }

  /**
   * Hàm kiểm tra và push filter vào composite nếu filter có giá trị
   * @param composite Composite cần được push filter vào
   * @param filterDescriptor FilterDescriptor cần kiểm tra để được push
   * @param checkStatus Varaiable của statusFilter để kiểm tra có đang được check hay không
   * @param compositeFilter Param này dùng khi cần push 1 composite vào filter của gridState
   * Nếu checkStatus là false thì sẽ không push vào composite
   * Nếu sử dụng hàm để push composite vào filter của grid thì truyền param filterDescriptor là null và checkStatus là null;
   */
  handlePushFilter(composite: CompositeFilterDescriptor, filterDescriptor?: FilterDescriptor, checkStatus?: boolean, compositeFilter?: CompositeFilterDescriptor) {
    if (compositeFilter == null) {
      if (Ps_UtilObjectService.hasValueString(filterDescriptor.value) && checkStatus) {
        composite.filters.push(filterDescriptor)
      }
    }
    else {
      if (Ps_UtilObjectService.hasListValue(compositeFilter.filters)) {
        composite.filters.push(compositeFilter)
      }
    }

  }

  /**
  * Hàm tạo FilterDescriptor
  * @param field trường cần filter
  * @param operator toán tử
  * @param value giá trị
  * @returns FilterDescriptor
  */
  handleGenerateFilterDescriptor(field: string, operator: string, value: string | number) {
    return { field: field, operator: operator, value: value }
  }

  hanldeResetFilter() {
    this.page = 0;
    this.gridState.skip = 0;
    this.keySearch = ""

    this.isDraft = true;
    this.isSent = true;
    this.isApproved = false;
    this.isSuspended = false;

    this.SearchTermComposite.filters = [];
    this.curDateFilterValue = null;
    this.curDateFilterOperator = { ...this.ListDateFilterOperator[0] }
    // this.curTypeApplyFilterValue = { ...this.ListTypeApplyFilter[0] }
    this.handleLoadFilter();
  }

  /**
   * Hàm set giá trị để nhận biết chọn nhiều item cho việc disable
   * @param isSelected 
   */
  handleGridItemSelect(isSelected: boolean) {
    this.isFilterDisable = isSelected;
  }

  /**
 * Hàm lấy các action cho popup moreAction của grid
 * @param moreActionDropdown 
 * @param dataItem 
 * @returns MenuDataItem[]
 */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any) {
    const decisionDate = dataItem.EffDate
    moreActionDropdown = []
    var status = dataItem.Status
    this.selectedDecision = dataItem

    // Action chỉnh sửa và xem chi tiết
    if (((status == 0 || status == 4) && (this.isCreator || this.isMaster)) || (status == 1 && (this.isApprover || this.isMaster)))
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Type: 'edit', Actived: true })
    else
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Type: 'detail', Actived: true })

    // Nhóm action đổi tình trạng
    if ((status == 0 || status == 4) && (this.isCreator || this.isMaster)) {
      moreActionDropdown.push({ Name: "Gửi duyệt", Code: "redo", Type: 'Status', Link: "1", Actived: true })
    }
    else if (status == 1 && (this.isApprover || this.isMaster)) {
      moreActionDropdown.push({ Name: "Trả về", Code: "undo", Type: 'Status', Link: "4", Actived: true })
      moreActionDropdown.push({ Name: "Phê duyệt", Code: "check-outline", Type: 'Status', Link: "2", Actived: true })
    }
    else if (status == 2 && (this.isApprover || this.isMaster)) {
      moreActionDropdown.push({ Name: "Huỷ quyết định", Code: "minus-outline", Type: 'Status', Link: "3", Actived: true })
    }

    // Action xoá
    if (status == 0 && (this.isCreator || this.isMaster))
      moreActionDropdown.push({ Name: "Xóa quyết định", Code: "trash", Type: 'delete', Actived: true })

    return moreActionDropdown
  }

  /**
* Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
* @param arrItem 
* @returns MenuDataItem[]
*/
  getSelectionPopupAction(arrItem: any[]) {
    var moreActionDropdown = new Array<MenuDataItem>()
    // Kiểm tra các action có thể tương tác của item
    var canSent = arrItem.findIndex(s => s.Status == 0 || s.Status == 4) // Đang soạn thảo và Trả về có thể gửi duyệt
    var canAppro_Return = arrItem.findIndex(s => s.Status == 1) // Gửi duyệt có thể Duyệt và Trả về
    var canReturnOnEffDate = arrItem.findIndex(s => s.Status == 3 && Ps_UtilObjectService.getDaysLeft(this.curDate, s.EffDate) > 0) // Ngưng áp dụng có thể trả về với điều kiện chưa tới ngày hiệu lực
    var canStop = arrItem.findIndex(s => s.Status == 2) // Duyệt áp dụng có thể ngưng
    var canDel = arrItem.findIndex(s => s.Status == 0) // Đang soạn thảo có thể xóa

    if (canSent != -1 && (this.isCreator || this.isMaster)) {
      moreActionDropdown.push({ Name: "Gửi duyệt", Code: "redo", Type: 'Status', Link: "1", Actived: true }
      )
    }

    if ((canReturnOnEffDate != -1 || canAppro_Return != -1) && (this.isApprover || this.isMaster)) {
      moreActionDropdown.push(
        { Name: "Phê duyệt", Code: "check-outline", Type: 'Status', Link: "2", Actived: true },
        { Name: "Trả về", Code: "undo", Type: 'Status', Link: "4", Actived: true }
      )
    }

    if (canStop != -1 && (this.isApprover || this.isMaster)) {
      moreActionDropdown.push(
        { Name: "Huỷ quyết định", Code: "minus-outline", Type: 'Status', Link: "3", Actived: true }
      )
    }

    if (canDel != -1 && (this.isCreator || this.isMaster)) {
      moreActionDropdown.push(
        { Name: "Xóa quyết định", Code: "trash", Type: 'Delete', Link: "delete", Actived: true }
      )
    }

    return moreActionDropdown
  }

  /**
   * Hàm xử lí action được chọn trên popup
   * @param menu menu action đã nhấn
   * @param item quyết định được chọn
   */
  handleMoreActionItemClick(menu: MenuDataItem, item: any) {
    if (item.Code > 0) {
      if (menu.Type == 'Status') {
        // Nếu trạng thái được nhấn là gửi duyệt hoặc duyệt áp dụng
        if (parseInt(menu.Link) == 1 || parseInt(menu.Link) == 2) {
          //Nếu các trường bắt buộc đủ thông tin thì gọi API
          if (this.handleRequiredFieldCheck(this.selectedDecision)) {
            this.isLoading = true;
            this.APIUpdateHRDecisionMasterStatus([this.selectedDecision], parseInt(menu.Link))
          }
        }
        // Nếu trạng thái được nhấn là Ngưng áp dụng
        else if (parseInt(menu.Link) == 3) {
          this.listStoppedDecision = [item];
          this.handleDialogStopDecision(1)
        }
        else {
          this.isLoading = true;
          this.APIUpdateHRDecisionMasterStatus([this.selectedDecision], parseInt(menu.Link))
        }
      }
      else if (menu.Link == 'edit' || menu.Code == 'pencil' || menu.Code == "eye" || menu.Link == 'detail') {
        localStorage.setItem("HrDecisionMaster", JSON.stringify(this.selectedDecision))
        this.openDetail()
      }
      else if (menu.Link == 'delete' || menu.Code == 'trash') {
        this.ListDeleteDecisionReq.push(this.selectedDecision);
        this.isDialogShow = true
      }
    }

  }

  listStoppedDecision: DTOHRDecisionMaster[] = [];

  /**
 * Hàm xử lí action được chọn trên dialog
 * @param btnType Loại action đã nhấn
 * @param listSelectedItem List các item đã được chọn
 * @param value Value của action đã nhấn
 */
  handleSelectionActionItemClick(btnType: string, listSelectedItem: any[], value: any) {
    let reqList = []
    let reqStatus = 0;

    if (btnType == 'Status') {
      if (value == '1') {
        reqList = []

        listSelectedItem.forEach(item => {
          if ((item.Status == 0 || item.Status == 4) && this.handleRequiredFieldCheck(item)) {
            reqList.push(item)
          }
        });

        reqStatus = 1; // Trạng thái Gửi duyệt
      }
      else if (value == '2') {
        reqList = []

        listSelectedItem.forEach(item => {
          if (item.Status == 1 && this.handleRequiredFieldCheck(item)) {
            reqList.push(item)
          }
          else if (item.Status == 3 && (Ps_UtilObjectService.getDaysLeft(this.curDate, item.EffDate) > 0)) {
            reqList.push(item)
          }
        });

        reqStatus = 2; // Trạng thái Duyệt áp dụng
      }
      else if (value == '3') {
        reqList = []

        listSelectedItem.forEach(item => {
          if (item.Status == 2) {
            reqList.push(item)
          }
        });
        this.listStoppedDecision = reqList;
        this.handleDialogStopDecision(1);
        return;
      }
      else if (value == '4') {
        reqList = []

        listSelectedItem.forEach(item => {
          if (item.Status == 1) {
            reqList.push(item)
          }
          else if (item.Status == 3 && (Ps_UtilObjectService.getDaysLeft(this.curDate, item.EffDate) > 0)) {
            reqList.push(item)
          }
        });

        reqStatus = 4; // Trạng thái Trả về
      }

      if (Ps_UtilObjectService.hasListValue(reqList)) {
        this.APIUpdateHRDecisionMasterStatus(reqList, reqStatus);
      }
      else {
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
      }
    }
    else if (btnType == 'Delete') {
      this.ListDeleteDecisionReq = [];
      listSelectedItem.forEach(item => {
        if (item.Status == 0) {
          this.ListDeleteDecisionReq.push(item)
        }
      });
      if (Ps_UtilObjectService.hasListValue(this.ListDeleteDecisionReq)) {
        this.isDialogShow = true;
      }

    }
  }

  /**
  * Hàm dùng để check các trường bắt buộc của dto
  * @param dto dto cần check
  * @param isSkipMsg bỏ qua thông báo mặc định là false
  * @returns true | false
  */
  handleRequiredFieldCheck(dto: DTOHRDecisionMaster, isSkipMsg: boolean = false) {
    const typeDecision = this.TypeDecision == 1 ? 'tuyển dụng' : 'điều chuyển'
    let msgStr = `Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${typeDecision} ${dto.DecisionID ?? 'không xác định'}: thiếu `;
    if (!Ps_UtilObjectService.hasValueString(dto.DecisionID)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + 'Mã quyết định tuyển dụng')
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(dto.DecisionName)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + 'Tiêu đề')
      }
      return false;
    }
    else if (!Ps_UtilObjectService.hasValueString(dto.EffDate)) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + 'Ngày hiệu lực')
      }
      return false;
    }

    const effDate = new Date(dto.EffDate);
    const currentDate = new Date();

    // Chỉ so sánh ngày, bỏ qua giờ phút giây
    if (
      Ps_UtilObjectService.hasValueString(dto.EffDate) &&
      effDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
    ) {
      if (!isSkipMsg) {
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái quyết định ${typeDecision} ${dto.DecisionID}: Ngày hiệu lực phải là hiện tại hoặc tương lai.`);
      }
      return false;
    }

    else if (dto.NumOfProfile <= 0) {
      if (!isSkipMsg) {
        this.layoutService.onError(msgStr + 'Số ứng viên')
      }
      return false;
    }

    // else if (!Ps_UtilObjectService.hasListValue(dto.ListPosition)) {
    //   if (!isSkipMsg) {
    //     this.layoutService.onError(msgStr + 'Thông tin tuyển dụng')
    //   }
    //   return false;
    // }

    return true;
  }

  /**
  * Hàm chuyển trang
  * @param isNew Nếu là thêm mới thì param này là true
  */
  openDetail(isNew: boolean = false) {
    let a = this.menuService.changeModuleData().pipe(takeUntil(this.unsubscribe)).subscribe((item: ModuleDataItem) => {
      var parent = item.ListMenu.find(f => f.Code == 'hriDecision')
      if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
        var detail = parent.LstChild.find(f => f.Code.includes(this.childMenuItem2) || f.Link.includes(this.childMenuItem2))
        if (Ps_UtilObjectService.hasValue(detail) && Ps_UtilObjectService.hasListValue(detail.LstChild)) {
          var detail2 = detail.LstChild.find(f => f.Code.includes(this.childMenuItem3) || f.Link.includes(this.childMenuItem3))
          this.menuService.activeMenu(detail2)
          if (isNew) {
            var newDecision = new DTOHRDecisionMaster();
            newDecision.TypeData = this.TypeDecision
            localStorage.setItem("HrDecisionMaster", JSON.stringify(newDecision))
          }
        }
      }
    })
    this.arrSub.push(a)

  }

  /**
   * HÀm thực hiện khi thay đổi trang
   * @param event 
   */
  handlePageChange(event: PageChangeEvent) {
    this.page = event.skip;
    this.pageSize = event.take;
    this.gridState.skip = event.skip
    this.gridState.take = event.take
    this.handleLoadFilter();
  }

  /**
   * Hàm thực hiện khi confirm delete
   */
  handleDeleteRequest(): void {
    // Đối với xóa 1 item
    if (this.ListDeleteDecisionReq.length === 1) {
      const item = this.ListDeleteDecisionReq[0];
      const hasDependentData = this.TypeDecision === 1
        ? item.NumOfProfile > 0
        : item.NumOfStaff > 0;

      if (hasDependentData) {
        const dependencyMessage = this.TypeDecision === 1
          ? `Không thể xóa quyết định ${item.DecisionName} vì còn danh sách tuyển dụng`
          : `Không thể xóa quyết định ${item.DecisionName} vì còn danh sách điều chuyển`;

        this.layoutService.onError(dependencyMessage);
        return;
      }
    }
    // Đối với xóa nhiều items
    else {
      this.ListDeleteDecisionReq = this.ListDeleteDecisionReq.filter(item => {
        const hasDependentData = this.TypeDecision === 1
          ? item.NumOfProfile > 0
          : item.NumOfStaff > 0;

        if (hasDependentData) {
          return false; // Loại bỏ các quyết định có dữ liệu phụ thuộc
        }
        return true; // Giữ lại các quyết định không có dữ liệu phụ thuộc
      });
    }

    // Nếu danh sách hợp lệ, gọi API xóa
    if (Ps_UtilObjectService.hasListValue(this.ListDeleteDecisionReq)) {
      this.APIDeleteHRDecisionMaster(this.ListDeleteDecisionReq);
    }

    // Đặt lại danh sách và đóng dialog
    this.ListDeleteDecisionReq = [];
    this.isDialogShow = false;
  }


  /**
   * Hàm thực hiện close dialog
   */
  handleCloseDialog(): void {
    this.isDialogShow = false;
    this.ListDeleteDecisionReq = [];
  }

  /**
  * Hàm trả về tên các quyết địng chưa hiển thị trên dialog xoá
  * @returns string
  */
  handleGetRemainingPolicyNames(): string {
    return this.ListDeleteDecisionReq.slice(2).map(item => item.DecisionName).join(',\n');
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
   * Lý do huỷ quyết định tuyển dụng/điều chuyển
   */
  valueReason: DTOListHR;
  /**
   * Hiển thị important của mô tả lý do huỷ quyết định tuyển dụng/điều chuyển hay không
   */
  isObligatoryReason: boolean = false;

  /**
   * Hàm xử lý khi check radio return hoặc quit
   * @param radio return: 'Trở lại vị trí cũ' | quit: 'Nghỉ việc'
   */
  toggleRadioButton(radio: 'return' | 'quit') {
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
   * Hàm dùng để tương tác với dialog ngưng quyết định
   * @param option 1. Mở dialog | 2. Đóng dialog | 3. Xác nhận huỷ quyết định
   */
  handleDialogStopDecision(option: number) {
    // 1. Mở dialog
    if (option == 1) {
      this.isStoppedDecisionDialogShow = true;
      if (this.TypeDecision == this.HiringENUM) {
        this.APIGetListHR(26, 'isLoadingDropdownReasonStopProfile');
      }
      if (this.TypeDecision == this.TransferingENUM) {
        this.APIGetListHR(25, 'isLoadingDropdownReasonStopProfile');
      }
      return;
    }
    // 2. Đóng dialog
    if (option == 2) {
      this.isStoppedDecisionDialogShow = false;
      this.listStoppedDecision = [];
      return;
    }
    // 3. Xác nhận huỷ quyết định
    if (option == 3) {
      if (Ps_UtilObjectService.hasListValue(this.listStoppedDecision)) {
        if (this.isValidDialogStopDecision(this.TypeDecision, true)) {
          if (this.TypeDecision == this.TransferingENUM) {
            this.listStoppedDecision.forEach(item => item.TypeStop = this.isReturnChecked ? 1 : 2)
          }
          // Gán các thông tin lý do
          this.listStoppedDecision.forEach(item => {
            item.ReasonStatus = this.valueReason.Code;
            item.ReasonStatusDescription = this.valueRemark.value;
          })

          // Gọi API cập nhật trạng thái quyết định
          this.APIUpdateHRDecisionMasterStatus(this.listStoppedDecision, 3);
        }
      }
      else {
        this.handleDialogStopDecision(2);
      }
    }
  }

  /**
   * Hàm lấy value reason khi change select
   * @param value value reason được chọn
   */
  getValueChangeDropdownReason(value: DTOListHR) {
    this.valueReason = value;
    const conHiring = value.Code == 119 && this.TypeDecision == this.HiringENUM;
    const conTransfering = value.Code == 113 && this.TypeDecision == this.TransferingENUM;
    this.isObligatoryReason = conHiring || conTransfering;
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

  //#endregion


  //#region Destroy
  ngOnDestroy(): void {
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
  //#endregion
}
