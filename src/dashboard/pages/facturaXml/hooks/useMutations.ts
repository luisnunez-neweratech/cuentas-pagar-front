import { useMutation } from "@tanstack/react-query";
import { importFacturaFiles, importMultipleFacturaFiles } from "../services/invoice.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  setIsLoading: (isLoading: boolean) => void;
  setFacturaResult: (data: any) => void;
  handleOpenModal: () => void;
  clearValues: () => void;
  setMassImportResponse: (data: any) => void;
}

export const useMutations = ({
  setIsLoading,
  setFacturaResult,
  handleOpenModal,
  clearValues,
  setMassImportResponse,
}: Props) => {
  const importDocumentosMutation = useMutation({
    mutationFn: importFacturaFiles,
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
        console.log('data', data)
        setMassImportResponse(data);
        handleOpenModal();
      }
    },
  });



  return {
    importDocumentosMutation,
    importMultipleDocumentosMutation
  };
};


