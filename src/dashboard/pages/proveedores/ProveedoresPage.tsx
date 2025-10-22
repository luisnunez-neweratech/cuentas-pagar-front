import { Grid } from "@mui/material";
import { HeaderButtons } from "./headerButtons/HeaderButtons";
import { Filters } from "./filters/Filters";

export const ProveedoresPage = () => {
  return (
    <Grid container spacing={2}>
      <HeaderButtons />
      <Filters />
    </Grid>
  );
};
