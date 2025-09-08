import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { PConfigComponent } from './p-config.component';
import { PConfigRoutingModule } from './p-config-routing.module';

// Component 
import { ConfigProductInfoComponent } from './shared/components/config-product-info/config-product-info.component';
import { ConfigProductAttributeComponent } from './shared/components/config-product-attribute/config-product-attribute.component';
import { ConfigProductPackageInfoComponent } from './shared/components/config-product-package-info/config-product-package-info.component';
import { ConfigProductOtherInfoComponent } from './shared/components/config-product-other-info/config-product-other-info.component';
import { ConfigProductListComponent } from './shared/components/config-product-list/config-product-list.component';
import { ConfigAppliedCompanyComponent } from './shared/components/config-applied-company/config-applied-company.component';
import { ConfigPurchaseAttributeComponent } from './shared/components/config-purchase-attribute/config-purchase-attribute.component';
import { ConfigSalesAttributeComponent } from './shared/components/config-sales-attribute/config-sales-attribute.component';
import { ConfigProductLabelComponent } from './shared/components/config-product-label/config-product-label.component';
import { ConfigWebDisplayComponent } from './shared/components/config-web-display/config-web-display.component';
import { ConfigHistoryPopupComponent } from './shared/components/config-history-popup/config-history-popup.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Config009EnterpriseCountryComponent } from './pages/config009-enterprise-country/config009-enterprise-country.component';
import { Config010EnterpriseAdminunitComponent } from './pages/config010-enterprise-adminunit/config010-enterprise-adminunit.component';
import { Config011EnterprisePackingUnitComponent } from './pages/config011-enterprise-packingunit/config011-enterprise-packingunit.component';
import { Config012EnterpriseStickerComponent } from './pages/config012-enterprise-sticker/config012-enterprise-sticker.component';



@NgModule({
  declarations: [
    PConfigComponent,
    ConfigProductInfoComponent,
    ConfigProductAttributeComponent,
    ConfigProductPackageInfoComponent,
    ConfigProductOtherInfoComponent,
    ConfigProductListComponent,
    ConfigAppliedCompanyComponent,
    ConfigPurchaseAttributeComponent,
    ConfigSalesAttributeComponent,
    ConfigProductLabelComponent,
    ConfigWebDisplayComponent,
    ConfigHistoryPopupComponent,
    Config009EnterpriseCountryComponent,
    Config010EnterpriseAdminunitComponent,
    Config011EnterprisePackingUnitComponent,
    Config012EnterpriseStickerComponent,
  ],
  imports: [
    PConfigRoutingModule,
    PLayoutModule,
    CommonModule,
    HttpClientModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [
    ConfigProductInfoComponent,
    ConfigProductAttributeComponent,
    ConfigPurchaseAttributeComponent,
    ConfigSalesAttributeComponent,
    ConfigWebDisplayComponent,
  ]
})
export class PConfigModule { 
}
