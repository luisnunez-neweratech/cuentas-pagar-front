import { type StateCreator, create } from "zustand";
import type { StepPerfil } from "../interface/stepPerfil";
import type { StepContrato } from "../interface/stepContrato";
import type { StepDomicilio } from "../interface/stepDomicilio";
import type { StepCuentaBancaria } from "../interface/stepCuentaBancaria";

export interface AuthState {
  skipped: Set<number>;
  activeStep: number;
  stepPerfil?: StepPerfil | null;
  stepContrato?: StepContrato | null;
  stepDomicilio?: StepDomicilio | null;
  stepCuentaBancaria?: StepCuentaBancaria | null;

  isStepSkipped: (step: number) => boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;

  setStepPerfil: (stepPerfil: StepPerfil) => void;
  getStepPerfil: () => StepPerfil | null | undefined;

  setStepContrato: (stepContrato: StepContrato) => void;
  getStepContrato: () => StepContrato | null | undefined;

  setStepDomicilio: (stepDomicilio: StepDomicilio) => void;
  getStepDomicilio: () => StepDomicilio | null | undefined;

  setStepCuentaBancaria: (stepCuentaBancaria: StepCuentaBancaria) => void;
  getStepCuentaBancaria: () => StepCuentaBancaria | null | undefined;
}

const storeProveedorContrato: StateCreator<AuthState> = (set, get) => ({
  skipped: new Set<number>(),
  activeStep: 0,
  stepPerfil: null,
  stepContrato: {
    contractor: false,
    noColaborador: "",
    colaboradores: [
      {
        nombre: "",
        noColaborador: "",
        fechaFin: "",
        fechaInicio: "",
      },
    ],
  },
  stepDomicilio: {
    pais: "",
    codigoPostal: "",
    estado: "",
    municipio: "",
    ciudad: "",
    colonia: "",
    calle: "",
    numInterior: "",
    numExterior: "",
  },
  stepCuentaBancaria: {
    cuentasBancarias: [
      {
        banco: "",
        monedaVenta: "",
        clabe: "",
        swift: "",
        condicionesPago: "",
        status: true,
      },
    ],
  },

  isStepSkipped: (step: number) => {
    return get().skipped.has(step);
  },
  handleNext: () => {
    let newSkipped = get().skipped;
    if (get().isStepSkipped(get().activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(get().activeStep);
    }
    set({ activeStep: get().activeStep + 1, skipped: newSkipped });
  },
  handleBack: () => {
    set({
      activeStep: get().activeStep - 1,
    });
  },
  handleReset: () => {
    set({
      activeStep: 0,
    });
  },
  setStepPerfil: (stepPerfil: StepPerfil) => {
    set({ stepPerfil: stepPerfil });
  },
  getStepPerfil: () => {
    return get().stepPerfil;
  },

  setStepContrato: (stepContrato: StepContrato) => {
    set({ stepContrato: stepContrato });
  },
  getStepContrato: () => {
    return get().stepContrato;
  },

  setStepDomicilio: (stepDomicilio: StepDomicilio) => {
    set({ stepDomicilio: stepDomicilio });
  },
  getStepDomicilio: () => {
    return get().stepDomicilio;
  },

  setStepCuentaBancaria: (stepCuentaBancaria: StepCuentaBancaria) => {
    set({ stepCuentaBancaria: stepCuentaBancaria });
  },
  getStepCuentaBancaria: () => {
    return get().stepCuentaBancaria;
  },
});

export const useProveedorContratoStore = create<AuthState>()(
  storeProveedorContrato
);
