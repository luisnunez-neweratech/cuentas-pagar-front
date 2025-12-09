export interface PostFacturaHeaderPayload {
  id: number;
  supplierId: number;
  invoiceNumber: string;
  fiscalFolio: string;
  documentType: number;
  invoiceDate: string;
  supplierProductService: string;
  subtotal: number;
  discount: number;
  taxIVA: number;
  taxIVARetained: number;
  taxISRRetained: number;
  total: number;
  currencyId: number;
  exchangeRate: number;
  paymentForm: string;
  paymentTerms: string;
  scheduledPaymentDate: string;
  paymentDate: string | null;
  reimbursementStatus: number;
  reimbursementDate: string | null;
  reimbursementCollaboratorId: number | null;
  invoiceStatusId: number | null;
}
