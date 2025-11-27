import { useFacturaStore } from "../../../../store/Factura.store";

export const useDetalleTable = () => {
  const stateFactura = useFacturaStore((state) => state);
  const removeRowFacturaDetalle = useFacturaStore(
    (state) => state.removeRowFacturaDetalle
  );

  const handleInputChange = (event: any, id: number, field: string) => {
    /* const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: event.target.value };
      }
      return row;
    });
    setRows(newRows); */
  };

  const deleteRowFactura = (id: number) => {
    removeRowFacturaDetalle(id);
  };

  return {
    rows: stateFactura.facturaDetalle,
    handleInputChange,
    deleteRowFactura,
  };
};
