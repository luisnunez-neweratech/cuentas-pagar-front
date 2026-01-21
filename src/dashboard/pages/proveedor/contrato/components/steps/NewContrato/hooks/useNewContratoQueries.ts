import { useQuery } from "@tanstack/react-query";
import { getProveedorPerfil } from "../../../../services/proveedor.perfil.service";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

interface Props {
  actualizarHistorial: boolean;
}

export const useNewContratoQueries = ({ actualizarHistorial }: Props) => {
  const stateContrato = useProveedorContratoStore((state) => state);

  //cargar datos de perfil, domicilio, contrato
  const { data: proveedorPerfil } = useQuery({
    queryKey: ["Supplier", `${stateContrato.id}`, "Details"],
    queryFn: () => getProveedorPerfil(stateContrato.id!.toString()),
    enabled: actualizarHistorial,
  });

  return { proveedorPerfil };
};
