import * as yup from "yup";
import { TipoEntidad } from "../../../../interfaces/TipoEntidad";

export const validationSchema = yup.object().shape({
  tipoEntidad: yup.string().required("Tipo Entidad es requerido"),
  tipoPersona: yup.string().required("Tipo Persona es requerido"),
  razonSocial: yup.string().required("Razon Social es requerido"),
  alias: yup.string().required("Alias es requerido"),
  rfc: yup
    .string()
    /* .matches(
      /^([A-Z&Ññ]{3}|[A-Z][AEIOU][A-Z]{2})\d{2}((01|03|05|07|08|10|12)(0[1-9]|[12]\d|3[01])|02(0[1-9]|[12]\d)|(04|06|09|11)(0[1-9]|[12]\d|30))([A-Z0-9]{2}[0-9A])$/i,
      "Tiene que ser un RFC valido"
    ) */
    .max(13, "13 caracteres máximo")
    .ensure()
    .when("tipoEntidad", {
      is: TipoEntidad.Local.value.toString(),
      then: (schema) => schema.required("RFC es requerido"),
    }),
  email: yup.string().email("Email no es válido"),
});
