import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { NotascxcPageComponent } from './notascxc-page/notascxc-page.component';
import { SharedModule } from 'app/_shared/shared.module';
import { NotacxcCreatePageComponent } from './notacxc-create-page/notacxc-create-page.component';
import { CxcnotasGridComponent } from './_components/cxcnotas-grid/cxcnotas-grid.component';
import { CxcnotaFormComponent } from './_components/cxcnota-form/cxcnota-form.component';
import { ClientesModule } from 'app/clientes/clientes.module';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { SelectorDeRmdComponent } from './_components/selector-de-rmd/selector-de-rmd.component';
import { CxcfacturasGridComponent } from './_components/cxcnota-form/cxcfacturas-grid/cxcfacturas-grid.component';
import { RmdPanelComponent } from './_components/cxcnota-form/rmd-panel/rmd-panel.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { BonificacionesComponent } from './bonificaciones/bonificaciones.component';
import { NotaViewComponent } from './_components/nota-view/nota-view.component';
import { BonificacionFormComponent } from './_components/bonificacion-form/bonificacion-form.component';
import { FacturasSelectorComponent } from './_components/facturas-selector/facturas-selector.component';
import { FacturasSelectorBtnComponent } from './_components/facturas-selector/facturas-selector-btn/facturas-selector-btn.component';
import { BonificacionesCreateComponent } from './bonificaciones/bonificaciones-create.component';
import { BonificacionPartidasComponent } from './_components/bonificacion-form/bonificacion-partidas/bonificacion-partidas.component';


@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    RouterModule.forChild([]),
    CurrencyMaskModule,
  ],
  declarations: [
    NotascxcPageComponent,
    NotacxcCreatePageComponent,
    CxcnotasGridComponent,
    CxcnotaFormComponent,
    SelectorDeRmdComponent,
    CxcfacturasGridComponent,
    RmdPanelComponent,
    DevolucionesComponent,
    BonificacionesComponent,
    NotaViewComponent,
    BonificacionFormComponent,
    FacturasSelectorComponent,
    FacturasSelectorBtnComponent,
    BonificacionesCreateComponent,
    BonificacionPartidasComponent,
  ],
  exports: [FacturasSelectorComponent, FacturasSelectorBtnComponent],
  entryComponents: [SelectorDeRmdComponent, FacturasSelectorComponent],
  providers: [DatePipe, CurrencyPipe]
})
export class NotasModule { }
