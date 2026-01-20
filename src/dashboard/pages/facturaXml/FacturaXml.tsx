import { Button, Grid } from "@mui/material";
import { useFacturaXml } from "./hooks/useFacturaXml";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { XmlLoadedModal } from "./components/xmlLoadedModal/XmlLoadedModal";

export const FacturaXml = () => {
  const {
    handleXmlFileChange,
    xmlFileName,
    handlePdfFileChange,
    pdfFileName,
    onClickCargarInformacion,
    openModal,
    onClickCloseModal,
    infoMessages,
    warningMessages,
    fileInputXmlRef
  } = useFacturaXml();

  return (
    <Grid container spacing={2} sx={{ marginTop: 3 }}>
      <Grid size={2} sx={{ marginTop: -5 }}>
        <>
          <input
            type="file"
            id="facturaXML"
            style={{ display: "none" }}
            onChange={handleXmlFileChange}
            ref={fileInputXmlRef}
            accept=".xml"
          />

          <label htmlFor="facturaXML">
            <Button
              variant="outlined"
              component="span"
              style={{ marginTop: 14 }}
            >
              Seleccionar XML
              <FileUploadIcon />
            </Button>
          </label>
        </>
      </Grid>
      <Grid size={3} sx={{ marginTop: -4 }}>
        {xmlFileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`Nombre del Archivo: ${xmlFileName}`}
          </p>
        )}
      </Grid>

      <Grid size={4} />
      <Grid size={2}>
        <Button
          variant="contained"
          disabled={xmlFileName.length === 0}
          onClick={onClickCargarInformacion}
        >
          Cargar Información
        </Button>
      </Grid>
      <Grid size={2} sx={{ marginTop: 0 }}>
        <>
          <input
            type="file"
            id="facturaPDF"
            style={{ display: "none" }}
            onChange={handlePdfFileChange}
            accept=".pdf"
          />

          <label htmlFor="facturaPDF">
            <Button
              variant="outlined"
              component="span"
              style={{ marginTop: 14 }}
            >
              Seleccionar PDF
              <FileUploadIcon />
            </Button>
          </label>
        </>
      </Grid>
      <Grid size={3} sx={{ marginTop: 1 }}>
        {pdfFileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`Nombre del Archivo: ${pdfFileName}`}
          </p>
        )}
      </Grid>
      <XmlLoadedModal
        open={openModal}
        onClose={onClickCloseModal}
        warnings={warningMessages}
        info={infoMessages}
      />
    </Grid>
  );
};
