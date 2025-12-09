import { useState } from "react";
import { useFacturaStore } from "../store/Factura.store";

export const useNewFacturaPage = () => {
  const [onClickGuardar, setOnClickGuardar] = useState(0);

  const validTabHeader = useFacturaStore((state) => state.validTabHeader);

  return {
    onClickGuardar,
    setOnClickGuardar,
    validTabHeader,
  };
};
