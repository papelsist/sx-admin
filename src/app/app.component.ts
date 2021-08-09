import { Component, OnInit  } from '@angular/core';
import {DateAdapter, MatIconRegistry, NativeDateAdapter} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngrx/store';

import * as fromRoot from './reducers';
import * as config from './_core/actions/configuration';

@Component({
  selector: 'sx-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements  OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private store: Store<fromRoot.State>
  ) {

    this.iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));


    this.iconRegistry.addSvgIconInNamespace('assets', 'siipapx',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipapx.svg'));


    this.iconRegistry.addSvgIconInNamespace('assets', 'paper',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/paper.svg'));


    // moment.locale('es');
    dateAdapter.setLocale('es_MX');
  }

  ngOnInit() {
    const app = {name: 'SIIPAX Admin', description: 'Adminstración y confuguración de SIIPAPX', image: '/assets/images/logo_papelsa.jpg'}
    this.store.dispatch(new config.SetApplication(app));
    this.store.dispatch(new config.SetModulo('SX Admin'));
  }
}
