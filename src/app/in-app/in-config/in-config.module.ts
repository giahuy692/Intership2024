import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { InLayoutModule } from '../in-layout/in-layout.module';
import { PConfigRoutingModule } from './in-config-routing.module';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
import { Config004HamperDetailComponent } from './pages/config004-hamper-detail/config004-hamper-detail.component';
import { ItemCompanyComponent } from './pages/shared/components/item-company/item-company.component';
import { Config003HamperDetailComponent } from './pages/config003-hamper-detail/config003-hamper-detail.component';
import { HamperButtons } from './pages/shared/directives/HamperButtons.directive';
import { SetClassSVGIcon } from './pages/shared/directives/SetClassSVGIcon.directive';
import { ImportImageComponent } from './pages/shared/components/import-image/import-image.component';
import { HamperBreadcrumb } from './pages/shared/directives/HamperBreadcrumb.directive';
import { FileSelected } from './pages/shared/directives/FileSelected.directive';
import { ProductListComponent } from './pages/shared/components/product-list/product-list.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { Necessary } from './pages/shared/directives/Necessary.directive';
import { Config002HamperDetailComponent } from './pages/config002-hamper-detail/config002-hamper-detail.component';
import { PricePipe } from './pages/shared/pipes/PricePipe.pipe';
import { Config002PartnerManagementComponent } from './pages/config002-partner-management/config002-partner-management.component';
import { HamperDrawerComponent } from './pages/shared/components/hamperdrawer/drawer.component';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { IconModule } from '@progress/kendo-angular-icons';
import { StatusColorPipe } from './pages/shared/pipes/StatusColorPipe';
import { DialogComponent } from './pages/shared/components/dialog/dialog.component';
import { DialogDirective } from './pages/shared/directives/dialog.directive';
import { Config005HamperDetailComponent } from './pages/config005-hamper-detail/config005-hamper-detail.component';

@NgModule({
  declarations: [
    InConfigComponent,
    Config001HamperDetailComponent,
    Config004HamperDetailComponent,
    ItemCompanyComponent,
    Config003HamperDetailComponent,
    HamperButtons,
    SetClassSVGIcon,
    ImportImageComponent,
    ProductListComponent,
    HamperBreadcrumb,
    FileSelected,
    ProductListComponent,
    Necessary,
    Config002HamperDetailComponent,
    PricePipe,
    Config002PartnerManagementComponent,
    HamperDrawerComponent,
    StatusColorPipe,
    DialogComponent,
    DialogDirective,
    Config005HamperDetailComponent,
  ],
  imports: [
    PConfigRoutingModule,
    InLayoutModule,
    InputsModule,
    LabelModule,
    ButtonModule,
    IconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

})
export class InConfigModule {}
