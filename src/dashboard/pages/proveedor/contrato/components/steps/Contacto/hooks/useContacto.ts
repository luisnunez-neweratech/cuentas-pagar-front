import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useContacto = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  return {
    handleBack,
    handleNext,
  };
};
