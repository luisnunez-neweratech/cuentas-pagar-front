import { type StateCreator, create } from "zustand";
import type { FacturaDetalle } from "../interfaces/FacturaDetalle";

export interface FacturaState {
  id: number | null;
  facturaDetalle: FacturaDetalle[] | null;

  addFacturaDetalle: (facturaDetalle: FacturaDetalle) => void;
  removeFacturaDetalle: (id: number) => void;
  updateFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => void;
}

const storeFactura: StateCreator<FacturaState> = (set) => ({
  id: null,
  facturaDetalle: null,

  addFacturaDetalle: (facturaDetalle: FacturaDetalle) => {
    set((state) => ({
      facturaDetalle: [...(state.facturaDetalle ?? []), facturaDetalle],
    }));
  },
  removeFacturaDetalle: (id: number) => {
    set((state) => ({
      facturaDetalle: [
        ...(state.facturaDetalle?.filter((item) => item.id !== id) ?? []),
      ],
    }));
  },
  updateFacturaDetalle: (id: number, facturaDetalle: FacturaDetalle) => {
    set((state) => ({
      facturaDetalle: (state.facturaDetalle ?? []).map((item) =>
        item.id === id ? { ...facturaDetalle } : item
      ),
    }));
  },
});

export const useFacturaStore = create<FacturaState>()(storeFactura);
