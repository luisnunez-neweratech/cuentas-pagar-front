import { Domicilio } from "../components/steps/Domicilio/Domicilio";
import { CuentaBancaria } from "../components/steps/CuentaBancaria/CuentaBancaria";
import { Contacto } from "../components/steps/Contacto/Contacto";
import { useNavigate, useParams } from "react-router";
import { useProveedorContratoStore } from "../store/ProveedorContrato.store";
import { Perfil } from "../components/steps/Perfil/Perfil";
import { NewContrato } from "../components/steps/NewContrato/NewContrato";
import { useMutation } from "@tanstack/react-query";
import {
  deleteProveedorOcasional,
  activateSupplier,
} from "../../ocasional/services/proveedor.contrato.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

const steps = [
  "Perfil",
  "Domicilio Fiscal",
  "Contrato",
  "Cuenta Bancaria",
  "Contactos",
];

export const useProveedorContratoPage = () => {
  const { id } = useParams();

  const activeStep = useProveedorContratoStore((state) => state.activeStep);
  const isStepSkipped = useProveedorContratoStore(
    (state) => state.isStepSkipped
  );
  const stepPerfil = useProveedorContratoStore((state) => state.stepPerfil);
  const isActive = useProveedorContratoStore((state) => state.isActive);
  const openDeleteModal = useProveedorContratoStore(
    (state) => state.openDeleteModal
  );
  const handleOpenDeleteModal = useProveedorContratoStore(
    (state) => state.handleOpenDeleteModal
  );
  const handleCloseDeleteModal = useProveedorContratoStore(
    (state) => state.handleCloseDeleteModal
  );

  const navigate = useNavigate();

  const getStepScreen = (index: number) => {
    switch (index) {
      case 0:
        return <Perfil />;
      case 1:
        return <Domicilio />;
      case 2:
        return <NewContrato />;
      case 3:
        return <CuentaBancaria />;
      case 4:
        return <Contacto />;
    }
  };

  const onClickBack = () => {
    navigate("/proveedor");
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProveedorOcasional,
    onSuccess: () => {
      toast.success("Proveedor dado de baja correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al dar de baja el proveedor");
      return;
    },
  });

  const activateMutation = useMutation({
    mutationFn: activateSupplier,
    onSuccess: () => {
      toast.success("Proveedor activado correctamente");
      navigate("/proveedor");
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al activar el proveedor");
      return;
    },
  });

  const onClickEliminar = () => {
    handleOpenDeleteModal();
  };

  const confirmarEliminar = () => {
    deleteMutation.mutate(id!);
  };

  const onClickActivar = () => {
    activateMutation.mutate(id!);
  };

  return {
    steps,
    activeStep,
    isStepSkipped,
    getStepScreen,
    onClickBack,
    id,
    onClickEliminar,
    onClickActivar,
    openDeleteModal,
    handleCloseDeleteModal,
    confirmarEliminar,
    proveedorNombre: stepPerfil?.razonSocial || stepPerfil?.alias || "",
    isActive,
  };
};
