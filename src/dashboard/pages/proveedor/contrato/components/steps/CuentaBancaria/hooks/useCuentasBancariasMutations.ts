import { useMutation } from "@tanstack/react-query";
import { deleteProveedorCuenta } from "../../../../services/proveedor.cuentaBancaria.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useCuentasBancariasMutations = () => {
  const removeCuentaBancaria = useProveedorContratoStore(
    (state) => state.removeCuentaBancaria,
  );

  const deleteMutation = useMutation({
    mutationFn: deleteProveedorCuenta,
    onSuccess: (_data, variables) => {
      removeCuentaBancaria(+variables);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar la cuenta");
      return;
    },
  });

  return { deleteMutation };
};
