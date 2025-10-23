import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { validationSchema } from "../Validations";

export const useNewPassword = () => {
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);
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
