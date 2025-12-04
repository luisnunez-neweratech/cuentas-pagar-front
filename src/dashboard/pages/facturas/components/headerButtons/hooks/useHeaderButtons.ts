import { useFacturasPageStore } from "../../../store/FacturasPage.store";

export const useHeaderButtons = () => {
  const clearFiltros = useFacturasPageStore((state) => state.clearFiltros);

  const downloadFile = () => {
    // Logic to download file
  };

  return {
    clearFiltros,
    downloadFile,
  };
};
