import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useRangeFilters } from "./hooks/useRangeFilters";

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            sx={{ width: "100%" }}
            label="Fecha de la Factura"
            value={fechaFactura}
            //value={fechaInicioContrato ? dayjs(fechaInicioContrato) : null}
            onChange={(newValue) => setFechaFactura(newValue)}
            /*  onChange={(newValue) =>
                  onChangeFechaInicioContrato(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaFactura",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            sx={{ width: "100%" }}
            label="Fecha de Pago"
            value={fechaPago}
            //value={fechaInicioContrato ? dayjs(fechaInicioContrato) : null}
            onChange={(newValue) => setFechaPago(newValue)}
            /*  onChange={(newValue) =>
                  onChangeFechaInicioContrato(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaPago",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            sx={{ width: "100%" }}
            label="Fecha Programada Pago"
            value={fechaProgramadaPago}
            //value={fechaInicioContrato ? dayjs(fechaInicioContrato) : null}
            onChange={(newValue) => setFechaProgramadaPago(newValue)}
            /*  onChange={(newValue) =>
                  onChangeFechaInicioContrato(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaProgramadaPago",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            sx={{ width: "100%" }}
            label="Fecha Reembolso"
            value={fechaReembolso}
            //value={fechaInicioContrato ? dayjs(fechaInicioContrato) : null}
            onChange={(newValue) => setFechaReembolsa(newValue)}
            /*  onChange={(newValue) =>
                  onChangeFechaInicioContrato(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaReembolso",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
};
