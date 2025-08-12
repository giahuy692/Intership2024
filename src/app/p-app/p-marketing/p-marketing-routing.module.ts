import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PMarketingComponent } from './p-marketing.component';

const routes: Routes = [
  {
    path: '',
    component: PMarketingComponent,
    children: [
      {
        path: '',
        component: PMarketingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PMarketingRoutingModule {}
