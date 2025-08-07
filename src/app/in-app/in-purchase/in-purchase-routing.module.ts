import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';

const routes: Routes = [
  {
    path: '',
    component: Pur001PriceRequestDetailComponent
  },
  {
    path: 'pur001-product-price-request-detail',
    component: Pur001ProductPriceRequestDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InPurchaseRoutingModule { }
