import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PPurchaseComponent } from './p-purchase.component';
import { PPurchaseRoutingModule } from './p-purchase-routing.module';
import { PurMenuSupplierInfoComponent } from './shared/components/pur-menu-supplier-info/pur-menu-supplier-info.component';
import { PConfigModule } from '../p-config/p-config.module';
import { Config009TaxListComponent } from './pages/config009-tax-list/config009-tax-list.component';
import { Pur010ProposedNewProductListComponent } from './pages/pur010-proposed-new-product-list/pur010-proposed-new-product-list.component';
import { CommonModule } from '@angular/common'; 

@NgModule({
  declarations: [
    PPurchaseComponent,
    PurMenuSupplierInfoComponent,
    Config009TaxListComponent,
    Pur010ProposedNewProductListComponent,
  ],
  imports: [
    PLayoutModule,
    PPurchaseRoutingModule,
    PConfigModule,
    CommonModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: []
})
export class PPurchaseModule { }
