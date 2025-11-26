import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useUniqueFilters } from "./hooks/useUniqueFilters";

export const UniqueFilters = () => {
  const {} = useUniqueFilters();

  return (
    <>
      <Grid size={3}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="noFactura"
          label="No. Factura"
          name="noFactura"
          /* value={noFactura}
          onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>
      <Grid size={3}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="year"
          label="Año"
          name="year"
          /* value={noFactura}
          onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>
      <Grid size={3} sx={{ paddingTop: 2 }}>
        <FormControl
          fullWidth
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="tipo-documento-label">Tipo Documento</InputLabel>
          <Select
            labelId="tipo-documento-label"
            id="tipoDocumento"
            name="tipoDocumento"
            label="Tipo Documento"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            <MenuItem value={0}>Factura</MenuItem>
            <MenuItem value={1}>Nota de Crédito</MenuItem>
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid size={3} sx={{ paddingTop: 2 }}>
        <FormControl
          fullWidth
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="moneda-label">Moneda</InputLabel>
          <Select
            labelId="moneda-label"
            id="moneda"
            name="moneda"
            label="Moneda"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            <MenuItem value={0}>MX</MenuItem>
            <MenuItem value={1}>DLLS</MenuItem>
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid size={3} sx={{ paddingTop: 2 }}>
        <FormControl
          fullWidth
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="nombre-colaborador-label">
            Nombre Colaborador
          </InputLabel>
          <Select
            labelId="nombre-colaborador-label"
            id="nombreColaborador"
            name="nombreColaborador"
            label="Nombre Colaborador"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            {/*  <MenuItem value={0}>MX</MenuItem> */}
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};
