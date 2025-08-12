import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, } from '@angular/core';
import { PMarketingRoutingModule } from './p-marketing-routing.module';
import { PMarketingComponent } from './p-marketing.component';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { MarGroupbannerWebpageComponent } from './shared/components/mar-groupbanner-webpage/mar-groupbanner-webpage.component';
import { MarPromotionInforComponent } from './shared/components/mar-discount-infor/mar-promotion-infor.component';
import { MarConditionApplyComponent } from './shared/components/mar-condition-apply/mar-condition-apply.component';
import { MarPromotionGiftRulesComponent } from './shared/components/mar-promotion-gift-rules/mar-promotion-gift-rules.component';

@NgModule({
  declarations: [
    PMarketingComponent,
    MarPromotionInforComponent,
    MarConditionApplyComponent,  
    MarGroupbannerWebpageComponent,
    MarPromotionGiftRulesComponent,
  ],
  imports: [
    PLayoutModule,
    PMarketingRoutingModule,
   ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PMarketingModule { }
