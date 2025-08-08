import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PHriComponent } from './p-hri.component';

const routes: Routes = [
  {
    path: '',
    component: PHriComponent,
    children: [
      {
        path: '',
        component: PHriComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PHriRoutingModule {}
