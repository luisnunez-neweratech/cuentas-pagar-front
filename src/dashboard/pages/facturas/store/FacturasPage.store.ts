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
  collaboratorName: "",
  fiscalFolio: "",
};

interface IFacturasPage {
  openModal: boolean;
  filtrosFacturas: FiltrosFacturas;
  callApi: number;

  handleOpenModal: () => void;
  handleClose: () => void;
  setFiltrosFacturas: (
    filtrosFacturas: FiltrosFacturas | ((prev: FiltrosFacturas) => FiltrosFacturas)
  ) => void;
  clearFiltros: () => void;
  setCallApi: () => void;
}

export const useFacturasPageStore = create<IFacturasPage>()((set, get) => ({
  openModal: false,
  filtrosFacturas: initFiltros,
  callApi: 0,

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
}));
