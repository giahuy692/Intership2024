import { Component, ViewEncapsulation } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { plusIcon, undoIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon } from '@progress/kendo-svg-icons';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-config002-hamper-detail',
  templateUrl: './config002-hamper-detail.component.html',
  styleUrls: ['./config002-hamper-detail.component.scss']
})
export class Config002HamperDetailComponent {
  isDrawerShow : boolean = false;

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

  buttonIcons = {plusIcon, undoIcon, redoIcon, checkOutlineIcon, minusOutlineIcon, trashIcon, chevronDownIcon : "k-i-arrow-chevron-down"}

  openDrawer(){
    this.isDrawerShow = true;
  }
  closeDrawer(){
    this.isDrawerShow = false;
  }
}
