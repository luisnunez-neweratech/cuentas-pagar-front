import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";

export const useFilters = () => {
  const filtrosProveedores = useProveedoresPageStore(
    (state) => state.filtrosProveedores
  );
  const setFiltrosProveedores = useProveedoresPageStore(
    (state) => state.setFiltrosProveedores
  );
  const setCallApi = useProveedoresPageStore((state) => state.setCallApi);

  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    if (debouncedQuery) {      
      setCallApi();
    }
  }, [debouncedQuery]);

  const onChangeRfc = (rfc: string) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      rfc,
    });
    setQuery("rfc:" + rfc);
  };

  const onChangeAlias = (alias: string) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      alias,
    });
    setQuery("alias" + alias);
  };

  const onChangeRazonSocial = (razonSocial: string) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      razonSocial,
    });
    setQuery("razonSocial" + razonSocial);
  };

  const onChangeFechaAlta = (fechaAlta?: any) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      fechaAlta,
    });
    setQuery("fechaAlta" + fechaAlta);
  };

  const onChangeFechaInicioContrato = (fechaInicioContrato?: any) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      fechaInicioContrato,
    });
    setQuery("fechaInicioContrato" + fechaInicioContrato);
  };

  const onChangeFechaFinContrato = (fechaFinContrato?: any) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      fechaFinContrato,
    });
    setQuery("fechaFinContrato" + fechaFinContrato);
  };

  return {
    rfc: filtrosProveedores.rfc,
    alias: filtrosProveedores.alias,
    razonSocial: filtrosProveedores.razonSocial,
    fechaAlta: filtrosProveedores.fechaAlta,
    fechaInicioContrato: filtrosProveedores.fechaInicioContrato,
    fechaFinContrato: filtrosProveedores.fechaFinContrato,
    onChangeRfc,
    onChangeAlias,
    onChangeRazonSocial,
    onChangeFechaAlta,
    onChangeFechaInicioContrato,
    onChangeFechaFinContrato
  };
};
