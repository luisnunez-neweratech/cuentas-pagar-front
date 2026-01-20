import { useQuery } from "@tanstack/react-query";
import { getAllGiros } from "../../services/giros.service";

export const useQueries = () => {
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

  return {
    isLoading,
    isError,
    error,
    giros,
    refetch,
  };
};
