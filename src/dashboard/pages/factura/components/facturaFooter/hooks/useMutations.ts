import { useMutation } from "@tanstack/react-query";
import { deleteFacturaArchivo } from "../../../services/factura.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useFacturaStore } from "../../../store/Factura.store";

export const useMutations = () => {
  const clearPdfValues = useFacturaStore((state) => state.clearPdfValues);
  const clearXmlValues = useFacturaStore((state) => state.clearXmlValues);

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
    onSettled: (_data, _error, variables) => {
      if (variables.fileType === "pdf") {
        clearPdfValues();
      } else {
        clearXmlValues();
      }
      toast.info("Documento eliminado correctamente");
    },
  });

  return { deleteFacturaDocumentoMutation };
};
