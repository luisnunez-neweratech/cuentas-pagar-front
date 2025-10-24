import { useState } from "react";
import { type SelectChangeEvent } from "@mui/material";

export const usePerfil = () => {
  const [tipoPersona, setTipoPersona] = useState("");
  const [tipoEntidad, setTipoEntidad] = useState("");

  const handleChangeTipoPersona = (event: SelectChangeEvent) => {
    setTipoPersona(event.target.value as string);
  };

  const handleChangeTipoEntidad = (event: SelectChangeEvent) => {
    setTipoEntidad(event.target.value as string);
  };
  return {
    tipoPersona,
    tipoEntidad,
    handleChangeTipoPersona,
    handleChangeTipoEntidad,
  };
};
