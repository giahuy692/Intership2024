import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotifiService } from '../shared/services/notifi.service';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { checkOutlineIcon } from '@progress/kendo-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { dataMadeHameper } from '../config004-hamper-detail/dataMadeOfHamper';
import { DataUnitProduct } from '../config004-hamper-detail/dataUnitProduct';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
@Component({
  selector: 'app-config005-hamper-detail',
  templateUrl: './config005-hamper-detail.component.html',
  styleUrls: ['./config005-hamper-detail.component.scss'],
})
export class Config005HamperDetailComponent implements OnInit, OnChanges {
  hamberForm = new FormGroup({
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
  });
  // defultOrigin: { made: string; id: number } = {
  //   id: 0,
  //   made: 'Việt Nam',
  // };
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
  hamber: DTOHamper[] = [];

  constructor(private notification: NotifiService) {}
  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}

  // Create hamper object
}
