import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { validationSchema } from "../Validations";
import { useMutation } from "@tanstack/react-query";
import { recoverPasswordAction } from "../../../services/recoverPassword.action";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAuthLayoutStore } from "../../../store/authLayout.store";

export const useRecoverPassword = () => {
  const navigate = useNavigate();
  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

  const recoverPasswordMutation = useMutation({
    mutationFn: recoverPasswordAction,
    onSuccess: () => {     
      navigate("/auth/token");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Error al enviar el correo con el token");
    },
  });

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
        recoverPasswordMutation.mutate({email: values.email})        
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
