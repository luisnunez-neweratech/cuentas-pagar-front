import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from 'react-router';
import { validationSchema } from "../Validations";
import { useAuthStore } from "../../../store/auth.store";

export const useRecoverPassword = () => {
  const { setLoading } = useAuthStore();
  const navigate = useNavigate();

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
        //TODO endpoint to send email
        setLoading(true);
        navigate('/auth/token');
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
