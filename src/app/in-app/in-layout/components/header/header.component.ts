import { Component, Input } from '@angular/core';
import { ModuleDataItem } from '../../dto/menu-data-item.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { searchIcon, bellIcon} from '@progress/kendo-svg-icons';
import { InLayoutRoutingService } from '../../services/in-layout-routing.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() moduleList : ModuleDataItem[] = [];
  icons = {searchIcon, bellIcon};
  public kendokaAvatar = 'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';
  selectedModule : string = "";

  constructor(private routerService : InLayoutRoutingService){}

  ngOnInit(): void {
    this.selectedModule = this.routerService.route.snapshot.children[0].children[0].children[0].url[0].path;
    this.routerService.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const segments = this.routerService.router.url.split('/');
        const navigatedModule = segments[1];
        this.selectedModule = navigatedModule;
      }
    });
  }
  
  
}
