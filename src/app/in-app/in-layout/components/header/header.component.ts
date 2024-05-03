import { Component, Input } from '@angular/core';
import { ModuleDataItem } from '../../dto/menu-data-item.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { searchIcon, bellIcon} from '@progress/kendo-svg-icons';
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

  constructor(private router : Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.selectedModule = this.route.snapshot.children[0].url[0].path;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const segments = this.router.url.split('/');
        const navigatedModule = segments[1];
        this.selectedModule = navigatedModule;
      }
    });
  }
  
}
