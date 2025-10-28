import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useContrato } from "./hooks/useContrato";
import { ColaboradorMoral } from "./components/ColaboradorMoral";
import { ArchivoCard } from "./components/ArchivoCard";

export const Contrato = () => {
  const {
    handleBack,
    getStepPerfil,
    handleChangeTipoArchivo,
    tipoArchivos,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useContrato();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
        {/* colaborador fisico */}
        {getStepPerfil()?.tipoPersona === "fisica" ? (
          <>
            <Grid size={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="noColaborador"
                label="Num. Colaborador"
                name="noColaborador"
                value={values.noColaborador}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.noColaborador && Boolean(errors.noColaborador)}
                helperText={touched.noColaborador && errors.noColaborador}
              />
            </Grid>
            <Grid size={9} />
          </>
        ) : (
          <ColaboradorMoral />
        )}

        <Grid size={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={tipoArchivos === 0}
                onChange={() => handleChangeTipoArchivo(0)}
                disabled={tipoArchivos === 0}
                sx={{
                  "&.Mui-disabled": {
                    color: "blue",
                  },
                }}
              />
            }
            label="Contrato"
          />
        </Grid>
        <Grid size={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={tipoArchivos === 1}
                onChange={() => handleChangeTipoArchivo(1)}
                disabled={tipoArchivos === 1}
                sx={{
                  "&.Mui-disabled": {
                    color: "blue",
                  },
                }}
              />
            }
            label="Propuesta"
          />
        </Grid>

        <Grid size={12}>
          <ArchivoCard contrato={tipoArchivos === 0} />
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
