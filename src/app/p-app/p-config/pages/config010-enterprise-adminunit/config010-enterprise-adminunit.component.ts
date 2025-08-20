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

  // Biến để quản lý danh sách anchors
  dialogProvince: boolean = false;
  dialogDistrict: boolean = false;

  // Biến để quản lý sự kiện thay đổi quyền API
  justLoadedChangePermissionAPI: boolean = true;

  // Biến trạng thái checkbox
  isApplied: boolean = true;
  isStopped: boolean = false;

  // Biến để quản lý trạng thái disable của các trường ProvinceID và DistrictID
  isProvinceIdDisabled: boolean = false;
  isDistrictIdDisabled: boolean = false;

  // Biến để quản lý form hiện tại
  selectedForm: 'province' | 'district' | null = null;

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
  ngUnsubscribe$ = new Subject<void>();

  // Biến để quản lý danh sách cây hành chính
  listProvinceTree: DTOProvince[] = [];

  // Biến để quản lý dữ liệu gốc và dữ liệu đã lọc
  rootData: Array<DTOProvince | DTODistrict> = [];
  public originData: any = [];

  gridStateProvince: State = { filter: { logic: 'and', filters: [] } };

  // Biến để quản lý danh sách các item đã chọn
  settingsTreelist: SelectableSettings = {
    enabled: true,
    mode: 'row',
    multiple: false,
    drag: true,
  };

  currentProvince = new DTOProvince();

  // Biến để quản lý form hiện tại
  currentProvinceForm = new DTOProvince();
  currentDistrictForm = new DTODistrict();

  // search and filter
  searchValue: State = { filter: { filters: [], logic: 'or' } };
  filterValue: State = { filter: { filters: [], logic: 'and' } };

  // Biến để quản lý danh sách menu dropdown
  menuItemList: any[] = [];

  // Biến để quản lý item đã chọn trong treelist
  selectedProvince: DTOProvince;
  selectedDistrict: DTODistrict;
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
    private el: ElementRef,
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
          that.actionPerm = distinct(res.ActionPermission, 'ActionType');
          that.isAllPers =
            that.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
          that.isCanCreate =
            that.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;

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
          this.GetListProvinceTree();
        }
      });
  }

  //breadcrumb
  loadAPI() {
    this.GetListProvinceTree();
  }

  // Reset filter
  onResetFilter(e) {
    if (Ps_UtilObjectService.hasListValue(this.collapsedIds)) {
      for (const id of this.collapsedIds) {
        this.treelist.expand(id);
      }
    }

    this.isApplied = true;
    this.isStopped = false;

    this.loadData();
    this.selectedProvince = null;
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

  //action trên form
  onAddNewProvince() {
    this.selectedForm = 'province';
    this.currentProvinceForm = null;
    this.apiProvinceForm.reset({ Code: 0, Country: 1, IsDelete: 0 });

    this.isProvinceIdDisabled = false;
    this.drawer.open();
  }
  onAddNewDistrict() {
    this.selectedForm = 'district';
    this.currentDistrictForm = null;
    this.apiDistrictFrom.reset({ Code: 0, IsDelete: 0 });

    this.isDistrictIdDisabled = false;
    this.drawer.open();

  }

  // Ngăn chặn hành vi mặc định của phím Enter trên form
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  onCloseForm() {
    this.drawer.close();
  }

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

  // Xử lý sự kiện khi chọn item trong treelist
  onSelectionChange(e: any) {
    if (!e.items || e.items.length === 0) {
      this.selectedProvince = null;
      this.selectedDistrict = null;
      this.isDistrictSelected = false;
      return;
    }

    const dataItem = e.items[0].dataItem;

    // Nếu chọn District
    if (dataItem.hasOwnProperty('DistrictID')) {
      this.selectedDistrict = dataItem as DTODistrict;
      // this.selectedProvince = null;
      this.isDistrictSelected = true;
      this.selectedForm = 'district';
    }
    // Nếu chọn Province
    else if (dataItem.hasOwnProperty('ProvinceID')) {
      this.selectedProvince = dataItem as DTOProvince;
      // this.selectedDistrict = null;
      this.isDistrictSelected = false;
      this.selectedForm = 'province';
    } else {
      this.selectedProvince = null;
      this.selectedDistrict = null;
      this.isDistrictSelected = false;
    }
    this.popupShow = false;
  }

  //region API

  // Lấy API Danh sách cây hành chính
  GetListProvinceTree() {
    let ctx = `Lấy danh sách Province District`;
    this.loading = true;
    this.configAPIService
      .GetListProvinceTree(this.gridStateProvince)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          console.log('API Response:', res);
          if (
            Ps_UtilObjectService.hasValue(res) &&
            Ps_UtilObjectService.hasValue(res.ObjectReturn) &&
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
      this.findFilterValue(this.searchValue.filter)
    ) {
      const searchTerm = this.findFilterValue(this.searchValue.filter)
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
    if ((item.IsDelete === 0 || item.IsDelete === false) && this.isApplied)
      return true;
    // Ngưng áp dụng: IsDelete === 1 hoặc true
    if ((item.IsDelete === 1 || item.IsDelete === true) && this.isStopped)
      return true;

    if (item && 'ListDistrict' in item) {
      const children = this.fetchChildren(item);
      return (
        children.length > 0 &&
        children.some((child) => this.filterFunction(child))
      );
    }
    return false;
  };

  // Tìm giá trị của bộ lọc
  findFilterValue(filter: CompositeFilterDescriptor | FilterDescriptor): any {
    if ('value' in filter) {
      return filter.value;
    } else if ('filters' in filter && filter.filters.length > 0) {
      return this.findFilterValue(filter.filters[0]);
    }

    return null;
  }

  // Hàm kiểm tra và loại bỏ ký tự không cần thiết trong chuỗi tìm kiếm
  sanitizeAndCheck(originalString: string, searchTerm: string): boolean {
    const sanitizedString = originalString.replace(/[\/.]/g, '');
    return sanitizedString.toLowerCase().includes(searchTerm);
  }

  // Bộ lọc và lấy danh sách District con từ một Province
  fetchChildren = (parent?: any): Array<DTODistrict> => {
    if (parent && Array.isArray(parent.ListDistrict)) {
      let children: DTODistrict[] = [];

      if (Ps_UtilObjectService.hasValue(this.currentProvince)) {
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

  // Bộ lọc và lấy danh sách District con từ một mảng items
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

  // Update API
  UpdateProvince(dto: DTOProvince) {
    let ctx = `Cập nhật thông tin Province`;
    this.loading = true;
    this.configAPIService
      .UpdateProvince(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.GetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.GetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.GetListProvinceTree();
        }
      );
  }

  // Update Province
  onUpdateProvince() {
    const updateProvince: DTOProvince = this.apiProvinceForm.getRawValue();
    if (!Ps_UtilObjectService.hasValueString(updateProvince.VNProvince)) {
      this.layoutService.onError('Bạn chưa nhập vào Tên Tiếng Việt');
    } else if (!Ps_UtilObjectService.hasValue(updateProvince.ProvinceID)) {
      this.layoutService.onError('Bạn chưa nhập Mã hành chính');
    } else {
      this.UpdateProvince(updateProvince);
    }
  }

  // Update District
  onUpdateDistrict() {
    const updateDistrict: DTODistrict = this.apiDistrictFrom.getRawValue();
    if (!Ps_UtilObjectService.hasValueString(updateDistrict.VNDistrict)) {
      this.layoutService.onError('Bạn chưa nhập vào Tên Tiếng Việt');
    } else if (
      !Ps_UtilObjectService.hasValueString(updateDistrict.DistrictID)
    ) {
      this.layoutService.onError('Bạn chưa chọn Mã hành chính');
    } else if (!Ps_UtilObjectService.hasValue(updateDistrict.Province)) {
      this.layoutService.onError('Bạn chưa chọn Tỉnh thành');
    } else {
      this.UpdateDistrict(updateDistrict);
    }
  }

  // Xóa Province
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
          `Không thể xóa tỉnh "${deleteProvince.VNProvince}" vì đang có ${deleteProvince.ListDistrict.length} quận/huyện trực thuộc.`
        );
      } else {
        this.DeleteProvince([deleteProvince]);
      }
      this.dialogProvince = false;
    }
  }

  // Xóa District
  onDeleteDistrict() {
    const deleteDistrict: DTODistrict = this.apiDistrictFrom.getRawValue();
    if (
      Ps_UtilObjectService.hasValue(deleteDistrict.Code) &&
      deleteDistrict.Code > 0
    ) {
      this.DeleteDistrict([deleteDistrict]);
      this.dialogDistrict = false;
    }
  }

  // Api Update District
  UpdateDistrict(dto: DTODistrict) {
    let ctx = `Cập nhật thông tin Quận huyện`;
    this.loading = true;
    this.configAPIService
      .UpdateDistrict(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.GetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.GetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.GetListProvinceTree();
        }
      );
  }

  // API Xóa Province
  DeleteProvince(dtos: DTOProvince[]) {
    let ctx = `Xóa thông tin Tỉnh thành`;
    this.loading = true;
    this.configAPIService
      .DeleteProvince(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.GetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.GetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.GetListProvinceTree();
        }
      );
  }

  // API Xóa District
  DeleteDistrict(dtos: DTODistrict[]) {
    let ctx = `Xóa thông tin Quận huyện`;
    this.loading = true;
    this.configAPIService
      .DeleteDistrict(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.GetListProvinceTree();
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.GetListProvinceTree();
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.GetListProvinceTree();
        }
      );
  }
  //endRegion

  // Hiển thị trạng thái của popup
  isPopupVisible() {
    return this.popupShow !== null
      ? this.popupShow
        ? 'visible'
        : 'hidden'
      : 'hidden';
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
  // togglePopup(index, item) {
  //   // Lấy tham chiếu đến DOM element của popup
  //   // const popupElement = this.el.nativeElement.querySelector('.stylePopup');
  //   // const rect = popupElement.getBoundingClientRect();

  //   event.stopPropagation();
  //   //kiểm tra index
  //   if (index != this.currentAnchorIndex) {
  //     this.popupShow = true;
  //   } else if (index == this.currentAnchorIndex) {
  //     this.popupShow = !this.popupShow;
  //   }
  //   if (this.popupShow) {
  //     this.selectedProvince = item;
  //     this.getSelectedMenuDropdown(item);
  //   }

  //   this.currentAnchorIndex = index;
  //   // this.currentRowItem = item
  // }

  togglePopup(index, item) {
    event.stopPropagation();
    const popupElement = this.el.nativeElement.querySelector('.stylePopup');
    const rect = popupElement.getBoundingClientRect();
    const topValue = rect.top;

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

    // this.currentRowItem = item
  }

  //HANDLE TOGGLE FORM khi nhấn menu dropdown
  getSelectedMenuDropdown(dataItem: DTOProvince | DTODistrict) {
    this.menuItemList = [];

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
      console.log(this.selectedProvince);
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

    this.menuItemList = [...this.menuItemList];
  }

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
          this.isProvinceIdDisabled = true;
          this.drawer.open();
        } else if (id == 2) {
          this.onAddNewProvince();
        } else if (id == 3) {
          this.onAddNewDistrict();
        } else if (id == 0) {
          this.openDialogProvince();
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

            this.selectedForm = 'district';
            this.isDistrictIdDisabled = true;
            this.drawer.open();
          }
        } else if (id == 3) {
          this.onAddNewDistrict();
        } else if (id == 5) {
          this.openDialogDistrict();
        }
      }
    }

    this.popupShow = false;
  }

  findProvinceIdByDistrict(district: DTODistrict): number | null {
    const province = this.listProvinceTree.find((p) =>
      p.ListDistrict?.some((d) => d.DistrictID === district.DistrictID)
    );
    return province ? province.Code : null;
  }

  // Xử lý sự kiện khi component bị hủy
  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
    this.ngUnsubscribe$.unsubscribe();
  }
}
