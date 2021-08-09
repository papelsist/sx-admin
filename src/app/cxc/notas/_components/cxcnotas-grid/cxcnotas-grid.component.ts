import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

@Component({
  selector: 'sx-cxcnotas-grid',
  templateUrl: './cxcnotas-grid.component.html',
  styles: [`
  td-data-table {
    height: 600px;
  }
  `]
})
export class CxcnotasGridComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', sortable: false, width: 70 },
    { name: 'tipoCartera', label: 'Tipo', sortable: false, width: 70 },
    { name: 'serie', label: 'Serie', sortable: false, width: 70 },
    { name: 'cliente.nombre',  label: 'Cliente', sortable: true, width: 400 , nested: true},
    { name: 'total', label: 'Importe', sortable: false, width: 70 },
    { name: 'disponible', label: 'Disponible', sortable: false, width: 100 },
    { name: 'operaciones', label: '...', sortable: false, width: 100 },
  ];

  @Input() data: any[] = []; 

  constructor() { }

  ngOnInit() {
  }

}
