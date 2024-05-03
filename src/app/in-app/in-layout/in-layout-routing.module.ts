import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { In_LayOutHelper } from './services/in-layout.helper';
import { ModuleDataAdmin } from './in-sitemaps/menu.data-admin';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'config/config001-hamper-detail',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    children: In_LayOutHelper.GetRoutes(ModuleDataAdmin)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InLayoutRoutingModule { }