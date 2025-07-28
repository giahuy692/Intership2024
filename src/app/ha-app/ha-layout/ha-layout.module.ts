import { NgModule } from '@angular/core';

import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { ComponentLayoutModule } from './components/ha-layout-component.module';
import { HachiLayoutRoutingModule } from './ha-layout-routing.module';

@NgModule({
  declarations: [
    LayoutDefaultComponent
  ],
  imports: [
    ComponentLayoutModule,
    HachiLayoutRoutingModule
  ],
  
  exports: [
  ]
  
})
export class HachiLayoutModule { }
