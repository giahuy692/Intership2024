import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule, NumericTextBoxModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { ButtonModule } from "@progress/kendo-angular-buttons";
import { NavigationModule } from "@progress/kendo-angular-navigation";
import { GridModule } from "@progress/kendo-angular-grid";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';

import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';
import { InfoPriceRequestComponent } from './shared/components/info-price-request/info-price-request.component';
import { InputKendoComponent } from './shared/components/input-kendo.component';
import { InputAreaKendoComponent } from './shared/components/inputArea-kendo.component';
import { SaleRestrictionComponent } from './shared/components/sale-restriction/sale-restriction.component';
<<<<<<<<< Temporary merge branch 1
import { AttributeProductComponent } from './shared/components/attribute-product/attribute-product.component';
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
=========
import { BreadcrumbKendoComponent } from './shared/components/breadcrumd-kendo.component';
import { NavPriceRequestDetailComponent } from './shared/components/nav-price-request-detail/nav-price-request-detailcomponent';
import { GridComponentComponent } from './shared/components/grid-component/grid-component.component';
>>>>>>>>> Temporary merge branch 2


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    InfoPriceRequestComponent,
    InputKendoComponent,
    InputAreaKendoComponent,
<<<<<<<<< Temporary merge branch 1
    SaleRestrictionComponent,
    AttributeProductComponent,
=========
    BreadcrumbKendoComponent,
    SaleRestrictionComponent,
    NavPriceRequestDetailComponent,
    GridComponentComponent,
>>>>>>>>> Temporary merge branch 2
  ],
  imports: [
    FormsModule,
    CommonModule,
    InPurchaseRoutingModule,
    InputsModule,
    LabelModule,
    DatePickerModule,
<<<<<<<<< Temporary merge branch 1
    DropDownsModule,
    IconsModule, 
    SVGIconModule,
    InputsModule,
=========
    ButtonModule,
    NavigationModule,
>>>>>>>>> Temporary merge branch 2
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent,
    InputKendoComponent,
  ],
})
export class InPurchaseModule { }
