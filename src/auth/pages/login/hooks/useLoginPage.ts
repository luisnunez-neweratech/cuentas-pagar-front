import { useEffect } from "react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useAuthStore } from "../../../../stores/auth/auth.store";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../../../services/login.action";
import type { User } from "../../../../interfaces/user.interface";
import { useAuthLayoutStore } from "../../../store/authLayout.store";

export const useLoginPage = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (login) => {
      const { token, mail, nickName, name, colaboratorId } = login;
      //mapper
      const user: User = {
        id: colaboratorId,
        email: mail,
        fullName: name,
        roles: ["Admin"], // TODO backend regrese los roles, por ahora todos son admin
        nickName,
      };
      loginUser(token, user);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Correo o contraseña incorrecta");
    },
  });

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
    isPending: loginMutation.isPending,
  };
};
