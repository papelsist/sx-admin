import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CreditoPageComponent } from './credito-page/credito-page.component';
import { SharedModule } from 'app/_shared/shared.module';
import { ClientePageComponent } from './cliente-page/cliente-page.component';
import { NotificationsComponent } from './cliente-page/notifications/notifications.component';
import { ClienteThemeComponent } from './cliente-page/theme/clienteTheme.component';
import { ClienteNavigationComponent } from './cliente-page/navigation/cliente-navigation.component';
import { ClienteToolbarComponent } from './cliente-page/toolbar/cliente-toolbar.component';
import { ClienteInfoPageComponent } from './cliente-info-page/cliente-info-page.component';
import { ClientesModule } from 'app/clientes/clientes.module';
import { ClienteSelectorComponent } from './cliente-page/cliente-selector.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { ClienteCobrosComponent } from './cliente-cobros/cliente-cobros.component';

import {reducers } from './reducers';
import { ClienteCargosComponent } from './cliente-cargos/cliente-cargos.component';

@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('cartera', reducers),
    
  ],
  declarations: [CreditoPageComponent, ClientePageComponent,
    NotificationsComponent,
    ClienteThemeComponent,
    ClienteNavigationComponent,
    ClienteToolbarComponent,
    ClienteInfoPageComponent,
    ClienteSelectorComponent,
    EstadoCuentaComponent,
    ClienteCobrosComponent,
    ClienteCargosComponent
  ],
  entryComponents: [ClienteSelectorComponent]
})
export class CarteraModule { }
