import { useState } from "react";
import { useColaboradorMoralStore } from "../store/ColaboradorMoral.store";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
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

  const clickAddColaborador = () => {
    addColaborador({
      id: (stepContrato?.colaboradores?.length ?? 0) + 1,
      valido: false,
      noColaborador: "",
      nombre: "",
      fechaInicio: "",
      fechaFin: "",
      status: true
    });
  };

  const deleteColaborador = (id: number) => {
    removeColaborador(id);
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
    clickAddColaborador,
    deleteColaborador,
    isValidForm,
    setColaboradoresValidos,
    stepContrato
  };
};
