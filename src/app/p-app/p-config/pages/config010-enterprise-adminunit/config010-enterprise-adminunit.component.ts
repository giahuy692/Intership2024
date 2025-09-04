import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOProvince } from '../../shared/dto/DTOProvince';
import { DTODistrict } from '../../shared/dto/DTODistrict';
import {
  SelectableSettings,
  TreeListComponent,
} from '@progress/kendo-angular-treelist';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { ConfigEnterpriceApiService } from '../../shared/services/config-enterprice-api.service';
import {
  CompositeFilterDescriptor,
  distinct,
  FilterDescriptor,
  State,
} from '@progress/kendo-data-query';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';

@Component({
  selector: 'app-config010-enterprise-adminunit',
  templateUrl: './config010-enterprise-adminunit.component.html',
  styleUrls: ['./config010-enterprise-adminunit.component.scss'],
})
export class Config010EnterpriseAdminunitComponent {
  @ViewChild('formDrawer') public drawer: MatDrawer;
  @ViewChildren('anchor') anchors;
  @ViewChild('myTreeList') treelist: TreeListComponent;

  // Biến trạng thái loading
  isLoading: boolean = false;

  // Biến để quản lý popup
  popupShow: boolean = false;

  // Biến trạng thái để hiển thị dialog Tỉnh/Thành và Quận/Huyện
  isDialogProvince: boolean = false;
  isDialogDistrict: boolean = false;

  // Biến để quản lý sự kiện thay đổi quyền API
  justLoadedChangePermissionAPI: boolean = true;

  // Biến trạng thái checkbox
  isApplied: boolean = true;
  isStopped: boolean = false;

  // Biến để quản lý trạng thái disable của các trường Province và các trường District và trường Mã hành chính
  isProvinceIdDisabled: boolean = false;
  isDistrictIdDisabled: boolean = false;
  isFeildDisabled: boolean = false;

  // Biến để quản lý trạng thái ẩn của button thêm tỉnh thành và các trường bắt buộc
  isBtnHide: boolean = false;
  isImpose: boolean = false;

  // Biến để quản lý chọn form
  selectedForm: 'province' | 'district';

  // Biến để quản lý anchor hiện tại
  currentAnchorIndex: number = -1;
  topValue: string = 'top';

  //Permission variables
  justLoadedPer: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  isAllPers: boolean = true;
  isCanCreate: boolean = false;

  // Biến để quản lý việc hủy đăng ký các Observable
  ngUnsubscribe = new Subject<void>();

  // Biến để quản lý danh sách cây hành chính
  listProvinceTree: DTOProvince[] = [];

  // Biến để quản lý dữ liệu gốc và dữ liệu đã lọc
  rootData: Array<DTOProvince | DTODistrict> = [];

  /**
  * Trạng thái dữ liệu (State) của TreeList
  * @type {State}
  */
  treeStateProvince: State = { filter: { logic: 'and', filters: [] } };

  // Biến để quản lý danh sách các item đã chọn
  settingsTreelist: SelectableSettings = {
    enabled: true,
    mode: 'row',
    multiple: false,
    drag: true,
  };

  // Biến để quản lý form hiện tại
  currentProvinceForm: DTOProvince = new DTOProvince();
  currentDistrictForm: DTODistrict = new DTODistrict();

  // search
  searchValue: State = { filter: { filters: [], logic: 'or' } };
  keyword: string = ''

  // Biến để quản lý danh sách menu dropdown
  menuItemList: any[] = [];

  // Biến để quản lý item đã chọn trong treelist
  isProvinceSelected: boolean = false;
  isDistrictSelected: boolean = false;

  //reset expand tree
  collapsedIds: any[];

