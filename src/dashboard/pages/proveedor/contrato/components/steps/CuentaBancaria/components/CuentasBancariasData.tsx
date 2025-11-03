import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
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

interface props {
  id: number;
  deleteCuenta: (id: number) => void;
  idInput: string;
  isValidForm: (id: number, valid: boolean) => void;
}

export const CuentasBancariasData = ({
  id,
  deleteCuenta,
  idInput,
  isValidForm,
}: props) => {
  const {
    onMouseLeaveComponent,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    status,
    setStatus,
    handleFileChange,
    tipoEntidad,
    fileName,
  } = useCuentasBancariasData({ idInput, isValidForm, id });

  return (
    <Grid size={12}>
      <div
        onMouseLeave={async () => {
          onMouseLeaveComponent();
        }}
      >
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
              />
            </Grid>
            <Grid size={3}>
              <FormGroup sx={{ marginTop: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      value={status}
                      onChange={() => setStatus(!status)}
                      disabled={true} // solo admin lo cambia
                    />
                  }
                  label={status ? "Activo" : "Inactivo"}
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
                  <MenuItem value="pesos">Pesos</MenuItem>
                  <MenuItem value="dollar">Dollar</MenuItem>
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
                  <MenuItem value="15dias">15 dias</MenuItem>
                  <MenuItem value="30dias">30 dias</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.condicionesPago && errors.condicionesPago
                    ? errors.condicionesPago
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={4}>
              {tipoEntidad === TipoEntidad.Extranjero && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="swift"
                  label="Codigo Swift"
                  name="swift"
                  value={values.swift}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.swift && Boolean(errors.swift)}
                  helperText={touched.swift && errors.swift}
                  sx={{ marginTop: 1 }}
                />
              )}
            </Grid>
            <Grid size={3}>
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
                    color="primary"
                    component="span"
                    style={{ marginTop: 14 }}
                  >
                    *Caratula Bancaria
                    <FileUploadIcon />
                  </Button>
                </label>
                {errors[idInput] && (
                  <span style={{ color: "#d32f2f", fontSize: "12px" }}>
                    La caratula es requerida
                  </span>
                )}
                {console.log(errors)}
              </>
            </Grid>

            <Grid size={7} sx={{ marginTop: 2 }}>
              {fileName && (
                <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
                  {`Nombre del Archivo: ${fileName}`}
                </p>
              )}
            </Grid>
            <Grid size={1} />
            {id > 1 && (
              <Grid size={1}>
                <Tooltip title="Eliminar Cuenta">
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => deleteCuenta(id)}
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
            )}
          </Grid>
        </Paper>
      </div>
    </Grid>
  );
};
