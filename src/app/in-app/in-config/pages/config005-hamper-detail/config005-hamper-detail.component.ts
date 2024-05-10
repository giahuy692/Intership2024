import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotifiService } from '../shared/services/notifi.service';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { checkOutlineIcon } from '@progress/kendo-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { dataMadeHameper } from '../config004-hamper-detail/dataMadeOfHamper';
import { DataUnitProduct } from '../config004-hamper-detail/dataUnitProduct';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { DTOHamperTest } from '../shared/dtos/DTOHamperTest.dto';
@Component({
  selector: 'app-config005-hamper-detail',
  templateUrl: './config005-hamper-detail.component.html',
  styleUrls: ['./config005-hamper-detail.component.scss'],
})
export class Config005HamperDetailComponent implements OnInit, OnChanges {
  hamberForm = new FormGroup(
    {
      barcode: new FormControl({ value: '', disabled: true }),
      vietnamese: new FormControl(),
      english: new FormControl(''),
      japanese: new FormControl(''),
      origin: new FormControl({ value: '', disabled: true }),
      materialVietnamese: new FormControl(''),
      materialEnglish: new FormControl(''),
      materialJapanese: new FormControl(''),
      baseUnit: new FormControl(''),
      sizeProduct: new FormGroup({
        width: new FormControl(''),
        height: new FormControl(''),
        length: new FormControl(''),
        weight: new FormControl(''),
      }),
      sizeInner: new FormGroup({
        width: new FormControl(''),
        height: new FormControl(''),
        length: new FormControl(''),
        weight: new FormControl(''),
      }),
      sizeCartoon: new FormGroup({
        width: new FormControl(''),
        height: new FormControl(''),
        length: new FormControl(''),
        weight: new FormControl(''),
      }),
      sizePallet: new FormGroup({
        width: new FormControl(''),
        height: new FormControl(''),
        length: new FormControl(''),
        weight: new FormControl(''),
      }),
      inner: new FormControl(''),
      cartoon: new FormControl(''),
      pallet: new FormControl(''),
      others: new FormControl(''),
    },
    { updateOn: 'blur' }
  );

  defaultUnit: { made: string; id: number } = {
    id: 2,
    made: 'Gam',
  };
  itemBreadCrumb: BreadCrumbItem[] = [
    {
      text: 'QUẢN LÝ SẢN PHẨM',
    },
    {
      text: 'TẠO HAMPER',
    },
    {
      text: 'CHI TIẾT HAMPER',
    },
  ];
  icons = { checkOutlineIcon };
  confirmDelete() {
    this.notification.message('Thêm thành công', 'success');
  }

  public origins = dataMadeHameper;
  public unit = DataUnitProduct;
  public showDrawer: boolean = false;
  // hamber: DTOHamper[] = [];
  hamperArray: DTOHamperTest[] = [];

  constructor(private notification: NotifiService) {}
  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.onVietnameseBlur();
  }
  ngOnInit(): void {
    this.createHamper();
    this.updateValues();
  }

  createHamper(): void {
    const hamper: DTOHamperTest = {
      State: 'Đang soạn thảo',
      CompanyList: [],
      TotalPrice: 0,
      Currency: '',
      OtherInfo: '',
      ProductList: [],
      InfoHamber: {
        barcode: null,
        vietnameseName: null,
        englishName: null,
        japaneseName: null,
        origin: null,
        vietnameseMaterial: null,
        englishMaterial: null,
        japaneseMaterial: null,
        baseUnit: null,
        productSize: {
          long: null,
          width: null,
          height: null,
          weight: null,
        },
        innerSize: {
          long: null,
          width: null,
          height: null,
          weight: null,
        },
        cartonSize: {
          long: null,
          width: null,
          height: null,
          weight: null,
        },
        palletSize: {
          long: null,
          width: null,
          height: null,
          weight: null,
        },
        innerBaseUnit: null,
        cartonBaseUnit: null,
        palletInnerBaseUnit: null,
      },
    };

    this.hamperArray.push(hamper);
  }

  onVietnameseBlur() {
    const name = this.hamberForm.get('vietnamese').value;
    if (name.trim().length > 0) {
      if (this.hamperArray[0].InfoHamber.vietnameseName) {
        this.hamperArray[0].InfoHamber.vietnameseName = name;
        this.notification.message(
          'Cập nhật Vietnamese name thành công',
          'success'
        );
      } else {
        this.hamperArray[0].InfoHamber.vietnameseName = name;
        this.notification.message('Thêm Vietnamese name thành công', 'success');
      }
      console.log('hamperArray:', this.hamperArray); // Log the updated hamperArray
    } else {
      this.notification.message('Tên Vietnamese không được để trống', 'error');
      return;
    }
  }

  updateValues() {
    this.hamberForm.valueChanges.subscribe((value) => {
      const infoHamber: any = { ...value }; // Ép kiểu value sang any để tránh lỗi
      this.hamperArray[0].InfoHamber = infoHamber;
      console.log('hamperArray:', this.hamperArray);
    });
  }
  data = [
    {
      Barcode: '0002',
      Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
      Brand: 'Brand01',
      Origin: 'Origin01',
      Price: 15,
      Quantity: 3,
    },
  ];
}
