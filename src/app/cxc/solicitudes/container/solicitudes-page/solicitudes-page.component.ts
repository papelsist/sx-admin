import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

import { SolicitudDeDepositoService } from 'app/tesoreria/services/solicitudDeDepositoService';
import { SolicitudDeDeposito } from 'app/tesoreria/model/solicitudDeDeposito';

@Component({
  selector: 'sx-solicitudes-page',
  templateUrl: './solicitudes-page.component.html',
  styles: []
})
export class SolicitudesPageComponent implements OnInit {

  solicitudes$: Observable<SolicitudDeDeposito[]>;

  term = '';

  cartera = 'CRE';

  _pendientes = true;

  columns: ITdDataTableColumn[] = [
    {name: 'folio', label: 'Folio', sortable: true, numeric: true, width: 70},
    { name: 'fecha', label: 'Fecha', numeric: false,
      format: (date) => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90},
    { name: 'fechaDeposito', label: 'Fecha Dep', numeric: false,
      format: (date) => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90
    },
    {name: 'cliente.nombre', label: 'Cliente', sortable: true, numeric: false, nested: true},
    {
      name: 'total', label: 'Total', sortable: true, numeric: false,
      format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    },
    {
      name: 'comentario', label: 'Comentario', width: 200
    }
  ];

  constructor(
    private service: SolicitudDeDepositoService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.solicitudes$ = this.service
    .list({cartera: this.cartera, pendientes: this.pendientes, term: this.term});
  }

  search(term) {
    this.term = term;
    this.load();
  }

  handleError(error) {
    console.error(error);
    return Observable.of([]);
  }

  get pendientes() {
    return this._pendientes;
  }

  set pendientes(val) {
    this._pendientes = val;
    this.load();
  }

}
