import * as yup from "yup";

export const validationSchema = yup.object().shape({
  tipoContacto: yup.string().required("Tipo Contacto es requerido"),
  contacto: yup.string().required("Contacto es requerido"),
  telefono: yup.string().required("Telefono es requerido"),
  email: yup
    .string()
    .email("Tiene que ser un Email valido")
    .required("Email es requerido"),
});
