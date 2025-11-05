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

  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    if (debouncedQuery) {
      //TODO call api
      console.log("Searching for:", debouncedQuery);
    }
  }, [debouncedQuery]);

  const onChangeRfc = (rfc: string) => {
    setFiltrosProveedores({
      ...filtrosProveedores,
      rfc,
    });
    setQuery(rfc);
  };

  return {
    rfc: filtrosProveedores.rfc,
    onChangeRfc,
  };
};
