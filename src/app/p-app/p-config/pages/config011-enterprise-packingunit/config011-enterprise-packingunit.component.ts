import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DTOPackingUnit } from '../../shared/dto/DTOPackingUnit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { ConfigEnterpriceApiService } from '../../shared/services/config-enterprice-api.service';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';

@Component({
  selector: 'app-config011-enterprise-packingunit',
  templateUrl: './config011-enterprise-packingunit.component.html',
  styleUrls: ['./config011-enterprise-packingunit.component.scss']
})
export class Config011EnterprisePackingUnitComponent implements OnInit{

  @ViewChild('formDrawer') public drawer: MatDrawer;
  @ViewChild('search', { static: false }) searchComponent: any;

  //Biến loading
  isLoading: boolean = false

  // Biến danh sách các đơn vị tính từ API
  listDataPackingUnit: DTOPackingUnit[] = [];

  // Biến dữ liệu của một đơn vị tính hiện đang được chọn hoặc thao tác
  dataPackingUnit: DTOPackingUnit = new DTOPackingUnit()

  /**
  * Trạng thái dữ liệu (State) của Grid
  * @type {State}
  */
  gridState: State = { filter: { logic: 'and', filters: [] } };

  // Biến DIALOG
  isDialog: boolean = false;

  // Biến Dropdown
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function

  // Trạng thái ẩn/hiện của trường
  isFeildDisabled: boolean = false

  //phân quyền
  justLoadedPer: boolean = true;
  actionPerm: DTOActionPermission[] = [];
  justLoadedChangePermissionAPI: boolean = true
  isAllPers: boolean = false
  isCanCreate: boolean = false 

  // Biến unsubcribe
  ngUnsubscribe = new Subject<void>();

  //dto form Packing Unit
  apiPackingUnitForm: FormGroup = new FormGroup({
    Code: new FormControl(0),
    VNPackingUnit: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
    JPPackingUnit: new FormControl(''),
    ENPackingUnit: new FormControl(''),
    OrderBy: new FormControl(0), 
    TypeData: new FormControl(1),
  })

  constructor( 
    public menuService: PS_HelperMenuService,
    private configAPIService: ConfigEnterpriceApiService,
    public layoutService: LayoutService,
  ) {}

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

    this.menuService.changePermissionAPI().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
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
    this.gridState.filter.filters = [];
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

