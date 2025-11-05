import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { ArchivoElement } from "./ArchivoElement";
import { TipoDocumento } from "../../../../../interfaces/TipoDocumento";

interface props {
  contrato: boolean;
}

export const ArchivoCard = ({ contrato }: props) => {
  return (
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
          />
          
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement
            title="*CSF"
            multiple={false}
            idInput="fileCSF"
            tipoDocumento={TipoDocumento.csf}
          />
          {/*
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement
            title="*Id Rep. Legal"
            multiple={false}
            idInput="fileIdRepLegal"
            isValidForm={isValidForm}
            tipoDocumento={TipoDocumento.idRepLegal}
          />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement
            title="*Comp. Domicilio"
            multiple={false}
            idInput="fileCompDomicilio"
            isValidForm={isValidForm}
            tipoDocumento={TipoDocumento.compDomicilio}
          />
          <Grid size={12}>
            <Divider />
          </Grid>
          <ArchivoElement
            title="Poder Rep. Legal"
            multiple={false}
            idInput="filePoderRepLegal"
            isValidForm={isValidForm}
            tipoDocumento={TipoDocumento.poderRepLegal}
          />                
          {contrato && (
            <>
              <Grid size={12}>
                <Divider />
              </Grid>
              <ArchivoElement
                title="Anexo"
                indeterminado={false}
                multiple={true}
                idInput="fileAnexo"
                isValidForm={isValidForm}
                tipoDocumento={TipoDocumento.anexo}
              />
            </>
          )} */}
        </Grid>
      </CardContent>
    </Card>
  );
};
