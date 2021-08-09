import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

import { NotaDeCargo } from 'app/_shared/models/notaDeCargo';
import { NotadecargoService } from '../../../services/notadecargo.service';

@Component({
  selector: 'sx-notas-de-cargo-page',
  templateUrl: './notas-de-cargo-page.component.html',
  styles: []
})
export class NotasDeCargoPageComponent implements OnInit {

  cargos$: Observable<NotaDeCargo[]>;

  term = '';

  cartera = '';

  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', numeric: true, width: 100},
    { name: 'fecha', label: 'Fecha', numeric: false,
      format: (date) => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90},
    {name: 'cliente.nombre', label: 'Cliente', sortable: true, numeric: false, nested: true},
    // {name: 'comentario', label: 'Comentario', sortable: false, numeric: false, width: 200},
    {name: 'cfdi', label: 'CFDI', numeric: false, sortable: false, width: 70},
    {
      name: 'total', label: 'Total', sortable: true, numeric: false,
      format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    },
    // {
    //   name: 'cobros', label: 'Cobros', sortable: true, numeric: false,
    //   format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    // },
    // {
    //   name: 'saldo', label: 'Saldo', sortable: true, numeric: false,
    //   format: (value) => this.currencyPipe.transform(value, 'USD'), width: 100
    // },
  ];

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private route: ActivatedRoute,
    private service: NotadecargoService
  ) {
    this.cartera = this.route.snapshot.data.cartera;
  }

  ngOnInit() {
    this.load();
  }


  load() {
    this.cargos$ = this.service
      .list({cartera: this.cartera, term: this.term});
  }

  search(term) {
    this.load();
  }

  handleError(error) {
    console.error(error);
    return Observable.of([]);
  }



}


