import { useState } from "react";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useFormik } from "formik";
import { validationSchema } from "../components/Validations";

export const useContactosData = () => {
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );

  const [status, setStatus] = useState<boolean>(true);
  const [fileName, setFileName] = useState("");

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateForm,
  } = useFormik({
    initialValues: {
      tipoContacto: "",
      contacto: "",
      telefono: "",
      email: "",
      paginaWeb: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    status,
    setStatus,
    handleFileChange,
    fileName,
    tipoEntidad: getStepPerfil()?.tipoEntidad,
  };
};
