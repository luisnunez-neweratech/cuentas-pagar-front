import { Grid } from "@mui/material";
import { AutoCompleteComponent } from "../../../../../../../components/common/AutoComplete/AutoComplete";
import { useAutocompleteFilters } from "./hooks/useAutocompleteFilters";

export const AutocompleteFilters = () => {
  const {
    onChangeAutocomplete,
    proveedores,
    values,
    giros,
    meses,
    estatusReembolso,
    estatusFactura,
  } = useAutocompleteFilters();
  return (
    <>
      <Grid size={4}>
        <AutoCompleteComponent
          id="proveedores-autocomplete"
          onChange={(e) => onChangeAutocomplete(e, "proveedores")}
          setValues={values.proveedores}
          itemsList={proveedores}
          maxItems={5}
          title="Proveedores"
        />
      </Grid>
      <Grid size={4}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "productos")}
          setValues={values.productos}
          itemsList={giros}
          maxItems={5}
          title="Productos o Servicios"
          id="giros-autocomplete"
        />
      </Grid>
      <Grid size={4}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "meses")}
          setValues={values.meses}
          itemsList={meses}
          maxItems={5}
          title="Mes"
          id="mes-autocomplete"
        />
      </Grid>
      <Grid size={4}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "estatusReembolso")}
          setValues={values.estatusReembolso}
          itemsList={estatusReembolso}
          maxItems={5}
          title="Estatus Reembolso"
          id="reembolso-autocomplete"
        />
      </Grid>
      <Grid size={4}>
        <AutoCompleteComponent
          onChange={(e) => onChangeAutocomplete(e, "estatusFactura")}
          setValues={values.estatusFactura}
          itemsList={estatusFactura}
          maxItems={5}
          title="Estatus Factura"
          id="factura-autocomplete"
        />
      </Grid>
      <Grid size={4} />
    </>
  );
};
