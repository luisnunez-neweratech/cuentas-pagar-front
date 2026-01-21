import { useQuery } from "@tanstack/react-query";
import { getAllUMedidas } from "../../../services/catalog.service";

export const useQueries = () => {
  const { data: uMedidadData } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "UofM"],
    queryFn: () => getAllUMedidas(),
  });

  return {
    uMedidadData,
  };
};
