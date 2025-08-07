import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';
import { InfoQuoteComponent } from './shared/components/info-quote/info-quote.component';
import { InputKendoComponent } from './shared/components/input-kendo.component';
import { DateKendoComponent } from './shared/components/date-kendo.component';
import { InputAreaKendoComponent } from './shared/components/inputArea-kendo.component';
import { InfoSuggestComponent } from './shared/components/info-suggest/info-suggest.component';
import { SaleRestrictionComponent } from './shared/components/sale-restriction/sale-restriction.component';
import { AttributeProductComponent } from './shared/components/attribute-product/attribute-product.component';


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    InfoQuoteComponent,
    InputKendoComponent,
    DateKendoComponent,
    InputAreaKendoComponent,
    InfoSuggestComponent,
    SaleRestrictionComponent,
    AttributeProductComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    InPurchaseRoutingModule,
    InputsModule,
    LabelModule,
    DatePickerModule,
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent,
  ],
})
export class InPurchaseModule { }
