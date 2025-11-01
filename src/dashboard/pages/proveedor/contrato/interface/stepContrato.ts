import type { Colaboradores } from "./colaboradores";
import type { Documentos } from "./Documentos";

export interface StepContrato {
  contractor: boolean;
  noColaborador?: string;
  colaboradores?: Colaboradores[];
  documentos: Documentos;
}
