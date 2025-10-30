import {
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { useColaboradorData } from "../hooks/useColaboradorData";

interface props {
  id: number;
  deleteColaborador: (id: number) => void;
  isValidForm: (id: number, valid: boolean) => void;
}

export const ColaboradorData = ({
  id,
  deleteColaborador,
  isValidForm,
}: props) => {
  const {    
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    status,
    setStatus,    
    onMouseLeaveComponent,
  } = useColaboradorData({ id, isValidForm });

  return (
    <Grid size={12}>
      <div onMouseLeave={onMouseLeaveComponent}>
        <Paper sx={{ paddingBottom: 2, paddingLeft: 2 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="noColaborador"
                label="*Num. Colaborador"
                name="noColaborador"
                value={values.noColaborador}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.noColaborador && Boolean(errors.noColaborador)}
                helperText={touched.noColaborador && errors.noColaborador}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="nombreColaborador"
                label="*Nombre"
                name="nombreColaborador"
                value={values.nombreColaborador}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.nombreColaborador && Boolean(errors.nombreColaborador)
                }
                helperText={
                  touched.nombreColaborador && errors.nombreColaborador
                }
              />
            </Grid>
            <Grid size={1} />
            <Grid size={3}>
              <FormGroup sx={{ marginTop: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      value={status}
                      onChange={() => setStatus(!status)}
                    />
                  }
                  label={status ? "Activo" : "Inactivo"}
                />
              </FormGroup>
            </Grid>
            <Grid size={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="*Fecha Inicio"
                  value={values.fechaInicio}
                  onChange={(newValue) =>
                    setFieldValue("fechaInicio", newValue)
                  }
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      name: "fechaInicio",
                      error: touched.fechaInicio && Boolean(errors.fechaInicio),
                      helperText: touched.fechaInicio && errors.fechaInicio,
                      onBlur: () => setFieldTouched("fechaInicio", true),
                    },
                    field: { clearable: true },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="*Fecha Fin"
                  value={values.fechaFin}
                  onChange={(newValue) => setFieldValue("fechaFin", newValue)}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      name: "fechaFin",
                      error: touched.fechaFin && Boolean(errors.fechaFin),
                      helperText: touched.fechaFin && errors.fechaFin,
                      onBlur: () => setFieldTouched("fechaFin", true),
                    },
                    field: { clearable: true },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={3} />
            {id > 1 && (
              <Grid size={1}>
                <Tooltip title="Eliminar Colaborador">
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => deleteColaborador(id)}
                  >
                    <DeleteIcon
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Paper>
      </div>
    </Grid>
  );
};
