import * as yup from "yup";

export const validationSchema = yup.object().shape({  
  cantidad: yup.number().required("TRequerido"),
  uMedida: yup.string().notRequired(),
  codigo: yup.string().notRequired(),
  concepto: yup.string().required("Requerido"),
  precio: yup.number().required("Requerido"),
  total: yup.number().required("Requerido"), 
});
