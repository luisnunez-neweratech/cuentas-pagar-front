import { useMutation } from "@tanstack/react-query";
import { importFacturaFiles, importMultipleFacturaFiles, validateFile } from "../services/invoice.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useFacturaXMLStore } from "../store/FacturaXml.store";

interface Props {
  setIsLoading: (isLoading: boolean) => void;
  setFacturaResult: (data: any) => void;
  handleOpenModal: () => void;
  clearValues: () => void;
  setMassImportResponse: (data: any) => void;
  setOpenResultsModal: (openResultsModal: boolean) => void;
  setProveedorExisteMessage: (proveedorExisteMessage: string) => void;
  handleOpenProveedorExisteModal: () => void;
}

export const useMutations = ({
  setIsLoading,
  setFacturaResult,
  handleOpenModal,
  clearValues,
  setMassImportResponse,
  setOpenResultsModal,
  setProveedorExisteMessage,
  handleOpenProveedorExisteModal
}: Props) => {

  const setSupplierExists = useFacturaXMLStore((state) => state.setSupplierExists);
  const setInvoiceAlreadyExists = useFacturaXMLStore((state) => state.setInvoiceAlreadyExists);

  const importDocumentosMutation = useMutation({
    mutationFn: importFacturaFiles,
    onError: (error) => {
      console.log('error', error)
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al subir el documento");
      return;
    },
    onSettled: (data, error) => {
      setIsLoading(false);
      if (error) {
        clearValues();
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

  const importMultipleDocumentosMutation = useMutation({
    mutationFn: importMultipleFacturaFiles,
    onError: (error) => {
      console.log('error', error)
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
        clearValues();
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error);
          return;
        }
      } else {
        setMassImportResponse(data);
        setOpenResultsModal(true)
      }
    },
  });

  const validarDocumentoMutation = useMutation({
    mutationFn: validateFile,
    onError: (error) => {
      console.log('error', error)
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al validar el documento");
      return;
    },
    onSettled: (data, error) => {
      setIsLoading(false);
      if (error) {
        clearValues();
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error);
          return;
        }
      } else {
        setProveedorExisteMessage(data.message);
        handleOpenProveedorExisteModal();
        setSupplierExists(data.supplierExists);
        setInvoiceAlreadyExists(data.invoiceAlreadyExists);
      }
    },
  });



  return {
    importDocumentosMutation,
    importMultipleDocumentosMutation,
    validarDocumentoMutation
  };
};


