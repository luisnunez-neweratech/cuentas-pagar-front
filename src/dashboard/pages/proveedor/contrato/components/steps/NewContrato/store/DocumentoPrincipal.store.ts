import { create } from "zustand";

interface IContrato {
  tipoDocumento: number;
  fechaInicio: string;
  fechaFin?: string | null;
  indeterminado: boolean;
  file: any | null;
  isPrincipal: boolean;

  updateTipoDocumento: (tipoDocumento: number) => void;

  updateArchivoPrincipal: (
    tipoDocumento: number,
    fechaInicio: string,
    indeterminado: boolean,
    file: any,
    isPrincipal: boolean,
    fechaFin?: string
  ) => void;

  clearData: () => void;
}

export const useDocumentoPrincipalStore = create<IContrato>()((set) => ({
  tipoDocumento: 0,
  fechaInicio: "",
  fechaFin: "",
  indeterminado: true,
  file: null,
  isPrincipal: false,

  updateTipoDocumento: (tipoDocumento: number) => {
    set({ tipoDocumento });
  },

  updateArchivoPrincipal: (
    tipoDocumento: number,
    fechaInicio: string,
    indeterminado: boolean,
    file: any,
    isPrincipal: boolean,
    fechaFin?: string
  ) => {
    set({
      tipoDocumento,
      fechaInicio,
      indeterminado,
      file,
      isPrincipal,
      fechaFin,
    });
  },
  clearData: () => {
    set({
      tipoDocumento: 0,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
      file: null,
      isPrincipal: false,
    });
  },
}));
