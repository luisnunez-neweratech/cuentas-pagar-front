import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { validationSchema } from "../Validations";

export const useRecoverToken = () => {  
  const navigate = useNavigate();



  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        token: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);        
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
