import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  id: number;
  deleteColaborador: (id:number) => void;
}

export const ColaboradorData = ({ id, deleteColaborador }: props) => {
  return (
    <Grid size={12}>
      <Paper sx={{ paddingBottom: 2, paddingLeft: 2 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="noColaborador"
              label="Num. Colaborador"
              name="noColaborador"
              /* value={values.razonSocial}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.razonSocial && Boolean(errors.razonSocial)}
            helperText={touched.razonSocial && errors.razonSocial} */
            />
          </Grid>
          <Grid size={4}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="nombreColaborador"
              label="Nombre"
              name="nombreColaborador"
              /* value={values.razonSocial}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.razonSocial && Boolean(errors.razonSocial)}
            helperText={touched.razonSocial && errors.razonSocial} */
            />
          </Grid>
          <Grid size={1} />
          <Grid size={3}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Activo"
              sx={{ marginTop: 3 }}
            />
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha de Inicio"
                format="DD-MM-YYYY"
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha Tentativa Fin"
                format="DD-MM-YYYY"
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
    </Grid>
  );
};
