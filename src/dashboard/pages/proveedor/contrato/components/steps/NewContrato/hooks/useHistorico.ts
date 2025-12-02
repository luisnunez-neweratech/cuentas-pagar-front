import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useHistorico = () => {
  const proveedorState = useProveedorContratoStore((state) => state);

  const getNameTipoDocumento = (id: number) => {
    if (id === 0) return "CSF";
    if (id === 1) return "ID Rep. Legal";
    if (id === 2) return "Comp. Domicilio";
    if (id === 3) return "Poder Rep.";
    if (id === 4) return "Contrato";
    if (id === 5) return "Propuesta";
    if (id === 6) return "Anexo";
    return "";
  };

  const newStepContrato = proveedorState.getNewStepContrato();
  return {
    rows: newStepContrato?.historialDocumentos ?? [],
    getNameTipoDocumento,
  };
};
