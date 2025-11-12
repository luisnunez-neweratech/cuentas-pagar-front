import { Button, Checkbox, FormControlLabel, Link } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useArchivoElement } from "../hooks/useArchivoElement";
import type { TipoDocumento } from "../../../../../interfaces/TipoDocumento";
import DownloadIcon from "@mui/icons-material/Download";

interface props {
  title: string;
  indeterminado?: boolean;
  multiple: boolean;
  idInput: string;
  tipoDocumento: TipoDocumento;
  optional?: boolean;
  validateDocuments: number;
  addToContrato?: boolean;
}

export const ArchivoElement = ({
  title,
  indeterminado = true,
  multiple,
  idInput,
  tipoDocumento,
  optional = false,
  validateDocuments,
  addToContrato,
}: props) => {
  const {
    handleFileChange,
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    fileName,
    numArchivos,
  } = useArchivoElement({
    tipoDocumento,
    idInput,
    optional,
    validateDocuments,
  });

  

  return (
    <div
      style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
      /*  onMouseLeave={async () => {
        validateArchivoElement();
      }} */
    >
      <div style={{ width: "25%", paddingRight: 16 }}>
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
                variant="outlined"
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
                variant="outlined"
              >
                {title}
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
      </div>

      <div
        style={{
          marginTop: 1,
          width: "25%",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
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
      </div>
      {!values.indeterminado ? (
        <div
          style={{
            marginTop: 1,
            width: "25%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Fecha Fin"
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
        </div>
      ) : (
        <div style={{ width: "8.3%", paddingLeft: 16, paddingRight: 16 }} />
      )}

      {indeterminado && (
        <div
          style={{
            marginTop: 1,
            width: "25%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
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
        </div>
      )}
      {addToContrato && (
        <div
          style={{
            marginTop: 1,
            width: "25%",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={values.addToContrato}
                onChange={() => {
                  setFieldValue("addToContrato", !values.addToContrato);
                }}
              />
            }
            label="Anexar a contrato"
            style={{ marginTop: 8 }}
          />
        </div>
      )}
      <div
        style={{
          marginTop: 8,
          width: "50%",          
          paddingRight: 16,
        }}
      >
        {/* nombre de cuando carga el archivo */}
        {fileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {numArchivos === 1
              ? `Nombre del Archivo: ${fileName}`
              : `Nombre de los Archivos: ${fileName}`}
          </p>
        )}
        {/* nombre de archivo de la bd*/}
        {values.fileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`Nombre del Archivo: ${values.fileName}`}
          </p>
        )}
      </div>
      <div
        style={{
          marginTop: 1,
          width: "50%",
          paddingLeft: 16,
          paddingRight: 16,
          display: "flex",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        {values.downloadUrl && (
          <>
            <Link href={values.downloadUrl}>Descargar Archivo</Link>
            <DownloadIcon color="primary" />
          </>
        )}
      </div>
    </div>
  );
};
