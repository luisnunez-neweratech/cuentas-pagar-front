import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ArchivoElement } from "./ArchivoElement";

interface props {
  title: string;
}

export const ArchivoCard = ({ title }: props) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </Grid>

          <ArchivoElement title={title} />
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
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement title="Anexo" indeterminado={false} />
          <Grid size={12}>
            <Divider />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
