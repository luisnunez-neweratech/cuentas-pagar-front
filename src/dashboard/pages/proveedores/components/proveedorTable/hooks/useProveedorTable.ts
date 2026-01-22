import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { TipoProveedor } from "../../../../proveedor/interfaces/TipoProveedor";
import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { useProveedorContratoStore } from "../../../../proveedor/contrato/store/ProveedorContrato.store";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";
import { useDocumentoPrincipalStore } from "../../../../proveedor/contrato/components/steps/NewContrato/store/DocumentoPrincipal.store";
import { useQueries } from "./useQueries";
import { useProveedorTableStore } from "../store/ProveedorTable.store";

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
    (state) => state.filtrosProveedores,
  );
  const clearData = useDocumentoPrincipalStore((state) => state.clearData);
  const handleOpenModal = useProveedorTableStore((state) => state.handleOpenModal);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { isLoading, isErrorGet, errorGet, proveedores } = useQueries({
    page,
    rowsPerPage,
    callApi,
  });

  const rowClick = (row: any) => {
    handleReset();
    clearData();    
    if (row.tipoProveedor === TipoProveedor.Ocasional.value) {            
      navigate(`/proveedor/${row.id}`);      
    } else {      
      navigate(`contrato/${row.id}`);
    }
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
    setPage(0);
  }, [filtrosProveedores.status]);

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
    handleOpenModal
  };
};
