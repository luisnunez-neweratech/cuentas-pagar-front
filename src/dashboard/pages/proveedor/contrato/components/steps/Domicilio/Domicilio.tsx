import { useRef } from "react";
import { Autocomplete as AutocompleteGoogle } from "@react-google-maps/api";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../../../../../../../lib/constants";
import { useDomicilio } from "./hooks/useDomicilio";

export const Domicilio = () => {
  const inputRef = useRef<any | null>(null);
  const {
    handleBack,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    handleOnPlacesChanged,
    isLoaded,
    optionPais,
    setOptionPais,
  } = useDomicilio(inputRef);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
        <Grid size={4}>
          <Autocomplete
            fullWidth
            id="country-select-demo"
            sx={{ marginTop: "16px" }}
            options={countries}
            autoHighlight
            value={optionPais}
            onChange={(_e, value) => {
              setFieldValue("pais", value?.label);
              setOptionPais(value);
            }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li" {...optionProps}>
                  {option.label}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="pais"
                name="pais"
                label="*Pa&iacute;s"
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: "new-password",
                  },
                }}
                onChange={handleChange}
                value={values.pais}
                onBlur={handleBlur}
                error={touched.pais && Boolean(errors.pais)}
                helperText={touched.pais && errors.pais}
              />
            )}
          />
        </Grid>
        <Grid size={4}>
          {isLoaded && (
            <AutocompleteGoogle
              onLoad={(ref) => (inputRef.current = ref)}
              onPlaceChanged={handleOnPlacesChanged}
              options={{
                componentRestrictions: {
                  country: optionPais ? optionPais.code : "MX",
                },
                fields: ["address_components", "formatted_address"],
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="*C&oacute;digo Postal"
                type="number"
                id="codigoPostal"
                name="codigoPostal"
                onChange={handleChange}
                value={values.codigoPostal}
                onBlur={handleBlur}
                error={touched.codigoPostal && Boolean(errors.codigoPostal)}
                helperText={touched.codigoPostal && errors.codigoPostal}
              />
            </AutocompleteGoogle>
          )}
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="estado"
            label="*Estado"
            name="estado"
            value={values.estado}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.estado && Boolean(errors.estado)}
            helperText={touched.estado && errors.estado}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="municipio"
            label="*Municipio"
            name="municipio"
            value={values.municipio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.municipio && Boolean(errors.municipio)}
            helperText={touched.municipio && errors.municipio}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="ciudad"
            label="*Ciudad"
            name="ciudad"
            value={values.ciudad}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.ciudad && Boolean(errors.ciudad)}
            helperText={touched.ciudad && errors.ciudad}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="colonia"
            label="*Colonia"
            name="colonia"
            value={values.colonia}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.colonia && Boolean(errors.colonia)}
            helperText={touched.colonia && errors.colonia}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="calle"
            label="*Calle"
            name="calle"
            value={values.calle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.calle && Boolean(errors.calle)}
            helperText={touched.calle && errors.calle}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="numInterior"
            label="# Interior"
            name="numInterior"
            value={values.numInterior}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="numExterior"
            label="# Exterior"
            name="numExterior"
            value={values.numExterior}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button type="submit">Siguiente</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
