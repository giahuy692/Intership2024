import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseQuoteP001Component } from './pages/purchase-quote-p001/purchase-quote-p001.component';
import { PurchaseDetailP001Component } from './pages/purchase-detail-p001/purchase-detail-p001.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseQuoteP001Component
  },
  {
    path: 'purchase-detail-p001',
    component: PurchaseDetailP001Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InPurchaseRoutingModule { }
