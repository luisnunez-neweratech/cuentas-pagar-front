import { Grid } from "@mui/material";
import { HeaderButtons } from "./components/headerButtons/HeaderButtons";
import { Filters } from "./components/filters/Filters";
import { ProveedorTable } from "./components/proveedorTable/ProveedorTable";
import { useProveedoresPage } from "./hooks/useProveedoresPage";
import { NuevoProvedor } from "./components/nuevoProveedor/NuevoProveedor";
import { Comments } from "../../../components/common/comments/Comments";
import { useProveedorTableStore } from "./components/proveedorTable/store/ProveedorTable.store";

export const ProveedoresPage = () => {
  const { showFilter, onClickShowFilter } = useProveedoresPage();
  const { openModal, handleClose } = useProveedorTableStore();

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
      <Comments {...{ openModal, handleClose, isProveedor: true }} />
    </Grid>
  );
};
