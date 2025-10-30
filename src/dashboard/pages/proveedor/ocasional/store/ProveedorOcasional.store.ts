import { create } from "zustand";
import type { ProveedorOcasional } from "../../../../../interfaces/proveedor-ocasional.interface";

interface IProveedorOcasional {
  proveedorOcasional: ProveedorOcasional | null;

  setProveedorOcasional: (proveedor: ProveedorOcasional) => void;
  clearProveedorOcasional: () => void;
}

export const useProveedorOcasionalStore = create<IProveedorOcasional>()(
  (set) => ({
    proveedorOcasional: null,

    setProveedorOcasional: (proveedor: ProveedorOcasional) => {
      set({ proveedorOcasional: proveedor });
    },
    clearProveedorOcasional: () => {
      set({ proveedorOcasional: null });
    },
  })
);
