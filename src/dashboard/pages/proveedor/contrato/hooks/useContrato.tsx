import { useProveedorContratoStore } from "../store/ProveedorContrato.store";

export const useContrato = () => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);

  return {
    handleBack,
  };
};
