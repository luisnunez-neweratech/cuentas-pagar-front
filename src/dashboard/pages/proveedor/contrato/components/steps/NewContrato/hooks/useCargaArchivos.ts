import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useCargaArchivos = () => {
  const newStepContrato = useProveedorContratoStore(
    (state) => state.newStepContrato
  );

  const addNewDocument = useProveedorContratoStore(
    (state) => state.addNewDocument
  );

  const removeNewDocumento = useProveedorContratoStore(
    (state) => state.removeNewDocumento
  );

  const deleteDocumento = (id: number) => {  
    removeNewDocumento(id);
  };

  const clickAddArchivo = () => {
    addNewDocument({
      id: Math.max(...newStepContrato!.documentos.map((o) => o.id!)) + 1,
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
      fileValue: null,
      fileName: "",
      tipoDocumento: 0,
      newElement: true,
    });
  };

  const enviarArchivos = () => {
    newStepContrato?.documentos.map((documento) => {
      if (documento.fileValue) {
      }
    });
  };

  return {
    newStepContrato,
    clickAddArchivo,
    deleteDocumento,
    enviarArchivos,
  };
};
