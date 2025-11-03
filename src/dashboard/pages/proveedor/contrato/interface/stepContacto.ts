import type { TipoContacto } from "../../interfaces/TipoContacto";

export interface StepContacto {
  id: number;
  valido: boolean;
  tipoContacto: TipoContacto;
  contacto: string;
  telefono: string;
  email: string;
  paginaWeb?: string;
}
