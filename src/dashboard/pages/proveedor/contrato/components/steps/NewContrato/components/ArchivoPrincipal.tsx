import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useArchivoPrincipal } from "../hooks/useArchivoPrincipal";

interface props {
  validateDocuments: number;
}

export const ArchivoPrincipal = ({ validateDocuments }: props) => {
  const {
    showPrincipal,
    isPrincipal,
    setIsPrincipal,
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    setShowPrincipal,
    setFieldValue,
    setFieldTouched,
    handleFileChange,
    fileName,
    updateTipoDocumento,
  } = useArchivoPrincipal({ idInput: "filePrincipal", validateDocuments });

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <FormControl
            fullWidth
            error={touched.tipoDocumento && Boolean(errors.tipoDocumento)}
          >
            <InputLabel id="tipo-documento-label">Tipo Documento</InputLabel>
            <Select
              labelId="tipo-documento-label"
              id="tipoDocumento"
              name="tipoDocumento"
              label="Tipo Documento"
              value={values.tipoDocumento}
              onChange={(e) => {
                updateTipoDocumento(e.target.value);
                if (e.target.value === 0) {
                  // contrato
                  setShowPrincipal(false);
                  setIsPrincipal(false);
                } else {
                  setShowPrincipal(true);
                }
                handleChange(e);
              }}
              onBlur={handleBlur}
            >
              <MenuItem value={0}>Contrato</MenuItem>
              <MenuItem value={2}>Propuesta</MenuItem>
            </Select>
            <FormHelperText>
              {touched.tipoDocumento && errors.tipoDocumento?.toString()}
            </FormHelperText>
          </FormControl>
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

        {values.indeterminado && <Grid size={3} />}
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

        <Grid size={3}>
          <input
            type="file"
            id="filePrincipal"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".pdf, image/*"
          />

          <label htmlFor="filePrincipal">
            <Button
              color="primary"
              component="span"
              style={{ marginTop: 14 }}
              variant="outlined"
            >
              Seleccionar Documento
              <FileUploadIcon />
            </Button>
          </label>
        </Grid>

        <Grid size={6}>
          {fileName && (
            <p style={{ marginTop: 18, color: "rgba(0, 0, 0, 0.6)" }}>
              {`Nombre del Archivo: ${fileName}`}
            </p>
          )}
        </Grid>

        <Grid size={3}>
          {showPrincipal && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrincipal}
                  onChange={() => setIsPrincipal(!isPrincipal)}
                />
              }
              label="¿Es Principal?"
              style={{ marginTop: 8 }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
