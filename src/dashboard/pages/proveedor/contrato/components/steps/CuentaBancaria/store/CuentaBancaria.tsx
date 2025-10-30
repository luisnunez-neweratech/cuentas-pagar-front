import { create } from "zustand";

interface ICuentas {
  cuentasValidas: boolean;

  setCuentasValidos: (valido: boolean) => void;
  getCuentasValidos: () => boolean;
}

export const useCuentaBancariaStore = create<ICuentas>()((set, get) => ({
  cuentasValidas: false,

  setCuentasValidos: (valido: boolean) => {
    set({ cuentasValidas: valido });
  },
  getCuentasValidos: () => {
    return get().cuentasValidas;
  },
}));
