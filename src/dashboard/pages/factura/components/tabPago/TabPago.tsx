import { Grid, FormHelperText } from "@mui/material";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";
import { DatePickerCommon } from "../../../../../components/common/DatePickerCommon/DatePickerCommon";
import { NormalAutocomplete } from "../../../../../components/common/NormalAutocomplete/NormalAutocomplete";
import { FacturaFooter } from "../facturaFooter/FacturaFooter";
import { useTabPago } from "./hooks/useTabPago";
import { StatusReembolso } from "../../../facturas/interfaces/StatusReembolso";
import { useFacturaStore } from "../../store/Factura.store";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { getFacturaId } from "../../lib/facturas";

interface props {
  setOnClickGuardar: any;
  onClickGuardar: any;
  convertStatusFactura: any;
  values: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
  setFieldValue: any;
  setFieldTouched: any;
}

export const TabPago = ({
  setOnClickGuardar,
  onClickGuardar,
  convertStatusFactura,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
}: props) => {
  const {
    convertColaboradores,
    convertPlazoPagos,
    convertMonedas,
    id,
    convertContratos,
    convertFacturas,
    showTipoCambio,
    statusFacturaData,
  } = useTabPago(values.proveedorId?.value, values.monedaId || null);

  const scheduledPaymentMessage = useFacturaStore(
    (state) => state.scheduledPaymentMessage,
  );

  return (
    <Grid container spacing={2} sx={{ marginTop: -58 }}>
      <Grid size={2}>
        <SelectCommon
          id={"condicionesPagoId"}
          label={"Condiciones de Pago"}
          options={convertPlazoPagos}
          value={values.condicionesPagoId}
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
          options={convertStatusFactura}
          value={values.statusFacturaId}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
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
        {scheduledPaymentMessage && (
          <FormHelperText
            sx={{ marginLeft: 1.75, marginTop: 0.5, color: "info.main" }}
          >
            {scheduledPaymentMessage}
          </FormHelperText>
        )}
      </Grid>
      <Grid size={2}>
        <SelectCommon
          id={"monedaId"}
          label={"Moneda"}
          options={convertMonedas}
          value={values.monedaId || ""}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>
      <Grid size={2}>
        {showTipoCambio && (
          <TextFieldCommon
            id="tipoCambio"
            label="Tipo de Cambio"
            value={values.tipoCambio || ""}
            handleChange={handleChange}
            typeMoneda={true}
            handleBlur={handleBlur}
            touched={touched}
            errors={errors}
          />
        )}
      </Grid>

      <Grid size={2} />

      <Grid size={2} sx={{ marginTop: -2 }}>
        {/* estatus factura 56 = por reembolsar , 65 = reembolsada */}
        {(values.statusFacturaId === 56 || values.statusFacturaId === 63) && (
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
        )}
      </Grid>
      <Grid size={2} sx={{ marginTop: -2 }}>
        {/* estatus factura 56 = por reembolsar , 65 = reembolsada */}
        {(values.statusFacturaId === 56 || values.statusFacturaId === 63) && (
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
        )}
      </Grid>
      <Grid size={2} sx={{ marginTop: -2 }}>
        {values.statusFacturaId ===
          getFacturaId("POR REEMBOLSAR", statusFacturaData) ||
          (values.statusFacturaId ===
            getFacturaId("REEMBOLSADA", statusFacturaData) && (
            <DatePickerCommon
              id="fechaReembolso"
              label="Fecha Reembolso"
              fechaValue={values.fechaReembolso ?? ""}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              setFieldTouched={setFieldTouched}
            />
          ))}
      </Grid>

      <Grid size={2} sx={{ marginTop: -2 }}>
        {((!id &&
          (values.statusFacturaId ===
            getFacturaId("POR REEMBOLSAR", statusFacturaData) ||
            values.statusFacturaId ===
              getFacturaId("PAGADA", statusFacturaData) ||
            values.statusFacturaId ===
              getFacturaId("REEMBOLSADA", statusFacturaData))) ||
          id) && (
          <DatePickerCommon
            id="fechaPago"
            label="Fecha Pago"
            fechaValue={values.fechaPago ?? ""}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
            setFieldTouched={setFieldTouched}
          />
        )}
      </Grid>

      <Grid size={2} sx={{ marginTop: -2 }}>
        {/* contratos*/}
        {values.proveedorId && values.proveedorId.value > 0 && (
          <NormalAutocomplete
            options={convertContratos}
            label="Contrato"
            id="contractId"
            value={values.contractId}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            touched={touched.contractId?.value}
            errors={errors.contractId?.value}
          />
        )}
      </Grid>

      <Grid size={2} />

      <Grid size={2}>
        {values.tipoDocumentoId === 2 && // nota de credito
          values.proveedorId &&
          values.proveedorId.value > 0 && (
            <NormalAutocomplete
              options={convertFacturas}
              label="Facturas"
              id="relatedInvoiceId"
              value={values.relatedInvoiceId}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched.relatedInvoiceId?.value}
              errors={errors.relatedInvoiceId?.value}
            />
          )}
      </Grid>

      <Grid size={11} />

      <FacturaFooter
        setOnClickGuardar={setOnClickGuardar}
        onClickGuardar={onClickGuardar}
      />
    </Grid>
  );
};
