import type { ActividadType } from "../../../../../components/common/AutoComplete/interfaces/Actividad";
import type { TipoEntidad } from "../../interfaces/TipoEntidad";

export interface StepPerfil {
  tipoProveedor: string;
  tipoEntidad: TipoEntidad;
  tipoPersona: string;
  rfc?: string;
  razonSocial: string;
  alias: string;
  email?: string;
  giroPrincipal?: string;
  productos?: ActividadType[];
}
