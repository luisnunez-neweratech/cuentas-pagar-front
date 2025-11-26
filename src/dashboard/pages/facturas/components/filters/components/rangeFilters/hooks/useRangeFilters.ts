import { useState } from "react";
import { type DateRange } from "@mui/x-date-pickers-pro";
//import dayjs, { Dayjs } from "dayjs";
import { Dayjs } from "dayjs";

export const useRangeFilters = () => {
  const [fechaFactura, setFechaFactura] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);
  const [fechaPago, setFechaPago] = useState<DateRange<Dayjs>>([null, null]);
  const [fechaProgramadaPago, setFechaProgramadaPago] = useState<
    DateRange<Dayjs>
  >([null, null]);
  const [fechaReembolso, setFechaReembolsa] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  return {
    fechaFactura,
    setFechaFactura,
    fechaPago,
    setFechaPago,
    fechaProgramadaPago,
    setFechaProgramadaPago,
    fechaReembolso,
    setFechaReembolsa,
  };
};
