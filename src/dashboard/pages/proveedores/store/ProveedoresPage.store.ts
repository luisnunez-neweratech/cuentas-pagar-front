import { create } from "zustand";
import type { ProveedorOcasional } from "../../../../interfaces/proveedor-ocasional.interface";

interface IProveedoresPage {
  openModal: boolean;
  proveedorOcasional: ProveedorOcasional | null;

  setProveedorOcasional: (proveedor: ProveedorOcasional) => void;
  clearProveedorOcasional: () => void;

  handleOpenModal: () => void;
  handleClose: () => void;
}

export const useProveedoresPageStore = create<IProveedoresPage>()((set) => ({
  openModal: false,
  proveedorOcasional: null,

  setProveedorOcasional: (proveedor: ProveedorOcasional) => {
    set({ proveedorOcasional: proveedor });
  },
  clearProveedorOcasional: () => {
    set({ proveedorOcasional: null });
  },

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
