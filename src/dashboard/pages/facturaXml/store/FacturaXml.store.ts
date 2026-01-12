import { type StateCreator, create } from "zustand";

export interface FacturaXMLState {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;

  facturaResult: any;
  setFacturaResult: (facturaResult: any) => void;
}

const storeFacturaXML: StateCreator<FacturaXMLState> = (set) => ({
  openModal: false,
  facturaResult: {
    invoiceId: null,
    messages: [],
    warnings: [],
  },

  handleOpenModal: () => {
    set({ openModal: true });
  },
  handleCloseModal: () => {
    set({ openModal: false });
  },
  setFacturaResult: (facturaResult: any) => {
    set({ facturaResult });
  },
});

export const useFacturaXMLStore = create<FacturaXMLState>()(storeFacturaXML);
