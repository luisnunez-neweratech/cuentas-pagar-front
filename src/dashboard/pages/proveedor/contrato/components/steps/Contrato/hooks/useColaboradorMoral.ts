import { useState } from "react";
import { useColaboradorMoralStore } from "../store/ColaboradorMoral.store";
type Colaborador = { id: number; valido: boolean };

export const usecolaboradorMoral = () => {
  const [items, setItems] = useState<Colaborador[]>([]);
  const setColaboradoresValidos = useColaboradorMoralStore((state) => state.setColaboradoresValidos);

  const addColaborador = () => {
    setItems([...items, { id: items.length + 1, valido: false }]);
  };

  const deleteColaborador = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const isValidForm = (id: number, valid: boolean) => {
    console.log("se disparo", id, valid);
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.valido = valid;
        }
        return item;
      })
    );

    if (valid) {
      let checkValid = true;
      items.forEach((item) => {
        if (item.id !== id) {
          if (item.valido === false) {
            checkValid = false;
          }
        }
      });
      setColaboradoresValidos(checkValid);
    } else {
      setColaboradoresValidos(false);
    }
  };

  return {
    items,
    addColaborador,
    deleteColaborador,
    setItems,
    isValidForm,
    setColaboradoresValidos,
  };
};
