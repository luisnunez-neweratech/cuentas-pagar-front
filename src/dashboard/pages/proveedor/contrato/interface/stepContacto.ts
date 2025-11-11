export interface StepContacto {
  id: number;
  valido: boolean;
  tipoContacto: number;
  contacto: string;
  telefono: string;
  email: string;
  paginaWeb?: string;
  newElement?: boolean;
}
