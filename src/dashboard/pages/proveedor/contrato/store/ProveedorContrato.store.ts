import { type StateCreator, create } from "zustand";
import type { StepPerfil } from "../interface/stepPerfil";

export interface AuthState {
  skipped: Set<number>;
  activeStep: number;
  stepPerfil?: StepPerfil | null;

  isStepSkipped: (step: number) => boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  setStepPerfil: (stepPerfil: StepPerfil) => void;
}

const storeProveedorContrato: StateCreator<AuthState> = (set, get) => ({
  skipped: new Set<number>(),
  activeStep: 0,
  stepPerfil: null,

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
});

export const useProveedorContratoStore = create<AuthState>()(
  storeProveedorContrato
);
