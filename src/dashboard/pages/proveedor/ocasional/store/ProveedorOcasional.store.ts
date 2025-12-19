import { create } from "zustand";
import type { ProveedorOcasional } from "../../../../../interfaces/proveedor-ocasional.interface";

interface IProveedorOcasional {
  proveedorOcasional: ProveedorOcasional | null;
  openModal: boolean;
  openDeleteModal: boolean;

  setProveedorOcasional: (proveedor: ProveedorOcasional) => void;
  clearProveedorOcasional: () => void;
  handleOpenModal: () => void;
  handleClose: () => void;
  handleOpenDeleteModal: () => void;
  handleCloseDeleteModal: () => void;
}

export const useProveedorOcasionalStore = create<IProveedorOcasional>()(
  (set) => ({
    proveedorOcasional: null,
    openModal: false,
    openDeleteModal: false,

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
    handleOpenDeleteModal: () => {
      set({
        openDeleteModal: true,
      });
    },
    handleCloseDeleteModal: () => {
      set({
        openDeleteModal: false,
      });
    },
  })
);
