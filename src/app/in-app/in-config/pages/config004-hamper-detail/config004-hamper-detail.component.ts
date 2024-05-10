import { ViewChildren, Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef, QueryList, ViewChild } from '@angular/core';
import { companyVietHaTri, companyMotThanhVien, company3PS } from './data-test';
import { DTOCompany } from '../shared/dtos/DTOCompany.dto';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { dataMadeHameper } from './dataMadeOfHamper';
import { DataUnitProduct } from './dataUnitProduct';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { DataButtonStatus } from './dataButtonStatus';
import { DataStyleStatusHamper } from './statusHamper';
import { ItemProduct } from './dataProduct';
import {
  SVGIcon,
  cartIcon,
  anchorIcon,
  codeIcon,
  plusIcon
} from "@progress/kendo-svg-icons";
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { DTOProduct } from '../shared/dtos/DTOProduct.dto';
import { NotifiService } from '../shared/services/notifi.service';
import { text } from '@fortawesome/fontawesome-svg-core';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
@Component({
  selector: 'app-config004-hamper-detail',
  templateUrl: './config004-hamper-detail.component.html',
  styleUrls: ['./config004-hamper-detail.component.scss'], 
  encapsulation: ViewEncapsulation.None 
})
export class Config004HamperDetailComponent implements OnInit, OnDestroy {
  vietHaCom: Array<DTOCompany> = companyVietHaTri
  motThanhCom: Array<DTOCompany> = companyMotThanhVien
  PSCom: Array<DTOCompany> = company3PS

  receivedCPN1: any;
  receivedCPN2: any;
  receivedCPN3: any;

  svgCart: SVGIcon = cartIcon;
  svgAnchor: SVGIcon = anchorIcon;
  svgCode: SVGIcon = codeIcon;
  plusIcon: SVGIcon = plusIcon

  dataButtonStatus: any = DataButtonStatus
  isOpenDrawer: boolean = false
  itemHamber: DTOHamper

  onButtonClick(): void {
    console.log("click");
  }

  itemBreadCrumb: BreadCrumbItem[] = [
    {
        text: 'QUẢN LÝ SẢN PHẨM'
    },
    {
        text: 'TẠO HAMPER'
    },
    {
        text: 'CHI TIẾT HAMPER'
    }  
  ];

  formHamper = new FormGroup({
    status: new FormControl(),
    barcode: new FormControl(''),
    nameVietNames: new FormControl(''),
    nameEnglish: new FormControl,
    nameJapan: new FormControl,
    made: new FormControl,
    materialVietnames: new FormControl,
    materialEnglish: new FormControl,
    materialJapan: new FormControl,
    unit: new FormControl,
    image: new FormControl,
    sizeProduct: new FormGroup({
      lenght: new FormControl('', [Validators.min(0)]),
      width: new FormControl('', [Validators.min(0)]),
      height: new FormControl('', [Validators.min(0)]),
      weight: new FormControl('', [Validators.min(0)])
    }),
    sizeInner:  new FormGroup({
      lenght: new FormControl('', [Validators.min(0)]),
      width: new FormControl('', [Validators.min(0)]),
      height: new FormControl('', [Validators.min(0)]),
      weight: new FormControl('', [Validators.min(0)])
    }),
    sizeCartoon:  new FormGroup({
      lenght: new FormControl('', [Validators.min(0)]),
      width: new FormControl('', [Validators.min(0)]),
      height: new FormControl('', [Validators.min(0)]),
      weight: new FormControl('', [Validators.min(0)])
    }),
    sizePallet:  new FormGroup({
      lenght: new FormControl('', [Validators.min(0)]),
      width: new FormControl('', [Validators.min(0)]),
      height: new FormControl('', [Validators.min(0)]),
      weight: new FormControl('', [Validators.min(0)])
    }),
    changeInner: new FormControl('', [Validators.min(0)]),
    changeCarton: new FormControl('', [Validators.min(0)]),
    changePallet: new FormControl('', [Validators.min(0)]),
    specifications: new FormControl,
    productItem: new FormControl,
    company: new FormGroup({
      company1: new FormControl,
      company2: new FormControl,
      company3: new FormControl
    })
  }, {updateOn: 'blur'})


