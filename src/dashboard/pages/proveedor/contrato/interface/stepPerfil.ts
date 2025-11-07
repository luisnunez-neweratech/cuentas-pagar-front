import type { Giro } from "../../../catalogos/giros/interfaces/Giro";
export interface StepPerfil {
  tipoProveedor: number;
  tipoEntidad: number;
  tipoPersona: number;
  rfc?: string;
  razonSocial: string;
  alias: string;
  email?: string;
  giroPrincipal?: string;
  productos?: Giro[];
}
