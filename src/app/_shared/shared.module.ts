import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './_material/material.module';
import { CovalentModule } from './_covalent/covalent.module';
import {RouterModule} from '@angular/router';
import { PageFooterComponent } from './pages/page-footer/page-footer.component';
import { SxNavListComponent } from './layout/sx-nav-list/sx-nav-list.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { ToUpperCaseDirective } from './directives/to-upper-case.directive';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { BancoFieldComponent } from './components/banco-field/banco-field.component';
import { CuentaBancoFieldComponent } from './components/cuenta-banco-field/cuenta-banco-field.component';
import { PagoUtils } from 'app/_shared/utils/pagoUtils.service';
import { PeriodoSelectorComponent } from './components/periodo-selector/periodo-selector.component';
import { PeriodoUtilsService } from 'app/_shared/utils/periodo-utils.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([]),
    MaterialModule,
    CovalentModule,
  ],
  declarations: [PageFooterComponent, SxNavListComponent, OnlyNumbersDirective, ToUpperCaseDirective, ThemeSelectorComponent, BancoFieldComponent, CuentaBancoFieldComponent, PeriodoSelectorComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CovalentModule,
    PageFooterComponent,
    SxNavListComponent,
    OnlyNumbersDirective,
    ToUpperCaseDirective,
    BancoFieldComponent,
    CuentaBancoFieldComponent,
    PeriodoSelectorComponent,
  ],
  entryComponents: [
    PeriodoSelectorComponent
  ]
})
export class SharedModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ PagoUtils, PeriodoUtilsService ]
    };
  }
}
