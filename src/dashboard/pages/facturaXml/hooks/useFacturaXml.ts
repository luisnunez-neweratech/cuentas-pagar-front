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

  const fileInputXmlRef = useRef<HTMLInputElement>(null);
  const fileInputPdfRef = useRef<HTMLInputElement>(null);

  const [xmlFileName, setXmlFileName] = useState("");
  const [_xmlFile, setXmlFile] = useState(null);

  const [pdfFileName, setPdfFileName] = useState("");
  const [_pdfFile, setPdfFile] = useState(null);

  const clearValues = () => {
    setXmlFileName("");
    setPdfFileName("");
    setXmlFile(null);
    setPdfFile(null);
    if (fileInputXmlRef.current) {
      fileInputXmlRef.current.value = "";
    }
    if (fileInputPdfRef.current) {
      fileInputPdfRef.current.value = "";
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
      setXmlFileName(event.target.files[0].name);
      setXmlFile(event.target.files[0]);
    }
  };

  const handlePdfFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setPdfFileName(event.target.files[0].name);
      setPdfFile(event.target.files[0]);
    }
  };

  const onClickCargarInformacion = () => {
    setIsLoading(true);
    importDocumentosMutation.mutate({ xml: _xmlFile, pdf: _pdfFile });
  };

  const onClickCloseModal = () => {
    setIsLoading(false);
    handleCloseModal();
    navigate(`/facturas/${facturaResult.invoiceId}`);
  };

  return {
    handleXmlFileChange,
    xmlFileName,
    handlePdfFileChange,
    pdfFileName,
    onClickCargarInformacion,
    openModal,
    onClickCloseModal,
    infoMessages: facturaResult.messages ?? [],
    warningMessages: facturaResult.warnings ?? [],
    fileInputXmlRef,
    fileInputPdfRef,
    isLoading,
    proveedorExisteModal,
    handleCloseProveedorExisteModal,
    message: `El proveedor con RFC 'TMO1306279CX' no existe en la base de datos y se creará automáticamente al cargar la factura como proveedor OCASIONAL con los siguientes datos:\n\n• RFC: TMO1306279CX\n• Nombre: XTU MEJOR OPCION EN OFICINAS\n• Régimen Fiscal: 601\n• Tipo de Persona: Persona Moral (12 caracteres)\n• Tipo de Proveedor: Ocasional\n• Término de Pago: Inmediato\n\n¿Desea continuar?`
  };
};
