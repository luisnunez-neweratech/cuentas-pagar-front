import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQueries } from "./useQueries";
import { isNotMonedaMXN } from "../../../lib/moneda";

interface contratoItem {
  contractId: number;
  contractName: string;
}

export const useTabPago = (
  proveedorId: number | null,
  monedaId: number | null,
) => {
  const { id } = useParams();

  const [showTipoCambio, setShowTipoCambio] = useState<boolean>(false);

  const [convertColaboradores, setConvertColaboradores] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertPlazoPagos, setConvertPlazoPagos] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertContratos, setConvertContratos] = useState<
    { value: number; label: string }[]
  >([]);
  const [convertFacturas, setConvertFacturas] = useState<
    { value: number; label: string }[]
  >([]);

  const {
    colaboradores,
    contratos,
    monedas,
    plazoPagos,
    facturas,
    statusFacturaData,
  } = useQueries({
    proveedorId,
    id,
  });

  const [convertMonedas, setConvertMonedas] = useState<
    { value: number; label: string }[]
  >([]);

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

  useEffect(() => {
    const newFacturas = facturas?.map((factura: any) => {
      return {
        value: factura.invoiceId,
        label: factura.invoiceNumber,
      };
    });

    setConvertFacturas(newFacturas ?? []);
  }, [facturas]);

  useEffect(() => {
    if (monedaId && convertMonedas.length > 0) {
      setShowTipoCambio(isNotMonedaMXN(monedaId, convertMonedas));
    }
  }, [monedaId]);

  return {
    convertColaboradores,
    convertPlazoPagos,
    convertMonedas,
    id,
    convertContratos,
    convertFacturas,
    showTipoCambio,
    statusFacturaData,
  };
};
