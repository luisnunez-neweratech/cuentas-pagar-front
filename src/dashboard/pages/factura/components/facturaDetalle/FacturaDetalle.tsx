import { Grid, IconButton, Tooltip } from "@mui/material";
import { DetalleTable } from "./detalleTable/DetalleTable";
import { mainBackgroundColor } from "../../../../../lib/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useFacturaDetalle } from "./hooks/useFacturaDetalle";

interface props {
  onClickGuardar: number;
}

export const FacturaDetalle = ({ onClickGuardar }: props) => {
  const { clickAddRowDetalle } = useFacturaDetalle();

  return (
    <>
      <Grid size={10} sx={{ marginTop: -30 }}>
        <DetalleTable onClickGuardar={onClickGuardar} />
      </Grid>
      <Grid size={10} />
      <Grid size={1} >
        <Tooltip title="Agregar Detalle">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={clickAddRowDetalle}
          >
            <AddCircleIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};
