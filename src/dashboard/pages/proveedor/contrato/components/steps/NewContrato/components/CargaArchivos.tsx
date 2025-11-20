import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import { ArchivoElement } from "./ArchivoElement";

export const CargaArchivos = () => {
  return (
    <Grid container>
      <ArchivoElement />

      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Nuevo Documento">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            // onClick={() => clickAddColaborador()}
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
    </Grid>
  );
};
