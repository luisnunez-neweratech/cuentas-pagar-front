import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  TextField,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AutoCompleteComponent } from "../../../../../components/common/AutoComplete/AutoComplete";
//import dayjs from "dayjs";
import { useFacturaHeader } from "./hooks/useFacturaHeader";

export const FacturaHeader = () => {
  const { onChangeAutocomplete, values, giros } = useFacturaHeader();

  return (
    <>
      <Grid size={2} sx={{ marginTop: 4 }}>
        <FormControl
          fullWidth
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="proveedor-label">Proveedor</InputLabel>
          <Select
            labelId="proveedor-label"
            id="proveedor"
            name="proveedor"
            label="Proveedor"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            {/* <MenuItem value={0}>Factura</MenuItem> */}
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid size={2} sx={{ marginTop: 2 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="noFactura"
          label="No Factura"
          name="noFactura"
          /* value={noFactura}
              onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>
      <Grid size={2} sx={{ marginTop: 2 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="folioFiscal"
          label="Folio Fiscal"
          name="Folio Fiscal"
          /* value={noFactura}
              onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>
      <Grid size={2} sx={{ paddingTop: 4 }}>
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
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            <MenuItem value={0}>Factura</MenuItem>
            <MenuItem value={1}>Nota de Crédito</MenuItem>
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid size={2}>
        <FormControl
          fullWidth
          sx={{ marginTop: 4 }}
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="status-factura-label">Estatus Factura</InputLabel>
          <Select
            labelId="status-factura-label"
            id="statusFactura"
            name="statusFactura"
            label="Estatus Factura"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            <MenuItem value={0}>Pendiente</MenuItem>
            <MenuItem value={1}>Pagada</MenuItem>
            <MenuItem value={2}>Cancelada</MenuItem>
            <MenuItem value={3}>En Revision</MenuItem>
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid size={2}>
        <FormControl
          fullWidth
          sx={{ marginTop: 4 }}
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="status-reembolso-label">Estatus Reembolso</InputLabel>
          <Select
            labelId="status-reembolso-label"
            id="statusReembolso"
            name="statusReembolso"
            label="Estatus Reembolso"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            <MenuItem value={0}>Pendiente</MenuItem>
            <MenuItem value={1}>Pagada</MenuItem>
            <MenuItem value={2}>Cancelada</MenuItem>
            <MenuItem value={3}>N/A</MenuItem>
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%", marginTop: 0 }}
            //value={fechaAlta ? dayjs(fechaAlta) : null}
            label="Fecha de Factura"
            /* onChange={(newValue) =>
                      onChangeFechaAlta(
                        convertDateToFilterFormat(newValue?.toDate())
                      )
                    } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaDeFactura",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%", marginTop: 0 }}
            //value={fechaAlta ? dayjs(fechaAlta) : null}
            label="Fecha Programada Pago"
            /* onChange={(newValue) =>
                      onChangeFechaAlta(
                        convertDateToFilterFormat(newValue?.toDate())
                      )
                    } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaProgramadaPago",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={2}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "productos")}
          setValues={values.productos}
          itemsList={giros}
          maxItems={5}
          title="Productos o Servicios"
          id="giros-autocomplete"
        />
      </Grid>

      {/* //TODO autocomplete */}
      <Grid size={2}>
        <FormControl
          fullWidth
          sx={{ marginTop: 0 }}
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="colaborador-label">Colaborador</InputLabel>
          <Select
            labelId="colaborador-label"
            id="colaborador"
            name="colaborador"
            label="Colaborador"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            {/* <MenuItem value={0}>Pendiente</MenuItem> */}
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <FormControl
          fullWidth
          //error={touched.tipoEntidad && Boolean(errors.tipoEntidad)}
        >
          <InputLabel id="moneda-label">Moneda</InputLabel>
          <Select
            labelId="moneda-label"
            id="moneda"
            name="moneda"
            label="moneda"
            //value={values.tipoEntidad}
            //onChange={handleChange}
            //onBlur={handleBlur}
          >
            {/* <MenuItem value={0}>Factura</MenuItem> */}
          </Select>
          <FormHelperText>
            {/* {touched.tipoEntidad && errors.tipoEntidad?.toString()} */}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid size={2} sx={{ marginTop: 0, marginBottom: 0 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="subtotal"
          label="Subtotal"
          name="subtotal"
          sx={{ marginBottom: 0 , marginTop: 0, }}
          /* value={noFactura}
                          onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>
      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%", marginTop: 0 }}
            //value={fechaAlta ? dayjs(fechaAlta) : null}
            label="Fecha Pago"
            /* onChange={(newValue) =>
                      onChangeFechaAlta(
                        convertDateToFilterFormat(newValue?.toDate())
                      )
                    } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaPago",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%", marginTop: 0 }}
            //value={fechaAlta ? dayjs(fechaAlta) : null}
            label="Fecha Reembolso"
            /* onChange={(newValue) =>
                      onChangeFechaAlta(
                        convertDateToFilterFormat(newValue?.toDate())
                      )
                    } */
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                name: "fechaReembolso",
              },
              field: { clearable: true },
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={6} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="descuento"
          label="Descuento"
          name="descuento"
          sx={{ marginTop: 0, marginBottom:0 }}
          /* value={noFactura}
                    onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="impuestos"
          label="Impuestos"
          name="impuestos"
          sx={{ marginTop: 0 }}
          /* value={noFactura}
                    onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="ivaRetenido"
          label="IVA Retenido"
          name="ivaRetenido"
          sx={{ marginTop: 0 }}
          /* value={noFactura}
                    onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="isrRetenido"
          label="ISR Retenido"
          name="isrRetenido"
          sx={{ marginTop: 0 }}
          /* value={noFactura}
                          onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>

       <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="total"
          label="Total"
          name="total"
          sx={{ marginTop: 0 }}
          /* value={noFactura}
                    onChange={(e) => onChangeNoFactura(e.target.value)} */
        />
      </Grid>
    </>
  );
};
