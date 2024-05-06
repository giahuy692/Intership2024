import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InLayoutRoutingModule } from './in-layout-routing.module';
import { ButtonModule, DropDownButtonModule, ListModule } from '@progress/kendo-angular-buttons';
import { IconsModule, ICON_SETTINGS, SVGIconModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule, DropDownListModule, DropDownTreesModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FileSelectModule, UploadModule, UploadsModule } from '@progress/kendo-angular-upload';
import { GridModule, PagerModule } from '@progress/kendo-angular-grid';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@progress/kendo-angular-editor';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { NotificationModule } from "@progress/kendo-angular-notification";
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TextBoxModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [
    LayoutDefaultComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    ButtonModule,
    ChartsModule,
    CommonModule,
    DateInputsModule,
    DialogsModule,
    DropDownButtonModule,
    DropDownListModule,
    DropDownTreesModule,
    DropDownsModule,
    EditorModule,
    FileSelectModule,
    FontAwesomeModule,
    FormsModule,
    GridModule,
    IconsModule,
    LayoutModule,
    ListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MultiSelectModule,
    NotificationModule,
    InLayoutRoutingModule,
    PagerModule,
    PopupModule,
    ReactiveFormsModule,
    ScrollViewModule,
    TreeListModule,
    TreeViewModule,
    NavigationModule,
    UploadModule,
    UploadsModule,
    TextBoxModule,
    SVGIconModule,
  ],
  providers: [
    { provide: ICON_SETTINGS, useValue: { type: 'font' } },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  exports: [
    ButtonModule,
    ChartsModule,
    CommonModule,
    DateInputsModule,
    DialogsModule,
    DropDownButtonModule,
    DropDownListModule,
    DropDownTreesModule,
    DropDownsModule,
    EditorModule,
    FileSelectModule,
    FontAwesomeModule,
    FormsModule,
    GridModule,
    IconsModule,
    NavigationModule,
    LayoutModule,
    ListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    NotificationModule,
    PagerModule,
    PopupModule,
    ReactiveFormsModule,
    ScrollViewModule,
    ScrollingModule,
    TreeListModule,
    TreeViewModule,
    UploadModule,
    TextBoxModule,
    SVGIconModule
  ]
})
export class InLayoutModule { }
