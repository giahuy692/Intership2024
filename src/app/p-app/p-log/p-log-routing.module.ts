import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PLogComponent } from './p-log.component';

const routes: Routes = [
  {
    path: "",
    component: PLogComponent,
    children: [
      {
        path: "",
        component: PLogComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PLogRoutingModule { }
