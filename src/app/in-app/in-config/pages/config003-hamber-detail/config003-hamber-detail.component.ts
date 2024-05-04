import { Component, ViewEncapsulation } from '@angular/core';
import { BreadCrumbCollapseMode, BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { SVGIcon, arrowRotateCcwIcon, homeIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-config003-hamber-detail',
  templateUrl: './config003-hamber-detail.component.html',
  styleUrls: ['./config003-hamber-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Config003HamberDetailComponent {
   defaultItems: BreadCrumbItem[] = [
    {
      text: "Home",
      svgIcon: homeIcon,
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
  public items: BreadCrumbItem[] = [...this.defaultItems];
  public homeIcon: SVGIcon = homeIcon;
  public rotateIcon: SVGIcon = arrowRotateCcwIcon;
  public collapseMode: BreadCrumbCollapseMode = 'none';
  public onItemClick(item: BreadCrumbItem): void {
    const index = this.items.findIndex((e) => e.text === item.text);
    this.items = this.items.slice(0, index + 1);
  }

  public refreshBreadCrumb(): void {
    this.items = [...this.defaultItems];
  }
}
