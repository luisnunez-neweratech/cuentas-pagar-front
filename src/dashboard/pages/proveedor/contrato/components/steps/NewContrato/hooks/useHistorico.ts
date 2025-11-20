import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useHistorico = () => {
  const getNewStepContrato = useProveedorContratoStore(
    (state) => state.getNewStepContrato
  );

  const getNameTipoDocumento = (id: number) => {
    if (id === 0) return "CSF";
    if (id === 1) return "ID Rep. Legal";
    if (id === 2) return "Comp. Domicilio";
    if (id === 3) return "Poder Rep.";
    return "";
  };

  return {
    rows: getNewStepContrato()?.historialDocumentos,
    getNameTipoDocumento,
  };
};
