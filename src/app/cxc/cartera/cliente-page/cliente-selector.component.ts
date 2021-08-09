import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sx-cliente-selector',
  template: `
  <h2 mat-dialog-title>Selección de cliente</h2>
  <mat-dialog-content>
    <sx-cliente-field [formControl]="control" (keyup.enter)="close()"></sx-cliente-field>
  </mat-dialog-content>

  `
})

export class ClienteSelectorComponent implements OnInit {

  control = new FormControl()
  
  constructor(
    public dialogRef: MatDialogRef<ClienteSelectorComponent>
  ) { }

  ngOnInit() { }

  close() {
    this.dialogRef.close(this.control.value);
  }

}