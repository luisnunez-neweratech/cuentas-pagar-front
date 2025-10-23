import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { validationSchema } from "../Validations";

export const useRecoverPassword = () => {
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);
        //TODO endpoint to send email

        navigate("/auth/token");
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
