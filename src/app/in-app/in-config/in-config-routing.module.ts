import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
import { Config004HamperDetailComponent } from './pages/config004-hamper-detail/config004-hamper-detail.component';
import { Config003HamberDetailComponent } from './pages/config003-hamber-detail/config003-hamber-detail.component';
import { Config002HamperDetailComponent } from './pages/config002-hamper-detail/config002-hamper-detail.component';
import { Config002PartnerManagementComponent } from './pages/config002-partner-management/config002-partner-management.component';
const routes: Routes = [
  {
    path: '',
    component: InConfigComponent,
    children: [
      {
        path: '',
        redirectTo: 'config001-hamper-detail',
        pathMatch: 'full',
      },
      {
        path: 'config001-hamper-detail',
        component: Config001HamperDetailComponent,
      },
      {
        path: 'config002-hamper-detail',
        component: Config002HamperDetailComponent,
      },
      {
        path: 'config003-hamper-detail',//Le Thanh Hoang
        component: Config003HamberDetailComponent,
      },
      {
        path: 'config004-hamper-detail', //Luong Van Phu
        component: Config004HamperDetailComponent,
      },
      {
        path: 'config002-partner-management', //for test purposes
        component: Config002PartnerManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PConfigRoutingModule {}
