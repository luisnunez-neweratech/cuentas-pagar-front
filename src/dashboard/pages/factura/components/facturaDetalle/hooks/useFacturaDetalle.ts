import { useQuery } from "@tanstack/react-query";
import { useFacturaStore } from "../../../store/Factura.store";
import { getAllUMedidas } from "../../../services/catalog.service";

export const useFacturaDetalle = () => {
  const stateFactura = useFacturaStore((state) => state);

  const addRowFacturaDetalle = useFacturaStore(
    (state) => state.addRowFacturaDetalle
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


    const { data: uMedidadData } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "UofM"],
    queryFn: () => getAllUMedidas(),
  });

  return {
    clickAddRowDetalle,
    uMedidadData
  };
};
