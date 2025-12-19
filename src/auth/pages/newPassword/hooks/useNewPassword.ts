import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router";
import { validationSchema } from "../Validations";
import { useAuthLayoutStore } from "../../../store/authLayout.store";
import { useMutation } from "@tanstack/react-query";
import { newPasswordAction } from "../../../services/newPassword.action";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useEffect } from "react";

export const useNewPassword = () => {
  let [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

  const newPasswordMutation = useMutation({
    mutationFn: newPasswordAction,
    onSuccess: () => {
      toast.success("Contraseña actualizada");
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al cambiar la contraseña");
    },
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {        
        newPasswordMutation.mutate({
          email: searchParams.get("email") ?? "",
          password: values.password,
        });
      },
    });

  useEffect(() => {
    setIsLoading(newPasswordMutation.isPending);
  }, [newPasswordMutation.isPending]);

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
};
