import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { AutoCompleteComponent } from "../../../../../../../components/common/AutoComplete/AutoComplete";
import { usePerfil } from "./hooks/usePerfil";
import { TipoEntidad } from "../../../../interfaces/TipoEntidad";
import { TipoPersona } from "../../../../interfaces/TipoPersona";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export const Perfil = () => {
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onChangeAutocomplete,
    disableButtons,
    id,
    setClickedBy,
    giros,
    plazoPagos,
    navigate,
  } = usePerfil();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
        <Grid size={12}>
          <Paper sx={{ padding: 2 }} elevation={3}>
            <Grid container spacing={2}>
              <Grid size={4}>
                <FormControl
                  fullWidth
                  error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
                >
                  <InputLabel id="tipo-entidad-label">*Tipo Entidad</InputLabel>
                  <Select
                    labelId="tipo-entidad-label"
                    id="tipoEntidad"
                    name="tipoEntidad"
                    label="Tipo Entidad"
                    value={values.tipoEntidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={TipoEntidad.Local.value}>
                      {TipoEntidad.Local.label}
                    </MenuItem>
                    <MenuItem value={TipoEntidad.Extranjero.value}>
                      {TipoEntidad.Extranjero.label}
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.tipoEntidad && errors.tipoEntidad?.toString()}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid size={4}>
                <FormControl
                  fullWidth
                  error={touched.tipoPersona && Boolean(errors.tipoPersona)}
                >
                  <InputLabel id="tipo-persona-label">*Tipo Persona</InputLabel>
                  <Select
                    labelId="tipo-persona-label"
                    id="tipoPersona"
                    name="tipoPersona"
                    label="Tipo Persona"
                    value={values.tipoPersona}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={TipoPersona.Fisica.value}>
                      {TipoPersona.Fisica.label}
                    </MenuItem>
                    <MenuItem value={TipoPersona.Moral.value}>
                      {TipoPersona.Moral.label}
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.tipoPersona && errors.tipoPersona?.toString()}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid size={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="rfc"
                  label={`${
                    values.tipoEntidad === TipoEntidad.Local.value ? "*" : ""
                  }RFC`}
                  name="rfc"
                  sx={{ marginTop: 0 }}
                  value={values.rfc.toUpperCase()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.rfc && Boolean(errors.rfc)}
                  helperText={touched.rfc && errors.rfc?.toString()}
                  slotProps={{
                    htmlInput: {
                      maxLength:
                        values.tipoPersona === TipoPersona.Fisica.value
                          ? 13
                          : 12,
                      style: { textTransform: "uppercase" },
                    },
                  }}
                />
              </Grid>

              <Grid size={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="razonSocial"
                  label="*Raz&oacute;n Social"
                  name="razonSocial"
                  value={values.razonSocial.toUpperCase()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.razonSocial && Boolean(errors.razonSocial)}
                  helperText={
                    touched.razonSocial && errors.razonSocial?.toString()
                  }
                />
              </Grid>

              <Grid size={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="alias"
                  label="*Alias"
                  name="alias"
                  value={values.alias.toUpperCase()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.alias && Boolean(errors.alias)}
                  helperText={touched.alias && errors.alias?.toString()}
                />
              </Grid>

              <Grid size={4}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid size={4} sx={{ marginTop: 2 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="giroPrincipal"
                  label="Giro Principal"
                  name="giroPrincipal"
                  type="giroPrincipal"
                  value={values.giroPrincipal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={4} sx={{ marginTop: 4 }}>
                <AutoCompleteComponent
                  onChange={onChangeAutocomplete}
                  setValues={values.productos}
                  itemsList={giros}
                  maxItems={5}
                  title="Productos o Servicios"
                  id="giros-autocomplete"
                />
              </Grid>

              <Grid size={4} sx={{ marginTop: 4 }}>
                <FormControl
                  fullWidth
                  error={
                    touched.condicionesPago && Boolean(errors.condicionesPago)
                  }
                >
                  <InputLabel id="condiciones-pago-label">
                    *Condiciones de Pago
                  </InputLabel>
                  <Select
                    labelId="condiciones-pago-label"
                    id="condicionesPago"
                    name="condicionesPago"
                    label="Condiciones de Pago"
                    value={values.condicionesPago}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {plazoPagos?.map((plazo) => (
                      <MenuItem key={plazo.id} value={plazo.id}>
                        {plazo.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {touched.condicionesPago && errors.condicionesPago
                      ? errors.condicionesPago.toString()
                      : "Seleccione el plazo de pago para este proveedor"}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/proveedor")}>
              <NavigateBeforeIcon sx={{ marginRight: 1 }} />
              Regresar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {id && (
              <Button
                variant="outlined"
                type="submit"
                sx={{ mr: 1 }}
                disabled={disableButtons}
                onClick={() => setClickedBy(1)}
              >
                Modificar
                <SaveIcon sx={{ marginLeft: 1 }} />
              </Button>
            )}

            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              type="submit"
              variant="outlined"
              disabled={disableButtons}
              onClick={() => setClickedBy(0)}
            >
              Siguiente
              <NavigateNextIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
