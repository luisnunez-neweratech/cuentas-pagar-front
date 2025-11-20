import { type StateCreator, create } from "zustand";
import type { StepPerfil } from "../interface/stepPerfil";
import type {
  NewDocumento,
  NewStepContrato,
  StepContrato,
} from "../interface/stepContrato";
import type { StepDomicilio } from "../interface/stepDomicilio";
import type { StepCuentaBancaria } from "../interface/stepCuentaBancaria";
import type { StepContacto } from "../interface/stepContacto";
import type { Colaboradores } from "../interface/Colaboradores";
import type { Documentos } from "../interface/Documentos";
import { TipoContacto } from "../../interfaces/TipoContacto";

const initialStepContrato = {
  id: null,
  contractor: false,
  noColaborador: "",
  colaboradores: [
    {
      id: 1,
      valido: false,
      nombre: "",
      noColaborador: "",
      fechaFin: "",
      fechaInicio: "",
      status: true,
      newElement: true,
    },
  ],
  documentos: {
    tipo: "contrato", //propuesta
    principal: {
      archivo: null,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    },
    csf: {
      archivo: null,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    },
    idRepLegal: {
      archivo: null,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    },
    compDomicilio: {
      archivo: null,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    },
    poderRepLegal: {
      archivo: null,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    },
    anexo: {
      archivo: null,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    },
  },
};

const initialNewStepContrato = {
  id: null,
  contractor: false,
  noColaborador: "",
  colaboradores: [
    {
      id: 1,
      valido: false,
      nombre: "",
      noColaborador: "",
      fechaFin: "",
      fechaInicio: "",
      status: true,
      newElement: true,
    },
  ],
  documentos: [
    {
      id: 1,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
      fileValue: null,
      addToContrato: false,
      fileName: "",
      tipoDocumento: 0,
      newElement: true,
    },
  ],
};

const initialStepDomicilio = {
  pais: "",
  codigoPostal: "",
  estado: "",
  municipio: "",
  ciudad: "",
  colonia: "",
  calle: "",
  numInterior: "",
  numExterior: "",
};

const initialStepCuentBancaria = [
  {
    id: 1,
    valido: false,
    banco: "",
    monedaVenta: "",
    clabe: "",
    swift: "",
    condicionesPago: "",
    status: true,
    fileValue: undefined,
    newElement: true,
  },
];
const initialStepContacto = [
  {
    id: 1,
    valido: false,
    tipoContacto: TipoContacto.Venta.value,
    contacto: "",
    telefono: "",
    email: "",
    paginaWeb: "",
    newElement: true,
  },
];

export interface AuthState {
  id: number | null;
  skipped: Set<number>;
  activeStep: number;
  stepPerfil?: StepPerfil | null;
  stepContrato?: StepContrato | null;
  newStepContrato?: NewStepContrato | null;
  stepDomicilio?: StepDomicilio | null;
  stepCuentaBancaria?: StepCuentaBancaria[] | null;
  stepContacto?: StepContacto[] | null;

  isStepSkipped: (step: number) => boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  setProveedorId: (id: number) => void;

  setStepPerfil: (stepPerfil: StepPerfil) => void;
  getStepPerfil: () => StepPerfil | null | undefined;

  setStepContrato: (stepContrato: StepContrato) => void;
  getStepContrato: () => StepContrato | null | undefined;
  addColaborador: (colaborador: Colaboradores) => void;
  removeColaborador: (id: number) => void;
  updateColaborador: (id: number, colaborador: Colaboradores) => void;
  updateDocumentos: (documentos: Documentos) => void;

  setNewStepContrato: (newStepContrato: NewStepContrato) => void;
  getNewStepContrato: () => NewStepContrato | null | undefined;
  addNewColaborador: (colaborador: Colaboradores) => void;
  removeNewColaborador: (id: number) => void;
  updateNewColaborador: (id: number, colaborador: Colaboradores) => void;
  addNewDocument: (documento: NewDocumento) => void;
  removeNewDocumento: (id: number) => void;
  updateNewDocumento: (id: number, documento: NewDocumento) => void;

  setStepDomicilio: (stepDomicilio: StepDomicilio) => void;
  getStepDomicilio: () => StepDomicilio | null | undefined;

  setStepCuentaBancaria: (stepCuentaBancaria: StepCuentaBancaria[]) => void;
  getStepCuentaBancaria: () => StepCuentaBancaria[] | null | undefined;
  addCuentaBancaria: (cuentaBancaria: StepCuentaBancaria) => void;
  removeCuentaBancaria: (id: number) => void;
  updateCuentaBancaria: (
    id: number,
    cuentaBancaria: StepCuentaBancaria
  ) => void;

  setStepContacto: (stepContacto: StepContacto[]) => void;
  getStepContacto: () => StepContacto[] | null | undefined;
  addContacto: (contacto: StepContacto) => void;
  removeContacto: (id: number) => void;
  updateContacto: (id: number, contacto: StepContacto) => void;
}

