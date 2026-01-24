import { useMutation } from "@tanstack/react-query";
import {
  addPlazoPago,
  updatePlazoPago,
} from "../../../services/plazoPago.service";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../../../lib/axiosError";

interface Props {
  navigate: (path: string) => void;
}

export const useMutations = ({ navigate }: Props) => {
  const addPlazoMutation = useMutation({
    mutationFn: addPlazoPago,
    onSuccess: () => {
      toast.success("Condicion de Pago agregado correctamente");
      navigate("/catalogos/plazo-pago/");
    },
    onError: (error) => {
      toast.error(
        axiosErrorMessage(error, "Error al agregar la condicion de pago"),
      );
    },
  });

  const updatePlazoMutation = useMutation({
    mutationFn: updatePlazoPago,
    onSuccess: () => {
      toast.success("Condiciones de Pago actualizado correctamente");
      navigate("/catalogos/plazo-pago/");
    },
    onError: (error) => {
      toast.error(
        axiosErrorMessage(error, "Error al actualizar la condicion de pago"),
      );
    },
  });

  return {
    addPlazoMutation,
    updatePlazoMutation,
  };
};
