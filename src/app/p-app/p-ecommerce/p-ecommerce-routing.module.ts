import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PEcommerceComponent } from './p-ecommerce.component';

const routes: Routes = [
  {
    path: "",
    component: PEcommerceComponent,
    children: [
      {
        path: '',
        component: PEcommerceComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PEcommerceRoutingModule { }
