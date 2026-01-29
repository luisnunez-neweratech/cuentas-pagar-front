import { useState, useRef } from "react";
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
  const setFacturaResult = useFacturaXMLStore(
    (state) => state.setFacturaResult,
  );
  const facturaResult = useFacturaXMLStore((state) => state.facturaResult);

  const fileInputXmlRef = useRef<HTMLInputElement>(null);

  const [xmlFileName, setXmlFileName] = useState("");
  const [_xmlFile, setXmlFile] = useState(null);

  const clearValues = () => {
    setXmlFileName("");
    setXmlFile(null);
    if (fileInputXmlRef.current) {
      fileInputXmlRef.current.value = "";
    }

  };

  const { importDocumentosMutation } = useMutations({
    setIsLoading,
    setFacturaResult,
    handleOpenModal,
    clearValues,
  });

  const handleXmlFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      if (event.target.files.length === 1) {
        setXmlFileName(`Nombre del Archivo: ${event.target.files[0].name}`);
        setXmlFile(event.target.files[0]);
      } else {
        setXmlFileName(`${event.target.files.length} archivos seleccionados`);
        //setXmlFile(event.target.files); TODO: Implementar carga de múltiples archivos
      }
    }
  };

  const onClickCargarInformacion = () => {
    setIsLoading(true);
    importDocumentosMutation.mutate({ xml: _xmlFile });
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
    isLoading
  };
};
