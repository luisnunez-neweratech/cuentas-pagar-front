import { type StateCreator, create } from "zustand";
import type { FacturaDetalle } from "../interfaces/FacturaDetalle";

export interface FacturaState {
  id: number | null;
  facturaDetalle: FacturaDetalle[] | null;

  addRowFacturaDetalle: (facturaDetalle: FacturaDetalle) => void;
  removeRowFacturaDetalle: (id: number) => void;
  updateRowFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => void;
}

const storeFactura: StateCreator<FacturaState> = (set) => ({
  id: null,
  facturaDetalle: null,

  addRowFacturaDetalle: (facturaDetalle: FacturaDetalle) => {
    set((state) => ({
      facturaDetalle: [...(state.facturaDetalle ?? []), facturaDetalle],
    }));
  },
  removeRowFacturaDetalle: (id: number) => {
    set((state) => ({
      facturaDetalle: [
        ...(state.facturaDetalle?.filter((item) => item.id !== id) ?? []),
      ],
    }));
  },
  updateRowFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => {
    set((state) => ({
      facturaDetalle: (state.facturaDetalle ?? []).map((item) =>
        item.id === id ? { ...facturaDetalle } : item
      ),
    }));
  },
});

export const useFacturaStore = create<FacturaState>()(storeFactura);
