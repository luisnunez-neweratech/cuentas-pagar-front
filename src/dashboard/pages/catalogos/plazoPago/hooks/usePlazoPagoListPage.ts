import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllPlazoPagos,
  deletePlazoPago,
} from "../../services/plazoPago.service";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";

export const usePlazoPagoListPage = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  const {
    isLoading,
    isError,
    error,
    data: plazoPagos,
    refetch,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "PlazoPago"],
    queryFn: () => getAllPlazoPagos(),
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al obtener las Condiciones de Pago");
    }
  }, [isError]);

  const deleteGiroMutation = useMutation({
    mutationFn: deletePlazoPago,
    onSuccess: () => {
      toast.success("Condicion de Pago eliminado correctamente");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar la Condicion de Pago");
      return;
    },
  });

  const onClickEliminar = (id: string) => {
    deleteGiroMutation.mutate(id);
  };


  return { rowClick, plazoPagos, onClickEliminar };
};
