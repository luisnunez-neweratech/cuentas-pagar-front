import { create } from "zustand";

interface IContrato {
  validScreen: boolean;
  validArchivoPrincipal: boolean;
  validArchivoCSF: boolean;
  validIdRepLegal: boolean;

  setValidScreen: (valido: boolean) => void;
  setValidArchivoPrincipal: (valido: boolean) => void;
  setValidArchivoCSF: (valido: boolean) => void;
  setValidIdRepLegal: (valido: boolean) => void;
  getValidScreen: () => boolean;
}

export const useContratoStore = create<IContrato>()((set, get) => ({
  validScreen: false,
  validArchivoPrincipal: false, // requerido
  validArchivoCSF: false, // requerido
  validIdRepLegal: false, // requerido

  setValidScreen: (valido: boolean) => {
    set({ validScreen: valido });
  },
  setValidArchivoPrincipal: (valido: boolean) => {
    set({ validArchivoPrincipal: valido });
  },
  setValidArchivoCSF: (valido: boolean) => {
    set({ validArchivoCSF: valido });
  },
  setValidIdRepLegal: (valido: boolean) => {
    set({ validIdRepLegal: valido });
  },
  getValidScreen: () => {
    return (
      get().validArchivoPrincipal &&
      get().validArchivoCSF &&
      get().validIdRepLegal
    );
  },
}));
