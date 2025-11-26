import { Grid } from "@mui/material";
import { useState } from "react";
//import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { AutoCompleteComponent } from "../../../../../components/common/AutoComplete/AutoComplete";
import { useFilters } from "./hooks/useFilters";

interface FiltersProps {
  showFilter: boolean;
}

export const Filters = ({ showFilter }: FiltersProps) => {
  const {
    onChangeAutocomplete,
    proveedores,
    values,
    giros,
    meses,
    estatusReembolso,
    estatusFactura,
  } = useFilters();

  const [_state, _setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <>
      {showFilter && (
        <>
          <Grid size={4}>
            {/* proveedores */}
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
          <Grid size={3}>
            {/*Fecha factura */}
            {/* <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              //ranges={state}
              //showDateRangePicker={false}
            /> */}
          </Grid>
          <Grid size={3}>
            {/*Fecha de pago */}
            {/*  <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> */}
          </Grid>
          <Grid size={3}>
            {/*Fecha programada pago */}
            {/*  <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> */}
          </Grid>
          <Grid size={3}>
            {/*Fecha reembolso */}
            {/*  <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> */}
          </Grid>
        </>
      )}
    </>
  );
};
