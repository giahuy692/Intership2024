import { Component, OnInit, ViewChild } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import {Subject, Subscription } from 'rxjs';
import { DeveloperAPIService } from 'src/app/p-app/p-developer/shared/services/developer-api.service';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { takeUntil } from 'rxjs/operators';
import { DTOCompany } from 'src/app/p-app/p-developer/shared/dto/DTOCompany';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { DTOListCountry } from 'src/app/p-app/p-hri/shared/dto/DTOPersonalInfo.dto';
import { DTOLSProvince } from 'src/app/p-app/p-ecommerce/shared/dto/DTOLSProvince.dto';
import { DTOLSDistrict } from 'src/app/p-app/p-ecommerce/shared/dto/DTOLSDistrict.dto';
import { DTOLSWard } from 'src/app/p-app/p-ecommerce/shared/dto/DTOLSWard.dto';
import { ConfigPersonalInforApiService } from '../../shared/services/config-personal-infor-api.service';

@Component({
  selector: 'app-config009-enterprise-country',
  templateUrl: './config009-enterprise-country.component.html',
  styleUrls: ['./config009-enterprise-country.component.scss']
})
export class Config009EnterpriseCountryComponent implements OnInit {

  // varible of drawer
  expandedRight: boolean = false;
  isautoCollapse: boolean = false;
  isAction: number = 0;
  notSelectedProvince: boolean = true;
  notSelectedDistrict: boolean = true;
  notSelectedWard: boolean = true;
  
  listNationalityFilter: DTOListCountry[] = [];
  listNationality: DTOListCountry[] = [];
  provinceList: DTOLSProvince[] = [];
  provinceListFilter: DTOLSProvince[] = [];
  districtList: DTOLSDistrict[] = [];
  districtListFilter: DTOLSDistrict[] = [];
  wardList: DTOLSWard[] = [];
  wardListFilter: DTOLSWard[] = [];

  gridStateCPDW: State = {
    filter: { filters: [], logic: 'and' },
  }

  // varible of Dropdown
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function

  // variable of unsubcribe
  GetListCompany_sst: Subscription;
  DeleteCompany_sst: Subscription;
  UpdateCompany_sst: Subscription;
  GetNationality_sst: Subscription;
  GetListProvince_sst: Subscription;
  GetListDistrict_sst: Subscription;
  GetListWard_sst: Subscription;
  arrUnsubscribe: Subscription[] = [];
  ngUnsubscribe$ = new Subject<void>();

  // varible of grid
  loading: boolean = false
  pageSize: number = 25
  gridState: State = {
    take: this.pageSize,
  }
  keyword: string = ''
  dataCompany_System: DTOCompany[] = []
  dataCompany: DTOCompany = new DTOCompany()
  dataCompanyForm: any

  constructor(
    public apiService: DeveloperAPIService,
    public layoutService: LayoutService,
    public apiServiceConf: ConfigPersonalInforApiService,
  ) {
  }

  ngOnInit(): void {

  }

  @ViewChild('search', { static: false }) searchComponent: any;
  reloadData() {
    this.searchComponent.value = '' //reset value trong input search
    this.keyword = ''
    this.APIGetListCompany(this.gridState)
  }

