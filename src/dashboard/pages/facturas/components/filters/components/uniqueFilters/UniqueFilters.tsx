import { Grid } from "@mui/material";
import { useUniqueFilters } from "./hooks/useUniqueFilters";
import { TextFieldCommon } from "../../../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { SelectCommon } from "../../../../../../../components/common/SelectCommon/SelectCommon";
import { TipoDocumento } from "../../../../interfaces/TipoDocumento";
import { NormalAutocomplete } from "../../../../../../../components/common/NormalAutocomplete/NormalAutocomplete";

const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export const UniqueFilters = () => {
  const { convertMonedas, values, handleChange, handleBlur, touched, errors } =
    useUniqueFilters();

  return (
    <>
      <Grid size={2}>
        <TextFieldCommon
          id="noFactura"
          label="No. Factura"
          typeMoneda={false}
        />
      </Grid>
      <Grid size={2}>
        <TextFieldCommon id="year" label="Año" typeMoneda={false} />
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
          options={top100Films}
          label="Colaborador"
          id="colaborador"
        />
      </Grid>
    </>
  );
};
