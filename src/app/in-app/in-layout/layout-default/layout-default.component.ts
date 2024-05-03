import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModuleDataItem } from '../dto/menu-data-item.dto';
import { ModuleDataAdmin } from '../in-sitemaps/menu.data-admin';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss']
})
export class LayoutDefaultComponent {
  
  modules :ModuleDataItem[] = ModuleDataAdmin
  constructor(){

  }
}
