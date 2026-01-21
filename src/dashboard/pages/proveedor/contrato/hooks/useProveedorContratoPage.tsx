import { Domicilio } from "../components/steps/Domicilio/Domicilio";
import { CuentaBancaria } from "../components/steps/CuentaBancaria/CuentaBancaria";
import { Contacto } from "../components/steps/Contacto/Contacto";
import { useNavigate, useParams } from "react-router";
import { useProveedorContratoStore } from "../store/ProveedorContrato.store";
import { Perfil } from "../components/steps/Perfil/Perfil";
import { NewContrato } from "../components/steps/NewContrato/NewContrato";
import { useMutations } from "./useMutations";

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
    (state) => state.isStepSkipped,
  );
  const stepPerfil = useProveedorContratoStore((state) => state.stepPerfil);
  const isActive = useProveedorContratoStore((state) => state.isActive);
  const openDeleteModal = useProveedorContratoStore(
    (state) => state.openDeleteModal,
  );
  const handleOpenDeleteModal = useProveedorContratoStore(
    (state) => state.handleOpenDeleteModal,
  );
  const handleCloseDeleteModal = useProveedorContratoStore(
    (state) => state.handleCloseDeleteModal,
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

  const { deleteMutation, activateMutation } = useMutations({ navigate });

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
