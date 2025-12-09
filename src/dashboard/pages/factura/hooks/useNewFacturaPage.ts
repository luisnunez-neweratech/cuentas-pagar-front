import { useState } from "react";
import { useFacturaStore } from "../store/Factura.store";

export const useNewFacturaPage = () => {
  const [onClickGuardar, setOnClickGuardar] = useState(0);

  const validTabHeader = useFacturaStore((state) => state.validTabHeader);
  const validTabDetail = useFacturaStore((state) => state.validTabDetail);
  const validTabTotal = useFacturaStore((state) => state.validTabTotal);

  

  return {
    onClickGuardar,
    setOnClickGuardar,
    validTabHeader,
    validTabDetail,
    validTabTotal
  };
};
