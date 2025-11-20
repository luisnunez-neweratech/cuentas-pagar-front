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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const ArchivoElement = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom:2 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <FormControl
              fullWidth
              //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
            >
              <InputLabel id="tipo-documento-label">Tipo Documento</InputLabel>
              <Select
                labelId="tipo-documento-label"
                id="tipoDocumento"
                name="tipoDocumento"
                label="Tipo Documento"
                /*  value={values.tipoEntidad}
              onChange={handleChange}
              onBlur={handleBlur} */
              >
                <MenuItem value={0}>CSF</MenuItem>
                <MenuItem value={1}>ID Rep. Legal</MenuItem>
                <MenuItem value={2}>Comp. Domicilio</MenuItem>
                <MenuItem value={3}>Poder Rep.</MenuItem>
              </Select>
              <FormHelperText>
                {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha Inicio"
                //value={values.fechaInicio ? dayjs(values.fechaInicio) : null}
                //onChange={(newValue) => setFieldValue("fechaInicio", newValue)}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaInicio",
                    // error: touched.fechaInicio && Boolean(errors.fechaInicio),
                    // helperText: touched.fechaInicio && errors.fechaInicio,
                    // onBlur: () => setFieldTouched("fechaInicio", true),
                  },
                  field: { clearable: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha Vencimiento"
                //value={values.fechaFin ? dayjs(values.fechaFin) : null}
                //onChange={(newValue) => setFieldValue("fechaFin", newValue)}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    name: "fechaFin",
                    //  error: touched.fechaFin && Boolean(errors.fechaFin),
                    // helperText: touched.fechaFin && errors.fechaFin,
                    // onBlur: () => setFieldTouched("fechaFin", true),
                  },
                  field: { clearable: true },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={3}>
            <FormControlLabel
              control={
                <Checkbox
                //checked={values.indeterminado}
                /* onChange={() => {
                  setFieldValue("indeterminado", !values.indeterminado);
                  if (!values.indeterminado === true) {
                    setFieldValue("fechaFin", "");
                  }
                }} */
                />
              }
              label="Indeterminado"
              style={{ marginTop: 8 }}
            />
          </Grid>
          <Grid size={3}>
            <input
              type="file"
              //id={idInput}
              id="test"
              style={{ display: "none" }}
              //onChange={handleFileChange}
              accept=".pdf, image/*"
            />
            <label htmlFor="test">
              {/*  <label htmlFor={idInput}> */}
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
          <Grid size={9}>
            <p style={{ paddingTop: 5, color: "rgba(0, 0, 0, 0.6)" }}>
              Nombre del Archivo:
            </p>
            {/* 
          {fileName && (
            <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
              {numArchivos === 1
                ? `Nombre del Archivo: ${fileName}`
                : `Nombre de los Archivos: ${fileName}`}
            </p>
          )} */}
          </Grid>
        </Grid>
      </Paper>
  )
}
