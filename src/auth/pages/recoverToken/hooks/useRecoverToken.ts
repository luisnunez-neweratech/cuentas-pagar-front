import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { useAuthStore } from "../../../store/auth.store";
import { validationSchema } from "../Validations";

export const useRecoverToken = () => {
  const { setLoading } = useAuthStore();
  const navigate = useNavigate();

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
        navigate("/auth/new-password");
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
