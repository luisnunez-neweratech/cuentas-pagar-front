import { useMutation } from "@tanstack/react-query";
import { deleteMonedaVenta } from "../../services/monedaVenta.service";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../../lib/axiosError";

interface Props {
  refetch: () => void;
}

export const useMutations = ({ refetch }: Props) => {
  const deleteGiroMutation = useMutation({
    mutationFn: deleteMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de venta eliminado correctamente");
      refetch();
    },
    onError: (error) => {
      toast.error(
        axiosErrorMessage(error, "Error al eliminar la moneda de venta"),
      );
    },
  });

  return {
    deleteGiroMutation,
  };
};
