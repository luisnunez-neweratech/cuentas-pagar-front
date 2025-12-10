import type { InvoiceDocumentType, ReimbursementStatus } from "./InvoiceListResponse";

export interface InvoiceFilters {
  supplierAliases?: string[];
  productServices?: string[];
  months?: number[];
  invoiceStatusIds?: number[];
  reimbursementStatuses?: ReimbursementStatus[];
  invoiceDateFrom?: string;
  invoiceDateTo?: string;
  scheduledPaymentFrom?: string;
  scheduledPaymentTo?: string;
  paymentDateFrom?: string;
  paymentDateTo?: string;
  reimbursementDateFrom?: string;
  reimbursementDateTo?: string;
  invoiceNumber?: string;
  documentType?: InvoiceDocumentType;
  invoiceYear?: number;
  currencyId?: number;
  collaboratorName?: string;
  fiscalFolio?: string;
}
