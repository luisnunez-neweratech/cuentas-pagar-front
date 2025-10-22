import { Grid } from "@mui/material";
import { HeaderButtons } from "./headerButtons/HeaderButtons";
import { Filters } from "./filters/Filters";
import { ProveedorTable } from "./proveedorTable/ProveedorTable";
import { useProveedoresPage } from "./hooks/useProveedoresPage";

export const ProveedoresPage = () => {
  const { showFilter, onClickShowFilter } = useProveedoresPage();

  return (
    <Grid container spacing={2}>
      <HeaderButtons {...{ onClickShowFilter, showFilter }} />
      <Filters {...{ showFilter }} />
      <ProveedorTable />
    </Grid>
  );
};
