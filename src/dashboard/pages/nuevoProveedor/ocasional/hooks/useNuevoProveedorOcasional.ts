import { useRef, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../Validations";

export const useNuevoProveedorOcasional = () => {
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

  return {
    contractor,
    setContractor,
    inputRef,

    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
};
