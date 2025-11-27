import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";

export const useUniqueFilters = () => {
  const [convertMonedas, setConvertMonedas] = useState<
    { value: number; label: string }[]
  >([]);

  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  useEffect(() => {
    const newMonedas = monedas?.map((moneda) => {
      return {
        value: moneda.id,
        label: moneda.descripcion,
      };
    });

    setConvertMonedas(newMonedas ?? []);
  }, [monedas]);

  return {
    convertMonedas,
  };
};
