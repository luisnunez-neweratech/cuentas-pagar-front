import { create } from "zustand";

interface IColaboradores {
  colaboradoresValidos: boolean;

  setColaboradoresValidos: (valido: boolean) => void;
  getColaboradoresValidos: () => boolean;
}

export const useColaboradorMoralStore = create<IColaboradores>()(
  (set, get) => ({
    colaboradoresValidos: false,

    setColaboradoresValidos: (valido: boolean) => {
      set({ colaboradoresValidos: valido });
    },
    getColaboradoresValidos: () => {
      return get().colaboradoresValidos;
    },
  })
);
