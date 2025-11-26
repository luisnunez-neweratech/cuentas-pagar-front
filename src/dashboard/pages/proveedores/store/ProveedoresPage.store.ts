import { create } from "zustand";
import type { FiltrosProveedores } from "../interfaces/FiltrosProveedores.interface";

const initFiltros = {
  rfc: "",
  alias: "",
  razonSocial: "",
  fechaAlta: "",
  fechaInicioContrato: "",
  fechaFinContrato: "",
  status: true,
};
interface IProveedoresPage {
  openModal: boolean;
  filtrosProveedores: FiltrosProveedores;
  callApi: number;

  handleOpenModal: () => void;
  handleClose: () => void;
  setFiltrosProveedores: (filtrosProveedores: FiltrosProveedores) => void;
  clearFiltros: () => void;
  setCallApi: () => void;
}

export const useProveedoresPageStore = create<IProveedoresPage>()(
  (set, get) => ({
    openModal: false,
    proveedorOcasional: null,
    filtrosProveedores: initFiltros,
    callApi: 0,
    hasActiveFiltres: false,

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
        callApi: get().callApi + 1,
      });
    },
    setCallApi: () => {
      set({
        callApi: get().callApi + 1,
      });
    },
  })
);
