import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { ArchivoElement } from "./ArchivoElement";
import { TipoDocumento } from "../../../../../interfaces/TipoDocumento";

interface props {
  contrato: boolean;
  validateDocuments: number;
}

export const ArchivoCard = ({ contrato, validateDocuments }: props) => {
  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={12}>
              <Typography variant="h6" component="div">
                {contrato ? "Contrato" : "Propuesta"}
              </Typography>
            </Grid>
            <ArchivoElement
              title={contrato ? "*Contrato" : "*Propuesta"}
              multiple={false}
              idInput={contrato ? "fileContrato" : "filePropuesta"}
              tipoDocumento={TipoDocumento.principal}
              validateDocuments={validateDocuments}
              addToContrato={!contrato}
            />

            <Grid size={12}>
              <Divider />
            </Grid>
            <ArchivoElement
              title="Anexo"
              indeterminado={false}
              multiple={true}
              idInput="fileAnexo"
              tipoDocumento={TipoDocumento.anexo}
              optional={true}
              validateDocuments={validateDocuments}
            />
          </Grid>
        </CardContent>
      </Card>
      <Card elevation={3} sx={{ marginTop: 4 }}>
        <CardContent>
          <Grid container spacing={1}>
            <ArchivoElement
              title="*CSF"
              multiple={false}
              idInput="fileCSF"
              tipoDocumento={TipoDocumento.csf}
              validateDocuments={validateDocuments}
            />

            <Grid size={12}>
              <Divider />
            </Grid>
            <ArchivoElement
              title="*Id Rep. Legal"
              multiple={false}
              idInput="fileIdRepLegal"
              tipoDocumento={TipoDocumento.idRepLegal}
              validateDocuments={validateDocuments}
            />

            <Grid size={12}>
              <Divider />
            </Grid>
            <ArchivoElement
              title="*Comp. Domicilio"
              multiple={false}
              idInput="fileCompDomicilio"
              tipoDocumento={TipoDocumento.compDomicilio}
              validateDocuments={validateDocuments}
            />
            <Grid size={12}>
              <Divider />
            </Grid>
            <ArchivoElement
              title="Poder Rep. Legal"
              multiple={false}
              idInput="filePoderRepLegal"
              tipoDocumento={TipoDocumento.poderRepLegal}
              optional={true}
              validateDocuments={validateDocuments}
            />
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
