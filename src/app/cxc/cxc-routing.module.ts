import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CxcPageComponent } from './cxc-page/cxc-page.component';
import { NotascxcPageComponent } from './notas/notascxc-page/notascxc-page.component';
import { NotacxcCreatePageComponent } from 'app/cxc/notas/notacxc-create-page/notacxc-create-page.component';
import { DevolucionesComponent } from 'app/cxc/notas/devoluciones/devoluciones.component';
import { BonificacionesComponent } from 'app/cxc/notas/bonificaciones/bonificaciones.component';
import { CreditoPageComponent } from 'app/cxc/cartera/credito-page/credito-page.component';
import { NotaViewComponent } from 'app/cxc/notas/_components/nota-view/nota-view.component';
import { BonificacionesCreateComponent } from 'app/cxc/notas/bonificaciones/bonificaciones-create.component';
import { ClientePageComponent } from 'app/cxc/cartera/cliente-page/cliente-page.component';
import { ClientePageResolver } from 'app/cxc/cartera/cliente-page/cliente-page.resolver';
import { ClienteInfoPageComponent } from 'app/cxc/cartera/cliente-info-page/cliente-info-page.component';
import { EstadoCuentaComponent } from 'app/cxc/cartera/estado-cuenta/estado-cuenta.component';
import { ClienteCobrosComponent } from 'app/cxc/cartera/cliente-cobros/cliente-cobros.component';
import { SolicitudesPageComponent } from 'app/cxc/solicitudes/container/solicitudes-page/solicitudes-page.component';
import { SolicitudesCreatePageComponent } from 'app/cxc/solicitudes/container/solicitudes-create-page/solicitudes-create-page.component';
import { SolicitudEditComponent } from 'app/cxc/solicitudes/container/solicitud-edit.component';
import { SolicitudResolver } from 'app/cxc/solicitudes/container/solicitud.resolver';
import { CobrosPageComponent } from 'app/cxc/cobros/container/cobros-page/cobros-page.component';
import { ClienteCargosComponent } from 'app/cxc/cartera/cliente-cargos/cliente-cargos.component';
import { NotasDeCargoPageComponent } from 'app/cxc/notas-de-cargo/container/notas-de-cargo-page/notas-de-cargo-page.component';
import { NotaDeCargoCreateComponent } from 'app/cxc/notas-de-cargo/container/nota-de-cargo-create.component';
import { NotaDeCargoEditComponent } from './notas-de-cargo/container/nota-de-cargo-edit.component';
import { NotadecargoResolver } from './notas-de-cargo/container/notadecargo.resolver';
import { NotaDeCargoShowComponent } from './notas-de-cargo/container/nota-de-cargo-show/nota-de-cargo-show.component';
import { AplicacionPageComponent } from './cobros/_containers/aplicacion-page/aplicacion-page.component';

const routes: Routes = [
  {
    path: '',
    component: CxcPageComponent,
    data: { cartera: { tipo: 'CRE', descripcion: 'Crédito' } },
    children: [
      {
        path: 'notas',
        component: NotascxcPageComponent,
        children: [
          { path: 'devoluciones', component: DevolucionesComponent },
          { path: 'devoluciones/show/:id', component: NotaViewComponent },
          { path: 'bonificaciones', component: BonificacionesComponent },
          {
            path: 'bonificaciones/create',
            component: BonificacionesCreateComponent,
            data: { tipoCartera: 'CRE' }
          },
          {
            path: 'bonificaciones/show/:id',
            component: NotaViewComponent
          }
        ]
      },
      {
        path: 'notas/create',
        component: NotacxcCreatePageComponent,
        data: { tipoCartera: 'CRE' }
      },
      {
        path: 'credito',
        component: CreditoPageComponent
      },
      {
        path: 'solicitudes',
        component: SolicitudesPageComponent
      },
      {
        path: 'solicitudes/create',
        component: SolicitudesCreatePageComponent,
        data: { cartera: 'CRE' }
      },
      {
        path: 'solicitudes/edit/:id',
        component: SolicitudEditComponent,
        resolve: { solicitud: SolicitudResolver }
      },
      {
        path: 'cobros',
        component: CobrosPageComponent,
        data: { cartera: 'CRE' }
      },
      {
        path: 'cobros/edit/:id',
        component: AplicacionPageComponent
      },
      {
        path: 'notasDeCargo',
        component: NotasDeCargoPageComponent,
        data: { cartera: 'CRE' }
      },
      {
        path: 'notasDeCargo/create',
        component: NotaDeCargoCreateComponent,
        data: { cartera: 'CRE' }
      },
      {
        path: 'notasDeCargo/edit/:id',
        component: NotaDeCargoEditComponent,
        resolve: { nota: NotadecargoResolver }
      },
      {
        path: 'notasDeCargo/show/:id',
        component: NotaDeCargoShowComponent,
        resolve: { nota: NotadecargoResolver }
      }
    ]
  },

  {
    path: 'contado',
    component: CxcPageComponent,
    data: { cartera: { tipo: 'CON', descripcion: 'Contado' } },
    children: [
      {
        path: 'notas',
        component: NotascxcPageComponent,
        children: [
          { path: 'devoluciones', component: DevolucionesComponent },
          { path: 'devoluciones/show/:id', component: NotaViewComponent },
          { path: 'bonificaciones', component: BonificacionesComponent },
          {
            path: 'bonificaciones/create',
            component: BonificacionesCreateComponent,
            data: { tipoCartera: 'CON' }
          },
          {
            path: 'bonificaciones/show/:id',
            component: NotaViewComponent
          }
        ]
      }
    ]
  },

  {
    path: 'cliente/:id',
    component: ClientePageComponent,
    resolve: { cliente: ClientePageResolver },
    children: [
      { path: '', redirectTo: 'info' },
      { path: 'info', component: ClienteInfoPageComponent },
      { path: 'estadoDeCuenta', component: EstadoCuentaComponent },
      { path: 'cobros', component: ClienteCobrosComponent },
      {
        path: 'cargos',
        component: ClienteCargosComponent,
        data: { cartera: 'CRE' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CxcRoutingModule {}
