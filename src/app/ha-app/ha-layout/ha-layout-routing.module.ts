import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { PurchaseDetailP001Component } from '../ha-purchase/pages/purchase-detail-p001/purchase-detail-p001.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: 'mua-hang', component: PurchaseDetailP001Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HachiLayoutRoutingModule { }