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
import { TipoPersona } from "../../../../interfaces/TipoPersona";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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
    onChangeContractor,
    validateDocuments,
    onClickNext,
    disableButtons,
    id,
    setClickedBy,
    validateColaboradores,
  } = useContrato();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ marginTop: 4 }} spacing={2}>
        <Grid size={2}>
          <FormControlLabel
            control={
              <Checkbox
                id="checkContractor"
                name="checkContractor"
                checked={checkContractor}
                onChange={onChangeContractor}
              />
            }
            label="Contractor"
            sx={{ marginTop: 3 }}
          />
        </Grid>
        {/* colaborador fisico */}
        {checkContractor &&
          getStepPerfil()?.tipoPersona === TipoPersona.Fisica.value && (
            <>
              <Grid size={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="noColaborador"
                  label="*Num. Colaborador"
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
        {checkContractor &&
          getStepPerfil()?.tipoPersona !== TipoPersona.Fisica.value && (
            <ColaboradorMoral validateColaboradores={validateColaboradores} />
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
          <ArchivoCard
            contrato={tipoArchivos === 0}
            validateDocuments={validateDocuments}
          />
        </Grid>

        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
              Atras
              <NavigateBeforeIcon sx={{ marginLeft: 1 }} />
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {id && (
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                type="submit"
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
              onClick={onClickNext}
              disabled={disableButtons}
              variant="outlined"
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
