import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PConfigComponent } from './p-config.component';
import { Config009EnterpriseCountryComponent } from './pages/config009-enterprise-country/config009-enterprise-country.component';


const routes: Routes = [
  {
    path: "",
    component: PConfigComponent,
    children: [
      {
        path: '',
        component: PConfigComponent,
      },
      {
        path: 'config009-enterprise-country/:idCompany',
        component: Config009EnterpriseCountryComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PConfigRoutingModule { }
