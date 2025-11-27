import { Grid } from "@mui/material";
import { FacturaHeader } from "./components/facturaHeader/FacturaHeader";
import { FacturaDetalle } from "./components/facturaDetalle/FacturaDetalle";
import { FacturaFooter } from "./components/facturaFooter/FacturaFooter";

export const FacturaPage = () => {
  return (
    <Grid container spacing={2}>
      <FacturaHeader />
      <FacturaDetalle />
      <FacturaFooter />
    </Grid>
  );
};
