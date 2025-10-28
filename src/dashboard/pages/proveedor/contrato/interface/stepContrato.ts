import type { Colaboradores } from "./colaboradores";

export interface StepContrato {
    contractor: boolean,
    noColaborador?: string;   
    colaboradores?: Colaboradores[];
}