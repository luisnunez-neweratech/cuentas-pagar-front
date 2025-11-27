import { useFacturaStore } from "../../../../store/Factura.store";

export const useDetalleTable = () => {


const stateFactura = useFacturaStore((state) => state);
  

  const handleInputChange = (event: any, id: number, field: string) => {
    /* const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: event.target.value };
      }
      return row;
    });
    setRows(newRows); */
  };

  return {
    rows: stateFactura.facturaDetalle,
    handleInputChange,
  };
};
