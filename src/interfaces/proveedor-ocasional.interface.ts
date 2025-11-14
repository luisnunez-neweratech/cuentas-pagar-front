import type { Giro } from "../dashboard/pages/catalogos/giros/interfaces/Giro";

export interface ProveedorOcasional {
  tipoProveedor: number;
  tipoEntidad: number;
  tipoPersona: number;
  rfc?: string;
  razonSocial: string;
  alias: string;
  email?: string;
  productos?: Giro[];
}
