import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { validationSchema } from "../Validations";
import { useAuthLayoutStore } from "../../../store/authLayout.store";
import { useMutation } from "@tanstack/react-query";
import { newPasswordAction } from "../../../services/newPassword.action";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useNewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  if(!email || email.length === 0){
    navigate("/auth/login");
  }

  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

  const newPasswordMutation = useMutation({
    mutationFn: newPasswordAction,
    onSuccess: (newPassword) => {
      //const { token, mail, nickName, name, colaboratorId } = login;

      console.log("newPassword", newPassword);
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
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
        console.log(values);
        newPasswordMutation.mutate({
          email: email ?? "",
          password: values.password,
        });
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
