import { useQuery } from "@tanstack/react-query";
import { getAllGiros } from "../../../../dashboard/pages/catalogos/services/giros.service";

export const useAutocomplete = () => {
  const {
    isLoading,
    isError,
    error,
    data: giros,
    isFetching,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  return {
    giros,
  };
};
