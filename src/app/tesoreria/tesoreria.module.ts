import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from 'app/_shared/shared.module';
import { TesoreriaRoutingModule } from './tesoreria-routing.module';
import { TesoreriaMainPageComponent } from './tesoreria-main-page/tesoreria-main-page.component';
import { AutorizacionDepositosPageComponent } from './pages/autorizacion-depositos-page/autorizacion-depositos-page.component';
import { SolicitudDeDepositoService } from './services/solicitudDeDepositoService';
import { AutorizacionesShowComponent } from './components/autorizaciones-show/autorizaciones-show.component';
import { SolicitudesAutorizadasComponent } from './pages/solicitudes-autorizadas/solicitudes-autorizadas.component';

import { BancosService } from 'app/tesoreria/services/bancos.service';
import { CobrosService } from 'app/tesoreria/services/cobros.service';
import { CobrosModule } from './cobros/cobros.module';
import { AutorizacionFormComponent } from './components/autorizacion-form/autorizacion-form.component';
import { SolicitudesTransitoComponent } from './pages/solicitudes-transito/solicitudes-transito.component';
import { SolicitudesCanceladasComponent } from './pages/solicitudes-canceladas/solicitudes-canceladas.component';
import { RepComisionTarjetasComponent } from './components/rep-comision-tarjetas/rep-comision-tarjetas.component';

@NgModule({
  imports: [SharedModule, TesoreriaRoutingModule, CobrosModule],
  declarations: [
    TesoreriaMainPageComponent,
    AutorizacionDepositosPageComponent,
    AutorizacionesShowComponent,
    SolicitudesAutorizadasComponent,
    AutorizacionFormComponent,
    SolicitudesTransitoComponent,
    SolicitudesCanceladasComponent,
    RepComisionTarjetasComponent
  ],
  entryComponents: [AutorizacionFormComponent, RepComisionTarjetasComponent]
})
export class TesoreriaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TesoreriaModule,
      providers: [SolicitudDeDepositoService, BancosService, CobrosService]
    };
  }
}
