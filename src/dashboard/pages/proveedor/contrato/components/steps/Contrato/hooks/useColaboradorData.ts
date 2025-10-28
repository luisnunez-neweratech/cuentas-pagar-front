import { useFormik } from "formik";
import { validationMoralSchema } from "../components/ColaboratorValidation";
import { useState } from "react";

export const useColaboradorData = () => {
  const [status, setStatus] = useState<boolean>(true);

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
      noColaborador: "",
      nombreColaborador: "",
      fechaInicio: null, // Or dayjs() for a default value
      fechaFin: null, // Or dayjs() for a default value
    },
    validationSchema: validationMoralSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateForm,
    status,
    setStatus
  };
};
