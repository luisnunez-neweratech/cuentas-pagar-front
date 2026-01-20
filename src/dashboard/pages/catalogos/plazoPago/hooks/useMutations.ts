import { useMutation } from "@tanstack/react-query";
import { deletePlazoPago } from "../../services/plazoPago.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar la Condicion de Pago");
      return;
    },
  });

  return { deleteGiroMutation };
};
