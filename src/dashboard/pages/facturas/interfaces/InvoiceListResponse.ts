export interface InvoiceListResponse {
  id: number;
  supplierId: number;
  supplierAlias: string | null;
  supplierCode: string | null;
  invoiceNumber: string | null;
  documentType: InvoiceDocumentType;
  invoiceDate: string;
  invoiceMonth: number;
  invoiceYear: number;
  supplierProductService: string | null;
  paymentTerms: string | null;
  subtotal: number;
  discount: number;
  taxIVA: number;
  taxIVARetained: number;
  taxISRRetained: number;
  total: number;
  currencyId: number;
  currencyCode: string | null;
  currencyName: string | null;
  invoiceStatusId: number;
  invoiceStatusName: string | null;
  scheduledPaymentDate: string;
  paymentDate: string | null;
  reimbursementStatus: ReimbursementStatus;
  reimbursementDate: string | null;
  reimbursementCollaboratorId: number | null;
  reimbursementCollaboratorName: string | null;
  fiscalFolio: string | null;
  hasXml: boolean;
  hasPdf: boolean;
  hasPaymentProof: boolean;
  daysToDue: number | null;
  xmlDownloadUrl: string | null;
  pdfDownloadUrl: string | null;
  paymentProofDownloadUrl: string | null;
  project: string | null;
}

export interface InvoiceListResponsePagedResult {
  items: InvoiceListResponse[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export enum InvoiceDocumentType {
  Factura = 1,
  NotaCredito = 2,
}

export enum ReimbursementStatus {
  Pendiente = 1,
  Pagado = 2,
  Cancelado = 3,
  NoAplica = 4,
}
