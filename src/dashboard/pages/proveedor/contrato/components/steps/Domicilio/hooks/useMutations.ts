import { useMutation } from "@tanstack/react-query";
import { updateProveedorContratoPerfil } from "../../../../services/proveedor.contrato.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  toNextStep: (clickedBy: number) => void;
  handleDisableButtons: (state: boolean) => void;
}

export const useMutations = ({ toNextStep, handleDisableButtons }: Props) => {
  const updateMutation = useMutation({
    mutationFn: updateProveedorContratoPerfil,
    onSuccess: (_data, variables) => {
      toNextStep(variables.clickedBy ?? 0);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  return { updateMutation };
};
