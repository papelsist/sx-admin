import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { Cobro } from 'app/_shared/models/cobro';
import { MatDialog } from '@angular/material';
import { CobrochequeFormComponent } from '../cobrocheque-form/cobrocheque-form.component';
import { CobrotarjetaFormComponent } from '../cobrotarjeta-form/cobrotarjeta-form.component';

@Component({
  selector: 'sx-cobro-form',
  templateUrl: './cobro-form.component.html',
  styles: []
})
export class CobroFormComponent implements OnInit, OnChanges, OnDestroy {

  form: FormGroup;

  @Output() cancel = new EventEmitter();

  @Output() save = new EventEmitter();

  @Input() cobro: Cobro;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nota) {
      // console.log('Editando nota de cargo: ', changes.nota);
      this.form.patchValue(this.cobro);
      this.form.get('cliente').disable();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      fecha: [new Date(), Validators.required],
      importe: [{value: null, disabled: false}, [Validators.required]],
      formaDePago: [null, Validators.required],
      comentario: null,
    });
    this.subscribers();
  }

  private subscribers() {
  }

  prepareEntity() {
    const cliente = this.form.get('cliente').value;
    const fecha: Date = this.form.get('fecha').value;
    const entity = {
      ...this.form.value,
      cliente: {id: cliente.id},
      tipo: 'CRE',
      fecha: fecha.toISOString()
    };
    return entity;
  }

  onSubmit() {
    if (this.form.valid) {
      const entity = this.prepareEntity();
      const formaDePago = this.form.get('formaDePago').value;
      switch (formaDePago) {
        case 'CHEQUE': {
          this.pagoConCheque(entity);
          break;
        }
        case 'TARJETA_DEBITO':
        case 'TARJETA_CREDITO': {
          this.pagoConTarjeta(entity);
          break;
        }
        default: {
          // console.log('Salvando cobro: ', entity)
          this.save.emit(entity);
        }
      }
    }
  }

  isEditable() {
    return true;
  }

  pagoConCheque(entity) {
    const ref = this.dialog.open(CobrochequeFormComponent, {});
    ref.afterClosed().subscribe(cheque => {
      if (cheque) {
        entity.cheque = cheque;
        this.save.emit(entity);
        // console.log('Salvando cobro: ', entity);
      } else {
        console.log('Se requiere registrar el cheque...');
      }
    });
  }

  pagoConTarjeta(entity) {
    const ref = this.dialog.open(CobrotarjetaFormComponent, {});
    ref.afterClosed().subscribe(tarjeta => {
      if (tarjeta) {
        const fp = this.form.get('formaDePago').value;
        tarjeta.debitoCredito = fp === 'TARJETA_DEBITO';
        entity.tarjeta = tarjeta;
        this.save.emit(entity);
        // console.log('Salvando cobro: ', entity);
      } else {
        console.log('Se requiere registrar datos de la tarjeta...');
      }
    });
  }

}

