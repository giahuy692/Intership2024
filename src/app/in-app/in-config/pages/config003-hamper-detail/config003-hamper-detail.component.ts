import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { SVGIcon, arrowRotateCcwIcon, checkOutlineIcon, downloadIcon, eyeIcon, homeIcon, minusCircleIcon, pencilIcon, plusIcon, redoIcon, trashIcon, undoIcon, uploadIcon } from '@progress/kendo-svg-icons';
import { DTOHamper } from '../shared/dtos/DTOHamper.dto';
import { Subscription } from 'rxjs';
import { HamperService } from '../shared/services/hamper.service';

@Component({
  selector: 'app-config003-hamber-detail',
  templateUrl: './config003-hamper-detail.component.html',
  styleUrls: ['./config003-hamper-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Config003HamperDetailComponent implements OnInit,OnDestroy {
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
  icons = {pencilIcon,eyeIcon,trashIcon,uploadIcon,downloadIcon,plusIcon,redoIcon,checkOutlineIcon, minusCircleIcon,undoIcon}
  private subscriptions: Subscription[] = [];
  hamperCrr: DTOHamper
  public items: BreadCrumbItem[] = [...this.defaultItems];
  public collapseMode: BreadCrumbCollapseMode = 'none';
  constructor(private hamperService: HamperService){

  }
  ngOnInit(): void {
    this.subscriptions.push(this.hamperService.hamberSubject$.subscribe(data=>{
      this.hamperCrr = data
    }))
  }
  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sb) => sb.unsubscribe());
    }
  }
  
  

}
