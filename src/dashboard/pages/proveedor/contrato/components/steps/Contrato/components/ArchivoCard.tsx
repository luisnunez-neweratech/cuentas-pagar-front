import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { ArchivoElement } from "./ArchivoElement";

interface props {
  contrato: boolean;
}

export const ArchivoCard = ({ contrato }: props) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Typography variant="h5" component="div">
              {contrato ? "Contrato" : "Propuesta"}
            </Typography>
          </Grid>

          <ArchivoElement
            title={contrato ? "*Contrato" : "*Propuesta"}
            multiple={false}
          />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="*CSF" multiple={false} />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="*Id Rep. Legal" multiple={false} />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="*Comp. Domicilio" multiple={false} />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="Poder Rep. Legal" multiple={false} />

          {contrato && (
            <>
              <Grid size={12}>
                <Divider />
              </Grid>
              <ArchivoElement
                title="Anexo"
                indeterminado={false}
                multiple={true}
              />
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
