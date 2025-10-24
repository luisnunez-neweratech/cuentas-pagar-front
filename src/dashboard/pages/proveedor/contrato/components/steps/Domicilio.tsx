import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../../../../../../lib/constants";

export const Domicilio = () => {
  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      <Grid size={4}>
        <Autocomplete
          fullWidth
          id="country-select-demo"
          sx={{ marginTop: "16px" }}
          options={countries}
          autoHighlight
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
              label="Pa&iacute;s"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="codigoPostal"
          label="C&oacute;digo Postal"
          name="codigoPostal"
        />
      </Grid>
      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="estado"
          label="Estado"
          name="estado"
        />
      </Grid>
      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="municipio"
          label="Municipio"
          name="municipio"
        />
      </Grid>
      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="ciudad"
          label="Ciudad"
          name="ciudad"
        />
      </Grid>
      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="colonia"
          label="Colonia"
          name="colonia"
        />
      </Grid>
      <Grid size={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="calle"
          label="Calle"
          name="calle"
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
        />
      </Grid>
    </Grid>
  );
};
