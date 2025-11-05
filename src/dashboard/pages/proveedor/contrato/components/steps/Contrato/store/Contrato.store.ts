import { create } from "zustand";

interface IContrato {
  validScreen: boolean;
  validArchivoPrincipal: boolean;

  setValidScreen: (valido: boolean) => void;
  setValidArchivoPrincipal: (valido: boolean) => void;
  getValidScreen: () => boolean;
}

export const useContratoStore = create<IContrato>()((set, get) => ({
  validScreen: false,
  validArchivoPrincipal: false,

  setValidScreen: (valido: boolean) => {
    set({ validScreen: valido });
  },
  setValidArchivoPrincipal: (valido: boolean) => {
    set({ validArchivoPrincipal: valido });
  },
  getValidScreen: () => {
    return get().validArchivoPrincipal;
  }
}));
