import { useState } from "react";
import { useCuentaBancariaStore } from "../store/CuentaBancaria";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useCuentasBancariasQueries } from "./useCuentasBancariasQueries";
import { useCuentasBancariasMutations } from "./useCuentasBancariasMutations";
type Cuenta = { id: number; valido: boolean };

export const useCuentasBancarias = () => {
  const [items, setItems] = useState<Cuenta[]>([]);
  const setCuentasValidos = useCuentaBancariaStore(
    (state) => state.setCuentasValidos,
  );

  const addCuentaBancaria = useProveedorContratoStore(
    (state) => state.addCuentaBancaria,
  );
  const stepCuentaBancaria = useProveedorContratoStore(
    (state) => state.stepCuentaBancaria,
  );

  const { monedas } = useCuentasBancariasQueries();

  const addCuenta = () => {
    addCuentaBancaria({
      id: (stepCuentaBancaria?.length ?? 0) + 1,
      valido: false,
      banco: "",
      monedaVenta: "",
      clabe: "",
      swift: "",
      status: true,
      fileValue: undefined,
      newElement: true,
    });
  };

  const { deleteMutation } = useCuentasBancariasMutations();

  const deleteCuenta = (id: number) => {
    deleteMutation.mutate(id.toString());
  };

  const isValidForm = (id: number, valid: boolean) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.valido = valid;
        }
        return item;
      }),
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
    addCuenta,
    deleteCuenta,
    isValidForm,
    setCuentasValidos,
    monedas,
  };
};
