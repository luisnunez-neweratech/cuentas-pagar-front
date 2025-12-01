import { Grid } from "@mui/material";
import { useRangeFilters } from "./hooks/useRangeFilters";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

export const RangeFilters = () => {
  const {
    fechaFactura,
    setFechaFactura,
    fechaPago,
    setFechaPago,
    fechaProgramadaPago,
    setFechaProgramadaPago,
    fechaReembolso,
    setFechaReembolsa,
  } = useRangeFilters();

  return (
    <>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          placeholder="Fecha Factura"
          value={
            Array.isArray(fechaFactura) && fechaFactura.length === 2
              ? [fechaFactura[0], fechaFactura[1]]
              : undefined
          }
          onChange={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              setFechaFactura(value as Date[]);
            } else {
              setFechaFactura([]);
            }
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          placeholder="Fecha Pago"
          value={
            Array.isArray(fechaPago) && fechaPago.length === 2
              ? [fechaPago[0], fechaPago[1]]
              : undefined
          }
          onChange={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              setFechaPago(value as Date[]);
            } else {
              setFechaPago([]);
            }
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          placeholder="Fecha Programada Pago"
          value={
            Array.isArray(fechaProgramadaPago) &&
            fechaProgramadaPago.length === 2
              ? [fechaProgramadaPago[0], fechaProgramadaPago[1]]
              : undefined
          }
          onChange={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              setFechaProgramadaPago(value as Date[]);
            } else {
              setFechaProgramadaPago([]);
            }
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          placeholder="Fecha Reembolso"
          value={
            Array.isArray(fechaReembolso) && fechaReembolso.length === 2
              ? [fechaReembolso[0], fechaReembolso[1]]
              : undefined
          }
          onChange={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              setFechaReembolsa(value as Date[]);
            } else {
              setFechaReembolsa([]);
            }
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
    </>
  );
};
