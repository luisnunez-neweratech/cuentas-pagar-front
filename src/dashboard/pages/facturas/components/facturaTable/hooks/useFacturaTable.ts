import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { useFacturaStore } from "../../../../factura/store/Factura.store";
import { useQueries } from "./useQueries";

export const useFacturaTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleOpenModal = useFacturasPageStore(
    (state) => state.handleOpenModal,
  );

  const handleOpenCommentsModal = useFacturasPageStore(
    (state) => state.handleOpenCommentsModal,
  );

  const setIdSelected = useFacturasPageStore((state) => state.setIdSelected);

  const filtrosFacturas = useFacturasPageStore(
    (state) => state.filtrosFacturas,
  );
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const clearState = useFacturaStore((state) => state.clearState);

  const { data, isLoading, error, isError, statusFacturaData } = useQueries({
    page,
    rowsPerPage,
  });

  const rowClick = (invoice: any) => {
    setIdSelected(invoice.id);
    handleOpenModal();
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (invoiceId: number) => {
    clearState();
    setIsLoading(true);
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
    handleOpenCommentsModal,
    statusFacturaData,
  };
};
