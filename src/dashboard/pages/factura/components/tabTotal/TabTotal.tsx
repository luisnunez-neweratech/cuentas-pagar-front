import { Grid, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface props {
  setCorrectAmoutValue: any;
  values: any;
  handleBlur: any;
  touched: any;
  errors: any;
}

export const TabTotal = ({
  setCorrectAmoutValue,
  values,
  handleBlur,
  touched,
  errors,
}: props) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <NumericFormat
          fullWidth
          variant="outlined"
          size="small"
          id="subtotal"
          label="Importe Total Detalle"
          value={values.subtotal}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "subtotal");
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
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>
      <Grid size={12}>
        <NumericFormat
          fullWidth
          variant="outlined"
          size="small"
          id="descuento"
          label="Descuento"
          value={values.descuento}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "descuento");
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
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={12}>
        <NumericFormat
          fullWidth
          variant="outlined"
          size="small"
          id="impuestos"
          label="Impuestos"
          value={values.impuestos}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "impuestos");
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
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={12}>
        <NumericFormat
          fullWidth
          variant="outlined"
          size="small"
          id="ivaRetenido"
          label="IVA Retenido"
          value={values.ivaRetenido}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "ivaRetenido");
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
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={12}>
        <NumericFormat
          fullWidth
          variant="outlined"
          size="small"
          id="isrRetenido"
          label="ISR Retenido"
          value={values.isrRetenido}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "isrRetenido");
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
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid size={12}>
        <NumericFormat
          fullWidth
          variant="outlined"
          size="small"
          id="total"
          label="Total"
          value={values.total}
          onValueChange={(newValues) => {
            let { value } = newValues;
            setCorrectAmoutValue(value, "total");
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
            htmlInput: {
              style: { textAlign: "right" },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
