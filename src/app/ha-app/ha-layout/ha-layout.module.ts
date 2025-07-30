import { NgModule } from '@angular/core';

import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { ComponentLayoutModule } from './components/ha-layout-component.module';
import { HachiLayoutRoutingModule } from './ha-layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconModule } from '@progress/kendo-angular-icons';

@NgModule({
  declarations: [
    LayoutDefaultComponent,
  ],
  imports: [
    ComponentLayoutModule,
    HachiLayoutRoutingModule,
    IconModule,
  ],
  
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
  
})
export class HachiLayoutModule { }

