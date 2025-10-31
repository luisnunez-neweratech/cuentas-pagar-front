import { useState } from "react";
import { useContactosStore } from "../store/Contacto";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

type Contacto = { id: number; valido: boolean };

export const useContactos = () => {
  const [items, setItems] = useState<Contacto[]>([]);
  const setContactosValidos = useContactosStore(
    (state) => state.setContactosValidos
  );

  const addContacto = useProveedorContratoStore((state) => state.addContacto);
  const stepContacto = useProveedorContratoStore((state) => state.stepContacto);
  const removeContacto = useProveedorContratoStore(
    (state) => state.removeContacto
  );

  const clickAddContacto = () => {
    addContacto({
      id: (stepContacto?.length ?? 0) + 1,
      valido: false,
      tipoContacto: "",
      contacto: "",
      telefono: "",
      email: "",
      paginaWeb: "",
    });
  };

  const deleteContacto = (id: number) => {
    removeContacto(id);
  };

  const isValidForm = (id: number, valid: boolean) => {
    console.log("here?", id, valid);
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
      console.log('checkValid', checkValid)
      setContactosValidos(checkValid);
    } else {
      setContactosValidos(false);
    }
  };

  return {
    clickAddContacto,
    deleteContacto,
    setContactosValidos,
    isValidForm,
  };
};
