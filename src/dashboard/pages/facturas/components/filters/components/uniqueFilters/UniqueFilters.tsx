import { Grid } from "@mui/material";
import { useUniqueFilters } from "./hooks/useUniqueFilters";
import { TextFieldCommon } from "../../../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { SelectCommon } from "../../../../../../../components/common/SelectCommon/SelectCommon";
import { TipoDocumento } from "../../../../interfaces/TipoDocumento";
import { NormalAutocomplete } from "../../../../../../../components/common/NormalAutocomplete/NormalAutocomplete";

export const UniqueFilters = () => {
  const {
    convertMonedas,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    convertColaboradores,
    setFieldValue
  } = useUniqueFilters();

  return (
    <>
      <Grid size={2}>
        <TextFieldCommon
          id="noFactura"
          label="No. Factura"
          typeMoneda={false}
          value={values.noFactura}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>
      <Grid size={2}>
        <TextFieldCommon
          id="year"
          label="Año"
          typeMoneda={false}
          value={values.year}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched}
          errors={errors}
        />
      </Grid>
      <Grid size={2}>
        <SelectCommon
          id={"documentoId"}
          label={"Documento"}
          options={[TipoDocumento.Factura, TipoDocumento.NotaCredito]}
          value={values.documentoId}
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
    </>
  );
};
