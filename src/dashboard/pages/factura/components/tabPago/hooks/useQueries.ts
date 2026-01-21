import { useQuery } from "@tanstack/react-query";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import {
  getContractNames,
  getSupplierInvoices,
} from "../../../services/factura.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";
import { getAllPlazoPagos } from "../../../../catalogos/services/plazoPago.service";

interface Props {
  proveedorId: number | null;
  id: string | undefined;
}

export const useQueries = ({ proveedorId, id }: Props) => {
  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

  const { data: contratos } = useQuery({
    queryKey: ["Invoice", proveedorId, "GetContractNames"],
    queryFn: () => getContractNames(proveedorId!.toString()),
    enabled: proveedorId && proveedorId > 0 ? true : false,
  });

  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  const { data: plazoPagos } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "PlazoPago"],
    queryFn: () => getAllPlazoPagos(),
  });

  const { data: facturas } = useQuery({
    queryKey: [
      "Invoice",
      proveedorId,
      "GetSupplierInvoices",
      "currentInvoiceId",
    ],
    queryFn: () => getSupplierInvoices(proveedorId!.toString(), id || ""),
    enabled: proveedorId && proveedorId > 0 ? true : false,
  });

  return {
    colaboradores,
    contratos,
    monedas,
    plazoPagos,
    facturas,
  };
};
