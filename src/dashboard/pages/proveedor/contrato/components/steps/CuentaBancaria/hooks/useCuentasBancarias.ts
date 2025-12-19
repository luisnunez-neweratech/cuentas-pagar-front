import { useState } from "react";
import { useCuentaBancariaStore } from "../store/CuentaBancaria";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProveedorCuenta } from "../../../../services/proveedor.cuentaBancaria.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
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
    //isLoading,
    //isError,
    //error,
    data: monedas,
    //refetch,
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
      status: true,
      fileValue: undefined,
      newElement: true,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProveedorCuenta,
    onSuccess: (_data, variables) => {
      removeCuentaBancaria(+variables);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar la cuenta");
      return;
    },
  });

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
    monedas,
  };
};
