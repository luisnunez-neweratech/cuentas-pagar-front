import { Button, Checkbox, FormControlLabel, Grid, Paper } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useArchivoElement } from "../hooks/useArchivoElement";
import type { DocumentoType } from "../interfaces/DocumentoType";

interface props {
  title: string;
  indeterminado?: boolean;
  multiple: boolean;
  idInput: string;
  isValidForm: (valid: boolean) => void;
  tipoDocumento: DocumentoType;
}

export const ArchivoElement = ({
  title,
  indeterminado = true,
  multiple,
  idInput,
  isValidForm,
  tipoDocumento,
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
    onMouseLeaveComponent,
  } = useArchivoElement({ isValidForm, tipoDocumento });

  return (
    <div
      style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
      onMouseLeave={async () => {
        onMouseLeaveComponent();
      }}
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
      {!checkIndeterminado ? (
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
                defaultChecked
                onChange={() => {
                  setCheckIndeterminado(!checkIndeterminado);
                }}
              />
            }
            label="Indeterminado"
            style={{ marginTop: 8 }}
          />
        </div>
      )}
      <div
        style={{
          marginTop: 1,
          width: "100%",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {fileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {numArchivos === 1
              ? `Nombre del Archivo: ${fileName}`
              : `Nombre de los Archivos: ${fileName}`}
          </p>
        )}
      </div>
    </div>
  );
};
