export interface PostFacturaDetallePayload {
  lineNumber: number;
  quantity: number;
  productServiceKey: string;
  concept: string;
  unitPrice: number;
  lineDiscount: number;
  lineTotal: number;
}
