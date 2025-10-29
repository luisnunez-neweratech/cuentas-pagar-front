import { useState } from "react";

type Contacto = { id: number };

export const useContactos = () => {
  const [items, setItems] = useState<Contacto[]>([]);

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
