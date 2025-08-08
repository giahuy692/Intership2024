// import { TooltipsModule } from '@progress/kendo-angular-tooltip';
import { ButtonModule, DropDownButtonModule, ListModule } from '@progress/kendo-angular-buttons';
import { CartSearchProductPopupComponent } from './components/cart-search-product-popup/cart-search-product-popup.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { CheckboxButtonGroupComponent } from './components/checkbox-button-group/checkbox-button-group.component';
import { ColorStatusPipe } from './pipe/color-status.pipe';
import { CommonModule } from '@angular/common';
import { ConvertMinuteToString } from './pipe/convert-minute.pipe';
import { ConvertMinuteToString_dd_hh_mm } from './pipe/convert-minute.pipe copy';
import { ConvertStringEditorPipe } from './pipe/convert-edit-text.pipe';
import { ConvertToDatePipe } from './pipe/convert-to-date.pipe';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule, DropDownListModule, DropDownTreesModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { EditorModule } from '@progress/kendo-angular-editor';
import { EmployeeAttendanceService, ProductSalesService } from './services/folder-popup.service';
import { FileSelectModule, UploadModule, UploadsModule } from '@progress/kendo-angular-upload';
import { FloatingLabelModule, LabelModule } from '@progress/kendo-angular-label';
import { FolderPopupComponent } from './components/folder-popup/folder-popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { GridModule, PagerModule } from '@progress/kendo-angular-grid';
import { HeaderComponent } from './components/header/header.component';
import { HeaderPortalComponent } from './components/header-portal/header-portal.component';
import { IconsModule, ICON_SETTINGS } from '@progress/kendo-angular-icons';
import { ImportPopupComponent } from './components/import-popup/import-popup.component';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { IntegerPartPipe } from './pipe/integer-part-pipe.pipe';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LayoutPortalComponent } from './layout-portal/layout-portal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './components/menu/menu.component';
import { MenuPortalComponent } from './components/menu-portal/menu-portal.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationModule } from "@progress/kendo-angular-notification";
import { PChangepasswordPopupComponent } from './components/p-changepassword-popup/p-changepassword-popup.component';
import { PDatePickerComponent } from './components/p-datepicker/p-datepicker.component';
import { PDateTimePickerComponent } from './components/p-datetimepicker/p-datetimepicker.component';
import { PersonalInfoDetailComponent } from './components/personal-info-detail/personal-info-detail.component';
import { PFileButtonGroupComponent } from './components/p-file-button-group/p-file-button-group.component';
import { PKendoBreadcrumbComponent } from './components/p-kendo-breadcrumb/p-kendo-breadcrumb.component';
import { PKendoDialogComponent } from './components/p-kendo-dialog/p-kendo-dialog.component';
import { PKendodropdownlistComponent } from './components/p-kendo-dropdownlist/p-kendo-dropdownlist.component';
import { PKendoDropdowntreeComponent } from './components/p-kendo-dropdowntree/p-kendo-dropdowntree.component';
import { PKendoEditorComponent } from './components/p-kendo-editor/p-kendo-editor.component';
import { PKendoGridColumnComponent } from './components/p-kendo-grid/p-kendo-grid-column.component';
import { PKendoGridComponent } from './components/p-kendo-grid/p-kendo-grid.component';
import { PKendoGridDropdownlistComponent } from './components/p-kendo-grid-dropdownlist/p-kendo-grid-dropdownlist.component';
import { PKendoGridNumericTextboxDayHourMinuteComponent } from './components/p-kendo-grid-numerictexbox-dayhourminute/p-kendo-grid-numerictexbox-dayhourminute.component';
import { PKendoMaskedTextboxComponent } from './components/p-masked-textbox/p-masked-textbox.component';
import { PKendoNumericTextboxComponent } from './components/p-kendo-numeric-textbox/p-numeric-textbox.component';
import { PKendoTextareaComponent } from './components/p-kendo-textarea/p-textarea.component';
import { PKendoTextboxComponent } from './components/p-kendo-textbox/p-textbox.component';
import { PKendoTreeListColumnComponent } from './components/p-kendo-treelist/p-kendo-treelist-column.component';
import { PKendoTreelistComponent } from './components/p-kendo-treelist/p-kendo-treelist.component';
import { PLayoutRoutingModule } from './p-layout-routing.module';
import { PLoadingSpinnerComponent } from './components/p-loading-spinner/p-loading-spinner.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { SearchFilterGroupComponent } from './components/search-filter-group/search-filter-group.component';
import { SearchProductPopupComponent } from './components/search-product-popup/search-product-popup.component';
import { SelectedRowitemPopupComponent } from './components/selected-rowitem-popup/selected-rowitem-popup.component';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import {IntlService} from "@progress/kendo-angular-intl";
import {CustomIntlService} from "./services/week-start-intl.service";

