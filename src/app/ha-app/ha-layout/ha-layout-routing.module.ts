import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'config/config001-hamper-detail',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutDefaultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HachiLayoutRoutingModule { }