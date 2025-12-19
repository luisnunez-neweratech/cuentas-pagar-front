import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNewContrato } from "./hooks/useNewContrato";
import { TipoPersona } from "../../../../interfaces/TipoPersona";
import { ColaboradorMoral } from "./components/ColaboradorMoral";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { TabsDocumentos } from "./components/TabsDocumentos";

export const NewContrato = () => {
  const {
    handleBack,
    getStepPerfil,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    checkContractor,
    onChangeContractor,
    onClickNext,
    disableButtons,
    id,
    setClickedBy,
    validateColaboradores,
    validateDocuments,
  } = useNewContrato();

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

        {/* nuevos documentos */}
        <TabsDocumentos validateDocuments={validateDocuments} />

        <Grid size={12}>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
              <NavigateBeforeIcon sx={{ marginRight: 1 }} />
              Atras
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
