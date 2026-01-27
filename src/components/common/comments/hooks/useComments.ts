import { useEffect, useState } from "react";
import { useProveedorTableStore } from "../../../../dashboard/pages/proveedores/components/proveedorTable/store/ProveedorTable.store";
import {
  getFacturasComments,
  getProveedoresComments,
  postFacturaComment,
  postProveedorComment,
} from "../../../../services/Comments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useDashboardLayoutStore } from "../../../../dashboard/store/dashboardLayout.store";
import { useFacturasPageStore } from "../../../../dashboard/pages/facturas/store/FacturasPage.store";

interface Props {
  openModal: boolean;
  isProveedor: boolean;
}

export const useComments = ({ openModal, isProveedor }: Props) => {
  const proveedorId = useProveedorTableStore((state) => state.proveedorId);
  const setProveedorId = useProveedorTableStore(
    (state) => state.setProveedorId,
  );
  const idSelected = useFacturasPageStore((state) => state.idSelected);
  const setIdSelected = useFacturasPageStore((state) => state.setIdSelected);

  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const [nota, setNota] = useState<string>("");

  const {
    data: proveedoresComments,
    refetch: refetchProovedorComments,
    isLoading: isProveedorLoading,
  } = useQuery({
    queryKey: ["Supplier", proveedorId],
    queryFn: () => getProveedoresComments(proveedorId!),
    enabled: openModal && isProveedor && !!proveedorId,
  });

  const {
    data: facturasComments,
    refetch: refetchFacturasComments,
    isLoading: isFacturasLoading,
  } = useQuery({
    queryKey: ["Invoice", proveedorId],
    queryFn: () => getFacturasComments(idSelected!),
    enabled: openModal && !isProveedor && !!idSelected,
  });

  const addFacturaComment = useMutation({
    mutationFn: postFacturaComment,
    onSuccess: () => {
      toast.success("Comentario agregado correctamente");
      setNota("");
      refetchFacturasComments();
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
    },
  });

  const addProveedorComment = useMutation({
    mutationFn: postProveedorComment,
    onSuccess: () => {
      toast.success("Comentario agregado correctamente");
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
    },
  });

  const onClickGuardar = () => {
    setIsLoading(true);
    if (isProveedor) {
      addProveedorComment.mutate({
        supplierId: proveedorId!,
        commentText: nota,
      });
    } else {
      addFacturaComment.mutate({
        supplierId: idSelected!,
        commentText: nota,
      });
    }
  };

  useEffect(() => {
    if (!openModal) {
      setProveedorId(null);
      setIdSelected("");
    }
  }, [openModal]);

  useEffect(() => {
    setIsLoading(isFacturasLoading);
  }, [isFacturasLoading]);

  useEffect(() => {
    setIsLoading(isProveedorLoading);
  }, [isProveedorLoading]);

  return {
    proveedoresComments,
    facturasComments,
    nota,
    setNota,
    onClickGuardar,
  };
};
