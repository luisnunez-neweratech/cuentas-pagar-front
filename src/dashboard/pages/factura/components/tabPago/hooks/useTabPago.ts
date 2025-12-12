import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import { getAllPlazoPagos } from "../../../../catalogos/services/plazoPago.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";

export const useTabPago = () => {
  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertPlazoPagos, setConvertPlazoPagos] = useState<
    { value: number; label: string }[]
  >([]);

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

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

  useEffect(() => {
    const newColaboradores = colaboradores?.map((colaborador: any) => {
      return {
        value: colaborador.id,
        label: colaborador.name,
      };
    });

    setConvertColaboradores(newColaboradores ?? []);
  }, [colaboradores]);

  const {
    /* isLoading,
      isError,
      error, */
    data: plazoPagos,
    //refetch,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "PlazoPago"],
    queryFn: () => getAllPlazoPagos(),
  });

  useEffect(() => {
    const newPlazoPagos = plazoPagos?.map((plazo: any) => {
      return {
        value: plazo.id,
        label: plazo.descripcion,
      };
    });

    setConvertPlazoPagos(newPlazoPagos ?? []);
  }, [plazoPagos]);

  return {
    convertColaboradores,
    convertPlazoPagos,
    convertMonedas,
  };
};
