import { useState } from "react";

export const useNewFacturaPage = () => {
  const [onClickGuardar, setOnClickGuardar] = useState(0);

  return {
    onClickGuardar,
    setOnClickGuardar,
  };
};
