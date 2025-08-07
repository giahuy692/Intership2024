import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/purchase-data.service';
import { LayoutDefaultComponent } from '../in-layout/layout-default/layout-default.component';
import { SaleRestrictionComponent } from './shared/components/sale-restriction/sale-restriction.component';
import { AttributeProductComponent } from './shared/components/attribute-product/attribute-product.component';
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import { InputsModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent,
    AttributeProductComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    InPurchaseRoutingModule,
    HttpClientModule,
    DropDownsModule,
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
    ),
    InputsModule,
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent
  ],
})
export class InPurchaseModule { }
