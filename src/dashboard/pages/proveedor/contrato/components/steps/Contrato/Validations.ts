import * as yup from "yup";

export const validationFisicoSchema = yup.object().shape({
  noColaborador: yup
    .string()
    .max(8, "Maximo 8 caracteres")
    .required("Numero de Colaborador es requerido"),
    fileCSF: yup.mixed().required('File is required'),
});
