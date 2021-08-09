import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesoreriaMainPageComponent } from './tesoreria-main-page/tesoreria-main-page.component';
import { AutorizacionDepositosPageComponent } from './pages/autorizacion-depositos-page/autorizacion-depositos-page.component';
import { AutorizacionesShowComponent } from './components/autorizaciones-show/autorizaciones-show.component';
import { SolicitudesAutorizadasComponent } from './pages/solicitudes-autorizadas/solicitudes-autorizadas.component';
import { CobrosListComponent } from './cobros/containers/cobros-list/cobros-list.component';
import { CobroCreateComponent } from './cobros/containers/cobro-create/cobro-create.component';
import { CobroResolver } from './cobros/containers/cobros-list/cobro.resolver';
import { CobroShowComponent } from './cobros/containers/cobro-show/cobro-show.component';
import { SolicitudesTransitoComponent } from './pages/solicitudes-transito/solicitudes-transito.component';
import { SolicitudesCanceladasComponent } from './pages/solicitudes-canceladas/solicitudes-canceladas.component';

const routes: Routes = [
  {
    path: '',
    component: TesoreriaMainPageComponent,
    children: [
      {
        path: 'autorizaciones',
        component: AutorizacionDepositosPageComponent
      },
      {
        path: 'autorizaciones/show/:id',
        component: AutorizacionesShowComponent
      },
      { path: 'autorizados', component: SolicitudesAutorizadasComponent },
      { path: 'transito', component: SolicitudesTransitoComponent },
      { path: 'canceladas', component: SolicitudesCanceladasComponent },
      { path: 'cobros', component: CobrosListComponent },
      { path: 'cobros/create', component: CobroCreateComponent },
      {
        path: 'cobros/show/:id',
        component: CobroShowComponent,
        resolve: { cobro: CobroResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule {}
