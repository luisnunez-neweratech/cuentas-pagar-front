import { useMutation } from "@tanstack/react-query";
import {
  activateSupplier,
  addProveedorOcasional,
  deleteProveedorOcasional,
  updateProveedorOcasional,
} from "../services/proveedor.contrato.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Props {
  navigate: (path: string) => void;
  handleDisableButtons: (disable: boolean) => void;
}

export const useMutations = ({ navigate, handleDisableButtons }: Props) => {
  const deleteMutation = useMutation({
    mutationFn: deleteProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor dado de baja correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || error.message);
        return;
      }
      toast.error("Error al dar de baja el proveedor");
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const activateMutation = useMutation({
    mutationFn: activateSupplier,
    onSuccess: () => {
      toast.success("Proveedor activado correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || error.message);
        return;
      }
      toast.error("Error al activar el proveedor");
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor creado correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || error.message);
        return;
      }
      toast.error("Error al agregar el proveedor");
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor actualizado correctamente");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });  

  return {
    deleteMutation,
    activateMutation,
    createMutation,
    updateMutation,
  };
};
