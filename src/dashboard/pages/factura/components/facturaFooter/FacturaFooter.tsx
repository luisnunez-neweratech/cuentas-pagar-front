import { Button, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { mainBackgroundColor } from "../../../../../lib/constants";
import SaveIcon from "@mui/icons-material/Save";

export const FacturaFooter = () => {
  return (
    <>
      <Grid size={3} />
      <Grid size={3}>
        <input
          type="file"
          id="facturaPDF"
          style={{ display: "none" }}
          //onChange={handleFileChange}
          accept=".pdf"
        />

        <label htmlFor="facturaPDF">
          <Button variant="outlined" component="span" style={{ marginTop: 14 }}>
            Cargar Factura PDF
            <FileUploadIcon />
          </Button>
        </label>
        {/* {errors[idInput] && (
        <p style={{ color: "#d32f2f", fontSize: "12px" }}>Archivo requerido</p>
      )} */}
      </Grid>
      <Grid size={9} />

      <Grid size={3}>
        <input
          type="file"
          id="facturaXML"
          style={{ display: "none" }}
          //onChange={handleFileChange}
          accept=".xml"
        />

        <label htmlFor="facturaXML">
          <Button variant="outlined" component="span" style={{ marginTop: 14 }}>
            Cargar Factura XML
            <FileUploadIcon />
          </Button>
        </label>
        {/* {errors[idInput] && (
        <p style={{ color: "#d32f2f", fontSize: "12px" }}>Archivo requerido</p>
      )} */}
      </Grid>

      <Grid size={7} />
      <Grid size={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: mainBackgroundColor }}
          fullWidth
          type="submit"
          /* disabled={disableButtons} */
        >
          Guardar
          <SaveIcon sx={{ marginLeft: 1 }} />
        </Button>
      </Grid>
    </>
  );
};
