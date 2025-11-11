import { useNavigate } from "react-router";
import { useProveedorOcasionalStore } from "../../../../proveedor/ocasional/store/ProveedorOcasional.store";
import type { ProveedorOcasional } from "../../../../../../interfaces/proveedor-ocasional.interface";
import { TipoEntidad } from "../../../../proveedor/interfaces/TipoEntidad";
import { TipoPersona } from "../../../../proveedor/interfaces/TipoPersona";
import { TipoProveedor } from "../../../../proveedor/interfaces/TipoProveedor";
import { getProveedores } from "../../../services/Proveedores.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useProveedorTable = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const {
    isLoading,
    isError: isErrorGet,
    error: errorGet,
    data: proveedores,
  } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedores(),
  });

  const rowClick = (row: any) => {
    if (row.tipoProveedor === TipoProveedor.Ocasional.value) {
      navigate(row.id);
    }
    navigate(`contrato/${row.id}`);
  };

  useEffect(() => {
    console.log('loading?')
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isErrorGet) {
      if (errorGet instanceof AxiosError) {
        toast.error(errorGet.response?.data ?? errorGet.message);
        return;
      }
      toast.error("Error al obtener proveedores");
    }
  }, [isErrorGet]);

  return {
    rowClick,
    proveedores,
  };
};
