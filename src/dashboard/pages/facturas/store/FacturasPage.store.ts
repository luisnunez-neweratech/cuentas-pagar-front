import { create } from "zustand";
import type { FiltrosFacturas } from "../interfaces/FiltrosFacturas.interface";

const initFiltros: FiltrosFacturas = {
  supplierAliases: [],
  productServices: [],
  months: [],
  invoiceStatusIds: [],
  reimbursementStatuses: [],
  invoiceDateFrom: "",
  invoiceDateTo: "",
  scheduledPaymentFrom: "",
  scheduledPaymentTo: "",
  paymentDateFrom: "",
  paymentDateTo: "",
  reimbursementDateFrom: "",
  reimbursementDateTo: "",
  invoiceNumber: "",
  documentType: undefined,
  invoiceYear: undefined,
  currencyId: undefined,
  currencyLabel: undefined,
  collaboratorName: "",
  fiscalFolio: "",
};

interface IFacturasPage {
  openModal: boolean;
  openFacturaModal: boolean;
  openCommentsModal: boolean;
  filtrosFacturas: FiltrosFacturas;
  callApi: number;
  idSelected: string;

  handleOpenModal: () => void;
  handleClose: () => void;
  handleOpenFacturaModal: () => void;
  handleCloseFacturaModal: () => void;
  handleOpenCommentsModal: (idSelected: string) => void;
  handleCloseCommentsModal: () => void;
  setFiltrosFacturas: (
    filtrosFacturas:
      | FiltrosFacturas
      | ((prev: FiltrosFacturas) => FiltrosFacturas),
  ) => void;
  clearFiltros: () => void;
  setCallApi: () => void;
  setIdSelected: (id: string) => void;
}

export const useFacturasPageStore = create<IFacturasPage>()((set, get) => ({
  openModal: false,
  openFacturaModal: false,
  openCommentsModal: false,
  filtrosFacturas: initFiltros,
  callApi: 0,
  idSelected: "",

  handleOpenModal: () => {
    set({
      openModal: true,
    });
  },
  handleClose: () => {
    set({
      openModal: false,
    });
  },
  handleOpenFacturaModal: () => {
    set({
      openFacturaModal: true,
    });
  },
  handleCloseFacturaModal: () => {
    set({
      openFacturaModal: false,
    });
  },
  handleOpenCommentsModal: (idSelected: string) => {
    set({
      openCommentsModal: true,
      idSelected,
    });
  },
  handleCloseCommentsModal: () => {
    set({
      openCommentsModal: false,
    });
  },
  setFiltrosFacturas: (filtrosFacturas) => {
    set((state) => ({
      filtrosFacturas:
        typeof filtrosFacturas === "function"
          ? filtrosFacturas(state.filtrosFacturas)
          : filtrosFacturas,
    }));
  },
  clearFiltros: () => {
    set({
      filtrosFacturas: initFiltros,
      callApi: get().callApi + 1,
    });
  },
  setCallApi: () => {
    set({
      callApi: get().callApi + 1,
    });
  },
  setIdSelected: (id: string) => {
    set({
      idSelected: id,
    });
  },
}));
