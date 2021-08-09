import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';

import { SharedModule } from '../_shared/shared.module';
import { MainPageComponent } from './main-page/main-page.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [HomePageComponent, MainPageComponent, CompanyCardComponent]
})
export class CoreModule { }
