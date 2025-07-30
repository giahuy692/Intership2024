import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconModule } from '@progress/kendo-angular-icons';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
  ],
  
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
  
})
export class ComponentLayoutModule { }
