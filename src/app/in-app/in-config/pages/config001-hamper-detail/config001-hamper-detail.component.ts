import { Component, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';

@Component({
  selector: 'app-config001-hamper-detail',
  templateUrl: './config001-hamper-detail.component.html',
  styleUrls: ['./config001-hamper-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Config001HamperDetailComponent {
  status: string = "Trả về";
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
  public items: BreadCrumbItem[] = [...this.defaultItems];
  public collapseMode: BreadCrumbCollapseMode = 'none';
}
