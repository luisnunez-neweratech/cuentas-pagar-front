import { create } from "zustand";

interface IContrato {
  tipoDocumento: number;
  fechaInicio: string;
  fechaFin?: string | null;
  indeterminado: boolean;
  file: any | null;
  isPrincipal: boolean;

  propuestaFile: any | null;
  propuestaFechaInicio: string;
  propuestaFechaFin?: string | null;
  propuestaIndeterminado: boolean;

  anexoFile: any | null;
  anexoFechaInicio: string;

  updateArchivoPrincipal: (
    tipoDocumento: number,
    fechaInicio: string,
    indeterminado: boolean,
    file: any,
    isPrincipal: boolean,
    fechaFin?: string
  ) => void;

  updatePropuesta: (
    propuestaFile: any,
    propuestaFechaInicio: string,
    propuestaIndeterminado: boolean,
    propuestaFechaFin: string
  ) => void;

  updateAnexo: (anexoFile: any, anexoFechaInicio: string) => void;

  clearData: () => void;
}

export const useDocumentoPrincipalStore = create<IContrato>()((set) => ({
  tipoDocumento: 0,
  fechaInicio: "",
  fechaFin: "",
  indeterminado: true,
  file: null,
  isPrincipal: false,

  propuestaFile: null,
  propuestaFechaInicio: "",
  propuestaFechaFin: "",
  propuestaIndeterminado: true,

  anexoFile: null,
  anexoFechaInicio: "",

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
  updatePropuesta: (
    propuestaFile: any,
    propuestaFechaInicio: string,
    propuestaIndeterminado: boolean,
    propuestaFechaFin: string
  ) => {
    set({
      propuestaFile,
      propuestaFechaInicio,
      propuestaIndeterminado,
      propuestaFechaFin,
    });
  },
  updateAnexo: (anexoFile: any, anexoFechaInicio: string) => {
    set({
      anexoFile,
      anexoFechaInicio,
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

      propuestaFile: null,
      propuestaFechaInicio: "",
      propuestaFechaFin: "",
      propuestaIndeterminado: true,

      anexoFile: null,
      anexoFechaInicio: "",
    });
  },
}));
