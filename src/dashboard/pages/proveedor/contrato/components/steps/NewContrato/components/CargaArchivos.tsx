import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import { ArchivoElement } from "./ArchivoElement";
import { useCargaArchivos } from "../hooks/useCargaArchivos";

export const CargaArchivos = () => {
  const { newStepContrato, clickAddArchivo } = useCargaArchivos();

  return (
    <Grid container>
      {(newStepContrato?.documentos ?? []).map((item) => (
        <ArchivoElement />
      ))}

      <Grid size={11} />
      <Grid size={1}>
        <Tooltip title="Agregar Nuevo Documento">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => clickAddArchivo()}
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
