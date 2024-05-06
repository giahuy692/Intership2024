import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuDataItem, ModuleDataItem } from '../../dto/menu-data-item.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { inboxIcon, bellIcon, calendarIcon, envelopeLinkIcon, starOutlineIcon, dataIcon, chevronDownIcon } from '@progress/kendo-svg-icons';
import { ModuleDataAdmin } from '../../in-sitemaps/menu.data-admin';
import { InLayoutRoutingService } from '../../services/in-layout-routing.service';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() modules: ModuleDataItem[] = [];
  listMenu: MenuDataItem[] = [];
  baseListMenu: MenuDataItem[] = [];
  expanded = true;

  selectedParentModule: MenuDataItem;
  public icons = { dataIcon, chevronDownIcon }

  constructor(private routerService: InLayoutRoutingService) {
  }

  ngOnInit(): void {
    const selectedModule = this.routerService.route.snapshot.firstChild.firstChild.firstChild.url[0].path;
    const selectedChildModule = this.routerService.route.snapshot.firstChild.firstChild.firstChild.firstChild.firstChild.url[0].path;
    const tempList = this.modules.find(module => module.Path === selectedModule)

    if (tempList) {
      this.baseListMenu = [...tempList.ListMenu];
      this.listMenu = tempList.ListMenu;    
      this.getDefaultList(selectedChildModule);
    }

    this.routerService.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const segments = this.routerService.router.url.split('/');
        const navigatedModule = segments[2];
        this.removeAllPrevSelected(false);
        const item = this.listMenu.find(item => item.Code === navigatedModule);
        const parentItem = this.listMenu.find(parent => parent.Name === item.Parent);
        item.Actived = true;
        if(parentItem) parentItem.Actived = true;
        
      }
    });
  }

  //Hàm lấy default khi nhận list
  getDefaultList(selectedChildModule: string) {
    this.listMenu.forEach((parent, index) => {
      const childItem = parent.LstChild.find(child => child.Code == selectedChildModule);
      if (childItem) {
        childItem.Actived = true;
        if (childItem.Parent === parent.Name) {
          this.selectedParentModule = parent;
          parent.Actived = true;
          this.addChildren(index, parent.LstChild);
        }
      }
    });
  }

  onDrawerItemSelect(ev: DrawerSelectEvent) {
    //Lấy index và object của module
    let itemIndex;
    const item = this.listMenu.find((e, index) => {
      itemIndex = index
      return e.Code === ev.item.Code;
    });

    //Nếu như item là một module con thì lấy module cha gán vào selectedParentModule để xử lí giao diện
    const parentItem = this.baseListMenu.find(menuItem => menuItem.Name == item.Parent)
    if (item.Parent) {
      this.selectedParentModule = parentItem;
    }
    
    //Nếu item là một module cha và module đó khác với module hiện đang được chọn thì remove tất cả các item đang được chọn
    const isParentItem = this.baseListMenu.find(menuItem => menuItem.Code == item.Code)
    if(isParentItem && this.selectedParentModule && isParentItem.Code != this.selectedParentModule.Code){
      if(this.selectedParentModule.LstChild.length >0 ){
        this.selectedParentModule.LstChild.forEach(child => child.Actived = false)
      }
      if(this.checkParentPrevSelect(isParentItem) == false){
        this.removeAllPrevSelected(false);
      }
    }

    if (parentItem && item.Code != parentItem.Code) {
      this.removeAllPrevSelected(false);
      
    }
    //Nếu như item chưa được active và là một module chứa các module con thì thêm module con vào list và ngược lại
    if (!item.Actived) {
      if(isParentItem && item.Type != 'group'){
        this.selectedParentModule = item;
      }
      item.Actived = true;
      if (item.LstChild.length > 0 && item.Type == 'group') this.addChildren(itemIndex, item.LstChild);
    }
    else {
      if(item.Type != 'function') item.Actived = false
      if (item.LstChild.length > 0 && item.Type == 'group') this.removeChildren(itemIndex, item.LstChild);
    }


  }

  //Hàm unactive các item đã được chọn
  removeAllPrevSelected(removeAll: boolean) {
    this.listMenu.forEach(item => {
      if (item.Type != 'group') {
        item.Actived = false;
      } else {
        if (removeAll) {
          item.Actived = false;
        }
      }
    });
  }

  checkParentPrevSelect(parentItem : MenuDataItem) : boolean{
    if((parentItem.Type == 'function' && this.selectedParentModule.Type == 'group')){
      return false;   
    }
    return true;
  }

  //Hàm thêm các module con vào module cha
  addChildren(itemIndex: number, children: MenuDataItem[]) {
    this.listMenu.splice(itemIndex + 1, 0, ...children);
  }

  //Hàm xoá các module con khỏi module cha
  removeChildren(itemIndex: number, children: MenuDataItem[]) {
    this.listMenu.splice(itemIndex + 1, children.length);
  }
}
