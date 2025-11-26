import { Grid } from "@mui/material";
import { HeaderButtons } from "./components/headerButtons/HeaderButtons";
import { Filters } from "./components/filters/Filters";
import { FacturaTable } from "./components/facturaTable/FacturaTable";
import { useFacturasPage } from "./hooks/useFacturasPage";
import { DetalleFactura } from "./components/detalleFactura/DetalleFactura";

export const FacturasPage = () => {
  const { showFilter, onClickShowFilter } = useFacturasPage();

  return (
    <Grid container spacing={2}>
      <HeaderButtons {...{ onClickShowFilter, showFilter }} />
      <Filters {...{ showFilter }} />
      <FacturaTable />
      <DetalleFactura />
    </Grid>
  );
};
