import { useQuery } from "@tanstack/react-query";
import { getProveedorPerfil } from "../../../../services/proveedor.perfil.service";
import { getColaboradoresContrato } from "../../../../services/proveedor.contrato.service";
import { getAllGiros } from "../../../../../../catalogos/services/giros.service";
import { getAllPlazoPagos } from "../../../../../../catalogos/services/plazoPago.service";

interface Props {
  id: string | undefined;
}

export const useQueries = ({ id }: Props) => {
  //cargar datos de perfil, domicilio, contrato
  const {
    isLoading,
    isError: isErrorGet,
    error: errorGet,
    data: proveedorPerfil,
  } = useQuery({
    queryKey: ["Supplier", `${id}`, "Details"],
    queryFn: () => getProveedorPerfil(id || ""),
    enabled: !!id,
  });

  // cargar colaboradores
  const { data: proveedorColaboradores } = useQuery({
    queryKey: [
      "ContractCollaborator",
      "Contract",
      `${
        proveedorPerfil?.contratos && proveedorPerfil?.contratos.length > 0
          ? proveedorPerfil?.contratos[proveedorPerfil?.contratos.length - 1].id // TODO obtener el tulimo contrato
          : 0
      }`,
    ],
    queryFn: () =>
      getColaboradoresContrato(
        proveedorPerfil?.contratos && proveedorPerfil?.contratos.length > 0
          ? proveedorPerfil?.contratos[0].id
          : 0,
      ),
    enabled: !!id && !!proveedorPerfil?.contratos,
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
    proveedorPerfil,
    proveedorColaboradores,
    giros,
    plazoPagos,
  };
};
