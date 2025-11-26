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
  const { onChangeProveedor, proveedores, values } = useFilters();

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
          <Grid size={3}>
            {/* proveedores */}
            <AutoCompleteComponent
              onChange={onChangeProveedor}
              setValues={values.proveedores}
              itemsList={proveedores}
              maxItems={5}
              title="Proveedores"
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
