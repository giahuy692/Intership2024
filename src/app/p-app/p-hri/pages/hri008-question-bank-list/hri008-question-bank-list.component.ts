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
import { MarBannerAPIService } from 'src/app/p-app/p-marketing/shared/services/marbanner-api.service';

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

  // Biến data của DTO Question
  dataQuestion: DTOQuestion = new DTOQuestion();

  // Biến loading
  isLoading: boolean = false

  // Biến Import & Export
  excelValid: boolean = true

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
  onSelectCallback: Function
  onSelectedPopupBtnCallback: Function
  getSelectionPopupCallback: Function
  uploadEventHandlerCallback: Function

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

  // Biến danh sách question
  arrQuestion: DTOQuestion [] = []

  // Biến unsubcribe
  ngUnsubscribe = new Subject<void>();

  // Biến dialog
  openedDialog: boolean = false;

  constructor( 
      public menuService: PS_HelperMenuService,
      private hriAPIService: QuestionGroupAPIService,
      public layoutService: LayoutService,
      public servicePayslip: PayslipService,
      private questionApiService: QuestionGroupAPIService,
      public apiService: MarBannerAPIService,
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
    this.onSelectedPopupBtnCallback = this.onSelectedPopupBtnClick.bind(this)
    this.getSelectionPopupCallback = this.onGetSelectionPopup.bind(this);
    this.uploadEventHandlerCallback = this.onUploadEventHandler.bind(this);
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
  
  // Hàm xử lý khi ấn btn thêm mới
  onAdd() {
    this.dataQuestion = new DTOQuestion();
    this.onOpenDetail();
  }

  // Hàm điều hướng qua trang khác
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
  * Tạo danh sách action cho dropdown dựa trên row (DTOQuestion).
  *
  * @param moreActionDropdown Mảng chứa các action menu.
  * @param item Câu hỏi đang chọn.
  * @returns Danh sách action menu sau khi xử lý.
  */
  getActionDropdown(moreActionDropdown: MenuDataItem[], item: DTOQuestion) {
    moreActionDropdown = [];

    if (!item) {
      return moreActionDropdown;
    }

    const statusID = item.StatusID;

    if (statusID === 0) {
      moreActionDropdown.push(
        { Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true, Type: "StatusID" },
        { Name: "Gửi duyệt", Code: "redo", Link: "1", Actived: true, Type: "StatusID" },
        { Name: "Xóa", Code: "trash", Link: "delete", Actived: true, Type: "StatusID" }
      );
    } else if (statusID === 1) {
      moreActionDropdown.push(
        { Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true, Type: "StatusID" },
        { Name: "Phê duyệt", Code: "check-outline", Link: "2", Actived: true, Type: "StatusID" },
        { Name: "Trả về", Code: "undo", Link: "4", Actived: true, Type: "StatusID" }
      );
    } else if (statusID === 2) {
      moreActionDropdown.push(
        { Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true, Type: "StatusID" },
        { Name: "Ngưng áp dụng", Code: "minus-outline", Link: "3", Actived: true, Type: "StatusID" }
      );
    } else if (statusID === 3) {
      moreActionDropdown.push(
        { Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true, Type: "StatusID" },
        { Name: "Phê duyệt", Code: "check-outline", Link: "2", Actived: true, Type: "StatusID" },
        { Name: "Trả về", Code: "undo", Link: "4", Actived: true, Type: "StatusID" }
      );
    } else if (statusID === 4) {
      moreActionDropdown.push(
        { Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true, Type: "StatusID" },
        { Name: "Gửi duyệt", Code: "redo", Link: "1", Actived: true, Type: "StatusID" }
      );
    }

    return moreActionDropdown;
  }

  /**
   * Xử lý khi người dùng chọn action từ dropdown.
   *
   * @param menu Action được chọn.
   * @param item Dữ liệu đơn vị đóng gói liên quan.
   */
  // Action dropdownlist
  onActionDropdownClick(menu: MenuDataItem, item: DTOQuestion) {
    if (!menu?.Code) return;

    if (menu.Link === 'delete' || menu.Code === 'trash') {
      if (item?.StatusID === 0) {
        this.arrQuestion = [item];
        this.openedDialog = true;
      }
      return;
    }

    // Xử lý mở detail
    if (menu.Link === 'edit' || menu.Code === 'pencil' || menu.Code === 'eye' || menu.Link === 'view') {
      this.dataQuestion = item;
      this.onOpenDetail();
    }

    // Xử lý cập nhật trạng thái
    if (menu.Type === 'StatusID') {
      this.dataQuestion = { ...item, StatusID: parseInt(menu.Link, 10) };

      let listdataUpdate: DTOQuestion[] = [];

      switch (menu.Link) {
        case '1': // Gửi duyệt: chỉ StatusID 0 | 4
          if (item.StatusID === 0 || item.StatusID === 4) {
            listdataUpdate.push(this.dataQuestion);
          }
          break;

        case '2': // Phê duyệt: chỉ StatusID 1 | 3
          if (item.StatusID === 1 || item.StatusID === 3) {
            listdataUpdate.push(this.dataQuestion);
          }
          break;

        case '3': // Ngưng áp dụng: chỉ StatusID 2
          if (item.StatusID === 2) {
            listdataUpdate.push(this.dataQuestion);
            console.log(listdataUpdate);
          }
          break;

        case '4': // Trả về: chỉ StatusID 1 | 3
          if (item.StatusID === 1 || item.StatusID === 3) {
            listdataUpdate.push(this.dataQuestion);
          }
          break;
      }

      if (listdataUpdate.length > 0) {
        this.APIUpdateQuestionStatus(listdataUpdate, this.dataQuestion.StatusID);
      }
      return;
    }
  }

  // Hàm xử lý khi chọn page
  onSelectChange(isSelectedRowitemDialogVisible) {
    this.isFilterActive = !isSelectedRowitemDialogVisible;
  }

  // Hàm xử lý hiện popup khi chọn row
  onGetSelectionPopup = (selectedRows: DTOQuestion[]) => {
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
          { Name: "Gửi duyệt", Code: "redo", Link: "1", Actived: true, Type: "StatusID" },
          { Name: "Xóa", Code: "trash", Link: "delete", Actived: true, Type: "StatusID" }
        ];
      } else if (status === 1) {
        actions = [
          { Name: "Phê duyệt", Code: "check-outline", Link: "2", Actived: true, Type: "StatusID" },
          { Name: "Trả về", Code: "undo", Link: "4", Actived: true, Type: "StatusID" }
        ];
      } else if (status === 2) {
        actions = [
          { Name: "Ngưng áp dụng", Code: "minus-outline", Link: "3", Actived: true, Type: "StatusID" }
        ];
      } else if (status === 3) {
        actions = [
          { Name: "Phê duyệt", Code: "check-outline", Link: "2", Actived: true, Type: "StatusID" },
          { Name: "Trả về", Code: "undo", Link: "4", Actived: true, Type: "StatusID" }
        ];
      } else if (status === 4) {
        actions = [
          { Name: "Gửi duyệt", Code: "redo", Link: "1", Actived: true, Type: "StatusID" },
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

  onSelectedPopupBtnClick(btnType: string, list: any[], value: any) {
    if (!list || list.length === 0) return;

    // Nếu nút là Xóa
    if (value === 'delete' || value === 'trash') {
      const listDataDelete = list.filter(
        item => item.StatusID === 0 && item.ListCompetence.length === 0
      );

      if (listDataDelete.length > 0) {
        this.arrQuestion = listDataDelete;
        this.openedDialog = true;
      }
    } 
    // Nếu nút là update trạng thái
    else {
      const status = parseInt(value, 10);
      let validStatuses: number[] = [];

      switch (status) {
        case 1: validStatuses = [0, 4]; break;  // Gửi duyệt
        case 2: validStatuses = [1, 3]; break;  // Phê duyệt
        case 3: validStatuses = [2]; break;     // Ngưng áp dụng
        case 4: validStatuses = [1, 3]; break;  // Trả về
      }

      const listDataUpdate = list.filter(item => validStatuses.includes(item.StatusID));
      if (listDataUpdate.length > 0) {
        this.APIUpdateQuestionStatus(listDataUpdate, status);
      }
    }
  }



  //#region dialog
  //Hàm đóng dialog
  public onCloseDialog(): void {
    this.openedDialog = false;
  }

  // Hàm xử lý xóa dialog
  onDeleteDialog(status: string): void {
    if (status == 'yes') {
      this.APIDeleteQuestion(this.arrQuestion);
      this.openedDialog = false;
    } else {
      this.openedDialog = false;
    }
  }

  //#endregion

  //#region API
  // Hàm gọi api update question status
  APIUpdateQuestionStatus(dto: DTOQuestion[], statusID: number) {
    this.isLoading = true;
    this.questionApiService
      .UpdateQuestionStatus(dto, statusID)
      .subscribe(
        (res: any) => {
          if (res.ErrorString != null && res.StatusCode !== 0) {
            this.isLoading = false;
            this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái của câu hỏi: ${res.ErrorString}`);
            this.APIGetListQuestion(this.gridState);
          }
          if (
            Ps_UtilObjectService.hasValue(res) &&
            Ps_UtilObjectService.hasValue(res.ObjectReturn) &&
            res.StatusCode == 0
          ) {
            this.isLoading = false;
            this.layoutService.onSuccess(
              'Cập nhật trạng thái câu hỏi thành công!'
            );
            this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
            this.APIGetListQuestion(this.gridState);
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật trạng thái của câu hỏi: ${error}`);
          this.APIGetListQuestion(this.gridState);
        }
      );
  }

  // Hàm gọi api xóa question
  APIDeleteQuestion(arr: DTOQuestion[]) {
    this.isLoading = true;
    this.questionApiService
      .DeleteQuestion(arr)
      .subscribe(
        (res: any) => {
          if (res.ErrorString != null && res.StatusCode !== 0) {
            this.isLoading = false;
            this.layoutService.onError(`Đã xảy ra lỗi khi xóa câu hỏi: ${res.ErrorString}`);
            this.APIGetListQuestion(this.gridState);
          }
          if (
            Ps_UtilObjectService.hasValue(res) &&
            Ps_UtilObjectService.hasValue(res.ObjectReturn) &&
            res.StatusCode == 0
          ) {
            this.layoutService.onSuccess('Xóa câu hỏi thành công');
            this.layoutService.getSelectionPopupComponent().closeSelectedRowitemDialog();
            this.APIGetListQuestion(this.gridState);
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi xóa câu hỏi: ${error}`);
          this.APIGetListQuestion(this.gridState);
        }
      );
  }

  //#endregion

  // Hàm mở popup upload file
  onUploadFile() {
    this.layoutService.setImportDialog(true)
    this.layoutService.setExcelValid(this.excelValid)
  }

  // Hàm gọi api download file
  onDownloadFile() {
    var ctx = "Download Excel Template"
    var getfilename = "QuestionBankTemplate.xlsx"
    this.layoutService.onInfo(`Đang xử lý ${ctx}`)
      this.apiService.GetTemplate(getfilename).subscribe(res => {
      if (res != null) {
        Ps_UtilObjectService.getFile(res)
        this.layoutService.onSuccess(`${ctx} thành công`);
      }
      this.isLoading = false;
    }, f => {
      this.layoutService.onError(`Xảy ra lỗi khi ${ctx}. ` + f.error.ExceptionMessage)
      this.isLoading = false;
    });
  }

  // Hàm xử lý sự kiện upload file
  onUploadEventHandler(e: File) {
    this.APIImportExcelQuestionBank(e);
  }

  // Hàm gọi API Import file
  APIImportExcelQuestionBank(file) {
    this.isLoading = true
    var ctx = "Import Excel"
    this.questionApiService.ImportExcelQuestionBank(file).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res)) {
        this.APIGetListQuestion(this.gridState);
        this.layoutService.onSuccess(`${ctx} thành công`);
        this.layoutService.setImportDialogMode(1);
        this.layoutService.setImportDialog(false);
        this.layoutService.getImportDialogComponent().inputBtnDisplay();
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${err}`)
      this.isLoading = false; 
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

}
