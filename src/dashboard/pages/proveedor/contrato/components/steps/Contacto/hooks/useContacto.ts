import { useNavigate } from "react-router";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { toast } from "sonner";

export const useContacto = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const handleReset = useProveedorContratoStore((state) => state.handleReset);

  const navigate = useNavigate();

  const guardarProovedor = () => {
    //TODO enviar data al api
    /* if (id) {
          toast.info("Proveedor actualizado correctamente");
          navigate("/proveedor");
        } else { */
    toast.success("Proveedor creado correctamente");
    navigate("/proveedor");
    //}
    handleReset();
  };

  return {
    handleBack,
    guardarProovedor,
  };
};