  // Xử lý đóng form
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
      this.apiPackingUnitForm.reset({Code: 0, OrderBy: 1, TypeData: 1, JPPackingUnit: '', ENPackingUnit: ''});
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
    this.isDialog = false;
  } 

  /**
   * Tạo danh sách action cho dropdown dựa trên quyền của người dùng.
   *
   * @param moreActionDropdown Mảng chứa các action menu.
   * @returns Danh sách action menu sau khi xử lý.
   */
  getActionDropdown(moreActionDropdown: MenuDataItem[]) {
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
        this.isDialog = true;
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
    this.isDialog = true
  }
  //endregion

  //#region API GET LIST
  /**
   *  Lấy danh sách Đơn vị Tính từ API với các bộ lọc và xử lý dữ liệu trả về.
   * @param {State} state - Trạng thái hiện tại, bao gồm các thông tin về bộ lọc và sắp xếp dữ liệu.
   */
  APIGetListPackingUnit (state: State) {
    let ctx = 'Lấy danh sách Đơn vị Tính'
    this.isLoading = true;

    if (!state.filter) { state.filter = { logic: 'and', filters: [] }; }

    state.filter.filters.push({
      field: 'TypeData',
      operator: 'eq',
      value: 1
    });

    this.configAPIService.GetListPackingUnit(state).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if ( Ps_UtilObjectService.hasValue(res) && res.StatusCode == 0) {
        this.listDataPackingUnit = res.ObjectReturn.Data;
      } else {
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${res.ErrorString}`);
      }
      this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
      }
    );
  }
  //endregion

  //#region API DELETE

  /**
  * APi xóa để Xóa một hoặc nhiều đơn vị tính (Packing Unit) khỏi hệ thống.
  * @param dtos - Danh sách các đơn vị tính cần xóa.
  */
  APIDeletePackingUnit(dtos: DTOPackingUnit[]) {
    let ctx = `Xóa thông tin Đơn vị Tính`;
    this.isLoading = true;
    this.configAPIService
      .DeletePackingUnit(dtos)
      .pipe(takeUntil(this.ngUnsubscribe))
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
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListPackingUnit(this.gridState);
        }
      );
  }
  //endregion

  //#region API UPDATE
  /**
  * API để cập nhật hoặc tạo mới đơn vị tính
  * @param dtos - Đơn vị tính
  */
  APIUpdatePackingUnit(dto: DTOPackingUnit) {
    let ctx = `${dto.Code == 0 ?'Tạo mới' : "Cập nhật" } thông tin Đơn vị Tính`;
    this.isLoading = true;
    this.configAPIService
      .UpdatePackingUnit(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
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
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: ${error}`);
          this.APIGetListPackingUnit(this.gridState);
        }
      );
  }
  //endregion

  //#region Xử lý cập nhật và xóa dữ liệu

  // Hàm xử lý cập nhật đơn vị tính
  /**
   * Xử lý sự kiện cập nhật hoặc tạo mới Đơn vị Tính (Packing Unit).
   */
  onUpdatePackingUnit() {
    this.apiPackingUnitForm.markAllAsTouched();
    const updatePackingUnit: DTOPackingUnit = this.apiPackingUnitForm.getRawValue();
    const isAddForm = Number(updatePackingUnit.Code) === 0;
    let ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Đơn vị Tính`;

    const requiredFields = [{ name: 'VNPackingUnit', label: 'Tên Tiếng Việt' }];

    if (this.apiPackingUnitForm.invalid) {
      const errorFields = requiredFields.filter(f => this.apiPackingUnitForm.get(f.name)?.invalid).map(f => f.label);
      const errorMessage = errorFields.length > 0
        ? `Đã xảy ra lỗi ${ctx}: Vui lòng nhập ( ${errorFields.join(', ')} )`
        : `Đã xảy ra lỗi ${ctx}: Vui lòng nhập đầy đủ thông tin bắt buộc`;
      this.layoutService.onError(errorMessage);
      return;
    }

    if (!isAddForm && this.isPackingUnitEqual(updatePackingUnit, this.dataPackingUnit)) {
      this.layoutService.onWarning(`Đã xảy ra lỗi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật.`);
      return;
    }
    this.APIUpdatePackingUnit(updatePackingUnit);
  } 

  /**
   * So sánh hai đối tượng Đơn vị Tính để xác định dữ liệu có thay đổi không.
   *
   * @param {DTOPackingUnit} a - Đối tượng Đơn vị Tính thứ nhất (thường là dữ liệu form hiện tại).
   * @param {DTOPackingUnit} b - Đối tượng Đơn vị Tính thứ hai (thường là dữ liệu gốc).
   * @returns {boolean} Trả về `true` nếu hai đối tượng giống nhau, ngược lại `false`.
   *
   * @example
   * const a: DTOPackingUnit = { Code: 1, VNPackingUnit: 'Hộp', ENPackingUnit: 'Box', ... };
   * const b: DTOPackingUnit = { Code: 1, VNPackingUnit: 'Hộp', ENPackingUnit: 'Box', ... };
   *
   * this.isPackingUnitEqual(a, b); // true
   */
  isPackingUnitEqual(a: DTOPackingUnit, b: DTOPackingUnit): boolean {
    return a.Code === b.Code &&
      a.VNPackingUnit === b.VNPackingUnit &&
      a.ENPackingUnit === b.ENPackingUnit &&
      a.JPPackingUnit === b.JPPackingUnit &&
      a.OrderBy === b.OrderBy &&
      a.TypeData === b.TypeData;
  }

  // Hàm xử lý xóa đơn vị tính
  onDeletePackingUnit(type: number): void {
    if (!Ps_UtilObjectService.hasValue(this.dataPackingUnit)) {
      this.layoutService.onWarning('Đã xảy ra lỗi xóa Đơn vị tính: Không xoá được Đơn vị Tính');
      this.isDialog = false;
      return;
    }

    this.APIDeletePackingUnit([this.dataPackingUnit]);
    this.isDialog = false;
  }
  //endregion

  ngOnDestroy(): void{
    this.ngUnsubscribe.unsubscribe();
  }
}
