import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/_shared/shared.module';
import { SolicitudesPageComponent } from './container/solicitudes-page/solicitudes-page.component';
import { SolicitudesCreatePageComponent } from './container/solicitudes-create-page/solicitudes-create-page.component';
import { SolicitudFormComponent } from './component/solicitud-form/solicitud-form.component';
import { ClientesModule } from 'app/clientes/clientes.module';
import { SolicitudEditComponent } from './container/solicitud-edit.component';
import { SolicitudResolver } from 'app/cxc/solicitudes/container/solicitud.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([]),
    ClientesModule,
    SharedModule,
  ],
  declarations: [
    SolicitudesPageComponent,
    SolicitudesCreatePageComponent,
    SolicitudFormComponent,
    SolicitudEditComponent
  ],
  providers: [
    SolicitudResolver
  ]
})
export class SolicitudesModule { }
