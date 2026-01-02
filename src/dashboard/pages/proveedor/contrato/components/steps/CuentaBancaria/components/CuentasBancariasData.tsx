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

interface props {
  id: number;
  deleteCuenta: (id: number) => void;
  idInput: string;
  isValidForm: (id: number, valid: boolean) => void;
  monedas: MonedaVenta[];
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

  const handleClabeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue("clabe", value);
  };

  return (
    <Grid size={12}>
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="banco"
              label="*Banco"
              name="banco"
              value={values.banco?.toUpperCase()}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.banco && Boolean(errors.banco)}
              helperText={touched.banco && errors.banco}
              sx={{ marginTop: 0 }}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="clabe"
              label="*CLABE Interbancaria"
              name="clabe"
              value={values.clabe}
              onChange={handleClabeChange}
              onBlur={handleBlur}
              error={touched.clabe && Boolean(errors.clabe)}
              helperText={touched.clabe && errors.clabe}
              sx={{ marginTop: 0 }}
              slotProps={{
                htmlInput: {
                  maxLength: 18,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />
          </Grid>
          <Grid size={3}>
            <FormControl
              fullWidth
              error={touched.monedaVenta && Boolean(errors.monedaVenta)}
            >
              <InputLabel id="moneda-venta-label">*Moneda de Venta</InputLabel>
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

          <Grid size={3}>
            {tipoEntidad === TipoEntidad.Extranjero.value ? (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="swift"
                label="*Codigo Swift"
                name="swift"
                value={values.swift?.toUpperCase()}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.swift && Boolean(errors.swift)}
                helperText={touched.swift && errors.swift}
                sx={{ marginTop: 0 }}
              />
            ) : (
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
                sx={{ marginTop: 0 }}
              />
            )}
          </Grid>

          {tipoEntidad === TipoEntidad.Extranjero.value && (
            <Grid size={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="routeNumber"
                label="Route Number"
                name="routeNumber"
                value={values.routeNumber?.toUpperCase()}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.routeNumber && Boolean(errors.routeNumber)}
                helperText={touched.routeNumber && errors.routeNumber}
                sx={{ marginTop: 0 }}
              />
            </Grid>
          )}

          <Grid size={3}>
            {!downloadUrl ? (
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
                    fullWidth
                    sx={{ height: "56px" }}
                  >
                    {tipoEntidad === TipoEntidad.Extranjero.value
                      ? "Carátula Bancaria"
                      : "*Carátula Bancaria"}
                    <FileUploadIcon sx={{ marginLeft: 1 }} />
                  </Button>
                </label>
                {errors[idInput] && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    Archivo requerido
                  </p>
                )}
                {fileName && (
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontSize: "14px",
                    }}
                  >
                    {fileName}
                  </p>
                )}
              </>
            ) : (
              <Link
                href={downloadUrl}
                sx={{ display: "block", lineHeight: "56px" }}
              >
                Descargar Carátula
              </Link>
            )}
          </Grid>
          <Grid size={3} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.status}
                    value={values.status}
                    onChange={() => setFieldValue("status", !values.status)}
                    disabled={currentPath.includes("nuevo-contrato")}
                  />
                }
                label={values.status ? "Activo" : "Inactivo"}
              />
            </FormGroup>
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
    </Grid>
  );
};
