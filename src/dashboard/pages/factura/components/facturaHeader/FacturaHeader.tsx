import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { AutoCompleteComponent } from "../../../../../components/common/AutoComplete/AutoComplete";
import { useFacturaHeader } from "./hooks/useFacturaHeader";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";
import { DatePickerCommon } from "../../../../../components/common/DatePickerCommon/DatePickerCommon";
import { NormalAutocomplete } from "../../../../../components/common/NormalAutocomplete/NormalAutocomplete";
import { TipoDocumento } from "../../../facturas/interfaces/TipoDocumento";
import { StatusReembolso } from "../../../facturas/interfaces/StatusReembolso";
import { StatusFactura } from "../../../facturas/interfaces/StatusFactura";
import { NumericFormat } from "react-number-format";

interface props {
  onClickGuardar: number;
}

export const FacturaHeader = ({ onClickGuardar }: props) => {
  const {
    onChangeAutocomplete,
    values,
    giros,
    convertMonedas,
    convertProveedores,
    convertColaboradores,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    id,
    setFieldTouched,
  } = useFacturaHeader({ onClickGuardar });

  return (
    <>
      <Grid size={2}>
        <NormalAutocomplete
          options={convertProveedores}
          label="Proveedor"
          id="proveedorId"
          value={values.proveedorId}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          touched={touched.proveedorId?.value}
          errors={errors.proveedorId?.value}
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
          touched={touched.colaboradorId?.value}
          errors={errors.colaboradorId?.value}
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
        <FormControl
          fullWidth
          size="small"
          error={touched.productos && Boolean(errors.productos)}
        >
          <AutoCompleteComponent
            onChange={(e) => onChangeAutocomplete(e, "productos")}
            setValues={values.productos ?? []}
            itemsList={giros}
            maxItems={2}
            title="Productos o Servicios"
            id="giros-autocomplete"
          />
          <FormHelperText>
            {touched.productos && errors.productos?.toString()}
          </FormHelperText>
        </FormControl>
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
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="subtotal"
          label="Subtotal"
          value={values.subtotal}
          onValueChange={(values) => {
            const { value } = values;
            setFieldValue("subtotal", value);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.subtotal && Boolean(errors.subtotal)}
          helperText={touched.subtotal && errors.subtotal?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { textAlign: "right" },
            },
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
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
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="descuento"
          label="Descuento"
          value={values.descuento}
          onValueChange={(values) => {
            const { value } = values;
            setFieldValue("descuento", value);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.descuento && Boolean(errors.descuento)}
          helperText={touched.descuento && errors.descuento?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { textAlign: "right" },
            },
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="impuestos"
          label="Impuestos"
          value={values.impuestos}
          onValueChange={(values) => {
            const { value } = values;
            setFieldValue("impuestos", value);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.impuestos && Boolean(errors.impuestos)}
          helperText={touched.impuestos && errors.impuestos?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { textAlign: "right" },
            },
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="ivaRetenido"
          label="IVA Retenido"
          value={values.ivaRetenido}
          onValueChange={(values) => {
            const { value } = values;
            setFieldValue("ivaRetenido", value);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.ivaRetenido && Boolean(errors.ivaRetenido)}
          helperText={touched.ivaRetenido && errors.ivaRetenido?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { textAlign: "right" },
            },
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="isrRetenido"
          label="ISR Retenido"
          value={values.isrRetenido}
          onValueChange={(values) => {
            const { value } = values;
            setFieldValue("isrRetenido", value);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.isrRetenido && Boolean(errors.isrRetenido)}
          helperText={touched.isrRetenido && errors.isrRetenido?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { textAlign: "right" },
            },
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={10} />
      <Grid size={2} sx={{ marginTop: 0 }}>
        <NumericFormat
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          id="total"
          label="Total"
          value={values.total}
          onValueChange={(values) => {
            const { value } = values;
            setFieldValue("total", value);
          }}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          onBlur={handleBlur}
          error={touched.total && Boolean(errors.total)}
          helperText={touched.total && errors.total?.toString()}
          allowNegative
          decimalScale={2}
          slotProps={{
            input: {
              style: { textAlign: "right" },
            },
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>
    </>
  );
};
