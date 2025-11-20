import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import { ArchivoElement } from "./ArchivoElement";
import { useCargaArchivos } from "../hooks/useCargaArchivos";
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface myProps {
  validateDocuments: number
}

export const CargaArchivos = ({validateDocuments}:myProps) => {
  const {
    newStepContrato,
    clickAddArchivo,
    deleteDocumento /* enviarArchivos */,
  } = useCargaArchivos();

  return (
    <Grid container>
      {(newStepContrato?.documentos ?? []).map((item) => (
        <ArchivoElement
          key={item.id}
          id={item.id!}
          deleteDocumento={deleteDocumento}
          //isValidForm={isValidForm}
          validateDocuments={validateDocuments}
          total={newStepContrato?.documentos?.length!}
          idInput={`file${item.id}`}
        />
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
      {/*  <Grid size={1}>
        <Tooltip title="Cargar Documentos">
          <IconButton
            sx={{ color: mainBackgroundColor }}
            onClick={() => enviarArchivos()}
          >
            <CloudUploadIcon
              style={{
                height: "36px",
                width: "36px",
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid> */}
    </Grid>
  );
};
