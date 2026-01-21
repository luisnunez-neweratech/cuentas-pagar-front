import { useMutation } from "@tanstack/react-query";
import { deleteProveedorContacto } from "../../../../services/proveedor.contacto.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useContactosMutations = () => {
  const removeContacto = useProveedorContratoStore(
    (state) => state.removeContacto,
  );

  const deleteMutation = useMutation({
    mutationFn: deleteProveedorContacto,
    onSuccess: (_data, variables) => {
      removeContacto(+variables);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el contacto");
      return;
    },
  });

  return {
    deleteMutation,
  };
};
