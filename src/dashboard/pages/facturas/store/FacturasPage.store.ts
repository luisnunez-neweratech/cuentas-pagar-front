import { create } from "zustand";

interface IFacturasPage {
  openModal: boolean;

  handleOpenModal: () => void;
  handleClose: () => void;
}

export const useFacturasPageStore = create<IFacturasPage>()((set) => ({
  openModal: false,

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
}));
