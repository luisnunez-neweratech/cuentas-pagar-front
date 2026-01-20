import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";
import { useQueries } from "./useQueries";
import { useMutations } from "./useMutations";

export const useGirosListPage = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  const { isLoading, isError, error, giros, refetch } = useQueries();
  const { deleteGiroMutation } = useMutations({ setIsLoading, refetch });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al obtener los giros");
    }
  }, [isError]);

  const onClickEliminar = (id: string) => {
    deleteGiroMutation.mutate(id);
  };

  return {
    rowClick,
    giros,
    onClickEliminar,
  };
};
