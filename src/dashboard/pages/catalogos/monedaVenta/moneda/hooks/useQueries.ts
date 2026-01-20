import { useQuery } from "@tanstack/react-query";
import { getMonedaVenta } from "../../../services/monedaVenta.service";

interface Props {
  id?: string;
}

export const useQueries = ({ id }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: giro,
  } = useQuery({
    queryKey: ["CatalogMaster", `${id}`],
    queryFn: () => getMonedaVenta(id || ""),
  });

  return {
    isLoading,
    isError,
    error,
    giro,
  };
};
