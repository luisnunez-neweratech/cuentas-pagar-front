import { useFormik } from "formik";
import { validationMoralSchema } from "../components/ColaboratorValidation";
import { useState } from "react";

interface props {
  id: number;
  isValidForm: (id: number, valid: boolean) => void;
}

export const useColaboradorData = ({ id, isValidForm }: props) => {
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

  const onMouseLeaveComponent = async () => {
    handleSubmit(); // show the errors
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        isValidForm(id, true);
      } else {
        isValidForm(id, false);
      }

      //console.log("values validated 2", value)
    }); // si no es objeto vacio hay errores
  };

  return {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    status,
    setStatus,
    onMouseLeaveComponent,
  };
};
