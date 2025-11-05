import { create } from "zustand";
import type { FiltrosProveedores } from "../interfaces/FiltrosProveedores.interface";

const initFiltros = {
  rfc: "",
  alias: "",
  razonSocial: "",
  fechaAlta: "",
  fechaInicioContrato: "",
  fechaFinContrato: "",
};
interface IProveedoresPage {
  openModal: boolean;
  filtrosProveedores: FiltrosProveedores;

  handleOpenModal: () => void;
  handleClose: () => void;
  setFiltrosProveedores: (filtrosProveedores: FiltrosProveedores) => void;
  clearFiltros: () => void;
}

export const useProveedoresPageStore = create<IProveedoresPage>()((set) => ({
  openModal: false,
  proveedorOcasional: null,
  filtrosProveedores: initFiltros,

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
  setFiltrosProveedores: (filtrosProveedores: FiltrosProveedores) => {
    set({
      filtrosProveedores: filtrosProveedores,
    });
  },
  clearFiltros: () => {
    set({
      filtrosProveedores: initFiltros,
    });
  },
}));
