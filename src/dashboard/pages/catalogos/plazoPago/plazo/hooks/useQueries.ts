import { useQuery } from "@tanstack/react-query";
import { getPlazoPago } from "../../../services/plazoPago.service";

interface Props {
  id: string | undefined;
}

export const useQueries = ({ id }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: plazo,
  } = useQuery({
    queryKey: ["CatalogMaster", `${id}`],
    queryFn: () => getPlazoPago(id || ""),
  });

  return {
    isLoading,
    isError,
    error,
    plazo,
  };
};
