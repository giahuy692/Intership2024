import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
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
import { BreadcrumbKendoComponent } from './shared/components/breadcrumd-kendo.component';
import { NavPriceRequestDetailComponent } from './shared/components/nav-price-request-detail/nav-price-request-detailcomponent';
import { GridKendoComponent } from './shared/components/grid-kendo.component';
import { ButtonKendoComponent } from './shared/components/button-kendo.component';
import { AttributeProductComponent } from './shared/components/attribute-product/attribute-product.component';
import { InfoSuggestComponent } from './shared/components/info-suggest/info-suggest.component';


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    InfoPriceRequestComponent,
    InputKendoComponent,
    InputAreaKendoComponent,
    BreadcrumbKendoComponent,
    InfoSuggestComponent,
    SaleRestrictionComponent,
    NavPriceRequestDetailComponent,
    GridKendoComponent,
    ButtonKendoComponent,
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
    ButtonsModule,
    NavigationModule,
    GridModule,
    DropDownsModule,
    IconsModule, 
    SVGIconModule,
    InputsModule,
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent,
  ],
})
export class InPurchaseModule { }
