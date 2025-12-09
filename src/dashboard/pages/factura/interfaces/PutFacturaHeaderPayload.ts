export interface PutFacturaHeaderPayload {
  supplierId: number;
  invoiceNumber: string;
  documentType: string;
  cfdiType: number;
  serie: string;
  folio: string;
  fiscalFolio: string;
  invoiceDate: string;
  supplierProductService: string;
  subtotal: number;
  discount: number;
  taxIVA: number;
  taxIVARetained: number;
  taxISRRetained: number;
  total: number;
  currencyId: number;
  scheduledPaymentDate: string;
  invoiceStatusId: number;
  paymentDate: string | null;
  reimbursementStatus: string;
  reimbursementDate: string | null;
  reimbursementCollaboratorId: number;
  paymentTerms: string | null;
}
