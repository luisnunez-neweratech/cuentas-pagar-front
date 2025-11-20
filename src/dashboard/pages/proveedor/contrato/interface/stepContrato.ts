import type { Colaboradores } from "./Colaboradores";
import type { Documentos } from "./Documentos";

export interface StepContrato {
  id?: number | null;
  contractor: boolean;
  noColaborador?: string;
  colaboradores?: Colaboradores[];
  documentos: Documentos;
}

export interface NewStepContrato {
  id?: number | null;
  contractor: boolean;
  noColaborador?: string;
  colaboradores?: Colaboradores[];
  documentos: NewDocumento[];
}

 export interface NewDocumento {
  id?: number;
  fechaInicio: string;
  fechaFin?: string;
  indeterminado: boolean;
  fileValue?: File | null;
  addToContrato?: boolean;  
  fileName?: string; // nombre del archivo de BD
  tipoDocumento: number;
  newElement: boolean;
}
