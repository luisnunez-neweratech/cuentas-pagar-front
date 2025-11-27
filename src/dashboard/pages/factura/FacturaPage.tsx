import { Grid } from "@mui/material";
import { FacturaHeader } from "./components/facturaHeader/FacturaHeader";
import { FacturaDetalle } from "./components/facturaDetalle/FacturaDetalle";

export const FacturaPage = () => {
  return (
    <Grid container spacing={2}>
      <FacturaHeader />
      <FacturaDetalle />
    </Grid>
  );
};
