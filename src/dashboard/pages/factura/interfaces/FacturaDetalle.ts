export interface FacturaDetalle {
  id: number;
  cantidad: number;
  uMedida: string;
  codigo: string;
  concepto: string;
  precio: number;
  total: number;
}