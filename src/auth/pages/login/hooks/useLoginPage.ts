import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useAuthStore } from "../../../../stores/auth/auth.store";

export const useLoginPage = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async ({ email, password }) => {
        try {
          await loginUser(email, password);
          navigate("/");
          return;
        } catch (error) {
          console.log("no se pudo autenticar");
          toast.error("Correo o contraseña incorrecta ");
        }
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
