import { Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface FiltersProps {
  showFilter: boolean;
}

export const Filters = ({ showFilter }: FiltersProps) => {
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
              autoFocus
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
            />
          </Grid>

          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha Alta"
                //value={values.fechaInicio}
                /* onChange={(newValue) =>
                    setFieldValue("fechaInicio", newValue)
                  } */
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaAlta",
                    /* error: touched.fechaInicio && Boolean(errors.fechaInicio),
                      helperText: touched.fechaInicio && errors.fechaInicio,
                      onBlur: () => setFieldTouched("fechaInicio", true),*/
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
                //value={values.fechaInicio}
                /* onChange={(newValue) =>
                    setFieldValue("fechaInicio", newValue)
                  } */
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaInicioContrato",
                    /* error: touched.fechaInicio && Boolean(errors.fechaInicio),
                      helperText: touched.fechaInicio && errors.fechaInicio,
                      onBlur: () => setFieldTouched("fechaInicio", true),*/
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
                //value={values.fechaInicio}
                /* onChange={(newValue) =>
                    setFieldValue("fechaInicio", newValue)
                  } */
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaFinContrato",
                    /* error: touched.fechaInicio && Boolean(errors.fechaInicio),
                      helperText: touched.fechaInicio && errors.fechaInicio,
                      onBlur: () => setFieldTouched("fechaInicio", true),*/
                  },
                  field: { clearable: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </>
      )}
    </>
  );
};
