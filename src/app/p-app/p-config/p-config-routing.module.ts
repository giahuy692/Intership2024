import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PConfigComponent } from './p-config.component';


const routes: Routes = [
  {
    path: "",
    component: PConfigComponent,
    children: [
      {
        path: '',
        component: PConfigComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PConfigRoutingModule { }
