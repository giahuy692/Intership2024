import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DatePickerModule } from "@progress/kendo-angular-dateinputs";
import { ButtonModule } from "@progress/kendo-angular-buttons";
import { NavigationModule } from "@progress/kendo-angular-navigation";


import { InPurchaseRoutingModule } from './in-purchase-routing.module';
import { Pur001PriceRequestDetailComponent } from './pages/pur001-price-request-detail/pur001-price-request-detail.component';
import { Pur001ProductPriceRequestDetailComponent } from './pages/pur001-product-price-request-detail/pur001-product-price-request-detail.component';
import { InfoPriceRequestComponent } from './shared/components/info-price-request/info-price-request.component';
import { InputKendoComponent } from './shared/components/input-kendo.component';
import { DateKendoComponent } from './shared/components/date-kendo.component';
import { InputAreaKendoComponent } from './shared/components/inputArea-kendo.component';
import { InfoSuggestComponent } from './shared/components/info-suggest/info-suggest.component';
import { SaleRestrictionComponent } from './shared/components/sale-restriction/sale-restriction.component';
import { BreadcrumbKendoComponent } from './shared/components/breadcrumd-kendo.component';
import { NavPriceRequestDetailComponent } from './shared/components/nav-price-request-detail/nav-price-request-detailcomponent';
import { GridComponentComponent } from './shared/components/grid-component/grid-component.component';


@NgModule({
  declarations: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    InfoPriceRequestComponent,
    InputKendoComponent,
    DateKendoComponent,
    InputAreaKendoComponent,
    BreadcrumbKendoComponent,
    InfoSuggestComponent,
    SaleRestrictionComponent,
    NavPriceRequestDetailComponent,
    GridComponentComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    InPurchaseRoutingModule,
    InputsModule,
    LabelModule,
    DatePickerModule,
    ButtonModule,
    NavigationModule,
  ],
  exports: [
    Pur001PriceRequestDetailComponent,
    Pur001ProductPriceRequestDetailComponent,
    SaleRestrictionComponent,
  ],
})
export class InPurchaseModule { }
