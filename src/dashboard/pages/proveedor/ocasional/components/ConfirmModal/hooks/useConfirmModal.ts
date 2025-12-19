import { useProveedorOcasionalStore } from "../../../store/ProveedorOcasional.store";

export const useConfirmModal = () => {
  const openModal = useProveedorOcasionalStore((state) => state.openModal);
  const handleClose = useProveedorOcasionalStore((state) => state.handleClose);

  return {
    openModal,
    handleClose,
  };
};
