import { Component, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { HamperService } from '../shared/services/hamper.service';
import { Subscription } from 'rxjs';
import { checkOutlineIcon, minusCircleIcon, plusIcon, redoIcon, trashIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-config001-hamper-detail',
  templateUrl: './config001-hamper-detail.component.html',
  styleUrls: ['./config001-hamper-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Config001HamperDetailComponent {
  constructor(private hamperService: HamperService) { }
  hamperCrr: DTOHamper;
  status: string = "Đang soạn thảo";
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
  collapseMode: BreadCrumbCollapseMode = 'none';
  private subscriptions: Subscription[] = [];
  icons = {trashIcon, plusIcon, minusCircleIcon, checkOutlineIcon, redoIcon}

  ngOnInit(): void {
    this.subscriptions.push(this.hamperService.hamberSubject$.subscribe(data => {
      this.hamperCrr = data
    }))
  }

ngOnDestroy(): void {
  if(this.subscriptions.length > 0) {
  this.subscriptions.forEach((sb) => sb.unsubscribe());
}
  }
}
