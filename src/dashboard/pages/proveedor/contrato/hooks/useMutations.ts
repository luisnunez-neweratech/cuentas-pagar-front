import { useMutation } from "@tanstack/react-query";
import {
  activateSupplier,
  deleteProveedorOcasional,
} from "../../ocasional/services/proveedor.contrato.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Props {
  navigate: (path: string) => void;
}
export const useMutations = ({ navigate }: Props) => {
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
  });

  return { deleteMutation, activateMutation };
};
