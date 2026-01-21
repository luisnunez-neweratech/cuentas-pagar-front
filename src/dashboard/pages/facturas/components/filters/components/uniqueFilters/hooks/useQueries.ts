import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { getColaboradoresSgpyon } from "../../../../../../factura/services/colaborador.sgpyon.service";

export const useQueries = () => {
  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

  return {
    monedas,
    colaboradores,
  };
};
