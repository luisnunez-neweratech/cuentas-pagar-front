import * as yup from "yup";

export const validationMoralSchema = yup.object().shape({
  noColaborador: yup
    .string()
    .max(8, "Maximo 8 caracteres")
    .required("Numero de Colaborador es requerido"),
  nombreColaborador: yup
    .string()
    .required("Numero de Colaborador es requerido"),
  fechaInicio: yup.date().required('Fecha inicio es requerida'),
  fechaFin: yup.date().required('Fecha fin es requerida'),
});
