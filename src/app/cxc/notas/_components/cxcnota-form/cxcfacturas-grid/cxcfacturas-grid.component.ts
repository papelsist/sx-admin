import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'sx-cxcfacturas-grid',
  templateUrl: './cxcfacturas-grid.component.html',
  styles: []
})
export class CxcfacturasGridComponent implements OnInit {

  @Input() parent: FormGroup
  
  @Input() facturas = [];

  columns: ITdDataTableColumn[] = [
    { name: 'sucursal',  label: 'Sucursal', sortable: true, width: 150 },
    { name: 'documento', label: 'Factura', filter: true, sortable: false },
    { name: 'fecha', label: 'fecha', hidden: false },
    { name: 'total', label: 'Total', sortable: true, width: 250 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
