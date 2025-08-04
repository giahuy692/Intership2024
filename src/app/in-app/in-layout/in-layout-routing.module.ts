import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: 'mua-hang',
        loadChildren: () =>
          import('../in-purchase/in-purchase.module').then(m => m.InPurchaseModule)
      },
      {
        path: '',
        redirectTo: 'mua-hang',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InLayoutRoutingModule { }