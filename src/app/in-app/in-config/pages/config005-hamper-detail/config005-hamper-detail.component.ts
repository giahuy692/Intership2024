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
    barbarcode: new FormControl(''),
    vietnamese: new FormControl(''),
    japanese: new FormControl(''),
    origin: new FormControl(''),
    materialVietnamese: new FormControl(''),
    materialEnglish: new FormControl(''),
    materialJapanese: new FormControl(''),
  });

  data = [1, 2, 3, 4];
  constructor(private notification: NotifiService) {}
  icons = { checkOutlineIcon };

  confirmDelete() {
    this.notification.message('Thêm tành công', 'success');
    this.data.forEach((item) => {
      console.log(item);
    });
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
