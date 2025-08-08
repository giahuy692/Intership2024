import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PSaleRoutingModule } from './p-sale-routing.module';
import { PSaleComponent } from './p-sale.component';

@NgModule({
  declarations: [
    PSaleComponent,
  ],
  imports: [
    PLayoutModule,
    PSaleRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
})
export class PSaleModule { }
