import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useArchivoElement } from "../hooks/useArchivoElement";

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
  const {
    handleFileChange,
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    checkIndeterminado,
    setCheckIndeterminado,
    fileName,
    numArchivos,
  } = useArchivoElement(indeterminado);

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

      <Grid size={3} sx={{ marginTop: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Inicio"
            value={values.fechaInicio}
            onChange={(newValue) => setFieldValue("fechaInicio", newValue)}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaInicio",
                error: touched.fechaInicio && Boolean(errors.fechaInicio),
                helperText: touched.fechaInicio && errors.fechaInicio,
                onBlur: () => setFieldTouched("fechaInicio", true),
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      {!checkIndeterminado ? (
        <Grid size={3} sx={{ marginTop: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Fecha Fin"
              value={values.fechaFin}
              onChange={(newValue) => setFieldValue("fechaFin", newValue)}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  name: "fechaFin",
                  error: touched.fechaFin && Boolean(errors.fechaFin),
                  helperText: touched.fechaFin && errors.fechaFin,
                  onBlur: () => setFieldTouched("fechaFin", true),
                },
                field: { clearable: true },
              }}
            />
          </LocalizationProvider>
        </Grid>
      ) : (
        <Grid size={1} />
      )}

      {indeterminado && (
        <Grid size={3} sx={{ marginTop: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => {
                  setCheckIndeterminado(!checkIndeterminado);
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
            {numArchivos === 1
              ? `Nombre del Archivo: ${fileName}`
              : `Nombre de los Archivos: ${fileName}`}
          </p>
        )}
      </Grid>
    </>
  );
};
