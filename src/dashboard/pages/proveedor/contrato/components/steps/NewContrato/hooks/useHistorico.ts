import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useHistorico = () => {
  const proveedorState = useProveedorContratoStore((state) => state);
  

  const newStepContrato = proveedorState.getNewStepContrato();
  
  return {
    rows: newStepContrato?.historialDocumentos ?? [],
    
  };
};
