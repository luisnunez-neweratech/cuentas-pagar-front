import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import {
  addPlazoPago,
  updatePlazoPago,
  getPlazoPago,
} from "../../../services/plazoPago.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";

export const usePlazo = () => {
  const { id } = useParams();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const addPlazoMutation = useMutation({
    mutationFn: addPlazoPago,
    onSuccess: () => {
      toast.success("Condicion de Pago agregado correctamente");
      navigate("/catalogos/plazo-pago/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar la condicion de pago");
      return;
    },
  });

  const updatePlazoMutation = useMutation({
    mutationFn: updatePlazoPago,
    onSuccess: () => {
      toast.success("Condiciones de Pago actualizado correctamente");
      navigate("/catalogos/plazo-pago/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar la condicion de pago");
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
    queryFn: () => getPlazoPago(id || ""),
  });

  const getData = () => {
    if (giro) {
      return { nombre: giro.descripcion };
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
        updatePlazoMutation.mutate({ id, descripcion: values.nombre });
        return;
      } else {
        addPlazoMutation.mutate(values.nombre);
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
