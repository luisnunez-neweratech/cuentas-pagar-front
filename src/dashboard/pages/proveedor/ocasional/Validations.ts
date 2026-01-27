import * as yup from "yup";
import { TipoEntidad } from "../interfaces/TipoEntidad";

export const validationSchema = (tipoPersona: number) => yup.object().shape({
  tipoEntidad: yup.string().required("Tipo Entidad es requerido"),
  tipoPersona: yup.string().required("Tipo Persona es requerido"),
  razonSocial: yup.string().required("Razon Social es requerido"),
  alias: yup.string().required("Alias es requerido"),
  rfc: yup
    .string()
    .min(tipoPersona === 1 ? 13 : 12, `RFC debe tener ${tipoPersona === 1 ? 13 : 12} caracteres`)
    .max(tipoPersona === 1 ? 13 : 12, `RFC debe tener ${tipoPersona === 1 ? 13 : 12} caracteres`)
    .ensure()
    .when("tipoEntidad", {
      is: TipoEntidad.Local.value.toString(),
      then: (schema) => schema.required("RFC es requerido"),
    }),
  email: yup.string().email("Email no es válido"),
  condicionesPago: yup
    .number()
    .required("Condiciones de Pago es requerido")
    .typeError("Condiciones de Pago es requerido"),
});
