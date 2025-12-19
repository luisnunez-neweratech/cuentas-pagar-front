import { create } from "zustand";

interface IContactos {
  contactosValidos: boolean;

  setContactosValidos: (valido: boolean) => void;
  getContactosValidos: () => boolean;
}

export const useContactosStore = create<IContactos>()((set, get) => ({
  contactosValidos: false,

  setContactosValidos: (valido: boolean) => {
    set({ contactosValidos: valido });
  },
  getContactosValidos: () => {
    return get().contactosValidos;
  },
}));
