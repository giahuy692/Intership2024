import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { plusIcon, undoIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon } from '@progress/kendo-svg-icons';
import { companyVietHaTri, company3PS, companyMotThanhVien } from '../config004-hamper-detail/data-test';
import { DataUnitProduct } from '../config004-hamper-detail/dataUnitProduct';
import { dataMadeHameper } from '../config004-hamper-detail/dataMadeOfHamper';
import { HamperService } from '../shared/services/hamper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DTOProduct } from '../shared/dtos/DTOProduct.dto';
import { NotifiService } from '../shared/services/notifi.service';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { DTOHamperTest } from '../shared/dtos/DTOHamperTest.dto';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-config002-hamper-detail',
  templateUrl: './config002-hamper-detail.component.html',
  styleUrls: ['./config002-hamper-detail.component.scss']
})
export class Config002HamperDetailComponent implements OnInit {

  constructor(hamperService: HamperService, private formBuilder: FormBuilder, private toast: NotifiService) { }

  ngOnInit(): void {
    this.hamperForm = this.formBuilder.group({
      State: null,
      CompanyList: [],
      TotalPrice: null,
      Currency: '',
      OtherInfo: null,
      ProductList: [],
      InfoHamber: this.formBuilder.group({
        barcode: ['', Validators.required],
        vietnameseName: ['', Validators.required],
        englishName: '',
        japaneseName: '',
        origin: this.defaultItem,
        vietnameseMaterial: '',
        englishMaterial: '',
        japaneseMaterial: '',
        baseUnit: this.defaultItem,
        productSize: this.formBuilder.group({
          long: null,
          width: null,
          height: null,
          weight: null
        }),
        innerSize: this.formBuilder.group({
          long: null,
          width: null,
          height: null,
          weight: null
        }),
        cartonSize: this.formBuilder.group({
          long: null,
          width: null,
          height: null,
          weight: null
        }),
        palletSize: this.formBuilder.group({
          long: null,
          width: null,
          height: null,
          weight: null
        }),
        innerBaseUnit: null,
        cartonBaseUnit: null,
        palletInnerBaseUnit: null
      })
    }, { updateOn: 'blur' });

    this.hamperObject = this.hamperForm.value;
  }

  hamperForm: FormGroup;

