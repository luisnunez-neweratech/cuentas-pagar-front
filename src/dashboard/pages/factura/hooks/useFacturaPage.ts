import { useState } from "react";

export const useFacturaPage = () => {
  const [onClickGuardar, setOnClickGuardar] = useState(0);

  return {
    onClickGuardar,
    setOnClickGuardar,
  };
};
