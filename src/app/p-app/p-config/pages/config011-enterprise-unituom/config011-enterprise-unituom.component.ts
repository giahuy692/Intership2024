import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DTOPackingUnit } from '../../shared/dto/DTOPackingUnit';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { CompositeFilterDescriptor, FilterDescriptor, State } from '@progress/kendo-data-query';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { ConfigEnterpriceApiService } from '../../shared/services/config-enterprice-api.service';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';

@Component({
  selector: 'app-config011-enterprise-unituom',
  templateUrl: './config011-enterprise-unituom.component.html',
  styleUrls: ['./config011-enterprise-unituom.component.scss']
})
export class Config011EnterpriseUnituomComponent implements OnInit{

  @ViewChild('formDrawer') public drawer: MatDrawer;
  @ViewChild('search', { static: false }) searchComponent: any;

  //Biến loading
  loading: boolean = false

  // Biến danh sách các đơn vị tính từ API
  dataUnitUom: DTOPackingUnit[] = [];

  // Biến dữ liệu của một đơn vị tính hiện đang được chọn hoặc thao tác
  dataPackingUnit: DTOPackingUnit = new DTOPackingUnit()

  // Biến dữ liệu gốc
  originalPackingUnittData: DTOPackingUnit | null = null;

  /**
  * Trạng thái dữ liệu (State) của Grid
  * @type {State}
  */
  gridState: State = { filter: { logic: 'and', filters: [] } };

  // Biến DIALOG
  dialog: boolean = false;

  // Biến Dropdown
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function

  // Trạng thái ẩn/hiện button
  isBtnHide: boolean = false
  isFeildDisabled: boolean = false
  isImpose: boolean = false

  //phân quyền
  justLoadedPer: boolean = true;
  justLoadedChangePermissionAPI: boolean = true
  isAllPers: boolean = false
  isCanCreate: boolean = true

  // Biến unsubcribe
  ngUnsubscribe$ = new Subject<void>();

