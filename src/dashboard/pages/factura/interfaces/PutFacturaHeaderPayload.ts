export interface PutFacturaHeaderPayload {
  supplierId: number | null;
  invoiceNumber: string | null;
  invoiceStatusId: number | null;
  fiscalFolio: string | null;
  documentType: number | null;
  invoiceDate: string | null;
  supplierProductService: string | null;
  subtotal: number | null;
  discount: number | null;
  taxIVA: number | null;
  taxIVARetained: number | null;
  taxISRRetained: number | null;
  total: number | null;
  currencyId: number | null;
  scheduledPaymentDate: string | null;
  paymentDate: string | null;
  reimbursementStatus: number | null;
  reimbursementDate: string | null;
  reimbursementCollaboratorId: number | null;
  paymentTermId: number;
  exchangeRate: number | null;
  contractId: number | null;
}
