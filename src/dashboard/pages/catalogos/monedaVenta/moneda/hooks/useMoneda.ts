import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import {
  addMonedaVenta,
  updateMonedaVenta,
  getMonedaVenta,
} from "../../../services/monedaVenta.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";

export const useMoneda = () => {
  const { id } = useParams();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const navigate = useNavigate();

  const addMonedaMutation = useMutation({
    mutationFn: addMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de Venta agregado correctamente");
      navigate("/catalogos/moneda-venta/");
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

  const updateMonedaMutation = useMutation({
    mutationFn: updateMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de Ventas actualizado correctamente");
      navigate("/catalogos/moneda-venta/");
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
    queryFn: () => getMonedaVenta(id || ""),
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
        updateMonedaMutation.mutate({ id, descripcion: values.nombre });
        return;
      } else {
        addMonedaMutation.mutate(values.nombre);
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
