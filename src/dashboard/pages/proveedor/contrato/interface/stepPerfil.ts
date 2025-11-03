import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
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
  productos?: Giro[];
}
