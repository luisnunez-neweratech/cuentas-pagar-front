import * as yup from "yup";

export const validationSchema = yup.object().shape({
  nombre: yup.string().required("Giro es requerido"),
});
