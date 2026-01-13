import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().email().required("Correo electrónico es requerido"),
  password: yup.string().required("Contraseña es requerida"),
});
