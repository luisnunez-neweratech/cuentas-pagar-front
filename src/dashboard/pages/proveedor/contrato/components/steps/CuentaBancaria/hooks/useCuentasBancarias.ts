import { useState } from "react";
type Cuenta = { id: number };

export const useCuentasBancarias = () => {
  const [items, setItems] = useState<Cuenta[]>([]);

  const addCuenta = () => {
    setItems([...items, { id: items.length + 1 }]);
  };

  const deleteCuenta = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return {
    items,
    addCuenta,
    deleteCuenta,
    setItems,
  };
};
