import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAllGiros } from "../../services/giros.service";
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
  } = useQuery({
    queryKey: ["SupplierActivity", "GetAll"],
    queryFn: () => getAllGiros(),
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log("isError", isError);
    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al obtener los giros");
    }
  }, [isError]);

  return {
    rowClick,
    giros,
  };
};
