import { Component, OnInit, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { ITdDataTableColumn } from '@covalent/core/data-table/data-table.component';

import { SelectorDeRmdComponent } from '../../selector-de-rmd/selector-de-rmd.component';


@Component({
  selector: 'sx-rmd-panel',
  templateUrl: './rmd-panel.component.html',
  styles: []
})
export class RmdPanelComponent implements OnInit {

  @Input() parent: FormGroup;

  constructor(
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) { }

  ngOnInit() {}

  buscarRmd() {
    const cliente = this.parent.get('cliente').value;
    if (cliente !== null) {
      this.doBuscarRmd();
    } else {
      this.dialogService.openAlert({
        title: 'Buscador de RMD',
        message: 'Debe primero seleccionar un cliente',
        closeButton: 'Cerrar'
      });
    }
  }

  private doBuscarRmd() {
    const dialogRef = this.dialog.open(SelectorDeRmdComponent, {
      width: '750px',
      height: '550px',
      data: {
        cliente: this.parent.get('cliente').value
      }
    });
    dialogRef.afterClosed().subscribe( rmd => {
      if (rmd !== null ) {
        this.parent.get('devolucion').setValue(rmd);
        this.parent.get('importe').setValue(rmd.total);
      }
    });
  }

  get devolucion() {
    return this.parent.get('devolucion').value;
  }

  get isValid() {
    const tipo = this.parent.get('tipo').value;
    if (tipo === 'DEV') {
      return this.devolucion ? true : false
    }
    return false
  }

}
