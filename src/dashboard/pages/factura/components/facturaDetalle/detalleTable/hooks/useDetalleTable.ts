import { useState } from "react";

function createData(
  id: number,
  cantidad: number,
  uMedida: string,
  codigo: string,
  concepto: string,
  precio: number,
  total: number
) {
  return { id, cantidad, uMedida, codigo, concepto, precio, total };
}

export const useDetalleTable = () => {
  const [rows, _setRows] = useState([
    createData(0, 159, "Frozen yoghurt", "6.0", "24", 4.0, 5),
    createData(1, 237, "Ice cream sandwich", "9.0", "37", 4.3, 6),
    createData(2, 262, "Eclair", "16.0", "24", 6.0, 7),
    createData(3, 305, "Cupcake", "3.7", "67", 4.3, 8),
    createData(4, 356, "Gingerbread", "16.0", "49", 3.9, 9),
  ]);

  return {
    rows,
  };
};
