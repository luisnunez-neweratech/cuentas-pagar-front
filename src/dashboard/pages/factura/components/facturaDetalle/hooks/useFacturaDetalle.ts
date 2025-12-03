import { useFacturaStore } from "../../../store/Factura.store";

export const useFacturaDetalle = () => {
  const stateFactura = useFacturaStore((state) => state);

  const addRowFacturaDetalle = useFacturaStore(
    (state) => state.addRowFacturaDetalle
  );

  const clickAddRowDetalle = () => {
    addRowFacturaDetalle({
      id: (stateFactura.facturaDetalle?.length ?? 0) + 1,
      cantidad: 0,
      uMedida: 0,
      codigo: "",
      concepto: "",
      precio: 0,
      total: 0,
    });
  };
  return {
    clickAddRowDetalle,
  };
};
