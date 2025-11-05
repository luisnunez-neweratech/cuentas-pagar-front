import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";

export const useHeaderButtons = () => {
  const handleOpenModal = useProveedoresPageStore(
    (state) => state.handleOpenModal
  );

  const clearFiltros = useProveedoresPageStore((state) => state.clearFiltros)

  return {
    handleOpenModal,
    clearFiltros
  };
};
