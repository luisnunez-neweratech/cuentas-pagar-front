import { Grid } from "@mui/material";
import { useUniqueFilters } from "./hooks/useUniqueFilters";
import { TextFieldCommon } from "../../../../../../../components/common/TextFieldCommon/TextFieldCommon";
import { SelectCommon } from "../../../../../../../components/common/SelectCommon/SelectCommon";
import { TipoDocumento } from "../../../../interfaces/TipoDocumento";
import { NormalAutocomplete } from "../../../../../../../components/common/NormalAutocomplete/NormalAutocomplete";

const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export const UniqueFilters = () => {
  const { convertMonedas } = useUniqueFilters();

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
          id={"documento"}
          label={"Documento"}
          options={[TipoDocumento.Factura, TipoDocumento.NotaCredito]}
        />
      </Grid>
      <Grid size={2}>
        <SelectCommon id={"moneda"} label={"Moneda"} options={convertMonedas} />
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
