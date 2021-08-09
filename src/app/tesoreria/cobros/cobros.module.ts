import { NgModule } from '@angular/core';

import { CobrosListComponent } from './containers/cobros-list/cobros-list.component';
import { SharedModule } from '../../_shared/shared.module';
import { RouterModule } from '@angular/router';
import { CobroCreateComponent } from './containers/cobro-create/cobro-create.component';
import { CobroFormComponent } from './components/cobro-form/cobro-form.component';
import { ClientesModule } from '../../clientes/clientes.module';
import { CobrochequeFormComponent } from './components/cobrocheque-form/cobrocheque-form.component';
import { CobroShowComponent } from './containers/cobro-show/cobro-show.component';
import { CobroResolver } from './containers/cobros-list/cobro.resolver';
import { CobrotarjetaFormComponent } from './components/cobrotarjeta-form/cobrotarjeta-form.component';

@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    RouterModule.forChild([])
  ],
  declarations: [CobrosListComponent, CobroCreateComponent, CobroFormComponent, CobrochequeFormComponent,
    CobroShowComponent, CobrotarjetaFormComponent],
  entryComponents: [CobrochequeFormComponent, CobrotarjetaFormComponent],
  providers: [CobroResolver]
})
export class CobrosModule { }
