import { Component, OnInit, ViewChild } from '@angular/core';
import { DTOQuestion } from '../../shared/dto/DTOQuestion.dto';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { FilterDescriptor, State } from '@progress/kendo-data-query';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { QuestionGroupAPIService } from '../../shared/services/question-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GridDataResult, SelectableSettings } from '@progress/kendo-angular-grid';
import { MenuDataItem, ModuleDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { PayslipService } from '../../shared/services/payslip.service';

@Component({
  selector: 'app-hri008-question-bank-list',
  templateUrl: './hri008-question-bank-list.component.html',
  styleUrls: ['./hri008-question-bank-list.component.scss']
})
export class Hri008QuestionBankListComponent  implements OnInit {

  @ViewChild('search', { static: false }) searchComponent: any;

  /**
  * Trạng thái dữ liệu (State) của Grid
  * @type {State}
  */
  gridState: State = { 
    skip: 0, 
    take: 25, 
    filter: { logic: 'or', filters: [] } 
  };

  gridData: GridDataResult = { data: [], total: 0 };

  dataQuestion: DTOQuestion = new DTOQuestion();

  // Biến loading
  isLoading: boolean = false

  // Biến xử lý tìm kiếm
  searchKey: string = ''

  // Biến quản lý checkbox
  isCheckedStatus0: boolean = false;
  isCheckedStatus1: boolean = false;
  isCheckedStatus2: boolean = false;
  isCheckedStatus3: boolean = false;

  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  };
  allowActionDropdown = ['detail'];

  // Biến move question
  changeModuleData: Subscription;

  // Biến Dropdown
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function
  onPageChangeCallback: Function
  onSelectCallback: Function;

  // Biến phân quyền
  justLoadedChangePermissionAPI: boolean = true

  //dto form
  apiQuestionForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    Remark: new FormControl(''),
    CategoryName: new FormControl(''),
    Duration: new FormControl(0),
    StatusName: new FormControl(0), 
  })

  // Biến disabled
  isFilterActive: boolean = true;

  // Biến unsubcribe
  ngUnsubscribe = new Subject<void>();

  constructor( 
      public menuService: PS_HelperMenuService,
      private hriAPIService: QuestionGroupAPIService,
      public layoutService: LayoutService,
      public servicePayslip: PayslipService,
  ) {}

  ngOnInit(): void { 
    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false;
        this.isCheckedStatus0 = true;
        this.isCheckedStatus2 = true;
        this.APIGetListQuestion(this.gridState);
      }
    });

    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
    this.onPageChangeCallback = this.onPageChange.bind(this)
    this.onSelectCallback = this.onSelectChange.bind(this)
  }

  // Hàm xử lý khi ấn vào breadcrumb
  reloadData(){
    this.searchComponent.value = '';
    this.isCheckedStatus0 = true;
    this.isCheckedStatus1 = false;
    this.isCheckedStatus2 = false;
    this.isCheckedStatus3 = false;
    this.APIGetListQuestion(this.gridState)
  }

  onAdd() {
    this.dataQuestion = new DTOQuestion();
    this.onOpenDetail();
  }

  onOpenDetail() {
     this.changeModuleData = this.menuService
      .changeModuleData()
      .subscribe((item: ModuleDataItem) => {
        this.servicePayslip.setCacheQuestion(this.dataQuestion);
        var parent = item.ListMenu.find(
          (f) =>
            f.Code.includes('hriCompetency')
        );

        if (
          Ps_UtilObjectService.hasValue(parent) &&
          Ps_UtilObjectService.hasListValue(parent.LstChild)
        ) {
          var detail = parent.LstChild.find(
            (f) =>
              f.Code.includes('hri008-question-bank-list') ||
              f.Link.includes('hr008-question-bank-list')
          );

          if (
            Ps_UtilObjectService.hasValue(detail) &&
            Ps_UtilObjectService.hasListValue(detail.LstChild)
          ) {
            var detail2 = detail.LstChild.find(
              (f) =>
                f.Code.includes('hri008-question-bank-detail') ||
                f.Link.includes('hri008-question-bank-detail')
            );
            this.menuService.activeMenu(detail2);

          }
        }
      });
  }

  // Hàm xử lý reset
  onResetFilter() {
    this.isCheckedStatus0 = true;
    this.isCheckedStatus1 = false;
    this.isCheckedStatus2 = false;
    this.isCheckedStatus3 = false;
    this.APIGetListQuestion(this.gridState)
  }

  // Hàm xử lý tìm kiếm
  onSearch(keySearch: string) {
    this.searchKey = keySearch.trim().replace(/[\/.]/g, ''); 
    this.APIGetListQuestion(this.gridState);
  }


  // Hàm xử lý khi tích vào checkbox
  onFilterCheckboxChange(type: 'dangSoanThao' | 'guiDuyet' | 'daDuyet' | 'ngungApDung') {
    if (type === 'dangSoanThao') {
      this.isCheckedStatus0 = !this.isCheckedStatus0;
    }
    if (type === 'guiDuyet') {
      this.isCheckedStatus1 = !this.isCheckedStatus1;
    }
    if (type === 'daDuyet') {
      this.isCheckedStatus2 = !this.isCheckedStatus2;
    }
    if (type === 'ngungApDung') {
      this.isCheckedStatus3 = !this.isCheckedStatus3;
    }
    this.APIGetListQuestion(this.gridState);
  }


  // Hàm build filter
  buildFilters(): any {
    const statusFilters: any[] = [];

    // --- checkbox ---
    if (this.isCheckedStatus0) {
      statusFilters.push({
        logic: 'or',
        filters: [
          { field: 'StatusID', operator: 'eq', value: 0 },
          { field: 'StatusID', operator: 'eq', value: 4 }
        ]
      });
    }
    if (this.isCheckedStatus1) {
      statusFilters.push({ field: 'StatusID', operator: 'eq', value: 1 });
    }
    if (this.isCheckedStatus2) {
      statusFilters.push({ field: 'StatusID', operator: 'eq', value: 2 });
    }
    if (this.isCheckedStatus3) {
      statusFilters.push({ field: 'StatusID', operator: 'eq', value: 3 });
    }

    // --- search ---
    let searchFilter: any | null = null;
    if (this.searchKey) {
      searchFilter = {
        logic: 'or',
        filters: [
          { field: 'Remark', operator: 'contains', value: this.searchKey },
          { field: 'QuestionID', operator: 'contains', value: this.searchKey }
        ]
      };
    }

    // --- trường hợp kết hợp ---
    if (statusFilters.length > 0 && searchFilter) {
      // Có checkbox → AND với search
      return {
        logic: 'and',
        filters: [
          { logic: 'or', filters: statusFilters },
          searchFilter
        ]
      };
    } else if (statusFilters.length > 0) {
      // Chỉ checkbox
      return { logic: 'or', filters: statusFilters };
    } else if (searchFilter) {
      // Chỉ search
      return searchFilter;
    } else {
      // Không có gì
      return { logic: 'and', filters: [] };
    }
  }

  // API lấy grid question
  APIGetListQuestion (state: State) {
    let ctx = 'Lấy danh sách câu hỏi'
    this.isLoading = true;

    if (!state.take) { state.take = 25; }
    if (!state.skip) { state.skip = 0; }
    
    state.filter = this.buildFilters();

    this.hriAPIService.GetListQuestion(state).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if ( Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.gridData = {
          data: res.ObjectReturn.Data,   // danh sách item của trang
          total: res.ObjectReturn.Total // tổng số bản ghi trong DB
        };
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`);
      }
      this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
      }
    );
  }

  // Hàm chọn page
  onPageChange(event: any) {
    this.gridState.skip = event.skip;
    this.gridState.take = event.take;
    this.APIGetListQuestion(this.gridState);
  }

  /**
   * Xử lý khi người dùng chọn action từ dropdown.
   *
   * @param menu Action được chọn.
   * @param item Dữ liệu đơn vị đóng gói liên quan.
   */
  onActionDropdownClick(menu: MenuDataItem, item: DTOQuestion) { 
    console.log("Chọn action:", menu, "cho câu hỏi:", item);
  }

  /**
   * Tạo danh sách action cho dropdown dựa trên quyền của người dùng.
   *
   * @param moreActionDropdown Mảng chứa các action menu.
   * @returns Danh sách action menu sau khi xử lý.
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: DTOQuestion) {
    moreActionDropdown = [];
     this.dataQuestion = { ...dataItem };
    var statusID = this.dataQuestion.StatusID;
    const ctx = 'câu hỏi';

    if (statusID === 0) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true, LstChild: [], });
      moreActionDropdown.push({ Name: "Gửi duyệt", Code: "redo", Link: "redo", Actived: true });
      moreActionDropdown.push({ Name: "Xóa", Code: "trash", Link: "delete", Actived: true });
    } else if (statusID === 1) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true });
      moreActionDropdown.push({ Name: "Phê duyệt", Code: "check-outline", Link: "check-outline", Actived: true });
      moreActionDropdown.push({ Name: "Trả về", Code: "undo", Link: "undo", Actived: true });
    } else if (statusID === 2) {
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true });
      moreActionDropdown.push({ Name: "Ngưng áp dụng", Code: "minus-outline", Link: "minus-outline", Actived: true });
    } else if (statusID === 3) {
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true });
      moreActionDropdown.push({ Name: "Phê duyệt", Code: "eye", Link: "view", Actived: true });
      moreActionDropdown.push({ Name: "Trả về", Code: "undo", Link: "undo", Actived: true });
    } else if (statusID === 4) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true });
      moreActionDropdown.push({ Name: "Gửi duyệt", Code: "redo", Link: "redo", Actived: true });
    }

    return moreActionDropdown;
  }

  onSelectChange(isSelectedRowitemDialogVisible) {
    this.isFilterActive = !isSelectedRowitemDialogVisible;
  }

  getSelectionPopupCallback = (selectedRows: any[]) => {
    const btnList: MenuDataItem[] = [];

    if (!selectedRows || selectedRows.length === 0) {
      return btnList;
    }

    // Duyệt qua tất cả row được chọn
    selectedRows.forEach(row => {
      const status = row.StatusID;
      let actions: MenuDataItem[] = [];

      if (status === 0) {
        actions = [
          { Name: "Gửi duyệt", Code: "redo", Link: "redo", Actived: true },
          { Name: "Xóa", Code: "trash", Link: "delete", Actived: true }
        ];
      } else if (status === 1) {
        actions = [
          { Name: "Phê duyệt", Code: "check-outline", Link: "check-outline", Actived: true },
          { Name: "Trả về", Code: "undo", Link: "undo", Actived: true }
        ];
      } else if (status === 2) {
        actions = [
          { Name: "Ngưng áp dụng", Code: "minus-outline", Link: "minus-outline", Actived: true }
        ];
      } else if (status === 3) {
        actions = [
          { Name: "Phê duyệt", Code: "check-outline", Link: "check-outline", Actived: true },
          { Name: "Trả về", Code: "undo", Link: "undo", Actived: true  }
        ];
      } else if (status === 4) {
        actions = [
          { Name: "Gửi duyệt", Code: "redo", Link: "redo", Actived: true },
        ]
      }

      // Gộp action lại, tránh trùng
      actions.forEach(a => {
        if (!btnList.find(b => b.Link === a.Link)) {
          btnList.push(a);
        }
      });
    });

    return btnList;
  };

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

}
