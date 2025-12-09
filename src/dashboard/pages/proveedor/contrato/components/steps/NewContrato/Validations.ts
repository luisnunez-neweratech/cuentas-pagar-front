import * as yup from "yup";

export const validationFisicoSchema = yup.object().shape({
  checkContractor: yup.boolean(),
  noColaborador: yup
    .string()
    .max(8, "Máximo 8 caracteres")
    .required("Número de Colaborador es requerido"),
  condicionesPago: yup
    .number()
    .required("Condiciones de Pago es requerido")
    .typeError("Condiciones de Pago es requerido"),
});
