import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { Cobro } from 'app/_shared/models/cobro';
import { CobrosService } from 'app/tesoreria/services/cobros.service';
import { PagoUtils } from 'app/_shared/utils/pagoUtils.service';

@Component({
  selector: 'sx-cobros-page',
  templateUrl: './cobros-page.component.html',
  styles: []
})
export class CobrosPageComponent implements OnInit {

  cobros$: Observable<Cobro[]>;

  term = '';

  cartera = '';

  _pendientes = true;

  columns: ITdDataTableColumn[] = [
    { name: 'fecha', label: 'Fecha', numeric: false,
      format: (date) => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90},
    {name: 'cliente.nombre', label: 'Cliente', sortable: true, numeric: false, nested: true},
    // {name: 'formaDePago', label: 'F. Pago', sortable: true, numeric: false, width: 120},
    {
      name: 'importe', label: 'Importe', sortable: true,numeric: false,
      format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    },
    // {
    //   name: 'aplicado', label: 'Aplicado', sortable: true,numeric: false,
    //   format: (value)=> this.currencyPipe.transform(value, 'USD'), width: 100
    // },
    {
      name: 'disponible', label: 'Disponible', sortable: true,numeric: false,
      format: (value)=> this.currencyPipe.transform(value, 'USD'), width: 100
    },
    {
      name: 'comentario', label: 'Comentario', width: 300
    },
    // {name: 'referencia', label: 'Ref', sortable: true, numeric: true, width: 90},

  ];

  constructor(
    private service: CobrosService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute,
    private pagoUtils: PagoUtils
  ) {
    this.cartera = this.route.snapshot.data.cartera;
  }

  ngOnInit() {
    this.load();
  }


  load() {
    this.cobros$ = this.service.list({cartera: this.cartera, pendientes: this.pendientes, term: this.term});
  }

  search(term) {
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

  getFormaDePago(cobro: Cobro){
    return this.pagoUtils.slimFormaDePago(cobro.formaDePago);
  }

}

