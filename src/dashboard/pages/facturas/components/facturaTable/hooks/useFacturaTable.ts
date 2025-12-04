import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";
import { getInvoicesPaged } from "../../../services/invoice.service";
import type { InvoiceListResponse } from "../../../interfaces/InvoiceListResponse";

export const useFacturaTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleOpenModal = useFacturasPageStore(
    (state) => state.handleOpenModal
  );
  const callApi = useFacturasPageStore((state) => state.callApi);
  const filtrosFacturas = useFacturasPageStore(
    (state) => state.filtrosFacturas
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
          reimbursementDateTo: filtrosFacturas?.reimbursementDateTo || undefined,
          invoiceNumber: filtrosFacturas?.invoiceNumber || undefined,
          documentType: filtrosFacturas?.documentType,
          invoiceYear: filtrosFacturas?.invoiceYear,
          currencyId: filtrosFacturas?.currencyId,
          collaboratorName: filtrosFacturas?.collaboratorName || undefined,
          fiscalFolio: filtrosFacturas?.fiscalFolio || undefined,
        },
      }),
  });

  const rowClick = (invoice: InvoiceListResponse) => {
    handleOpenModal();
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (invoiceId: number) => {
    navigate(`/facturas/${invoiceId}`);
  };

  useEffect(() => {
    setPage(0);
  }, [
    filtrosFacturas.invoiceNumber,
    filtrosFacturas.fiscalFolio,
    filtrosFacturas.collaboratorName,
    filtrosFacturas.invoiceYear,
    filtrosFacturas.documentType,
    filtrosFacturas.currencyId,
    filtrosFacturas.invoiceDateFrom,
    filtrosFacturas.invoiceDateTo,
    filtrosFacturas.scheduledPaymentFrom,
    filtrosFacturas.scheduledPaymentTo,
    filtrosFacturas.paymentDateFrom,
    filtrosFacturas.paymentDateTo,
    filtrosFacturas.reimbursementDateFrom,
    filtrosFacturas.reimbursementDateTo,
  ]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data ?? error.message);
        return;
      }
      toast.error("Error al obtener facturas");
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    error,
    page,
    rowsPerPage,
    rowClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
  };
};
