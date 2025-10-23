import { useRef, useState } from "react";
import { type SelectChangeEvent } from "@mui/material";

export const useNuevoProveedorOcasional = () => {
  const [fileList, setFileList] = useState<File | null>(null);
  const [tipoPersona, setTipoPersona] = useState("");
  const [tipoEntidad, setTipoEntidad] = useState("");
  const [contractor, setContractor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeTipoPersona = (event: SelectChangeEvent) => {
    setTipoPersona(event.target.value as string);
  };

  const handleChangeTipoEntidad = (event: SelectChangeEvent) => {
    setTipoEntidad(event.target.value as string);
  };
  return {
    fileList,
    setFileList,
    tipoPersona,
    tipoEntidad,
    contractor,
    setContractor,
    inputRef,
    handleChangeTipoPersona,
    handleChangeTipoEntidad,
  };
};
