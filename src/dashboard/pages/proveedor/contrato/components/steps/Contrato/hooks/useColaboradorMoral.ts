import {  useState } from "react";
type Colaborador = { id: number };

export const usecolaboradorMoral = () => {
    
  const [items, setItems] = useState<Colaborador[]>([]);


  const addColaborador = () => {
    setItems([...items, { id: items.length + 1 }]);
  };

  const deleteColaborador = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return {
    items,
    addColaborador,
    deleteColaborador,
    setItems
  };
};
