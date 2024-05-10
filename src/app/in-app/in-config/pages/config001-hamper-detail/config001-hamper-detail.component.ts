import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { HamperService } from '../shared/services/hamper.service';
import { Subscription } from 'rxjs';
import { checkOutlineIcon, minusCircleIcon, plusIcon, redoIcon, SVGIcon, trashIcon, undoIcon } from '@progress/kendo-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { dataMadeHameper } from '../config004-hamper-detail/dataMadeOfHamper';
import { DataUnitProduct } from '../config004-hamper-detail/dataUnitProduct';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { DTOCompany } from '../shared/dtos/DTOCompany.dto';
import { company3PS, companyMotThanhVien, companyVietHaTri } from '../config004-hamper-detail/data-test';
import { NotifiService } from '../shared/services/notifi.service';
import { text } from '@fortawesome/fontawesome-svg-core';

class Button {
  svgClassIcon: SVGIcon
  nameButton: string
  typeButton: string
}

class InforHamper {
  originBarcode: string
  origin: string
  nameVN: string
  materialVN: string
  nameENG: string
  materialENG: string
  nameJP: string
  materialJP: string
  image: string
}

@Component({
  selector: 'app-config001-hamper-detail',
  templateUrl: './config001-hamper-detail.component.html',
  styleUrls: ['./config001-hamper-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Config001HamperDetailComponent implements OnInit, OnDestroy {
  @ViewChild('originDropdown') originDropdown!: DropDownListComponent;
  @ViewChild('inputNameTV') inputNameTV!: TextBoxComponent;
  private subscriptions: Subscription[] = [];
  constructor(private hamperService: HamperService, private notifi: NotifiService) { }


  // Variables
  hamperCrr: DTOHamper;
  status: string = "Đang soạn thảo";
  collapseMode: BreadCrumbCollapseMode = 'none';


  // List
  listButtonAvailable: Button[] = [];
  defaultItems: BreadCrumbItem[] = [
    {
      text: "Quản lý sản phẩm",
    },
    {
      text: "Tạo hamper",
    },
    {
      text: "Chi tiết hamper",
    }
  ];
  items: BreadCrumbItem[] = [...this.defaultItems];
  buttonXoa: Button = {
    svgClassIcon: trashIcon,
    nameButton: 'Xóa',
    typeButton: 'danger'
  };
  vietHaCom: Array<DTOCompany> = companyVietHaTri;
  motThanhCom: Array<DTOCompany> = companyMotThanhVien;
  PSCom: Array<DTOCompany> = company3PS;
  dataOrigin = { dataMadeHameper };
  productUnit = { DataUnitProduct };


  // Object
  buttonNgungHienThi: Button = {
    svgClassIcon: minusCircleIcon,
    nameButton: 'Ngưng hiển thị',
    typeButton: 'danger'
  };
  buttonTraVe: Button = {
    svgClassIcon: undoIcon,
    nameButton: 'Trả về',
    typeButton: 'return'
  };
  buttonPheDuyet: Button = {
    svgClassIcon: checkOutlineIcon,
    nameButton: 'Phê duyệt',
    typeButton: 'success'
  };
  buttonGuiDuyet: Button = {
    svgClassIcon: redoIcon,
    nameButton: 'Gửi duyệt',
    typeButton: 'success'
  };
  buttonThemMoi: Button = {
    svgClassIcon: plusIcon,
    nameButton: 'Thêm mới',
    typeButton: 'success'
  };
  inforHamperBeforeChange?: InforHamper;
  defaultItem = { id: -1, made: "--- Chọn ---" };
  defaultItemUnit = { id: -1, text: "--- Chọn ---" };


  // Form
  inforHamper = new FormGroup({
    originBarcode: new FormControl(''),
    origin: new FormControl(''),
    nameVN: new FormControl(''),
    materialVN: new FormControl(''),
    nameENG: new FormControl(''),
    materialENG: new FormControl(''),
    nameJP: new FormControl(''),
    materialJP: new FormControl(''),
    image: new FormControl('')
  })

  ngOnInit(): void {
    this.subscriptions.push(this.hamperService.hamberSubject$.subscribe(data => {
      this.hamperCrr = data
    }))
    this.setListButtonAvailable(this.status, null);
    this.inforHamperBeforeChange = {
      originBarcode: this.inforHamper.get('originBarcode')?.value,
      origin: this.inforHamper.get('origin')?.value,
      nameVN: this.inforHamper.get('nameVN')?.value,
      materialVN: this.inforHamper.get('materialVN')?.value,
      nameENG: this.inforHamper.get('nameENG')?.value,
      materialENG: this.inforHamper.get('materialENG')?.value,
      nameJP: this.inforHamper.get('nameJP')?.value,
      materialJP: this.inforHamper.get('materialJP')?.value,
      image: this.inforHamper.get('image')?.value ,
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sb) => sb.unsubscribe());
    }
  }

  setListButtonAvailable(status: string, statusForOtherFunc: string) {
    if (!(!!statusForOtherFunc)) {
      if (status) {
        if (status === 'Đang soạn thảo') {
          this.listButtonAvailable.push(this.buttonXoa);
          this.listButtonAvailable.push(this.buttonGuiDuyet);
        }
        if (status === 'Gửi duyệt') {
          this.listButtonAvailable.push(this.buttonTraVe);
          this.listButtonAvailable.push(this.buttonPheDuyet);
        }
        if (status === 'Áp dụng' || status === 'Duyệt áp dụng' || status === 'Phê duyệt') {
          this.listButtonAvailable.push(this.buttonNgungHienThi);
        }
        if (status === 'Ngừng áp dụng' || status === 'Ngưng áp dụng' || status === 'Ngưng hiển thị') {
          this.listButtonAvailable.push(this.buttonTraVe);
          this.listButtonAvailable.push(this.buttonPheDuyet);
        }
        if (status === 'Trả về') {
          this.listButtonAvailable.push(this.buttonGuiDuyet);
        }
        this.listButtonAvailable.push(this.buttonThemMoi);
      }
    }
  }
    
  
  getValueCompany1($event: any) { 
    // this.updateCompanyValue($event, 'company1');
  }

  getValueCompany2($event: any) {
    // this.updateCompanyValue($event, 'company2');
  }

  getValueCompany3($event: any) {
    // this.updateCompanyValue($event, 'company3');
  }

  onFileSelected(fileName: string) {
    this.inforHamper.patchValue({ image: fileName })
  }

  disableField(status: string) {
    if (status === 'Ngưng áp dụng' || status === 'Duyệt áp dụng') {
      return true;
    }
    return false;
  }

  // Xử lý sự kiện mousedown để ngăn chặn click chuột
  // onMouseDown(event: MouseEvent) {
  //   event.preventDefault(); // Ngăn chặn hành vi mặc định (click chuột)
  // }

  // Xử lý sự kiện keydown để ngăn chặn nhập liệu
  onKeyDown(event: KeyboardEvent) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định (nhập liệu)
  }

  // Định nghĩa một hàm tạo mã barcode ngẫu nhiên không trùng lặp
  generateUniqueBarcode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Các chữ cái in hoa
    const digits = '0123456789'; // Các chữ số

    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length)); // Chọn ngẫu nhiên một chữ cái
    let randomNumber = ''; // Chuỗi chứa các chữ số ngẫu nhiên

    // Tạo 7 chữ số ngẫu nhiên
    for (let i = 0; i < 7; i++) {
      randomNumber += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // Kết hợp chữ cái và chữ số để tạo mã barcode hoàn chỉnh
    const barcode = randomChar + randomNumber;

    return barcode;
  }

  // Định nghĩa một hàm tạo mã barcode không trùng lặp mỗi lần được gọi
  createUniqueBarcode(): string {
    const generatedBarcodes = new Set<string>(); // Set để lưu trữ các mã barcode đã tạo

    while (true) {
      const newBarcode = this.generateUniqueBarcode(); // Tạo một mã barcode ngẫu nhiên

      if (!generatedBarcodes.has(newBarcode)) { // Kiểm tra xem mã barcode đã được tạo trước đó chưa
        generatedBarcodes.add(newBarcode); // Thêm mã barcode mới vào set
        return newBarcode; // Trả về mã barcode mới
      }
    }
  }

  onClickOptionButton(nameButton: string) {
    if (nameButton === 'Thêm mới') {
      this.onClickButtonAdd();
    }
  }


  onClickButtonAdd(){
    this.resetForm();
  }



  resetForm(){
    this.inforHamper.reset();
    this.inforHamper.patchValue({ image: '' });
    this.inforHamper.patchValue({ origin: '' });
  }



  /**
   * - Function is called whenever user blur input name Tieng Viet
   * - Using for generate barcode and patchValue to originBarcode if current is empty  
   * - Constraint user don't type empty into input
   */
  onInputNameTVBlur(): void {
    const inputValueName = this.inforHamper.get('nameVN')?.value;
    const inputValueNameBefore = this.inforHamperBeforeChange.nameVN;
    if(inputValueName.length === 0 && inputValueNameBefore.length !== 0){
      this.inforHamper.patchValue({ nameVN: inputValueNameBefore })
      this.notifi.message('VietNamese name should not be empty', 'error');
    }
    if(inputValueName.length > 0 && this.inforHamperBeforeChange.nameVN.length === 0){
      this.inforHamper.patchValue({ originBarcode: this.createUniqueBarcode() })
      this.notifi.message('Hamper được tạo mới', 'success');
    }
    this.inforHamperBeforeChange = this.inforHamper.getRawValue();
  }



  /**
   * - Function is called whenever user blur input
   * - Update data inforHamper if having changes
   */
  onBlurValueHamperInfor() {
    if(!this.checkDataIsChanged(this.inforHamper.getRawValue(), this.inforHamperBeforeChange)){
      this.notifi.message('Data infor hamper is changed!', 'success');
    }
    else{
      this.notifi.message('Data infor hamper has no change!', 'warning');
      console.log('data infor hamper has no change!')
    }
  }
  
  
  
  /**
   * @param dataBeforeChange A data before change, meaning data on screen
   * @param dataAfterChange A data after change
   * @returns true or false
   */
  checkDataIsChanged(dataBeforeChange: InforHamper, dataAfterChange: InforHamper){
    return JSON.stringify(dataBeforeChange) === JSON.stringify(dataAfterChange);
  }



  /** 
  * - Set data form infor hamper on screen into inforHamperBeforeChange
  */
  onClickInput(){
    this.inforHamperBeforeChange = this.inforHamper.getRawValue();
  }
}
