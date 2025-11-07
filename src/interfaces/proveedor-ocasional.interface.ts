import type { Giro } from "../dashboard/pages/catalogos/giros/interfaces/Giro";
import type { TipoPersona } from "../dashboard/pages/proveedor/interfaces/TipoPersona";

export interface ProveedorOcasional {
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
