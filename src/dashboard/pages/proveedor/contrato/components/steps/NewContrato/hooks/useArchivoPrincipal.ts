import { useState } from "react";

export const useArchivoPrincipal = () => {
  const [agregarPropuesta, setAgregarPropuesta] = useState(false);
  const [agregarAnexo, setAgregarAnexo] = useState(false);

  return {
    agregarPropuesta,
    setAgregarPropuesta,
    agregarAnexo,
    setAgregarAnexo,
  };
};
