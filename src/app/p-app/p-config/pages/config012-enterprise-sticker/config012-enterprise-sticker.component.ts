import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, State } from '@progress/kendo-data-query';
import { DTOSticker } from '../../shared/dto/DTOSticker';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/p-app/p-layout/services/layout.service';
import { ConfigEnterpriceApiService } from '../../shared/services/config-enterprice-api.service';
import { PS_HelperMenuService } from 'src/app/p-app/p-layout/services/p-menu.helper.service';
import { MenuDataItem } from 'src/app/p-app/p-layout/dto/menu-data-item.dto';
import { DTOActionPermission } from 'src/app/p-app/p-layout/dto/DTOActionPermission';
import { DTODataPermission } from '../../shared/dto/DTODataPermission';
import { DTOPermission } from 'src/app/p-app/p-layout/dto/DTOPermission';
import { takeUntil } from 'rxjs/operators';
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
  justLoadedPer: boolean = true
  dataPerm: DTODataPermission[] = [];
  actionPerm: DTOActionPermission[] = [];

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
  tempSearch: any

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

  isAction: number = 0; //trạng thái hành động, 0=tạo mới, 1=chỉnh sửa, 2=xem

  StickerForm: UntypedFormGroup; // form reactive chính của sticker
  dataSticker: DTOSticker = new DTOSticker() // sticker hiện tại được chọn
  dataStickerForm: any

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

  selectedFile: File | null = null;

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
    this.StickerForm = this.formBuilder.group({
      StickName: [''],
      Remark: ['']
    });
  }

  ngOnInit(): void {
    this.loading = true;

    // mock data giả lập API trả về
    this.allStickers = [
      { Code: 1, StickName: 'A', Remark: 'Khổ tem A', FileName: '123.png' },
      { Code: 2, StickName: 'HMP', Remark: 'Khổ tem Hóa Mỹ phẩm', FileName: '123.png' },
      { Code: 3, StickName: 'L4', Remark: 'Khổ tem cửa hàng', FileName: '123.png' },
    ] as DTOSticker[];

    // gán cho gridStickers để hiển thị ra grid
    this.gridStickers = [...this.allStickers];

    this.loading = false;

    // Check permission
    let changePermissionSst = this.menuService.changePermission().pipe(takeUntil(this.destroy)).subscribe((res: DTOPermission) => {
      if (Ps_UtilObjectService.hasValue(res) && this.justLoaded) {
        this.justLoaded = false;
        this.actionPerm = distinct(res.ActionPermission, 'ActionType');

        // this.isMaster = this.actionPerm.findIndex((s) => s.ActionType == 1) > -1 || false;
        // this.isCreator = this.actionPerm.findIndex((s) => s.ActionType == 2) > -1 || false;

        // this.MC = this.isMaster || this.isCreator;

        this.isAllPers = true;
        this.isCanCreate = false;
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
    this.GetFolderCallback = this.GetFolderWithFile.bind(this)
    this.pickFileCallback = this.pickFile.bind(this)


  }

  /**
  * Hàm load dữ liệu mặc định
  */
  onLoadDefault() {

    this.onLoadFilter();
    // this.APIGetListCountry(this.gridState);

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
      this.isAction = 0;
      this.StickerForm.reset(this.formDataDefault);
      this.StickerForm.get('StickName')?.enable();
      this.dataSticker = new DTOSticker();

    } else if (type === 1 && Ps_UtilObjectService.hasValue(data)) {
      this.isAction = 1;
      this.StickerForm.reset();
      // this.StickerForm.patchValue(data);
      this.StickerForm.patchValue({
        ...data,
        FileName: data.FileName?.substring(0, data.FileName.lastIndexOf('.')) || data.FileName
      });
      this.StickerForm.get('StickName')?.disable();
      this.dataSticker = { ...data };
    } else if (type === 2 && Ps_UtilObjectService.hasValue(data)) {
      this.isAction = 2;
      this.StickerForm.reset();
      // this.StickerForm.patchValue(data);
      this.StickerForm.patchValue({
        ...data,
        FileName: data.FileName?.substring(0, data.FileName.lastIndexOf('.')) || data.FileName
      });
      this.StickerForm.disable();
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
    // this.CountryForm.reset();
  }
  //#endregion

  //#region Hàm cập nhật/tạo mới dữ liệu
  onUpdateSticker() {
    const sticker: DTOSticker = this.StickerForm.getRawValue();
    const isCreate = this.isAction === 0;
    const ctx = `${isCreate ? 'tạo mới' : 'cập nhật'} thông tin Tem Nhãn`;

    if (!Ps_UtilObjectService.hasValueString(sticker.StickName)) {
      this.layoutService.onError(`Đã xảy ra lỗi khi ${ctx}: Bạn chưa nhập Tên tem nhãn`);
      return;
    }

    if (isCreate) {
      // mock Code tự tăng
      const newCode = this.allStickers.length > 0
        ? Math.max(...this.allStickers.map(c => c.Code)) + 1
        : 1;

      const newSticker = { ...sticker, Code: newCode };
      this.allStickers.push(newSticker);
      this.layoutService.onSuccess('Thêm mới thành công');
    } else {
      // tìm item cần update
      const index = this.allStickers.findIndex(c => c.Code === this.dataSticker.Code);
      if (index > -1) {
        this.allStickers[index] = { ...this.allStickers[index], ...sticker };
        this.layoutService.onSuccess('Cập nhật thành công');
      } else {
        this.layoutService.onError('Không tìm thấy tem nhãn để cập nhật');
      }
    }

    // gán lại gridStickers để hiển thị (clone để Angular detect)
    this.gridStickers = [...this.allStickers];

    // đóng drawer
    this.handleCloseDrawer();

    // Nếu là cập nhật → kiểm tra thay đổi
    // if (!isCreate) {
    //   const fieldsToCheck: (keyof DTOSticker)[] = [
    //     'StickName'
    //   ];

    //   const isChanged = fieldsToCheck.some(
    //     field => (sticker[field] ?? '').toString().trim() !== (this.dataSticker[field] ?? '').toString().trim()
    //   );

    //   if (!isChanged) {
    //     this.layoutService.onWarning(`Đã xảy ra lỗi khi ${ctx}: Dữ liệu không có thay đổi, không cần cập nhật`);
    //     return;
    //   }
    // }

    // Gọi API
    // this.APIUpdateCountry(country);
  }
  //#endregion

  //#region DROPDOWN 
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
    // if (type !== 0) {
    //   this.opened = false;
    //   return;
    // }

    // if (!Ps_UtilObjectService.hasValue(this.dataSticker?.Code)) {
    //   this.layoutService.onWarning('Không xoá được Quốc gia');
    //   this.opened = false;
    //   return;
    // }

    // // this.APIDeleteCountry([this.dataSticker]);
    // this.opened = false;

    if (type !== 0) {
      this.opened = false;
      return;
    }

    if (!Ps_UtilObjectService.hasValue(this.dataSticker?.Code)) {
      this.layoutService.onWarning('Không xoá được tem nhãn');
      this.opened = false;
      return;
    }

    // Xóa khỏi mảng allStickers
    this.allStickers = this.allStickers.filter(c => c.Code !== this.dataSticker.Code);

    // Gán lại gridStickers để refresh UI
    this.gridStickers = [...this.allStickers];

    this.layoutService.onSuccess('Xoá thành công');
    this.opened = false;
    this.handleCloseDrawer();
  }
  //#endregion

  //#region hàm mở folder
  onUploadFileName() {
    this.layoutService.folderDialogOpened = true;
  }

  pickFile(e: DTOCFFile, width, height) {

    // this.dataCompanyForm.URLLogo = e?.PathFile.replace('~', '')
    // this.formData.value.URLLogo =  e?.PathFile.replace('~', '')
    // this.formData.value.URLLogo = this.dataCompany.URLLogo
    // this.formData.patchValue({
    //   URLLogo: this.dataCompany.URLLogo
    // });
    this.layoutService.setFolderDialog(false)
  }

  // lấy foler chứa ảnh 
  GetFolderWithFile(childPath) {
    if (this.layoutService.getFolderDialog()) {
      return this.apiServiceConf.GetFolderWithFile(childPath, 16);
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name;
      const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;

      // Gán vào FormControl FileName
      this.StickerForm.get('FileName')?.setValue(nameWithoutExt);

      // Nếu bạn cần giữ file để upload backend
      this.selectedFile = file;
    }
  }
  //#endregion

}
