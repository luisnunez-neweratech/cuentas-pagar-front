import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContactosData } from "../hooks/useContactosData";

interface props {
  id: number;
  deleteContacto: (id: number) => void;
  isValidForm: (id: number, valid: boolean) => void;
}

export const ContactosData = ({ id, deleteContacto, isValidForm }: props) => {
  const {
    onMouseLeaveComponent,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useContactosData({ id, isValidForm });

  return (
    <Grid size={12}>
      <div
        onMouseLeave={async () => {
          onMouseLeaveComponent();
        }}
      >
        <Paper sx={{ paddingBottom: 2, paddingLeft: 2 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid size={4} sx={{ marginTop: 2 }}>
              <FormControl
                fullWidth
                error={touched.tipoContacto && Boolean(errors.tipoContacto)}
              >
                <InputLabel id="tipo-contacto-label">*Tipo Contacto</InputLabel>
                <Select
                  labelId="tipo-contacto-label"
                  id="tipoContacto"
                  name="tipoContacto"
                  label="Tipo Contacto"
                  value={values.tipoContacto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="venta">Venta</MenuItem>
                  <MenuItem value="pago">Pago</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.tipoContacto && errors.tipoContacto
                    ? errors.tipoContacto
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="contacto"
                label="*Contacto"
                name="contacto"
                value={values.contacto}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.contacto && Boolean(errors.contacto)}
                helperText={touched.contacto && errors.contacto}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="telefono"
                label="*Telefono"
                name="telefono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.telefono && Boolean(errors.telefono)}
                helperText={touched.telefono && errors.telefono}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="email"
                id="email"
                label="*Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>

            <Grid size={4}>
              {values.tipoContacto === "venta" && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="paginaWeb"
                  label="Pagina Web"
                  name="paginaWeb"
                  value={values.paginaWeb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.paginaWeb && Boolean(errors.paginaWeb)}
                  helperText={touched.paginaWeb && errors.paginaWeb}
                />
              )}
            </Grid>

            <Grid size={1} />
            {id > 1 && (
              <Grid size={1}>
                <Tooltip title="Eliminar Cuenta">
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => deleteContacto(id)}
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
