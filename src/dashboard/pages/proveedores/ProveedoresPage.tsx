import { Grid } from "@mui/material";
import { HeaderButtons } from "./components/headerButtons/HeaderButtons";
import { Filters } from "./components/filters/Filters";
import { ProveedorTable } from "./components/proveedorTable/ProveedorTable";
import { useProveedoresPage } from "./hooks/useProveedoresPage";
import { NuevoProvedor } from "./components/nuevoProveedor/NuevoProveedor";

export const ProveedoresPage = () => {
  const { showFilter, onClickShowFilter } = useProveedoresPage();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <HeaderButtons {...{ onClickShowFilter, showFilter }} />
      <Filters {...{ showFilter }} />
      <ProveedorTable />
      <NuevoProvedor />
    </Grid>
  );
};
