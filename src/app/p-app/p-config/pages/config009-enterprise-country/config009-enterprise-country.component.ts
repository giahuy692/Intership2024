import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { DTODataPermission } from '../../shared/dto/DTODataPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTOCountry } from '../../shared/dto/DTOCountry';
import { ConfigEnterpriceApiService } from '../../shared/services/config-enterprice-api.service';

@Component({
  selector: 'app-config009-enterprise-country',
  templateUrl: './config009-enterprise-country.component.html',
  styleUrls: ['./config009-enterprise-country.component.scss']
})
export class Config009EnterpriseCountryComponent implements OnInit {
  destroy = new Subject<any>(); // sử dụng để unsubscribe các observable

  // varible of drawer
  // expandedRight: boolean = false;
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  @ViewChild('Province') public ProvinceRef: DropDownListComponent;
  @ViewChild('District') public DistrictRef: DropDownListComponent;
  @ViewChild('Ward') public WardRef: DropDownListComponent;

  gridCountries: DTOCountry[] = []; //dữ liệu hiển thị trên grid
  private allCountries: DTOCountry[] = []; //danh sách tất cả quốc gia (không filter)

  gridState: State = { //cấu hình state cho grid (filter, logic,...)
    filter: { filters: [], logic: 'and' },
  }

  TypeAction: number = 0; //trạng thái hành động, 0=tạo mới, 1=chỉnh sửa, 2=xem


  formDataDefault = ({ //dữ liệu mặc định
    Code: 0,
    CountryID: '',
    VNName: '',
    JPName: '',
    ENName: '',
    VNOrigin: '',
    OrderBy: 1,
    IsSystem: false
  });

  isautoCollapse: boolean = false; // Có tự động collapse drawer hay không

  //Filter search
  filterSearch: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  // varible of Dropdown
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function

  // varible of DIALOG
  opened: boolean = false;

  // variable of unsubcribe
  arrUnsubscribe: Subscription[] = []; //mảng lưu sst để huỷ sau
  ngUnsubscribe$ = new Subject<void>(); //subject hỗ trợ takeUntil để unsubscribe

  // form reactive lưu dữ liệu quốc gia
  formData: FormGroup;

  // varible of grid
  isJustLoaded: boolean = true
  skip: number = 0;
  keyword: string = ''

