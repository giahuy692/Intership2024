import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { companyVietHaTri, companyMotThanhVien, company3PS } from './data-test';
import { DTOCompany } from '../shared/dtos/DTOCompany.dto';
import { FormControl, FormGroup } from '@angular/forms';
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
} from "@progress/kendo-svg-icons";
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { DTOProduct } from '../shared/dtos/DTOProduct.dto';
import { NotifiService } from '../shared/services/notifi.service';
@Component({
  selector: 'app-config004-hamper-detail',
  templateUrl: './config004-hamper-detail.component.html',
  styleUrls: ['./config004-hamper-detail.component.scss'], 
  encapsulation: ViewEncapsulation.None 
})
export class Config004HamperDetailComponent implements OnInit {
  vietHaCom: Array<DTOCompany> = companyVietHaTri
  motThanhCom: Array<DTOCompany> = companyMotThanhVien
  PSCom: Array<DTOCompany> = companyMotThanhVien

  receivedCPN1: any;
  receivedCPN2: any;
  receivedCPN3: any;

  svgCart: SVGIcon = cartIcon;
  svgAnchor: SVGIcon = anchorIcon;
  svgCode: SVGIcon = codeIcon;

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
    status: new FormControl,
    barcode: new FormControl,
    nameVietNames: new FormControl,
    nameEnglish: new FormControl,
    nameJapan: new FormControl,
    made: new FormControl,
    materialVietnames: new FormControl,
    materialEnglish: new FormControl,
    materialJapan: new FormControl,
    unit: new FormControl,
    image: new FormControl,
    sizeProduct: new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    sizeInner:  new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    sizeCartoon:  new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    sizePallet:  new FormGroup({
      lenght: new FormControl,
      width: new FormControl,
      height: new FormControl,
      weight: new FormControl
    }),
    changeInner: new FormControl,
    changeCarton: new FormControl,
    changePallet: new FormControl,
    specifications: new FormControl,
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


  currentStatusHamper: Number = 0
  barcodeHamper: string = ''
  nameVietnamesHamper: string = ''
  idProductItem: string = ''

  itemProductFilter: any = {Name: ""}
  quantityProduct: number = 0

  constructor(private toast: NotifiService){}
  



   findProductByBarcode(barcode: string){
    const lowercaseBarcode = barcode.toLowerCase();
    this.itemProductFilter = ItemProduct.find(product => product.Barcode.toLowerCase() === lowercaseBarcode);

    if(this.itemProductFilter == undefined){
      this.itemProductFilter = undefined
      this.toast.message("Không tìm thấy sản phẩm", "error")
      return
    }
  }

  handleAddProductHamper(){

    if(this.itemProductFilter != undefined && this.itemProductFilter.Name != ''){
      if(this.quantityProduct <= 0){
        this.toast.message("vui lòng nhập số lượng", "warning")
        return
      }
      let product = {Name: this.itemProductFilter.Name, Image: this.itemProductFilter.Image, Barcode:this.itemProductFilter.Barcode, Origin: this.itemProductFilter.Origin, Brand:this.itemProductFilter.Brand, Price: this.itemProductFilter.Price, Quantity: this.quantityProduct}
      this.dataItemProductInHamper.push(product)
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
  }

  getValueCompany1($event: any) {
    this.receivedCPN1 = $event;
  }


  getValueCompany2($event: any) {
    this.receivedCPN2 = $event;
  }
  getValueCompany3($event: any) {
    this.receivedCPN3 = $event;
  }

  log(){
    // console.log(this.receivedCPN1);
    // console.log(this.receivedCPN2);
    // console.log(this.receivedCPN3);

    console.log(this.formHamper.value);
  }



  ngOnInit(): void {
    //Thực hiện theo dõi tồn tại của barcode và cập nhật
    let subriceBarcode =  this.formHamper.valueChanges.subscribe(() => {
      const barcodeControl = this.formHamper.get('barcode');
      if (!barcodeControl.value) {
        const newBarcode = this.generateUniqueBarcode(); 
        barcodeControl.setValue(newBarcode);
        this.updateBarcodeInForm() 
        subriceBarcode.unsubscribe()
      }
    });
  }

  //Cập nhật Status trong form thông qua biến currentStatusHamoer
  updateStatusInForm(): void {
    this.formHamper.get('status').setValue(this.currentStatusHamper);
  }

  //Cập nhật biến barcodeHamer thông qua barcode trong formHamber
  updateBarcodeInForm(): void {
    this.barcodeHamper = this.formHamper.get('barcode').value
  }

  //Cập nhật Status trong form thông qua biến currentStatusHamoer
    updateNameVietnamesInForm(): void {
      this.formHamper.get('nameVietNames').setValue(this.nameVietnamesHamper);
    }

  // Cập nhật giá trị của FormControl sau khi trường input mất focus
  onBlurNameVietNames() {
    if(this.nameVietnamesHamper == '' || this.nameVietnamesHamper == null){
      this.nameVietnamesHamper = this.formHamper.get('nameVietNames').value
      return
    }
    this.updateNameVietnamesInForm()
    console.log(this.formHamper);
  }
  
  getStatusText(currentStatusHamper: Number):string{
    const statusObj = this.dataStatusHamper.find(status => status.id === currentStatusHamper);
    return statusObj ? statusObj.text : ''
  }

  getStatusColor(currentStatusHamper: Number): string {
    const statusObj = this.dataStatusHamper.find(status => status.id === currentStatusHamper);
    return statusObj ? statusObj.color : '';
  }

  handleChangeStatus(statusChange: number):void{
    switch (statusChange){
      case 0:
        this.currentStatusHamper = 1
        console.log(this.currentStatusHamper);
        break
      case 1: 
        this.currentStatusHamper = 2
        break
      case 2:
        this.currentStatusHamper = 4
        break
      case 3:
        this.currentStatusHamper = 3
        break
      case 4:
        alert('delete hamper')
        break
    }
    this.updateStatusInForm()
    this.log()
  }

  generateUniqueBarcode(): string {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000).toString();
    return timestamp + randomNum;
  }


  

}
