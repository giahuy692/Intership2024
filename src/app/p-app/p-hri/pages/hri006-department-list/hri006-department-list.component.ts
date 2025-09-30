import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SelectableSettings, TreeListComponent } from '@progress/kendo-angular-treelist';
import { Subject } from 'rxjs';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTODepartment } from '../../shared/dto/DTODepartment.dto';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { DTOPosition } from '../../shared/dto/DTOPosition.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { takeUntil } from 'rxjs/operators';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { OrganizationAPIService } from '../../shared/services/organization-api.service';
import { DTOAction } from 'src/app/p-app/p-developer/shared/dto/DTOAction';
import { DTOModule } from 'src/app/p-app/p-developer/shared/dto/DTOModule';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { DTOLocation } from '../../shared/dto/DTOLocation.dto';
import { DTOStatus } from 'src/app/p-app/p-layout/dto/DTOStatus';

@Component({
  selector: 'app-hri006-department-list',
  templateUrl: './hri006-department-list.component.html',
  styleUrls: ['./hri006-department-list.component.scss']
})
export class Hri006DepartmentListComponent implements OnInit {
  @ViewChild('formDrawer') public drawer: MatDrawer;
  @ViewChildren('anchor') anchors;
  @ViewChild('myTreeList') treelist: TreeListComponent;

  // Biến trạng thái loading
  isLoading: boolean = false;

  // Biến để quản lý popup
  popupShow: boolean = false;

  // data
  listActionTree: DTOAction[] = []
  listModuleTree: DTOModule[] = []
  fullListModuleTree: DTOModule[] = []
  defaultParent = { Code: null, Department: '-- Không lựa chọn --', ListDepartment: [] };

  ListStatus: DTOStatus[] = [];
  listPosition: Array<{ Code: number, Position: string }> = [];
  listPositionGroup: Array<{ Code: number, ListName: string }> = [];
  listPositionRole: Array<{ Code: number, ListName: string }> = [];
  ListLocation: Array<{ Code: number, LocationName: string}> = [];

  // Biến trạng thái để hiển thị dialog Bộ phận và Chức danh
  isDialogDepartment: boolean = false;
  isDialogPosition: boolean = false;

  // Biến để quản lý sự kiện thay đổi quyền API
  justLoadedChangePermissionAPI: boolean = true;

  // Biến trạng thái checkbox
  isApproved: boolean = false;
  isStopped: boolean = false;
  isNew: boolean = false;
  isSent: boolean = false;

  // Biến để quản lý chọn form
  selectedForm: 'department' | 'position';

  // Biến để quản lý anchor hiện tại
  currentAnchorIndex: number = -1;
  topValue: string = 'top';

  //Permission variables
  justLoadedPer: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isAllPers: boolean = false;
  isCanCreate: boolean = false;

  // Biến để quản lý việc hủy đăng ký các Observable
  ngUnsubscribe = new Subject<void>();

  // Biến để quản lý danh sách cơ cấu tổ chức
  listDepartmentTree: DTODepartment[] = [];

  /**
  * Trạng thái dữ liệu (State) của TreeList
  * @type {State}
  */
  treeStateDepartment: State = { filter: { logic: 'and', filters: [] } };

  // Biến để quản lý danh sách các item đã chọn
  settingsTreelist: SelectableSettings = {
    enabled: true,
    mode: 'row',
    multiple: false,
    drag: true,
  };

  // Biến để quản lý form hiện tại
  currentDepartmentForm: DTODepartment = new DTODepartment();
  currentPositionForm: DTOPosition = new DTOPosition();
  currentDrawer: string = null; // drawer hiện tại

  // Biến để quản lý dữ liệu gốc và dữ liệu đã lọc
  rootData: Array<DTODepartment | DTOPosition> = [];

  // search
  searchValue: State = { filter: { filters: [], logic: 'or' } };

  // Biến để quản lý danh sách menu dropdown
  menuItemList: any[] = [];

  // Biến để quản lý item đã chọn trong treelist
  isDepartmentSelected: boolean = false;
  isPositionSelected: boolean = false;

  // Biến để quản lý trạng thái disable của các trường Department và các trường Position
  isDepartmentIdDisabled: boolean = false;
  isPositionIdDisabled: boolean = false;
  isFeildDisabled: boolean = false;

  //reset expand tree
  collapsedIds: any[];

