import { Button, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { mainBackgroundColor } from "../../../../../lib/constants";
import SaveIcon from "@mui/icons-material/Save";
import { useFacturaFooter } from "./hooks/useFacturaFooter";

export const FacturaFooter = () => {
  const {
    handlePdfFileChange,
    errors,
    disableButtons,
    pdfFileName,
    xmlFileName,
    handleXmlFileChange,
  } = useFacturaFooter();

  return (
    <>
      <Grid size={2} />
      <Grid size={3}>
        <input
          type="file"
          id="facturaPDF"
          style={{ display: "none" }}
          onChange={handlePdfFileChange}
          accept=".pdf"
        />

        <label htmlFor="facturaPDF">
          <Button variant="outlined" component="span" style={{ marginTop: 14 }}>
            Cargar Factura PDF
            <FileUploadIcon />
          </Button>
        </label>
        {errors.facturaPDF && (
          <p style={{ color: "#d32f2f", fontSize: "12px" }}>
            Archivo requerido
          </p>
        )}
      </Grid>
      <Grid size={4} sx={{ marginTop: 2 }}>
        {pdfFileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`Nombre del Archivo: ${pdfFileName}`}
          </p>
        )}
      </Grid>
      <Grid size={5} />

      <Grid size={3}>
        <input
          type="file"
          id="facturaXML"
          style={{ display: "none" }}
          onChange={handleXmlFileChange}
          accept=".xml"
        />

        <label htmlFor="facturaXML">
          <Button variant="outlined" component="span" style={{ marginTop: 14 }}>
            Cargar Factura XML
            <FileUploadIcon />
          </Button>
        </label>
        {errors.facturaXML && (
          <p style={{ color: "#d32f2f", fontSize: "12px" }}>
            Archivo requerido
          </p>
        )}
      </Grid>
      <Grid size={4} sx={{ marginTop: 2 }}>
        {xmlFileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`Nombre del Archivo: ${xmlFileName}`}
          </p>
        )}
      </Grid>

      <Grid size={3} />
      <Grid size={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: mainBackgroundColor }}
          fullWidth
          type="submit"
          disabled={disableButtons}
        >
          Guardar
          <SaveIcon sx={{ marginLeft: 1 }} />
        </Button>
      </Grid>
    </>
  );
};
