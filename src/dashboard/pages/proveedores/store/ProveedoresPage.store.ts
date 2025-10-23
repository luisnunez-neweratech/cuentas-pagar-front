import { create } from "zustand";

interface IProveedoresPage {
  openModal: boolean;

  handleOpenModal: () => void;
  handleClose: () => void;
}

export const useProveedoresPageStore = create<IProveedoresPage>()((set) => ({
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
