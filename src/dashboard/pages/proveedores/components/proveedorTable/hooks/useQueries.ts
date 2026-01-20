import { useQuery } from "@tanstack/react-query";
import { getProveedores } from "../../../services/proveedores.service";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";

interface Props {
  page: number;
  rowsPerPage: number;
  callApi: number;
}

export const useQueries = ({ page, rowsPerPage, callApi }: Props) => {
  const filtrosProveedores = useProveedoresPageStore(
    (state) => state.filtrosProveedores,
  );

  const {
    isLoading,
    isError: isErrorGet,
    error: errorGet,
    data: proveedores,
  } = useQuery({
    queryKey: ["Supplier", "GetPagedAsync", page, rowsPerPage, callApi],
    queryFn: () =>
      getProveedores({
        page: page + 1,
        rowsPerPage,
        rfc: filtrosProveedores.rfc,
        alias: filtrosProveedores.alias,
        razonSocial: filtrosProveedores.razonSocial,
        fechaalta: filtrosProveedores.fechaAlta,
        contratoFechaInicio: filtrosProveedores.fechaInicioContrato,
        contratoFechaFin: filtrosProveedores.fechaFinContrato,
        status: filtrosProveedores.status,
      }),
  });

  return {
    isLoading,
    isErrorGet,
    errorGet,
    proveedores,
  };
};
