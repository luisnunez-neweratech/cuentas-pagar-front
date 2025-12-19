import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMonedaVenta,
  getAllMonedaVentas,
} from "../../services/monedaVenta.service";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";

export const useMonedaVentaListPage = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  const {
    isLoading,
    isError,
    error,
    data: monedas,
    refetch,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
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
      toast.error("Error al obtener las monedas de venta");
    }
  }, [isError]);

  const deleteGiroMutation = useMutation({
    mutationFn: deleteMonedaVenta,
    onSuccess: () => {
      toast.success("Moneda de venta eliminado correctamente");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar la moneda de venta");
      return;
    },
  });

  const onClickEliminar = (id: string) => {
    deleteGiroMutation.mutate(id);
  };


  return {
    rowClick,
    monedas,
    onClickEliminar,
  };
};
