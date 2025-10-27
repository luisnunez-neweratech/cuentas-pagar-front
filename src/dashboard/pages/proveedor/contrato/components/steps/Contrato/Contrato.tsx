import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useContrato } from "./hooks/useContrato";
import { ColaboradorMoral } from "./components/ColaboradorMoral";
import { ArchivoCard } from "./components/ArchivoCard";

export const Contrato = () => {
  const { handleBack, getStepPerfil } = useContrato();

  return (
    <form /* onSubmit={handleSubmit} */>
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
                /* value={values.razonSocial}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.razonSocial && Boolean(errors.razonSocial)}
            helperText={touched.razonSocial && errors.razonSocial} */
              />
            </Grid>
            <Grid size={9} />
          </>
        ) : (
          <ColaboradorMoral />
        )}

        <Grid size={2}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Contrato"
          />
        </Grid>
        <Grid size={2}>
          <FormControlLabel
            control={<Checkbox />}
            label="Propuesta"
          />
        </Grid>

        <Grid size={12}>
          <ArchivoCard title="Contrato" />
        </Grid>

       {/*  <Grid size={6}>
          <ArchivoCard title="Propuesta" />
        </Grid>
        <Grid size={3}>
          <ArchivoCard title="CSF" />
        </Grid>
        <Grid size={3}>
          <ArchivoCard title="Id Rep Legal" />
        </Grid>
        <Grid size={3}>
          <ArchivoCard title="Comp Domicilio" />
        </Grid>
        <Grid size={3}>
          <ArchivoCard title="Poder Rep Legal" />
        </Grid>
        <Grid size={3}>
          <ArchivoCard title="Anexo" indeterminado={false} />
        </Grid> */}

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
