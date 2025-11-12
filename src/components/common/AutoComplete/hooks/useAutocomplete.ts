import { useQuery } from "@tanstack/react-query";
import { getAllGiros } from "../../../../dashboard/pages/catalogos/services/giros.service";

export const useAutocomplete = () => {
  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  return {
    giros,
  };
};
