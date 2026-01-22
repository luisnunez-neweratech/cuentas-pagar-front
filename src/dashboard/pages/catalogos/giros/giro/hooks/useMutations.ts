import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addGiro, updateGiro } from "../../../services/giros.service";
import { axiosErrorMessage } from "../../../../../../lib/axiosError";

interface Props {
  navigate: (path: string) => void;
}

export const useMutations = ({ navigate }: Props) => {
  const addGiroMutation = useMutation({
    mutationFn: addGiro,
    onSuccess: () => {
      toast.success("Giro agregado correctamente");
      navigate("/catalogos/giros/");
    },
    onError: (error) => {
      toast.error(axiosErrorMessage(error, "Error al agregar el giro"));
    },
  });

  const updateGiroMutation = useMutation({
    mutationFn: updateGiro,
    onSuccess: () => {
      toast.success("Giro actualizado correctamente");
      navigate("/catalogos/giros/");
    },
    onError: (error) => {
      toast.error(axiosErrorMessage(error, "Error al actualizar el giro"));
    },
  });

  return { addGiroMutation, updateGiroMutation };
};
