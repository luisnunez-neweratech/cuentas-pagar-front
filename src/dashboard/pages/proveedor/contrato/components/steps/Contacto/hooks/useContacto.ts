import { useNavigate } from "react-router";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { toast } from "sonner";
import { useContactosStore } from "../store/Contacto";

export const useContacto = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const handleReset = useProveedorContratoStore((state) => state.handleReset);
  const getContactosValidos = useContactosStore(
    (state) => state.getContactosValidos
  );

  const navigate = useNavigate();

  const guardarProovedor = () => {
    console.log("here", getContactosValidos());
    if (getContactosValidos()) {
      /* if (id) {
          toast.info("Proveedor actualizado correctamente");
          navigate("/proveedor");
        } else { */
      toast.success("Proveedor creado correctamente");
      navigate("/proveedor");
      //}
      //handleReset();
    }
    //TODO enviar data al api
  };

  return {
    handleBack,
    guardarProovedor,
  };
};
