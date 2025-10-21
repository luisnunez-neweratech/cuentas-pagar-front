import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { validationSchema } from "../Validations";
import { useAuthStore } from "../../../store/auth.store";

export const useNewPassword = () => {
  const { setLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);
        setLoading(true);
        navigate("/auth/login");
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
