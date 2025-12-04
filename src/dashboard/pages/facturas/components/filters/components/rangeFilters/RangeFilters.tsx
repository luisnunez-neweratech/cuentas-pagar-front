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
          label="Fecha Factura"
          value={fechaFactura}
          showOneCalendar
          onChange={(value) => {
            setFechaFactura(value);
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          label="Fecha Pago"
          value={fechaPago}
          showOneCalendar
          onChange={(value) => {
            setFechaPago(value);
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          label="Fecha Programada Pago"
          value={fechaProgramadaPago}
          showOneCalendar
          onChange={(value) => {
            setFechaProgramadaPago(value);
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
      <Grid size={3}>
        <DateRangePicker
          size="md"
          label="Fecha Reembolso"
          showOneCalendar
          value={fechaReembolso}
          onChange={(value) => {
            setFechaReembolsa(value);
          }}
          format="dd-MM-yyyy"
        />
      </Grid>
    </>
  );
};
