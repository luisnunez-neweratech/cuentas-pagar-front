import { Grid } from "@mui/material";
import { useActiveFilters } from "./hooks/useActiveFilters";
import { ChipElement } from "./components/chipElement/ChipElement";

export const ActiveFilters = () => {
  const {
    invoiceNumber,
    fiscalFolio,
    collaboratorName,
    suppliersCount,
    productsCount,
    monthsCount,
    statusCount,
    reimbursementCount,
    invoiceDateRange,
    paymentDateRange,
    scheduledPaymentRange,
    reimbursementDateRange,
    documentType,
    invoiceYear,
    currencyId,
  } = useActiveFilters();

  return (
    <Grid size={8} sx={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: 0.5, alignItems: "center" }}>
      {invoiceNumber && (
        <ChipElement label="No. Factura" value={invoiceNumber} />
      )}
      {fiscalFolio && <ChipElement label="Folio Fiscal" value={fiscalFolio} />}
      {collaboratorName && (
        <ChipElement label="Colaborador" value={collaboratorName} />
      )}
      {suppliersCount && (
        <ChipElement label="Proveedores" value={suppliersCount} />
      )}
      {productsCount && <ChipElement label="Productos" value={productsCount} />}
      {monthsCount && <ChipElement label="Meses" value={monthsCount} />}
      {statusCount && (
        <ChipElement label="Estatus Factura" value={statusCount} />
      )}
      {reimbursementCount && (
        <ChipElement label="Estatus Reembolso" value={reimbursementCount} />
      )}
      {invoiceDateRange && (
        <ChipElement label="Fecha Factura" value={invoiceDateRange} />
      )}
      {paymentDateRange && (
        <ChipElement label="Fecha Pago" value={paymentDateRange} />
      )}
      {scheduledPaymentRange && (
        <ChipElement label="Pago Programado" value={scheduledPaymentRange} />
      )}
      {reimbursementDateRange && (
        <ChipElement label="Fecha Reembolso" value={reimbursementDateRange} />
      )}
      {documentType && (
        <ChipElement label="Tipo Documento" value={documentType} />
      )}
      {invoiceYear && <ChipElement label="Año" value={invoiceYear} />}
      {currencyId && <ChipElement label="Moneda" value={currencyId} />}
    </Grid>
  );
};
