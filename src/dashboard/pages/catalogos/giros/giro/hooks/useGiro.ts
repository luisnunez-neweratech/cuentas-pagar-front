import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { validationSchema } from "../Validations";
import { toast } from "sonner";
import { addGiro } from "../../../services/giros.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGiro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //TODO crear store para mostrar la data
  /*  const giro = useGiroStore(
      (state) => state.giro
    ); */

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

  const initialFormValues = () => {
    /* if (id) {
      return {
        nombre: giro!.nombre,
      };
    } */
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
    initialValues: initialFormValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      //TODO enviar data al api
      if (id) {
        /* toast.info("Proveedor actualizado correctamente");
        navigate("/proveedor"); */
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
