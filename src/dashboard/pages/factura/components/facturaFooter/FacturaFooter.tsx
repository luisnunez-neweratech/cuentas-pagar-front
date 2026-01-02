import { Button, Grid, IconButton, Link, Tooltip } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { mainBackgroundColor } from "../../../../../lib/constants";
import SaveIcon from "@mui/icons-material/Save";
import { useFacturaFooter } from "./hooks/useFacturaFooter";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  onClickGuardar: number;
  setOnClickGuardar: (value: any) => void;
}

export const FacturaFooter = ({ onClickGuardar, setOnClickGuardar }: props) => {
  const {
    handlePdfFileChange,
    errors,
    disableButtons,
    pdfFileName,
    xmlFileName,
    paymentProofFileName,
    handleXmlFileChange,
    handlePaymentProofFileChange,
    tipoEntidadId,
    pdfDownloadUrl,
    xmlDownloadUrl,
    paymentProofDownloadUrl,
    deleteFacturaDocumentoMutation,
    id,
  } = useFacturaFooter();

  return (
    <>
      {!pdfDownloadUrl ? (
        <>
          <Grid size={3}>
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
          <Grid size={4} sx={{ marginTop: 3 }}>
            {pdfFileName && (
              <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
                {`Nombre del Archivo: ${pdfFileName}`}
              </p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid size={3} sx={{ marginTop: 3 }}>
            <Link
              href={pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar PDF
            </Link>
          </Grid>
          <Grid size={4}>
            <Tooltip title="Eliminar PDF">
              <IconButton
                color="error"
                edge="start"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFacturaDocumentoMutation.mutate({
                    fileType: "pdf",
                    invoiceId: id!.toString(),
                  });
                }}
                sx={{ marginLeft: 3 }}
              >
                <DeleteIcon style={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}

      <Grid size={5} />

      {!xmlDownloadUrl ? (
        <>
          <Grid size={3} sx={{ marginTop: -5 }}>
            {tipoEntidadId === 0 && (
              <>
                <input
                  type="file"
                  id="facturaXML"
                  style={{ display: "none" }}
                  onChange={handleXmlFileChange}
                  accept=".xml"
                />

                <label htmlFor="facturaXML">
                  <Button
                    variant="outlined"
                    component="span"
                    style={{ marginTop: 14 }}
                  >
                    Cargar Factura XML
                    <FileUploadIcon />
                  </Button>
                </label>
              </>
            )}

            {errors.facturaXML && (
              <p style={{ color: "#d32f2f", fontSize: "12px" }}>
                Archivo requerido
              </p>
            )}
          </Grid>
          <Grid size={3} sx={{ marginTop: -1 }}>
            {xmlFileName && (
              <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
                {`Nombre del Archivo: ${xmlFileName}`}
              </p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid size={3} sx={{ marginTop: -1 }}>
            <Link
              href={xmlDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar XML
            </Link>
          </Grid>
          <Grid size={3} sx={{ marginTop: -3 }}>
            <Tooltip title="Eliminar XML">
              <IconButton
                color="error"
                edge="start"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFacturaDocumentoMutation.mutate({
                    fileType: "xml",
                    invoiceId: id!.toString(),
                  });
                }}
                sx={{ marginLeft: 3 }}
              >
                <DeleteIcon style={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}

      <Grid size={6} />

      {!paymentProofDownloadUrl ? (
        <>
          <Grid size={3} sx={{ marginTop: -5 }}>
            <input
              type="file"
              id="comprobantePago"
              style={{ display: "none" }}
              onChange={handlePaymentProofFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.gif"
            />

            <label htmlFor="comprobantePago">
              <Button
                variant="outlined"
                component="span"
                style={{ marginTop: 14 }}
              >
                Cargar Comprobante Pago
                <FileUploadIcon />
              </Button>
            </label>
            {errors.facturaPDF && (
              <p style={{ color: "#d32f2f", fontSize: "12px" }}>
                Archivo requerido
              </p>
            )}
          </Grid>
          <Grid size={3} sx={{ marginTop: -1 }}>
            {paymentProofFileName && (
              <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
                {`Nombre del Archivo: ${paymentProofFileName}`}
              </p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid size={3} sx={{ marginTop: -1 }}>
            <Link
              href={paymentProofDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar Comprobante
            </Link>
          </Grid>
          <Grid size={3} sx={{ marginTop: -3 }}>
            <Tooltip title="Eliminar Comprobante">
              <IconButton
                color="error"
                edge="start"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFacturaDocumentoMutation.mutate({
                    fileType: "paymentProof",
                    invoiceId: id!.toString(),
                  });
                }}
                sx={{ marginLeft: 3 }}
              >
                <DeleteIcon style={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}

      <Grid size={6} />

      <Grid size={2} sx={{ marginTop: -3 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: mainBackgroundColor }}
          fullWidth
          disabled={disableButtons}
          onClick={() => {
            setOnClickGuardar(onClickGuardar + 1);
          }}
        >
          Guardar
          <SaveIcon sx={{ marginLeft: 1 }} />
        </Button>
      </Grid>
    </>
  );
};
