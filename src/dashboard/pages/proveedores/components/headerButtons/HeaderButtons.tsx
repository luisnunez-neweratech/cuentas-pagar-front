import { Grid, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { mainBackgroundColor } from "../../../../../lib/constants";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useHeaderButtons } from "./hooks/useHeaderButtons";
import { ActiveFilters } from "../activeFilters/ActiveFilters";

interface HeaderButtonsProps {
  showFilter: boolean;
  onClickShowFilter: () => void;
}

export const HeaderButtons = ({
  onClickShowFilter,
  showFilter,
}: HeaderButtonsProps) => {
  const { handleOpenModal, clearFiltros, downloadFile } = useHeaderButtons();

  return (
    <>
      <Grid size={1}>
        <Tooltip title="Nuevo Proveedor">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={handleOpenModal}
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

      <ActiveFilters />

      <Grid size={1}>
        <Tooltip title="Limpiar Filtros">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={clearFiltros}
          >
            <DeleteSweepIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={1}>
        <Tooltip title={`${showFilter ? "Ocultar" : "Mostrar"} Filtros`}>
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={onClickShowFilter}
          >
            {showFilter ? (
              <FilterListOffIcon
                style={{
                  height: "36px",
                  width: "36px",
                }}
              />
            ) : (
              <FilterListIcon
                style={{
                  height: "36px",
                  width: "36px",
                }}
              />
            )}
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={1}>
        <Tooltip title="Descargar lista de proveedores">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={downloadFile}
          >
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
