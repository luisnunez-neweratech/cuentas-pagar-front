import { Grid } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AutoCompleteComponent } from "../../../../../components/common/AutoComplete/AutoComplete";
//import dayjs from "dayjs";
import { useFacturaHeader } from "./hooks/useFacturaHeader";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";

export const FacturaHeader = () => {
  const { onChangeAutocomplete, values, giros } = useFacturaHeader();

  return (
    <>
      <Grid size={2}>
        <SelectCommon id={"proveedor"} label={"Proveedor"} />
      </Grid>

      {/* //TODO autocomplete */}

      <Grid size={2}>
        <SelectCommon id={"colaborador"} label={"Colaborador"} />
      </Grid>

      <Grid size={2}>
        <SelectCommon id={"documento"} label={"Documento"} />
      </Grid>

      <Grid size={2}>
        <SelectCommon id={"statusFactura"} label={"Estatus Factura"} />
      </Grid>

      <Grid size={2}>
        <SelectCommon id={"statusReembolso"} label={"Estatus Reembolso"} />
      </Grid>

      <Grid size={2}>
        <SelectCommon id={"moneda"} label={"Moneda"} />
      </Grid>

      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%", marginTop: 0, fontSize: 14 }}
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
            sx={{ width: "100%", marginTop: 0, fontSize: 14 }}
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

      <Grid size={2}>
        <TextFieldCommon id="noFactura" label="No Factura" />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon id="folioFiscal" label="Folio Fiscal" />
      </Grid>
      <Grid size={2} sx={{ marginTop: 0, marginBottom: 0 }}>
        <TextFieldCommon id="subtotal" label="Subtotal" />
      </Grid>
      <Grid size={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%", marginTop: 0, fontSize: 14 }}
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
            sx={{ width: "100%", marginTop: 0, fontSize: 14 }}
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
        <TextFieldCommon id="descuento" label="Descuento" />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon id="impuestos" label="Impuestos" />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon id="ivaRetenido" label="IVA Retenido" />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon id="isrRetenido" label="ISR Retenido" />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon id="total" label="Total" />
      </Grid>
    </>
  );
};
