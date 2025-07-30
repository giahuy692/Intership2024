import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from './ha-app/ha-layout/layout-default/layout-default.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/mua-hang',
    pathMatch: 'full'
  },
  
  {
    path: 'dashboard',
        loadChildren: () => 
        import('./ha-app/ha-layout/ha-layout.module').then(m => m.HachiLayoutModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
