import { AbstractControl } from '@angular/forms';

export const CxcnotaValidator = (control: AbstractControl): {[key: string]: boolean} => {
  // Validar la necesidad de referencias
  const tipo: string = control.get('tipo').value;
  
  switch (tipo) {
    case 'DEV':{
      return control.get('devolucion').value ? null : {requiereRmd: true};
    }
    case 'BON':{
      const referencias = control.get('referencias').value;
      const sinReferencia = control.get('sinReferencia').value;
      if (!sinReferencia) {
        return referencias.length == 0 ? {requiereFacturas: true} : null;
      }
    }
  }
  return null;
}