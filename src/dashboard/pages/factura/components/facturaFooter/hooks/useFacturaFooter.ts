import { useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";
import { deleteFacturaArchivo } from "../../../services/factura.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useParams } from "react-router";

export const useFacturaFooter = () => {
  const { id } = useParams();
  const stateFactura = useFacturaStore((state) => state);
  const setPdfFile = useFacturaStore((state) => state.setPdfFile);
  const setXmlFile = useFacturaStore((state) => state.setXmlFile);
  const setPaymentProofFile = useFacturaStore((state) => state.setPaymentProofFile);

  const [pdfFileName, setPdfFileName] = useState(stateFactura.pdfFileValue);

  const [xmlFileName, setXmlFileName] = useState(stateFactura.xmlFileValue);

  const [paymentProofFileName, setPaymentProofFileName] = useState(stateFactura.paymentProofFileValue);

  const deleteFacturaDocumentoMutation = useMutation({
    mutationFn: deleteFacturaArchivo,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el documento");
      return;
    },
    onSettled: () => {
      //handleDisableButtons(false);
    },
  });

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

  const handlePaymentProofFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setPaymentProofFileName(event.target.files[0].name);
      setPaymentProofFile(event.target.files[0]);
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
    paymentProofFileName,
    handleXmlFileChange,
    handlePaymentProofFileChange,
    tipoEntidadId: stateFactura.tipoEntidadId,
    disableButtons: stateFactura.disableButtons,
    pdfDownloadUrl: stateFactura.pdfDownloadUrl,
    xmlDownloadUrl: stateFactura.xmlDownloadUrl,
    paymentProofDownloadUrl: stateFactura.paymentProofDownloadUrl,
    deleteFacturaDocumentoMutation,
    id,
  };
};
