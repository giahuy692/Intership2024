import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PPurchaseComponent } from './p-purchase.component';

const routes: Routes = [
  {
    path: "",
    component: PPurchaseComponent,
    children: [
      {
        path: '',
        component: PPurchaseComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PPurchaseRoutingModule { }
