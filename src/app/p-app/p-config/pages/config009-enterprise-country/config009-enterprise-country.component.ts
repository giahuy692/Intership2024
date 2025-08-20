import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { CompositeFilterDescriptor, distinct, State } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { DTOCompany } from 'src/app/p-app/p-developer/shared/dto/DTOCompany';
import { DTOLSDistrict } from 'src/app/p-app/p-ecommerce/shared/dto/DTOLSDistrict.dto';
import { DTOLSProvince } from 'src/app/p-app/p-ecommerce/shared/dto/DTOLSProvince.dto';
import { DTOLSWard } from 'src/app/p-app/p-ecommerce/shared/dto/DTOLSWard.dto';
import { DTODataPermission } from '../../shared/dto/DTODataPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
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
  drawer: any;
  isSystem: boolean = false

  listNationalityFilter: DTOCountry[] = [];
  listNationality: DTOCountry[] = [];
  gridCountries: DTOCountry[] = [];
  private allCountries: DTOCountry[] = [];

  gridState: State = {
    filter: { filters: [], logic: 'and' },
  }
  isAction: number = 0;


  formDataDefault = ({
    Code: 0,
    CountryID: '',
    VNName: '',
    JPName: '',
    ENName: '',
    VNOrigin: '',
    OrderBy: 1,
    IsSystem: false
  });



  SelectedCountry: any
  SelectedProvince: { VNName: string; Code: number }
  SelectedDistrict: { VNName: string; Code: number }
  SelectedWard: { VNName: string; Code: number }

  filteredWardList: DTOLSWard[] = []
  filteredDistricList: DTOLSDistrict[] = []
  filteredProvinceList: DTOLSProvince[] = []
  isautoCollapse: boolean = false;

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
  GetListCountrySst: Subscription;
  DeleteCountry_sst: Subscription;
  GetNationality_sst: Subscription;
  GetListDistrict_sst: Subscription;
  GetListWard_sst: Subscription;
  arrUnsubscribe: Subscription[] = [];
  ngUnsubscribe$ = new Subject<void>();

  // form data
  formData: FormGroup;


  // varible of grid
  loading: boolean = false
  justLoaded: boolean = true
  skip: number = 0;
  keyword: string = ''
  tempSearch: any

  filterStatus: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }

  isMaster: boolean = false; // Toàn quyền
  isCreator: boolean = false; // Quyền tạo
  isApprover: boolean = false; // Quyền duyệt
  M_A: boolean = false; // Master hoặc Approver
  M_C: boolean = false; // Master hoặc Creator

  CountryForm: UntypedFormGroup;

  isLoading: boolean = false;
  isCreate: boolean = false; // Có tạo mới hay không
  isEdit: boolean = false; // Có chỉnh sửa hay không
  isUpdateButton: boolean = false; // Có hiện nút cập nhật hay không
  isOpenDrawer: boolean = false; // Có mở drawer hay không
  isFilterActive: boolean = true // Có check filter status không
  isAutoCollapse: boolean = false; // Có tự động đóng drawer khi click ra ngoài không

  dataCompany_System: DTOCompany[] = []
  dataCountry: DTOCountry = new DTOCountry()
  dataCountryForm: any

  flagSuccess: boolean = false

  //permission 
  isAllPers: boolean = false
  isCanCreate: boolean = false
  isCanApproved: boolean = false
  justLoadedChangePermissionAPI: boolean = true
  justLoadedPer: boolean = true
  dataPerm: DTODataPermission[] = [];
  actionPerm: DTOActionPermission[] = [];

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
    // Check permission
    let changePermissionSst = this.menuService.changePermission().pipe(takeUntil(this.destroy)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');

        this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
        this.isApprover = this.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;

        this.M_A = this.isMaster || this.isApprover;
        this.M_C = this.isMaster || this.isCreator;
      }
    })

    let permissionAPI = this.menuService.changePermissionAPI().subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.onLoadDefault();
      }
    })
    this.arrUnsubscribe.push(changePermissionSst, permissionAPI);

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
  onSearch(event: any) {
    console.log(event);
    if (event.filters && event.filters.length > 0) {
      if (event.filters[0].value === '') {
        console.log('bbbb');
        this.gridState.filter.filters = [];
        this.filterSearch.filters = [];
        // this.gridState.skip = 1;
        this.onLoadFilter();
      } else if (Ps_UtilObjectService.hasValueString(event?.filters?.[0]?.value)) {
        this.filterSearch = event;
        this.tempSearch = event;
        // this.gridState.skip = 1;
        console.log(this.filterSearch);
        this.onLoadFilter();
      }
      this.APIGetListCountry(this.gridState);
    }
  }
  //#endregion

  onResetFilter() {
    this.keyword = '';
    this.reloadData();
  }

  /** Hàm xử lý filter
*/
  onLoadFilter() {
    // reset filler
    // this.gridState.take = this.pageSize;
    // this.gridState.filter.filters = [];
    this.gridState.filter.filters = [];
    this.filterStatus.filters = [];

    if (Ps_UtilObjectService.hasListValue(this.filterSearch.filters)) {
      // if (this.tempSearch[0].value != '') {
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
    if (!Ps_UtilObjectService.hasValueString(this.CountryForm.getRawValue().VNName)) {
      return this.layoutService.onWarning('Vui lòng nhập Tên Tiếng Việt');
    }
    if (!Ps_UtilObjectService.hasValueString(this.CountryForm.getRawValue().VNOrigin)) {
      return this.layoutService.onWarning('Vui lòng nhập Tên Xuất xứ');
    }
    if (this.isAction === 0 && !Ps_UtilObjectService.hasValueString(this.CountryForm.getRawValue().CountryID)) {
      return this.layoutService.onWarning('Vui lòng nhập Mã hành chính');
    }
    else {
      this.APIUpdateCountry();
    }
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

  //=========================== DRAWER ===========================
  onOpendDrawer(type: number, data: DTOCountry = new DTOCountry()) {
    if (type === 3) {
      this.handleCloseDrawer();
      return;
    }

    this.isOpenDrawer = true;

    if (type === 0) {
      this.isAction = 0;
      this.CountryForm.reset(this.formDataDefault);
      this.CountryForm.get('CountryID')?.enable();
    } else if (type === 1 && Ps_UtilObjectService.hasValue(data)) {
      this.isAction = 1;
      this.CountryForm.reset({
        Code: data.Code ?? 0,
        CountryID: data.CountryID ?? '',
        VNName: data.VNName ?? '',
        JPName: data.JPName ?? '',
        ENName: data.ENName ?? '',
        VNOrigin: data.VNOrigin ?? '',
        OrderBy: data.OrderBy ?? 1,
      });
      this.CountryForm.get('CountryID')?.disable();
    }

  }

  //#region hàm xác định là drawer tạo hay drawer cập nhật
  onActionEdit(type: number, data: DTOCountry) {
    this.isAction = 0
    this.dataCountry = data
    this.dataCountryForm = { ... this.dataCountry }
    if (type == 0) { //drawer tạo mới 
      this.dataCountry = {
        Code: 0,
        CountryID: "",
        VNName: "",
        JPName: "",
        ENName: "",
        VNOrigin: "",
        OrderBy: 1
      }

      this.isAction = 0
    }
    else if (type == 1) { //drawer cập nhật

      if (Ps_UtilObjectService.hasValue(data)) {
        this.dataCountry = data
        this.isAction = 1
      }
      // check nếu công ty đã có các trường thông tin này thì fill lên
      // if (Ps_UtilObjectService.hasValue(this.listNationalityFilter)) {
      //   this.onFilterAddress(data.VNName, 'VNName')
      // }
      // if (Ps_UtilObjectService.hasValue(this.provinceListFilter)) {
      //   this.onFilterAddress(data.Province, 'Province')

      // }
      // if (Ps_UtilObjectService.hasValue(this.districtListFilter)) {
      //   this.onFilterAddress(data.District, 'District')

      // }
      // if (Ps_UtilObjectService.hasValue(this.wardListFilter)) {
      //   this.onFilterAddress(data.Ward, 'Ward')

      // }
    }

    this.dataCountryForm = { ... this.dataCountry };
    if (this.dataCountryForm === undefined) {
      (this.dataCountryForm as any) = false;
    }

    this.isOpenDrawer = true;


  }
  //#endregion

  //#region search trong dropdown
  handleFilterNational(value: string) {
    const v = (value ?? '').toLowerCase();
    this.listNationalityFilter = this.listNationality.filter(s => {
      const vn = (s?.VNName ?? '').toLowerCase();
      const en = (s?.ENName ?? '').toLowerCase();
      const jp = (s?.JPName ?? '').toLowerCase();
      const id = (s?.CountryID ?? '').toLowerCase();
      return vn.includes(v) || en.includes(v) || jp.includes(v) || id.includes(v);
    });
  }
  //#endregion

  //#region =========================== DIALOG ===========================
  onCloseDialog(): void {
    this.opened = false;
  }

  onDeleteDialog(status: string): void {
    console.log('%c[onDeleteDialog] fired', 'color:#0aa;font-weight:bold;', { status, time: new Date().toISOString() });

    if (status !== 'yes') {
      console.log('[onDeleteDialog] user canceled → close dialog');
      this.opened = false;
      return;
    }

    console.log('[onDeleteDialog] current dataCountry =', this.dataCountry);
    const code = this.dataCountry?.Code

    console.log('[onDeleteDialog] extracted code =', code);
    if (!Ps_UtilObjectService.hasValue(code)) {
      console.warn('[onDeleteDialog] missing code → abort delete');
      this.layoutService.onWarning('Không xoá được Quốc gia');
      this.opened = false;
      return;
    }

    const payload: DTOCountry[] = [{ Code: code } as DTOCountry];
    console.log('[onDeleteDialog] calling APIDeleteCountry with payload =', payload);
    this.APIDeleteCountry(payload);
    this.opened = false;


  }
  //#endregion

  // =========================== DROPDOWN ===========================
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any) {  //hàm thêm option vào dropdown
    moreActionDropdown = []
    moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true })
    moreActionDropdown.push({ Name: "Xóa", Code: "trash", Link: "delete", Actived: true })
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
    }
  }

  // =========================== CAll ALL API ===========================
  getApi() {
    this.APIGetListCountry(this.gridState);
  }

  // =========================== API ===========================

  //#region API GET LIST
  APIGetListCountry(filter: State) {
    this.loading = true;
    this.GetListCountrySst = this.apiServiceConf.GetListCountry(filter)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res: any) => {
          this.loading = false;
          if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode === 0) {
            const data: DTOCountry[] = res.ObjectReturn.Data as DTOCountry[];
            // lưu dữ liệu
            this.allCountries = data;
            this.listNationality = data;
            this.listNationalityFilter = data;
            // bind ra grid + áp filter theo this.keyword
            this.applyCountryFilter();
          } else {
            this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách quốc gia: ${res.ErrorString}`);
          }
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách quốc gia: ${error}`);
        }
      );

    this.arrUnsubscribe.push(this.GetListCountrySst);
  }
  //#endregion

  //#region API UpdateCountry
  APIUpdateCountry() {
    this.isLoading = true;
    let a = this.apiServiceConf.UpdateCountry(this.CountryForm.getRawValue()).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
        this.layoutService.onSuccess(this.CountryForm.getRawValue().Code != 0 ? 'Cập nhật thành công' : 'Tạo mới thành công');
        this.handleCloseDrawer();
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${this.CountryForm.getRawValue().Code != 0 ? 'cập nhật quốc gia' : 'tạo mới quốc gia'}: ${res.ErrorString}`)
      }
      this.isLoading = false;
      this.APIGetListCountry(this.gridState);
    })
    this.arrUnsubscribe.push(a);

  }
  //#endregion

  //#region
  APIDeleteCountry(itemDelete: DTOCountry[] = []) {
    console.log('[APIDeleteCountry] ENTER', { itemDelete, dataCountry: this.dataCountry });

    const def = this.apiServiceConf.config.getAPIList().DeleteCountry;

    const payload: DTOCountry[] =
      Array.isArray(itemDelete) && itemDelete.length
        ? itemDelete.map(x => ({ Code: x.Code } as DTOCountry)) // chỉ giữ field cần thiết
        : (this.dataCountry?.Code
          ? [{ Code: this.dataCountry.Code } as DTOCountry]
          : []);

    console.log('[DeleteCountry DEF]', def.method, def.url, 'payload =', payload);

    if (!payload.length) {
      this.layoutService.onWarning('Không tìm thấy Quốc gia để xoá');
      return;
    }

    this.isLoading = true;

    this.apiServiceConf.DeleteCountry(payload)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.APIGetListCountry({ ...this.gridState });
        })
      )
      .subscribe({
        next: (res) => {
          console.log('[APIDeleteCountry] res =', res);
          const affected =
            typeof res?.ObjectReturn === 'number' ? res.ObjectReturn :
              typeof res?.ObjectReturn === 'boolean' ? (res.ObjectReturn ? 1 : 0) :
                typeof res?.ObjectReturn === 'object' && res?.ObjectReturn?.AffectRows ? res.ObjectReturn.AffectRows : undefined;

          if (res?.StatusCode === 0) {
            this.layoutService.onSuccess('Xóa quốc gia thành công');
            this.handleCloseDrawer();

            // Cập nhật UI ngay 
            if (Array.isArray(this.gridCountries)) {
              const toDelete = new Set(payload.map(p => p.Code));
              this.gridCountries = this.gridCountries.filter(x => !toDelete.has(x.Code));
            }
          } else {
            this.layoutService.onError(`Xoá không thành công: ${res?.ErrorString ?? 'không có bản ghi bị ảnh hưởng'}`);
          }
        },
        error: (err) => {
          const msg = err?.error?.ErrorString ?? err?.message ?? String(err);
          this.layoutService.onError(`Đã xảy ra lỗi khi xóa quốc gia: ${msg}`);
        }
      });
  }
  //#endregion

  private applyCountryFilter(): void {
    const key = (this.keyword ?? '').trim().toLowerCase();
    if (!key) {
      this.gridCountries = this.allCountries.slice();
      return;
    }
    this.gridCountries = this.allCountries.filter(c => {
      const vn = (c.VNName ?? '').toLowerCase();
      const en = (c.ENName ?? '').toLowerCase();
      const jp = (c.JPName ?? '').toLowerCase();
      const id = (c.CountryID ?? '').toLowerCase();
      const org = (c.VNOrigin ?? '').toLowerCase();
      return vn.includes(key) || en.includes(key) || jp.includes(key) || id.includes(key) || org.includes(key);
    });
  }

  //#region API DELETE
  // APIDeleteCompany(dataDelete: DTOCompany) {
  //   const tx = dataDelete.IsSystem === true ? 'Hệ thống' : 'Công ty'
  //   this.DeleteCompany_sst = this.apiService.DeleteCompany(dataDelete).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
  //     (res) => {
  //       this.loading = false;
  //       if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
  //         this.layoutService.onSuccess(`Xóa ${tx} thành công`)
  //       }
  //       else {
  //         this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${tx}: ${res.ErrorString}`)
  //       }

  //       this.APIGetListCompany(this.gridState)
  //     },
  //     (error) => {
  //       this.loading = false
  //       this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${tx}: ${error}`)
  //       this.APIGetListCompany(this.gridState)
  //     }
  //   )
  //   this.arrUnsubscribe.push(this.DeleteCompany_sst);
  // }
  //#endregion



  //  =========================== ngOnDestroy ===========================
  ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
    this.ngUnsubscribe$.unsubscribe();
  }
}