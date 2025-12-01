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
  historialDocumentos: HistorialDocumentos[] | [];
  listaContratos: ListaContratos[] | [];
}

export interface NewDocumento {
  id?: number;
  fechaInicio: string;
  fechaFin?: string;
  indeterminado: boolean;
  fileValue?: any | null;
  addToContrato?: boolean;
  fileName?: string; // nombre del archivo de BD
  tipoDocumento: number;
  newElement: boolean;
  perteneceContratoId?: number | null;
}

export interface HistorialDocumentos {
  id: number;
  fechaInicio: string;
  fechaFin?: string;
  indeterminado: boolean;
  fileUrl: string;
  fileName: string;
  tipoDocumento: number;
}

export interface ListaContratos {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  indeterminado: string;
  nombreArchivo: string;
}
