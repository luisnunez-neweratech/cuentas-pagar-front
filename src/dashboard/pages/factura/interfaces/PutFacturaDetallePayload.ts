export interface PutFacturaDetallePayload {
  id: number;
  lineNumber: number;
  quantity: number;
  productServiceKey: string;
  concept: string;
  unitPrice: number;
  lineDiscount: number;
  lineTotal: number;
  uofMId: number;
}
