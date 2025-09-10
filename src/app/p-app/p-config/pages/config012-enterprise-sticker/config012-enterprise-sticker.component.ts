import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { DTOSticker } from '../../shared/dto/DTOSticker';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { ConfigEnterpriceApiService } from '../../shared/services/config-enterprice-api.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTODataPermission } from '../../shared/dto/DTODataPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { MarNewsProductAPIService } from 'src/app/p-app/p-marketing/shared/services/marnewsproduct-api.service';
import { DTOCFFile } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';

@Component({
  selector: 'app-config012-enterprise-sticker',
  templateUrl: './config012-enterprise-sticker.component.html',
  styleUrls: ['./config012-enterprise-sticker.component.scss']
})
export class Config012EnterpriseStickerComponent implements OnInit {

  destroy = new Subject<any>(); // sử dụng để unsubscribe các observable

  gridStickers: DTOSticker[] = []; //dữ liệu hiển thị trên grid
  private allStickers: DTOSticker[] = []; //danh sách tất cả quốc gia (không filter)

  //permission 
  isAllPers: boolean = false
  isCanCreate: boolean = false
  justLoadedChangePermissionAPI: boolean = true
  actionPerm: DTOActionPermission[] = [];

  isMaster: boolean = false; // Toàn quyền
  isCreator: boolean = false; // Quyền tạo
  isApprover: boolean = false; // Quyền duyệt
  MA: boolean = false; // Master hoặc Approver
  MC: boolean = false; // Master hoặc Creator

  // varible of Dropdown
  onActionDropdownClickCallback: Function
  getActionDropdownCallback: Function

  // varible of DIALOG
  opened: boolean = false;

  // varible of grid
  loading: boolean = false
  justLoaded: boolean = true
  skip: number = 0;
  keyword: string = ''

  gridState: State = { //cấu hình state cho grid (filter, logic,...)
    filter: { filters: [], logic: 'and' },
  }

  filterStatus: CompositeFilterDescriptor = {
    logic: "or",
    filters: []
  }

