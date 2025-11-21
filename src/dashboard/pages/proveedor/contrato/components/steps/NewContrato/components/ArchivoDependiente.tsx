import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useArchivoDependiente } from "../hooks/useArchivoDependiente";

interface myProps {
  title: string;
  fechaVencimiento: boolean;
  indeterminado: boolean;
}

export const ArchivoDependiente = ({
  title,
  fechaVencimiento,
  indeterminado,
}: myProps) => {
  const {
    handleFileChange,
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    fileName,
  } = useArchivoDependiente({
    idInput: title,
  });

  return (
    <>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid size={3}>
        <input
          type="file"
          id={title}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".pdf, image/*"
        />

        <label htmlFor={title}>
          <Button
            color="primary"
            component="span"
            style={{ marginTop: 14 }}
            variant="outlined"
          >
            Seleccionar {title}
            <FileUploadIcon />
          </Button>
        </label>
      </Grid>

      <Grid size={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Inicio"
            value={values.fechaInicio ? dayjs(values.fechaInicio) : null}
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

      {fechaVencimiento && (
        <>
          {!values.indeterminado && (
            <Grid size={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Fecha Vencimiento"
                  value={values.fechaFin ? dayjs(values.fechaFin) : null}
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
          )}
        </>
      )}

      {values.indeterminado && <Grid size={3} />}
      {indeterminado && (
        <Grid size={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.indeterminado}
                onChange={() => {
                  setFieldValue("indeterminado", !values.indeterminado);
                  if (!values.indeterminado === true) {
                    setFieldValue("fechaFin", "");
                  }
                }}
              />
            }
            label="Indeterminado"
            style={{ marginTop: 8 }}
          />
        </Grid>
      )}
      <Grid size={8}>
        {fileName && (
          <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
            {`Nombre del Archivo: ${fileName}`}
          </p>
        )}
      </Grid>
    </>
  );
};
