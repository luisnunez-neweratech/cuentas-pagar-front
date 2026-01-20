import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";
import { useQueries } from "./useQueries";
import { useMutations } from "./useMutations";

export const useMonedaVentaListPage = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  const { isLoading, isError, error, monedas, refetch } = useQueries();
  const { deleteGiroMutation } = useMutations({ refetch });

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

  const onClickEliminar = (id: string) => {
    deleteGiroMutation.mutate(id);
  };

  return {
    rowClick,
    monedas,
    onClickEliminar,
  };
};
