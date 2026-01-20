import { useMutation } from "@tanstack/react-query";
import { deleteMonedaVenta } from "../../services/monedaVenta.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar la moneda de venta");
      return;
    },
  });

  return {
    deleteGiroMutation,
  };
};
