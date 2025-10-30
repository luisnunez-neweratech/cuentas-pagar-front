import type { ActividadType } from "../components/common/AutoComplete/interfaces/Actividad";

export interface ProveedorOcasional {
    tipoProveedor: string;
    tipoEntidad: string;
    tipoPersona: string;
    rfc?: string;
    razonSocial: string;
    alias: string;
    email?: string;
    giroPrincipal?: string;
    productos?: ActividadType[];
}