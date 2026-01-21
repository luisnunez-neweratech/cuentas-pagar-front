import { useFacturaStore } from "../../../store/Factura.store";
import { useQueries } from "./useQueries";

export const useFacturaDetalle = () => {
  const stateFactura = useFacturaStore((state) => state);

  const addRowFacturaDetalle = useFacturaStore(
    (state) => state.addRowFacturaDetalle,
  );

  const clickAddRowDetalle = () => {
    let maxId = 0;
    if (
      stateFactura.facturaDetalle &&
      stateFactura.facturaDetalle?.length > 0
    ) {
      maxId = Math.max(...stateFactura.facturaDetalle.map((item) => item.id));
    }
    addRowFacturaDetalle({
      id: maxId + 1,
      cantidad: 1,
      uMedida: 0,
      codigo: "",
      concepto: "",
      precio: 0,
      total: 0,
      validado: false,
    });
  };

  const { uMedidadData } = useQueries();

  return {
    clickAddRowDetalle,
    uMedidadData,
  };
};
