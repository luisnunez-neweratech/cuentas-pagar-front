import { useRef, useState } from "react";
import { useFormik } from "formik";
import { type SelectChangeEvent } from "@mui/material";
import { validationSchema } from "../Validations";

export const useNuevoProveedorOcasional = () => {
  const [fileList, setFileList] = useState<File | null>(null);
  const [tipoPersona, setTipoPersona] = useState("");
  const [tipoEntidad, setTipoEntidad] = useState("");
  const [contractor, setContractor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        tipoEntidad: "",
        tipoPersona: "",
        rfc: "",
        razonSocial: "",
        alias: "",
        email: "",
        giroPrincipal: "",
        productos: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log(values);
      },
    });

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

    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
};
