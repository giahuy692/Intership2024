import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from './in-app/in-layout/layout-default/layout-default.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: 'purchase',
        loadChildren: () =>
          import('./in-app/in-purchase/in-purchase.module').then(m => m.InPurchaseModule)
      },
      { path: '', redirectTo: 'purchase', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
