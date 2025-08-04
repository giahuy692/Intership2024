import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/mua-hang',
    pathMatch: 'full'
  },
  
  {
    path: 'dashboard',
        loadChildren: () => 
        import('./in-app/in-layout/in-layout.module').then(m => m.InLayoutModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
