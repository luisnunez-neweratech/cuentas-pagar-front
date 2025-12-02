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

interface props {
  onClickGuardar: number;
}

export const FacturaHeader = ({ onClickGuardar }: props) => {
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
    convertColaboradores,
    id,
    setFieldTouched,
  } = useFacturaHeader({ onClickGuardar });

  return (
    <>
      <Grid size={2}>
        <NormalAutocomplete
          options={top100Films}
          label="Proveedor"
          id="proveedorId"
          value={values.proveedorId}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2}>
        <NormalAutocomplete
          options={convertColaboradores}
          label="Colaborador"
          id="colaboradorId"
          value={values.colaboradorId}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
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
          disable={!id ? true : false}
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
          disable={!id ? true : false}
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
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="folioFiscal"
          label="Folio Fiscal"
          value={values.folioFiscal}
          handleChange={handleChange}
          typeMoneda={false}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={2}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "productos")}
          setValues={values.productos ?? []}
          itemsList={giros}
          maxItems={2}
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
          touched={touched}
          errors={errors}
          setFieldTouched={setFieldTouched}
        />
      </Grid>

      <Grid size={2}>
        <DatePickerCommon
          id="fechaProgramadaPago"
          label="Programada Pago"
          fechaValue={values.fechaProgramadaPago ?? ""}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
          setFieldTouched={setFieldTouched}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0, marginBottom: 0 }}>
        <TextFieldCommon
          id="subtotal"
          label="Subtotal"
          value={values.subtotal}
          handleChange={handleChange}
          typeMoneda={true}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>

      <Grid size={6} />

      <Grid size={2}>
        <DatePickerCommon
          id="fechaPago"
          label="Fecha Pago"
          fechaValue={values.fechaPago ?? ""}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
          setFieldTouched={setFieldTouched}
        />
      </Grid>
      <Grid size={2}>
        <DatePickerCommon
          id="fechaReembolso"
          label="Fecha Reembolso"
          fechaValue={values.fechaReembolso ?? ""}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
          setFieldTouched={setFieldTouched}
        />
      </Grid>

      <Grid size={2} sx={{ marginTop: 0 }}>
        <TextFieldCommon
          id="descuento"
          label="Descuento"
          value={values.descuento}
          handleChange={handleChange}
          typeMoneda={true}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
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
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
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
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
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
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
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
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>
    </>
  );
};
