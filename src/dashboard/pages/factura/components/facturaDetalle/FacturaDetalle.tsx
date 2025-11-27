import { Grid, IconButton, Tooltip } from "@mui/material";
import { DetalleTable } from "./detalleTable/DetalleTable";
import { mainBackgroundColor } from "../../../../../lib/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const FacturaDetalle = () => {
  return (
    <>
      <Grid size={1} sx={{ marginTop: -30 }}>
        <Tooltip title="Agregar Detalle">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            //onClick={() => navigate("/facturas/nueva-factura")}
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
      <Grid size={8}/>
      <Grid size={10} sx={{ marginTop: -25 }}>
        <DetalleTable />
      </Grid>
    </>
  );
};
