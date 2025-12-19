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

  const [pdfFileName, setPdfFileName] = useState(stateFactura.pdfFileValue);

  const [xmlFileName, setXmlFileName] = useState(stateFactura.xmlFileValue);

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
    deleteFacturaDocumentoMutation,
    id,
  };
};
