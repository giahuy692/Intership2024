import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CompositeFilterDescriptor, FilterDescriptor, State } from '@progress/kendo-data-query';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { LayoutAPIService } from 'src/app/p-app/p-layout/services/layout-api.service';
import { PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { DTOSEO, IDTOSEO } from '../../shared/dto/DTOSEO';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { MarSEOAPIService } from '../../shared/services/mar-seo-api.service';

@Component({
  selector: 'app-mar020-seo',
  templateUrl: './mar020-seo.component.html',
  styleUrls: ['./mar020-seo.component.scss']
})
export class Mar020SEOComponent implements OnInit, OnDestroy {
  loading = false
  isAdd = true
  isFilterActive = true
  justLoadedChangePermissionAPI: boolean = true
  //object
  curSEO = new DTOSEO()
  //list
  listSEO: DTOSEO[] = []
  //grid
  pageSize = 20
  pageSizes = [this.pageSize]
  gridDSView: BehaviorSubject<any> = new BehaviorSubject({ data: [], total: 0 })
  gridDSState: State = {
    skip: 0,
    take: this.pageSize,
    filter: { filters: [], logic: 'and' },
  }
  //grid select
  getSelectionPopupCallback: Function
  onSelectCallback: Function
  onSelectedPopupBtnCallback: Function
  //select
  selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: false,
    checkboxOnly: true,
  }
  ////filter
  //header2
  filterSearchBox: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }
  //Element
  @ViewChild('drawer') drawer: MatSidenav;
  form: FormGroup<IDTOSEO>;
  //callback  
  onPageChangeCallback: Function
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function
  //SUB
  unsub: Subject<any> = new Subject()

  constructor(
    public layoutService: LayoutService,
    public layoutApiService: LayoutAPIService,
    public apiService: MarSEOAPIService,
    public menuService: PS_HelperMenuService,) { }

  ngOnInit(): void {
    this.loadForm()
    this.loadFilter()
    
    this.menuService.changePermissionAPI().subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.GetListSEO()
      }
    })
    //callback
    this.onPageChangeCallback = this.pageChange.bind(this)
    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
    //select
    this.getSelectionPopupCallback = this.getSelectionPopup.bind(this)
    this.onSelectCallback = this.selectChange.bind(this)
    this.onSelectedPopupBtnCallback = this.onSelectedPopupBtnClick.bind(this)
  }
  ngOnDestroy() {
    this.unsub.unsubscribe()
  }
  //load
  //api
  GetListSEO(state: State = this.gridDSState) {
    this.loading = true
    var ctx = 'Lấy dữ liệu'

    this.apiService.GetListSEO(state)
      .pipe(takeUntil(this.unsub)).subscribe(res => {
        this.loading = false

        if (res != null) {
          this.listSEO = res.Data
          this.gridDSView.next({ data: this.listSEO, total: res.Total });
        }
      }, (e) => {
        this.loading = false
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      })
  }
  UpdateSEO(SEO: DTOSEO = this.curSEO) {
    this.loading = true;
    var ctx = "Cập nhật đường dẫn"

    this.apiService.UpdateSEO(SEO)
      .pipe(takeUntil(this.unsub)).subscribe(res => {
        this.loading = false;

        if (Ps_UtilObjectService.hasValue(res)) {
          if (this.isAdd || SEO.Code <= 0) {
            SEO.Code = res
            this.listSEO.push(SEO)
            this.gridDSView.next({ data: this.listSEO, total: this.gridDSView.value.total++ });
          } else {
            let index = this.listSEO.findIndex(s => s.Code == SEO.Code)

            if (index > -1) {
              this.listSEO[index] = SEO
              this.isAdd = false
              this.gridDSView.next({ data: this.listSEO, total: this.gridDSView.value.total });
            }
          }
          this.layoutService.onSuccess(`${ctx} thành công`)
          this.drawer.close()
        }
        else
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res}`)
      }, (e) => {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
        this.loading = false;
        this.GetListSEO()
      });
  }
  ResetCacheSEO() {
    this.loading = true
    var ctx = 'Làm mới cache'

    this.apiService.ResetCacheSEO()
      .pipe(takeUntil(this.unsub)).subscribe(res => {
        this.loading = false
        this.layoutService.onSuccess(`${ctx} thành công`)

        if (res != null)
          this.GetListSEO()
      }, (e) => {
        this.loading = false
        this.layoutService.onSuccess(`${ctx} thành công`)
        // this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${e}`)
      })
  }
  //grid  
  loadFilter() {
    this.gridDSState.take = this.pageSize
    this.gridDSState.filter.filters = []
    //search box
    if (Ps_UtilObjectService.hasListValue(this.filterSearchBox.filters)
      && Ps_UtilObjectService.hasValueString((<FilterDescriptor>this.filterSearchBox.filters[0]).value))
      this.gridDSState.filter.filters.push(this.filterSearchBox)
  }
  pageChange(event: PageChangeEvent) {
    this.gridDSState.skip = event.skip;
    this.gridDSState.take = this.pageSize = event.take
    this.GetListSEO()
  }
  //kendo form
  loadForm() {
    this.form = new FormGroup({
      'Code': new FormControl(this.curSEO.Code, Validators.required),
      'URLDirect': new FormControl(this.curSEO.URLDirect, Validators.required),
      'CustomTitle': new FormControl(this.curSEO.CustomTitle),
      'H1': new FormControl(this.curSEO.H1),
      'CustomDescription': new FormControl(this.curSEO.CustomDescription),
      'CustomKeyword': new FormControl(this.curSEO.CustomKeyword),
    })
  }
  //CLICK EVENT
  //header 1  
  onAdd() {
    this.isAdd = true;
    this.clearForm()
    this.curSEO = new DTOSEO()
    this.loadForm()
    this.drawer.open();
  }
  onEdit(obj: DTOSEO) {
    this.isAdd = false
    this.curSEO = { ...obj }
    this.loadForm()
    this.drawer.open();
  }
  //header 2
  resetFilter() {
    this.filterSearchBox.filters = []
    this.loadFilter()
    this.GetListSEO()
  }
  search(e: CompositeFilterDescriptor) {
    if (Ps_UtilObjectService.hasValue(e))
      this.filterSearchBox.filters = e.filters
    else
      this.filterSearchBox.filters = []

    this.loadFilter();
    this.GetListSEO()
  }
  //form
  onSubmit(): void {
    this.form.markAllAsTouched()

    if (this.form.valid) {
      var val: DTOSEO = this.form.getRawValue()
        this.UpdateSEO(val)
    }
    else
      this.layoutService.onError("Vui lòng điền vào trường bị thiếu")
  }
  clearForm() {
    this.curSEO = new DTOSEO()
    this.form.reset()
    this.loadForm()
  }
  closeForm() {
    this.clearForm()
    this.drawer.close()
  }
  //selection 
  getSelectionPopup(selectedList: DTOSEO[]) {
    var dropdown: MenuDataItem[] = []
    
    return dropdown
  }
  onSelectedPopupBtnClick(btnType: string, list: DTOSEO[], value: any) {
    if (list.length > 0) {
      
    }
  }
  selectChange(isSelectedRowitemDialogVisible) {
    this.isFilterActive = !isSelectedRowitemDialogVisible
  }
  //popup
  getActionDropdown(dropdown: MenuDataItem[], item: DTOSEO) {
    dropdown = []

    dropdown.push({
      Name: "Chỉnh sửa", Type: "edit",
      Code: "pencil", Link: "edit", Actived: true
    })

    return dropdown
  }
  onActionDropdownClick(menu: MenuDataItem, item: DTOSEO) {
    this.curSEO = item;

    switch (menu.Link) {
      case 'edit':
        this.onEdit(item)
        break

      default:
        break
    }
  }
  //    
  keydownEnter(e: KeyboardEvent) {
    //disable close drawer
    e.preventDefault();
    e.stopPropagation();
  }
}