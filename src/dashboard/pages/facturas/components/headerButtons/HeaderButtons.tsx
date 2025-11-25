import { Grid, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { mainBackgroundColor } from "../../../../../lib/constants";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useHeaderButtons } from "./hooks/useHeaderButtons";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface HeaderButtonsProps {
  showFilter: boolean;
  onClickShowFilter: () => void;
}

export const HeaderButtons = ({
  onClickShowFilter,
  showFilter,
}: HeaderButtonsProps) => {
  const { handleOpenModal, clearFiltros, downloadFile, hasActiveFiltres } =
    useHeaderButtons();

  return (
    <>
      <Grid size={1}>
       {/*  <Tooltip title="Nuevo Proveedor">
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
        </Tooltip> */}
      </Grid>

      {hasActiveFiltres && !showFilter && (
        <Grid size={1}>
          <Stack spacing={1} sx={{ alignItems: "center", marginTop: 1 }}>
            <Stack direction="row" spacing={1}>
              <Chip label="Filtros Activos" color="primary" />
            </Stack>
          </Stack>
        </Grid>
      )}

      <Grid size={hasActiveFiltres && !showFilter ? 7 : 8} />

      <Grid size={1}>
        {showFilter && (
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
        )}
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
        <Tooltip title="Descargar lista de facturas">
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
