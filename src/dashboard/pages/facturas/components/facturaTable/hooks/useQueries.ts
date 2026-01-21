import { useQuery } from "@tanstack/react-query";
import { getInvoicesPaged } from "../../../services/invoice.service";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";

interface Props {
  page: number;
  rowsPerPage: number;
}

export const useQueries = ({ page, rowsPerPage }: Props) => {
  const callApi = useFacturasPageStore((state) => state.callApi);
  const filtrosFacturas = useFacturasPageStore(
    (state) => state.filtrosFacturas,
  );

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["invoices", page, rowsPerPage, callApi],
    queryFn: () =>
      getInvoicesPaged({
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        filters: {
          supplierAliases:
            filtrosFacturas?.supplierAliases?.length > 0
              ? filtrosFacturas.supplierAliases
              : undefined,
          productServices:
            filtrosFacturas?.productServices?.length > 0
              ? filtrosFacturas.productServices
              : undefined,
          months:
            filtrosFacturas?.months?.length > 0
              ? filtrosFacturas.months
              : undefined,
          invoiceStatusIds:
            filtrosFacturas?.invoiceStatusIds?.length > 0
              ? filtrosFacturas.invoiceStatusIds
              : undefined,
          reimbursementStatuses:
            filtrosFacturas?.reimbursementStatuses?.length > 0
              ? filtrosFacturas.reimbursementStatuses
              : undefined,
          invoiceDateFrom: filtrosFacturas?.invoiceDateFrom || undefined,
          invoiceDateTo: filtrosFacturas?.invoiceDateTo || undefined,
          scheduledPaymentFrom:
            filtrosFacturas?.scheduledPaymentFrom || undefined,
          scheduledPaymentTo: filtrosFacturas?.scheduledPaymentTo || undefined,
          paymentDateFrom: filtrosFacturas?.paymentDateFrom || undefined,
          paymentDateTo: filtrosFacturas?.paymentDateTo || undefined,
          reimbursementDateFrom:
            filtrosFacturas?.reimbursementDateFrom || undefined,
          reimbursementDateTo:
            filtrosFacturas?.reimbursementDateTo || undefined,
          invoiceNumber: filtrosFacturas?.invoiceNumber || undefined,
          documentType: filtrosFacturas?.documentType,
          invoiceYear: filtrosFacturas?.invoiceYear,
          currencyId: filtrosFacturas?.currencyId,
          collaboratorName: filtrosFacturas?.collaboratorName || undefined,
          fiscalFolio: filtrosFacturas?.fiscalFolio || undefined,
        },
      }),
  });

  return { data, isLoading, error, isError };
};
