import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteGiro, getAllGiros } from "../../services/giros.service";
import { useDashboardLayoutStore } from "../../../../store/dashboardLayout.store";

export const useGirosListPage = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const rowClick = (row: any) => {
    navigate(row.id.toString());
  };

  const {
    isLoading,
    isError,
    error,
    data: giros,
    refetch,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
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
      toast.error("Error al obtener los giros");
    }
  }, [isError]);

  const deleteGiroMutation = useMutation({
    mutationFn: deleteGiro,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Giro eliminado correctamente");
      refetch();
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el giro");
      return;
    },
  });

  const onClickEliminar = (id: string) => {
    deleteGiroMutation.mutate(id);
  };

  return {
    rowClick,
    giros,
    onClickEliminar,
  };
};
