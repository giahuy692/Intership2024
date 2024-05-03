import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
import { Config004HamperDetailComponent } from './pages/config004-hamper-detail/config004-hamper-detail.component';
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
        path: 'config004-hamper-detail',
        component: Config004HamperDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PConfigRoutingModule {}
