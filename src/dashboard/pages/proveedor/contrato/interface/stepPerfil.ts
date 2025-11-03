import type { ActividadType } from "../../../../../components/common/AutoComplete/interfaces/Actividad";
import type { TipoEntidad } from "../../interfaces/TipoEntidad";
import type { TipoPersona } from "../../interfaces/TipoPersona";

export interface StepPerfil {
  tipoProveedor: string;
  tipoEntidad: TipoEntidad;
  tipoPersona: TipoPersona;
  rfc?: string;
  razonSocial: string;
  alias: string;
  email?: string;
  giroPrincipal?: string;
  productos?: ActividadType[];
}
