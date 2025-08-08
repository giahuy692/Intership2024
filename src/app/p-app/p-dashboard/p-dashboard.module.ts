import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PDashboardRoutingModule } from './p-dashboard-routing.module';
import { PDashboardComponent } from './p-dashboard.component';
import { PEcommerceModule } from '../p-ecommerce/p-ecommerce.module';

@NgModule({
  declarations: [
    PDashboardComponent,
  ],
  imports: [    
    PDashboardRoutingModule,
    PLayoutModule,
    PEcommerceModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class PDashboardModule { }
