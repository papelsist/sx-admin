import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasMainPageComponent } from './compras-main-page/compras-main-page.component';


@NgModule({
  imports: [
    SharedModule,
    OrdenesModule,
    ComprasRoutingModule
  ],
  declarations: [ComprasMainPageComponent]
})
export class ComprasModule { }
