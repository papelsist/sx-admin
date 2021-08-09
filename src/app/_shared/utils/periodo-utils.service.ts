import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { PeriodoSelectorComponent } from 'app/_shared/components/periodo-selector/periodo-selector.component';

@Injectable()
export class PeriodoUtilsService {

  constructor(private dialog: MatDialog) { }

  seleccionarPeriodo(): Observable<any>{
    const dialogRef = this.dialog.open(PeriodoSelectorComponent, {
      //height: '200px',
      //width: '400px',
    });
    return dialogRef.afterClosed();
  }

}