@NgModule({
  declarations: [
    //component
    CheckboxButtonGroupComponent,
    FooterComponent,
    HeaderComponent,
    HeaderPortalComponent,
    LayoutDefaultComponent,
    LayoutPortalComponent,
    MenuComponent,
    MenuPortalComponent,
    //p-kendo
    PDatePickerComponent,
    PDateTimePickerComponent,
    PersonalInfoDetailComponent,
    PFileButtonGroupComponent,
    PKendoBreadcrumbComponent,
    PKendoBreadcrumbComponent,
    PKendoDialogComponent,
    PKendodropdownlistComponent,
    PKendoDropdowntreeComponent,
    PKendoEditorComponent,
    PKendoMaskedTextboxComponent,
    PKendoNumericTextboxComponent,
    PKendoTextareaComponent,
    PKendoTextboxComponent,
    PKendoTreeListColumnComponent,
    PKendoTreelistComponent,
    PLoadingSpinnerComponent,
    SearchFilterGroupComponent,
    //grid
    PKendoGridColumnComponent,
    PKendoGridComponent,
    PKendoGridDropdownlistComponent,
    PKendoGridNumericTextboxDayHourMinuteComponent,
    //popup
    CartSearchProductPopupComponent,
    DeletePopupComponent,
    FolderPopupComponent,
    ImportPopupComponent,
    PChangepasswordPopupComponent,
    SearchProductPopupComponent,
    SelectedRowitemPopupComponent,
    //pipe
    ColorStatusPipe,
    ConvertMinuteToString_dd_hh_mm,
    ConvertMinuteToString,
    ConvertStringEditorPipe,
    ConvertToDatePipe,
    IntegerPartPipe,
  ],
  imports: [
    // IvyCarouselModule,
    // TooltipsModule,
    ButtonModule,
    ChartsModule,
    CommonModule,
    DateInputsModule,
    DialogsModule,
    DropDownButtonModule,
    DropDownListModule,
    DropDownsModule,
    DropDownTreesModule,
    EditorModule,
    FileSelectModule,
    FloatingLabelModule,
    FontAwesomeModule,
    FormsModule,
    GridModule,
    IconsModule,
    InputsModule,
    LabelModule,
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
    NavigationModule,
    NotificationModule,
    PagerModule,
    PLayoutRoutingModule,
    PopupModule,
    ReactiveFormsModule,
    ScrollViewModule,
    TextBoxModule,
    TreeListModule,
    TreeViewModule,
    UploadModule,
    UploadsModule,
  ],
  providers: [
    { provide: 'IGraphServices', useClass: EmployeeAttendanceService, multi: true },
    { provide: 'IGraphServices', useClass: ProductSalesService, multi: true },
    { provide: ICON_SETTINGS, useValue: { type: 'font' } },
    { provide: IntlService, useClass: CustomIntlService }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  exports: [
    //component
    CheckboxButtonGroupComponent,
    PDatePickerComponent,
    PDateTimePickerComponent,
    PersonalInfoDetailComponent,
    PFileButtonGroupComponent,
    PKendoBreadcrumbComponent,
    PKendoDialogComponent,
    PKendodropdownlistComponent,
    PKendoDropdowntreeComponent,
    PKendoEditorComponent,
    PKendoMaskedTextboxComponent,
    PKendoNumericTextboxComponent,
    PKendoTextareaComponent,
    PKendoTextboxComponent,
    PKendoTreeListColumnComponent,
    PKendoTreelistComponent,
    PLoadingSpinnerComponent,
    SearchFilterGroupComponent,
    //grid
    // PKendoGridColumnComponent,
    PKendoGridComponent,
    PKendoGridDropdownlistComponent,
    PKendoGridNumericTextboxDayHourMinuteComponent,
    //popup
    CartSearchProductPopupComponent,
    FolderPopupComponent,
    ImportPopupComponent,
    PChangepasswordPopupComponent,
    SearchProductPopupComponent,
    SelectedRowitemPopupComponent,
    //module
    // IvyCarouselModule,
    // TooltipsModule,
    ButtonModule,
    ChartsModule,
    CommonModule,
    DateInputsModule,
    DialogsModule,
    DropDownButtonModule,
    DropDownListModule,
    DropDownsModule,
    DropDownTreesModule,
    EditorModule,
    FileSelectModule,
    FloatingLabelModule,
    FontAwesomeModule,
    FormsModule,
    GridModule,
    IconsModule,
    InputsModule,
    LabelModule,
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
    NavigationModule,
    NotificationModule,
    PagerModule,
    PopupModule,
    ReactiveFormsModule,
    ScrollingModule,
    ScrollViewModule,
    TextBoxModule,
    TreeListModule,
    TreeViewModule,
    UploadModule,
    //pipe
    ColorStatusPipe,
    ConvertMinuteToString_dd_hh_mm,
    ConvertMinuteToString,
    ConvertStringEditorPipe,
    ConvertToDatePipe,
    IntegerPartPipe,
  ]
})
export class PLayoutModule { }
