import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useCargaArchivos = () => {
  const newStepContrato = useProveedorContratoStore(
    (state) => state.newStepContrato
  );

  const addNewDocument = useProveedorContratoStore(
    (state) => state.addNewDocument
  );

  const clickAddArchivo = () => {
    addNewDocument({
      id: (newStepContrato?.documentos?.length ?? 0) + 1,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
      fileValue: null,
      fileName: "",
      tipoDocumento: 0,
      newElement: true,
    });
  };

  return {
    newStepContrato,
    clickAddArchivo,
  };
};
