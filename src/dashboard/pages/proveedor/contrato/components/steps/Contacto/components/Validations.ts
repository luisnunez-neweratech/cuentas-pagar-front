import * as yup from "yup";

export const validationSchema = yup.object().shape({
  tipoContacto: yup.string().required("Tipo Contacto es requerido"),
  contacto: yup.string().required("Contacto es requerido"),
  telefono: yup.string().required("Teléfono es requerido"),
  email: yup
    .string()
    .email("Tiene que ser un Email valido")
    .required("Email es requerido"),
  paginaWeb: yup
    .string()
    .matches(
      /((https?):\/\/)?(www\.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Tiene que ser una Web Valida"
    ),
});