  //dto form Packing Unit
  apiPackingUnitForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    VNPackingUnit: new FormControl(''),
    JPPackingUnit: new FormControl(''),
    ENPackingUnit: new FormControl(''),
    OrderBy: new FormControl(null), 
    TypeData: new FormControl(1),
  })

  constructor( 
    public menuService: PS_HelperMenuService,
    private configAPIService: ConfigEnterpriceApiService,
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

    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoadedChangePermissionAPI) {
        this.justLoadedChangePermissionAPI = false
        this.APIGetListPackingUnit(this.gridState);
      }
    });

    this.onActionDropdownClickCallback = this.onActionDropdownClick.bind(this)
    this.getActionDropdownCallback = this.getActionDropdown.bind(this)
  }

  // breadcrumb
  reloadData() {
    this.searchComponent.value = '';
    this.gridState.filter.filters = []
    this.APIGetListPackingUnit(this.gridState);
  }

  // Xử lý reset
  onResetFilter() {
    this.gridState.filter.filters = []
    this.APIGetListPackingUnit(this.gridState)
  }

  //#region Xử lý tìm kiếm
  onSearch(keySearch: string) {
    const sanitizedKey = keySearch.trim().replace(/[\/.]/g, '');
    if (!sanitizedKey) {
      this.gridState.filter.filters = [];
      this.APIGetListPackingUnit(this.gridState);
      return;
    }

    const filter: FilterDescriptor = {
      field: 'VNPackingUnit',
      operator: 'contains',
      value: sanitizedKey
    };
    this.gridState.filter.filters = [filter];
    this.APIGetListPackingUnit(this.gridState);
  }
  //endregion
  
  //#region Hành động trên form
  onCloseForm() {
    this.drawer.close()
  }

  /**
 * Mở drawer với các chế độ:
 * 0: Thêm mới, 1: Chỉnh sửa, 2: Xem chi tiết.
 *
 * @param type Loại hành động (0: mới, 1: sửa, 2: xem)
 * @param data Dữ liệu đơn vị tính
 */
  onOpendDrawer(type: number, data: DTOPackingUnit = new DTOPackingUnit()) {
    if (type === 0) {
      this.apiPackingUnitForm.reset({Code: 0, OrderBy: 1, TypeData: 1});
      this.dataPackingUnit = new DTOPackingUnit();
      this.drawer.open();
    } else if (type === 1 && Ps_UtilObjectService.hasValue(data)) {
      this.apiPackingUnitForm.reset();
      this.apiPackingUnitForm.patchValue(data);
      this.dataPackingUnit = {...data};
      this.drawer.open();
    } else if (type === 2 && Ps_UtilObjectService.hasValue(data)) {
      this.apiPackingUnitForm.reset();
      this.apiPackingUnitForm.patchValue(data);
      this.isFeildDisabled = true;
      this.dataPackingUnit = { ...data };
      this.drawer.open();
    }
  }
  //endregion

  //#region Dialog
  
  // Hàm đóng dialog
  closeDialogPakingUnit() {
    this.dialog = false;
  } 

  /**
   * Tạo danh sách action cho dropdown dựa trên quyền của người dùng.
   *
   * @param moreActionDropdown Mảng chứa các action menu.
   * @param dataItem Dữ liệu item hiện tại.
   * @returns Danh sách action menu sau khi xử lý.
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[], dataItem: any) {
    moreActionDropdown = []

    if (this.isAllPers || this.isCanCreate) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true })
      moreActionDropdown.push({ Name: "Xóa", Code: "trash", Link: "delete", Actived: true })
    } else {

      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true })
    }
    return moreActionDropdown
  }
  
  /**
   * Xử lý khi người dùng chọn action từ dropdown.
   *
   * @param menu Action được chọn.
   * @param item Dữ liệu đơn vị đóng gói liên quan.
   */
  onActionDropdownClick(menu: MenuDataItem, item: DTOPackingUnit) { 
    this.dataPackingUnit = item
    if (item.Code != 0) {
      if (menu.Link == 'delete' || menu.Code == 'trash') {
        this.dialog = true;
      }
      else if (menu.Link == 'edit' || menu.Code == 'pencil') {
        this.onOpendDrawer(1, item)
      }
      else if (menu.Link == 'view' || menu.Code == 'eye') {
        this.onOpendDrawer(2, item)
      }
    }
  }

  // Hàm mở dilog
  openDialogPakingUnit() {
    this.dialog = true
  }
  //endregion

  //#region API GET LIST
  APIGetListPackingUnit (state: State) {
    let ctx = 'Lấy danh sách Đơn vị Tính'
    this.loading = true;

    if (!state.filter) { state.filter = { logic: 'and', filters: [] }; }

    state.filter.filters.push({
      field: 'TypeData',
      operator: 'eq',
      value: 1
    });

    this.configAPIService.GetListPackingUnit(state).pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res: any) => {
      if ( Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        const filteredData = res.ObjectReturn.Data;
        this.dataUnitUom = filteredData;
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`);
      }
      this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
      }
    );
  }
  //endregion

  //#region API DELETE
  APIDeletePackingUnit(dtos: DTOPackingUnit[]) {
    let ctx = `Xóa thông tin Đơn vị Tính`;
    this.loading = true;
    this.configAPIService
      .DeletePackingUnit(dtos)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListPackingUnit(this.gridState);
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            this.APIGetListPackingUnit(this.gridState);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListPackingUnit(this.gridState);
        }
      );
  }
  //endregion

  //#region API UPDATE
  APIUpdatePackingUnit(dto: DTOPackingUnit) {
    let ctx = `${dto.Code == 0 ?'Tạo mới' : "Cập nhật" } thông tin Đơn vị Tính`;
    this.loading = true;
    this.configAPIService
      .UpdatePackingUnit(dto)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res) => {
          if (Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
            this.layoutService.onSuccess(`${ctx} Thành công`);
            this.APIGetListPackingUnit(this.gridState);
            this.drawer.close();
          } else {
            this.layoutService.onError(
              `Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`
            );
            console.error(`Error in ${ctx}:`, res.ErrorString);
            this.APIGetListPackingUnit(this.gridState);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListPackingUnit(this.gridState);
        }
      );
  }
  //endregion

  //#region Xử lý cập nhật và xóa dữ liệu

  // Hàm xử lý cập nhật đơn vị tính
  onUpdatePackingUnit() {
    const updatePackingUnit: DTOPackingUnit = this.apiPackingUnitForm.getRawValue();
    const isAddForm = Number(updatePackingUnit.Code) === 0;

    let ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Đơn vị Tính`;
    if (!Ps_UtilObjectService.hasValueString(updatePackingUnit.VNPackingUnit)) {
      this.layoutService.onError(`Đã xảy ra lỗi ${ctx}: Bạn chưa nhập Tên Tiếng Việt`);
      return;
    }

    if (!isAddForm && JSON.stringify(updatePackingUnit) === JSON.stringify(this.originalPackingUnittData)) {
      this.layoutService.onWarning(`Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`);
      return;
    }
    // this.APIUpdatePackingUnit(updatePackingUnit);
  } 

  // Hàm xử lý xóa đơn vị tính
  onDeletePackingUnit(type: number): void {
    if (type !== 0) {
      this.dialog = false;
      return;
    }

    if (!Ps_UtilObjectService.hasValue(this.dataPackingUnit?.Code)) {
      this.layoutService.onWarning('Không xoá được Đơn vị Tính');
      this.dialog = false;
      return;
    }

    // const payload: DTOCountry[] = [{ Code: this.dataCountry?.Code } as DTOCountry];
    this.APIDeletePackingUnit([this.dataPackingUnit]);
    this.dialog = false;
  }
  //endregion

  ngOnDestroy(): void{
    this.ngUnsubscribe$.unsubscribe();
  }
}
