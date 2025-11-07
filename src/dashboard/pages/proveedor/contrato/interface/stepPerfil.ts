import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
import type { TipoPersona } from "../../interfaces/TipoPersona";

export interface StepPerfil {
  tipoProveedor: number;
  tipoEntidad: number;
  tipoPersona: TipoPersona;
  rfc?: string;
  razonSocial: string;
  alias: string;
  email?: string;
  giroPrincipal?: string;
  productos?: Giro[];
}
