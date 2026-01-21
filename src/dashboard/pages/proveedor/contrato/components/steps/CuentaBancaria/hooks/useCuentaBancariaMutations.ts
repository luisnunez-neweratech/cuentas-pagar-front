import { useMutation } from "@tanstack/react-query";
import {
  addProveedorCaratula,
  addProveedorCuenta,
  updateProveedorCuenta,
} from "../../../../services/proveedor.cuentaBancaria.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosErrorMessage } from "../../../../../../../../lib/axiosError";

interface Props {
  handleDisableButtons: (state: boolean) => void;
}

export const useCuentaBancariaMutations = ({ handleDisableButtons }: Props) => {
  const createCaratulaMutation = useMutation({
    mutationFn: addProveedorCaratula,
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
    mutationFn: addProveedorCuenta,
    onSuccess: (data, variables) => {
      createCaratulaMutation.mutate({
        id: data.id,
        caratulaFile: variables.caratulaFile,
      });
    },
    onError: (error: Error) => {
      toast(axiosErrorMessage(error, "Error al crear la cuenta bancaria"));
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorCuenta,
    onSuccess: (_data, variables) => {
      if (variables.id && variables.caratulaFile) {
        createCaratulaMutation.mutate({
          id: variables.id,
          caratulaFile: variables.caratulaFile,
        });
      }
    },
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

  return { createMutation, updateMutation };
};
