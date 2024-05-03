import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InConfigComponent } from './in-config.component';
import { Config001HamperDetailComponent } from './pages/config001-hamper-detail/config001-hamper-detail.component';
const routes: Routes = [
  {
    path: "",
    component: InConfigComponent,
    children: [
      {
        path: '',
        component: InConfigComponent,
      },
      {
        path: "config001-hamper-detail",
        component: Config001HamperDetailComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PConfigRoutingModule { }
