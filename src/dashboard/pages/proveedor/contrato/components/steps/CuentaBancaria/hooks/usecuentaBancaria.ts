import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useCuentaBancariaStore } from "../store/CuentaBancaria";

export const usecuentaBancaria = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const getCuentasValidos = useCuentaBancariaStore((state) => state.getCuentasValidos)

  const onClickNext = () => {
    console.log("colaboradores validos?", getCuentasValidos());
    if (getCuentasValidos()) {      
      handleNext();
    }
  };

  return {
    handleBack,
    onClickNext,
  };
};
