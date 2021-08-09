import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sx-periodo-selector',
  templateUrl: './periodo-selector.component.html',
  styles: []
})
export class PeriodoSelectorComponent implements OnInit {

  fechaInicial = new FormControl();
  fechaFinal = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<PeriodoSelectorComponent>
  ){ }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close('OK');
  }

}
