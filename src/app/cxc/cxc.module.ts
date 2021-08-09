import { NgModule } from '@angular/core';

import { SharedModule } from 'app/_shared/shared.module';
import { CxcRoutingModule } from './cxc-routing.module';
import { CxcPageComponent } from './cxc-page/cxc-page.component';
import { NotasModule } from './notas/notas.module';
import { NotascxcService } from 'app/cxc/services/notascxc.service';
import { CarteraModule } from 'app/cxc/cartera/cartera.module';
import { ClientePageResolver } from 'app/cxc/cartera/cliente-page/cliente-page.resolver';
import { SolicitudesModule } from 'app/cxc/solicitudes/solicitudes.module';
import { CobrosModule } from 'app/cxc/cobros/cobros.module';
import { NotasDeCargoModule } from 'app/cxc/notas-de-cargo/notas-de-cargo.module';
import { NotadecargoService } from 'app/cxc/services/notadecargo.service';


@NgModule({
  imports: [
    SharedModule,
    NotasModule,
    CarteraModule,
    CxcRoutingModule,
    SolicitudesModule,
    CobrosModule,
    NotasDeCargoModule
  ],
  declarations: [CxcPageComponent],
  providers: [NotascxcService, ClientePageResolver, NotadecargoService]
})
export class CxcModule { }
