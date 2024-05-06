import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { InLayoutModule } from '../in-layout/in-layout.module'; 
import { PConfigRoutingModule } from './in-config-routing.module';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
import { Config004HamperDetailComponent } from './pages/config004-hamper-detail/config004-hamper-detail.component';
import { ItemCompanyComponent } from './pages/shared/components/item-company/item-company.component';
import { Config003HamberDetailComponent } from './pages/config003-hamber-detail/config003-hamber-detail.component';
import { HamberButtons } from './pages/shared/directives/HamberButtons.directive';
import { SetClassSVGIcon } from './pages/shared/directives/SetClassSVGIcon.directive';
import { ImportImageComponent } from './pages/shared/components/import-image/import-image.component';
import { HamberBreadcrumb } from './pages/shared/directives/HamberBreadcrumb.directive';
import { FileSelected } from './pages/shared/directives/FileSelected.directive';
import { ProductListComponent } from './pages/shared/components/product-list/product-list.component';
import { Necessary } from './pages/shared/directives/Necessary.directive';
import { Config002HamperDetailComponent } from './pages/config002-hamper-detail/config002-hamper-detail.component';

@NgModule({
  declarations: [
    InConfigComponent,
    Config001HamperDetailComponent,
    Config004HamperDetailComponent,
    ItemCompanyComponent,
    Config003HamberDetailComponent,
    HamberButtons,
    SetClassSVGIcon,
    ImportImageComponent,
    HamberBreadcrumb,
    FileSelected,
    ProductListComponent,
    Necessary,
    Config002HamperDetailComponent
  ],
  imports: [
    PConfigRoutingModule,
    InLayoutModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class InConfigModule { }
