import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { useQueries } from "./useQueries";
import { useMutations } from "./useMutations";

export const usePlazo = () => {
  const { id } = useParams();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const { isLoading, isError, error, plazo } = useQueries({ id });
  const { addPlazoMutation, updatePlazoMutation } = useMutations({ navigate });

  const getData = () => {
    if (plazo) {
      return { nombre: plazo.descripcion, value: plazo.value };
    }
    return {
      nombre: "",
      value: "",
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
        updatePlazoMutation.mutate({
          id,
          descripcion: values.nombre,
          value: values.value != null ? +values.value : null,
        });
        return;
      } else {
        addPlazoMutation.mutate({
          descripcion: values.nombre,
          value: values.value != null ? +values.value : null,
        });
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
      toast.error("Error al obtener la moneda de venta");
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
