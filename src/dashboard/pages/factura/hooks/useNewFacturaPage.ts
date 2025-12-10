import { useState } from "react";
import { useFacturaStore } from "../store/Factura.store";
import { useParams } from "react-router";

export const useNewFacturaPage = () => {

  const { id } = useParams();

  const [onClickGuardar, setOnClickGuardar] = useState(0);
  const [value, setValue] = useState(id ? 3 : 0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const validTabHeader = useFacturaStore((state) => state.validTabHeader);
  const validTabDetail = useFacturaStore((state) => state.validTabDetail);
  const validTabTotal = useFacturaStore((state) => state.validTabTotal);

  

  return {
    onClickGuardar,
    setOnClickGuardar,
    validTabHeader,
    validTabDetail,
    validTabTotal,
    value,
    handleChange
  };
};
