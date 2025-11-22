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
  callApi: number;
  hasActiveFiltres: boolean;

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
      let activeFilters = false;
      const {
        rfc,
        alias,
        razonSocial,
        fechaAlta,
        fechaInicioContrato,
        fechaFinContrato,
      } = filtrosProveedores;      
      if (rfc && rfc.length > 0) activeFilters = true;
      if (alias && alias.length > 0) activeFilters = true;
      if (razonSocial && razonSocial.length > 0) activeFilters = true;
      if (fechaAlta && fechaAlta.length > 0) activeFilters = true;
      if (fechaInicioContrato && fechaInicioContrato.length > 0)
        activeFilters = true;
      if (fechaFinContrato && fechaFinContrato.length > 0) activeFilters = true;
      

      console.log('activeFilters', activeFilters);

      set({
        filtrosProveedores: filtrosProveedores,
        hasActiveFiltres: activeFilters,
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
