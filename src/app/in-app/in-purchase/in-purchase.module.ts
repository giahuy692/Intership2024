import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent
  ],
  imports: [
    CommonModule,
    InPurchaseRoutingModule,
    FormsModule,
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent
  ],
})
export class InPurchaseModule { }
