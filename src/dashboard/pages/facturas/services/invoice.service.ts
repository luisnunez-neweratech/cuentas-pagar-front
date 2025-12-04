import { cuentasApi } from "../../../../api/cuentasApi";
import type { InvoiceFilters } from "../interfaces/InvoiceFilters";
import type { InvoiceListResponsePagedResult } from "../interfaces/InvoiceListResponse";

interface getInvoicesPagedProps {
  pageNumber: number;
  pageSize: number;
  filters?: Partial<Omit<InvoiceFilters, "pageNumber" | "pageSize">>;
}

export const getInvoicesPaged = async ({
  pageNumber,
  pageSize,
  filters,
}: getInvoicesPagedProps): Promise<InvoiceListResponsePagedResult> => {
  const params: Record<string, string | string[] | number | number[]> = {};

  if (filters) {
    if (filters.supplierAliases && filters.supplierAliases.length > 0) {
      params.SupplierAliases = filters.supplierAliases;
    }
    if (filters.productServices && filters.productServices.length > 0) {
      params.ProductServices = filters.productServices;
    }
    if (filters.months && filters.months.length > 0) {
      params.Months = filters.months;
    }
    if (filters.invoiceStatusIds && filters.invoiceStatusIds.length > 0) {
      params.InvoiceStatusIds = filters.invoiceStatusIds;
    }
    if (
      filters.reimbursementStatuses &&
      filters.reimbursementStatuses.length > 0
    ) {
      params.ReimbursementStatuses = filters.reimbursementStatuses;
    }
    if (filters.invoiceDateFrom) {
      params.InvoiceDateFrom = filters.invoiceDateFrom;
    }
    if (filters.invoiceDateTo) {
      params.InvoiceDateTo = filters.invoiceDateTo;
    }
    if (filters.scheduledPaymentFrom) {
      params.ScheduledPaymentFrom = filters.scheduledPaymentFrom;
    }
    if (filters.scheduledPaymentTo) {
      params.ScheduledPaymentTo = filters.scheduledPaymentTo;
    }
    if (filters.paymentDateFrom) {
      params.PaymentDateFrom = filters.paymentDateFrom;
    }
    if (filters.paymentDateTo) {
      params.PaymentDateTo = filters.paymentDateTo;
    }
    if (filters.reimbursementDateFrom) {
      params.ReimbursementDateFrom = filters.reimbursementDateFrom;
    }
    if (filters.reimbursementDateTo) {
      params.ReimbursementDateTo = filters.reimbursementDateTo;
    }
    if (filters.invoiceNumber) {
      params.InvoiceNumber = filters.invoiceNumber;
    }
    if (filters.documentType !== undefined) {
      params.DocumentType = filters.documentType;
    }
    if (filters.invoiceYear) {
      params.InvoiceYear = filters.invoiceYear;
    }
    if (filters.currencyId) {
      params.CurrencyId = filters.currencyId;
    }
    if (filters.collaboratorName) {
      params.CollaboratorName = filters.collaboratorName;
    }
    if (filters.fiscalFolio) {
      params.FiscalFolio = filters.fiscalFolio;
    }
  }

  console.log("Filters objeto:", filters);
  console.log("Params construidos:", params);

  const { data } = await cuentasApi.get<InvoiceListResponsePagedResult>(
    `/Invoice/GetPagedAsync/${pageNumber}/${pageSize}`,
    { params }
  );

  return data;
};
