import { Grid } from "@mui/material";
import { HeaderButtons } from "./components/headerButtons/HeaderButtons";
import { Filters } from "./components/filters/Filters";
import { FacturaTable } from "./components/facturaTable/FacturaTable";
import { useFacturasPage } from "./hooks/useFacturasPage";
import { DetalleFacturaModal } from "./components/detalleFacturaModal/DetalleFacturaModal";
import { NuevaFactura } from "./components/nuevaFactura/NuevaFactura";
import { Comments } from "../../../components/common/comments/Comments";

export const FacturasPage = () => {
  const {
    showFilter,
    onClickShowFilter,
    openCommentsModal,
    handleCloseCommentsModal,
  } = useFacturasPage();

  return (
    <Grid container spacing={2}>
      <HeaderButtons {...{ onClickShowFilter, showFilter }} />
      <Filters {...{ showFilter }} />
      <FacturaTable />
      <DetalleFacturaModal />
      <NuevaFactura />
      <Comments
        openModal={openCommentsModal}
        handleClose={handleCloseCommentsModal}
      />
    </Grid>
  );
};
