import { useRef } from "react";
import { useDashboardLayoutStore } from "../../../store/dashboardLayout.store";
import { useFacturaXMLStore } from "../store/FacturaXml.store";
import { useNavigate } from "react-router";
import { useMutations } from "./useMutations";

export const useFacturaXml = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const isLoading = useDashboardLayoutStore((state) => state.isLoading);
  const openModal = useFacturaXMLStore((state) => state.openModal);
  const handleOpenModal = useFacturaXMLStore((state) => state.handleOpenModal);
  const handleCloseModal = useFacturaXMLStore(
    (state) => state.handleCloseModal,
  );

  const proveedorExisteModal = useFacturaXMLStore((state) => state.proveedorExisteModal);
  const handleOpenProveedorExisteModal = useFacturaXMLStore((state) => state.handleOpenProveedorExisteModal);
  const setProveedorExisteMessage = useFacturaXMLStore((state) => state.setProveedorExisteMessage);
  const setXmlSendFile = useFacturaXMLStore((state) => state.setXmlSendFile);
  const xmlSendFile = useFacturaXMLStore((state) => state.xmlSendFile);
  const xmlFileName = useFacturaXMLStore((state) => state.xmlFileName);
  const setXmlFileName = useFacturaXMLStore((state) => state.setXmlFileName);
  const handleCloseProveedorExisteModal = useFacturaXMLStore(
    (state) => state.handleCloseProveedorExisteModal,
  );

  const setFacturaResult = useFacturaXMLStore(
    (state) => state.setFacturaResult,
  );
  const facturaResult = useFacturaXMLStore((state) => state.facturaResult);
  const setMassImportResponse = useFacturaXMLStore(
    (state) => state.setMassImportResponse,
  );
  const openResultsModal = useFacturaXMLStore((state) => state.openResultsModal);
  const setOpenResultsModal = useFacturaXMLStore((state) => state.setOpenResultsModal);
  const clearValues = useFacturaXMLStore((state) => state.clearValues);

  const fileInputXmlRef = useRef<HTMLInputElement>(null);

  const { importMultipleDocumentosMutation, validarDocumentoMutation } = useMutations({
    setIsLoading,
    setFacturaResult,
    handleOpenModal,
    clearValues,
    setMassImportResponse,
    setOpenResultsModal,
    setProveedorExisteMessage,
    handleOpenProveedorExisteModal
  });

  const handleXmlFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      if (event.target.files.length === 1) {
        setXmlFileName(`Nombre del Archivo: ${event.target.files[0].name}`);
        setXmlSendFile(event.target.files[0]);
      } else {
        setXmlFileName(`${event.target.files.length} archivos seleccionados`);
        setXmlSendFile(event.target.files);
      }
    }
  };

  const onClickCargarInformacion = () => {
    setIsLoading(true);
    if (xmlSendFile!.length > 0) {
      importMultipleDocumentosMutation.mutate({ xmls: xmlSendFile });
    } else if (xmlSendFile) {
      validarDocumentoMutation.mutate({ xml: xmlSendFile });
    }
    // TODO check if the user selects the same file
    /*  if (fileInputXmlRef.current) {
       fileInputXmlRef.current.value = '';
     } */
  };

  const onClickCloseModal = () => {
    setIsLoading(false);
    handleCloseModal();
    navigate(`/facturas/${facturaResult.invoiceId}`);
  };

  return {
    handleXmlFileChange,
    xmlFileName,
    onClickCargarInformacion,
    openModal,
    onClickCloseModal,
    infoMessages: facturaResult.messages ?? [],
    warningMessages: facturaResult.warnings ?? [],
    fileInputXmlRef,
    isLoading,
    proveedorExisteModal,
    handleCloseProveedorExisteModal,
    openResultsModal,
    setOpenResultsModal
  };
};
