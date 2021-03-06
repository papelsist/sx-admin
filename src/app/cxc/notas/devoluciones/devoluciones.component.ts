import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {
  ITdDataTableColumn,
  TdDataTableSortingOrder
} from '@covalent/core/data-table/data-table.component';
import { ITdDataTableSortChangeEvent } from '@covalent/core/data-table/data-table-column/data-table-column.component';
import { TdDataTableService } from '@covalent/core/data-table/services/data-table.service';
import { IPageChangeEvent } from '@covalent/core/paging/paging-bar.component';
import { NotascxcService } from 'app/cxc/services/notascxc.service';
import { TdDialogService } from '@covalent/core';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';

@Component({
  selector: 'sx-devoluciones',
  templateUrl: './devoluciones.component.html',
  styles: []
})
export class DevolucionesComponent implements OnInit {
  procesando = false;

  private _pendientes = true;

  cartera;

  term = '';

  columns: ITdDataTableColumn[] = [
    {
      name: 'documento',
      label: 'RMD',
      sortable: true,
      numeric: true,
      width: 70
    },
    {
      name: 'nota',
      label: 'Nota',
      sortable: true,
      nested: true,
      hidden: !this.pendientes,
      numeric: true,
      width: 150
    },
    {
      name: 'fecha',
      label: 'Fecha',
      width: 100,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'sucursal.nombre',
      label: 'Sucursal',
      numeric: false,
      nested: true,
      width: 150
    },
    {
      name: 'venta.cliente.nombre',
      label: 'Cliente',
      numeric: false,
      width: 300
    },
    { name: 'factura', label: 'Factura', numeric: true, width: 150 },
    {
      name: 'cobro.fecha',
      label: 'Atendida',
      nested: true,
      numeric: false,
      hidden: true,
      width: 100,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'total',
      label: 'Total',
      numeric: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    }
  ];

  data: any[] = [];
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 20;
  sortBy: string = 'documento';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  selectable = true;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService,
    private service: NotascxcService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartera = route.parent.parent.snapshot.data.cartera;
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadingService.register('procesando');
    this.service
      .buscarRmd({
        pendientes: this.pendientes,
        cartera: this.cartera.tipo,
        term: this.term
      })
      .do(() => (this.procesando = true))
      .catch(error => this.handelError2(error))
      .finally(() => this.loadingService.resolve('procesando'))
      //.delay(3000)
      .subscribe(res => {
        this.data = res;
        this.filteredData = res;
        this.filteredTotal = res.length;
        // console.log('Pendientes: ', res);
      });
  }

  search(term) {
    if (term !== undefined) {
      console.log('Search: ', term);
      this.term = term;
      this.load();
    }
  }

  atender() {
    console.log('Generando nota de devolucin: ', this.selectedRows.length);
    if (this.selectedRows.length) {
      const ref = this.dialogService.openConfirm({
        title: 'Nota de cr??dito',
        message: `Generar nota de cr??dito a ${
          this.selectedRows.length
        } devoluciones seleccionadas?`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      });
      ref.afterClosed().subscribe(val => {
        if (val) {
          // console.log('Generando nota de devolucion: ', this.selectedRows[0]);
          this.generarNota(this.selectedRows[0]);
        }
      });
    }
  }

  generarNota(nota) {
    this.service
      .generarNotaDeDevolucion(nota, this.cartera.tipo)
      .do(() => (this.procesando = true))
      .delay(3000)
      .catch(error => this.handelError2(error))
      .finally(() => (this.procesando = false))
      .subscribe((res: any) => {
        console.log('Notas generadas:  ', res, this.cartera);
        if (this.cartera.tipo === 'CON') {
          this.router.navigate([
            'cxc/contado/notas/bonificaciones/show',
            res.id
          ]);
        } else {
          this.router.navigate(['cxc/notas/bonificaciones/show', res.id]);
        }
        // this.timbrar(nota)
      });
  }

  timbrar(nota) {
    this.loadingService.register('procesando');
    this.service
      .timbrar(nota)
      .finally(() => this.loadingService.resolve('procesando'))
      .catch(error => this.handelError2(error))
      .subscribe(res => {
        console.log('Nota timbrada: ', res);
        // this.pendientes = false
      });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return (
          (column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false)
        );
      })
      .map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(
      newData,
      this.searchTerm,
      true,
      excludedColumns
    );
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(
      newData,
      this.sortBy,
      this.sortOrder
    );
    newData = this._dataTableService.pageData(
      newData,
      this.fromRow,
      this.currentPage * this.pageSize
    );
    this.filteredData = newData;
  }

  get pendientes() {
    return this._pendientes;
  }
  set pendientes(val) {
    this._pendientes = val;
    this.load();
  }

  handelError2(response) {
    const message = response.error
      ? response.error.message
      : 'Error en servidor';
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return Observable.empty();
  }
}
