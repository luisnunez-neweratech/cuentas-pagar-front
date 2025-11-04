import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

export const useArchivoCard = () => {
  const stepContrato = useProveedorContratoStore((state) => state.stepContrato);

  const isValidForm = ( valid: boolean) => {
    /*  setItems(
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
    } */
    return false;
  };

  return {
    isValidForm    
  };
};
