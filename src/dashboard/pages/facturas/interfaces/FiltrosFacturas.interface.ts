export interface FiltrosFacturas {
  supplierAliases: string[];
  productServices: string[];
  months: number[];
  invoiceStatusIds: number[];
  reimbursementStatuses: number[];
  invoiceDateFrom: string;
  invoiceDateTo: string;
  scheduledPaymentFrom: string;
  scheduledPaymentTo: string;
  paymentDateFrom: string;
  paymentDateTo: string;
  reimbursementDateFrom: string;
  reimbursementDateTo: string;
  invoiceNumber: string;
  documentType?: number;
  invoiceYear?: number;
  currencyId?: number;
  currencyLabel?: string;
  collaboratorName: string;
  fiscalFolio: string;
}
