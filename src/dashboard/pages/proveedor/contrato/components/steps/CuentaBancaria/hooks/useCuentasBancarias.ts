import { useState } from "react";
import { useCuentaBancariaStore } from "../store/CuentaBancaria";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { useQuery } from "@tanstack/react-query";
type Cuenta = { id: number; valido: boolean };

export const useCuentasBancarias = () => {
  const [items, setItems] = useState<Cuenta[]>([]);
  const setCuentasValidos = useCuentaBancariaStore(
    (state) => state.setCuentasValidos
  );

  const addCuentaBancaria = useProveedorContratoStore(
    (state) => state.addCuentaBancaria
  );
  const stepCuentaBancaria = useProveedorContratoStore(
    (state) => state.stepCuentaBancaria
  );

  const removeCuentaBancaria = useProveedorContratoStore(
    (state) => state.removeCuentaBancaria
  );

   const {
    isLoading,
    isError,
    error,
    data: monedas,
    refetch,
  } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  const addCuenta = () => {    
    addCuentaBancaria({
      id: (stepCuentaBancaria?.length ?? 0) + 1,
      valido: false,
      banco: "",
      monedaVenta: "",
      clabe: "",
      swift: "",
      condicionesPago: "",
      status: true,
      fileValue: undefined,
    });
  };

  const deleteCuenta = (id: number) => {    
    removeCuentaBancaria(id);
  };

  const isValidForm = (id: number, valid: boolean) => {
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
    addCuenta,
    deleteCuenta,    
    isValidForm,
    setCuentasValidos,
    monedas
  };
};
