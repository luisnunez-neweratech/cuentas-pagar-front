import { create } from "zustand";
import type { ProveedorOcasional } from "../../../../../interfaces/proveedor-ocasional.interface";

interface IProveedorOcasional {
  proveedorOcasional: ProveedorOcasional | null;
  openModal: boolean;

  setProveedorOcasional: (proveedor: ProveedorOcasional) => void;
  clearProveedorOcasional: () => void;
  handleOpenModal: () => void;
  handleClose: () => void;
}

export const useProveedorOcasionalStore = create<IProveedorOcasional>()(
  (set) => ({
    proveedorOcasional: null,
    openModal: false,

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
  })
);
