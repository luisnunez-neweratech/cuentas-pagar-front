import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { useQueries } from "./useQueries";
import { useMutations } from "./useMutations";

export const useGiro = () => {
  const { id } = useParams();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const { isLoading, isError, error, giro } = useQueries({ id });
  const { addGiroMutation, updateGiroMutation } = useMutations({ navigate });

  const getData = () => {
    if (giro) {
      return { nombre: giro.descripcion ?? "" };
    }
    return {
      nombre: "",
    };
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: getData(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (id) {
        updateGiroMutation.mutate({ id, descripcion: values.nombre });
        return;
      } else {
        addGiroMutation.mutate(values.nombre);
        return;
      }
    },
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al obtener el giro");
    }
  }, [isError]);

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  };
};
