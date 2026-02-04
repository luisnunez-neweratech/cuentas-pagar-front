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

  const proveedorExisteModal = useFacturaXMLStore((state) => state.proveedorExisteModal);
  const handleOpenProveedorExisteModal = useFacturaXMLStore((state) => state.handleOpenProveedorExisteModal);
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

  const fileInputXmlRef = useRef<HTMLInputElement>(null);

  const [xmlFileName, setXmlFileName] = useState("");
  const [xmlFile, setXmlFile] = useState<any>(null);

  const clearValues = () => {
    setXmlFileName("");
    setXmlFile(null);
    if (fileInputXmlRef.current) {
      fileInputXmlRef.current.value = "";
    }

  };

  const { importDocumentosMutation, importMultipleDocumentosMutation } = useMutations({
    setIsLoading,
    setFacturaResult,
    handleOpenModal,
    clearValues,
    setMassImportResponse,
    setOpenResultsModal
  });

  const handleXmlFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      if (event.target.files.length === 1) {
        setXmlFileName(`Nombre del Archivo: ${event.target.files[0].name}`);
        setXmlFile(event.target.files[0]);
      } else {
        setXmlFileName(`${event.target.files.length} archivos seleccionados`);
        setXmlFile(event.target.files);
      }
    }
  };

  const onClickCargarInformacion = () => {
    setIsLoading(true);
    if (xmlFile!.length > 0) {
      importMultipleDocumentosMutation.mutate({ xmls: xmlFile });
    } else if (xmlFile) {
      importDocumentosMutation.mutate({ xml: xmlFile });
    }
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
    message: `El proveedor con RFC 'TMO1306279CX' no existe en la base de datos y se creará automáticamente al cargar la factura como proveedor OCASIONAL con los siguientes datos:\n\n• RFC: TMO1306279CX\n• Nombre: XTU MEJOR OPCION EN OFICINAS\n• Régimen Fiscal: 601\n• Tipo de Persona: Persona Moral (12 caracteres)\n• Tipo de Proveedor: Ocasional\n• Término de Pago: Inmediato\n\n¿Desea continuar?`,
    openResultsModal,
    setOpenResultsModal
  };
};
