import { useRef, useState } from "react";
import { type SelectChangeEvent } from "@mui/material";

export const usePerfil = () => {
  const [fileList, setFileList] = useState<File | null>(null);
  const [tipoPersona, setTipoPersona] = useState("");
  const [tipoProveedor, setTipoProveedor] = useState("");
  const [contractor, setContractor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeTipoPersona = (event: SelectChangeEvent) => {
    setTipoPersona(event.target.value as string);
  };

  const handleChangeTipoProveedor = (event: SelectChangeEvent) => {
    setTipoProveedor(event.target.value as string);
  };
  return {
    fileList,
    setFileList,
    tipoPersona,
    tipoProveedor,
    contractor,
    setContractor,
    inputRef,
    handleChangeTipoPersona,
    handleChangeTipoProveedor,
  };
};
