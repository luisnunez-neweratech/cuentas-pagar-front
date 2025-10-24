import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AutoCompleteComponent } from "../../../../../../components/common/AutoComplete";
import { usePerfil } from "../../hooks/usePerfil";

export const Perfil = () => {
  const {
    tipoPersona,
    tipoEntidad,
    handleChangeTipoPersona,
    handleChangeTipoEntidad,
  } = usePerfil();

  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="tipo-entidad-label">Tipo Entidad</InputLabel>
          <Select
            labelId="tipo-entidad-label"
            id="tipo-entidad-select"
            value={tipoEntidad}
            label="Tipo Entidad"
            onChange={handleChangeTipoEntidad}
          >
            <MenuItem value="local">Local</MenuItem>
            <MenuItem value="extranjero">Extranjero</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel id="tipo-persona-label">Tipo Persona</InputLabel>
          <Select
            labelId="tipo-persona-label"
            id="tipo-persona-select"
            value={tipoPersona}
            label="Tipo Persona"
            onChange={handleChangeTipoPersona}
          >
            <MenuItem value="fisica">F&iacute;sica</MenuItem>
            <MenuItem value="moral">Moral</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="rfc"
          label="RFC"
          name="rfc"
          sx={{ marginTop: 0 }}
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="razonSocial"
          label="Raz&oacute;n Social"
          name="razonSocial"
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="alias"
          label="Alias"
          name="alias"
          /* value={values.alias}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.alias && Boolean(errors.alias)}
                  helperText={touched.alias && errors.alias} */
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
        />
      </Grid>

      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="giroPrincipal"
          label="Giro Principal"
          name="giroPrincipal"
          sx={{ marginTop: 4 }}
          /* value={values.giroPrincipal}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.giroPrincipal && Boolean(errors.giroPrincipal)}
          helperText={touched.giroPrincipal && errors.giroPrincipal} */
        />
      </Grid>

      <Grid size={4}>
        <AutoCompleteComponent />
      </Grid>
    </Grid>
  );
};
