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
    setQuery("invoiceNumber:" + invoiceNumber);
  };

  const onChangeFiscalFolio = (fiscalFolio: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      fiscalFolio,
    }));
    setQuery("fiscalFolio:" + fiscalFolio);
  };

  const onChangeCollaboratorName = (collaboratorName: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      collaboratorName,
    }));
    setQuery("collaboratorName:" + collaboratorName);
  };

  const onChangeInvoiceYear = (invoiceYear?: number) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceYear,
    }));
    setQuery("invoiceYear:" + invoiceYear);
  };

  const onChangeDocumentType = (documentType?: number) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      documentType,
    }));
    setQuery("documentType:" + documentType);
  };

  const onChangeCurrencyId = (currencyId?: number) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      currencyId,
    }));
    setQuery("currencyId:" + currencyId);
  };

  const onChangeInvoiceDateFrom = (invoiceDateFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceDateFrom,
    }));
    setQuery("invoiceDateFrom:" + invoiceDateFrom);
  };

  const onChangeInvoiceDateTo = (invoiceDateTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceDateTo,
    }));
    setQuery("invoiceDateTo:" + invoiceDateTo);
  };

  const onChangeScheduledPaymentFrom = (scheduledPaymentFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      scheduledPaymentFrom,
    }));
    setQuery("scheduledPaymentFrom:" + scheduledPaymentFrom);
  };

  const onChangeScheduledPaymentTo = (scheduledPaymentTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      scheduledPaymentTo,
    }));
    setQuery("scheduledPaymentTo:" + scheduledPaymentTo);
  };

  const onChangePaymentDateFrom = (paymentDateFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      paymentDateFrom,
    }));
    setQuery("paymentDateFrom:" + paymentDateFrom);
  };

  const onChangePaymentDateTo = (paymentDateTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      paymentDateTo,
    }));
    setQuery("paymentDateTo:" + paymentDateTo);
  };

  const onChangeReimbursementDateFrom = (reimbursementDateFrom: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      reimbursementDateFrom,
    }));
    setQuery("reimbursementDateFrom:" + reimbursementDateFrom);
  };

  const onChangeReimbursementDateTo = (reimbursementDateTo: string) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      reimbursementDateTo,
    }));
    setQuery("reimbursementDateTo:" + reimbursementDateTo);
  };

  const onChangeSupplierAliases = (supplierAliases: string[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      supplierAliases,
    }));
    setQuery("supplierAliases:" + supplierAliases.join(","));
  };

  const onChangeProductServices = (productServices: string[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      productServices,
    }));
    setQuery("productServices:" + productServices.join(","));
  };

  const onChangeMonths = (months: number[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      months,
    }));
    setQuery("months:" + months.join(","));
  };

  const onChangeInvoiceStatusIds = (invoiceStatusIds: number[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      invoiceStatusIds,
    }));
    setQuery("invoiceStatusIds:" + invoiceStatusIds.join(","));
  };

  const onChangeReimbursementStatuses = (reimbursementStatuses: number[]) => {
    setFiltrosFacturas((prev) => ({
      ...prev,
      reimbursementStatuses,
    }));
    setQuery("reimbursementStatuses:" + reimbursementStatuses.join(","));
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
