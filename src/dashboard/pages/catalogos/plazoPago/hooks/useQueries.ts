import { useQuery } from "@tanstack/react-query";
import { getAllPlazoPagos } from "../../services/plazoPago.service";

export const useQueries = () => {
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

  return {
    isLoading,
    isError,
    error,
    plazoPagos,
    refetch,
  };
};
