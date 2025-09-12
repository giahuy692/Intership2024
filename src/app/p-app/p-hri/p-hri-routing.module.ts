import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PHriComponent } from './p-hri.component';
import { Hri006DepartmentListComponent } from './pages/hri006-department-list/hri006-department-list.component';

const routes: Routes = [
  {
    path: '',
    component: PHriComponent,
    children: [
      {
        path: '',
        component: PHriComponent,
      },
      {
        path: 'hri006-department-list/:idCompany',
        component: Hri006DepartmentListComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PHriRoutingModule {}