  filterStatus: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }

  CountryForm: UntypedFormGroup; // form reactive chính của country

  isLoading: boolean = false;
  isOpenDrawer: boolean = false; // Có mở drawer hay không

  dataCountry: DTOCountry = new DTOCountry() // quốc gia hiện tại được chọn

  //permission 
  isAllPers: boolean = false
  isCanCreate: boolean = false
  justLoadedPer: boolean = true
  dataPerm: DTODataPermission[] = [];
  actionPerm: DTOActionPermission[] = [];

  // Biến để quản lý sự kiện thay đổi quyền API
  justLoadedChangePermissionAPI: boolean = true;

  // Biến để quản lý việc hủy đăng ký các Observable
  ngUnsubscribe = new Subject<void>();

  constructor(
    public layoutService: LayoutService,
    public apiServiceConf: ConfigEnterpriceApiService,
    private changeDetector: ChangeDetectorRef,
    public menuService: PS_HelperMenuService,
    private formBuilder: FormBuilder,

  ) {
    this.loadFormData()
  }

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
        if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
          this.justLoadedChangePermissionAPI = false;

          // Gọi API lấy danh sách quốc gia
          this.APIGetListCountry(this.gridState);
        }
      });

    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
  }

  //dùng này để tránh lỗi ng0100
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  //=========================== FORM DATA ===========================
  loadFormData() {

  }

  //=========================== SEARCH ===========================
  //#region Search
  onSearch(event: CompositeFilterDescriptor): void {
    const rawValue = (event?.filters?.[0] as FilterDescriptor)?.value?.toString().trim() ?? '';

    const keyword = rawValue
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .toLowerCase();

    if (!Ps_UtilObjectService.hasValueString(keyword)) {
      // reset
      this.gridCountries = [...this.allCountries];
      this.APIGetListCountry(this.gridState);
    } else {
      // gọi API theo keyword gốc (có dấu)
      const filter: State = {
        ...this.gridState,
        filter: {
          logic: 'and',
          filters: [
            { field: 'VNName', operator: 'contains', value: rawValue }
          ]
        }
      };

      this.APIGetListCountry(filter);
    }
  }

  //#endregion

  onResetFilter() {
    this.keyword = '';
    this.reloadData();
  }

  /**
   * đồng bộ filterStatus vào gridState
   */
  onLoadFilter() {
    this.gridState.filter.filters = [];
    this.filterStatus.filters = [];

    if (Ps_UtilObjectService.hasListValue(this.filterSearch.filters)) {
      this.gridState.filter.filters.push(this.filterSearch);
      console.log(this.gridState.filter.filters);
    }
  }

  /**
  * Hàm load dữ liệu mặc định
  */
  onLoadDefault() {

    this.onLoadFilter();
    this.APIGetListCountry(this.gridState);

    this.CountryForm = this.onLoadForm();
    this.CountryForm.patchValue(new DTOCountry);
  }

  /**
  * Load form
  */
  onLoadForm(): UntypedFormGroup {
    const form = this.formBuilder.group({});
    const dto = new DTOCountry();

    // Lặp qua các trường trong DTO và gán giá trị mặc định cho form
    Object.keys(dto).forEach((key) => {
      const value = dto[key];  // Lấy giá trị từ DTO

      // Gán giá trị mặc định vào form control
      form.addControl(
        key,
        this.formBuilder.control(value, key === 'Code' ? Validators.required : null)
      );
    });

    return form;
  }

  //#region Hàm cập nhật/tạo mới dữ liệu
  onUpdateCountry() {
    const updateCountry: DTOCountry = this.CountryForm.getRawValue();
    const isAddForm = Number(updateCountry.Code) === 0;

    const ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Quốc gia`;

    // Đặt touched để hiển thị validate lỗi
    this.CountryForm.markAllAsTouched();

    // Thu thập field nào invalid để show lỗi
    const errorFields: string[] = [];
    if (this.CountryForm.get('VNName')?.invalid) errorFields.push('Tên Tiếng Việt');
    if (this.CountryForm.get('VNOrigin')?.invalid) errorFields.push('Tên Xuất xứ');
    if (this.CountryForm.get('CountryID')?.invalid) errorFields.push('Mã hành chính');

    // Nếu có lỗi thì show cảnh báo
    if (this.CountryForm.invalid || errorFields.length > 0) {
    this.layoutService.onError(
      `Đã xảy ra lỗi khi ${ctx}: Vui lòng nhập (${errorFields.join(', ')})`
    );
    return;
  }

    // Gọi API update
    this.APIUpdateCountry(updateCountry);
  }

  //#endregion

  /**
  * Đóng drawer
  */
  handleCloseDrawer(): void {
    this.isOpenDrawer = false;
    this.CountryForm.reset();
  }

  @ViewChild('search', { static: false }) searchComponent: any;
  reloadData() {
    this.searchComponent.value = '' //reset value trong input search
    this.keyword = ''
    this.gridState.filter.filters = [];
    // this.APIGetListCompany(this.gridState)
    this.APIGetListCountry(this.gridState);
  }

  //#region  DRAWER 
  /**
   * 
   * @param type Loại hành động thực hiện 0:tạo mới, 1:chỉnh sửa, 2:xem, 3:đóng
   * @param data Đối tượng quốc gia được truyền vào khi xem hoặc chỉnh sửa
   * @returns 
   */
  onOpendDrawer(type: number, data: DTOCountry = new DTOCountry()) {
    if (type === 3) {
      this.handleCloseDrawer();
      return;
    }

    this.isOpenDrawer = true;

    if (type === 0) {
      this.TypeAction = 0;
      this.CountryForm.reset(this.formDataDefault);
      this.CountryForm.get('CountryID')?.enable();
      this.dataCountry = new DTOCountry();

    } else if (type === 1 && Ps_UtilObjectService.hasValue(data)) {
      this.TypeAction = 1;
      this.CountryForm.reset(); // clear state
      this.CountryForm.patchValue(data); // gán DTO vào form
      this.CountryForm.get('CountryID')?.disable();
      this.dataCountry = { ...data };

    } else if (type === 2 && Ps_UtilObjectService.hasValue(data)) {
      this.TypeAction = 2;
      this.CountryForm.reset();
      this.CountryForm.patchValue(data);
      this.CountryForm.disable();
      this.dataCountry = { ...data };
    }

    if (!(this.isAllPers || this.isCanCreate)) {
      this.CountryForm.disable();
    }
  }
  ////#endregion


  //#region  DIALOG 
  onCloseDialog(): void {
    this.opened = false;
  }

  /**
   * Hàm xử lý xoá item trong dialog
   * @param type 0: có, 1: không
   * @returns 
   */
  onDeleteDialog(type: number): void {
    if (type !== 0) {
      this.opened = false;
      return;
    }

    if (!Ps_UtilObjectService.hasValue(this.dataCountry?.Code)) {
      this.layoutService.onWarning('Không có Quốc gia để xoá');
      this.opened = false;
      return;
    }

    this.APIDeleteCountry([this.dataCountry]);
    this.opened = false;


  }
  //#endregion

  //#region  DROPDOWN 
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any) {  //hàm thêm option vào dropdown
    moreActionDropdown = []

    if (this.isAllPers || this.isCanCreate) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true })
      moreActionDropdown.push({ Name: "Xóa", Code: "trash", Link: "delete", Actived: true })
    } else {

      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true })
    }
    return moreActionDropdown
  }

  onActionDropdownClick(menu: MenuDataItem, item: DTOCountry) {  // hàm act của item trong dropdown
    this.dataCountry = item
    if (item.Code != 0) {
      if (menu.Link == 'delete' || menu.Code == 'trash') {
        this.opened = true;
      }
      else if (menu.Link == 'edit' || menu.Code == 'pencil') {
        this.onOpendDrawer(1, item)
      }
      else if (menu.Link == 'view' || menu.Code == 'eye') {
        this.onOpendDrawer(2, item)
      }
    }
  }
  //#endregion

  // =========================== CAll ALL API ===========================
  getApi() {
    this.APIGetListCountry(this.gridState);
  }

  // =========================== API ===========================

  //#region API GET LIST
  /**
   * 
   * @param filter Cấu hình state của Kendo Grid (bao gồm skip, take, sort, filter,...)
   */
  APIGetListCountry(filter: State) {
    this.isLoading = true;

    this.arrUnsubscribe.push(
      this.apiServiceConf.GetListCountry(filter)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(
          (res: any) => {
            this.isLoading = false;

            if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
              this.gridCountries = res.ObjectReturn.Data;
              this.allCountries = res.ObjectReturn.Data;
            } 
          },
          (error) => {
            this.isLoading = false;
            this.layoutService.onError(
              `Đã xảy ra lỗi khi lấy Danh sách quốc gia: ${error?.Message ?? error}`
            );
            this.gridCountries = [];
            this.allCountries = [];
          }
        )
    );
  }
  //#endregion

  //#region API UpdateCountry
  APIUpdateCountry(country: DTOCountry): void {
    if (!country) {
      this.layoutService.onWarning('Dữ liệu quốc gia không hợp lệ');
      return;
    }

    const isAddForm = Number(country.Code) === 0;

    if (!isAddForm && this.dataCountry) {
      const noChange =
        (country.VNName ?? '').trim().toLowerCase() === (this.dataCountry.VNName ?? '').trim().toLowerCase() &&
        (country.VNOrigin ?? '').trim().toLowerCase() === (this.dataCountry.VNOrigin ?? '').trim().toLowerCase() &&
        (country.CountryID ?? '').trim().toLowerCase() === (this.dataCountry.CountryID ?? '').trim().toLowerCase();

      if (noChange) {
        return;
      }
    }

    this.isLoading = true;

    this.arrUnsubscribe.push(
      this.apiServiceConf.UpdateCountry(country)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.APIGetListCountry({ ...this.gridState });
          })
        )
        .subscribe((res: any) => {
          if (res?.StatusCode === 0) {
            this.layoutService.onSuccess(
              country.Code ? 'Cập nhật thành công' : 'Tạo mới thành công'
            );
            this.handleCloseDrawer();
          } 
        }, (error) => {
          this.layoutService.onError(
            `Không thể gọi API cập nhật quốc gia: ${error}`
          );
        })
    );
  }
  //#endregion

  //#region API Delete country
  /**
   * 
   * @param listDelete Danh sách quốc gia cần xóa
   * @returns 
   */
  APIDeleteCountry(listDelete: DTOCountry[] = []): void {
    if (!listDelete?.length) {
      this.layoutService.onWarning('Vui lòng chọn Quốc gia để xoá');
      return;
    }

    this.isLoading = true;

    this.arrUnsubscribe.push(
      this.apiServiceConf.DeleteCountry(listDelete.map(x => ({ Code: x.Code } as DTOCountry)))
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.APIGetListCountry({ ...this.gridState });
          })
        )
        .subscribe((res: any) => {
          if (res?.StatusCode === 0) {
            this.layoutService.onSuccess('Xoá Quốc gia thành công');
            this.handleCloseDrawer();
          } 
        }, (error) => {
          this.layoutService.onError(
            `Không thể gọi API xoá Quốc gia: ${error}`
          );
        })
    );

  }
  //#endregion

  //  =========================== ngOnDestroy ===========================
  ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
    this.ngUnsubscribe$.unsubscribe();
  }
}