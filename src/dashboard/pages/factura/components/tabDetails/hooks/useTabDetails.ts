import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";

export const useTabDetails = () => {
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
