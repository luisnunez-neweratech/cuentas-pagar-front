import { useFacturasPageStore } from "../../../store/FacturasPage.store";

export const useDetalleFactura = () => {
  const openModal = useFacturasPageStore((state) => state.openModal);
  const handleClose = useFacturasPageStore((state) => state.handleClose);

  return {
    openModal,
    handleClose,
  };
};
