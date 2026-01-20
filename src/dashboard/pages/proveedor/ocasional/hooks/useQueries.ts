import { useQuery } from "@tanstack/react-query";
import { getProveedorOcasional } from "../services/proveedor.contrato.service";
import { getAllGiros } from "../../../catalogos/services/giros.service";
import { getAllPlazoPagos } from "../../../catalogos/services/plazoPago.service";

interface Props {
  id: string | undefined;
}

export const useQueries = ({ id }: Props) => {
  const {
    isLoading,
    isError: isErrorGet,
    error: errorGet,
    data: proveedorOcasional,
  } = useQuery({
    queryKey: ["Supplier", `${id}`, "Details"],
    queryFn: () => getProveedorOcasional(id || ""),
    enabled: !!id,
  });

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const { data: plazoPagos } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "PlazoPago"],
    queryFn: () => getAllPlazoPagos(),
  });

  return {
    isLoading,
    isErrorGet,
    errorGet,
    proveedorOcasional,
    giros,
    plazoPagos,
  };
};
