import { Injectable } from "@angular/core";


@Injectable()
export class PagoUtils {

  slimFormaDePago(formaDePago: string ){
    switch (formaDePago) {
      case 'TARJETA_DEBITO':
        return 'TAR_DEV'
      case 'TARJETA_CREDITO':
        return 'TAR_CRE'
      case 'TRANSFERENCIA':
        return 'TRANS'
      case 'DEPOSITO_EFECTIVO':
        return 'DEP_EFE'
      case 'DEPOSITO_CHEQUE':
        return 'DEP_CHE'
      default:
        return formaDePago;

    }
  }

}