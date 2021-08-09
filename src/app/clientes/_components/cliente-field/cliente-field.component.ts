import {Component, Input, OnInit, OnDestroy,
  forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import { Cliente } from 'app/_shared/models';
import { ClienteService } from 'app/clientes/services/cliente.service';


export const CLIENTE_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => ClienteFieldComponent),
  multi: true,
}

@Component({
  selector: 'sx-cliente-field',
  providers: [CLIENTE_LOOKUPFIELD_VALUE_ACCESSOR],
  templateUrl: './cliente-field.component.html',
  styles: [`
    .fill {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteFieldComponent implements OnInit, ControlValueAccessor {

  apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() activos = true;

  @Input() tipo = 'CREDITO';

  @Input() placeholder = 'Cliente';

  clientes$: Observable<Cliente[]>;

  onChange;

  onTouch;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(
    private service: ClienteService
  ) {}

  ngOnInit() {
    this.clientes$ = this.searchControl
      .valueChanges
      .startWith(null)
      .switchMap( term =>  this.service.busarClientes({term, cartera: this.tipo}));
  }


  select(event) {
    // console.log('Selected: ', event.option.value);
    this.onChange(event.option.value);
  }

  displayFn(cliente: Cliente) {
    return cliente ? `${cliente.nombre} (${cliente.rfc}) [${cliente.credito ? 'Crédito' : 'Contado'}]` : '';
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
    if (obj === null) {
      this.searchControl.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  focus() {
    this.inputField.nativeElement.focus();
  }

  onBlur() {
    if (this.onTouch) {
      this.onTouch();
    }
  }

}
