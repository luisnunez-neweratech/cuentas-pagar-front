import type { ActividadType } from "../components/common/AutoComplete/interfaces/Actividad";
import type { TipoEntidad } from "../dashboard/pages/proveedor/interfaces/TipoEntidad";

export interface ProveedorOcasional {
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
