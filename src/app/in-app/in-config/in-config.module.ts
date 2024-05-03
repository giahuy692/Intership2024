import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { InLayoutModule } from '../in-layout/in-layout.module'; 
import { PConfigRoutingModule } from './in-config-routing.module';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
import { Config003HamberDetailComponent } from './pages/config003-hamber-detail/config003-hamber-detail.component';
import { HamberButtons } from './pages/shared/directives/HamberButtons.directive';
import { SetClassSVGIcon } from './pages/shared/directives/SetClassSVGIcon.directive';

@NgModule({
  declarations: [
    InConfigComponent,
    Config001HamperDetailComponent,
    Config003HamberDetailComponent,
    HamberButtons,
    SetClassSVGIcon
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
