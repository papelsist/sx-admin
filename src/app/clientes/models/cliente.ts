export class Cliente {
  id: string;
  nombre?: string;
  clave?: string;
  rfc?: string;
  credito?: {}
  email?: string
  permiteCheque?: boolean
  direccion?: {};
  telefonos?: Array<any>
  cfdiMail?: string
  juridico?: boolean;
  chequeDevuelto?: number;
}
