import { Button, Grid } from "@mui/material";
import { useFacturaXml } from "./hooks/useFacturaXml";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { XmlLoadedModal } from "./components/xmlLoadedModal/XmlLoadedModal";
import { MassImportResultsModal } from "./components/massImportResultsModal/MassImportResultsModal";

export const FacturaXml = () => {
  const {
    handleXmlFileChange,
    xmlFileName,
    onClickCargarInformacion,
    openModal,
    onClickCloseModal,
    infoMessages,
    warningMessages,
    fileInputXmlRef,
    isLoading,
    openResultsModal,
    setOpenResultsModal
  } = useFacturaXml();

  return (
    <Grid container spacing={2} sx={{ marginTop: 3 }}>
      <Grid size={3} sx={{ marginTop: -5 }}>
        <>
          <input
            type="file"
            id="facturaXML"
            style={{ display: "none" }}
            onChange={handleXmlFileChange}
            ref={fileInputXmlRef}
            accept=".xml"
            multiple
          />

          <label htmlFor="facturaXML">
            <Button
              variant="outlined"
              component="span"
              style={{ marginTop: 14 }}
            >
              Seleccionar archivo(s) XML
              <FileUploadIcon />
            </Button>
          </label>
        </>
      </Grid>
      <Grid size={3} sx={{ marginTop: -4 }}>
        {xmlFileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`${xmlFileName}`}
          </p>
        )}
      </Grid>

      <Grid size={4} />
      <Grid size={2}>
        <Button
          variant="contained"
          disabled={xmlFileName.length === 0 || isLoading}
          onClick={onClickCargarInformacion}
        >
          Cargar Información
        </Button>
      </Grid>
      <XmlLoadedModal
        open={openModal}
        onClose={onClickCloseModal}
        warnings={warningMessages}
        info={infoMessages}
      />
      <MassImportResultsModal
        open={openResultsModal}
        onClose={() => setOpenResultsModal(false)}
      />
    </Grid>
  );
};
