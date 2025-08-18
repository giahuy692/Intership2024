import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PPurchaseComponent } from './p-purchase.component';
import { Pur010ProposedNewProductListComponent } from './pages/pur010-proposed-new-product-list/pur010-proposed-new-product-list.component';
import { Config009TaxListComponent } from './pages/config009-tax-list/config009-tax-list.component';

const routes: Routes = [
  {
    path: "",
    component: PPurchaseComponent,
    children: [
      {
        path: '',
        component: PPurchaseComponent,
      },
      {
        path: "pur010-proposed-new-product-list/:idCompany",
        component: Pur010ProposedNewProductListComponent,
      },
      {
        path: "config009-tax-list/:idCompany",
        component: Config009TaxListComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PPurchaseRoutingModule { }
