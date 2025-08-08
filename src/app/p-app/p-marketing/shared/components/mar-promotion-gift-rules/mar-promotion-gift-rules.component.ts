import { data, event } from 'jquery';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { distinct, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { DTOHRDecisionTask } from 'src/app/p-app/p-hri/shared/dto/DTOHRDecisionTask.dto';
import { DTOHRDecisionTaskLog } from 'src/app/p-app/p-hri/shared/dto/DTOHRDecisionTaskLog.dto';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOResponse, Ps_UtilObjectService } from 'src/app/p-lib';
import DTOPromotionProduct, { DTOCOLPromotionGiftCus, DTOCOPOLPromotionRangeCus, DTOPromotionDetail } from '../../dto/DTOPromotionProduct.dto';
import { MarPromotionAPIService } from '../../services/marpromotion-api.service';
import { takeUntil } from 'rxjs/operators';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PKendoGridComponent } from 'src/app/p-app/p-layout/components/p-kendo-grid/p-kendo-grid.component';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTODataPermission } from 'src/app/p-app/p-layout/dto/DTODataPermission';
import DTOListProp_ObjReturn from '../../dto/DTOListProp_ObjReturn.dto';


@Component({
  selector: 'app-mar-promotion-gift-rules',
  templateUrl: './mar-promotion-gift-rules.component.html',
  styleUrls: ['./mar-promotion-gift-rules.component.scss']
})
export class MarPromotionGiftRulesComponent implements OnInit, OnDestroy, AfterViewInit {
  ngUnsubscribe$ = new Subject<void>();
  isLoading: boolean = false;
  isLoadingAPI: boolean = true;
  isLoadingPermission: boolean = true;
  isFilterActive: boolean = false;
  isImportRange: boolean = false

  listRangeGrid: GridDataResult = null; // list hạn mức của grid
  gridState: State = { filter: { logic: 'and', filters: [] }, sort: [{ "field": "Range", "dir": "asc" }] } // State
  typeMasterDetail: number = 0; //Grid có detail hay không? 0 là không, 1 là có
  selectable: SelectableSettings = { enabled: true, mode: 'multiple', drag: false, checkboxOnly: true }; // Setting for selection of grid
  hasExpandedRow: boolean = false; // có đang mở expand row không
  countExpandedRow: number = 0; // đếm số dòng đang mở
  rowIndexFocus: number = null; // row đang được focus
  typeFocus: number = null; // loại focus
  listRange: DTOCOPOLPromotionRangeCus[] = []; // danh sách hạn mức
  listRangeSelected: DTOCOPOLPromotionRangeCus[] = []; // danh sách hạn mức đang select
  curRange: DTOCOPOLPromotionRangeCus = new DTOCOPOLPromotionRangeCus(); // hạn mức hiện đang chọn
  curRangeTemp: DTOCOPOLPromotionRangeCus = new DTOCOPOLPromotionRangeCus(); // hạn mức tạm thời
  expandedIndex: number | null = null; // Row đang được expand
  rowIndexTemp: number; // rowIndex tạm thời
  keyWordSearch: string; // keyword search
  actionPerm: DTOActionPermission[] = [];
  dataPerm: DTODataPermission[] = [];
  isMaster = false; // Toàn duyệt
  isAllowedToCreate = false; // Quyền tạo
  isAllowedToVerify = false; // Quyền duyệt
  M_C: boolean = false; // Toàn quyền hoặc tạo
  M_V: boolean = false; // Toàn quyền hoặc duyệt
  curPromotionDetail: DTOPromotionDetail = new DTOPromotionDetail();


  // Function
  onActionDropDownClickCallback: Function;
  getActionDropdownCallback: Function;
  onSelectedPopupBtnCallback: Function;
  getSelectionPopupCallback: Function;
  onSelectCallback: Function;
  onSortChangeCallback: Function;
  selectedRowitemPopupCallback: Function; // Function callback to selecte item in grid
  clearSelectedRowitemCallback: Function; // Function callback to clear selected item
  uploadEventHandlerCallback: Function // Function callback to import list

