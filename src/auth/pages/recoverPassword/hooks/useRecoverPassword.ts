import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { validationSchema } from "../Validations";
import { useEffect } from "react";
import { useAuthLayoutStore } from "../../../store/authLayout.store";

import { useMutations } from "./useMutations";

export const useRecoverPassword = () => {
  const navigate = useNavigate();
  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

  const { recoverPasswordMutation } = useMutations({ navigate });

  useEffect(() => {
    setIsLoading(recoverPasswordMutation.isPending);
  }, [recoverPasswordMutation.isPending]);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        recoverPasswordMutation.mutate({ email: values.email });
      },
    });

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isPending: recoverPasswordMutation.isPending,
  };
};