  isFirstCreate: boolean = true;
  isInvalidUpdate: boolean = true;
  isDrawerShow: boolean = false;
  defaultItem = { id: -1, made: "--- Chọn ---" };
  defaultItems: BreadCrumbItem[] = [
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

  buttonIcons = { plusIcon, undoIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon, chevronDownIcon: "k-i-arrow-chevron-down" }

  companyData = { companyVietHaTri, company3PS, companyMotThanhVien };
  unitData = { DataUnitProduct };
  originData = { dataMadeHameper }

  tempProductList : DTOProduct[]=[];
  hamperObject : DTOHamperTest = {
    State: '' ,
    CompanyList: [],
    TotalPrice: null,
    Currency: '',
    OtherInfo: null,
    ProductList: [],
    InfoHamber: {}
  }

  databaseProduct: DTOProduct[] = [{
    Barcode: '0001',
    Name: 'Product 1',
    Brand: 'Brand 1',
    Origin: 'Origin 1',
    Image: 'https://sonhawater.vn/wp-content/uploads/2020/10/aquafina-355ml-new-2023.jpg',
    Price: 10,
    Quantity: 2
  },
  {
    Barcode: '0002',
    Name: 'Product 2',
    Brand: 'Brand 2',
    Origin: 'Origin 2',
    Image:'https://lh3.googleusercontent.com/onIn_NMqtrREr1B1V_S0Lw2yh_-Oj0GzxK1NFgYt4OrObaZj6x-C0kCg9czPRRbAhsDQIcanV7nCkyrNDN2AkQ9XcQ69pkKa',
    Price: 15,
    Quantity: 3
  },
  {
    Barcode: '0003',
    Name: 'Product 3',
    Brand: 'Brand 3',
    Origin: 'Origin 3',
    Image: 'https://duatruongson.com/thumbs/540x540x1/upload/product/do-dan-1788.jpg',
    Price: 20,
    Quantity: 5
  },
  {
    Barcode: '0004',
    Name: 'Product 4',
    Brand: 'Brand 4',
    Origin: 'Origin 4',
    Price: 25,
    Quantity: 1
  },
  {
    Barcode: '0005',
    Name: 'Product 5',
    Brand: 'Brand 5',
    Origin: 'Origin 5',
    Price: 30,
    Quantity: 4
  },
  {
    Barcode: '0006',
    Name: 'Product 6',
    Brand: 'Brand 6',
    Origin: 'Origin 6',
    Price: 35,
    Quantity: 2
  },
  {
    Barcode: '0007',
    Name: 'Product 7',
    Brand: 'Brand 7',
    Origin: 'Origin 7',
    Price: 40,
    Quantity: 3
  },
  {
    Barcode: '0008',
    Name: 'Product 8',
    Brand: 'Brand 8',
    Origin: 'Origin 8',
    Price: 45,
    Quantity: 6
  },
  {
    Barcode: '0009',
    Name: 'Product 9',
    Brand: 'Brand 9',
    Origin: 'Origin 9',
    Price: 50,
    Quantity: 2
  },
  {
    Barcode: '0010',
    Name: 'Product 10',
    Brand: 'Brand 10',
    Origin: 'Origin 10',
    Price: 55,
    Quantity: 8
  }]

  searchedProduct : DTOProduct;
  quantityInput : number = null;

  onFormSubmit() {
    if (this.hamperForm.valid) {

    }
  }

  changeHamperStatus(status: string) {
    this.hamperForm.get('State').setValue(status);
  }

  generateBarcode(inputRef : TextBoxComponent): void {
    const barcodeControl = this.hamperForm.controls['InfoHamber'].get('barcode');
    const vietNameControl = this.hamperForm.controls['InfoHamber'].get('vietnameseName');
    const statusControl = this.hamperForm.get('State');

    if (!barcodeControl.valid && vietNameControl.valid && this.isFirstCreate) {
      const randomBarcode = this.generateRandomBarcode(8);
      barcodeControl.setValue(randomBarcode);
      statusControl.setValue('Đang soạn thảo');
      this.isFirstCreate = false;
      this.hamperObject = this.hamperForm.value;
      this.toast.message("Tạo hamper thành công", 'success')
      this.hamperForm.valueChanges.subscribe(value => {
        if (this.hamperForm.invalid) {
          this.isInvalidUpdate = true;
          this.hamperForm.setValue(this.hamperObject);  
          
        } else {
          this.hamperObject = value;
          if(!this.isInvalidUpdate) this.toast.message("Update hamper thành công", 'success')  
          this.isInvalidUpdate = false;
        }
      });
    }
  }


  generateRandomBarcode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  searchItem(term: string){
    const foundProduct = this.databaseProduct.find(product => product.Barcode == term);
    if(foundProduct){
      this.toast.message("Đã tìm thấy sản phẩm: "+ foundProduct.Name, 'success');
      this.searchedProduct = foundProduct;
    }else{
      if(term != ''){
        this.toast.message("Không tìm thấy sản phẩm",'error')
      }
      
    }
  }

  updateHamperProduct(){
    let foundProductInHamper = this.tempProductList.find(product => product.Barcode == this.searchedProduct.Barcode);
    if(!foundProductInHamper){
      const tempProduct = {...this.searchedProduct}
      tempProduct.Quantity = this.quantityInput;
      this.tempProductList.push(tempProduct)
    }
    this.hamperForm.get('ProductList').setValue(this.tempProductList)
    this.quantityInput = null;
  }

  checkDisable() {
    return this.hamperForm.valid ? true : false
  }

  resetForm(){
    if(!this.isFirstCreate){
      this.hamperForm = this.formBuilder.group({
        State: null,
        CompanyList: [],
        TotalPrice: null,
        Currency: '',
        OtherInfo: null,
        ProductList: [],
        InfoHamber: this.formBuilder.group({
          barcode: ['', Validators.required],
          vietnameseName: ['', Validators.required],
          englishName: '',
          japaneseName: '',
          origin: this.defaultItem,
          vietnameseMaterial: '',
          englishMaterial: '',
          japaneseMaterial: '',
          baseUnit: this.defaultItem,
          productSize: this.formBuilder.group({
            long: null,
            width: null,
            height: null,
            weight: null
          }),
          innerSize: this.formBuilder.group({
            long: null,
            width: null,
            height: null,
            weight: null
          }),
          cartonSize: this.formBuilder.group({
            long: null,
            width: null,
            height: null,
            weight: null
          }),
          palletSize: this.formBuilder.group({
            long: null,
            width: null,
            height: null,
            weight: null
          }),
          innerBaseUnit: null,
          cartonBaseUnit: null,
          palletInnerBaseUnit: null
        })
      }, { updateOn: 'blur' });
      this.isFirstCreate = true;
      this.toast.message("Đã reset form",'error')
    }
    
  }

  openDrawer() {
    this.isDrawerShow = true;
  }
  closeDrawer() {
    this.isDrawerShow = false;
    this.searchedProduct = null;
  }
}
