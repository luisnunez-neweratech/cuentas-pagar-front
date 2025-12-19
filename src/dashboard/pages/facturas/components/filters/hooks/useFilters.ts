import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";

export const useFilters = () => {
  const filtrosFacturas = useFacturasPageStore(
    (state) => state.filtrosFacturas
  );
  const setFiltrosFacturas = useFacturasPageStore(
    (state) => state.setFiltrosFacturas
  );
  const setCallApi = useFacturasPageStore((state) => state.setCallApi);

  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    if (debouncedQuery) {
      setCallApi();
    }
  }, [debouncedQuery]);

  const onChangeInvoiceNumber = (invoiceNumber: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceNumber,
    }));
    setQuery("invoiceNumber:" + invoiceNumber + ":" + Date.now());
  };

  const onChangeFiscalFolio = (fiscalFolio: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      fiscalFolio,
    }));
    setQuery("fiscalFolio:" + fiscalFolio + ":" + Date.now());
  };

  const onChangeCollaboratorName = (collaboratorName: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      collaboratorName,
    }));
    setQuery("collaboratorName:" + collaboratorName + ":" + Date.now());
  };

  const onChangeInvoiceYear = (invoiceYear?: number) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceYear,
    }));
    setQuery("invoiceYear:" + invoiceYear + ":" + Date.now());
  };

  const onChangeDocumentType = (documentType?: number) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      documentType,
    }));
    setQuery("documentType:" + documentType + ":" + Date.now());
  };

  const onChangeCurrencyId = (currencyId?: number, currencyLabel?: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      currencyId,
      currencyLabel
    }));

    setQuery("currencyId:" + currencyId + ":" + Date.now());
  };

  const onChangeInvoiceDateFrom = (invoiceDateFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceDateFrom,
    }));
    setQuery("invoiceDateFrom:" + invoiceDateFrom + ":" + Date.now());
  };

  const onChangeInvoiceDateTo = (invoiceDateTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceDateTo,
    }));
    setQuery("invoiceDateTo:" + invoiceDateTo + ":" + Date.now());
  };

  const onChangeScheduledPaymentFrom = (scheduledPaymentFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      scheduledPaymentFrom,
    }));
    setQuery("scheduledPaymentFrom:" + scheduledPaymentFrom + ":" + Date.now());
  };

  const onChangeScheduledPaymentTo = (scheduledPaymentTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      scheduledPaymentTo,
    }));
    setQuery("scheduledPaymentTo:" + scheduledPaymentTo + ":" + Date.now());
  };

  const onChangePaymentDateFrom = (paymentDateFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      paymentDateFrom,
    }));
    setQuery("paymentDateFrom:" + paymentDateFrom + ":" + Date.now());
  };

  const onChangePaymentDateTo = (paymentDateTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      paymentDateTo,
    }));
    setQuery("paymentDateTo:" + paymentDateTo + ":" + Date.now());
  };

  const onChangeReimbursementDateFrom = (reimbursementDateFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      reimbursementDateFrom,
    }));
    setQuery("reimbursementDateFrom:" + reimbursementDateFrom + ":" + Date.now());
  };

  const onChangeReimbursementDateTo = (reimbursementDateTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      reimbursementDateTo,
    }));
    setQuery("reimbursementDateTo:" + reimbursementDateTo + ":" + Date.now());
  };

  const onChangeSupplierAliases = (supplierAliases: string[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      supplierAliases,
    }));
    setQuery("supplierAliases:" + supplierAliases.join(",") + ":" + Date.now());
  };

  const onChangeProductServices = (productServices: string[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      productServices,
    }));
    setQuery("productServices:" + productServices.join(",") + ":" + Date.now());
  };

  const onChangeMonths = (months: number[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      months,
    }));
    setQuery("months:" + months.join(",") + ":" + Date.now());
  };

  const onChangeInvoiceStatusIds = (invoiceStatusIds: number[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceStatusIds,
    }));
    setQuery("invoiceStatusIds:" + invoiceStatusIds.join(",") + ":" + Date.now());
  };

  const onChangeReimbursementStatuses = (reimbursementStatuses: number[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      reimbursementStatuses,
    }));
    setQuery("reimbursementStatuses:" + reimbursementStatuses.join(",") + ":" + Date.now());
  };

  return {
    filtrosFacturas,
    onChangeInvoiceNumber,
    onChangeFiscalFolio,
    onChangeCollaboratorName,
    onChangeInvoiceYear,
    onChangeDocumentType,
    onChangeCurrencyId,
    onChangeInvoiceDateFrom,
    onChangeInvoiceDateTo,
    onChangeScheduledPaymentFrom,
    onChangeScheduledPaymentTo,
    onChangePaymentDateFrom,
    onChangePaymentDateTo,
    onChangeReimbursementDateFrom,
    onChangeReimbursementDateTo,
    onChangeSupplierAliases,
    onChangeProductServices,
    onChangeMonths,
    onChangeInvoiceStatusIds,
    onChangeReimbursementStatuses,
  };
};