  @Input() curPromotion: DTOPromotionProduct = new DTOPromotionProduct(); // promotion hiện tại
  @Input() isDisabled: boolean = false; // có đang disabled không 
  @Input() isDisabledSelect: boolean = false; // có disabled từ grid của component cha không
  @Output() addGift = new EventEmitter<{ isAddGift: boolean; item: DTOCOPOLPromotionRangeCus }>(); // có mở popup thêm quà tặng không
  @Output() listRangeOutput = new EventEmitter<DTOCOPOLPromotionRangeCus[]>(); // list hạn mức truyền ra
  @Output() isDisabledSearch = new EventEmitter<boolean>(); // truyền output disabeld 
  @Output() importRange = new EventEmitter<boolean>(); // truyền output đang import hạn mức excel


  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;
  @ViewChild('myCustomGrid') diCustomGridRef!: PKendoGridComponent;

  // giá trị hình thức nhận quà mặc định
  defaultTypeReceiveGift = {
    TypeReceiveGift: -1,
    TypeReciveName: '- Chọn hình thức -'
  };

  // danh sách hình thức
  TypeReceiveGift = [
    {
      TypeReceiveGift: 0,
      TypeReciveName: 'Tất cả quà khai báo'
    },
    {
      TypeReceiveGift: 1,
      TypeReciveName: 'Chọn trong danh sách quà'
    }
  ];