  //Filter search
  filterSearch: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [],
  };

  isOpenDrawer: boolean = false; // Có mở drawer hay không
  isautoCollapse: boolean = false; // Có tự động collapse drawer hay không

  TypeAction: number = 0; //trạng thái hành động, 0=tạo mới, 1=chỉnh sửa, 2=xem

  StickerForm: UntypedFormGroup; // form reactive chính của sticker
  dataSticker: DTOSticker = new DTOSticker() // sticker hiện tại được chọn

  formDataDefault = ({ //dữ liệu mặc định
    Code: 0,
    StickName: '',
    Remark: '',
    FileName: '',
    IsSystem: false
  });

  pickFileCallback: Function
  GetFolderCallback: Function

  // variable of unsubcribe
  arrUnsubscribe: Subscription[] = []; //mảng lưu sst để huỷ sau
  ngUnsubscribe$ = new Subject<void>(); //subject hỗ trợ takeUntil để unsubscribe

  constructor(
    public layoutService: LayoutService,
    public apiServiceConf: ConfigEnterpriceApiService,
    private changeDetector: ChangeDetectorRef,
    public menuService: PS_HelperMenuService,
    private formBuilder: FormBuilder,
    public MarServiceAPI: MarNewsProductAPIService,

  ) {
    this.loadFormData()
  }

  //=========================== FORM DATA ===========================
  loadFormData() {
  }

  ngOnInit(): void {
    // Check permission
    let changePermissionSst = this.menuService.changePermission().pipe(takeUntil(this.destroy)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');

        this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;

        this.MC = this.isMaster || this.isCreator;
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
    this.pickFileCallback = this.pickFile.bind(this)
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)
  }

  //dùng này để tránh lỗi ng0100
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  /**
  * Hàm load dữ liệu mặc định
  */
  onLoadDefault() {

    this.onLoadFilter();
    this.APIGetListSticker(this.gridState);

    this.StickerForm = this.onLoadForm();
    this.StickerForm.patchValue(new DTOSticker);
  }

  /**
   * Load form
   */
  onLoadForm(): UntypedFormGroup {
    const form = this.formBuilder.group({});
    const dto = new DTOSticker();

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
      this.gridStickers = [...this.allStickers]; // reset
    } else {
      this.gridStickers = this.allStickers.filter(c => {
        const vnName = (c.StickName ?? '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D')
          .toLowerCase();
        return vnName.includes(keyword);
      });
    }
  }

  onResetFilter() {
    this.keyword = '';
    this.reloadData();
  }
  //#endregion

  @ViewChild('search', { static: false }) searchComponent: any;
  reloadData() {
    this.searchComponent.value = '' //reset value trong input search
    this.keyword = ''
    this.gridState.filter.filters = [];
    this.APIGetListSticker({ ...this.gridState });
  }

  //#region  DRAWER 
  /**
   * 
   * @param type Loại hành động thực hiện 0:tạo mới, 1:chỉnh sửa, 2:xem, 3:đóng
   * @param data Đối tượng quốc gia được truyền vào khi xem hoặc chỉnh sửa
   * @returns 
   */
  onOpendDrawer(type: number, data: DTOSticker = new DTOSticker()) {
    if (type === 3) {
      this.handleCloseDrawer();
      return;
    }

    this.isOpenDrawer = true;

    if (type === 0) {
      this.TypeAction = 0;
      this.StickerForm.reset(this.formDataDefault);
      this.StickerForm.get('StickName')?.enable();
      this.dataSticker = new DTOSticker();

    } else if (type === 1 && Ps_UtilObjectService.hasValue(data)) {
      this.TypeAction = 1;
      this.StickerForm.reset();
      this.StickerForm.patchValue(data);
      this.dataSticker = { ...data };
    } else if (type === 2 && Ps_UtilObjectService.hasValue(data)) {
      this.TypeAction = 2;
      this.StickerForm.reset();
      this.StickerForm.patchValue(data);
      this.dataSticker = { ...data };
    }

    if (!(this.isAllPers || this.isCanCreate)) {
      this.StickerForm.disable();
    }
  }

  /**
  * Đóng drawer
  */
  handleCloseDrawer(): void {
    this.isOpenDrawer = false;
    this.StickerForm.reset();
  }
  //#endregion

  //#region Hàm cập nhật/tạo mới dữ liệu
  onUpdateSticker() {
    const updateSticker: DTOSticker = this.StickerForm.getRawValue();
    const isAddForm = Number(updateSticker.Code) === 0;
    const ctx = `${isAddForm ? 'tạo mới' : 'cập nhật'} thông tin Tem Nhãn`;
    // Đặt touched để hiển thị validate lỗi
    this.StickerForm.markAllAsTouched();

    // Validate bắt buộc
    const errorFields: string[] = [];
    if (this.StickerForm.get('StickName').invalid) errorFields.push('Tên Tem nhãn');

    // Nếu có lỗi thì show cảnh báo
    if (this.StickerForm.invalid || errorFields.length > 0) {
      this.layoutService.onError(
        `Đã xảy ra lỗi khi ${ctx}: Vui lòng nhập (${errorFields.join(', ')})`
      );
      return;
    }

    // Gọi API update
      this.APIUpdateSticker(updateSticker);
  }
  //#endregion

  //#region DROPDOWN 
  getActionDropdown(moreActionDropdown: MenuDataItem[]) {  //hàm thêm option vào dropdown
    moreActionDropdown = []

    if (this.isAllPers || this.isCanCreate) {
      moreActionDropdown.push({ Name: "Chỉnh sửa", Code: "pencil", Link: "edit", Actived: true })
      moreActionDropdown.push({ Name: "Xóa", Code: "trash", Link: "delete", Actived: true })
    } else {
      moreActionDropdown.push({ Name: "Xem chi tiết", Code: "eye", Link: "view", Actived: true })
    }
    return moreActionDropdown
  }

  onActionDropdownClick(menu: MenuDataItem, item: DTOSticker) {  // hàm act của item trong dropdown
    this.dataSticker = item
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

    if (!Ps_UtilObjectService.hasValue(this.dataSticker?.Code)) {
      this.layoutService.onWarning('Không có Tem nhãn để xoá');
      this.opened = false;
      return;
    }

    this.APIDeleteSticker([this.dataSticker]);
    this.opened = false;

    this.layoutService.onSuccess('Xoá thành công');
    this.opened = false;
    this.handleCloseDrawer();
  }
  //#endregion

  //#region API GET LIST
  /**
   * 
   * @param filter Cấu hình state của Kendo Grid (bao gồm skip, take, sort, filter,...)
   */
  APIGetListSticker(filter: State) {
    this.loading = true;

    this.arrUnsubscribe.push(
      this.apiServiceConf.GetListSticker(filter)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(
          (res: any) => {
            this.loading = false;

            if (Ps_UtilObjectService.hasValue(res) && res.StatusCode === 0) {
              this.gridStickers = res.ObjectReturn.Data;
              this.allStickers = res.ObjectReturn.Data;
            }
          },
          (error) => {
            this.loading = false;
            this.layoutService.onError(
              `Đã xảy ra lỗi khi lấy Danh sách tem nhãn: ${error?.Message ?? error}`
            );
            this.gridStickers = [];
            this.allStickers = [];
          }
        )
    );
  }
  //#endregion


  //#region API Update Sticker
  /**
   * Gọi API để tạo mới hoặc cập nhật thông tin Tem Nhãn
   *
   * - Nếu `sticker.Code === 0` → hệ thống sẽ tạo mới tem nhãn.
   * - Nếu `sticker.Code !== 0` → hệ thống sẽ kiểm tra thay đổi và cập nhật tem nhãn.
   * - Trường hợp dữ liệu không thay đổi → bỏ qua, không gọi API.
   * - Sau khi thành công sẽ reload lại danh sách tem nhãn và đóng Drawer.
   * @param {DTOSticker} sticker 
   *  Đối tượng Tem Nhãn cần tạo mới hoặc cập nhật.
   *  Bao gồm các thuộc tính: 
   *  - Code: mã tem nhãn (0 = tạo mới, khác 0 = cập nhật).
   *  - StickName: tên tem nhãn.
   *  - FileName: tên file ảnh/logo liên quan.
   */
  APIUpdateSticker(sticker: DTOSticker): void {
    if (!sticker) {
      this.layoutService.onWarning('Dữ liệu tem nhãn không hợp lệ');
      return;
    }

    const isAddForm = Number(sticker.Code) === 0;

    // Nếu là cập nhật thì kiểm tra thay đổi
    if (!isAddForm && this.dataSticker) {
      const noChange =
        (sticker.StickName ?? '').trim().toLowerCase() === (this.dataSticker.StickName ?? '').trim().toLowerCase() &&
        (sticker.Remark ?? '').trim().toLowerCase() === (this.dataSticker.Remark ?? '').trim().toLowerCase() &&
        (sticker.FileName ?? '').trim().toLowerCase() === (this.dataSticker.FileName ?? '').trim().toLowerCase();

      if (noChange) {
        return;
      }
    }

    this.loading = true;

    this.arrUnsubscribe.push(
      this.apiServiceConf.UpdateSticker(sticker)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.APIGetListSticker({ ...this.gridState }); // reload lại danh sách
          })
        )
        .subscribe(
          (res: any) => {
            if (res?.StatusCode === 0) {
              this.layoutService.onSuccess(
                sticker.Code ? 'Cập nhật tem nhãn thành công' : 'Tạo mới tem nhãn thành công'
              );
              this.handleCloseDrawer();
            }
          },
          (error) => {
            this.layoutService.onError(
              `Không thể gọi API cập nhật tem nhãn: ${error}`
            );
          }
        )
    );
  }
  //#endregion

  //#region API Delete Sticker
  /**
   * Gọi API để xoá một hoặc nhiều Tem Nhãn.
   *
   * - Nếu danh sách rỗng → show cảnh báo và không gọi API.
   * - Nếu có dữ liệu → gọi API DeleteSticker với danh sách Code.
   * - Sau khi thành công → hiển thị thông báo thành công, đóng Drawer và reload lại Grid.
   * - Nếu thất bại → hiển thị lỗi trả về từ API hoặc lỗi hệ thống.
   @param {DTOSticker[]} listDelete=[]
   *        Danh sách Tem Nhãn cần xoá. 
   *        Chỉ thuộc tính `Code` của mỗi DTOSticker được sử dụng khi gửi lên API
   */
  APIDeleteSticker(listDelete: DTOSticker[] = []): void {
    if (!listDelete?.length) {
      this.layoutService.onWarning('Không tìm thấy Tem nhãn để xoá');
      return;
    }

    this.loading = true;

    this.arrUnsubscribe.push(
      this.apiServiceConf.DeleteSticker(listDelete.map(x => ({ Code: x.Code } as DTOSticker)))
        .pipe(
          finalize(() => {
            this.loading = false;
            this.APIGetListSticker({ ...this.gridState }); // reload lại grid sau khi xoá
          })
        )
        .subscribe(
          (res: any) => {
            if (res?.StatusCode === 0) {
              this.layoutService.onSuccess('Xoá Tem nhãn thành công');
              this.handleCloseDrawer();
            }
          },
          (error) => {
            this.layoutService.onError(
              `Không thể gọi API xoá Tem nhãn: ${error}`
            );
          }
        )
    );
  }
  //#endregion


  //#region hàm mở folder
  onUploadFileName() {
    this.layoutService.folderDialogOpened = true;
  }

  // lấy foler chứa ảnh 
  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog()) {
      return this.MarServiceAPI.GetFolderWithFile(childPath, 7);
    }
  }

  //hàm chọn tên file
  pickFile(e: DTOCFFile) {
    if (!e || !Ps_UtilObjectService.hasValueString(e.PathFile)) {
      this.layoutService.onError('Không tìm thấy file hợp lệ!');
      return;
    }

    const fileName = e.PathFile.replace('~', '').split('/').pop() ?? '';

    this.StickerForm.patchValue({
      FileName: fileName
    });
    this.layoutService.setFolderDialog(false);
  }
  //#endregion

}
