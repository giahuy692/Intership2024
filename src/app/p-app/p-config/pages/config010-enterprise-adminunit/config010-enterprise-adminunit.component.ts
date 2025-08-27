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
import { FormControl, FormGroup } from '@angular/forms';
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
  loading: boolean = false;

  // Biến để quản lý popup
  popupShow: boolean = false;

  // Biến trạng thái để hiển thị dialog Tỉnh/Thành và Quận/Huyện
  dialogProvince: boolean = false;
  dialogDistrict: boolean = false;

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

  // Thêm biến lưu dữ liệu gốc
  originalProvinceData: DTOProvince | null = null;
  originalDistrictData: DTODistrict | null = null;

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
  ngUnsubscribe$ = new Subject<void>();

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
  currentProvinceForm = new DTOProvince();
  currentDistrictForm = new DTODistrict();

  // search
  searchValue: State = { filter: { filters: [], logic: 'or' } };

  // Biến để quản lý danh sách menu dropdown
  menuItemList: any[] = [];

  // Biến để quản lý item đã chọn trong treelist
  selectedProvince: DTOProvince;
  selectedDistrict: DTODistrict;
  isProvinceSelected: boolean = false;
  isDistrictSelected: boolean = false;

  //reset expand tree
  collapsedIds: any[];

  //dto form Province
  apiProvinceForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    ProvinceID: new FormControl(''),
    VNProvince: new FormControl(''),
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
    DistrictID: new FormControl(''),
    VNDistrict: new FormControl(''),
    JPDistrict: new FormControl(''),
    ENDistrict: new FormControl(''),
    OrderBy: new FormControl(null),
    IsDelete: new FormControl(0),
    Province: new FormControl(null),
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
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: DTOPermission) => {
        if (Ps_UtilObjectService.hasValue(res) && that.justLoadedPer) {
          // that.actionPerm = distinct(res.ActionPermission, 'ActionType');
          // that.isAllPers =
          //   that.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
          // that.isCanCreate =
          //   that.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
          // Set trạng thái nút thêm mới
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
          this.apiGetListProvinceTree();
        }
      });
  }

  //breadcrumb
  loadProvince() {
    this.apiGetListProvinceTree();
  }

  // region Tìm kiếm và Lọc
  // Hàm xử lý Reset filter
  onResetFilter(e) {
    if (Ps_UtilObjectService.hasListValue(this.collapsedIds)) {
      for (const id of this.collapsedIds) {
        this.treelist.expand(id);
      }
    }
    this.loading = true;
    this.isApplied = true;
    this.isStopped = false;

    this.loadData();
    this.selectedProvince = null;
    this.isProvinceSelected = false;
    this.isDistrictSelected = false;

    
    setTimeout(() => {
      this.loading = false;
    }, 250);
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
  // Hàm mở form add province
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

    // Tìm Province tương ứng
    let provinceCode: number | null = null;

    if (districtItem) {
      // Nếu truyền vào District cụ thể thì tìm Province chứa nó
      provinceCode = this.findProvinceIdByDistrict(districtItem);
    } else if (this.selectedProvince) {
      // Nếu đang chọn Province thì lấy Code luôn
      provinceCode = this.selectedProvince.Code;
    } else if (this.selectedDistrict) {
      // Nếu đang chọn District thì tìm Province chứa District đó
      provinceCode = this.findProvinceIdByDistrict(this.selectedDistrict);
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
    const selectedProvince = this.listProvinceTree.find(
      (p) => p.Code === event
    );

    this.apiDistrictFrom.patchValue({
      Province: event, // chỉ lưu Code trong FormControl
    });
  }

  // Xử lý sự kiện mở và đóng dialog Province
  closeDialogProvince() {
    this.dialogProvince = false;
  }
  openDialogProvince() {
    this.dialogProvince = true;
  }

  // Xử lý sự kiện mở và đóng dialog District
  closeDialogDistrict() {
    this.dialogDistrict = false;
  }
  openDialogDistrict() {
    this.dialogDistrict = true;
  }
  //endRegion

  // Xử lý sự kiện khi chọn item trong treelist
  onSelectionChange(e: any) {
    if (!e.items || e.items.length === 0) {
      this.selectedProvince = null;
      this.selectedDistrict = null;
      this.isProvinceSelected = false;
      this.isDistrictSelected = false;
      return;
    }

    const dataItem = e.items[0].dataItem;

    // Nếu chọn District
    if (dataItem.hasOwnProperty('DistrictID')) {
      this.selectedDistrict = dataItem as DTODistrict;
      // this.selectedProvince = null;
      this.isProvinceSelected = false;
      this.isDistrictSelected = true;
      this.selectedForm = 'district';
    }
    // Nếu chọn Province
    else if (dataItem.hasOwnProperty('ProvinceID')) {
      this.selectedProvince = dataItem as DTOProvince;
      // this.selectedDistrict = null;
      this.isProvinceSelected = true;
      this.isDistrictSelected = false;
      this.selectedForm = 'province';
    } else {
      this.selectedProvince = null;
      this.selectedDistrict = null;
      this.isDistrictSelected = false;
      this.isProvinceSelected = false;
    }
    this.popupShow = false;
  }

  //region API

  // Lấy API Danh sách cây hành chính
  apiGetListProvinceTree() {
    let ctx = `Lấy danh sách Province District`;
    this.loading = true;
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
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
        }
      );
  }

  // Hàm tải dữ liệu
  loadData(): void {
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
          // Nếu tỉnh thành match từ khóa, giữ nguyên toàn bộ ListDistrict
          if (this.sanitizeAndCheck(province.VNProvince, searchTerm)) {
            return { ...province };
          }
          // Nếu quận/huyện match từ khóa, chỉ giữ các district match
          const filteredDistricts = (province.ListDistrict || []).filter(
            (district) => this.sanitizeAndCheck(district.VNDistrict, searchTerm)
          );
          // Nếu có district match, giữ nguyên tỉnh thành và chỉ cập nhật ListDistrict
          if (filteredDistricts.length > 0) {
            return { ...province, ListDistrict: filteredDistricts };
          }
          // Không match gì thì bỏ
          return null;
        })
        .filter(Boolean);
    } else {
      this.rootData = filteredDataFilter;
    }
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
  apiUpdateProvince(dto: DTOProvince) {
    let ctx = `${dto.Code == 0 ?'Tạo mới' : "Cập nhật" } thông tin Tỉnh thành`;
    this.loading = true;
    this.configAPIService
      .UpdateProvince(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.apiGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.apiGetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.apiGetListProvinceTree();
        }
      );
  }

  // hàm xử lý Update Province
  onUpdateProvince() {
    const updateProvince: DTOProvince = this.apiProvinceForm.getRawValue();
    const isCreate = Number(updateProvince.Code) === 0;

    let ctx = `${isCreate ? 'tạo mới' : 'cập nhật'} thông tin Tỉnh thành`;
    if (!Ps_UtilObjectService.hasValueString(updateProvince.VNProvince)) {
      this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Bạn chưa nhập Tên Tiếng Việt`);
      return;
    }
    if (!Ps_UtilObjectService.hasValueString(updateProvince.ProvinceID)) {
      this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Bạn chưa nhập Mã hành chính`);
      return;
    }
    if (!isCreate && JSON.stringify(updateProvince) === JSON.stringify(this.originalProvinceData)) {
      this.layoutService.onWarning(`Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`);
      return;
    }
    this.apiUpdateProvince(updateProvince);
  }


  // Api Update District
  apiUpdateDistrict(dto: DTODistrict) {
    let ctx = `Cập nhật thông tin Phường xã`;
    this.loading = true;
    this.configAPIService
      .UpdateDistrict(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.apiGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.apiGetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.apiGetListProvinceTree();
        }
      );
  }

  // Hàm xử lý Update District
  onUpdateDistrict() {
    const updateDistrict: DTODistrict = this.apiDistrictFrom.getRawValue();
    const isCreate = Number(updateDistrict.Code) === 0;

    let ctx = `${isCreate ? 'tạo mới' : 'cập nhật'} thông tin Phường xã`;
    if (!Ps_UtilObjectService.hasValueString(updateDistrict.VNDistrict)) {
      this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Bạn chưa nhập Tên Tiếng Việt`);
      return;
    }
    if (!Ps_UtilObjectService.hasValueString(updateDistrict.DistrictID)) {
      this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Bạn chưa nhập Mã hành chính`);
      return;
    }
    if (!Ps_UtilObjectService.hasValue(updateDistrict.Province)) {
      this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Bạn chưa chọn Tỉnh thành`);
      return;
    }

    if (!isCreate && JSON.stringify(updateDistrict) === JSON.stringify(this.originalDistrictData)) {
      this.layoutService.onWarning(`Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`);
      return;
    }
    this.apiUpdateDistrict(updateDistrict);
  }


  // API Xóa Province
  apiDeleteProvince(dtos: DTOProvince[]) {
    let ctx = `Xóa thông tin Tỉnh thành`;
    this.loading = true;
    this.configAPIService
      .DeleteProvince(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.apiGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.apiGetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.apiGetListProvinceTree();
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
        this.apiDeleteProvince([deleteProvince]);
      }
      this.dialogProvince = false;
      this.isProvinceSelected = false;
    }
  }

  // API Xóa District
  apiDeleteDistrict(dtos: DTODistrict[]) {
    let ctx = `Xóa thông tin Quận huyện`;
    this.loading = true;
    this.configAPIService
      .DeleteDistrict(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.apiGetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.apiGetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.apiGetListProvinceTree();
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
      this.apiDeleteDistrict([deleteDistrict]);
      this.dialogDistrict = false;
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
      this.selectedProvince = item;
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
        this.selectedProvince = dataItem as DTOProvince;
        this.selectedDistrict = null;
        this.selectedForm = 'province';

        this.apiProvinceForm.patchValue(dataItem);

        this.menuItemList.push(
          { id: 1, iconName: 'pencil', text: 'Chỉnh sửa' },
          { id: 2, iconName: 'plus', text: 'Thêm mới tỉnh thành' },
          { id: 3, iconName: 'plus', text: 'Thêm mới phường xã' },
          { id: 0, iconName: 'delete', text: 'Xóa tỉnh thành' }
        );
      } else if ('DistrictID' in dataItem) {
        this.selectedDistrict = dataItem as DTODistrict;
        this.selectedProvince = null;
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
        this.selectedProvince = dataItem as DTOProvince;
        this.selectedDistrict = null;
        this.selectedForm = 'province';

        this.apiProvinceForm.patchValue(dataItem);

        this.menuItemList.push(
          { id: 6, iconName: 'preview', text: 'Xem chi tiết' }
        );
      } else if ('DistrictID' in dataItem) {
        this.selectedDistrict = dataItem as DTODistrict;
        this.selectedProvince = null;
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
   * - Nếu đang chọn Province (`selectedProvince` có giá trị):
   *   + id = 1 → Mở form chỉnh sửa Province (reset + patchValue dữ liệu cũ, disable ID, mở drawer).
   *   + id = 2 → Thêm mới Province.
   *   + id = 3 → Thêm mới District thuộc Province.
   *   + id = 0 → Mở dialog xác nhận xóa Province.
   *
   * - Nếu đang chọn District (`selectedDistrict` có giá trị):
   *   + id = 4 → Mở form chỉnh sửa District (reset + patchValue dữ liệu cũ, disable ID, mở drawer).
   *   + id = 3 → Thêm mới District.
   *   + id = 5 → Mở dialog xác nhận xóa District.
   *
   * Sau khi xử lý xong thì ẩn popup dropdown.
   *
   * @param item Item menu dropdown được click (bao gồm id, icon, text).
   */
  onClickMenuDropdownItem(item: any) {
    if (item) {
      const id = item.id;
      if (Ps_UtilObjectService.hasValue(this.selectedProvince)) {
        if (id == 1) {
          this.apiProvinceForm.reset();
          this.currentProvinceForm = this.searchTree(
            this.listProvinceTree,
            this.selectedProvince.Code
          );
          this.apiProvinceForm.patchValue({
            ...this.selectedProvince,
            Code: this.currentProvinceForm.Code,
            IsDelete: Number(this.selectedProvince.IsDelete),
          });
          this.originalProvinceData = JSON.parse(JSON.stringify(this.apiProvinceForm.getRawValue()));
          this.isProvinceIdDisabled = true;
          this.drawer.open();
        } else if (id == 2) {
          this.onAddNewProvince();
        } else if (id == 3) {
          this.onAddNewDistrict(this.selectedDistrict);
        } else if (id == 0) {
          this.openDialogProvince();
        } else if (id == 6) {
          this.apiProvinceForm.reset();
          this.currentProvinceForm = this.searchTree(
            this.listProvinceTree,
            this.selectedProvince.Code
          );
          this.apiProvinceForm.patchValue({
            ...this.selectedProvince,
            Code: this.currentProvinceForm.Code,
            IsDelete: Number(this.selectedProvince.IsDelete),
          });
          this.isProvinceIdDisabled = true;
          this.isFeildDisabled = true;
          this.apiProvinceForm.get('IsDelete')?.disable();
          this.drawer.open();
        }
      } else {
        if (id == 4) {
          this.apiDistrictFrom.reset();

          if (this.selectedDistrict) {
            this.currentDistrictForm = this.searchTree(
              this.listProvinceTree,
              this.selectedDistrict.Code
            );

            this.apiDistrictFrom.patchValue({
              ...this.selectedDistrict,
              Code: this.selectedDistrict.Code,
              IsDelete: Number(this.selectedDistrict.IsDelete),
              Province:
                this.findProvinceIdByDistrict(this.selectedDistrict) ?? null,
            });

            this.originalDistrictData = JSON.parse(JSON.stringify(this.apiDistrictFrom.getRawValue()));
            this.selectedForm = 'district';
            this.isDistrictIdDisabled = true;
            this.drawer.open();
          }
        } else if (id == 3) {
          this.onAddNewDistrict(this.selectedDistrict);
        } else if (id == 5) {
          this.openDialogDistrict();
        } else if (id == 7) {
          this.apiDistrictFrom.reset();

          if (this.selectedDistrict) {
            this.currentDistrictForm = this.searchTree(
              this.listProvinceTree,
              this.selectedDistrict.Code
            );

            this.apiDistrictFrom.patchValue({
              ...this.selectedDistrict,
              Code: this.selectedDistrict.Code,
              IsDelete: Number(this.selectedDistrict.IsDelete),
              Province:
                this.findProvinceIdByDistrict(this.selectedDistrict) ?? null,
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
    this.ngUnsubscribe$.unsubscribe();
  }
}
