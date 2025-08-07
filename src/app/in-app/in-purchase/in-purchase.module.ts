import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';
import { InputKendoComponent } from './shared/components/input-kendo.component';
import { InputAreaKendoComponent } from './shared/components/inputArea-kendo.component';
import { SaleRestrictionComponent } from './shared/components/sale-restriction/sale-restriction.component';
import { AttributeProductComponent } from './shared/components/attribute-product/attribute-product.component';
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    InputKendoComponent,
    InputAreaKendoComponent,
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
    DropDownsModule,
    InputsModule,
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent,
  ],
})
export class InPurchaseModule { }
