import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PSaleComponent } from './p-sale.component';

const routes: Routes = [
  {
    path: "",
    component: PSaleComponent,
    children: [
      {
        path: "",
        component: PSaleComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PSaleRoutingModule { }