const storeProveedorContrato: StateCreator<AuthState> = (set, get) => ({
  id: null,
  skipped: new Set<number>(),
  activeStep: 0,
  stepPerfil: null,
  stepContrato: initialStepContrato,
  newStepContrato: initialNewStepContrato,
  stepDomicilio: initialStepDomicilio,
  stepCuentaBancaria: initialStepCuentBancaria,
  stepContacto: initialStepContacto,

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
      stepPerfil: null,
      stepContrato: initialStepContrato,
      newStepContrato: initialNewStepContrato,
      stepDomicilio: initialStepDomicilio,
      stepCuentaBancaria: initialStepCuentBancaria,
      stepContacto: initialStepContacto,
    });
  },
  setProveedorId: (id: number) => {
    set({ id: id });
  },
  setStepPerfil: (stepPerfil: StepPerfil) => {
    set({ stepPerfil: stepPerfil });
  },
  getStepPerfil: () => {
    return get().stepPerfil;
  },

  setNewStepContrato: (newStepContrato: NewStepContrato) => {
    set({ newStepContrato: newStepContrato });
  },
  getNewStepContrato: () => {
    return get().newStepContrato;
  },
  addNewColaborador: (colaborador: Colaboradores) => {
    set((state) => ({
      newStepContrato: {
        ...state.newStepContrato!,
        colaboradores: [
          ...(state.newStepContrato?.colaboradores ?? []),
          colaborador,
        ],
      },
    }));
  },
  removeNewColaborador: (id: number) => {
    set((state) => ({
      newStepContrato: {
        ...state.newStepContrato!,
        colaboradores: [
          ...(state.newStepContrato!.colaboradores!.filter(
            (item) => item.id !== id
          ) ?? []),
        ],
      },
    }));
  },
  updateNewColaborador: (id: number, colaborador: Colaboradores) => {
    set((state) => ({
      newStepContrato: {
        ...state.newStepContrato!,
        colaboradores: (state.newStepContrato?.colaboradores ?? []).map(
          (item) => (item.id === id ? { ...colaborador } : item)
        ),
      },
    }));
  },
  addNewDocument: (documento: NewDocumento) => {
    set((state) => ({
      newStepContrato: {
        ...state.newStepContrato!,
        documentos: [...(state.newStepContrato?.documentos ?? []), documento],
      },
    }));
  },
  removeNewDocumento: (id: number) => {
    set((state) => ({
      newStepContrato: {
        ...state.newStepContrato!,
        documentos: [
          ...(state.newStepContrato!.documentos!.filter(
            (item) => item.id !== id
          ) ?? []),
        ],
      },
    }));
  },
  updateNewDocumento: (id: number, documento: NewDocumento) => {
    set((state) => ({
      newStepContrato: {
        ...state.newStepContrato!,
        documentos: (state.newStepContrato?.documentos ?? []).map((item) =>
          item.id === id ? { ...documento } : item
        ),
      },
    }));
  },

  setStepContrato: (stepContrato: StepContrato) => {
    set({ stepContrato: stepContrato });
  },
  getStepContrato: () => {
    return get().stepContrato;
  },
  addColaborador: (colaborador: Colaboradores) => {
    set((state) => ({
      stepContrato: {
        ...state.stepContrato!,
        colaboradores: [
          ...(state.stepContrato?.colaboradores ?? []),
          colaborador,
        ],
      },
    }));
  },
  removeColaborador: (id: number) => {
    set((state) => ({
      stepContrato: {
        ...state.stepContrato!,
        colaboradores: [
          ...(state.stepContrato!.colaboradores!.filter(
            (item) => item.id !== id
          ) ?? []),
        ],
      },
    }));
  },
  updateColaborador: (id: number, colaborador: Colaboradores) => {
    set((state) => ({
      stepContrato: {
        ...state.stepContrato!,
        colaboradores: (state.stepContrato?.colaboradores ?? []).map((item) =>
          item.id === id ? { ...colaborador } : item
        ),
      },
    }));
  },
  updateDocumentos: (documentos: Documentos) => {
    set((state) => ({
      stepContrato: {
        ...state.stepContrato!,
        documentos: documentos,
      },
    }));
  },

  setStepDomicilio: (stepDomicilio: StepDomicilio) => {
    set({ stepDomicilio: stepDomicilio });
  },
  getStepDomicilio: () => {
    return get().stepDomicilio;
  },

  setStepCuentaBancaria: (stepCuentaBancaria: StepCuentaBancaria[]) => {
    set({ stepCuentaBancaria: stepCuentaBancaria });
  },
  getStepCuentaBancaria: () => {
    return get().stepCuentaBancaria;
  },
  addCuentaBancaria: (cuentaBancaria: StepCuentaBancaria) => {
    set((state) => ({
      stepCuentaBancaria: [...(state.stepCuentaBancaria ?? []), cuentaBancaria],
    }));
  },
  removeCuentaBancaria: (id: number) => {
    set((state) => ({
      stepCuentaBancaria: [
        ...(state.stepCuentaBancaria?.filter((item) => item.id !== id) ?? []),
      ],
    }));
  },
  updateCuentaBancaria: (id: number, cuentaBancaria: StepCuentaBancaria) => {
    console.log("cuentaBancaria", cuentaBancaria);

    set((state) => ({
      stepCuentaBancaria: (state.stepCuentaBancaria ?? []).map((item) => {
        return item.id === id ? { ...cuentaBancaria } : item;
      }),
    }));

    console.log("updated?", get().stepCuentaBancaria);
  },

  setStepContacto: (stepContacto: StepContacto[]) => {
    set({ stepContacto: stepContacto });
  },
  getStepContacto: () => {
    return get().stepContacto;
  },
  addContacto: (contacto: StepContacto) => {
    set((state) => ({
      stepContacto: [...(state.stepContacto ?? []), contacto],
    }));
  },
  removeContacto: (id: number) => {
    set((state) => ({
      stepContacto: [
        ...(state.stepContacto?.filter((item) => item.id !== id) ?? []),
      ],
    }));
  },
  updateContacto: (id: number, contacto: StepContacto) => {
    set((state) => ({
      stepContacto: (state.stepContacto ?? []).map((item) =>
        item.id === id ? { ...contacto } : item
      ),
    }));
  },
});

export const useProveedorContratoStore = create<AuthState>()(
  storeProveedorContrato
);
