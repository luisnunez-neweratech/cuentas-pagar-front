import { useState } from "react";
import { useContactosStore } from "../store/Contacto";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { deleteProveedorContacto } from '../../../../services/proveedor.contacto.service';
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";


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

  const deleteMutation = useMutation({
    mutationFn: deleteProveedorContacto,
    onSuccess: (data,variables) => {
      removeContacto(+variables);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al eliminar el contacto");
      return;
    },
  });

  const clickAddContacto = () => {
    addContacto({
      id: (stepContacto?.length ?? 0) + 1,
      valido: false,
      tipoContacto: 0,
      contacto: "",
      telefono: "",
      email: "",
      paginaWeb: "",
      newElement: true,
    });
  };

  const deleteContacto = (id: number) => {
    deleteMutation.mutate(id.toString())    
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
