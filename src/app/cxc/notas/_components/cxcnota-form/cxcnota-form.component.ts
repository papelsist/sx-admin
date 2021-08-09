import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

import { CxcnotaValidator } from './cxcnota.validator';


@Component({
  selector: 'sx-cxcnota-form',
  templateUrl: './cxcnota-form.component.html',
  styles: []
})
export class CxcnotaFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  clientes$: Observable<Array<any>>;

  @Input() cartera = 'NO';

  @Output() cancelar = new EventEmitter();

  @Output() save = new EventEmitter<any>();

  @Output() search = new EventEmitter<any>();

  @Input() procesando = false;
  
  destroy$ = new Subject<boolean>();

  devolucionRmd: any;

  constructor(
    private fb: FormBuilder
  ) {}

  private buildForm(){
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      tipo: [null, [Validators.required]],
      tipoDeCalculo: [{value :'PORCENTAJE', disabled: true}],
      fecha: [{value: new Date(), disabled: true}],
      cartera: [this.cartera, Validators.required],
      moneda: [{value:'MXN', disabled: true}, Validators.required],
      tipoDeCambio: [{value: 1.0, disabled: true}],
      importe: [{value: 0.0, disabled: true}, [Validators.required, Validators.min(1.0)]],
      descuento: [{value: 0.0, disabled: true}, [Validators.min(0), Validators.max(99.99)]],
      sinReferencia: false,
      comentario: [''],
      referencias: this.fb.array([]),
      devolucion: null,
    }, {validator: CxcnotaValidator});
  }

  ngOnInit() {
    this.buildForm();
    this.subscribeToTipo();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private subscribeToTipo() {
    this.form.get('tipo')
      .valueChanges
      .takeUntil(this.destroy$)
      .subscribe( (tipo: string) => {
        switch (tipo) {
          case 'BONIFICACION':
          this.notaDeBonificacion();
          break;
          case 'DEVOLUCION':
          this.notaDeDevolucion();
          break
        }
      });
  }

  private notaDeDevolucion() {
    this.form.get('sinReferencia').disable();
    this.form.get('importe').disable();
    this.form.get('descuento').disable();
    this.form.get('tipoDeCalculo').disable();
  }

  private notaDeBonificacion() {
    this.form.get('sinReferencia').enable();
    this.form.get('tipoDeCalculo').enable();
    
    if (this.form.get('tipoDeCalculo').value == 'PORCENTAJE') {
      this.form.get('descuento').enable();
      this.form.get('importe').disable();
    } else {
      this.form.get('descuento').disable();
      this.form.get('importe').enable();
    }
    
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.prepareEntity())
    }
  }

  private prepareEntity() {
    const res = {...this.form.value};
    res.tipoCartera = this.cartera;
    return res
  }

  get fecha() {
    return this.form.get('fecha').value;
  }

  get cliente() { return this.form.get('cliente').value;}

  get tipo() { return this.form.get('tipo').value;}

  get referencias() {
    return this.form.get('referencias').value as FormArray;
  }

}