  //dto form Department
  apiDepartmentForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    ParentID: new FormControl<number | null>(null, []),
    ParentCode: new FormControl(''),
    DepartmentID: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    Department: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    Brieft: new FormControl(''),
    Phone: new FormControl(''),
    Fax: new FormControl(''),
    OrderBy: new FormControl(),
    Config: new FormControl(),
    Remark: new FormControl(''),
    StatusID: new FormControl(0),
    StatusName: new FormControl('Đang soạn thảo'),
    ListLocationCode: new FormControl(''),
    ListDepartment: new FormControl([]),
    ListPosition: new FormControl([]),
    ListLocation: new FormControl<any[]>([], [Validators.required]),
  });

  //dto form Position
  apiPositionFrom: FormGroup = new FormGroup({
    Code: new FormControl(0),
    ReportTo: new FormControl(null),
    ReportToCode: new FormControl(''),
    DepartmentID: new FormControl(null),
    DepartmentCode: new FormControl(''),
    GroupPosition: new FormControl(null),
    GroupPositionCode: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    Position: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    PositionID: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    IsLeader: new FormControl(false),
    IsSupervivor: new FormControl(false),
    OrderBy: new FormControl(null),
    Config: new FormControl(null),
    Remark: new FormControl(''),
    StatusID: new FormControl(0),
    StatusName: new FormControl('Đang soạn thảo'),
    ListOfRoles: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    ListChild: new FormControl([]),
  });

  isDetailMode = false;

  constructor(
    private organizationAPIService: OrganizationAPIService,
    public menuService: PS_HelperMenuService,
    public layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private layoutAPIService: LayoutAPIService
  ) { }


  ngOnInit(): void {
    let that = this;
    // phân quyền
    this.menuService
      .changePermission()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: DTOPermission) => {
        if (Ps_UtilObjectService.hasValue(res) && that.justLoadedPer) {
          that.actionPerm = distinct(res.ActionPermission, 'ActionType');
          that.isAllPers = that.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
          that.isCanCreate = that.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
          that.justLoadedPer = false;
        }
      });

    this.menuService
      .changePermissionAPI()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        if (
          Ps_UtilObjectService.hasValue(res) &&
          this.justLoadedChangePermissionAPI
        ) {
          this.justLoadedChangePermissionAPI = false;
          this.APIGetListStatus();
          this.loadDepartment();
        }
      });
  }

  //breadcrumb
  loadDepartment() {
    this.isApproved = true;
    this.isNew = true;
    this.APIGetListDepartmentTree();
  }

  // region Tìm kiếm và Lọc
  /**
   * Đặt lại toàn bộ bộ lọc và tải lại dữ liệu gốc.
   *
   * @param {Event} e - Sự kiện click nút reset filter.
   *
   * - Mở lại tất cả các node trong TreeList.
   * - Reset các biến chọn tỉnh, quận/huyện, về checkbox áp dụng.
   * - Gọi loadData() để tải lại dữ liệu.
   * - Hiển thị trạng thái loading trong 250ms.
   */
  onResetFilter(e) {
    if (Ps_UtilObjectService.hasListValue(this.collapsedIds)) {
      for (const id of this.collapsedIds) {
        this.treelist.expand(id);
      }
    }
    this.isApproved = true;
    this.isNew = true;

    this.loadData();
    this.currentDepartmentForm = null;
    this.isDepartmentSelected = false;
    this.isPositionSelected = false;
  }

  // Xử lý tìm kiếm
  onSearchValueName(e) {
    this.searchValue.filter.filters = e.filters;
    this.loadData();
  }

  // Xử lý checkbox filter
  onFilterCheckboxChange(type: 'new' | 'sent' | 'approved' | 'stopped', checked: boolean) {
    switch (type) {
      case 'new':
        this.isNew = checked;
        break;
      case 'sent':
        this.isSent = checked;
        break;
      case 'approved':
        this.isApproved = checked;
        break;
      case 'stopped':
        this.isStopped = checked;
        break;
    }

    this.loadData();
    this.isDepartmentSelected = false;
    this.isPositionSelected = false;
  }


  // Tìm kiếm trong cây
  searchTree(dataList, targetCode) {
    for (const item of dataList) {
      if (item.Code === targetCode) {
        return item;
      }

      if (item.ListPosition && item.ListPosition.length > 0) {
        const foundItem = this.searchTree(item.ListPosition, targetCode);
        if (foundItem) {
          return foundItem;
        }
      }
    }

    return null;
  }
  //endRegion

  // region Action Form
  /**
   * Mở form thêm mới tỉnh/thành phố.
   * - Reset form province
   * - Mở drawer chứa form nhập liệu.
   */
  onAddNewDepartment() {
    this.selectedForm = 'department';
    const parentObj = this.listDepartmentTree.find(
      (x: any) => x.Code === this.currentDepartmentForm?.Code
    );

    this.apiDepartmentForm.reset({
      Code: 0,
      DepartmentID: '',
      Department: '',
      // ParentID: parentObj ?? null,
      ListLocation: null, // patch mặc định
      StatusID: 0,
      StatusName: 'Đang soạn thảo'
    });

    if (parentObj) {
      this.apiDepartmentForm.patchValue({ ParentID: parentObj });

    }

    this.isDepartmentIdDisabled = false;
    const dtoLocation = new DTOLocation();
    dtoLocation.Code = 0; 
    this.APIGetListLocation(dtoLocation);
    this.APIGetListDepartment();
    this.drawer.open();
  }

  isStatusDisabled = (item: any): boolean => {
    console.log('Check item:', item, 'OrderBy typeof:', typeof item.OrderBy);
    if (!item || !item.dataItem) return false;
    // chỉ cho phép OrderBy = 0 hoặc 1 
    return !(item.dataItem.OrderBy === 0 || item.dataItem.OrderBy === 1);
  };

  onAddNewChildDepartment() {
    this.selectedForm = 'department';

    this.apiDepartmentForm.reset({
      Code: 0,
      DepartmentID: '',
      Department: '',
      ParentID: this.currentDepartmentForm?.Code ?? null,
      ListLocation: null,
      StatusID: 0,
      StatusName: 'Đang soạn thảo'
    });

    this.isDepartmentIdDisabled = false;
    this.drawer.open();
  }

  // Hàm mở form add Position
  onAddNewPosition(positionItem?: DTOPosition) {
    this.selectedForm = 'position';
    this.currentPositionForm = null;

    let departmentCode: number | null = null;

    if (Ps_UtilObjectService.hasValue(positionItem)) {
      // Nếu truyền vào Position cụ thể thì tìm Department chứa nó
      departmentCode = this.findDepartmentIdByPosition(positionItem);
    } else if (Ps_UtilObjectService.hasValue(this.currentDepartmentForm)) {
      // Nếu đang chọn Department thì lấy Code luôn
      departmentCode = this.currentDepartmentForm.Code;
    } else if (Ps_UtilObjectService.hasValue(this.currentPositionForm)) {
      // Nếu đang chọn Position thì tìm Department chứa Position đó
      departmentCode = this.findDepartmentIdByPosition(this.currentPositionForm);
    }
    
    const dept = this.listDepartmentTree.find(
      (d: any) => d.Code === departmentCode
    );
    // Reset form, set Department cho Position mới
    this.apiPositionFrom.reset({
      Code: 0,
      OrderBy: 1,
      DepartmentID: dept ?? null,
    });

    this.isPositionIdDisabled = false;
    this.APIGetListPosition(departmentCode);
    this.APIGetListPositionGroup();
    this.APIGetListPositionRole();
    this.drawer.open();
  }

  // Hàm đóng form
  onCloseForm() {
    this.drawer.close();
    this.apiDepartmentForm.reset()
    this.apiPositionFrom.reset()
  }

  /**
   * Xử lý khi người dùng chọn 1 tỉnh thành từ dropdown.
   * - Tìm province tương ứng trong danh sách `listProvinceTree`.
   * - Cập nhật Form District (`apiDistrictFrom`) với mã tỉnh (Code) được chọn,
   *   chỉ lưu Code làm khóa ngoại thay vì toàn bộ object.
   *
   * @param event Mã Code của province được chọn từ dropdown.
   */
  onSelectedDropdownList(event: any) {
    this.apiDepartmentForm.patchValue({ ParentID: event });
  }

  onSelectedLocation(event: any) {
    const selected = this.ListLocation.find(loc => loc.Code === event);
    if (selected) {
      this.apiDepartmentForm.patchValue({
        ListLocation: [selected]
      });
    }
  }
  onSelectedPosition(event: number) {
    this.apiPositionFrom.patchValue({ PositionID: event });
  }

  // Xử lý sự kiện mở và đóng dialog Province
  onCloseDialogDepartment() {
    this.isDialogDepartment = false;
  }
  onOpenDialogDepartment() {
    this.isDialogDepartment = true;
  }

  // Xử lý sự kiện mở và đóng dialog District
  onCloseDialogPosition() {
    this.isDialogPosition = false;
  }
  onOpenDialogPosition() {
    this.isDialogPosition = true;
  }
  //endRegion

  //#region  Xử lý sự kiện khi chọn item trong treelist
  onSelectionChange(e: { items: { dataItem: DTODepartment | DTOPosition }[] }) {
    if (!e.items || e.items.length === 0) {
      this.currentDepartmentForm = null;
      this.currentPositionForm = null;
      this.isDepartmentSelected = false;
      this.isPositionSelected = false;
      this.listPosition = [];
      return;
    }

    const dataItem = e.items[0].dataItem;

    if ('PositionID' in dataItem) {
      const position = dataItem as DTOPosition;
      this.currentPositionForm = position;

      this.currentDepartmentForm = this.listDepartmentTree.find(
        (p: DTODepartment) => p.Code === position.DepartmentID
      ) || null;

      this.listPosition = this.currentDepartmentForm?.ListPosition || [];

      this.isDepartmentSelected = false;
      this.isPositionSelected = true;
      this.selectedForm = 'position';

    } else if ('DepartmentID' in dataItem) {
      const dept = dataItem as DTODepartment;
      this.currentDepartmentForm = dept;
      this.listPosition = dept.ListPosition || [];
      this.isDepartmentSelected = true;
      this.isPositionSelected = false;
      this.selectedForm = 'department';
    } else {
      this.currentDepartmentForm = null;
      this.currentPositionForm = null;
      this.isPositionSelected = false;
      this.isDepartmentSelected = false;
      this.listPosition = [];
    }

    this.popupShow = false;
  }

  //#endregion

  //#region API

  // Lấy API Danh sách cây hành chính
  APIGetListDepartmentTree() {
    let ctx = `Lấy danh sách Bộ phận`;
    this.isLoading = true;

    this.organizationAPIService
      .GetListDepartmentTree(this.treeStateDepartment)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.isLoading = false;

          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {

            this.listDepartmentTree = res.ObjectReturn.map((d: any) => ({
              ...d,
              ListLocation: [],   // xoá location
            }));
            this.listDepartmentTree;

            this.rootData = this.listDepartmentTree;
            this.loadData();
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
        }
      );
  }

  // Hàm tải dữ liệu
  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      const applyRecursiveFilter = (items: any[]): any[] => {
        return (items || [])
          .map(item => {
            const children = this.fetchChildren(item);
            const filteredChildren = applyRecursiveFilter(children);

            // Nếu bản thân item hoặc con của nó hợp lệ thì giữ lại
            if (this.filterFunction(item) || filteredChildren.length > 0) {
              if (Array.isArray(item.ListDepartment)) {
                return { ...item, ListDepartment: filteredChildren };
              }
              if (Array.isArray(item.ListPosition)) {
                return { ...item, ListPosition: filteredChildren };
              }
              return { ...item };
            }
            return null;
          })
          .filter(Boolean);
      };

      const filteredTree = applyRecursiveFilter(this.listDepartmentTree);

      // Áp dụng tìm kiếm nếu có
      if (Ps_UtilObjectService.hasListValue(this.searchValue.filter.filters) &&
        this.findSearchValue(this.searchValue.filter)) {
        const searchTerm = this.findSearchValue(this.searchValue.filter)
          .toLowerCase()
          .replace(/[\/.]/g, '');

        this.rootData = filteredTree
          .map(dep => {
            if (this.sanitizeAndCheck(dep.Department, searchTerm)) return dep;
            const filteredPositions = (dep.ListPosition || []).filter(pos =>
              this.sanitizeAndCheck(pos.Position, searchTerm)
            );
            if (filteredPositions.length > 0) {
              return { ...dep, ListPosition: filteredPositions };
            }
            return null;
          })
          .filter(Boolean);
      } else {
        this.rootData = filteredTree;
      }

      this.isLoading = false;
    });
  }

  // Hàm lọc dữ liệu
  filterFunction = (item: any): boolean => {
    const statusFilters: number[] = [];
    if (this.isNew) statusFilters.push(0);       // Đang soạn thảo
    if (this.isSent) statusFilters.push(1);      // Gửi duyệt
    if (this.isApproved) statusFilters.push(2);  // Đã duyệt
    if (this.isStopped) statusFilters.push(3);   // Ngưng áp dụng

    // nếu không chọn gì thì return all
    if (statusFilters.length === 0) return true;

    // nếu item có StatusID nằm trong filter thì true
    if (statusFilters.includes(item.StatusID)) return true;

    // check children (ListPosition/ListDepartment)
    if (item && 'ListPosition' in item) {
      const children = this.fetchChildren(item);
      return children.some(child => this.filterFunction(child));
    }

    return false;
  };

  // Tìm giá trị của search
  findSearchValue(filter: CompositeFilterDescriptor | FilterDescriptor): any {
    if ('value' in filter) {
      return filter.value;
    } else if ('filters' in filter && filter.filters.length > 0) {
      return this.findSearchValue(filter.filters[0]);
    }

    return null;
  }

  // Hàm kiểm tra và loại bỏ ký tự không cần thiết trong chuỗi tìm kiếm
  sanitizeAndCheck(originalString: string, searchTerm: string): boolean {
    const sanitizedString = originalString.replace(/[\/.]/g, '');
    return sanitizedString.toLowerCase().includes(searchTerm);
  }

  // Hàm lấy ra danh sách Position con của một Department
  // Trả về: Mảng các Position đã được lọc theo điều kiện filterFunction
  fetchChildren = (parent: any): any[] => {
    if (Array.isArray(parent.ListDepartment) && parent.ListDepartment.length > 0) {
      return parent.ListDepartment;
    }
    if (Array.isArray(parent.ListPosition) && parent.ListPosition.length > 0) {
      return parent.ListPosition;
    }
    return [];
  };

  // Hàm lấy ra danh sách các items (có thể là Department/Position) kèm theo property con của chúng
  // Khác với fetchChildren: hàm này trả về cả object gốc + property con đã được lọc đệ quy
  filterAndFetchChildren = (
    items: any[],
    property: string,
    parentToExclude?: any
  ): DTOPosition[] => {
    let filteredChildren: DTOPosition[] = [];

    items.forEach((item) => {
      if (item !== parentToExclude) {
        const children = this.fetchChildren(item).filter(this.filterFunction);
        filteredChildren.push({ ...item, [property]: children });
      }
    });
    return filteredChildren;
  };

  // Kiểm tra xem item có con hay không
  hasChildren = (item: any): boolean => {
    return (Array.isArray(item.ListDepartment) && item.ListDepartment.length > 0) ||
      (Array.isArray(item.ListPosition) && item.ListPosition.length > 0);
  };

  // API Update Department
  APIUpdateDepartment(dto: DTODepartment) {
    let ctx = `${dto.Code == 0 ? 'Tạo mới' : "Cập nhật"} thông tin Bộ phận`;
    this.isLoading = true;
    this.organizationAPIService
      .UpdateDepartment(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListDepartmentTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.APIGetListDepartmentTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListDepartmentTree();
        }
      );
  }

  // hàm xử lý Update Department
  onUpdateDepartment() {
    this.apiDepartmentForm.markAllAsTouched();

    // Lấy dữ liệu form
    let dto: DTODepartment = this.apiDepartmentForm.getRawValue();

    const isAddForm = Number(dto.Code) === 0;
    const ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Bộ phận`;

    // Validate bắt buộc
    if (this.apiDepartmentForm.invalid) {
      const requiredFields = [
        { name: 'Department', label: 'Tên Bộ phận' },
        { name: 'DepartmentID', label: 'Mã Bộ phận' },
        { name: 'ListLocation', label: 'Điểm làm việc' },
      ];

      const errorFields = requiredFields
        .filter(f => this.apiDepartmentForm.get(f.name)?.invalid)
        .map(f => f.label);

      const errorMessage = errorFields.length > 0
        ? `Đã xảy ra lỗi ${ctx}: Vui lòng nhập ( ${errorFields.join(', ')} )`
        : `Đã xảy ra lỗi ${ctx}: Vui lòng nhập đầy đủ thông tin bắt buộc`;

      this.layoutService.onError(errorMessage);
      return;
    }

    // Check dữ liệu có thay đổi không
    if (!isAddForm && JSON.stringify(dto) === JSON.stringify(this.currentDepartmentForm)) {
      this.layoutService.onWarning(
        `Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`
      );
      return;
    }

    // Gọi API
    this.APIUpdateDepartment(dto);
    this.isDepartmentSelected = false;
    this.isPositionSelected = false;
  }

  // Api Update Position
  APIUpdatePosition(dto: DTOPosition) {
    let ctx = `${dto.Code == 0 ? 'Tạo mới' : "Cập nhật"} thông tin Chức danh`;
    this.isLoading = true;
    this.organizationAPIService
      .UpdatePosition(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListDepartmentTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.APIGetListDepartmentTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListDepartmentTree();
        }
      );
  }

  // Hàm xử lý Update Position
  onUpdatePosition() {
    this.apiPositionFrom.markAllAsTouched();
    const updatePosition: DTOPosition = this.apiPositionFrom.getRawValue();
    const isAddForm = Number(updatePosition.Code) === 0;
    const ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Phường xã`;
    const requiredFields = [
      { name: 'VNDistrict', label: 'Tên Tiếng Việt' },
      { name: 'DistrictID', label: 'Mã hành chính' },
      { name: 'Province', label: 'Tỉnh thành' }
    ];

    if (this.apiPositionFrom.invalid) {
      const errorFields = requiredFields
        .filter(f => this.apiPositionFrom.get(f.name)?.invalid)
        .map(f => f.label);

      const errorMessage = errorFields.length > 0
        ? `Đã xảy ra lỗi ${ctx}: Vui lòng nhập ( ${errorFields.join(', ')} )`
        : `Đã xảy ra lỗi ${ctx}: Vui lòng nhập đầy đủ thông tin bắt buộc`;

      this.layoutService.onError(errorMessage);
      return;
    }

    if (!isAddForm && JSON.stringify(updatePosition) === JSON.stringify(this.currentPositionForm)) {
      this.layoutService.onWarning(
        `Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`
      );
      return;
    }

    this.APIUpdatePosition(updatePosition);
    this.isDepartmentSelected = false;
    this.isPositionSelected = false;
  }

  // API Xóa Province
  APIDeleteDepartment(dtos: DTODepartment[]) {
    let ctx = `Xóa thông tin Tỉnh thành`;
    this.isLoading = true;
    this.organizationAPIService
      .DeleteDepartment(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListDepartmentTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.APIGetListDepartmentTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListDepartmentTree();
        }
      );
  }

  // Hàm xử lý xóa Province
  onDeleteDepartment() {
    const deleteDepartment: DTODepartment = this.apiDepartmentForm.getRawValue();

    if (
      Ps_UtilObjectService.hasListValue(deleteDepartment.ListPosition)
    ) {
      this.layoutService.onError(
        `Đã xảy ra lỗi khi xóa Tỉnh thành: Không thể xóa tỉnh thành "${deleteDepartment.Department}" vì đang có ${deleteDepartment.ListPosition.length} quận/huyện trực thuộc.`
      );
    } else {
      this.APIDeleteDepartment([deleteDepartment]);
    }
    this.isDialogDepartment = false;
    this.isDepartmentSelected = false;

  }

  // API Xóa District
  APIDeletePosition(dtos: DTOPosition[]) {
    let ctx = `Xóa thông tin Quận huyện`;
    this.isLoading = true;
    this.organizationAPIService
      .DeletePosition(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListDepartmentTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.APIGetListDepartmentTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListDepartmentTree();
        }
      );
  }

  // Hàm xử lý xóa District
  onDeletePosition() {
    const deletePosition: DTOPosition = this.apiPositionFrom.getRawValue();
    if (
      Ps_UtilObjectService.hasValue(deletePosition)
    ) {
      this.APIDeletePosition([deletePosition]);
      this.isDialogPosition = false;
    }
  }

  APIGetListDepartment() {
    const dto: DTODepartment = new DTODepartment();
    this.isLoading = true;

    this.organizationAPIService
      .GetListDepartment(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            // gom tất cả ListLocation trong các department
            let allDepartments: any[] = [];
            res.ObjectReturn.forEach((dept: any) => {
              if (Array.isArray(dept.ListLocation)) {
                allDepartments = [
                  ...allDepartments,
                  ...dept.ListLocation.map((loc: any) => ({
                    Code: loc.Code,
                    Department: dept.Department,
                    LocationName: loc.LocationName
                  }))
                ];
              }
            });
            this.ListLocation = allDepartments;
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Lỗi API GetListDepartment: ${error}`);
        }
      );
  }

  APIGetListPosition(departmentId?: number) {
    const dto = new DTOPosition();
    dto.DepartmentID = departmentId ?? null;

    this.isLoading = true;
    this.organizationAPIService
      .GetListPosition(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.listPosition = res.ObjectReturn.map((p: any) => ({
              Code: p.Code,
              Position: p.Position
            }));
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Lỗi API GetListPosition: ${error}`);
        }
      );
  }

  APIGetListPositionGroup() {
    this.isLoading = true;
    this.organizationAPIService
      .GetListPositionGroup()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.listPositionGroup = res.ObjectReturn.map((g: any) => ({
              Code: g.Code,
              ListName: g.ListName
            }));
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Lỗi gọi API GetListPositionGroup: ${error}`);
        }
      );
  }

  APIGetListPositionRole() {
    this.isLoading = true;
    this.organizationAPIService
      .GetListPositionRole()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
            this.listPositionRole = res.ObjectReturn.map((r: any) => ({
              Code: r.Code,
              RoleName: r.RoleName
            }));
          }
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Lỗi API GetListPositionRole: ${error}`);
        }
      );
  }

  APIGetListStatus() {
    this.isLoading = true;
    this.layoutAPIService.GetListStatus(4)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          // this.ListStatus = res.ObjectReturn;
          
          //set mặc định "Đang soạn thảo"
          // const defaultStatus = this.ListStatus.find(s => s.StatusName === 'Đang soạn thảo');
          // if (defaultStatus) {
          //   this.apiDepartmentForm.patchValue({
          //     StatusID: defaultStatus.OrderBy
          //   });
          // }
          if (res?.StatusCode === 0 && Array.isArray(res.ObjectReturn)) {
          // Map dữ liệu API về DTOStatus chuẩn
          this.ListStatus = res.ObjectReturn.map((s: any) => {
            const dto = new DTOStatus();
            dto.Code = s.Code;
            dto.StatusName = s.StatusName;
            dto.TypeData = s.TypeData;
            dto.OrderBy = Number(s.OrderBy); // đảm bảo number
            dto.CreateBy = s.CreateBy ?? '';
            dto.CreateTime = s.CreateTime ?? null;
            dto.StatusID = s.StatusID ?? 0;
            return dto;
          });

          // set mặc định "Đang soạn thảo"
          const defaultStatus = this.ListStatus.find(
            (s: DTOStatus) => s.StatusName === 'Đang soạn thảo'
          );
          if (defaultStatus) {
            this.apiDepartmentForm.patchValue({
              StatusID: defaultStatus.OrderBy
            });
          }
        }

        },
        error: (err) => {
          this.isLoading = false;
          this.layoutService.onError(err);
        }
      });
  }

  APIGetListLocation(dto: DTOLocation) {
    this.isLoading = true;
    this.organizationAPIService.GetListLocation(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.isLoading = false;

          if (res && res.StatusCode === 0) {
            this.ListLocation = res.ObjectReturn ?? [];
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.layoutService.onError(`Lỗi gọi API GetListLocation: ${err}`);
        }
      });
  }

  // region Popup
  // Hiển thị trạng thái của popup
  isPopupVisible() {
    return this.popupShow ? 'visible' : 'hidden';
  }

  // Lấy anchor hiện tại từ danh sách
  getAnchor() {
    if (
      Ps_UtilObjectService.hasValue(this.anchors) &&
      this.anchors.length > 0
    ) {
      const anchor = this.anchors.toArray()[this.currentAnchorIndex];
      if (Ps_UtilObjectService.hasValue(anchor)) {
        return anchor;
      }
    }

    return null;
  }

  /**
   * Lắng nghe sự kiện click để đóng popup khi click ra ngoài.
   *
   * @param {MouseEvent} event - Sự kiện click
   *
   * - Lấy phần tử anchor hiện tại.
   * - Nếu click bên ngoài anchor và popup đang mở → đóng popup.
   * - Gọi `cdr.detectChanges()` để cập nhật giao diện.
   */
  @HostListener('document:click', ['$event'])
  clickout(event) {
    var anchor = this.getAnchor();
    if (Ps_UtilObjectService.hasValue(anchor)) {
      if (
        !anchor.nativeElement.contains(event.target) &&
        this.popupShow == true
      ) {
        this.popupShow = false;
      }
    }
    this.cdr.detectChanges();
  }

  // Xử lý sự kiện click để hiển thị popup
  togglePopup(index, item) {
    event.stopPropagation();

    // kiểm tra index để đóng mở popup
    if (index != this.currentAnchorIndex) {
      this.popupShow = true;
    } else if (index == this.currentAnchorIndex) {
      this.popupShow = !this.popupShow;
    }
    if (this.popupShow) {
      this.currentDepartmentForm = item;
      this.getSelectedMenuDropdown(item);
    }

    this.currentAnchorIndex = index;
    this.cdr.detectChanges();
  }

  //HANDLE TOGGLE FORM khi nhấn menu dropdown
  getSelectedMenuDropdown(dataItem: DTODepartment | DTOPosition) {
    this.menuItemList = [];

    if (this.isAllPers || this.isCanCreate) {
      if ('DepartmentID' in dataItem) {
        const dept = dataItem as DTODepartment;
        this.currentDepartmentForm = dept;
        this.currentPositionForm = null;
        this.selectedForm = 'department';

        this.apiDepartmentForm.patchValue({ ...dept });

        this.menuItemList = [
          { id: 1, iconName: 'eye', text: 'Xem chi tiết' },
          { id: 2, iconName: 'image', text: 'Thêm mới Đơn vị' },
          { id: 3, iconName: 'organization', text: 'Thêm mới Đơn vị con' },
          { id: 4, iconName: 'position', text: 'Thêm mới Chức danh' },
          { id: 5, iconName: 'minus-outline', text: 'Ngưng áp dụng' },
        ];
      } else if ('PositionID' in dataItem) {
        const position = dataItem as DTOPosition;
        this.currentPositionForm = position;
        this.currentDepartmentForm = null;
        this.selectedForm = 'position';

        this.apiPositionFrom.patchValue({ ...position });

        this.menuItemList = [
          { id: 3, iconName: 'plus', text: 'Thêm mới Chức danh' }
        ];
      }
    }

    this.menuItemList = [...this.menuItemList];
  }

  /**
 * Xử lý khi người dùng click chọn 1 item trong menu dropdown.
 *
 * - Nếu đang chọn Department (`currentDepartmentForm` có giá trị):
 *   + id = 1 → Xem chi tiết currentDepartmentForm nhưng các trường bị d
 *   + id = 2 → Thêm mới Department.
 *   + id = 3 → Thêm mới Position thuộc Department.
 *   + id = 0 → Mở dialog xác nhận xóa Department.
 *   + id = 6 → Xem chi tiết Department (disable tất cả các trường, mở drawer).
 *
 * - Nếu đang chọn Position (`currentPositionForm` có giá trị):
 *   + id = 4 → Chỉnh sửa Position (reset + patchValue dữ liệu cũ, disable ID, mở drawer).
 *   + id = 3 → Thêm mới Position.
 *   + id = 5 → Mở dialog xác nhận xóa Position.
 *   + id = 7 → Xem chi tiết Position (disable tất cả các trường, mở drawer).
 *
 * Sau khi xử lý xong thì ẩn popup dropdown.
 *
 * @param item Item menu dropdown được click (bao gồm id, icon, text).
 */
  onClickMenuDropdownItem(item: any) {
    if (!item) return;
    const id = item.id;
    const parent = this.listDepartmentTree.find(
      (d: any) => d.Code === this.currentDepartmentForm.Code
    );

    // Nếu đang thao tác với Department
    if (Ps_UtilObjectService.hasValue(this.currentDepartmentForm)) {
      switch (id) {
        case 1: // xem chi tiết department
          this.selectedForm = 'department';
          this.apiDepartmentForm.patchValue(this.currentDepartmentForm);
          this.isFeildDisabled = true;
          this.isDetailMode = true;
          this.drawer.open();
          break;
        
        case 2: // Thêm mới department
          this.onAddNewDepartment();
          break;

        case 3: // Thêm mới department con
          this.apiDepartmentForm.reset({
            Code: 0,
            DepartmentID: '',
            Department: '',
            ParentID: parent ?? null, // gán parent = bộ phận hiện tại
            StatusID: 0,
            StatusName: 'Đang soạn thảo'
          });
          this.selectedForm = 'department';
          this.drawer.open();
          break;

        case 4: // Thêm mới chức danh trong bộ phận hiện tại
          this.onAddNewPosition();
          break;
      }
    }

    // Nếu đang thao tác với Position → chỉ có thêm mới chức danh
    else if (Ps_UtilObjectService.hasValue(this.currentPositionForm)) {
      if (id === 3) {
        this.onAddNewPosition();
      }
    }

    this.popupShow = false;
  }

  onSelectedStatus(event: number) {
    this.apiDepartmentForm.patchValue({
      StatusID: event
    });
  }

  /**
     * Tìm mã Code của department dựa vào một position.
     *
     * @param position Đối tượng position cần tìm department chứa nó.
     * @returns Mã Code của department nếu tìm thấy, ngược lại trả về null.
     */
  findDepartmentIdByPosition(position: DTOPosition): number | null {
    const department = this.listDepartmentTree.find((p) =>
      p.ListPosition?.some((d) => d.PositionID === position.PositionID)
    );
    return department ? department.Code : null;
  }

}
