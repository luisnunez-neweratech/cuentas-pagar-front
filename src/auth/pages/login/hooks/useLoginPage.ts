import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useAuthStore } from "../../../store/auth.store";

export const useLoginPage = () => {
  const { setLoading, login } = useAuthStore();
  const navigate = useNavigate();

  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async ({ email, password }) => {
        setLoading(true);
        const isValid = await login(email, password);
        setLoading(false);
        if (isValid) {
          navigate("/");
          return;
        }

        toast.error("Correo o contraseña incorrecta ");
        setIsPosting(false);
      },
    });

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isPosting,
  };
};
