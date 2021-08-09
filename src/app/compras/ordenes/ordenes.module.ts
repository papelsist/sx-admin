import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenesRoutingModule } from './ordenes-routing.module';
import { PendientesPageComponent } from './pendientes-page/pendientes-page.component';

@NgModule({
  imports: [
    CommonModule,
    OrdenesRoutingModule
  ],
  declarations: [PendientesPageComponent]
})
export class OrdenesModule { }
