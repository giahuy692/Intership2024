import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    //loadChildren: () => import('../app/in-app/in-layout/in-layout.module').then(m => m.InLayoutModule)
    loadChildren: () => import('../app/ha-app/ha-layout/ha-layout.module').then(m => m.HachiLayoutModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
