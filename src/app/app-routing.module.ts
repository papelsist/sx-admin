import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './_core/home-page/home-page.component';
import { MainPageComponent } from './_core/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomePageComponent},
      { path: 'tesoreria', loadChildren: './tesoreria/tesoreria.module#TesoreriaModule'},
      { path: 'compras', loadChildren: './compras/compras.module#ComprasModule'},
      { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule'},
      { path: 'cxc', loadChildren: './cxc/cxc.module#CxcModule'}
      // { path: 'security', loadChildren: './security/security.module#SecurityModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
