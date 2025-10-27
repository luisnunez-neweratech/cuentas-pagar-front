import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface props {
  title: string;
  indeterminado?: boolean;
  contrato: boolean;
}

export const ArchivoElement = ({
  title,
  contrato = true,
  indeterminado = true,
}: props) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <>
      <Grid size={3}>
        <input
          type="file"
          id="icon-button-file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="icon-button-file">
          <Button
            color="primary"
            component="span"
            style={{ display: "flex", textAlign: "center", marginTop: 14 }}
          >
            {title}
            <FileUploadIcon />
          </Button>
        </label>
      </Grid>

      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Fecha Inicio" format="DD-MM-YYYY" />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Fecha Vencimiento" format="DD-MM-YYYY" />
        </LocalizationProvider>
      </Grid>
      {indeterminado && (
        <Grid size={3}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Indeterminado"
            style={{ marginTop: 8 }}
          />
        </Grid>
      )}
      <Grid size={12}>
        {fileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            Nombre Archivo: {fileName}
          </p>
        )}
      </Grid>
    </>
  );
};
