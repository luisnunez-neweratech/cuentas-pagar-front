import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { addGiro, getGiro, updateGiro } from "../../../services/giros.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";

export const useGiro = () => {
  const { id } = useParams();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const addGiroMutation = useMutation({
    mutationFn: addGiro,
    onSuccess: () => {
      toast.success("Giro agregado correctamente");
      navigate("/catalogos/giros/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el giro");
      return;
    },
  });

  const updateGiroMutation = useMutation({
    mutationFn: updateGiro,
    onSuccess: () => {
      toast.success("Giro actualizado correctamente");
      navigate("/catalogos/giros/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el giro");
      return;
    },
  });

  const {
    isLoading,
    isError,
    error,
    data: giro,
  } = useQuery({
    queryKey: ["CatalogMaster", `${id}`],
    queryFn: () => getGiro(id || ""),
  });

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
