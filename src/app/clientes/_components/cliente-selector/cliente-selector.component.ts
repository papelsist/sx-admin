import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sx-cliente-selector',
  templateUrl: './cliente-selector.component.html',
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class ClienteSelectorComponent implements OnInit {

  formControl = new FormControl();

  @Input() placeholder = 'Cliente';

  constructor() { }

  ngOnInit() {
  }

}
