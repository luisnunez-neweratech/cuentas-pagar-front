import { useState } from "react";
import { useCuentaBancariaStore } from "../store/CuentaBancaria";
type Cuenta = { id: number; valido: boolean };

export const useCuentasBancarias = () => {
  const [items, setItems] = useState<Cuenta[]>([]);
  const setCuentasValidos = useCuentaBancariaStore(
    (state) => state.setCuentasValidos
  );

  const addCuenta = () => {
    setItems([...items, { id: items.length + 1, valido: false }]);
  };

  const deleteCuenta = (id: number) => {
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
      setCuentasValidos(checkValid);
    } else {
      setCuentasValidos(false);
    }
  };

  return {
    items,
    addCuenta,
    deleteCuenta,
    setItems,
    isValidForm,
    setCuentasValidos
  };
};
