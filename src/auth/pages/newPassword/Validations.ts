import * as yup from "yup";

export const validationSchema = yup.object({
  password: yup.string().required("Nueva contraseña es requerida"),
  newPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir"),
});
