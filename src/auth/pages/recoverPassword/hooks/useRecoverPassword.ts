import { useEffect } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useAuthStore } from "../../../store/auth.store";

export const useRecoverPassword = () => {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(false);
  }, []);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);
        setLoading(true);
      },
    });

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
};
