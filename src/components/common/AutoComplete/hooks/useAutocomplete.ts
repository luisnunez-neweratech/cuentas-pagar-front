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
    queryKey: ["SupplierActivity", "GetAll"],
    queryFn: () => getAllGiros(),
  });

  return {
    giros
  };
};
