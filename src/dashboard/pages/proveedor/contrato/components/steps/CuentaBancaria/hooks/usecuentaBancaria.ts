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
import { useParams } from "react-router";

export const useCuentaBancaria = () => {
  const { id: idParams } = useParams();
  const [validateCuentas, doValidateCuentas] = useState<number>(0);
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
    onSuccess: (_data, variables) => {
      if (variables.id && variables.caratulaFile) {
        createCaratulaMutation.mutate({
          id: variables.id,
          caratulaFile: variables.caratulaFile,
        });
      }
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

  const onClickNext = (clicked: number) => {
    doValidateCuentas(validateCuentas + 1);
    if (getCuentasValidos()) {
      if (clicked === 1 || (clicked === 0 && !idParams)) {
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
                accountNumber: cuenta.noCuenta ?? "",
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
                isActive: cuenta.status,
                accountNumber: cuenta.noCuenta ?? "",
              },
              id: cuenta.id.toString(),
              caratulaFile: cuenta.fileValue,
            });
          }
        });
        toast.success("Cuenta bancaria guardada correctamente");
      }
      if (clicked !== 1) {
        handleNext();
      }
    }
  };

  return {
    handleBack,
    onClickNext,
    disableButtons,
    validateCuentas,
    id: idParams,
  };
};
