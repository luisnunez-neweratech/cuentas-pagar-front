import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const Filters = () => {
  return (
    <>
      <Grid size={2}>
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
      <Grid size={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="CSF" />
        </FormGroup>
      </Grid>
      <Grid size={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Poder Rep. Legal" />
        </FormGroup>
      </Grid>
      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Alta"
            format="DD-MM-YYYY"
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Inicio Contrato"
            format="DD-MM-YYYY"
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Fin Contrato"
            format="DD-MM-YYYY"
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={2}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Identificacion Rep. Legal"
          />
        </FormGroup>
      </Grid>
      <Grid size={2}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Comprobante Domicilio"
          />
        </FormGroup>
      </Grid>
    </>
  );
};
