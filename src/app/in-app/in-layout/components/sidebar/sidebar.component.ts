import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuDataItem, ModuleDataItem } from '../../dto/menu-data-item.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerItem } from '@progress/kendo-angular-layout';
import { inboxIcon, bellIcon, calendarIcon, envelopeLinkIcon, starOutlineIcon, dataIcon, chevronDownIcon } from '@progress/kendo-svg-icons';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  expanded = false;
  public icons = {dataIcon, chevronDownIcon}
  public items: Array<DrawerItem> = [
    { text: "Inbox", svgIcon: inboxIcon, selected: true },
    { separator: true },
    { text: "Notifications", svgIcon: bellIcon },
    { text: "Calendar", svgIcon: calendarIcon },
    { separator: true },
    { text: "Attachments", svgIcon: envelopeLinkIcon },
    { text: "Favourites", svgIcon: starOutlineIcon },
  ];
  constructor(private router : Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    
  }

}
