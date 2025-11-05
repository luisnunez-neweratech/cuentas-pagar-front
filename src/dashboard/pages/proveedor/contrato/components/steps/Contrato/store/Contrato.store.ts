import { create } from "zustand";

interface IContrato {
  validScreen: boolean;

  setValidScreen: (valido: boolean) => void;
}

export const useContratoStore = create<IContrato>()((set) => ({
  validScreen: false,

  setValidScreen: (valido: boolean) => {
    set({ validScreen: valido });
  },
}));