  //dto form Province
  apiProvinceForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    ProvinceID: new FormControl('', Validators.required),
    VNProvince: new FormControl('', Validators.required),
    JPProvince: new FormControl(''),
    ENProvince: new FormControl(''),
    OrderBy: new FormControl(null),
    Country: new FormControl(1),
    IsDelete: new FormControl(0),
    ListDistrict: new FormControl([]),
  });

  //dto form District
  apiDistrictFrom: FormGroup = new FormGroup({
    Code: new FormControl(0),
    DistrictID: new FormControl('', Validators.required),
    VNDistrict: new FormControl('', Validators.required),
    JPDistrict: new FormControl(''),
    ENDistrict: new FormControl(''),
    OrderBy: new FormControl(null),
    IsDelete: new FormControl(0),
    Province: new FormControl(null, Validators.required),
  });

  constructor(
    private configAPIService: ConfigEnterpriceApiService,
    public menuService: PS_HelperMenuService,
    public layoutService: LayoutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let that = this;
    // phân quyền
    this.menuService
      .changePermission()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: DTOPermission) => {
        if (Ps_UtilObjectService.hasValue(res) && that.justLoadedPer) {
          // that.actionPerm = distinct(res.ActionPermission, 'ActionType');
          // that.isAllPers =
          //   that.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
          // that.isCanCreate =
          //   that.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
          //Set trạng thái nút thêm mới
          if (that.isAllPers || that.isCanCreate) {
            this.isBtnHide = true;
            this.isImpose = true;
          }
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
          this.loadProvince()
        }
      });
  }

  //breadcrumb
  loadProvince() {
    this.APIGetListProvinceTree();
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
    this.isApplied = true;
    this.isStopped = false;

    this.loadData();
    this.currentProvinceForm = null;
    this.isProvinceSelected = false;
    this.isDistrictSelected = false;
  }

  // Xử lý tìm kiếm
  onSearchValueName(e) {
    this.searchValue.filter.filters = e.filters;
    this.loadData();
  }

  // Xử lý checkbox filter
  onFilterCheckboxChange(type: 'apply' | 'stop', checked: boolean) {
    if (type === 'apply') {
      this.isApplied = checked;
    } else {
      this.isStopped = checked;
    }
    this.loadData();
  }

  // Tìm kiếm trong cây
  searchTree(dataList, targetCode) {
    for (const item of dataList) {
      if (item.Code === targetCode) {
        return item;
      }

      if (item.ListDistrict && item.ListDistrict.length > 0) {
        const foundItem = this.searchTree(item.ListDistrict, targetCode);
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
  onAddNewProvince() {
    this.selectedForm = 'province';
    this.currentProvinceForm = null;
    this.apiProvinceForm.reset({ Code: 0, Country: 1, IsDelete: 0, OrderBy: 1 });

    this.isProvinceIdDisabled = false;
    this.drawer.open();
  }

  // Hàm mở form add district
  onAddNewDistrict(districtItem?: DTODistrict) {
    this.selectedForm = 'district';
    this.currentDistrictForm = null;

    let provinceCode: number | null = null;

    if (Ps_UtilObjectService.hasValue(districtItem)) {
      // Nếu truyền vào District cụ thể thì tìm Province chứa nó
      provinceCode = this.findProvinceIdByDistrict(districtItem);
    } else if (Ps_UtilObjectService.hasValue(this.currentProvinceForm)) {
      // Nếu đang chọn Province thì lấy Code luôn
      provinceCode = this.currentProvinceForm.Code;
    } else if (Ps_UtilObjectService.hasValue(this.currentDistrictForm)) {
      // Nếu đang chọn District thì tìm Province chứa District đó
      provinceCode = this.findProvinceIdByDistrict(this.currentDistrictForm);
    }

    // Reset form, set Province cho District mới
    this.apiDistrictFrom.reset({
      Code: 0,
      IsDelete: 0,
      OrderBy: 1,
      Province: provinceCode,
    });

    this.isDistrictIdDisabled = false;
    this.drawer.open();
  }


  // Hàm đóng form
  onCloseForm() {
    this.drawer.close();
    this.apiProvinceForm.reset()
    this.apiDistrictFrom.reset()
  }

  /**
   * Xử lý khi người dùng chọn 1 tỉnh thành từ dropdown.
   * - Tìm province tương ứng trong danh sách `listProvinceTree`.
   * - Cập nhật Form District (`apiDistrictFrom`) với mã tỉnh (Code) được chọn,
   *   chỉ lưu Code làm khóa ngoại thay vì toàn bộ object.
   *
   * @param event Mã Code của province được chọn từ dropdown.
   */
  onSelectedDropdownList(event: number) {
    this.apiDistrictFrom.patchValue({
      Province: event, // chỉ lưu Code trong FormControl
    });
  }

  // Xử lý sự kiện mở và đóng dialog Province
  onCloseDialogProvince() {
    this.isDialogProvince = false;
  }
  onOpenDialogProvince() {
    this.isDialogProvince = true;
  }

  // Xử lý sự kiện mở và đóng dialog District
  onCloseDialogDistrict() {
    this.isDialogDistrict = false;
  }
  onOpenDialogDistrict() {
    this.isDialogDistrict = true;
  }
  //endRegion

  // Xử lý sự kiện khi chọn item trong treelist
  onSelectionChange(e: any) {
    if (!e.items || e.items.length === 0) {
      this.currentProvinceForm = null;
      this.currentDistrictForm = null;
      this.isProvinceSelected = false;
      this.isDistrictSelected = false;
      return;
    }

    const dataItem = e.items[0].dataItem;

    // Nếu chọn District
    if (dataItem.hasOwnProperty('DistrictID')) {
      this.currentDistrictForm = dataItem as DTODistrict;
      this.isProvinceSelected = false;
      this.isDistrictSelected = true;
      this.selectedForm = 'district';
    }
    // Nếu chọn Province
    else if (dataItem.hasOwnProperty('ProvinceID')) {
      this.currentProvinceForm = dataItem as DTOProvince;
      this.isProvinceSelected = true;
      this.isDistrictSelected = false;
      this.selectedForm = 'province';
    } else {
      this.currentProvinceForm = null;
      this.currentDistrictForm = null;
      this.isDistrictSelected = false;
      this.isProvinceSelected = false;
    }
    this.popupShow = false;
  }

  //region API

  // Lấy API Danh sách cây hành chính
  APIGetListProvinceTree() {
    let ctx = `Lấy danh sách Province District`;
    this.isLoading = true;
    this.configAPIService
      .GetListProvinceTree(this.treeStateProvince)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (
            Ps_UtilObjectService.hasValue(res) &&
            res.StatusCode == 0
          ) {
            this.listProvinceTree = res.ObjectReturn;
            this.loadData();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
          }
          this.isLoading = false;
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
      const allData = this.listProvinceTree;
      const filteredDataFilter = allData.filter(this.filterFunction);

      if (
        Ps_UtilObjectService.hasListValue(this.searchValue.filter.filters) &&
        this.findSearchValue(this.searchValue.filter)
      ) {
        const searchTerm = this.findSearchValue(this.searchValue.filter)
          .toLowerCase()
          .replace(/[\/.]/g, '');

        this.rootData = filteredDataFilter
          .map((province) => {
            if (this.sanitizeAndCheck(province.VNProvince, searchTerm)) {
              return { ...province };
            }
            const filteredDistricts = (province.ListDistrict || []).filter(
              (district) => this.sanitizeAndCheck(district.VNDistrict, searchTerm)
            );
            if (filteredDistricts.length > 0) {
              return { ...province, ListDistrict: filteredDistricts };
            }
            return null;
          })
          .filter(Boolean);
      } else {
        this.rootData = filteredDataFilter;
      }
      this.isLoading = false;
    });
  }


  // Hàm lọc dữ liệu
  filterFunction = (item: any): boolean => {
    if (!this.isApplied && !this.isStopped) return true;

    // Áp dụng: IsDelete === 0 hoặc false
    if ((item.IsDelete === 0 || item.IsDelete === false) && this.isApplied) {
      return true;
    }
    // Ngưng áp dụng: IsDelete === 1 hoặc true
    if ((item.IsDelete === 1 || item.IsDelete === true) && this.isStopped) {
      return true;
    }
    if (item && 'ListDistrict' in item) {
      const children = this.fetchChildren(item);
      return (
        children.length > 0 &&
        children.some((child) => this.filterFunction(child))
      );
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

  // Hàm lấy ra danh sách District con của một Province (hoặc District nếu có thêm cấp)
  // Trả về: Mảng các District đã được lọc theo điều kiện filterFunction
  fetchChildren = (parent?: any): Array<DTODistrict> => {
    if (parent && Array.isArray(parent.ListDistrict)) {
      let children: DTODistrict[] = [];

      if (Ps_UtilObjectService.hasValue(this.currentProvinceForm)) {
        if (Ps_UtilObjectService.hasListValue(parent.ListDistrict)) {
          children = children.concat(
            this.filterAndFetchChildren(
              parent.ListDistrict,
              'ListDistrict',
              parent
            )
          );
        }
      } else {
        if (Ps_UtilObjectService.hasListValue(parent.ListDistrict)) {
          const filteredListDistrict = parent.ListDistrict.filter(
            this.filterFunction
          );
          children = children.concat(filteredListDistrict);
        }
      }
      return children;
    }
    return [];
  };

  // Hàm lấy ra danh sách các items (có thể là Province/District) kèm theo property con của chúng
  // Khác với fetchChildren: hàm này trả về cả object gốc + property con đã được lọc đệ quy
  filterAndFetchChildren = (
    items: any[],
    property: string,
    parentToExclude?: any
  ): DTODistrict[] => {
    let filteredChildren: DTODistrict[] = [];

    items.forEach((item) => {
      if (item !== parentToExclude) {
        const children = this.fetchChildren(item).filter(this.filterFunction);
        filteredChildren.push({ ...item, [property]: children });
      }
    });
    return filteredChildren;
  };

  // Kiểm tra xem item có con hay không
  hasChildren = (item: DTODistrict): boolean => {
    const children = this.fetchChildren(item);
    return children && children.length > 0;
  };

  // API Update PRovince
  APIUpdateProvince(dto: DTOProvince) {
    let ctx = `${dto.Code == 0 ?'Tạo mới' : "Cập nhật" } thông tin Tỉnh thành`;
    this.isLoading = true;
    this.configAPIService
      .UpdateProvince(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.APIGetListProvinceTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListProvinceTree();
        }
      );
  }

  // hàm xử lý Update Province
  onUpdateProvince() {
    const updateProvince: DTOProvince = this.apiProvinceForm.getRawValue();
    const isAddForm = Number(updateProvince.Code) === 0;

    let ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Tỉnh thành`;
    this.apiProvinceForm.markAllAsTouched();

    if (
      this.apiProvinceForm.invalid ||
      !Ps_UtilObjectService.hasValueString(updateProvince.VNProvince) ||
      !Ps_UtilObjectService.hasValueString(updateProvince.ProvinceID)
    ) {
      const errorFields: string[] = [];
      if (
        this.apiProvinceForm.get('VNProvince')?.hasError('required') ||
        !Ps_UtilObjectService.hasValueString(updateProvince.VNProvince)
      ) {
        errorFields.push('Tên Tiếng Việt');
      }

      if (
        this.apiProvinceForm.get('ProvinceID')?.hasError('required') ||
        !Ps_UtilObjectService.hasValueString(updateProvince.ProvinceID)
      ) {
        errorFields.push('Mã hành chính');
      }

      if (errorFields.length > 0) {
        this.layoutService.onError(
          `Đã xảy ra lỗi ${ctx}: Vui lòng nhập ( ${errorFields.join(', ')} )`
        );
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Vui lòng nhập đầy đủ thông tin bắt buộc`);
      }
      return;
    }

    if (!isAddForm && JSON.stringify(updateProvince) === JSON.stringify(this.currentProvinceForm)) {
      this.layoutService.onWarning(`Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`);
      return;
    }
    this.APIUpdateProvince(updateProvince);
  }

  // Api Update District
  APIUpdateDistrict(dto: DTODistrict) {
   let ctx = `${dto.Code == 0 ?'Tạo mới' : "Cập nhật" } thông tin Phường xã`;
    this.isLoading = true;
    this.configAPIService
      .UpdateDistrict(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.APIGetListProvinceTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListProvinceTree();
        }
      );
  }

  // Hàm xử lý Update District
  onUpdateDistrict() {
    const updateDistrict: DTODistrict = this.apiDistrictFrom.getRawValue();
    const isAddForm = Number(updateDistrict.Code) === 0;

    let ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Phường xã`;
    this.apiDistrictFrom.markAllAsTouched();

    if (
      this.apiDistrictFrom.invalid ||
      !Ps_UtilObjectService.hasValueString(updateDistrict.VNDistrict) ||
      !Ps_UtilObjectService.hasValueString(updateDistrict.DistrictID) ||
      !Ps_UtilObjectService.hasValueString(updateDistrict.Province)
    ) {
      const errorFields: string[] = [];
      if (
        this.apiDistrictFrom.get('VNDistrict')?.hasError('required') ||
        !Ps_UtilObjectService.hasValueString(updateDistrict.VNDistrict)
      ) {
        errorFields.push('Tên Tiếng Việt');
      }

      if (
        this.apiDistrictFrom.get('DistrictID')?.hasError('required') ||
        !Ps_UtilObjectService.hasValueString(updateDistrict.DistrictID)
      ) {
        errorFields.push('Mã hành chính');
      }

      if (
        this.apiDistrictFrom.get('Province')?.hasError('required') ||
        !Ps_UtilObjectService.hasValueString(updateDistrict.Province)
      ) {
        errorFields.push('Tỉnh thành');
      }

      if (errorFields.length > 0) {
        this.layoutService.onError(
          `Đã xảy ra lỗi ${ctx}: Vui lòng nhập ( ${errorFields.join(', ')} )`
        );
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Vui lòng nhập đầy đủ thông tin bắt buộc`);
      }
      return;
    }

    if (!isAddForm && JSON.stringify(updateDistrict) === JSON.stringify(this.currentDistrictForm)) {
      this.layoutService.onWarning(`Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`);
      return;
    }
    this.APIUpdateDistrict(updateDistrict);
  }


  // API Xóa Province
  APIDeleteProvince(dtos: DTOProvince[]) {
    let ctx = `Xóa thông tin Tỉnh thành`;
    this.isLoading = true;
    this.configAPIService
      .DeleteProvince(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.APIGetListProvinceTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListProvinceTree();
        }
      );
  }

  // Hàm xử lý xóa Province
  onDeleteProvince() {
    const deleteProvince: DTOProvince = this.apiProvinceForm.getRawValue();
    if (
      Ps_UtilObjectService.hasValue(deleteProvince.Code) &&
      deleteProvince.Code > 0
    ) {
      if (
        Ps_UtilObjectService.hasListValue(deleteProvince.ListDistrict) &&
        deleteProvince.ListDistrict.length > 0
      ) {
        this.layoutService.onError(
          `Đã xảy ra lỗi khi xóa Tỉnh thành: Không thể xóa tỉnh thành "${deleteProvince.VNProvince}" vì đang có ${deleteProvince.ListDistrict.length} quận/huyện trực thuộc.`
        );
      } else {
        this.APIDeleteProvince([deleteProvince]);
      }
      this.isDialogProvince = false;
      this.isProvinceSelected = false;
    }
  }

  // API Xóa District
  APIDeleteDistrict(dtos: DTODistrict[]) {
    let ctx = `Xóa thông tin Quận huyện`;
    this.isLoading = true;
    this.configAPIService
      .DeleteDistrict(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.APIGetListProvinceTree();
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListProvinceTree();
        }
      );
  }

  // Hàm xử lý xóa District
  onDeleteDistrict() {
    const deleteDistrict: DTODistrict = this.apiDistrictFrom.getRawValue();
    if (
      Ps_UtilObjectService.hasValue(deleteDistrict.Code) &&
      deleteDistrict.Code > 0
    ) {
      this.APIDeleteDistrict([deleteDistrict]);
      this.isDialogDistrict = false;
    }
  }
  //endRegion

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
      this.currentProvinceForm = item;
      this.getSelectedMenuDropdown(item);
    }

    this.currentAnchorIndex = index;
    this.cdr.detectChanges();
  }

  //HANDLE TOGGLE FORM khi nhấn menu dropdown
  getSelectedMenuDropdown(dataItem: DTOProvince | DTODistrict) {
    this.menuItemList = [];
    if (this.isAllPers || this.isCanCreate) {
      if ('ProvinceID' in dataItem) {
        this.currentProvinceForm = dataItem as DTOProvince;
        this.currentDistrictForm = null;
        this.selectedForm = 'province';

        this.apiProvinceForm.patchValue(dataItem);

        this.menuItemList.push(
          { id: 1, iconName: 'pencil', text: 'Chỉnh sửa' },
          { id: 2, iconName: 'plus', text: 'Thêm mới tỉnh thành' },
          { id: 3, iconName: 'plus', text: 'Thêm mới phường xã' },
          { id: 0, iconName: 'delete', text: 'Xóa tỉnh thành' }
        );
      } else if ('DistrictID' in dataItem) {
        this.currentDistrictForm = dataItem as DTODistrict;
        this.currentProvinceForm = null;
        this.selectedForm = 'district';

        this.apiDistrictFrom.patchValue({ ...dataItem });

        this.menuItemList.push(
          { id: 4, iconName: 'pencil', text: 'Chỉnh sửa' },
          { id: 3, iconName: 'plus', text: 'Thêm mới phường xã' },
          { id: 5, iconName: 'delete', text: 'Xóa phường xã' }
        );
      }
    } else {
      if ('ProvinceID' in dataItem) {
        this.currentProvinceForm = dataItem as DTOProvince;
        this.currentDistrictForm = null;
        this.selectedForm = 'province';

        this.apiProvinceForm.patchValue(dataItem);

        this.menuItemList.push(
          { id: 6, iconName: 'preview', text: 'Xem chi tiết' }
        );
      } else if ('DistrictID' in dataItem) {
        this.currentDistrictForm = dataItem as DTODistrict;
        this.currentProvinceForm = null;
        this.selectedForm = 'district';

        this.apiDistrictFrom.patchValue({ ...dataItem });

        this.menuItemList.push(
          { id: 7, iconName: 'preview', text: 'Xem chi tiết' },
        );
      }

      this.menuItemList = [...this.menuItemList];
    }
  }

  /**
   * Xử lý khi người dùng click chọn 1 item trong menu dropdown.
   *
   * - Nếu đang chọn Province (`currentProvinceForm` có giá trị):
   *   + id = 1 → Mở form chỉnh sửa Province (reset + patchValue dữ liệu cũ, disable ID, mở drawer).
   *   + id = 2 → Thêm mới Province.
   *   + id = 3 → Thêm mới District thuộc Province.
   *   + id = 0 → Mở dialog xác nhận xóa Province.
   *   + id = 6 → Xem chi tiết Province (disable tất cả các trường, mở drawer).
   *
   * - Nếu đang chọn District (`currentDistrictForm` có giá trị):
   *   + id = 4 → Mở form chỉnh sửa District (reset + patchValue dữ liệu cũ, disable ID, mở drawer).
   *   + id = 3 → Thêm mới District.
   *   + id = 5 → Mở dialog xác nhận xóa District.
   *   + id = 7 → Xem chi tiết District (disable tất cả các trường, mở drawer).
   *
   * Sau khi xử lý xong thì ẩn popup dropdown.
   *
   * @param item Item menu dropdown được click (bao gồm id, icon, text).
   */
  onClickMenuDropdownItem(item: any) {
    if (item) {
      const id = item.id;
      if (Ps_UtilObjectService.hasValue(this.currentProvinceForm)) {
        if (id == 1) {
          this.apiProvinceForm.reset();
          this.currentProvinceForm = this.searchTree(
            this.listProvinceTree,
            this.currentProvinceForm.Code
          );
          this.apiProvinceForm.patchValue({
            ...this.currentProvinceForm,
            Code: this.currentProvinceForm.Code,
            IsDelete: Number(this.currentProvinceForm.IsDelete),
          });
          this.currentProvinceForm = JSON.parse(JSON.stringify(this.apiProvinceForm.getRawValue()));
          this.isProvinceIdDisabled = true;
          this.drawer.open();
        } else if (id == 2) {
          this.onAddNewProvince();
        } else if (id == 3) {
          this.onAddNewDistrict(this.currentDistrictForm);
        } else if (id == 0) {
          this.onOpenDialogProvince();
        } else if (id == 6) {
          this.apiProvinceForm.reset();
          this.currentProvinceForm = this.searchTree(
            this.listProvinceTree,
            this.currentProvinceForm.Code
          );
          this.apiProvinceForm.patchValue({
            ...this.currentProvinceForm,
            Code: this.currentProvinceForm.Code,
            IsDelete: Number(this.currentProvinceForm.IsDelete),
          });
          this.isProvinceIdDisabled = true;
          this.isFeildDisabled = true;
          this.apiProvinceForm.get('IsDelete')?.disable();
          this.drawer.open();
        }
      } else {
        if (id == 4) {
          this.apiDistrictFrom.reset();

          if (this.currentDistrictForm) {
            this.currentDistrictForm = this.searchTree(
              this.listProvinceTree,
              this.currentDistrictForm.Code
            );

            this.apiDistrictFrom.patchValue({
              ...this.currentDistrictForm,
              Code: this.currentDistrictForm.Code,
              IsDelete: Number(this.currentDistrictForm.IsDelete),
              Province:
                this.findProvinceIdByDistrict(this.currentDistrictForm) ?? null,
            });

            this.currentDistrictForm = JSON.parse(JSON.stringify(this.apiDistrictFrom.getRawValue()));
            this.selectedForm = 'district';
            this.isDistrictIdDisabled = true;
            this.drawer.open();
          }
        } else if (id == 3) {
          this.onAddNewDistrict(this.currentDistrictForm);
        } else if (id == 5) {
          this.onOpenDialogDistrict();
        } else if (id == 7) {
          this.apiDistrictFrom.reset();

          if (this.currentDistrictForm) {
            this.currentDistrictForm = this.searchTree(
              this.listProvinceTree,
              this.currentDistrictForm.Code
            );

            this.apiDistrictFrom.patchValue({
              ...this.currentDistrictForm,
              Code: this.currentDistrictForm.Code,
              IsDelete: Number(this.currentDistrictForm.IsDelete),
              Province:
                this.findProvinceIdByDistrict(this.currentDistrictForm) ?? null,
            });

            this.selectedForm = 'district';
            this.isDistrictIdDisabled = true;
            this.isFeildDisabled = true;
            this.apiDistrictFrom.get('IsDelete')?.disable();
            this.drawer.open();
          }
        }
      }
    }

    this.popupShow = false;
  }

  /**
   * Tìm mã Code của Province (tỉnh/thành phố) dựa vào một District (quận/huyện).
   *
   * @param district Đối tượng District cần tìm Province chứa nó.
   * @returns Mã Code của Province nếu tìm thấy, ngược lại trả về null.
   */
  findProvinceIdByDistrict(district: DTODistrict): number | null {
    const province = this.listProvinceTree.find((p) =>
      p.ListDistrict?.some((d) => d.DistrictID === district.DistrictID)
    );
    return province ? province.Code : null;
  }
  //endRegion

  // Xử lý sự kiện khi component bị hủy
  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }
}
