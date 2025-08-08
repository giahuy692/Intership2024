import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PPortalRoutingModule } from './p-portal-routing.module';
import { PPortalComponent } from './p-portal.component';
import { PHriModule } from '../p-hri/p-hri.module';

@NgModule({
  declarations: [
    PPortalComponent,
  ],
  imports: [
    PPortalRoutingModule,
    PLayoutModule,
    PHriModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class PPortalModule { }
