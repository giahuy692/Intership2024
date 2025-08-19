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
import { DeveloperAPIService } from 'src/app/p-app/p-developer/shared/services/developer-api.service';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { ConfigPersonalInforApiService } from '../../shared/services/config-personal-infor-api.service';
import { MarNewsProductAPIService } from 'src/app/p-app/p-marketing/shared/services/marnewsproduct-api.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTOCountry } from '../../shared/dto/DTOCountry';
import { ConfigApiConfigService } from '../../shared/services/config-api-config.service';

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
    public apiServiceConf: ConfigPersonalInforApiService,
    private changeDetector: ChangeDetectorRef,
    public menuService: PS_HelperMenuService,
    private formBuilder: FormBuilder,
    private countryServiceAPI: ConfigApiConfigService, 

  ) {
    this.loadFormData()
  }

  ngOnInit(): void {
    // let that = this
    // // phân quyền  
    // this.menuService.changePermission().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: DTOPermission) => {
    //   if (Ps_UtilObjectService.hasValue(res) && that.justLoadedPer) {
    //     that.actionPerm = distinct(res.ActionPermission, 'ActionType');
    //     that.isAllPers = that.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
    //     that.isCanCreate = that.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;
    //     that.isCanApproved = that.actionPerm.findIndex((s) => s.ActionType == 3) > -1 || false;

    //     that.justLoadedPer = false;
    //   }
    // });

    // this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
    //   if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
    //     this.justLoadedChangePermissionAPI = false
    //     this.getApi()
    //   }
    // })

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

  //#region Hàm cập nhật dữ liệu mới
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


  APIUpdateCountry() {
    this.isLoading = true;
    let a = this.apiServiceConf.UpdateCountry(this.CountryForm.getRawValue()).subscribe(res => {
      if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
        this.layoutService.onSuccess(this.CountryForm.getRawValue().Code != 0 ? 'Cập nhật thành công' : 'Tạo mới thành công');
        this.handleCloseDrawer();
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${this.CountryForm.getRawValue().Code != 0 ? 'cập nhật khai quan' : 'tạo mới khai quan'}: ${res.ErrorString}`)
      }
      this.isLoading = false;
      this.APIGetListCountry(this.gridState);
    })
    this.arrUnsubscribe.push(a);
    
  }
  //#endregion

   /**
   * Đóng drawer
   */
  handleCloseDrawer(): void {
    this.isOpenDrawer = false;
    this.CountryForm.reset();
  }

  // =========================== CAll ALL API ===========================
  getApi() {
    // this.APIGetListCompany(this.gridState)
    // this.APIGetNationality()
    this.APIGetListCountry(this.gridState);
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
    if (type == 0 || type == 1) {
      this.onActionEdit(type, data)
      this.isOpenDrawer = true
      this.isautoCollapse = false
    } else if (type == 3) {
      this.isOpenDrawer = false
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

  //#region  xử lý gọi api cho dropdown country, province, district
  // onFilterAddress(code: number, field: string) {
  //   this.gridStateCPDW.filter.filters = []
  //   if (Ps_UtilObjectService.hasValue(code)) { // kiểm tra code có null không
  //     if (field == 'Country') {
  //       this.gridStateCPDW.filter.filters.push(({ field: 'Country', operator: 'eq', value: code }))
  //       // this.APIGetListProvince(this.gridStateCPDW)
  //       this.notSelectedProvince = false;
  //       this.dataCountryForm.Country = code

  //     }
  //     else if (field == 'Province') {
  //       this.gridStateCPDW.filter.filters.push(({ field: 'Province', operator: 'eq', value: code }))
  //       this.APIGetListDistrict(this.gridStateCPDW)
  //       this.notSelectedDistrict = false;
  //       this.dataCountryForm.Province = code
  //     }
  //     else if (field == 'District') {
  //       this.gridStateCPDW.filter.filters.push(({ field: 'District', operator: 'eq', value: code }))
  //       this.APIGetListWard(this.gridStateCPDW)
  //       this.notSelectedWard = false;
  //       this.dataCountryForm.District = code
  //     }
  //     else if (field == 'Ward') {
  //       this.dataCountryForm.Ward = code
  //     }
  //   }
  //   else {  //trường hợp chọn dropdown value null
  //     if (code == null && field == 'Country') {
  //       this.notSelectedProvince = true;
  //       this.notSelectedDistrict = true;
  //       this.notSelectedWard = true;
  //       this.dataCountryForm.Country = code
  //       this.dataCountryForm.Province = code
  //       this.dataCountryForm.District = code
  //       this.dataCountryForm.Ward = code
  //     }
  //     else if (code == null && field == 'Province') {
  //       this.notSelectedDistrict = true;
  //       this.notSelectedWard = true;
  //       this.dataCountryForm.Province = code
  //       this.dataCountryForm.District = code
  //       this.dataCountryForm.Ward = code
  //     }
  //     else if (code == null && field == 'District') {
  //       this.notSelectedWard = true;
  //       this.dataCountryForm.District = code
  //       this.dataCountryForm.Ward = code

  //     }

  //   }
  // }
  // //#endregion

  //#region Xử lý khi giá trị dropdown thay đổi country, province, district
  selectionDropdownChange(e: any, field: string): void {
    // this.onFilterAddress(e, field)

    // dropdown thay đổi thì reset lại giá trị, trường hợp chọn giá trị khác
    if (field == 'Country') {
      // this.notSelectedDistrict = true;
      // this.notSelectedWard = true;
      // this.ProvinceRef.reset()
      // this.DistrictRef.reset()
      // this.WardRef.reset()
    } else if (field == 'Province') {
      // this.notSelectedWard = true;
      // this.DistrictRef.reset()
      // this.WardRef.reset()
    }
    else if (field == 'District') {
      // this.WardRef.reset()
    }
  }
  //#endregion

  //#region xử lý button Thêm/cập nhật form tới api 
  // onUpdateAdd() {
  //   this.dataCountryForm.VNName = this.dataCountryForm.VNName.trim()
  //   this.dataCountryForm.Bieft = this.dataCountryForm.Bieft.trim()
  //   const sel = this.listNationality.find(x => x.Code === this.dataCountryForm.Country);
  //   this.dataCountryForm.CountryName = sel?.VNName ?? '';

  //   if (this.dataCountryForm.Code == 0 && this.checkCode(this.dataCountryForm.CompanyID)) { //kiển tra mã bị trùng
  //     this.layoutService.onWarning(`Mã công ty đã tồn tại`)
  //   }
  //   else {
  //     if (
  //       Ps_UtilObjectService.hasValueString(this.dataCountryForm.VNName) &&
  //       Ps_UtilObjectService.hasValueString(this.dataCountryForm.Bieft) &&
  //       Ps_UtilObjectService.hasValueString(this.dataCountryForm.URLLogo) &&
  //       Ps_UtilObjectService.hasValueString(this.dataCountryForm.CompanyID)
  //     ) {
  //       this.expandedRight = this.flagSuccess === true;
  //     }
  //     else {
  //       const fieldsToCheck = [
  //         { name: 'VNName', message: 'nhập tên công ty ' },
  //         { name: 'Bieft', message: 'nhập tên viết tắt' },
  //         { name: 'URLLogo', message: 'chọn hình ảnh Logo' },
  //         { name: 'CompanyID', message: 'nhập mã công ty' },
  //       ];

  //       fieldsToCheck.forEach(field => {
  //         if (!Ps_UtilObjectService.hasValueString(this.dataCountryForm[field.name])) {
  //           this.layoutService.onWarning(`Vui lòng ${field.message}`)
  //         }
  //       });
  //     }
  //   }
  // }
  // //#endregion 

  //hàm kiểm tra trùng mã công ty
  checkCode(dataCode: any) {
    let check = this.dataCompany_System.filter(res => dataCode == res.CompanyID)
    if (Ps_UtilObjectService.hasListValue(check)) {
      return true
    }
  }

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

  // onDeleteDialog(status: string): void {
  //   if (status == 'yes') {

  //     this.APIDeleteCompany(this.dataCompany);
  //     this.opened = false;
  //   } else {
  //     this.opened = false;
  //   }
  // }
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
  //#region API DELETE
  // APIDeleteCountry(dataDelete: DTOCountry) {

  //   this.DeleteCountry_sst = this.apiService.DeleteCountry(dataDelete).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
  //       (res) => {
  //         this.loading = false;
  //         if (
  //           Ps_UtilObjectService.hasValue(res) &&
  //           Ps_UtilObjectService.hasValue(res.ObjectReturn) &&
  //           res.StatusCode == 0
  //         ) {
  //           this.layoutService.onSuccess(`Xóa ${tx} thành công`);
  //         } else {
  //           const err = res?.ErrorString ?? 'Không xác định';
  //           this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${tx}: ${err}`);
  //         }
  //         this.APIGetListCountry(this.gridState);
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.layoutService.onError(`Đã xảy ra lỗi khi xóa ${tx}: ${error}`);
  //         this.APIGetListCountry(this.gridState);
  //       }
  //     );

  //   this.arrUnsubscribe.push(this.DeleteCountry_sst);
  // }
  //#endregion

  //#region API UPDATE
  // APIUpdateCompany(dataUpdate: DTOCompany) {
  //   this.flagSuccess = false
  //   const tx = dataUpdate.IsSystem === true ? 'Hệ thống' : 'Công ty'
  //   const txAdd_Up = dataUpdate.Code === 0 ? 'Thêm mới' : 'Cập nhật'
  //   this.UpdateCompany_sst = this.apiService.UpdateCompany(dataUpdate).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
  //     (res) => {
  //       if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
  //         this.layoutService.onSuccess(`${txAdd_Up} ${tx} thành công`)
  //         this.flagSuccess = true
  //       }
  //       else {
  //         this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${tx}: ${res.ErrorString}`)
  //         this.flagSuccess = false
  //       }
  //       this.APIGetListCompany(this.gridState)
  //     },
  //     (error) => {
  //       this.layoutService.onError(`Đã xảy ra lỗi khi cập nhật ${tx}: ${error}`)
  //       this.APIGetListCompany(this.gridState)
  //       this.flagSuccess = false
  //     }
  //   )

  //   this.arrUnsubscribe.push(this.UpdateCompany_sst);
  // }
  //#endregion

  //#region API GET NATIONALITY
  APIGetNationality() {
    this.GetNationality_sst = this.apiServiceConf.GetListCountry()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: any) => {
        if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
          const data: DTOCountry[] = res.ObjectReturn.Data as DTOCountry[];
          this.listNationality = data;
          this.listNationalityFilter = data;
        } else {
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Quốc gia: ${res.ErrorString}`);
        }
      }, (err) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Quốc gia: ${err}`);
      });
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