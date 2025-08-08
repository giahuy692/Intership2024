import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PDashboardComponent } from './p-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: PDashboardComponent,
    children: [
      {
        path: '',
        component: PDashboardComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PDashboardRoutingModule { }
