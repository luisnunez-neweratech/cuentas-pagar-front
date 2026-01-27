import { create } from "zustand";

interface IProveedorTable {
  openModal: boolean;
  proveedorId: string | null;

  handleOpenModal: (proveedorId?: string) => void;
  handleClose: () => void;
  setProveedorId: (proveedorId: string | null) => void;
}

export const useProveedorTableStore = create<IProveedorTable>()((set) => ({
  openModal: false,
  proveedorId: null,

  handleOpenModal: (proveedorId?: string) => {
    set({
      openModal: true,
      proveedorId,
    });
  },
  handleClose: () => {
    set({
      openModal: false,
    });
  },
  setProveedorId: (proveedorId: string | null) => {
    set({
      proveedorId,
    });
  }
}));
