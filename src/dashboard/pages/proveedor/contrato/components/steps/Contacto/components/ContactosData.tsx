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
import { TipoContacto } from "../../../../../interfaces/TipoContacto";

interface props {
  id: number;
  deleteContacto: (id: number) => void;
  isValidForm: (id: number, valid: boolean) => void;
  index: number;
  validateContactos: number;
}

export const ContactosData = ({
  id,
  deleteContacto,
  isValidForm,
  index,
  validateContactos,
}: props) => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContactosData({ id, isValidForm, validateContactos });

  return (
    <Grid size={12}>
      <div>
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
                  <MenuItem value={TipoContacto.Venta.value}>
                    {TipoContacto.Venta.label}
                  </MenuItem>
                  <MenuItem value={TipoContacto.Pago.value}>
                    {TipoContacto.Pago.label}
                  </MenuItem>
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
                label="*Teléfono"
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
              {values.tipoContacto === TipoContacto.Venta.value && (
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
            {index > 0 && (
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