  dataMadeHameper: any = dataMadeHameper
  dataUnitProduct: any = DataUnitProduct
  dataStatusHamper = DataStyleStatusHamper
  dataProductList: any = []
  dataItemProduct = ItemProduct


  dataItemProductInHamper: Array<DTOProduct> = [
    // {Name: "Nước suối", Image: "https://truongphatdat.com/wp-content/uploads/2018/09/aquafina-500ml.jpg", Barcode: "PC0001", Origin: "Nhật Bản", Brand:"Aquafina", Price: 5000, Quantity: 1000}
  ]
  defaultItemDropdown = { id: -1, made: "--- Chọn ---", data: null as string};
  defaultItemDropdownOgirin = { id: -1, text: "--- Chọn ---", data: null as string };


  currentStatusHamper: any 
  barcodeHamper: string = ''
  nameVietnamesHamper: string = ''
  idProductItem: string = ''

  itemProductFilter: any = {Name: ""}
  quantityProduct: number = 0

  previousNameVietNames: string;
  initialFormValue: any;

  constructor(private toast: NotifiService,){}


  findProductByBarcode(barcode: string){
    const lowercaseBarcode = barcode.toLowerCase();
    this.itemProductFilter = ItemProduct.find(product => product.Barcode.toLowerCase() === lowercaseBarcode);

    if(this.itemProductFilter == undefined){
      this.itemProductFilter = {Name: '', Image: ''}
      this.toast.message("Không tìm thấy sản phẩm", "error")
      return
    }

    console.log(this.itemProductFilter);
  }

  handleAddProductHamper(){
    if(this.itemProductFilter != undefined && this.itemProductFilter.Name != ''){
      if(this.quantityProduct <= 0){
        this.toast.message("vui lòng nhập số lượng", "warning")
        return
      }
      let product = {Name: this.itemProductFilter.Name, Image: this.itemProductFilter.Image, Barcode:this.itemProductFilter.Barcode, Origin: this.itemProductFilter.Origin, Brand:this.itemProductFilter.Brand, Price: this.itemProductFilter.Price, Quantity: this.quantityProduct}
      this.dataItemProductInHamper.push(product)
      this.formHamper.get("productItem").patchValue(this.dataItemProductInHamper);
      this.toast.message("Thêm sản phẩm thành công!", "success")
    }else{
      this.toast.message("Thêm sản phẩm thất bại!", "error")
    }
  }
  
  openDrawer():any{
    this.isOpenDrawer = true
  }

  closeDrawer():any{
    this.isOpenDrawer = false
    this.quantityProduct = 0
    this.idProductItem = ''
    this.itemProductFilter = ''
  }

  getImage($event: any){
    this.formHamper.get("image").patchValue($event)
  }

  getValueCompany1($event: any) { 
    this.updateCompanyValue($event, 'company1');
  }
  getValueCompany2($event: any) {
    this.updateCompanyValue($event, 'company2');
  }
  getValueCompany3($event: any) {
    this.updateCompanyValue($event, 'company3');
  }

  updateCompanyValue($event: any, companyName: string) {
    if ($event.state == true) {
      this.formHamper.get("company").get(companyName).patchValue($event);
    }
  }

  log(){
    // console.log(this.receivedCPN1);
    // console.log(this.receivedCPN2);
    // console.log(this.receivedCPN3);
    
    console.log(this.formHamper.value);
    // console.log(this.formHamper.get('status').value?.text);
  }



  ngOnInit(): void {
    //Thực hiện theo dõi tồn tại của barcode và cập nhật
    // let subriceBarcode =  this.formHamper.valueChanges.subscribe(() => {
    //   const barcodeControl = this.formHamper.get('barcode');
    //   if (!barcodeControl.value) {
    //     const newBarcode = this.generateUniqueBarcode(); 
    //     barcodeControl.setValue(newBarcode);
    //     this.updateBarcodeInForm() 
    //     subriceBarcode.unsubscribe()
    //   }
    // });
    this.initialFormValue = this.formHamper.value;
    this.previousNameVietNames = this.formHamper.get('nameVietNames').value;
  }

  //Cập nhật Status trong form thông qua biến currentStatusHamoer
  updateStatusInForm(): void {
    this.currentStatusHamper = this.formHamper.get('status').value;
  }

