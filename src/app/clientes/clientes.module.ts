import {ModuleWithProviders, NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteService } from './services/cliente.service';
import { ClienteFieldComponent } from './_components/cliente-field/cliente-field.component';
import { SharedModule } from 'app/_shared/shared.module';
import { ClienteSelectorComponent } from './_components/cliente-selector/cliente-selector.component';
import { reducers } from './reducers';
@NgModule({
  imports: [
    SharedModule,
    ClientesRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('clientes', reducers),
  ],

  declarations: [ClienteFieldComponent, ClienteSelectorComponent],
  exports: [ClienteFieldComponent, ClienteSelectorComponent]
})
export class ClientesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClientesModule,
      providers: [ ClienteService ]
    };
  }
}
