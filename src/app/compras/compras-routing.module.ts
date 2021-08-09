import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprasMainPageComponent } from './compras-main-page/compras-main-page.component';
import { PendientesPageComponent } from './ordenes/pendientes-page/pendientes-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasMainPageComponent,
    children: [
      { path: 'pendientes', component: PendientesPageComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
