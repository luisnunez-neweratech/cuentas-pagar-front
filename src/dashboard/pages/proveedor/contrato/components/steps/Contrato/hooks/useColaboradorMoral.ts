import { useState } from "react";
import { useColaboradorMoralStore } from "../store/ColaboradorMoral.store";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { deleteColaboradoresContrato } from "../../../../services/proveedor.contrato.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
type Colaborador = { id: number; valido: boolean };

export const usecolaboradorMoral = () => {
  const [items, setItems] = useState<Colaborador[]>([]);
  const setColaboradoresValidos = useColaboradorMoralStore(
    (state) => state.setColaboradoresValidos
  );

  const addColaborador = useProveedorContratoStore(
    (state) => state.addColaborador
  );
  const stepContrato = useProveedorContratoStore((state) => state.stepContrato);
  const removeColaborador = useProveedorContratoStore(
    (state) => state.removeColaborador
  );

  const deleteMutation = useMutation({
    mutationFn: deleteColaboradoresContrato,
    onSuccess: (_data, variables) => {
      removeColaborador(+variables);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el colaborador");
      return;
    },
  });

  const clickAddColaborador = () => {
    addColaborador({
      id: (stepContrato?.colaboradores?.length ?? 0) + 1,
      valido: false,
      noColaborador: "",
      nombre: "",
      fechaInicio: "",
      fechaFin: "",
      status: true,
      newElement: true,
    });
  };

  const deleteColaborador = (id: number) => {
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
      setColaboradoresValidos(checkValid);
    } else {
      setColaboradoresValidos(false);
    }
  };

  return {
    clickAddColaborador,
    deleteColaborador,
    isValidForm,
    setColaboradoresValidos,
    stepContrato,    
  };
};
