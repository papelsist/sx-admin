import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'sx-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  navigation: Array<{icon: string, route: string, title: string}> = [
    {
      icon: 'home',
      route: '/',
      title: 'Inicio',
    },
    {
      icon: 'account_balance',
      route: '/tesoreria',
      title: 'Tesoreria'
    },
    {
      icon: 'list',
      route: '/cxc',
      title: 'CXC (Crédito)'
    },
    {
      icon: 'list',
      route: '/cxc/contado',
      title: 'CXC (Contado)'
    },
  ];

  usermenu: Array<{icon: string, route: string, title: string}> = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Cambio de usuario',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Cuenta',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Salir del sistema',
  },
  ];

  modulo$: Observable<string>;

  sidenavWidth = 300;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.modulo$ = this.store.select(fromRoot.getModulo);
  }

}
