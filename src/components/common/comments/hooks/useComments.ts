import { useEffect, useState } from "react";
import { useProveedorTableStore } from "../../../../dashboard/pages/proveedores/components/proveedorTable/store/ProveedorTable.store";
import {
  getProveedoresComments,
  postProveedorComment,
} from "../../../../services/Comments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useDashboardLayoutStore } from "../../../../dashboard/store/dashboardLayout.store";

interface Props {
  openModal: boolean;
  isProveedor: boolean;
}

export const useComments = ({ openModal, isProveedor }: Props) => {
  const proveedorId = useProveedorTableStore((state) => state.proveedorId);
  const setProveedorId = useProveedorTableStore(
    (state) => state.setProveedorId,
  );
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const [nota, setNota] = useState<string>("");

  const { data: proveedoresComments, refetch: refetchProovedorComments } =
    useQuery({
      queryKey: ["Supplier", proveedorId],
      queryFn: () => getProveedoresComments(proveedorId!),
      enabled: openModal && isProveedor && !!proveedorId,
    });

  const addProveedorComment = useMutation({
    mutationFn: postProveedorComment,
    onSuccess: () => {
      toast.success("Comentario agregado correctamente");
      //handleDisableButtons(false);
      setNota("");
      refetchProovedorComments();
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data);
          return;
        }
        toast.error(error.message);
        return;
      }
      toast.error("Error al agregar comentario");
      return;
    },
    onSettled: () => {
      setIsLoading(false);
      //handleDisableButtons(false);
    },
  });

  const onClickGuardar = () => {
    setIsLoading(true);
    addProveedorComment.mutate({
      supplierId: proveedorId!,
      commentText: nota,
    });
  };

  useEffect(() => {
    if (openModal && isProveedor && proveedorId) {
      
    } else {
      setProveedorId(null);
    }
  }, [openModal]);

  return {
    proveedoresComments,
    nota,
    setNota,
    onClickGuardar,
  };
};
