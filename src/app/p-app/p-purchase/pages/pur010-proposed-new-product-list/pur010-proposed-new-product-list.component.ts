import { Component, OnInit } from '@angular/core';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOResponse, Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/operators';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { MenuDataItem, ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { GridDataResult, PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { HriDecisionApiService } from 'src/app/p-app/p-hri/shared/services/hri-decision-api.service';
import { HriTransitionApiService } from 'src/app/p-app/p-hri/shared/services/hri-transition-api.service';
import { DTONewProductProposal } from '../../shared/dto/DTONewProductProposal.dto';
import { DTOSupplier } from '../../shared/dto/DTOSupplier';
import { PurNewProductProposalService } from '../../shared/services/pur-new-product-proposal.service';
import { PurPriceRequestApiService } from '../../shared/services/pur-price-request-api.service';
import { ConfigHamperApiService } from 'src/app/p-app/p-config/shared/services/config-hamper-api.service';
import { DTOConfGroup } from 'src/app/p-app/p-config/shared/dto/DTOConfHamperRequest';
import DTOListProp_ObjReturn from 'src/app/p-app/p-marketing/shared/dto/DTOListProp_ObjReturn.dto';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { MarketingService } from 'src/app/p-app/p-marketing/shared/services/marketing.service';
import { MarBannerAPIService } from 'src/app/p-app/p-marketing/shared/services/marbanner-api.service';


@Component({
  selector: 'app-pur010-proposed-new-product-list',
  templateUrl: './pur010-proposed-new-product-list.component.html',
  styleUrls: ['./pur010-proposed-new-product-list.component.scss']
})
export class Pur010ProposedNewProductListComponent {
  destroy$ = new Subject<void>();

  gridView: GridDataResult; // Danh sách bảng sản phẩm
  pageSizes: number[] = [25, 50, 75, 100]; // Danh sách các "Hiển thị mỗi trang"
  pageSize: number = 25;
  page: number = 0;

  // State của grid
  gridState: State = {
    skip: this.page,
    take: this.pageSize,
    filter: { filters: [], logic: 'and' },
    sort: [{ field: 'Code', dir: 'desc' }],
  };

  stateSuppiler: State = {
    filter: {
      filters: [
        { field: 'IsClosed', operator: 'eq', value: 0 }
      ], logic: 'and'
    },
    sort: [{ field: 'VNName', dir: 'asc' }],
  }

  //Setting Selectable cho grid
  selectable: SelectableSettings = { enabled: true, mode: 'multiple', drag: false, checkboxOnly: true };

  isFilterDisable: boolean = true; // Các filter có bị disable hay không
  isDraft: boolean = true; // Check box filter "Đang soạn thảo"
  isSent: boolean = true; // Check box filter "Gửi duyệt"
  isApproved: boolean = false; // Check box filter "Duyệt áp dụng"
  isSuspended: boolean = false; // Check box filter "Ngưng áp dụng"
  isLoading: boolean = false; // Có load danh sách sản phẩm hay không
  isDialogConfirmDeleteShow: boolean = false; // Dialog xác nhận xóa sản phẩm có được show hay không
  M_A: boolean = false;
  M_C: boolean = false;

  // Phân quyền
  justLoadedChangePermissionAPI: boolean = true
  justLoaded: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isMaster: boolean = false;
  isCreator: boolean = false;
  isApprover: boolean = false;
  isAllowedToViewOnly: boolean = false;

  listSelectedTaskBoard: DTONewProductProposal[] = []; // Danh sách các bảng sản phẩm được chọn
  listSelectedProposalToDelete: DTONewProductProposal[] = []; // Danh sách các bảng sản phẩm được chọn để xóa

  currentDateFilterOperator = { Code: 1, TypeFilter: 'từ', ValueFilter: 'gte' }; // Operator hiện tại được chọn của dropdown filter ngày hiệu lực
  currentDateFilterValue: string = null; // Giá trị ngày được chọn
  currentDate: Date = new Date(); // Ngày hiện tại

