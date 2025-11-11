import type { Colaboradores } from "./Colaboradores";
import type { Documentos } from "./Documentos";

export interface StepContrato {
  id?: number | null;
  contractor: boolean;
  noColaborador?: string;
  colaboradores?: Colaboradores[];
  documentos: Documentos;
}
