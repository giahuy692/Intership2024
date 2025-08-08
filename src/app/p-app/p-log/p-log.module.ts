import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PLogComponent } from './p-log.component';
import { PLogRoutingModule } from './p-log-routing.module';
@NgModule({
  declarations: [
    PLogComponent,
  ],
  imports: [
    PLayoutModule,
    PLogRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
})
export class PLogModule { }
