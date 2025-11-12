import { useMutation } from "@tanstack/react-query";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useCuentaBancariaStore } from "../store/CuentaBancaria";
import {
  addProveedorCuenta,
  addProveedorCaratula,
  updateProveedorCuenta,
} from "../../../../services/proveedor.cuentaBancaria.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import { useState } from "react";

export const usecuentaBancaria = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const getCuentasValidos = useCuentaBancariaStore(
    (state) => state.getCuentasValidos
  );
  const stateProveedor = useProveedorContratoStore((state) => state);
  const getStepCuentaBancaria = useProveedorContratoStore(
    (state) => state.getStepCuentaBancaria
  );

  const [disableButtons, setDisableButtons] = useState(false);
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const createCaratulaMutation = useMutation({
    mutationFn: addProveedorCaratula,
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el contacto");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: addProveedorCuenta,
    onSuccess: (data, variables) => {
      createCaratulaMutation.mutate({
        id: data.id,
        caratulaFile: variables.caratulaFile,
      });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el contacto");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorCuenta,
    onSuccess: (_data, _variables) => {
      //TODO update caratula
      /* createCaratulaMutation.mutate({
        id: data.id,
        caratulaFile: variables.caratulaFile,
      }); */
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el contacto");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const onClickNext = () => {
    if (getCuentasValidos()) {
      getStepCuentaBancaria()?.map((cuenta) => {
        if (cuenta.newElement) {
          createMutation.mutate({
            postCuentaPayload: {
              accountType: stateProveedor.stepPerfil?.tipoEntidad!,
              bankName: cuenta.banco,
              saleCurrencyId: +cuenta.monedaVenta,
              clabe: cuenta.clabe.toString(),
              swiftCode: cuenta.swift ?? "",
              paymentTermsId: +cuenta.condicionesPago,
            },
            supplierId: stateProveedor.id!.toString(),
            caratulaFile: cuenta.fileValue,
          });
        } else {
          updateMutation.mutate({
            putCuentaPayload: {
              accountType: stateProveedor.stepPerfil?.tipoEntidad!,
              bankName: cuenta.banco,
              saleCurrencyId: +cuenta.monedaVenta,
              clabe: cuenta.clabe.toString(),
              swiftCode: cuenta.swift ?? "",
              paymentTermsId: +cuenta.condicionesPago,
            },
            id: cuenta.id.toString(),
          });
        }
      });
      toast.success("Cuenta bancaria guardada correctamente");
      handleNext();
    }
  };

  return {
    handleBack,
    onClickNext,
    disableButtons,
  };
};
