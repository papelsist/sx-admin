import { Component, OnInit, Input } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-cliente-navigation',
  templateUrl: 'cliente-navigation.component.html'
})
export class ClienteNavigationComponent implements OnInit {

  @Input() miniNav: boolean = false;

  @Input() media: TdMediaService;

  navigation = [
    {path: 'info', title: 'Generales', icon: 'account_box'},
    {path: 'estadoDeCuenta', title: 'Estado de cuenta', icon: 'account_balance_wallet'},
    {path: 'cobros', title: 'Cobros', icon:'attach_money'},
    {path: 'cargos', title: 'Notas de cargo', icon:'keyboard_tab'},
    {path: '/cxc/credito', title: 'Cartera', icon: 'arrow_back'}
  ]

  constructor() { }

  ngOnInit() { }
}