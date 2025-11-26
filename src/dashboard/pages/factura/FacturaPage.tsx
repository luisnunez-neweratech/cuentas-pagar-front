import { Grid } from "@mui/material";
import { FacturaHeader } from "./components/facturaHeader/FacturaHeader";

export const FacturaPage = () => {

  return (
    <Grid container spacing={2}>
      <FacturaHeader />
    </Grid>
  );
};
