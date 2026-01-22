import { useMutation } from "@tanstack/react-query";
import { deleteGiro } from "../../services/giros.service";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../../lib/axiosError";

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
      toast.error(axiosErrorMessage(error, "Error al eliminar el giro"));      
    },
  });

  return {
    deleteGiroMutation,
  };
};
