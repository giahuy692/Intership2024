import { NgModule } from '@angular/core';

import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { ComponentLayoutModule } from './components/ha-layout-component.module';
import { HachiLayoutRoutingModule } from './ha-layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconModule } from '@progress/kendo-angular-icons';
import { PurchaseDetailC0067Module } from '../ha-purchase/shared/components/purchase-detail-c0067/purchase-detail-c0067.module';

@NgModule({
  declarations: [
    LayoutDefaultComponent,
  ],
  imports: [
    ComponentLayoutModule,
    HachiLayoutRoutingModule,
    IconModule,
    PurchaseDetailC0067Module,
  ],
  
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
  
})
export class HachiLayoutModule { }

