import { useFacturaStore } from "../../../../store/Factura.store";

export const useDetalleTable = () => {
  const stateFactura = useFacturaStore((state) => state);

  return {
    rows: stateFactura.facturaDetalle,
  };
};
