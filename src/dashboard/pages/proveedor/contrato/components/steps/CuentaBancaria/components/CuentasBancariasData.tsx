import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { useCuentasBancariasData } from "../hooks/useCuentasBancariasData";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { TipoEntidad } from "../../../../../interfaces/TipoEntidad";
import type { MonedaVenta } from "../../../../../../catalogos/monedaVenta/interface/MonedaVenta";
import type { PlazoPago } from "../../../../../../catalogos/plazoPago/interface/PlazoPago";

interface props {
  id: number;
  deleteCuenta: (id: number) => void;
  idInput: string;
  isValidForm: (id: number, valid: boolean) => void;
  monedas: MonedaVenta[];
  plazoPagos: PlazoPago[];
  downloadUrl?: string | null;
  validateCuentas: number;
  total: number;
}

export const CuentasBancariasData = ({
  id,
  deleteCuenta,
  idInput,
  isValidForm,
  monedas,
  plazoPagos,
  downloadUrl,
  validateCuentas,
  total,
}: props) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleFileChange,
    tipoEntidad,
    fileName,
    setFieldValue,
    currentPath,
  } = useCuentasBancariasData({
    idInput,
    isValidForm,
    id,
    downloadUrl,
    validateCuentas,
  });

  return (
    <Grid size={12}>
      <div>
        <Paper sx={{ paddingBottom: 2, paddingLeft: 2 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="banco"
                label="*Banco"
                name="banco"
                value={values.banco}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.banco && Boolean(errors.banco)}
                helperText={touched.banco && errors.banco}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="clabe"
                label="*CLABE Interbancaria"
                name="clabe"
                value={values.clabe}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.clabe && Boolean(errors.clabe)}
                helperText={touched.clabe && errors.clabe}
                type="number"
              />
            </Grid>
            <Grid size={3}>
              <FormGroup sx={{ marginTop: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.status}
                      value={values.status}
                      onChange={() => setFieldValue("status", !values.status)}
                      //disabled={true} // solo admin lo cambia
                      disabled={currentPath.includes("nuevo-contrato")}
                    />
                  }
                  label={values.status ? "Activo" : "Inactivo"}
                />
              </FormGroup>
            </Grid>

            <Grid size={4} sx={{ marginTop: 1 }}>
              <FormControl
                fullWidth
                error={touched.monedaVenta && Boolean(errors.monedaVenta)}
              >
                <InputLabel id="moneda-venta-label">
                  *Moneda de Venta
                </InputLabel>
                <Select
                  labelId="moneda-venta-label"
                  id="monedaVenta"
                  name="monedaVenta"
                  label="Moneda de Venta"
                  value={values.monedaVenta}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {monedas.map((moneda) => (
                    <MenuItem value={moneda.id}>{moneda.descripcion}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.monedaVenta && errors.monedaVenta
                    ? errors.monedaVenta
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={4} sx={{ marginTop: 1 }}>
              <FormControl
                fullWidth
                error={
                  touched.condicionesPago && Boolean(errors.condicionesPago)
                }
              >
                <InputLabel id="condiciones-pago-label">
                  *Condiciones de Pago
                </InputLabel>
                <Select
                  labelId="condiciones-pago-label"
                  id="condicionesPago"
                  name="condicionesPago"
                  label="Condiciones de Pago"
                  value={values.condicionesPago}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {plazoPagos.map((plazo) => (
                    <MenuItem value={plazo.id}>{plazo.descripcion}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.condicionesPago && errors.condicionesPago
                    ? errors.condicionesPago
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={4}>
              {tipoEntidad === TipoEntidad.Extranjero.value && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="swift"
                  label="Codigo Swift"
                  name="swift"
                  value={values.swift?.toUpperCase()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.swift && Boolean(errors.swift)}
                  helperText={touched.swift && errors.swift}
                  sx={{ marginTop: 1 }}
                />
              )}
            </Grid>
            <Grid size={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="noCuenta"
                label="Número de Cuenta"
                name="noCuenta"
                value={values.noCuenta?.toUpperCase()}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.noCuenta && Boolean(errors.noCuenta)}
                helperText={touched.noCuenta && errors.noCuenta}
                sx={{ marginTop: 1 }}
              />
            </Grid>
            <Grid size={3}>
              {!downloadUrl && (
                <>
                  <input
                    type="file"
                    id={idInput}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept=".pdf"
                  />

                  <label htmlFor={idInput}>
                    <Button
                      variant="outlined"
                      component="span"
                      style={{ marginTop: 14 }}
                    >
                      *Carátula Bancaria
                      <FileUploadIcon />
                    </Button>
                  </label>
                  {errors[idInput] && (
                    <p style={{ color: "#d32f2f", fontSize: "12px" }}>
                      Archivo requerido
                    </p>
                  )}
                </>
              )}
            </Grid>

            <Grid size={3} sx={{ marginTop: 2 }}>
              {fileName && (
                <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
                  {`Nombre del Archivo: ${fileName}`}
                </p>
              )}
            </Grid>
            <Grid size={2} sx={{ marginTop: 2 }}>
              {downloadUrl && (
                <Link href={downloadUrl}>Descargar Carátula</Link>
              )}
            </Grid>
            <Grid size={11} />

            <Grid size={1}>
              <Tooltip title="Eliminar Cuenta">
                <IconButton
                  sx={{ color: "red" }}
                  onClick={() => deleteCuenta(id)}
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
      </div>
    </Grid>
  );
};