  //Cập nhật biến barcodeHamer thông qua barcode trong formHamber
  updateBarcodeInForm(): void {
    this.toast.message("Tạo Hamper thành công!", "success")
    this.barcodeHamper = this.formHamper.get('barcode').value

    let statusDrawer = {id: 0, text: "Đang soạn thảo"}
    this.formHamper.get('status').setValue(statusDrawer);
    this.updateStatusInForm()
  }

  //Cập nhật Status trong form thông qua biến currentStatusHamoer
    updateNameVietnamesInForm(): void {
      this.formHamper.get('nameVietNames').setValue(this.nameVietnamesHamper);
     
    }

  // Cập nhật giá trị của FormControl sau khi trường input mất focus
  onBlurNameVietNames() {
    const newNameVietNames = this.formHamper.get('nameVietNames').value;
    if (newNameVietNames.trim() === "" && this.previousNameVietNames.trim() === "") {
      return;
    }else{
      if(this.previousNameVietNames.trim() === ""){
        const barcodeControl = this.formHamper.get('barcode');
        const newBarcode = this.generateUniqueBarcode(); 
        barcodeControl.setValue(newBarcode);
        this.updateBarcodeInForm() 
        this.previousNameVietNames = newNameVietNames;
      }else{
      if (newNameVietNames == '') {
        // Nếu newNameVietNames là rỗng, gán lại giá trị trước đó
        this.formHamper.get('nameVietNames').setValue(this.previousNameVietNames);
        this.toast.message("Tên tiếng việt không được rỗng", "error")
      } else {
        // Nếu newNameVietNames không rỗng, cập nhật giá trị trước đó
        this.previousNameVietNames = newNameVietNames;
      }
      }
     
    }
  
    
  }
  
  getStatusText(currentStatusHamper: Number):string{
    const statusObj = this.dataStatusHamper.find(status => status.id === currentStatusHamper);
    return statusObj ? statusObj.text : ''
  }

  getStatusColor(currentStatusHamper: Number): string {
    const statusObj = this.dataStatusHamper.find(status => status.id === currentStatusHamper);
    return statusObj ? statusObj.color : '';
  }

  handleChangeStatus(statusChange: number): void {
    switch (statusChange) {
      case 0:
        if (!this.formHamper.get('barcode').value 
        || !this.formHamper.get('nameVietNames').value 
        || !this.formHamper.get('image').value 
        || !this.formHamper.get('company').get('company1').value 
        || !this.formHamper.get('productItem').value) {
        this.toast.message("Vui lòng chọn đầy đủ thông tin yêu cầu", "error");
        return;
    }
    
        this.toast.message("Gửi duyệt thành công", "success")
        this.formHamper.get('status').setValue({ id: 1, text: "Gửi duyệt" });
        break;
      case 1: 
        if (!this.formHamper.get('barcode').value 
          || !this.formHamper.get('nameVietNames').value 
          || !this.formHamper.get('image').value 
          || !this.formHamper.get('company').get('company1').value 
          || !this.formHamper.get('productItem').value) {
          this.toast.message("Vui lòng chọn đầy đủ thông tin yêu cầu", "error");
          return;
        }
        this.toast.message("Phê duyệt thành công", "success")
        this.formHamper.get('status').setValue({ id: 2, text: "Duyệt áp dụng" });
        break;
      case 2:
        this.toast.message("Trả về thành công", "success")
        this.formHamper.get('status').setValue({ id: 4, text: "Trả về" });
        break;
      case 3:
        this.toast.message("Ngưng áp dụng thành công", "success")
        this.formHamper.get('status').setValue({ id: 3, text: "Ngưng áp dụng" });
        break;
      case 4:
        this.formHamper.reset();
        console.log("Form reset:", this.formHamper.value);
        this.barcodeHamper = ''
        this.previousNameVietNames = ''
        this.dataItemProductInHamper = []
        this.toast.message("Xóa thành công", "success")
        break;
    }
    this.updateStatusInForm()
  }

  generateUniqueBarcode(): string {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000).toString();
    return timestamp + randomNum;
  }

  addNewHamper(){
    this.formHamper.reset();
    this.barcodeHamper = ''
    this.previousNameVietNames = ''
    this.dataItemProductInHamper = []
  }

  ngOnDestroy(): void {
    this.formHamper.reset()
  }

}
