import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface props {
  title: string;
  indeterminado?: boolean;
  multiple: boolean;
  idInput: string;
}

export const ArchivoElement = ({
  title,
  indeterminado = true,
  multiple,
  idInput,
}: props) => {
  const [fileName, setFileName] = useState("");
  const [checkIndeterminado, setCheckIndeterminado] =
    useState<boolean>(indeterminado);
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <>
      <Grid size={3}>
        {multiple === true ? (
          <>
            <input
              type="file"
              id={idInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf, image/*"
              multiple
            />
            <label htmlFor={idInput}>
              <Button
                color="primary"
                component="span"
                style={{ marginTop: 14 }}
              >
                {title}
                <FileUploadIcon />
              </Button>
            </label>
          </>
        ) : (
          <>
            <input
              type="file"
              id={idInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf, image/*"
            />
            <label htmlFor={idInput}>
              <Button
                color="primary"
                component="span"
                style={{ marginTop: 14 }}
              >
                {title}
                <FileUploadIcon />
              </Button>
            </label>
          </>
        )}
      </Grid>

      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha Inicio"
            format="DD-MM-YYYY"
            slotProps={{
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha Vencimiento"
            format="DD-MM-YYYY"
            disabled={checkIndeterminado}
            value={fechaFin}
            onChange={(newValue) => setFechaFin(newValue)}
            slotProps={{
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      {indeterminado && (
        <Grid size={3}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => {
                  setCheckIndeterminado(!checkIndeterminado);
                  if (!checkIndeterminado) {
                    setFechaFin(null);
                  }
                }}
              />
            }
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
