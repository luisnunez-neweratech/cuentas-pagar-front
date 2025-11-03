import type { ActividadType } from "../components/common/AutoComplete/interfaces/Actividad";
import type { TipoEntidad } from "../dashboard/pages/proveedor/interfaces/TipoEntidad";
import type { TipoPersona } from "../dashboard/pages/proveedor/interfaces/TipoPersona";

export interface ProveedorOcasional {
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
