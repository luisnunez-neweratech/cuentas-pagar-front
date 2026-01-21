import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useContactosStore } from "../store/Contacto";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import { useContactoMutations } from "./useContactoMutations";

export const useContacto = () => {
  const { id: idParams } = useParams();
  const [validateContactos, doValidateContactos] = useState<number>(0);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getContactosValidos = useContactosStore(
    (state) => state.getContactosValidos,
  );
  const [disableButtons, setDisableButtons] = useState(false);
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const stateProveedor = useProveedorContratoStore((state) => state);

  const navigate = useNavigate();

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const { updateMutation, createMutation } = useContactoMutations({
    handleDisableButtons,
  });

  const guardarProovedor = (clickedBy: number) => {
    doValidateContactos(validateContactos + 1);
    if (getContactosValidos()) {
      if (clickedBy === 1 || (clickedBy === 0 && !idParams)) {
        stateProveedor.stepContacto?.map((contacto) => {
          if (contacto.newElement) {
            createMutation.mutate({
              id: 0, // en create id 0
              supplierId: stateProveedor.id!,
              contactType: contacto.tipoContacto,
              name: contacto.contacto,
              phone: contacto.telefono,
              email: contacto.email,
              website: contacto.paginaWeb,
              isActive: true,
            });
          } else {
            updateMutation.mutate({
              id: contacto.id,
              supplierId: stateProveedor.id!,
              contactType: contacto.tipoContacto,
              name: contacto.contacto,
              phone: contacto.telefono,
              email: contacto.email,
              website: contacto.paginaWeb,
              isActive: true,
            });
          }
        });
        toast.success("Proveedor guardado correctamente");
      }
      if (clickedBy !== 1) {
        navigate("/proveedor");
      }
    }
  };

  return {
    handleBack,
    guardarProovedor,
    disableButtons,
    validateContactos,
    id: idParams,
  };
};
