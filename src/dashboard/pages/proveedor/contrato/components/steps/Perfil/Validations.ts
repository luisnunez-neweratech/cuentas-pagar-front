import * as yup from "yup";
import { TipoEntidad } from "../../../../interfaces/TipoEntidad";

export const validationSchema = yup.object().shape({
  tipoEntidad: yup.string().required("Tipo Entidad es requerido"),
  tipoPersona: yup.string().required("Tipo Persona es requerido"),
  razonSocial: yup.string().required("Razon Social es requerido"),
  alias: yup.string().required("Alias es requerido"),
  rfc: yup
    .string()
    .ensure()
    .max(13, "13 caracteres máximo")
    .when("tipoEntidad", {
      is: TipoEntidad.Local.value.toString(),
      then: (schema) => schema.required("RFC es requerido"),
    }),
  email: yup.string().email("Email no es válido"),
});
