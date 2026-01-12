import { type StateCreator, create } from "zustand";

export interface FacturaXMLState {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const storeFacturaXML: StateCreator<FacturaXMLState> = (set) => ({
  openModal: false,

  handleOpenModal: () => {
    set({ openModal: true });
  },
  handleCloseModal: () => {
    set({ openModal: false });
  },
});

export const useFacturaXMLStore = create<FacturaXMLState>()(storeFacturaXML);
