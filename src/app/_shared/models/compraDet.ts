import { Producto, Sucursal } from './';

export interface CompraDet {
  id?: string;
  producto: Producto;
  solicitado: number;
  comentario?: string;
  sucursal?: Sucursal;
  sw2?: string;
  pendiente?: number;
}
