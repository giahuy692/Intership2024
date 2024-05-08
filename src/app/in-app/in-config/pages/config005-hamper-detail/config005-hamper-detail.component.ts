import { Component } from '@angular/core';
import { NotifiService } from '../shared/services/notifi.service';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { checkOutlineIcon } from '@progress/kendo-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config005-hamper-detail',
  templateUrl: './config005-hamper-detail.component.html',
  styleUrls: ['./config005-hamper-detail.component.scss'],
})
export class Config005HamperDetailComponent {
  hamber = new FormGroup({
    barcode: new FormControl(''),
    vietnamese: new FormControl(''),
    english: new FormControl(''),
    japanese: new FormControl(''),
    origin: new FormControl(''),
    materialVietnamese: new FormControl(''),
    materialEnglish: new FormControl(''),
    materialJapanese: new FormControl(''),
  });

  public origins = [
    { id: 0, country: 'Việt Nam' },
    { id: 1, country: 'Nhật Bản' },
    { id: 2, country: 'Thái Lan' },
  ];

  defaultOrigin: { country: string; id: number } = {
    id: null,
    country: '---Chọn---',
  };

  constructor(private notification: NotifiService) {}

  icons = { checkOutlineIcon };

  // Confirm delete action
  confirmDelete() {
    this.notification.message('Thêm thành công', 'success');
  }

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
}
