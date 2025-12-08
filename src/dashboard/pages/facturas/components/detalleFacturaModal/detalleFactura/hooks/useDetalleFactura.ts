import { useQuery } from "@tanstack/react-query";
import { getFactura } from "../../../../../factura/services/factura.service";
import { useFacturasPageStore } from "../../../../store/FacturasPage.store";

export const useDetalleFactura = () => {
  const stateFacturas = useFacturasPageStore((state) => state);

  const {
    //isLoading,
    //isError: isErrorGet,
    //error: errorGet,
    data: facturaBD,
  } = useQuery({
    queryKey: ["Invoice", `${stateFacturas.idSelected}`, "Details"],
    queryFn: () => getFactura(stateFacturas.idSelected || ""),
    enabled: !!stateFacturas.idSelected,
  });

  return {
    rows: facturaBD && facturaBD.details ? facturaBD.details : [],
  };
};
