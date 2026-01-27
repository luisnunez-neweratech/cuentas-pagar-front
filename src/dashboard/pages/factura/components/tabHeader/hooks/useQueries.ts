import { useQuery } from "@tanstack/react-query";
import { getProveedoresAutoComplete } from "../../../../facturas/services/proveedor.service";
import {
  getContractNames,
  getFactura,
  getStatusFactura,
  getSupplierInvoices,
} from "../../../services/factura.service";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";

interface Props {
  id?: string | null | undefined;
}

export const useQueries = ({ id }: Props) => {
  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedoresAutoComplete(),
  });

  const { data: statusFacturaData } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "InvoiceStatus"],
    queryFn: () => getStatusFactura(),
  });

  const {
    isLoading,
    //isError: isErrorGet,
    //error: errorGet,
    data: facturaBD,
  } = useQuery({
    queryKey: ["Invoice", `${id}`],
    queryFn: () => getFactura(id || ""),
    enabled: !!id,
  });

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

  const { data: contratos } = useQuery({
    queryKey: ["Invoice", "GetContractNames"],
    queryFn: () => getContractNames(facturaBD.proveedorId!.toString()),
    enabled: facturaBD && facturaBD.proveedorId ? true : false,
  });

  const { data: facturas } = useQuery({
    queryKey: ["Invoice", "GetSupplierInvoices", "currentInvoiceId"],
    queryFn: () => getSupplierInvoices(facturaBD.proveedorId!.toString(), ""),
    enabled: facturaBD && facturaBD.proveedorId ? true : false,
  });

  const { data: monedas } = useQuery({
      queryKey: ["CatalogMaster", "GetAll", "Moneda"],
      queryFn: () => getAllMonedaVentas(),
    });

  return {
    proveedores,
    statusFacturaData,
    facturaBD,
    isLoading,
    colaboradores,
    contratos,
    facturas,
    monedas
  };
};
