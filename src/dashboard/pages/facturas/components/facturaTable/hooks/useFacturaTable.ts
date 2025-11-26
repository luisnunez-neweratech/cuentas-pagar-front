import { useFacturasPageStore } from "../../../store/FacturasPage.store";

export const useFacturaTable = () => {
  const handleOpenModal = useFacturasPageStore(
    (state) => state.handleOpenModal
  );

  const rowClick = (row: any) => {
    console.log("row", row);
    handleOpenModal();
  };

  return {
    rowClick,
  };
};