  isShowDeleteRangeDialog: boolean = false
  isDeleteManyRange: boolean = false

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private apiMarService: MarPromotionAPIService,
    private layoutService: LayoutService,
    private menuService: PS_HelperMenuService,
    private layoutApiService: LayoutAPIService,
  ) {

  }
  ngOnInit(): void {
    let that = this
    //cache
    let a = this.menuService.changePermission().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.isLoadingPermission) {
        that.isLoadingPermission = false
        that.actionPerm = distinct(res.ActionPermission, "ActionType")

        that.isMaster = that.actionPerm.findIndex(s => s.ActionType == 1) > -1 || false
        that.isAllowedToCreate = that.actionPerm.findIndex(s => s.ActionType == 2) > -1 || false
        that.isAllowedToVerify = that.actionPerm.findIndex(s => s.ActionType == 3) > -1 || false

        this.M_C = this.isMaster || this.isAllowedToCreate;
        this.M_V = this.isMaster || this.isAllowedToVerify;


        that.dataPerm = distinct(res.DataPermission, "Warehouse")
      }
    })

    let b = this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.isLoadingAPI) {
        this.isLoadingAPI = false
        this.APIGetListCOPOLPromotionRange();
        this.handleCheckPermission();
      }
    })
    this.arrUnsubscribe.push(a, b)
    this.clearSelectedRowitemCallback = this.onClearSelection.bind(this);
    this.selectedRowitemPopupCallback = this.onSelectedPopupBtnClick.bind(this);
    this.uploadEventHandlerCallback = this.uploadEventHand.bind(this);
    this.getSelectionPopupCallback = this.getSelectionPopupAction.bind(this);
    this.onSelectedPopupBtnCallback = this.onSelectionActionItemClick.bind(this);
    this.onSelectCallback = this.onGridItemSelect.bind(this);
    this.onSortChangeCallback = this.sortChange.bind(this);
    this.getActionDropdownCallback = this.getActionDropdown.bind(this);
    this.onActionDropDownClickCallback = this.onActionDropdownClick.bind(this);
  }

  ngAfterViewInit(): void {
    // Lấy tất cả các dòng <tr> trong bảng
    const rows = document.querySelectorAll('tr');

    // Duyệt qua tất cả các dòng
    rows.forEach(row => {
      // Kiểm tra nếu dòng có td chứa div với class 'col-product'
      if (row.querySelector('.col-product')) {
        // Thêm class 'row-product' vào dòng tr
        this.renderer.addClass(row, 'row-product');
      }
    });

    // Quan sát thay đổi trong DOM
    const observer = new MutationObserver(() => {
      this.updateDetailIcons(); // Gọi hàm cập nhật icon khi DOM thay đổi
    });

    observer.observe(this.elRef.nativeElement, {
      childList: true,
      subtree: true
    });

    // Gọi lần đầu để cập nhật nếu DOM đã sẵn sàng
    this.updateDetailIcons();
  }

  /**
   * Hàm xử lý đổi icon expand và collapse
   */
  updateDetailIcons(): void {
    // Tìm tất cả các thẻ <a> có aria-label="Collapse Details"
    const collapseLinks = document.querySelectorAll('a[aria-label="Collapse Details"]');
    const expandLinks = document.querySelectorAll('a[aria-label="Expand Details"]');

    collapseLinks.forEach(link => {
      if (!link.querySelector('.k-icon')) { // Để tránh chèn icon nhiều lần
        // Xóa nội dung cũ
        this.renderer.setProperty(link, 'innerHTML', '');

        // Tạo span mới
        const iconSpan = this.renderer.createElement('span');
        this.renderer.addClass(iconSpan, 'k-icon');
        this.renderer.addClass(iconSpan, 'k-font-icon');
        this.renderer.addClass(iconSpan, 'k-i-arrow-chevron-up');

        // Gắn vào thẻ <a>
        this.renderer.appendChild(link, iconSpan);
      }
    });

    expandLinks.forEach(link => {
      if (!link.querySelector('.k-icon')) {
        // Xóa nội dung cũ
        this.renderer.setProperty(link, 'innerHTML', '');

        // Tạo span mới
        const iconSpan = this.renderer.createElement('span');
        this.renderer.addClass(iconSpan, 'k-icon');
        this.renderer.addClass(iconSpan, 'k-font-icon');
        this.renderer.addClass(iconSpan, 'k-i-arrow-chevron-down');

        // Gắn vào thẻ <a>
        this.renderer.appendChild(link, iconSpan);
      }
    });
  }

  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any): MenuDataItem[] {
    this.curRange = dataItem;
    moreActionDropdown.length = 0
    const actionAdd: MenuDataItem = { Name: "Thêm quà tặng", Type: "Plus", Code: "plus", Actived: true };
    const actionDelete: MenuDataItem = { Name: "Xóa định mức", Type: "Delete", Code: "delete", Actived: true };

    return this.handleCheckPermission() && dataItem.Code !== 0 && dataItem.Range !== 0 ? [actionAdd, actionDelete] : [];
  }

  onActionDropdownClick(action: MenuDataItem, item: DTOCOPOLPromotionRangeCus) {
    this.curRange = item;
    if (action.Code === 'plus') {
      this.addGift.emit({ isAddGift: true, item });
    } else if (action.Code == 'delete') {
      this.isDeleteManyRange = false
      this.isShowDeleteRangeDialog = true
      // this.APIDeleteCOPOLPromotionRange();
    }
  }

  sortChange() {
  }

  /**
   * Hàm nhận event khi tắt hoặc chọn selection
   * @param isSelected 
   */
  onGridItemSelect(isSelected: boolean) {
    this.isDisabled = isSelected;
    this.isDisabledSearch.emit(this.isDisabled);
  }

  getSelectionPopupAction(arrItem: any[]): MenuDataItem[] {
    const actionDelete: MenuDataItem = { Name: "Xóa định mức", Type: "Delete", Code: "delete", Actived: true };
    const hasItemValid = arrItem.some(item => item.Code !== 0 && item.Range !== 0);
    return this.handleCheckPermission() && hasItemValid ? [actionDelete] : null;
  }

  onSelectionActionItemClick(btnType: string, listSelectedItem: any[], value: any) {
    listSelectedItem = listSelectedItem.filter(item => item.Code !== 0 && item.Range !== 0);
    this.listRangeSelected = listSelectedItem;

    if (btnType == "Delete") {
      // this.APIDeleteListCOPOLPromotionRange();
      this.isDeleteManyRange = true
      this.isShowDeleteRangeDialog = true
    }
  }

  /**
   * Hàm xử lý upload file
   * @param e 
   */
  uploadEventHand(e: File) {
    this.APIImportCOPOLPromotionGiftRange(e)
  }

  onSelectedPopupBtnClick() {

  }

  onClearSelection() {

  }

  /**
   * Hàm dùng để thêm class vào cho tr của grid
   * @param context 
   * @returns 
   */
  rowCallback = (context: RowClassArgs) => {
    return {
      childRow: context.dataItem.DecisionTask != null // Dòng con sẽ có class "childRow"
    };
  };

  /**
  //  * Hàm dùng để lấy danh sách ngoại lệ sau khi chọn xem chi tiết ngoại lệ
   * @param promotion 
   */
  callData(promotion: any) {

  }

  // /**
  //  * Hàm xử lý danh sách con của detail grid
  //  * @param parent 
  //  * @returns 
  //  */
  // fetchChildren(parent?: any): any[] {
  //   if (!parent) return [];

  //   let children: Array<DTOHRDecisionTaskLog> = [];

  //   // Lấy danh sách các cấp con
  //   if (Ps_UtilObjectService.hasListValue(parent.products)) {
  //     children = children.concat(parent.products);
  //   }

  //   return children;
  // }

  // hasChildren(item: any): boolean {
  //   if (!item) return false;

  //   // Kiểm tra nếu có danh sách con
  //   if (Ps_UtilObjectService.hasListValue(item.products)) {
  //     return true;
  //   }
  //   return false;
  // }

  // // Phương thức thay đổi trạng thái mở rộng của dòng con
  // toggleChildRow(dataItem: any) {
  //   dataItem.expanded = !dataItem.expanded;
  // }

  // Phương thức lấy chỉ số từ listTest
  getIndexFromList(dataItem: any): number {
    return this.listRange.findIndex(item => item === dataItem) + 1; // Thêm 1 để bắt đầu từ 1 thay vì 0
  }

  /**
   * Hàm xử lý khi tắt hoặc mở detail
   * @param event 
   */
  detailToggleState(event: any) {
    if (event.expand == true) {
      this.countExpandedRow += 1;

    } else {
      this.countExpandedRow -= 1;
    }

    if (this.countExpandedRow > 0) {
      this.hasExpandedRow = true;
    } else {
      this.hasExpandedRow = false;
    }
  }

  /**
   * 
   * @param rowIndex 
   * @param event 
   * @param type 1: tên, 2: hạn mức, 3: hình thức/số lượng, 4: thêm/xóa quà tặng
   */
  toggleActive(rowIndex: number, event: Event, type: number, itemSelected: DTOCOPOLPromotionRangeCus) {
    event.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
    this.rowIndexFocus = this.rowIndexFocus === rowIndex && this.typeFocus == type ? null : rowIndex;
    this.typeFocus = type;
    this.curRangeTemp = { ...itemSelected };
  }

  /**
   * @param item item hạn mức được chọn 
   */
  onDeleteByAction(item: DTOCOPOLPromotionRangeCus) {
    if (item.Code !== 0) {
      this.curRange = item;
      this.isShowDeleteRangeDialog = true;
    } else {
      // Nếu item chưa có Code (mới tạo, chưa lưu), thì xóa trực tiếp
      const index = this.listRange.findIndex(x => x === item);
      if (index > -1) {
        this.listRange.splice(index, 1);

        // Cập nhật lại dữ liệu hiển thị trong grid
        if (Ps_UtilObjectService.hasValueString(this.keyWordSearch)) {
          this.handleFilterSearch();
        } else {
          this.listRangeGrid = {
            data: [...this.listRange],
            total: this.listRange.length
          };
        }
      }
    }
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.rowIndexFocus = null; // Khi click ra ngoài, không active dòng nào
    this.typeFocus = null;
  }

  /**
   * Hàm xử lý khi click thêm mới hạn mức
   */
  handleAddNew() {
    const newItemRange = new DTOCOPOLPromotionRangeCus();
    newItemRange.Name = '';
    newItemRange.Range = 0;
    newItemRange.TypeReceiveGift = -1;
    newItemRange.NoOfGift = 0;
    newItemRange.Promotion = this.curPromotion.Code;
    newItemRange.ListGift = [];

    this.listRange.push(newItemRange);
    this.listRangeGrid = { data: this.listRange, total: this.listRange.length };
  }

  /**
   * Hàm xử lý show button thêm mới
   * @returns 
   */
  handleDisplayBtnAdd(): boolean {
    const rangeNotValid = this.listRange.some(range => range.Code == 0 && range.Range == 0);
    if (!rangeNotValid) {
      return true;
    } else {
      return false;
    }
  }

  // Hàm lấy danh sách option phù hợp dựa trên giá trị hiện tại
  getDropdownOptions(currentValue: number) {
    if (currentValue !== -1) {
      return this.TypeReceiveGift; // không có defaultItem
    }
    else {
      return [this.defaultTypeReceiveGift, ...this.TypeReceiveGift]; // thêm defaultItem
    }
  }

  // Hàm lấy object phù hợp với giá trị hiện tại
  getSelectedType(typeReceiveGift: number) {
    const selected = this.TypeReceiveGift.find(t => t.TypeReceiveGift === typeReceiveGift);
    return selected || this.defaultTypeReceiveGift;
  }

  /**
   * Hàm xử lý khi đổi hình thức
   * @param item 
   * @param event 
   */
  handleChangeDropdown(item: DTOCOPOLPromotionRangeCus, event: any) {
    item.TypeReceiveGift = event.TypeReceiveGift;
    if (item.TypeReceiveGift !== -1) {
      this.onChangedValue(item, 'TypeReceiveGift');
    } else {
      this.layoutService.onError('Hãy chọn hình thức khác');
    }
  }

  /**
   * Hàm xử lý tên hình thức
   * @param enumType 
   * @returns 
   */
  handleGetTypeReciveName(enumType: number): string {
    if (enumType == 0) {
      return '- Chọn hình thức -';
    }
    else if (enumType == 1) {
      return 'Tất cả quà khai báo';
    }
    else {
      return 'Chọn trong danh sách quà';
    }
  }

  /**
   * Hàm xử lý change value hạn mức
   * @param item 
   */
  onChangedValue(item: DTOCOPOLPromotionRangeCus, prop?: string) {
    // Nếu nội dung vừa update khác với nội dung cũ
    if (JSON.stringify(this.curRangeTemp) !== JSON.stringify(item)) {
      // Nếu là hạn mức mới chưa được tạo và "Hạn mức" chưa có giá trị
      if ((!Ps_UtilObjectService.hasValue(item.Range) || item.Range == 0) && this.curRangeTemp.Code == 0) {
        const maxRange = this.listRange.length > 0 ?
          Math.max(...this.listRange.map(r => r.Range)) : 0;
        item.Range = maxRange + 5;
      }
      // Kiểm tra xem hạn mức đó đã tồn tại chưa
      const hadRange = this.listRange.find(range => range.Range == item.Range && range.Code !== item.Code);
      if (Ps_UtilObjectService.hasValue(hadRange)) {
        this.listRange.find(r => r.Code == item.Code).Range = this.curRangeTemp.Range;
        this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật: Hạn mức này đã tồn tại`);
      } else {
        if (item.Range == 0) {
          this.listRange.find(r => r.Code == item.Code).Range = this.curRangeTemp.Range;
          this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật: Hạn mức phải khác 0`);
        }
        // else if (item.TypeReceiveGift == 1 && item.NoOfGift > item.ListGift.length) {
        //   this.listRange.find(r => r.Code == item.Code).NoOfGift = this.curRangeTemp.NoOfGift;
        //   this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật: Số lượng quà không được hơn số quà đang có`);
        // }
        else {
          if (prop == 'TypeReceiveGift') {
            // Nếu là Chọn trong danh sách quà tặng
            if (item.TypeReceiveGift == 1) {
              item.NoOfGift = 1;
            }
            // Nếu là tất cả trong danh sách
            else {
              item.NoOfGift = 0;
            }
          }
          this.curRange = item;
          this.APIUpdateCOPOLPromotionRange();
        }
      }
    } else {
      // console.log('Không thấy sự thay đổi')
    }
  }

  /**
   * Hàm xử lý mở rộng hoặc đóng chi tiết
   * @param rowIndex 
   * @param range 
   */
  toggleArrow(rowIndex: number, range: DTOCOPOLPromotionRangeCus) {
    this.curRange = range;
    // Nếu hàng này chưa được mở rộng thì mở rộng, ngược lại đóng lại
    if (this.expandedIndex === rowIndex) {
      this.expandedIndex = null; // Nếu đã mở rộng, click sẽ thu nhỏ lại
      this.diCustomGridRef.onCollapse(rowIndex)
    } else {
      this.expandedIndex = rowIndex;  // Nếu chưa mở rộng, click sẽ mở rộng
      this.diCustomGridRef.onExpand(rowIndex)
      if (this.rowIndexTemp !== rowIndex) {
        this.diCustomGridRef.onCollapse(this.rowIndexTemp);
      }
    }
    this.rowIndexTemp = rowIndex;
  }

  /**
   * Lọc lại ListGift, chỉ giữ lại những phần tử mà Code không trùng với gift.Code
   * @param gift 
   */
  handleDeleteGift(gift: DTOCOLPromotionGiftCus) {
    this.curRange.ListGift = this.curRange.ListGift.filter(item => item.Code !== gift.Code);
  }

  /**
   * Hàm xử lý gọi popup thêm quà tặng
   * @param rangeItem 
   */
  handleOpenAddGift(rangeItem: DTOCOPOLPromotionRangeCus) {
    this.curRange = rangeItem;
    this.addGift.emit({ isAddGift: true, item: rangeItem })
  }

  /**
  * Lọc lại ListGift, thêm gift mới vào list gift
  * @param gift 
  */
  handleAddGift(listGift: DTOCOLPromotionGiftCus[]) {
    // Thêm từng phần tử trong listGift vào curRange.ListGift
    this.curRange.ListGift = listGift;
  }

  /**
   * Hàm xử lý ảnh khi ảnh null hoặc error
   * @param event 
   */
  onImageError(event: any) {
    event.target.src = 'assets/img/default-image.jpg';
  }
  // focusInput(rowIndex: number) {
  //   const inputElement = this.inputElements.toArray()[rowIndex]?.nativeElement;
  //   if (inputElement) {
  //     inputElement.focus();
  //   }
  // }

  /**
   * Hàm xử lý khi người dùng thực hiện search
   * @param event 
   */
  handleSearch(event: any) {
    this.keyWordSearch = event.filters[0]?.value?.toLowerCase().trim();
    this.expandedIndex = null;
    this.APIGetListCOPOLPromotionRange();
  }

  /**
   * Hàm xử lý filter list range từ keyword search
   */
  handleFilterSearch() {
    let listFilteredRange: DTOCOPOLPromotionRangeCus[] = [];
    listFilteredRange = this.listRange.filter(item =>
      item.ListGift.some(gift =>
        (gift.ProductBarcode && gift.ProductBarcode.toLowerCase().includes(this.keyWordSearch)) ||
        (gift.ProductPoscode && gift.ProductPoscode.toLowerCase().includes(this.keyWordSearch)) ||
        (gift.ProductName && gift.ProductName.toLowerCase().includes(this.keyWordSearch))
      )
    );
    this.listRangeGrid = { data: listFilteredRange, total: listFilteredRange.length };
  }

  /**
   * Hàm check phân quyền
   * @returns 
   */
  handleCheckPermission(): boolean {
    let statusPromotion = this.curPromotion.StatusID;

    // Nếu đang soạn thảo hoặc trả về
    if (statusPromotion == 0 || statusPromotion == 4) {
      return this.M_C;
    }

    // Nếu gửi duyệt
    else if (statusPromotion == 1) {
      return this.M_V;
    }
  }

  /**
   * Hàm xử lý khi click import file
   */
  onImportExcel() {
    this.layoutService.setImportDialog(true);
    this.layoutService.setExcelValid(true);
    this.isImportRange = true;
    this.importRange.emit(this.isImportRange);
  }

  /**
   * Hàm xử lý export file
   */
  onExportExcel() {
    this.APIExportExcelPromotionGiftRange()
  }

  //#region API
  /**
   * API lấy danh sách hạn mức
   */
  APIGetListCOPOLPromotionRange() {
    this.isLoading = true;
    let apiText = "Danh sách quy định mức quà tặng"
    let a = this.apiMarService.GetListCOPOLPromotionRange(this.gridState, this.curPromotion.Code).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listRange = res.ObjectReturn.Data;
        this.listRangeOutput.emit(this.listRange);
        this.expandedIndex = null;

        if (Ps_UtilObjectService.hasValueString(this.keyWordSearch)) {
          this.handleFilterSearch();
        } else {
          this.listRangeGrid = { data: this.listRange, total: this.listRange.length };
        }
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * API update hạn mức
   */
  APIUpdateCOPOLPromotionRange() {
    let actionText = this.curRange.Code == 0 ? 'thêm mới' : 'cập nhật';
    let apiText = "Quy định mức quà tặng"
    this.curRange.PromotionDetail = null;

    let a = this.apiMarService.UpdateCOPOLPromotionRange(this.curRange).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`${actionText} thành công`);
        this.APIGetListCOPOLPromotionRange();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${actionText} ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi ${actionText} ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * API delete hạn mức
   */
  APIDeleteCOPOLPromotionRange() {
    let apiText = "Quy định mức quà tặng"

    let a = this.apiMarService.DeleteCOPOLPromotionRange(this.curRange).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Xóa ${apiText} thành công`);
        this.APIGetListCOPOLPromotionRange();
        this.onCloseDialogDelete()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * API xóa nhiều hạn mức
   */
  APIDeleteListCOPOLPromotionRange() {
    let apiText = "Quy định mức quà tặng"

    let a = this.apiMarService.DeleteListCOPOLPromotionRange(this.listRangeSelected).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.layoutService.onSuccess(`Xóa ${apiText} thành công`);
        this.diCustomGridRef.clearSelection();
        this.APIGetListCOPOLPromotionRange();
        this.onCloseDialogDelete()
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * API delete quà tặng 
   * @param itemGift 
   */
  APIDeleteCOPOLPromotionGift(itemGift: DTOCOLPromotionGiftCus) {
    let apiText = "quà tặng"
    let a = this.apiMarService.DeleteCOPOLPromotionGift(itemGift).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOResponse) => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.handleDeleteGift(itemGift);
        this.layoutService.onSuccess(`Xóa ${apiText} thành công`);
        // this.APIGetListCOPOLPromotionRange();
      }
      else {
        this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${apiText}: ${err}`);
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * API xuất template hạn mức
   */
  APIExportExcelPromotionGiftRange() {
    this.isLoading = true
    var ctx = "Export Excel Danh sách sản phẩm trong chương trình"
    var getfileName = 'COPOLPromotionRangeTemplate.xlsx'
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)

    let a = this.layoutApiService.GetTemplate(getfileName).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (res != null) {
        Ps_UtilObjectService.getFile(res, getfileName)
        this.layoutService.onSuccess(`${ctx} thành công`)
      } else {
        this.layoutService.onError(`${ctx} thất bại`)
      }
      this.isLoading = false;
    }, f => {
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f.error.ExceptionMessage)
      this.isLoading = false;
    });
    this.arrUnsubscribe.push(a);
  }

  /**
   * API import file hạn mức
   * @param file 
   */
  APIImportCOPOLPromotionGiftRange(file) {
    var ctx = "Import Excel"

    let a = this.apiMarService.ImportCOPOLPromotionGiftRange(this.curPromotion.Code, file).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.APIGetListCOPOLPromotionRange();
        this.isImportRange = false;

        this.layoutService.onSuccess(`${ctx} thành công`)
        this.layoutService.setImportDialogMode(1)
        this.layoutService.setImportDialog(false)
        this.layoutService.getImportDialogComponent().inputBtnDisplay()
      } else {
        const arr = res.ObjectReturn as DTOListProp_ObjReturn[]
        let importComponent = this.layoutService.getImportDialogComponent()

        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`)
        importComponent.importGridDSView.next({ data: arr, total: arr?.length })
      }
    }, (error) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`)
      // this.loading = false;
    })
    this.arrUnsubscribe.push(a);
  }

  onCloseDialogDelete() {
    this.isShowDeleteRangeDialog = false
  }

  DeleteRange() {
    if (this.isDeleteManyRange) {
      this.APIDeleteListCOPOLPromotionRange()
    } else {
      this.APIDeleteCOPOLPromotionRange()
    }
    this.isDeleteManyRange = false
  }

  arrUnsubscribe: Subscription[] = [];
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.arrUnsubscribe.forEach((sub) => {
      if (sub && sub.unsubscribe) {
        sub?.unsubscribe();
      }
    })
  }
}
