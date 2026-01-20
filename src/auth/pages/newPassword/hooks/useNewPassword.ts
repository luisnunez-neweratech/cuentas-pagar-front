import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router";
import { validationSchema } from "../Validations";
import { useAuthLayoutStore } from "../../../store/authLayout.store";
import { useEffect } from "react";
import { useMutations } from "./useMutations";

export const useNewPassword = () => {
  let [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { newPasswordMutation } = useMutations({ navigate });

  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);

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
