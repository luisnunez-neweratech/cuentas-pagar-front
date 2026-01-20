import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { addGiro, updateGiro } from "../../../services/giros.service";

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
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar el giro");
      return;
    },
  });

  const updateGiroMutation = useMutation({
    mutationFn: updateGiro,
    onSuccess: () => {
      toast.success("Giro actualizado correctamente");
      navigate("/catalogos/giros/");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el giro");
      return;
    },
  });

  return { addGiroMutation, updateGiroMutation };
};