  keySearch: string = ""; // Giá trị tìm kiếm

  // Filter Descriptor
  filterDraftStatus: FilterDescriptor = { field: 'StatusID', operator: 'eq', value: 0 }; //Filter trạng thái "Đang soạn thảo"
  filterSendStatus: FilterDescriptor = { field: 'StatusID', operator: 'eq', value: 1 }; //Filter trạng thái "Gửi duyệt"
  filterApprovedStatus: FilterDescriptor = { field: 'StatusID', operator: 'eq', value: 2 }; // Filter trạng thái "Duyệt áp dụng"
  filterSuspendedStatus: FilterDescriptor = { field: 'StatusID', operator: 'eq', value: 3 }; // Filter trạng thái "Ngưng áp dụng"
  filterReturnedStatus: FilterDescriptor = { field: 'StatusID', operator: 'eq', value: 4 }; // Filter trạng thái "Trả về"
  filterSearch: CompositeFilterDescriptor = { logic: 'or', filters: [] }; // Filter trạng thái "Ngưng áp dụng"
  filterStatus: CompositeFilterDescriptor = { logic: 'or', filters: [] }; // Filter trạng thái "Ngưng áp dụng"
  filterSupplier: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  curSuppier: any
  filterGroup1: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  curGroup1: any
  // Callback function
  onPageChangeCallback: Function
  onActionDropDownClickCallback: Function
  onSelectCallback: Function
  onSelectedPopupBtnCallback: Function
  getActionDropdownCallback: Function
  getSelectionPopupCallback: Function

  /**
   * Danh sách các API để unscribe khi component bị destroy
   */
  arrSub: Subscription[] = [];
  //#endregion

  //Group 1
  gridStateGroup: State = {
    skip: this.page,
    take: this.pageSize,
    filter: {
      filters: [
        { field: 'level', operator: 'eq', value: 1 }
      ], logic: 'and'
    },
    sort: [{ field: 'Code', dir: 'desc' }],
  };


  //Dropdown
  ListSupplier: DTOSupplier[] = []
  listGroup1: DTOConfGroup[] = []

  uploadEventHandlerCallback: Function // Function callback to import list policy task

  //#region HOOKS
  constructor(
    private menuService: PS_HelperMenuService,
    private layoutService: LayoutService,
    private newProductProposalService: PurNewProductProposalService,
    public priceRequestAPI: PurPriceRequestApiService,
    public configHamperAPI: ConfigHamperApiService,
    private marService: MarBannerAPIService
  ) { }


