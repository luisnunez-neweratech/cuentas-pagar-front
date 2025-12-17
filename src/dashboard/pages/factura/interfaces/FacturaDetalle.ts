export interface FacturaDetalle {
  id: number;
  cantidad: number;
  uMedida: number;
  codigo: string;
  concepto: string;
  precio: number;
  total: number;
  validado: boolean;
}