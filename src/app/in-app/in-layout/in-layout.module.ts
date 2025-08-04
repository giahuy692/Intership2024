import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { CommonModule } from '@angular/common';
import { InLayoutRoutingModule } from './in-layout-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LayoutDefaultComponent
  ],
  imports: [
    CommonModule,
    InLayoutRoutingModule,
],
  providers: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  exports: [
    LayoutDefaultComponent
  ]
})
export class InLayoutModule { }
