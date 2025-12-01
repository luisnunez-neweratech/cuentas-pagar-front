import { useState } from "react";

export const useRangeFilters = () => {
  //const [fechaFactura, setFechaFactura] = useState([new Date(), new Date()]);
  const [fechaFactura, setFechaFactura] = useState(undefined);
  const [fechaPago, setFechaPago] = useState([null,null]);
  const [fechaProgramadaPago, setFechaProgramadaPago] = useState([null,null]);
  const [fechaReembolso, setFechaReembolsa] = useState([null,null]);

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
