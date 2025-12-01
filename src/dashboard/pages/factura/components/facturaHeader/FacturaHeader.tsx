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
  const {
    onChangeAutocomplete,
    values,
    giros,
    convertMonedas,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFacturaHeader();

  return (
    <>
      <Grid size={2}>
        <NormalAutocomplete
          options={top100Films}
          label="Proveedor"
          id="proveedor"
          value={values.proveedorId}
          onChange={handleChange}
        />
      </Grid>

      <Grid size={2}>
        <NormalAutocomplete
          options={top100Films}
          label="Colaborador"
          id="colaborador"
          value={values.colaboradorId}
          onChange={handleChange}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"tipoDocumentoId"}
          label={"Documento"}
          options={[TipoDocumento.Factura, TipoDocumento.NotaCredito]}
          value={values.tipoDocumentoId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"statusFacturaId"}
          label={"Estatus Factura"}
          options={[
            StatusFactura.Pendiente,
            StatusFactura.Pagado,
            StatusFactura.Cancelado,
            StatusFactura.EnRevision,
          ]}
          value={values.statusFacturaId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"statusReembolsoId"}
          label={"Estatus Reembolso"}
          options={[
            StatusReembolso.Pendiente,
            StatusReembolso.Pagado,
            StatusReembolso.Cancelado,
            StatusReembolso.NoAplica,
          ]}
          value={values.statusReembolsoId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2}>
        <SelectCommon
          id={"monedaId"}
          label={"Moneda"}
          options={convertMonedas}
          value={values.monedaId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2}>
        <TextFieldCommon
          id="noFactura"
          label="No Factura"
          value={values.noFactura}
          handleChange={handleChange}
          typeMoneda={false}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="folioFiscal"
          label="Folio Fiscal"
          value={values.folioFiscal}
          handleChange={handleChange}
          typeMoneda={false}
        />
      </Grid>

      <Grid size={2}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "productos")}
          setValues={values.productos ?? []}
          itemsList={giros}
          maxItems={5}
          title="Productos o Servicios"
          id="giros-autocomplete"
        />
      </Grid>

      <Grid size={2}>
        <DatePickerCommon
          id="fechaFactura"
          label="Fecha de Factura"
          fechaValue={values.fechaFactura ?? ""}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid size={2}>
        <DatePickerCommon
          id="fechaProgramadaPago"
          label="Programada Pago"
          fechaValue={values.fechaProgramadaPago ?? ""}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0, marginBottom: 0 }}>
        <TextFieldCommon
          id="subtotal"
          label="Subtotal"
          value={values.subtotal}
          handleChange={handleChange}
          typeMoneda={true}
        />
      </Grid>

      <Grid size={6} />

      <Grid size={2}>
        <DatePickerCommon
          id="fechaPago"
          label="Fecha Pago"
          fechaValue={values.fechaPago ?? ""}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid size={2}>
        <DatePickerCommon
          id="fechaReembolso"
          label="Fecha Reembolso"
          fechaValue={values.fechaReembolso ?? ""}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="descuento"
          label="Descuento"
          value={values.descuento}
          handleChange={handleChange}
          typeMoneda={true}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="impuestos"
          label="Impuestos"
          value={values.impuestos}
          handleChange={handleChange}
          typeMoneda={true}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="ivaRetenido"
          label="IVA Retenido"
          value={values.ivaRetenido}
          handleChange={handleChange}
          typeMoneda={true}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="isrRetenido"
          label="ISR Retenido"
          value={values.isrRetenido}
          handleChange={handleChange}
          typeMoneda={true}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="total"
          label="Total"
          value={values.total}
          handleChange={handleChange}
          typeMoneda={true}
        />
      </Grid>
    </>
  );
};
