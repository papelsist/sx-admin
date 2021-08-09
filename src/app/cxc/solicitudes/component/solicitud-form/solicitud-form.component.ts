import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';

import { SolicitudDeDeposito } from 'app/tesoreria/model/solicitudDeDeposito';
import { OnDestroy, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

export function ImporteDeSolicitudValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const efectivo = control.get('efectivo').value || 0;
    const cheque = control.get('cheque').value || 0;
    const transferencia = control.get('transferencia').value || 0;
    const total = efectivo + cheque + transferencia;
    return total <= 0 ? {'totalInvalido': {value: control.value}} : null;
  };
}

@Component({
  selector: 'sx-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styles: []
})
export class SolicitudFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() cartera;

  @Output() cancel = new EventEmitter();

  @Output() save = new EventEmitter();

  @Input() solicitud: SolicitudDeDeposito;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.syncTransferencia();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.solicitud) {
      console.log('Editando solicitud: ', changes.solicitud);
      this.form.patchValue(this.solicitud);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      banco: [null, Validators.required],
      cuenta: [null, Validators.required],
      fechaDeposito: [null, Validators.required],
      referencia: [null, Validators.required],
      cheque: 0.0,
      transferencia: 0.0,
      efectivo: 0.0,
      comentario: [{value: '', disabled: true}]
    }, { validator: ImporteDeSolicitudValidator() });
  }

  prepareEntity() {
    const efectivo = this.form.get('efectivo').value || 0.0;
    const cheque = this.form.get('cheque').value || 0.0;
    const transferencia = this.form.get('transferencia').value || 0.0;
    let fechaDeposito = this.form.get('fechaDeposito').value;
    if (_.isDate(fechaDeposito)) {
      fechaDeposito = fechaDeposito.toISOString();
    }
    const entity = {
      ...this.form.value,
      tipo: this.cartera,
      cheque: _.toNumber(cheque),
      efectivo: _.toNumber(efectivo),
      transferencia: _.toNumber(transferencia),
      fechaDeposito: fechaDeposito,
      comentario: null,
    };
    if (this.solicitud) {
      entity.id = this.solicitud.id;
    }
    return entity;
  }

  onSubmit() {
    const res = this.prepareEntity();
    console.log('Salvando: ', res);
    if (this.form.valid) {
      this.save.emit(res);
    }
  }

  syncTransferencia() {
    this.form.get('transferencia').valueChanges.subscribe( val => {
      if(val > 0) {
        this.form.get('efectivo').disable();
        this.form.get('cheque').disable();
        this.form.get('efectivo').setValue(0);
        this.form.get('cheque').setValue(0);

      } else {
        this.form.get('efectivo').enable();
        this.form.get('cheque').enable();
      }
    });
  }

  isEditable() {
    if (this.solicitud !== null) {
      const comentario: string = this.form.get('comentario').value;
      if (comentario === null || comentario.length === 0) {
        return false;
      }
    }
    return true;
  }

}
