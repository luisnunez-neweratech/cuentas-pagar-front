import { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useAuthLayoutStore } from "../../../store/authLayout.store";
import { useMutations } from "./useMutations";

export const useLoginPage = () => {
  const { loginMutation } = useMutations();
  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(loginMutation.isPending);
  }, [loginMutation.isPending]);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async ({ email, password }) => {
        try {
          loginMutation.mutate({ email, password });
          return;
        } catch (error) {
          console.error("error", error);
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
    isPending: loginMutation.isPending,
  };
};
