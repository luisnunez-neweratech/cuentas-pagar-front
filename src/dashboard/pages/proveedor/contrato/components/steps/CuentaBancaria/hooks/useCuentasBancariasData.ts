import { useFormik } from "formik";

import { useState } from "react";

export const useCuentasBancariasData = () => {
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
      banco: "",
      monedaVenta: "",
      clabe: "",
      swift: "",
      condicionesPago: "",
    },
    validationSchema: null, //validationMoralSchema,
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
    fileName
  };
};
