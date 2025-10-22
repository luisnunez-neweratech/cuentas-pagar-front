import { Grid } from "@mui/material";
import { HeaderButtons } from "./headerButtons/HeaderButtons";
import { Filters } from "./filters/Filters";
import { ProveedorTable } from "./proveedorTable/ProveedorTable";

export const ProveedoresPage = () => {
  return (
    <Grid container spacing={2}>
      <HeaderButtons />
      <Filters />
      <ProveedorTable />
    </Grid>
  );
};
