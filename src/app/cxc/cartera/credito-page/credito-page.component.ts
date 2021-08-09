import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Cliente } from 'app/_shared/models';
import { ClienteService } from 'app/clientes/services/cliente.service';

@Component({
  selector: 'sx-credito-page',
  templateUrl: './credito-page.component.html',
  styles: [`
    mat-card2 {
      height: 500px;
    }
  `]
})
export class CreditoPageComponent implements OnInit, OnDestroy {

  clientes$: Observable<Cliente[]>;

  term = '';

  cartera = 'CRE'

  columns: ITdDataTableColumn[] = [
    {name: 'nombre', label: 'Nombre',sortable: true, numeric: false},
    {name: 'rfc', label: 'RFC',sortable: true, numeric: false, width: {min:100, max:150}},
    // {name: 'clave', label: 'Clave',sortable: true, numeric: false, width: {min:100, max:150}},
    {
      name: 'credito.lineaDeCredito', label: 'Crédito',sortable: true,numeric: false,
      format: (value)=> this.currencyPipe.transform(value, 'USD'), width: {min:100, max:150}
    },
    {
      name: 'credito.saldo', label: 'Saldo',sortable: true,numeric: false,
      format: (value)=> this.currencyPipe.transform(value, 'USD'), width: {min:150, max:250}
    },
    {name: 'credito.atrasoMaximo', label: 'Atraso M',sortable: true, numeric: false, width: {min:100, max:150}},
    
  ];

  constructor(
    private service: ClienteService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) { 
  }

  ngOnInit() {
    const config = JSON.parse(localStorage.getItem('cartera.credito'));
    if (config.term) {
      this.term = config.term;
    } 
    this.load();
  }

  ngOnDestroy() {
    localStorage.setItem('cartera.credito', JSON.stringify({term: this.term}));
  }

  load() {
    this.clientes$ = this.service
      .busarClientes({term: this.term});
  }

  search(term) {
    this.load();
  }

  handleError(error) {
    console.error(error);
    return Observable.of([]);
  }

}
