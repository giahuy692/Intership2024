import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { PurchaseQuoteP001Component } from './pages/purchase-quote-p001/purchase-quote-p001.component';
import { PurchaseDetailP001Component } from './pages/purchase-detail-p001/purchase-detail-p001.component';


@NgModule({
  declarations: [
    PurchaseQuoteP001Component,
    PurchaseDetailP001Component
  ],
  imports: [
    CommonModule,
    InPurchaseRoutingModule
  ],
  exports: [
    PurchaseQuoteP001Component,
    PurchaseDetailP001Component
  ],
})
export class InPurchaseModule { }
