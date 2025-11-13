import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { TipoProveedor } from "../../../../proveedor/interfaces/TipoProveedor";
import { getProveedores } from "../../../services/proveedores.service";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { useProveedorContratoStore } from "../../../../proveedor/contrato/store/ProveedorContrato.store";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";

export const useProveedorTable = () => {
  const navigate = useNavigate();
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const handleReset = useProveedorContratoStore((state) => state.handleReset);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [proveedoresData, setProveedoresData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const callApi = useProveedoresPageStore((state) => state.callApi);
  const filtrosProveedores = useProveedoresPageStore(
    (state) => state.filtrosProveedores
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      }),
  });

  const rowClick = (row: any) => {
    handleReset();
    if (row.tipoProveedor === TipoProveedor.Ocasional.value) {
      navigate(row.id);
    }
    navigate(`contrato/${row.id}`);
  };

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setPage(0);
  }, [filtrosProveedores.rfc]);
  useEffect(() => {
    setPage(0);
  }, [filtrosProveedores.alias]);
  useEffect(() => {
    setPage(0);
  }, [filtrosProveedores.razonSocial]);
  useEffect(() => {
    setPage(0);
  }, [filtrosProveedores.fechaAlta]);
  useEffect(() => {
    setPage(0);
  }, [filtrosProveedores.fechaInicioContrato]);
  useEffect(() => {
    setPage(0);
  }, [filtrosProveedores.fechaFinContrato]);

  useEffect(() => {
    if (isErrorGet) {
      if (errorGet instanceof AxiosError) {
        toast.error(errorGet.response?.data ?? errorGet.message);
        return;
      }
      toast.error("Error al obtener proveedores");
    }
  }, [isErrorGet]);

  useEffect(() => {
    if (proveedores) {
      setProveedoresData(proveedores.items);
      setTotalRows(proveedores.totalCount);
    }
  }, [proveedores]);

  return {
    rowClick,
    proveedores,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    proveedoresData,
    totalRows,
  };
};
