import { Grid } from "@mui/material";
import { AutoCompleteComponent } from "../../../../../components/common/AutoComplete/AutoComplete";
import { useFacturaHeader } from "./hooks/useFacturaHeader";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";
import { DatePickerCommon } from "../../../../../components/common/DatePickerCommon/DatePickerCommon";
import { NormalAutocomplete } from "../../../../../components/common/NormalAutocomplete/NormalAutocomplete";
import { TipoDocumento } from "../../../facturas/interfaces/TipoDocumento";
import { StatusReembolso } from "../../../facturas/interfaces/StatusReembolso";
import { StatusFactura } from "../../../facturas/interfaces/StatusFactura";

const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export const FacturaHeader = () => {
  const { onChangeAutocomplete, values, giros, convertMonedas } = useFacturaHeader();

  return (
    <>
      <Grid size={2}>
        <NormalAutocomplete
          options={top100Films}
          label="Proveedor"
          id="proveedor"
        />
      </Grid>

      <Grid size={2}>
        <NormalAutocomplete
          options={top100Films}
          label="Colaborador"
          id="colaborador"
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"documento"}
          label={"Documento"}
          options={[TipoDocumento.Factura, TipoDocumento.NotaCredito]}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"statusFactura"}
          label={"Estatus Factura"}
          options={[
            StatusFactura.Pendiente,
            StatusFactura.Pagado,
            StatusFactura.Cancelado,
            StatusFactura.EnRevision,
          ]}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"statusReembolso"}
          label={"Estatus Reembolso"}
          options={[
            StatusReembolso.Pendiente,
            StatusReembolso.Pagado,
            StatusReembolso.Cancelado,
            StatusReembolso.NoAplica,
          ]}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon id={"moneda"} label={"Moneda"} options={convertMonedas} />
      </Grid>

      <Grid size={2}>
        <TextFieldCommon id="noFactura" label="No Factura" />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon id="folioFiscal" label="Folio Fiscal" />
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
        <DatePickerCommon id="fechaDeFactura" label="Fecha de Factura" />
      </Grid>

      <Grid size={2}>
        <DatePickerCommon id="fechaProgramadaPago" label="Programada Pago" />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0, marginBottom: 0 }}>
        <TextFieldCommon id="subtotal" label="Subtotal" />
      </Grid>

      <Grid size={6} />

      <Grid size={2}>
        <DatePickerCommon id="fechaPago" label="Fecha Pago" />
      </Grid>
      <Grid size={2}>
        <DatePickerCommon id="fechaReembolso" label="Fecha Reembolso" />
      </Grid>

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
