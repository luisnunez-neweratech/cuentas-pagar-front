import { useNavigate } from "react-router";
import { Grid, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mainBackgroundColor } from "../../../../lib/constants";

export const HeaderButtons = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid size={1}>
        <Tooltip title="Nuevo Proveedor">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => navigate("nuevo")}
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
      <Grid size={9} />
      <Grid size={1}>
        <Tooltip title="Mostrar Filtros">
          <IconButton sx={{ color: mainBackgroundColor }}>
            <FilterListIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={1}>
        <Tooltip title="Descargar lista de proveedores">
          <IconButton sx={{ color: mainBackgroundColor }}>
            <FileDownloadIcon
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
