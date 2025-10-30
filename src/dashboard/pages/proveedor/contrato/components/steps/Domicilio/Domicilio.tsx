import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../../../../../../../lib/constants";
import { useDomicilio } from "./hooks/useDomicilio";
import {
  useJsApiLoader,
  Autocomplete as AutocompleteGoogle,
} from "@react-google-maps/api";
import { useRef } from "react";

export const Domicilio = () => {
  const {
    handleBack,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useDomicilio();
  const inputRef = useRef<any | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const handleOnPlacesChanged = () => {
    let address = inputRef.current.getPlace();
    //setFieldValue("codigoPostal", "28019");
    console.log("address", address);
    if (address && address?.address_components.length > 0) {
      const colonia = address?.address_components.filter(
        (addressFound: any) => {
          if (addressFound.types.includes("sublocality")) {
            return addressFound;
          }
        }
      );
      if (colonia.length > 0) {
        setFieldValue("colonia", colonia[0].long_name);
      }

      const ciudad = address?.address_components.filter((addressFound: any) => {
        if (addressFound.types.includes("locality")) {
          return addressFound;
        }
      });
      if (ciudad.length > 0) {
        setFieldValue("ciudad", ciudad[0].long_name);
        setFieldValue("municipio", ciudad[0].long_name);
      }

      const estado = address?.address_components.filter(
        (addressFound: any) => {
          if (addressFound.types.includes("administrative_area_level_1")) {
            return addressFound;
          }
        }
      );
      if (estado.length > 0) {
        setFieldValue("estado", estado[0].long_name);
      }
    }
  };

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
            onChange={(_e, value) => setFieldValue("pais", value?.label)}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
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
                value={values.pais}
                onChange={handleChange}
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
                componentRestrictions: { country: "MX" },
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
        {/*  <Grid size={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="codigoPostal"
            name="codigoPostal"
            label="*C&oacute;digo Postal"
            value={values.codigoPostal}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.codigoPostal && Boolean(errors.codigoPostal)}
            helperText={touched.codigoPostal && errors.codigoPostal}
          />
        </Grid> */}
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
