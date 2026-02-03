import { useEffect, useState } from "react";
import { useFacturaStore } from "../../../store/Factura.store";
import { useParams } from "react-router";
import { useMutations } from "./useMutations";
import { InvoiceDocumentType } from "../../../../facturas/interfaces/InvoiceListResponse";

export const useFacturaFooter = () => {
  const { id } = useParams();
  const stateFactura = useFacturaStore((state) => state);
  const setPdfFile = useFacturaStore((state) => state.setPdfFile);
  const setXmlFile = useFacturaStore((state) => state.setXmlFile);
  const setPaymentProofFile = useFacturaStore(
    (state) => state.setPaymentProofFile,
  );

  const [pdfFileName, setPdfFileName] = useState(stateFactura.pdfFileValue);

  const [xmlFileName, setXmlFileName] = useState(stateFactura.xmlFileValue);

  const [paymentProofFileName, setPaymentProofFileName] = useState(
    stateFactura.paymentProofFileValue,
  );

  const { deleteFacturaDocumentoMutation } = useMutations();

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

  const onClickDeleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string,
  ) => {
    e.stopPropagation();
    deleteFacturaDocumentoMutation.mutate({
      fileType: type,
      invoiceId: id!.toString(),
    });
  };

  //Set flag to disable comprobante button for credit notes
  const isComprobanteDisabled = () => {
    if (stateFactura.tipoDocumentoId === InvoiceDocumentType.NotaCredito) {
      return true;
    };
    return false;
  };

  useEffect(() => {
    if (isComprobanteDisabled()) {
      setPaymentProofFile(null as any);
    }
  }, [stateFactura.tipoDocumentoId]);

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
    onClickDeleteFile,
    isComprobanteDisabled,
  };
};
