import { useNavigate, useSearchParams } from "react-router";
import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useEffect } from "react";
import { useAuthLayoutStore } from "../../../store/authLayout.store";
import { useMutations } from "./useMutations";

export const useRecoverToken = () => {
  let [searchParams, _setSearchParams] = useSearchParams();
  const setIsLoading = useAuthLayoutStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const { verifyTokenMutation } = useMutations({
    navigate,
    email: searchParams.get("email") ?? "",
  });

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
