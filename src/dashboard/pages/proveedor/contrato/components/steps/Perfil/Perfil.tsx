import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AutoCompleteComponent } from "../../../../../../../components/common/AutoComplete/AutoComplete";
import { usePerfil } from "./hooks/usePerfil";
import { TipoEntidad } from "../../../../interfaces/TipoEntidad";
import { TipoPersona } from "../../../../interfaces/TipoPersona";

export const Perfil = () => {
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onChangeAutocomplete,
    giros,
    setFieldValue,
  } = usePerfil();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
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
              <MenuItem value={TipoEntidad.Local}>{TipoEntidad.Local}</MenuItem>
              <MenuItem value={TipoEntidad.Extranjero}>
                {TipoEntidad.Extranjero}
              </MenuItem>
            </Select>
            <FormHelperText>
              {touched.tipoEntidad && errors.tipoEntidad
                ? errors.tipoEntidad
                : ""}
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
              <MenuItem value={TipoPersona.Fisica}>
                {TipoPersona.Fisica}
              </MenuItem>
              <MenuItem value={TipoPersona.Moral}>{TipoPersona.Moral}</MenuItem>
            </Select>
            <FormHelperText>
              {touched.tipoPersona && errors.tipoPersona
                ? errors.tipoPersona
                : ""}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="rfc"
            label={`${values.tipoEntidad === TipoEntidad.Local ? "*" : ""}RFC`}
            name="rfc"
            sx={{ marginTop: 0 }}
            value={values.rfc}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rfc && Boolean(errors.rfc)}
            helperText={touched.rfc && errors.rfc}
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
            value={values.razonSocial}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.razonSocial && Boolean(errors.razonSocial)}
            helperText={touched.razonSocial && errors.razonSocial}
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
            value={values.alias}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.alias && Boolean(errors.alias)}
            helperText={touched.alias && errors.alias}
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

        <Grid size={4} sx={{ marginTop: 4 }}>
          <Autocomplete
            freeSolo
            options={giros.map((giro) => giro.descripcion)}
            onChange={(_e, newvalue) => {
              setFieldValue("giroPrincipal", newvalue);
            }}
            value={values.giroPrincipal}
            renderInput={(params) => (
              <TextField
                {...params}
                id="giroPrincipal"
                name="giroPrincipal"
                label="Giro Principal"
                value={values.giroPrincipal}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.giroPrincipal && Boolean(errors.giroPrincipal)}
                helperText={touched.giroPrincipal && errors.giroPrincipal}
              />
            )}
          />
        </Grid>
        <Grid size={4}>
          <AutoCompleteComponent
            onChange={onChangeAutocomplete}
            setValues={values.productos}
          />
        </Grid>

        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button type="submit">Siguiente</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
