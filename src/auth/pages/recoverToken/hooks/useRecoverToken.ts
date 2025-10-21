import { useEffect } from "react";
import { useAuthStore } from "../../../store/auth.store";
import { useFormik } from "formik";
import { validationSchema } from "../Validations";

export const useRecoverToken = () => {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(false);
  }, []);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        token: "",
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
