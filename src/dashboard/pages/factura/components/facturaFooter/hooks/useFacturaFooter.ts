import { useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";

export const useFacturaFooter = () => {
  const stateFactura = useFacturaStore((state) => state);
  const setPdfFile = useFacturaStore((state) => state.setPdfFile);
  const setXmlFile = useFacturaStore((state) => state.setXmlFile);

  const [pdfFileName, setPdfFileName] = useState(stateFactura.pdfFileValue);

  const [xmlFileName, setXmlFileName] = useState(stateFactura.xmlFileValue);

  const handlePdfFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setPdfFileName(event.target.files[0].name);
      setPdfFile(event.target.files[0]);
    }
  };

  const handleXmlFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setXmlFileName(event.target.files[0].name);
      setXmlFile(event.target.files[0]);
    }
  };

  const errors = {
    facturaPDF: "",
    facturaXML: "",
  };

  return {
    handlePdfFileChange,
    errors,    
    pdfFileName,
    xmlFileName,
    handleXmlFileChange,
    tipoEntidadId: stateFactura.tipoEntidadId,
    disableButtons: stateFactura.disableButtons,
    pdfDownloadUrl: stateFactura.pdfDownloadUrl,
    xmlDownloadUrl: stateFactura.xmlDownloadUrl,
  };
};
