import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { AutoCompleteComponent } from "../../../../components/common/AutoComplete/AutoComplete";
import { useProveedorOcasional } from "./hooks/useProveedorOcasional";
import { mainBackgroundColor } from "../../../../lib/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { TipoEntidad } from "../interfaces/TipoEntidad";
import { TipoPersona } from "../interfaces/TipoPersona";

export const ProveedorOcasionalPage = () => {
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    id,
    onClickEliminar,
    onChangeAutocomplete,
    giros,
    setFieldValue,
    actualizarProveedor,
  } = useProveedorOcasional();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={10} />
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
              label="*Tipo Entidad"
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
              label="*Tipo Persona"
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
            value={values.rfc}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rfc && Boolean(errors.rfc)}
            helperText={touched.rfc && errors.rfc?.toString()}
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
            helperText={touched.razonSocial && errors.razonSocial?.toString()}
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

        <Grid size={4} sx={{ marginTop: 4 }}>
          <Autocomplete
            freeSolo
            options={giros.map((giro) => giro.descripcion)}
            onChange={(_e, newvalue) =>
              setFieldValue("giroPrincipal", newvalue)
            }
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
        <Grid size={4} />
        <Grid size={id ? 4 : 10} />
        {id ? (
          <>
            <Grid size={4}>
              <Button
                variant="contained"
                sx={{ backgroundColor: mainBackgroundColor }}
                fullWidth
                type="button"
                onClick={actualizarProveedor}
              >
                Actualizar a Contrato
                <UpgradeIcon sx={{ marginLeft: 1 }} />
              </Button>
            </Grid>
            <Grid size={2}>
              <Button
                variant="contained"
                sx={{ backgroundColor: mainBackgroundColor }}
                fullWidth
                type="submit"
              >
                Modificar
                <SaveIcon sx={{ marginLeft: 1 }} />
              </Button>
            </Grid>
            <Grid size={2}>
              <Button
                variant="contained"
                sx={{ backgroundColor: mainBackgroundColor }}
                fullWidth
                type="button"
                onClick={onClickEliminar}
              >
                Eliminar
                <DeleteIcon sx={{ marginLeft: 1 }} />
              </Button>
            </Grid>
          </>
        ) : (
          <Grid size={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: mainBackgroundColor }}
              fullWidth
              type="submit"
            >
              Guardar
              <SaveIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};
