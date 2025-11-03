import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { validationSchema } from "../Validations";
import { toast } from "sonner";
import { addGiro, getGiro, updateGiro } from "../../../services/giros.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGiro = () => {
  const { id } = useParams();
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
        toast.error(error.response?.data.message);
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
        toast.error(error.response?.data.message);
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
    isFetching,
  } = useQuery({
    queryKey: ["SupplierActivity", `${id}`],
    queryFn: () => getGiro(id || ""),
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
      console.log(values);
      //TODO enviar data al api
      if (id) {
        updateGiroMutation.mutate({ id, descripcion: values.nombre });
        return;
      } else {
        addGiroMutation.mutate(values.nombre);
        return;
      }
    },
  });

  return {
    id,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  };
};
