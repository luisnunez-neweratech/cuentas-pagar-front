import { Grid } from "@mui/material";
import { HeaderButtons } from "./components/headerButtons/HeaderButtons";
import { Filters } from "./components/filters/Filters";
import { FacturaTable } from "./components/facturaTable/FacturaTable";

export const FacturasPage = () => {
  return (
    <Grid container spacing={2}>
      <HeaderButtons
        showFilter={false}
        onClickShowFilter={() => console.log("onclickshowfilter")}
      />
      <Filters showFilter={false} />
      <FacturaTable />
    </Grid>
  );
};
