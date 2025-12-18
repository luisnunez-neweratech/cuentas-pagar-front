export interface CalculateScheduledPaymentDateResponse {
  supplierId: number;
  invoiceDate: string;
  paymentTermId: number;
  scheduledPaymentDate: string;
  message: string;
}
