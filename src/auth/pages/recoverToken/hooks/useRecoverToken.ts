import { useNavigate, useSearchParams } from "react-router";
import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useMutation } from "@tanstack/react-query";
import { verifyToken } from "../../../services/recoverToken.action";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAuthLayoutStore } from "../../../store/authLayout.store";
import { axiosErrorMessage } from "../../../../lib/axiosError";

export const useRecoverToken = () => {
  let [searchParams, _setSearchParams] = useSearchParams();
  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);
  const verifyTokenMutation = useMutation({
    mutationFn: verifyToken,
    onSuccess: () => {
      toast.info("Token Correcto");
      navigate(`/auth/new-password?email=${searchParams.get("email")}`);
    },
    onError: (error) => {
      toast.error(axiosErrorMessage(error, "Token incorrecto"));
    },
  });

  const navigate = useNavigate();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        token: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        verifyTokenMutation.mutate({
          email: searchParams.get("email") ?? "",
          token: values.token,
        });
      },
    });

  useEffect(() => {
    setIsLoading(verifyTokenMutation.isPending);
  }, [verifyTokenMutation.isPending]);

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
};
