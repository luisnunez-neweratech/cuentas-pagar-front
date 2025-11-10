import { useNavigate } from "react-router";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { toast } from "sonner";
import { useContactosStore } from "../store/Contacto";
import { useMutation } from "@tanstack/react-query";
import { addProveedorContacto } from "../../../../services/proveedor.contacto.service";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";

export const useContacto = () => {
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const handleReset = useProveedorContratoStore((state) => state.handleReset);
  const getContactosValidos = useContactosStore(
    (state) => state.getContactosValidos
  );
  const [disableButtons, setDisableButtons] = useState(false);
  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
  const stateProveedor = useProveedorContratoStore((state) => state);

  const navigate = useNavigate();

  const toNextStep = (proveedorId: number) => {
    /*  const pasoPerfil: StepPerfil = {
        tipoProveedor: TipoProveedor.Contrato.value,
        tipoEntidad: +values.tipoEntidad,
        tipoPersona: +values.tipoPersona,
        razonSocial: values.razonSocial,
        alias: values.alias,
        rfc: values.rfc,
        email: values.email,
        giroPrincipal: values.giroPrincipal,
        productos: values.productos,
      };
      setStepPerfil(pasoPerfil);
      setProveedorId(proveedorId); */
    toast.success("Proveedor creado correctamente");
    navigate("/proveedor");
  };

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const createMutation = useMutation({
    mutationFn: addProveedorContacto,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const guardarProovedor = () => {
    if (getContactosValidos()) {
      /* if (id) {
          toast.info("Proveedor actualizado correctamente");
          navigate("/proveedor");
        } else { */

      stateProveedor.stepContacto?.map((contacto) => {
        createMutation.mutate({
          id: 0, // en create se manda 0
          supplierId: stateProveedor.id!,
          contactType: contacto.tipoContacto,
          name: contacto.contacto,
          phone: contacto.telefono,
          email: contacto.paginaWeb,
          website: contacto.paginaWeb,
          isActive: contacto.valido,
        });
      });

      toast.success("Proveedor creado correctamente");
      navigate("/proveedor");
      //}
      //handleReset();
    }
  };

  return {
    handleBack,
    guardarProovedor,
    disableButtons,
  };
};
