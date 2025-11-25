import { useQuery } from "@tanstack/react-query";
import { getAllGiros } from "../../../../dashboard/pages/catalogos/services/giros.service";

interface props {
  isGiros: boolean;
}

export const useAutocomplete = ({ isGiros }: props) => {
  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
    enabled: isGiros,
  });

  return {
    data: giros,
  };
};
