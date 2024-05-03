import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { InLayoutModule } from '../in-layout/in-layout.module'; 
import { PConfigRoutingModule } from './in-config-routing.module';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
import { Config004HamperDetailComponent } from './pages/config004-hamper-detail/config004-hamper-detail.component';
import { ItemCompanyComponent } from './pages/shared/components/item-company/item-company.component';

@NgModule({
  declarations: [
    InConfigComponent,
    Config001HamperDetailComponent,
    Config004HamperDetailComponent,
    ItemCompanyComponent,
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
