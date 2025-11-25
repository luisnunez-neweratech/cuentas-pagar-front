import { Grid } from "@mui/material";
import { useState } from "react";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface FiltersProps {
  showFilter: boolean;
}

export const Filters = ({ showFilter }: FiltersProps) => {
  const [_state, setState] = useState([
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
           {/*  <AutoCompleteComponent
              onChange={onChangeAutocomplete}
              setValues={values.productos}
            /> */}
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
