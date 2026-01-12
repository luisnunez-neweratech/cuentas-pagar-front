import { Grid, FormHelperText } from "@mui/material";
import { SelectCommon } from "../../../../../components/common/SelectCommon/SelectCommon";
import { DatePickerCommon } from "../../../../../components/common/DatePickerCommon/DatePickerCommon";
import { NormalAutocomplete } from "../../../../../components/common/NormalAutocomplete/NormalAutocomplete";
import { FacturaFooter } from "../facturaFooter/FacturaFooter";
import { useTabPago } from "./hooks/useTabPago";
import { StatusReembolso } from "../../../facturas/interfaces/StatusReembolso";
import { useFacturaStore } from "../../store/Factura.store";
import { TextFieldCommon } from "../../../../../components/common/TextFieldCommon/TextFieldCommon";

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
  const { convertColaboradores, convertPlazoPagos, convertMonedas, id } =
    useTabPago();

  const scheduledPaymentMessage = useFacturaStore(
    (state) => state.scheduledPaymentMessage
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
      </Grid>

      <Grid size={2} />

      <Grid size={2} sx={{ marginTop: -7 }}>
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
      <Grid size={2} sx={{ marginTop: -7 }}>
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

      <Grid size={2} sx={{ marginTop: -7 }}>
        {/* estatus factura 56 = por reembolsar , 65 = reembolsada */}
        {(values.statusFacturaId === 56 || values.statusFacturaId === 63) && (
          <DatePickerCommon
            id="fechaReembolso"
            label="Fecha Reembolso"
            fechaValue={values.fechaReembolso ?? ""}
            setFieldValue={setFieldValue}
            touched={touched}
            errors={errors}
            setFieldTouched={setFieldTouched}
          />
        )}
      </Grid>

      <Grid size={2} sx={{ marginTop: -7 }}>
        {/* estatus factura 56 = por reembolsar , 65 = reembolsada */}
        {((!id &&
          (values.statusFacturaId === 56 ||
            values.statusFacturaId === 53 ||
            values.statusFacturaId === 63)) ||
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

      <Grid size={2} sx={{ marginTop: -7 }} />

      <FacturaFooter
        setOnClickGuardar={setOnClickGuardar}
        onClickGuardar={onClickGuardar}
      />
    </Grid>
  );
};
