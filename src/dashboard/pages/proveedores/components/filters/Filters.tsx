import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFilters } from "./hooks/useFilters";
import dayjs from "dayjs";
import { convertDateToFilterFormat } from "../../../../../lib/dates";

interface FiltersProps {
  showFilter: boolean;
}

export const Filters = ({ showFilter }: FiltersProps) => {
  const {
    rfc,
    onChangeRfc,
    alias,
    onChangeAlias,
    razonSocial,
    onChangeRazonSocial,
    fechaAlta,
    status,
    onChangeFechaAlta,
    onChangeFechaInicioContrato,
    fechaInicioContrato,
    fechaFinContrato,
    onChangeFechaFinContrato,
    onChangeStatus,
  } = useFilters();

  return (
    <>
      {showFilter && (
        <>
          <Grid size={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="rfc"
              label="RFC"
              name="rfc"
              value={rfc}
              onChange={(e) => onChangeRfc(e.target.value)}
            />
          </Grid>
          <Grid size={1} />
          <Grid size={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="alias"
              label="Alias"
              name="alias"
              value={alias}
              onChange={(e) => onChangeAlias(e.target.value)}
            />
          </Grid>
          <Grid size={1} />
          <Grid size={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="razonSocial"
              label="Razon Social"
              name="razonSocial"
              value={razonSocial}
              onChange={(e) => onChangeRazonSocial(e.target.value)}
            />
          </Grid>

          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={fechaAlta ? dayjs(fechaAlta) : null}
                label="Fecha Alta"
                onChange={(newValue) =>
                  onChangeFechaAlta(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                }
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaAlta",
                  },
                  field: { clearable: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={1} />
          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha Inicio Contrato"
                value={fechaInicioContrato ? dayjs(fechaInicioContrato) : null}
                onChange={(newValue) =>
                  onChangeFechaInicioContrato(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                }
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaInicioContrato",
                  },
                  field: { clearable: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={1} />
          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha Fin Contrato"
                value={fechaFinContrato ? dayjs(fechaFinContrato) : null}
                onChange={(newValue) =>
                  onChangeFechaFinContrato(
                    convertDateToFilterFormat(newValue?.toDate())
                  )
                }
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaFinContrato",
                  },
                  field: { clearable: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={3}>
            <FormGroup sx={{ marginTop: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={status}
                    value={status}
                    onChange={() => onChangeStatus(!status)}
                  />
                }
                label={status ? "Activos" : "Inactivos"}
              />
            </FormGroup>
          </Grid>
        </>
      )}
    </>
  );
};
