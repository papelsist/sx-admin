import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TdDataTableColumnComponent } from '@covalent/core/data-table/data-table-column/data-table-column.component';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NotascxcService } from 'app/cxc/services/notascxc.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'sx-selector-de-rmd',
  templateUrl: './selector-de-rmd.component.html',
  styles: []
})
export class SelectorDeRmdComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    {name: 'sucursal.nombre', label: 'Sucursal', numeric: false, nested: true, width: 70},
    {name: 'documento', label: 'RMD', numeric: true, width: 70},
    {name: 'fecha', label: 'Fecha', width: 100, format: (date) => this.datePipe.transform(date, 'dd/MM/yyyy')},
    {name: 'factura', label: 'Factura', numeric: true, width: 100},
    {name: 'total', label: 'Total', numeric: true, format: (value)=> this.currencyPipe.transform(value, 'USD')}
  ];

  rows = <any>[];

  selectedRows: any[] = [];
  
  control = new FormControl();

  procesando = false;

  cliente: any;

  constructor(
    public dialogRef: MatDialogRef<SelectorDeRmdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: NotascxcService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) { 
    this.cliente = data.cliente
  }

  ngOnInit() {
    this.control.valueChanges
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap( term => 
      this.service.buscarRmd({term: term, cliente: this.cliente.id})
      .do( () =>  this.procesando = true)
      .catch( error => Observable.of([]))
      .finally( () => this.procesando = false)
    )
    .subscribe( res => this.rows = res);
  }

  close() {
    this.dialogRef.close('close');
  }

}
