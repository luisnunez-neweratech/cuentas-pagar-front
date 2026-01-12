import { useState } from "react";
import { useDashboardLayoutStore } from "../../../store/dashboardLayout.store";
import { useFacturaXMLStore } from "../store/FacturaXml.store";
import { useNavigate } from "react-router";
import { importFacturaFiles } from "../services/invoice.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useFacturaXml = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const openModal = useFacturaXMLStore((state) => state.openModal);
  const handleOpenModal = useFacturaXMLStore((state) => state.handleOpenModal);
  const handleCloseModal = useFacturaXMLStore(
    (state) => state.handleCloseModal
  );
  const setFacturaResult = useFacturaXMLStore(
    (state) => state.setFacturaResult
  );
  const facturaResult = useFacturaXMLStore((state) => state.facturaResult);

  const [xmlFileName, setXmlFileName] = useState("");
  const [_xmlFile, setXmlFile] = useState(null);

  const [pdfFileName, setPdfFileName] = useState("");
  const [_pdfFile, setPdfFile] = useState(null);

  const importDocumentosMutation = useMutation({
    mutationFn: importFacturaFiles,
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al subir los documentos");
      return;
    },
    onSettled: (data, error) => {
      setIsLoading(false);
      if (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error);
          return;
        }
      } else {
        setFacturaResult(data);
        handleOpenModal();
      }
    },
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
  };
};
