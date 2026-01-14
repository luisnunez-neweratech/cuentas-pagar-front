import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getColaboradoresSgpyon } from "../../../services/colaborador.sgpyon.service";
import { getAllPlazoPagos } from "../../../../catalogos/services/plazoPago.service";
import { getAllMonedaVentas } from "../../../../catalogos/services/monedaVenta.service";
import { useParams } from "react-router";
import { getContractNames } from "../../../services/factura.service";

interface contratoItem {
  contractId: number;
  contractName: string;
}

export const useTabPago = (proveedorId: number | null) => {
  const { id } = useParams();

  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertPlazoPagos, setConvertPlazoPagos] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertContratos, setConvertContratos] = useState<
    { value: number; label: string }[]
  >([]);

  const { data: colaboradores } = useQuery({
    queryKey: ["external", "CuentasPorPagar", "GetColaboratorsVista", "EN"],
    queryFn: () => getColaboradoresSgpyon(),
  });

  const { data: contratos } = useQuery({
    queryKey: ["Invoice", proveedorId, "GetContractNames"],
    queryFn: () => getContractNames(proveedorId!.toString()),
    enabled: proveedorId && proveedorId > 0 ? true : false,
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

  useEffect(() => {
    const newContratos = contratos?.map((contrato: contratoItem) => {
      return {
        value: contrato.contractId,
        label: contrato.contractName,
      };
    });

    setConvertContratos(newContratos ?? []);
  }, [contratos]);

  return {
    convertColaboradores,
    convertPlazoPagos,
    convertMonedas,
    id,
    convertContratos
  };
};
