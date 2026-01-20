import { useMutation } from "@tanstack/react-query";
import {
  addProveedorContacto,
  updateProveedorContacto,
} from "../../../../services/proveedor.contacto.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  handleDisableButtons: (state: boolean) => void;
}

export const useContactoMutations = ({ handleDisableButtons }: Props) => {
  const updateMutation = useMutation({
    mutationFn: updateProveedorContacto,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el contacto");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addProveedorContacto,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el contacto");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  return {
    updateMutation,
    createMutation,
  };
};
