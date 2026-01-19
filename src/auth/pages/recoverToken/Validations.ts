import * as yup from "yup";

export const validationSchema = yup.object({
  token: yup.string().required("Token es requerido"),
});
