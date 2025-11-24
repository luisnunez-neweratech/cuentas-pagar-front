import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useArchivoElement } from "../hooks/useArchivoElement";
import { converDateFormat } from "../../../../../../../../lib/dates";

interface props {
  id: number;
  deleteDocumento: (id: number) => void;
  //isValidForm: (id: number, valid: boolean) => void;
  validateDocuments: number;
  idInput: string;
  total: number;
}

export const ArchivoElement = ({
  id,
  total,
  deleteDocumento,
  idInput,
  validateDocuments,
}: props) => {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    handleChange,
    handleBlur,
    fileName,
    handleFileChange,
    listaContratos,
  } = useArchivoElement({ idInput, id, validateDocuments });

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
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value={0}>CSF</MenuItem>
              <MenuItem value={1}>ID Rep. Legal</MenuItem>
              <MenuItem value={2}>Comp. Domicilio</MenuItem>
              <MenuItem value={3}>Poder Rep.</MenuItem>
              <MenuItem value={4}>Propuesta</MenuItem>
              <MenuItem value={5}>Anexo</MenuItem>
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
          {values.tipoDocumento !== 5 && (
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
          )}
        </Grid>

        <Grid size={3}>
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
              variant="outlined"
            >
              Seleccionar Documento
              <FileUploadIcon />
            </Button>
          </label>
        </Grid>
        <Grid size={4}>
          {fileName && (
            <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
              {`Nombre del Archivo: ${fileName}`}
            </p>
          )}
        </Grid>

        <Grid size={4}>
          {(values.tipoDocumento === 4 || values.tipoDocumento === 5) && (
            <FormControl
              fullWidth
              error={
                touched.perteneceContratoId &&
                Boolean(errors.perteneceContratoId)
              }
            >
              <InputLabel id="pertenece-contrato-label">
                Seleccionar Contrato - Propuesta
              </InputLabel>
              <Select
                labelId="pertenece-contrato-label"
                id="perteneceContratoId"
                name="perteneceContratoId"
                label="Seleccionar Contrato - Propuesta"
                value={values.perteneceContratoId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={0}>Actual</MenuItem>
                {listaContratos.map((contrato) => (
                  <MenuItem key={contrato.id} value={contrato.id}>
                    {`Contrato desde ${converDateFormat(
                      contrato.fechaInicio
                    )} hasta ${
                      contrato.indeterminado
                        ? "Indeterminado"
                        : converDateFormat(contrato.fechaFin)
                    }`}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.perteneceContratoId &&
                  errors.perteneceContratoId?.toString()}
              </FormHelperText>
            </FormControl>
          )}
        </Grid>

        <Grid size={1}>
          <Tooltip title="Eliminar Documento">
            <IconButton
              sx={{ color: "red" }}
              onClick={() => deleteDocumento(id)}
              disabled={total === 1}
            >
              <DeleteIcon
                style={{
                  height: "36px",
                  width: "36px",
                }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};
