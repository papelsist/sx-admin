import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/_shared/shared.module';
import { NotasDeCargoPageComponent } from './container/notas-de-cargo-page/notas-de-cargo-page.component';
import { NotaDeCargoCreateComponent } from './container/nota-de-cargo-create.component';
import { NotadecargoFormComponent } from './components/notadecargo-form/notadecargo-form.component';
import { ClientesModule } from 'app/clientes/clientes.module';
import { NotasdecargoPartidasComponent } from './components/notasdecargo-partidas/notasdecargo-partidas.component';
import { NotaDeCargoEditComponent } from './container/nota-de-cargo-edit.component';
import { NotadecargoResolver } from './container/notadecargo.resolver';
import { NotasModule } from '../notas/notas.module';
import { UsoCfdiComponent } from './components/uso-cfdi/uso-cfdi.component';
import { FormaDePagoComponent } from './components/forma-de-pago/forma-de-pago.component';
import { NotaDeCargoShowComponent } from './container/nota-de-cargo-show/nota-de-cargo-show.component';



@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    NotasModule,
    RouterModule
  ],
  declarations: [NotasDeCargoPageComponent, NotaDeCargoCreateComponent,
    NotadecargoFormComponent, NotasdecargoPartidasComponent, NotaDeCargoEditComponent,
  UsoCfdiComponent, FormaDePagoComponent, NotaDeCargoShowComponent],
  providers: [NotadecargoResolver]
})
export class NotasDeCargoModule { }
