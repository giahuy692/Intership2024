import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PPurchaseComponent } from './p-purchase.component';
import { PPurchaseRoutingModule } from './p-purchase-routing.module';
import { PurMenuSupplierInfoComponent } from './shared/components/pur-menu-supplier-info/pur-menu-supplier-info.component';
import { PConfigModule } from '../p-config/p-config.module';

@NgModule({
  declarations: [
    PPurchaseComponent,
    PurMenuSupplierInfoComponent,
  ],
  imports: [
    PLayoutModule,
    PPurchaseRoutingModule,
    PConfigModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: []
})
export class PPurchaseModule { }
