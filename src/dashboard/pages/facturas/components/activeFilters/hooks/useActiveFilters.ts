import { useFacturasPageStore } from "../../../store/FacturasPage.store";
import dayjs from "dayjs";

export const useActiveFilters = () => {
  const filtrosFacturas = useFacturasPageStore(
    (state) => state.filtrosFacturas
  );

  // Validar que filtrosFacturas existe
  if (!filtrosFacturas) {
    return {
      invoiceNumber: "",
      fiscalFolio: "",
      collaboratorName: "",
      suppliersCount: "",
      productsCount: "",
      monthsCount: "",
      statusCount: "",
      reimbursementCount: "",
      invoiceDateRange: "",
      paymentDateRange: "",
      scheduledPaymentRange: "",
      reimbursementDateRange: "",
      documentType: "",
      invoiceYear: "",
      currencyId: "",
    };
  }

  // Formatear fechas si existen
  const formatDate = (date: string) => {
    if (!date) return "";
    return dayjs(date).format("DD/MM/YYYY");
  };

  // Crear rango de fechas
  const formatDateRange = (from: string, to: string) => {
    if (!from && !to) return "";
    if (from && to) return `${formatDate(from)} - ${formatDate(to)}`;
    if (from) return `Desde ${formatDate(from)}`;
    if (to) return `Hasta ${formatDate(to)}`;
    return "";
  };

  return {
    // Filtros de texto
    invoiceNumber: filtrosFacturas.invoiceNumber,
    fiscalFolio: filtrosFacturas.fiscalFolio,
    collaboratorName: filtrosFacturas.collaboratorName,

    // Filtros de arrays (mostrar cantidad)
    suppliersCount:
      filtrosFacturas.supplierAliases?.length > 0
        ? `${filtrosFacturas.supplierAliases.length} proveedor(es)`
        : "",
    productsCount:
      filtrosFacturas.productServices?.length > 0
        ? `${filtrosFacturas.productServices.length} producto(s)`
        : "",
    monthsCount:
      filtrosFacturas.months?.length > 0
        ? `${filtrosFacturas.months.length} mes(es)`
        : "",
    statusCount:
      filtrosFacturas.invoiceStatusIds?.length > 0
        ? `${filtrosFacturas.invoiceStatusIds.length} estatus`
        : "",
    reimbursementCount:
      filtrosFacturas.reimbursementStatuses?.length > 0
        ? `${filtrosFacturas.reimbursementStatuses.length} reembolso(s)`
        : "",

    // Rangos de fechas
    invoiceDateRange: formatDateRange(
      filtrosFacturas.invoiceDateFrom,
      filtrosFacturas.invoiceDateTo
    ),
    paymentDateRange: formatDateRange(
      filtrosFacturas.paymentDateFrom,
      filtrosFacturas.paymentDateTo
    ),
    scheduledPaymentRange: formatDateRange(
      filtrosFacturas.scheduledPaymentFrom,
      filtrosFacturas.scheduledPaymentTo
    ),
    reimbursementDateRange: formatDateRange(
      filtrosFacturas.reimbursementDateFrom,
      filtrosFacturas.reimbursementDateTo
    ),

    // Otros filtros
    documentType:
      filtrosFacturas.documentType !== undefined
        ? filtrosFacturas.documentType === 0
          ? "Factura"
          : "Nota de Crédito"
        : "",
    invoiceYear: filtrosFacturas.invoiceYear?.toString() || "",
    currencyId: filtrosFacturas.currencyId?.toString() || "",
  };
};
