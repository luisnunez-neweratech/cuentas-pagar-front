import * as yup from "yup";

export const validationSchema = yup.object().shape({
  pais: yup.string().required("Pais es requerido"),
  codigoPostal: yup.string().required("Codigo Postal es requerido"),
  estado: yup.string().required("Estado es requerido"),
  municipio: yup.string().required("Estado es requerido"),
  ciudad: yup.string().required("Ciudad es requerido"),
  colonia: yup.string().required("Colonia es requerido"),
  calle: yup.string().required("Calle es requerido"),
});
