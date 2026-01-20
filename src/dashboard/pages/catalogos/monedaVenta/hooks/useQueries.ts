import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../services/monedaVenta.service";

export const useQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data: monedas,
    refetch,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  return {
    isLoading,
    isError,
    error,
    monedas,
    refetch,
  };
};
