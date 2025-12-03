import * as yup from "yup";

export const validationSchema = yup.object().shape({  
  cantidad: yup.number().required("TRequerido"),
  uMedida: yup.string().required("Requerido"),
  codigo: yup.string().required("Requerido"),
  concepto: yup.string().required("Requerido"),
  precio: yup.number().required("Requerido"),
  total: yup.number().required("Requerido"), 
});