  //#region API GET LIST
  APIGetListCompany(state: State) {

    this.loading = true;
    this.GetListCompany_sst = this.apiService.GetListCompany(state, this.keyword).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
      (res) => {
        this.loading = false
        if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
          this.dataCompany_System = res.ObjectReturn.Data
        }
        else {
          this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách công ty: ${res.ErrorString}`)
        }

      },
      (error) => {
        this.loading = false
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy danh sách công ty: ${error} `)
      }
    )


    this.arrUnsubscribe.push(this.GetListCompany_sst)
  }
  //#endregion

  //=========================== DRAWER ===========================
  onOpendDrawer(type: number, data: DTOCompany = new DTOCompany()) {
    if (type == 0 || type == 1) {
      this.onActionEdit_Cre(type, data)
      this.expandedRight = true
      this.isautoCollapse = false
    } else if (type == 3) {
      this.expandedRight = false
    }

  }

  //=========================== SEARCH ===========================
  onSearch(keySearch) {
    this.keyword = keySearch
    this.APIGetListCompany(this.gridState)
  }
  onResetFilter() {
    this.keyword = ''
    this.APIGetListCompany(this.gridState)
  }

  //#region hàm xác định là drawer tạo hay drawer cập nhật
  onActionEdit_Cre(type: number, data: DTOCompany) {
    this.isAction = 0
    this.dataCompany = data
    this.dataCompanyForm = { ... this.dataCompany }
    if (type == 0) { //drawer tạo mới 
      this.dataCompanyForm = {
        Code: 0,
        VNName: '',
        CompanyID: null,
        Bieft: '',
        Address: null,
        CountryName: null,
        TypeCompanyName: null,
        URLLogo: '',
        Country: null,
        Province: null,
        District: null,
        Ward: null,
        ConfigDesc: '',
        IsSystem: false
      }

      this.isAction = 0
      this.notSelectedProvince = true;
      this.notSelectedDistrict = true;
      this.notSelectedWard = true;
    }
    else if (type == 1) { //drawer cập nhật

      if (Ps_UtilObjectService.hasValue(data)) {
        // this.formData.patchValue(data)
        this.dataCompany = data
        this.isAction = 1
      }
      // check nếu công ty đã có các trường thông tin này thì fill lên
      if (Ps_UtilObjectService.hasValue(this.listNationalityFilter)) {
        this.onFilterAddress(data.Country, 'Country')
      }
      if (Ps_UtilObjectService.hasValue(this.provinceListFilter)) {
        this.onFilterAddress(data.Province, 'Province')

      }
      if (Ps_UtilObjectService.hasValue(this.districtListFilter)) {
        this.onFilterAddress(data.District, 'District')

      }
      if (Ps_UtilObjectService.hasValue(this.wardListFilter)) {
        this.onFilterAddress(data.Ward, 'Ward')

      }
    }


  }
  //#endregion

  //#region  xử lý gọi api cho dropdown country, province, district
  onFilterAddress(code: number, field: string) {
    this.gridStateCPDW.filter.filters = []
    if (Ps_UtilObjectService.hasValue(code)) { // kiểm tra code có null không
      if (field == 'Country') {
        this.gridStateCPDW.filter.filters.push(({ field: 'Country', operator: 'eq', value: code }))
        this.APIGetListProvince(this.gridStateCPDW)
        this.notSelectedProvince = false;
        this.dataCompanyForm.Country = code

      }
      else if (field == 'Province') {
        this.gridStateCPDW.filter.filters.push(({ field: 'Province', operator: 'eq', value: code }))
        this.APIGetListDistrict(this.gridStateCPDW)
        this.notSelectedDistrict = false;
        this.dataCompanyForm.Province = code
      }
      else if (field == 'District') {
        this.gridStateCPDW.filter.filters.push(({ field: 'District', operator: 'eq', value: code }))
        this.APIGetListWard(this.gridStateCPDW)
        this.notSelectedWard = false;
        this.dataCompanyForm.District = code
      }
      else if (field == 'Ward') {
        this.dataCompanyForm.Ward = code
      }
    }
    else {  //trường hợp chọn dropdown value null
      if (code == null && field == 'Country') {
        this.notSelectedProvince = true;
        this.notSelectedDistrict = true;
        this.notSelectedWard = true;
        this.dataCompanyForm.Country = code
        this.dataCompanyForm.Province = code
        this.dataCompanyForm.District = code
        this.dataCompanyForm.Ward = code
      }
      else if (code == null && field == 'Province') {
        this.notSelectedDistrict = true;
        this.notSelectedWard = true;
        this.dataCompanyForm.Province = code
        this.dataCompanyForm.District = code
        this.dataCompanyForm.Ward = code
      }
      else if (code == null && field == 'District') {
        this.notSelectedWard = true;
        this.dataCompanyForm.District = code
        this.dataCompanyForm.Ward = code

      }

    }
  }
  //#endregion

  //#region API GET PROVINCE
  APIGetListProvince(state: State) {
    this.GetListProvince_sst = this.apiServiceConf.GetListProvince(state).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: any) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.provinceList = res.ObjectReturn.Data
        this.provinceListFilter = res.ObjectReturn.Data
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Tỉnh thành: ${res.ErrorString}`)
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Tỉnh thành: ${err}`);
    });
    this.arrUnsubscribe.push(this.GetListProvince_sst);
  }
  //#endregion

  //#region API HET DISTRICT
  APIGetListDistrict(state: State) {
    this.GetListDistrict_sst = this.apiServiceConf.GetListDistrict(state).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: any) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.districtList = res.ObjectReturn.Data
        this.districtListFilter = res.ObjectReturn.Data
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Quận huyện: ${res.ErrorString}`)
      }
    }, (err) => {
      this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Quận huyện: ${err}`);
    });
    this.arrUnsubscribe.push(this.GetListDistrict_sst);
  }
  //#endregion

  //#region API GET WARD
  APIGetListWard(state: State) {
    this.GetListWard_sst = this.apiServiceConf.GetListWard(state).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && Ps_UtilObjectService.hasValue(res.ObjectReturn) && res.StatusCode == 0) {
        this.wardList = res.ObjectReturn.Data
        this.wardListFilter = res.ObjectReturn.Data
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Phường xã: ${res.ErrorString}`)
      }
    },
      (error) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi lấy Danh sách Phường xã: ${error}`);
      }
    );
    this.arrUnsubscribe.push(this.GetListWard_sst);
  }
  //#endregion  
}
