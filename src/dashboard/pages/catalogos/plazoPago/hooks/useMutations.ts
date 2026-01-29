import { useMutation } from "@tanstack/react-query";
import { deletePlazoPago } from "../../services/plazoPago.service";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../../lib/axiosError";

interface Props {
  refetch: () => void;
}

export const useMutations = ({ refetch }: Props) => {
  const deleteGiroMutation = useMutation({
    mutationFn: deletePlazoPago,
    onSuccess: () => {
      toast.success("Condicion de Pago eliminado correctamente");
      refetch();
    },
    onError: (error) => {
      toast.error(
        axiosErrorMessage(error, "Error al eliminar la Condicion de Pago"),
      );
    },
  });

  return { deleteGiroMutation };
};
