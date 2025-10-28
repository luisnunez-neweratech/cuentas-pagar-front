import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContrato } from "./hooks/useContrato";
import { ColaboradorMoral } from "./components/ColaboradorMoral";
import { ArchivoCard } from "./components/ArchivoCard";
import { mainBackgroundColor } from "../../../../../../../lib/constants";

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
    checkContractor,
    setCheckContractor,
  } = useContrato();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
        <Grid size={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkContractor}
                onChange={() => setCheckContractor(!checkContractor)}
              />
            }
            label="Contractor"
            sx={{ marginTop: 3 }}
          />
        </Grid>
        {/* colaborador fisico */}
        {checkContractor && getStepPerfil()?.tipoPersona === "fisica" && (
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
        )}
        {checkContractor && getStepPerfil()?.tipoPersona !== "fisica" && (
          <ColaboradorMoral />
        )}
        {!checkContractor && <Grid size={10} />}
        <Grid size={12} sx={{ marginTop: 1 }}>
          <Typography variant="h5" component="div">
            Documentos
          </Typography>
        </Grid>
        <Grid size={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={tipoArchivos === 0}
                onChange={() => handleChangeTipoArchivo(0)}
                disabled={tipoArchivos === 0}
                sx={{
                  "&.Mui-disabled": {
                    color: mainBackgroundColor,
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
                    color: mainBackgroundColor,
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
