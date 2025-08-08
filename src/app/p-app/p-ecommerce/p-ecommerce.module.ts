import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PEcommerceRoutingModule } from './p-ecommerce-routing.module';
import { PEcommerceComponent } from './p-ecommerce.component';
import { AssignCartStaffDialogComponent } from './shared/components/assign-cart-staff-dialog/assign-cart-staff-dialog.component';
import { AssignOnlineUserDialogComponent } from './shared/components/assign-online-user-dialog/assign-online-user-dialog.component';
import { AssignWhpickupDialogComponent } from './shared/components/assign-whpickup-dialog/assign-whpickup-dialog.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    PEcommerceComponent,
    AssignCartStaffDialogComponent,
    AssignOnlineUserDialogComponent,
    AssignWhpickupDialogComponent,
    DashboardComponent,
  ],
  imports: [
    PEcommerceRoutingModule,
    PLayoutModule,
  ],
  exports: [
    DashboardComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class PEcommerceModule { }
