import * as yup from "yup";

export const validationFisicoSchema = yup.object().shape({
  checkContractor: yup.boolean(),
  noColaborador: yup
    .string()
    .max(8, "Maximo 8 caracteres")
    .required("Numero de Colaborador es requerido"),
});
