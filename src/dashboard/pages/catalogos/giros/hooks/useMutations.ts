import { useMutation } from "@tanstack/react-query";
import { deleteGiro } from "../../services/giros.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Props {
  setIsLoading: (isLoading: boolean) => void;
  refetch: () => void;
}

export const useMutations = ({ setIsLoading, refetch }: Props) => {
  const deleteGiroMutation = useMutation({
    mutationFn: deleteGiro,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Giro eliminado correctamente");
      refetch();
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || error.message);
        return;
      }
      toast.error("Error al eliminar el giro");
      return;
    },
  });

  return {
    deleteGiroMutation,
  };
};
