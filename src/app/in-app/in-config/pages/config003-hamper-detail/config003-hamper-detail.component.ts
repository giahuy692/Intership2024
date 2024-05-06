import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { SVGIcon, arrowRotateCcwIcon, homeIcon } from '@progress/kendo-svg-icons';
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
      text: "Home",
    },
    {
      text: "Products",
    },
    {
      text: "Computer peripherals",
    },
    {
      text: "Keyboards",
    },
    {
      text: "Gaming keyboards",
    },
  ];
  private subscriptions: Subscription[] = [];
  hamperCrr: DTOHamper
  public items: BreadCrumbItem[] = [...this.defaultItems];
  public homeIcon: SVGIcon = homeIcon;
  public rotateIcon: SVGIcon = arrowRotateCcwIcon;
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
  // public onItemClick(item: BreadCrumbItem): void {
  //   const index = this.items.findIndex((e) => e.text === item.text);
  //   this.items = this.items.slice(0, index + 1);
  // }
  // public refreshBreadCrumb(): void {
  //   this.items = [...this.defaultItems];
  // }
  
  

}
