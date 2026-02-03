import { Button, Grid, IconButton, Link, TextField, Tooltip } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { mainBackgroundColor } from "../../../../../lib/constants";
import SaveIcon from "@mui/icons-material/Save";
import { useFacturaFooter } from "./hooks/useFacturaFooter";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  onClickGuardar: number;
  setOnClickGuardar: (value: any) => void;
  values: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const FacturaFooter = ({ onClickGuardar, setOnClickGuardar, values, handleChange, handleBlur }: props) => {
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
    onClickDeleteFile,
    isComprobanteDisabled
  } = useFacturaFooter();

  return (
    <Grid container spacing={2} sx={{ marginTop: -14 }}>
      {!pdfDownloadUrl ? (
        <>
          <Grid size={12}>
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
              >
                Cargar Factura PDF
                <FileUploadIcon />
              </Button>
            </label>
            {pdfFileName && (
              <span style={{ marginLeft: 16, color: "rgba(0, 0, 0, 0.6)" }}>
                {`Nombre del Archivo: ${pdfFileName}`}
              </span>
            )}
            {errors.facturaPDF && (
              <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: 4 }}>
                Archivo requerido
              </p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid size={12}>
            <Link
              href={pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar PDF
            </Link>
            <Tooltip title="Eliminar PDF">
              <IconButton
                color="error"
                edge="start"
                onClick={(e) => onClickDeleteFile(e, "pdf")}
                sx={{ marginLeft: 2 }}
              >
                <DeleteIcon style={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}

      {!xmlDownloadUrl ? (
        <>
          <Grid size={12}>
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
                  >
                    Cargar Factura XML
                    <FileUploadIcon />
                  </Button>
                </label>
                {xmlFileName && (
                  <span style={{ marginLeft: 16, color: "rgba(0, 0, 0, 0.6)" }}>
                    {`Nombre del Archivo: ${xmlFileName}`}
                  </span>
                )}
              </>
            )}

            {errors.facturaXML && (
              <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: 4 }}>
                Archivo requerido
              </p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid size={12}>
            <Link
              href={xmlDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar XML
            </Link>
            <Tooltip title="Eliminar XML">
              <IconButton
                color="error"
                edge="start"
                onClick={(e) => onClickDeleteFile(e, "xml")}
                sx={{ marginLeft: 2 }}
              >
                <DeleteIcon style={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}

      {!paymentProofDownloadUrl ? (
        <>
          <Grid size={12}>
            <input
              type="file"
              id="comprobantePago"
              style={{ display: "none" }}
              onChange={handlePaymentProofFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              disabled={isComprobanteDisabled()}
            />

            <label htmlFor={!isComprobanteDisabled() ? "comprobantePago" : undefined}>
              <Button
                variant="outlined"
                component="span"
                disabled={isComprobanteDisabled()}
              >
                Cargar Comprobante Pago
                <FileUploadIcon />
              </Button>
            </label>
            {paymentProofFileName && !isComprobanteDisabled() && (
              <span style={{ marginLeft: 16, color: "rgba(0, 0, 0, 0.6)" }}>
                {`Nombre del Archivo: ${paymentProofFileName}`}
              </span>
            )}
            {errors.facturaPDF && (
              <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: 4 }}>
                Archivo requerido
              </p>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Grid size={12}>
            <Link
              href={paymentProofDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar Comprobante
            </Link>
            <Tooltip title="Eliminar Comprobante">
              <IconButton
                color="error"
                edge="start"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFacturaDocumentoMutation.mutate({
                    fileType: "payment-Proof",
                    invoiceId: id!.toString(),
                  });
                }}
                sx={{ marginLeft: 2 }}
              >
                <DeleteIcon style={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}
      <Grid size={12}>
        <TextField
          id="nota"
          label="Nota"
          name="nota"
          multiline
          rows={5}
          fullWidth
          value={values.nota || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          inputProps={{ maxLength: 4000 }}
        />
      </Grid>

      <Grid size={12}>
        <Button
          variant="contained"
          sx={{ backgroundColor: mainBackgroundColor }}
          disabled={disableButtons}
          onClick={() => {
            setOnClickGuardar(onClickGuardar + 1);
          }}
        >
          Guardar
          <SaveIcon sx={{ marginLeft: 1 }} />
        </Button>
      </Grid>
    </Grid>
  );
};
