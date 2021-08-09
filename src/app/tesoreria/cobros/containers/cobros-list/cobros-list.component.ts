import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { Cobro } from '../../../../_shared/models/cobro';
import { CobrosService } from '../../../services/cobros.service';

@Component({
  selector: 'sx-cobros-list',
  templateUrl: './cobros-list.component.html',
  styles: [],
  providers: [DatePipe, CurrencyPipe]
})
export class CobrosListComponent implements OnInit {

  cobros$: Observable<Cobro[]>;

  term = '';
  cartera;

  columns: ITdDataTableColumn[] = [
    { name: 'tipo', label: 'Tipo', numeric: true, width: 100},
    // { name: 'sucursal.nombre', label: 'Sucursal', numeric: true, width: 150},
    { name: 'fecha', label: 'Fecha', numeric: false,
      format: (date) => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90},
    {name: 'cliente.nombre', label: 'Cliente', sortable: true, numeric: false, nested: true},
    {name: 'formaDePago', label: 'F.Pago', sortable: true, numeric: false, nested: true , width: 140},
    {name: 'referencia', label: 'Referencia', sortable: true, numeric: false, nested: true, width: 120},
    {name: 'importe', label: 'Importe', sortable: true, numeric: false,
      format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    },
    {name: 'disponible', label: 'Disponible', sortable: true, numeric: false,
      format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    },
  ];

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute,
    private service: CobrosService
  ) {
    // this.cartera = this.route.snapshot.data.cartera;
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.cobros$ = this.service
      .cobrosMonetarios({term: this.term});
  }

  search(term) {
    this.term = term;
    this.load();
  }

  handleError(error) {
    console.error(error);
    return Observable.of([]);
  }



}



