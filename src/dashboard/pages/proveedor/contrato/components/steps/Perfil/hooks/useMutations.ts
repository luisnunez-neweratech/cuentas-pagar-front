import { useMutation } from "@tanstack/react-query";
import {
  addProveedorContratoPerfil,
  updateProveedorContratoPerfil,
} from "../../../../services/proveedor.contrato.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

interface Props {
  toNextStep: (proveedorId: number, stay?: boolean) => void;
  handleDisableButtons: (disableButtons: boolean) => void;
}

export const useMutations = ({ toNextStep, handleDisableButtons }: Props) => {
  const proveedorContratoState = useProveedorContratoStore((state) => state);

  const createMutation = useMutation({
    mutationFn: addProveedorContratoPerfil,
    onSuccess: (data) => {
      toNextStep(data.id);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        return;
      }
      toast.error("Error al actualizar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorContratoPerfil,
    onSuccess: () => {
      toNextStep(proveedorContratoState.id!, true);
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

  return { createMutation, updateMutation };
};
