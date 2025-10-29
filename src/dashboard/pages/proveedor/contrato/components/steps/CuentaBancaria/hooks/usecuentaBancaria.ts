import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const usecuentaBancaria = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);

  return {
    handleBack,
  };
};