  ngOnInit(): void {
    let that = this;


    //Phân quyền ứng dụng
    let a = this.menuService.changePermission().pipe(takeUntil(this.destroy$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');
        //action permission
        this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isApprover = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;
        this.isAllowedToViewOnly = this.actionPerm.findIndex(s => s.ActionType == 6) > -1 && !Ps_UtilObjectService.hasListValue(this.actionPerm.filter(s => s.ActionType != 6))

        this.M_A = this.isMaster || this.isApprover;
        this.M_C = this.isMaster || this.isCreator;
      }
    })

    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.isFilterDisable = false;
        that.onLoadDefault();
        // this.APIGetListSupplier()
        // this.APIGetListGroup()
        // this.APIGetListNewProductProposal()
      }
    });

    this.onSelectCallback = this.handleGridItemSelect.bind(this);
    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this);
    this.onActionDropDownClickCallback = this.handleMoreActionItemClick.bind(this);
    this.onSelectedPopupBtnCallback = this.handleSelectionActionItemClick.bind(this);
    this.onPageChangeCallback = this.handlePageChange.bind(this)
    this.uploadEventHandlerCallback = this.uploadEventHand.bind(this);


    this.arrSub.push(a, b);
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();

    this.arrSub.forEach(s => {
      s?.unsubscribe();
    });
  }
  //#endregion


  //#region APIs
  /**
   * API lấy danh sách các bảng sản phẩm
   */
  APIGetListNewProductProposal() {
    const apiText = "đề xuất hàng mới ";
    let a = this.newProductProposalService.GetListNewProductProposal(this.gridState).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        if (!Ps_UtilObjectService.hasListValue(res.ObjectReturn.Data) && !Ps_UtilObjectService.hasValue(res.ObjectReturn.Total)) {
          this.page -= 1;
          this.gridState.skip -= 1;
          // this.handleLoadFilter();
        }
        this.gridView = { data: res.ObjectReturn.Data, total: res.ObjectReturn.Total };
      } else {
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
   * API Cập nhật trạng thái
   * @param listDTO Danh sách cần cập nhật
   * @param reqStatus Trạng thái muốn chuyển sang
   * @returns
   */
  APIUpdateNewProductProposalStatus(listDTO: DTONewProductProposal[], reqStatus: number) {
    this.isLoading = true;
    const apiText = "Cập nhật trạng thái sản phẩm"
    let a = this.newProductProposalService.UpdateNewProductProposalStatus(listDTO, reqStatus).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(apiText + ' thành công')
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
        this.listSelectedTaskBoard = [];
        this.handleLoadFilter();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      err ? this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`) : this.handleLoadFilter();
      this.isLoading = false;
    })

    this.arrSub.push(a);
  }

  /**
   * API xoá
   * @param listDTO danh sách cần xoá
   * @returns
   */
  APIDeleteNewProductProposal(listDTO: DTONewProductProposal[]) {
    const apiText = "Xoá sản phẩm"
    let a = this.newProductProposalService.DeleteNewProductProposal(listDTO).pipe(takeUntil(this.destroy$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(apiText + ' thành công')
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();

        this.isDialogConfirmDeleteShow = false; // Đóng dialog confirm Xóa
        this.listSelectedProposalToDelete = []; // Reset danh sách bảng sản phẩm được chọn để xóa
        this.listSelectedTaskBoard = []; // Reset danh sách bảng sản phẩm được chọn
      }
      else {
        this.isLoading = false;
        return this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${res.ErrorString}`)
      }

      this.handleLoadFilter();
      this.isLoading = false;
    }, (err) => {
      err ? this.handleLoadFilter() : this.layoutService.onError(`Đã xảy ra lỗi khi ${apiText}: ${err}`);
      this.isLoading = false;
    })

    this.arrSub.push(a);
  }

  APIGetListSupplier() {
    let ctx = `Lấy danh sách ĐỐI TÁC`
    this.isLoading = true;
    this.priceRequestAPI.GetListSupplier(this.stateSuppiler).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.ListSupplier = res.ObjectReturn.Data
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
    })
  }

  APIGetListGroup() {
    let ctx = `Lấy danh sách PHÂM NHÓM CẤP 1`
    this.isLoading = true;
    this.configHamperAPI.GetListGroup(this.gridStateGroup).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.listGroup1 = res.ObjectReturn.Data
        // this.filteredPartner =  res.ObjectReturn
        //gán partner
        // const findPartner =  this.ListSupplier.find(s => {
        //   if(s.Code == this.price.COPartner){
        //     return s
        //   }
        // })
        // if(Ps_UtilObjectService.hasValue(findPartner)){
        //   this.selectedSupplier = findPartner
        //   this.price.TypeData = findPartner.TypeData
        //    //gán typeData = 22 de test ui
        // }
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
      }
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
    })
  }

  //#endregion


  //#region CALLBACK FUNC
  /**
   * Hàm set giá trị để nhận biết chọn nhiều item cho việc disable
   * @param isSelected
   */
  handleGridItemSelect(isSelected: boolean) {
    this.isFilterDisable = isSelected;
  }

  /**
   * Hàm thực hiện khi thay đổi trang
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
   * Hàm lấy các action cho popup moreAction của grid
   * @param moreActionDropdown
   * @param dataItem
   * @returns MenuDataItem[]
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTONewProductProposal) {
    const status = dataItem.StatusID;

    // Danh sách item được chọn
    moreActionDropdown = [];
    this.listSelectedTaskBoard = [dataItem];

    // Hàm kiểm tra quyền truy cập
    const canEdit = [0, 4].includes(status) && this.M_C;
    const canDelete = status === 0 && this.M_C;

    // Action chỉnh sửa và xem chi tiết
    if (canEdit || (status === 1 && this.M_A)) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Type: 'edit', Actived: true });
    }
    else {
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Type: 'detail', Actived: true });
    }

    // Nhóm action đổi tình trạng
    if (canEdit) {
      moreActionDropdown.push({ Name: "Gửi duyệt", Code: "redo", Type: 'Status', Link: "1", Actived: true });
    }
    else if ([1, 3].includes(status) && this.M_A) {
      moreActionDropdown.push({ Name: "Trả về", Code: "undo", Type: 'Status', Link: "4", Actived: true });
      moreActionDropdown.push({ Name: "Phê duyệt", Code: "check-outline", Type: 'Status', Link: "2", Actived: true });
    }
    else if (status === 2 && this.M_A) {
      moreActionDropdown.push({ Name: "Ngưng áp dụng", Code: "minus-outline", Type: 'Status', Link: "3", Actived: true });
    }

    // Action xoá
    if (canDelete) {
      moreActionDropdown.push({ Name: "Xóa sản phẩm", Code: "trash", Type: 'delete', Actived: true });
    }

    return moreActionDropdown;
  }

  /**
   * Hàm xử lí action trên dropdown
   * @param menu menu action đã nhấn
   * @param item quyết định được chọn
   */
  handleMoreActionItemClick(menu: MenuDataItem, item: DTONewProductProposal) {
    if (item.Code > 0) {
      if (menu.Type == 'Status') {
        // Nếu các trường bắt buộc đủ thông tin thì mới được tiếp tục
        if (!this.handleRequiredFieldCheck(item) && [1, 2].includes(parseInt(menu.Link))) {
          return;
        }
        this.APIUpdateNewProductProposalStatus(this.listSelectedTaskBoard, parseInt(menu.Link))
      }
      // Nếu 'Xem chi tiết' hoặc 'Chỉnh sửa'
      else if (menu.Link == 'edit' || menu.Code == 'pencil' || menu.Code == "eye" || menu.Link == 'detail') {
        localStorage.setItem("NewProductProposal", JSON.stringify(this.listSelectedTaskBoard[0]))
        this.openDetail();
      }
      // Nếu 'Xóa bảng sản phẩm'
      else if (menu.Link == 'delete' || menu.Code == 'trash') {
        this.listSelectedProposalToDelete.push(this.listSelectedTaskBoard[0]);
        this.isDialogConfirmDeleteShow = true
      }
    }
  }

  /**
  * Hàm lấy các action cho popup giữa màn hình khi chọn vào checkbox
  * @param arrItem
  * @returns MenuDataItem[]
  */
  getSelectionPopupAction(arrItem: DTONewProductProposal[]) {
    var moreActionDropdown = new Array<MenuDataItem>();
    var canSent = arrItem.findIndex(s => [0, 4].includes(s.StatusID)); // Đang soạn thảo và Trả về có thể gửi duyệt
    var canAppro_Return = arrItem.findIndex(s => s.StatusID == 1); // Gửi duyệt có thể Duyệt và Trả về
    var canReturnOnEffDate = arrItem.findIndex(s => s.StatusID == 3); // Ngưng áp dụng có thể trả về với điều kiện chưa tới ngày hiệu lực
    var canStop = arrItem.findIndex(s => s.StatusID == 2); // Duyệt áp dụng có thể ngưng
    var canDel = arrItem.findIndex(s => s.StatusID == 0) != -1; // Đang soạn thảo có thể xóa

    if (canSent != -1 && (this.isCreator || this.isMaster)) {
      moreActionDropdown.push({ Name: "Gửi duyệt", Code: "redo", Type: 'Status', Link: "1", Actived: true });
    }

    if ((canReturnOnEffDate != -1 || canAppro_Return != -1) && (this.isApprover || this.isMaster)) {
      moreActionDropdown.push(
        { Name: "Phê duyệt", Code: "check-outline", Type: 'Status', Link: "2", Actived: true },
        { Name: "Trả về", Code: "undo", Type: 'Status', Link: "4", Actived: true }
      )
    }

    if (canStop != -1 && (this.isApprover || this.isMaster)) {
      moreActionDropdown.push({ Name: "Ngưng áp dụng", Code: "minus-outline", Type: 'Status', Link: "3", Actived: true });
    }

    if (canDel && (this.isCreator || this.isMaster)) {
      moreActionDropdown.push({ Name: "Xóa sản phẩm", Code: "trash", Type: 'Delete', Link: "delete", Actived: true });
    }

    return moreActionDropdown;
  }

  /**
   * Hàm xử lý action được chọn trên popup
   * @param btnType Loại action đã nhấn
   * @param listSelectedItem List các item đã được chọn
   * @param value Value của action đã nhấn
   */
  handleSelectionActionItemClick(btnType: string, listSelectedItem: DTONewProductProposal[], value: string) {
    let reqList = [];
    let reqStatus = 0;

    /**
     * Hàm dùng để lấy những item có những trạng thái thuộc list status truyền vào
     */
    const filterItemsByStatus = (statuses: number[], additionalCheck: Function = () => true) => {
      return listSelectedItem.filter(item =>
        statuses.includes(item.StatusID) && this.handleRequiredFieldCheck(item) && additionalCheck(item)
      );
    };

    if (btnType === 'Status') {
      switch (value) {
        case '1': // Cập nhật trạng thái thành "Gửi duyệt"
          reqList = filterItemsByStatus([0, 4]);
          reqStatus = 1;
          break;

        case '2': // Cập nhật trạng thái thành "Duyệt áp dụng"
          reqList = filterItemsByStatus([1]);
          reqStatus = 2;
          break;

        case '3': // Cập nhật trạng thái thành "Ngừng áp dụng"
          reqList = filterItemsByStatus([2]);
          reqStatus = 3;
          break;

        case '4': // Cập nhật trạng thái thành "Trả về"
          reqList = filterItemsByStatus([1, 3]);
          reqStatus = 4;
          break;
      }

      if (Ps_UtilObjectService.hasListValue(reqList)) {
        // Với list 1 item
        if (reqList.length == 1) {
          // Nếu gửi duyệt hoặc phê duyệt
          if ([1, 2].includes(reqStatus)) {
            // Nếu các trường bắt buộc đủ thông tin thì mới được tiếp tục
            if (!this.handleRequiredFieldCheck(reqList[0])) {
              return;
            }
          }
        }
        // Với list có nhiều item
        else {
          if ([1, 2].includes(reqStatus)) {
            // reqList = reqList.filter(TB => {
            //   const startOfCurDate = this.formatDateToFilter(new Date(), 'Start');
            //   const startOfEffDate = this.formatDateToFilter(new Date(TB.EffDate), 'Start');

            //   return TB.NumOfTask > 0 && Ps_UtilObjectService.getDaysLeft(startOfEffDate, startOfCurDate) <= 0
            // })
          }
        }

        this.APIUpdateNewProductProposalStatus(reqList, reqStatus)
      }
      else {
        this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
      }
    }
    else if (btnType === 'Delete') {
      this.listSelectedProposalToDelete = listSelectedItem.filter(item => item.StatusID === 0);

      if (Ps_UtilObjectService.hasListValue(this.listSelectedProposalToDelete)) {
        this.isDialogConfirmDeleteShow = true;
      }
    }
  }

  roundToTwoDecimal(num: number): number {
    return Math.round(num * 100) / 100;
  }
  //#endregion


  //#region FILTER
  /**
   * Hàm dùng để load filter default khi lần đầu khởi động trang
   */
  onLoadDefault() {
    this.filterSearch.filters = [];
    this.handlePushFilter(this.filterStatus, this.filterDraftStatus, this.isDraft);
    this.handlePushFilter(this.filterStatus, this.filterSendStatus, this.isSent);
    this.handlePushFilter(this.gridState.filter, null, null, this.filterStatus);
    this.handleLoadFilter();
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

  /**
   * Hàm dùng để chạy các filter
   */
  handleLoadFilter() {
    if (!this.isFilterDisable) {
      this.isLoading = true;
      this.gridState.filter.filters = [];
      this.filterStatus.filters = [];

      // Filter trạng thái
      this.handlePushFilter(this.filterStatus, this.filterDraftStatus, this.isDraft);
      this.handlePushFilter(this.filterStatus, this.filterSendStatus, this.isSent);
      this.handlePushFilter(this.filterStatus, this.filterApprovedStatus, this.isApproved);
      this.handlePushFilter(this.filterStatus, this.filterSuspendedStatus, this.isSuspended);

      //Nếu trạng thái đang soạn thảo được check thì push thêm trạng thái trả về vào Composite
      if (this.isDraft) {
        this.handlePushFilter(this.filterStatus, this.filterReturnedStatus, this.isDraft);
      }
      this.handlePushFilter(this.gridState.filter, null, null, this.filterStatus);
      this.handlePushFilter(this.gridState.filter, null, null, this.filterSearch);
      this.handlePushFilter(this.gridState.filter, null, null, this.filterGroup1);
      this.handlePushFilter(this.gridState.filter, null, null, this.filterSupplier);
      this.APIGetListSupplier();
      this.APIGetListGroup();
      this.APIGetListNewProductProposal();
    }
  }

  /**
   * Hàm dùng để xử lý filter sau khi tương tác với filter component
   * @param value output từ filter component
   * @param field Tên trường
   */
  handleFilterChange(value: any, field?: string, loadProcess: boolean = true) {
    this.page = 0;
    this.gridState.skip = 0;
    if (Ps_UtilObjectService.hasValue(field)) {
      this[field] = JSON.parse(JSON.stringify(value));
      //Nếu là filter search thì kiểm tra xem value nhập có là rỗng hay không
      if (Ps_UtilObjectService.containsString(field, 'filterSearch')) {
        //Nếu không có giá trị thì set rỗng

        if (!Ps_UtilObjectService.hasValueString(value.filters[0]?.value)) {
          this.filterSearch.filters = []
          this.keySearch = ""
        } else {
          this.filterSearch.filters = value.filters
          this.keySearch = value.filters[0]?.value
        }
      }
    }
    this.handleLoadFilter();
  }

  /**
   * Hàm dùng để reset filter
   */
  hanldeResetFilter() {
    this.page = 0;
    this.gridState.skip = 0;
    this.keySearch = ""

    this.isDraft = true;
    this.isSent = true;
    this.isApproved = false;
    this.isSuspended = false;

    this.filterSearch.filters = [];
    this.currentDateFilterValue = null;
    this.filterSupplier.filters = []
    this.filterGroup1.filters = []
    this.curGroup1 = null
    this.curSuppier = null
    this.handleLoadFilter();
  }

  handleChangeDropdownFilter(dropdownName: string, value: any) {
    if (dropdownName == 'supplier') {
      if (Ps_UtilObjectService.hasValue(value.Code)) {
        this.filterSupplier.filters = []
        this.filterSupplier.filters.push({ field: 'COPartner', operator: 'eq', value: value.Code })
        this.curSuppier = value
      } else {
        this.filterSupplier.filters = []
      }

    } else if (dropdownName == 'groupID1') {
      if (Ps_UtilObjectService.hasValue(value.Code)) {
        this.filterGroup1.filters = []
        this.filterGroup1.filters.push({ field: 'GroupID1', operator: 'eq', value: value.Code })
        this.curGroup1 = value
      } else {
        this.filterGroup1.filters = []
      }

    }
    this.handleLoadFilter()
  }
  //#endregion


  //#region HÀM DÙNG CHUNG
  /**
  * Hàm chuyển trang
  * @param isNew Nếu là thêm mới thì param này là true
  */
  openDetail(isNew: boolean = false) {
    let a = this.menuService.changeModuleData().pipe(takeUntil(this.destroy$)).subscribe((item: ModuleDataItem) => {
      var parent = item.ListMenu.find(f => f.Code == 'pur-propose')
      if (Ps_UtilObjectService.hasValue(parent) && Ps_UtilObjectService.hasListValue(parent.LstChild)) {
        var detail = parent.LstChild.find(f => f.Code.includes('pur010-proposed-new-product-list') || f.Link.includes('pur010-proposed-new-product-list'))
        if (Ps_UtilObjectService.hasValue(detail) && Ps_UtilObjectService.hasListValue(detail.LstChild)) {
          var detail2 = detail.LstChild.find(f => f.Code.includes('pur010-proposed-new-product-detail') || f.Link.includes('pur010-proposed-new-product-detail'))
          this.menuService.activeMenu(detail2)
          if (isNew) {
            var newProposal = new DTONewProductProposal();
            localStorage.setItem("NewProductProposal", JSON.stringify(newProposal))
          }
        }
      }
    })
    this.arrSub.push(a)
  }

  /**
   * Hàm thực hiện đóng dialog sác nhận xóa bảng sản phẩm
   */
  handleCloseDialog() {
    this.isDialogConfirmDeleteShow = false; // Đóng dialog confirm Xóa
    this.listSelectedProposalToDelete = []; // Reset danh sách bảng sản phẩm được chọn để xóa
  }

  /**
   * Hàm dùng để xóa những bảng sản phẩm được chọn
   */
  handleDeleteNewProposal() {
    // Call API Xóa
    if (Ps_UtilObjectService.hasListValue(this.listSelectedProposalToDelete)) {
      const deletedList = this.listSelectedProposalToDelete
      if (!Ps_UtilObjectService.hasListValue(deletedList)) {
        this.layoutService.onError('Đã xảy ra lỗi khi xóa sản phẩm được chọn: Còn tồn tại danh sách sản phẩm');
        this.handleCloseDialog();
        return;
      }
      this.isLoading = true;
      this.APIDeleteNewProductProposal(deletedList);
    }
  }

  /**
   * Hàm dùng để check các trường bắt buộc của dto
   * @param dto dto cần check
   * @param isSkipMsg bỏ qua thông báo mặc định là false
   * @returns true | false
   */
  handleRequiredFieldCheck(dto: DTONewProductProposal, isSkipMsg: boolean = false): boolean {
    const fieldsToCheck = [
      { value: dto.COPartner, label: 'Nhà cung cấp' },
      { value: dto.Barcode, label: 'Barcode' },
      { value: dto.ProductName, label: 'Tên sản phẩm' },
      { value: dto.TaxCode, label: 'Mã khai quan/xuất hóa đơn' },
      { value: dto.TaxName, label: 'Tên khai quan/xuất hóa đơn' },
      { value: dto.UnitPrice, label: 'Giá bán lẻ dự kiến (chưa VAT)', checkFunc: (value: any) => value > 0 },
      { value: dto.CurrencyIn, label: 'Đồng tiền giá bán lẻ' },
      { value: dto.CommercialTerm, label: 'Điều kiện thương mại' },
      { value: dto.VATOut, label: 'VAT giá bán lẻ' },
      { value: dto.Bid, label: 'Giá mua (chưa VAT)' },
      { value: dto.CurrencyOut, label: 'Đồng tiền giá mua' },
      { value: dto.QtyMore, label: 'Số lượng dự trữ thêm' },
      { value: dto.QtyMonthSale, label: 'Số lượng bán/tháng' },
      { value: dto.AmountMonthSale, label: 'Danh thu tháng' },
      { value: dto.MinQuantity, label: 'Số lượng đặt tối thiểu' },
      { value: dto.QtyFirstOrder, label: 'Số lượng đặt đầu tiên' },
      { value: dto.GroupID1, label: 'Phân nhóm cấp 1' },
      { value: dto.BaseUnit, label: 'Đơn vị sản phẩm (Base unit)' },
      { value: dto.BuyerUnit, label: 'Đơn vị mua hàng' },
      { value: dto.VATIn, label: 'VAT giá mua' },
    ];

    const msgStr = 'Đã xảy ra lỗi khi cập nhật trạng thái sản phẩm: Chưa có ';

    for (const field of fieldsToCheck) {
      if (!Ps_UtilObjectService.hasValueString(field.value) || (field.checkFunc && !Ps_UtilObjectService.hasValue(field.value))) {
        if (!isSkipMsg) {
          this.layoutService.onError(msgStr + field.label);
        }
        return false;
      }
    }

    return true;
  }

  /**
  * Hàm trả về tên các bảng sản phẩm chưa hiển thị trên dialog xoá
  * @returns string[]
  */
  handleGetRemainingPolicyNames(): string {
    return ''
    // return this.listSelectedTaskBoardToDelete.slice(2).map(item => item.PolicyName).join(',\n');
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

  formatToK(price: number): string {
    if (!price) return '0';

    const billion = 1_000_000_000;
    const million = 1_000_000;
    const thousand = 1_000;

    if (price >= billion) {
      return (price / billion).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + 'B';
    } else if (price >= million) {
      return (price / million).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + 'M';
    } else if (price >= thousand) {
      return (price / thousand).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + 'K';
    } else {
      return price.toLocaleString('vi-VN');
    }
  }

  /**
 * handle image error to default image
 * @param event
 */
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/default-image.jpg';
  }
  /**
 * import excel
 */
  onImportExcel() {
    this.layoutService.setImportDialog(true);
    this.layoutService.setExcelValid(true);
  }

  /**
   * export excel
   */
  uploadEventHand(e: File) {
    this.APIImportExcelNewProductProposal(e)
  }

  pickFile(e: DTOCFFile) {
    var file = Ps_UtilObjectService.removeImgRes(e?.PathFile)
    this.layoutService.setFolderDialog(false)

  }

  onGetPromotionFolderDrillWithFile() {
    // return this.apiMarService.GetPromotionFolderDrillWithFile().pipe(takeUntil(this.destroy$))
  }

  /**
 * export excel
 */
  onExportExcel() {
    this.APIExportExcel()
  }

  APIImportExcelNewProductProposal(file) {
    var ctx = "Import Excel"

    let a = this.newProductProposalService.ImportExcelNewProductProposal(file).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.handleLoadFilter()

        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.setImportDialogMode(1)
        this.layoutService.setImportDialog(false)
        this.layoutService.getImportDialogComponent().inputBtnDisplay()
      } else {
        const arr = res.ObjectReturn as DTOListProp_ObjReturn[]
        let importComponent = this.layoutService.getImportDialogComponent()

        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        importComponent.importGridDSView.next({ data: arr, total: arr.length })
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      // this.loading = false;
    })
    this.arrSub.push(a);
  }

  APIExportExcel() {
    // this.loading = true

    var ctx = 'Download Excel Template';
    var getfileName = 'NewProductProposalTemplate.xlsx'
    this.layoutService.onInfo(`Đang xử lý ${ctx}`);

    var a = this.configHamperAPI.GetTemplate(getfileName).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res != null) {
        Ps_UtilObjectService.getFile(res, getfileName)
        this.layoutService.onSuccess(`${ctx} thành công`);
      } else {
        this.layoutService.onError(`${ctx} thất bại`);
      }
      // this.loading = false;
    }, (f) => {
      this.layoutService.onError(
        `Xảy ra lỗi khi ${ctx}. `
      );
      // this.loading = false;
    });
    this.arrSub.push(a);
  }

  //create new product proposal
  onCreateNewProductProposal() {
    this.openDetail(true)
  }

  //edit new product proposal
  onEditNewProductProposal(item: DTONewProductProposal) {
    localStorage.setItem("NewProductProposal", JSON.stringify(item))
    this.openDetail()
  }

  //delete new product proposal
  onDeleteNewProductProposal(item: DTONewProductProposal) {
    this.listSelectedProposalToDelete = []
    this.listSelectedProposalToDelete.push(item)
    this.isDialogConfirmDeleteShow = true
  }
  //#endregion
}
