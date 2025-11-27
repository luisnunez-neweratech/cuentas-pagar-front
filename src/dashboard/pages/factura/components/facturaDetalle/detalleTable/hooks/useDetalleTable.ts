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
  ]);

  return {
    rows,
  };
};
