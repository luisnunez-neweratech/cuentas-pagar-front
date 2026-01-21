import { useMutation } from "@tanstack/react-query";
import { deleteColaboradoresContrato } from "../../../../services/proveedor.contrato.service";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useColaboradorMoralMutations = () => {
  const removeNewColaborador = useProveedorContratoStore(
    (state) => state.removeNewColaborador,
  );

  const deleteMutation = useMutation({
    mutationFn: deleteColaboradoresContrato,
    onSuccess: (_data, variables) => {
      removeNewColaborador(+variables);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el colaborador");
      return;
    },
  });

  return { deleteMutation };
};
