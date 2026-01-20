import { useQuery } from "@tanstack/react-query";
import { getGiro } from "../../../services/giros.service";

interface Props {
  id: string | undefined;
}

export const useQueries = ({ id }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: giro,
  } = useQuery({
    queryKey: ["CatalogMaster", `${id}`],
    queryFn: () => getGiro(id || ""),
  });

  return {
    isLoading,
    isError,
    error,
    giro,
  };
};
