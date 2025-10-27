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

          <ArchivoElement title={contrato ? "Contrato" : "Propuesta"} />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="CSF" />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="Id Rep. Legal" />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="Comp. Domicilio" />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="Poder Rep. Legal" />
          <Grid size={12}>
            <Divider />
          </Grid>
          
          {contrato && <ArchivoElement title="Anexo" indeterminado={false} />}
        </Grid>
      </CardContent>
    </Card>
  );
};
