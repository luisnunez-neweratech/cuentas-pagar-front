import { useState } from "react";
import { useDashboardLayoutStore } from "../../../store/dashboardLayout.store";
import { useFacturaXMLStore } from "../store/FacturaXml.store";
import { useNavigate } from "react-router";

export const useFacturaXml = () => {
    const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const openModal = useFacturaXMLStore((state) => state.openModal);
  const handleOpenModal = useFacturaXMLStore((state) => state.handleOpenModal);
  const handleCloseModal = useFacturaXMLStore(
    (state) => state.handleCloseModal
  );

  const [xmlFileName, setXmlFileName] = useState("");
  const [_xmlFile, setXmlFile] = useState(null);

  const [pdfFileName, setPdfFileName] = useState("");
  const [_pdfFile, setPdfFile] = useState(null);

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
    // call api and create invoice
    setIsLoading(true);
    handleOpenModal();
    // show results
  };

  const onClickCloseModal = () => {
     setIsLoading(false);
    handleCloseModal();
     navigate("/facturas/15");
  }

  return {
    handleXmlFileChange,
    xmlFileName,
    handlePdfFileChange,
    pdfFileName,
    onClickCargarInformacion,
    openModal,
    onClickCloseModal,
  };
};
