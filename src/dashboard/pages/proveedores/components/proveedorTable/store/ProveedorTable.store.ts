import { create } from "zustand";

interface IProveedorTable {
  openModal: boolean;

  handleOpenModal: () => void;
  handleClose: () => void;
}

export const useProveedorTableStore = create<IProveedorTable>()((set) => ({
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
