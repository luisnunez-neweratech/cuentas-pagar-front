import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";

export const useCuentasBancariasQueries = () => {
  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  return {
    monedas,
  };
};
