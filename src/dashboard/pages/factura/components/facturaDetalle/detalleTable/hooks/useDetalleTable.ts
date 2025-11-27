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
  const [rows, setRows] = useState([
    createData(0, 159, "Frozen yoghurt", "6.0", "24", 4.0, 5),
  ]);

  const handleInputChange = (event: any, id: number, field: string) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: event.target.value };
      }
      return row;
    });
    setRows(newRows);
  };

  return {
    rows,
    handleInputChange,
  };
};
