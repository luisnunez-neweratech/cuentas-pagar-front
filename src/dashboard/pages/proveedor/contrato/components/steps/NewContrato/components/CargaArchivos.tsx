import { Grid, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { mainBackgroundColor } from "../../../../../../../../lib/constants";
import { ArchivoElement } from "./ArchivoElement";
import { useCargaArchivos } from "../hooks/useCargaArchivos";
import { ArchivoPrincipal } from "./ArchivoPrincipal";
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface myProps {
  validateDocuments: number;
}

export const CargaArchivos = ({ validateDocuments }: myProps) => {
  const {
    newStepContrato,
    clickAddArchivo,
    deleteDocumento /* enviarArchivos */,
    tipoEntidad,
  } = useCargaArchivos();

  return (
    <Grid container>
      <Grid size={12}>
        <h3>Documento Principal</h3>
        <ArchivoPrincipal validateDocuments={validateDocuments} />
      </Grid>

      {tipoEntidad !== 1 && (
        <>
          <Grid size={12}>
            <h3>Documentos</h3>
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
          </Grid>

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
        </>
      )}
    </Grid>
  );
};
