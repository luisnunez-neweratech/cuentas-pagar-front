import { useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";

export const useFacturaFooter = () => {
  const stateFactura = useFacturaStore((state) => state);

  const [pdfFileName, setPdfFileName] = useState(stateFactura.pdfFileValue);

  const [xmlFileName, setXmlFileName] = useState(stateFactura.xmlFileValue);

  const handlePdfFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setPdfFileName(event.target.files[0].name);
      //setFieldValue(idInput, event.target.files[0]);
    }
  };

  const handleXmlFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setXmlFileName(event.target.files[0].name);
      //setFieldValue(idInput, event.target.files[0]);
    }
  };

  const errors = {
    facturaPDF: "",
    facturaXML: "",
  };

  const disableButtons = false;

  return {
    handlePdfFileChange,
    errors,
    disableButtons,
    pdfFileName,
    xmlFileName,
    handleXmlFileChange,
  };
};
