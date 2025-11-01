import { useFormik } from "formik";
import { useParams } from "react-router";
import { validationSchema } from "../Validations";

export const useGiro = () => {
  const { id } = useParams();
  //TODO crear store para mostrar la data
  /*  const giro = useGiroStore(
      (state) => state.giro
    ); */

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
      /* if (id) {
        toast.info("Proveedor actualizado correctamente");
        navigate("/proveedor");
      } else {
        toast.success("Proveedor creado correctamente");
        navigate("/proveedor");
      } */
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
