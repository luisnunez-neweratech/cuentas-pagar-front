import type { Giro } from "../dashboard/pages/catalogos/giros/interfaces/Giro";
import type { TipoEntidad } from "../dashboard/pages/proveedor/interfaces/TipoEntidad";
import type { TipoPersona } from "../dashboard/pages/proveedor/interfaces/TipoPersona";

export interface ProveedorOcasional {
  tipoProveedor: number;
  tipoEntidad: TipoEntidad;
  tipoPersona: TipoPersona;
  rfc?: string;
  razonSocial: string;
  alias: string;
  email?: string;
  giroPrincipal?: string;
  productos?: Giro[];
}
