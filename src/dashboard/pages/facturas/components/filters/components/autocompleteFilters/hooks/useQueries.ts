import { useQuery } from "@tanstack/react-query";
import { getProveedores } from "../../../../../services/proveedor.service";
import { getAllGiros } from "../../../../../../catalogos/services/giros.service";
import { getStatusFactura } from "../../../../../../factura/services/factura.service";

export const useQueries = () => {
  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedores(),
  });

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const { data: statusFacturaData } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "InvoiceStatus"],
    queryFn: () => getStatusFactura(),
  });

  return {
    proveedores,
    giros,
    statusFacturaData,
  };
};
