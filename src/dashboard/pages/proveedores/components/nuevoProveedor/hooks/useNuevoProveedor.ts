import { useNavigate } from "react-router";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";
import { useProveedorOcasionalStore } from "../../../../proveedor/ocasional/store/ProveedorOcasional.store";
import { useProveedorContratoStore } from "../../../../proveedor/contrato/store/ProveedorContrato.store";
import { useDocumentoPrincipalStore } from "../../../../proveedor/contrato/components/steps/NewContrato/store/DocumentoPrincipal.store";

export const useNuevoProveedor = () => {
  const navigate = useNavigate();
  const openModal = useProveedoresPageStore((state) => state.openModal);
  const handleClose = useProveedoresPageStore((state) => state.handleClose);
  const clearProveedorOcasional = useProveedorOcasionalStore(
    (state) => state.clearProveedorOcasional
  );
  const handleReset = useProveedorContratoStore((state) => state.handleReset);
  const clearData = useDocumentoPrincipalStore((state) => state.clearData);

  const onClickOcasional = () => {
    clearProveedorOcasional();
    navigate("nuevo-ocasional");
  };

  const onClickContrato = () => {
    handleReset();
    clearData();
    navigate("nuevo-contrato");
  };

  return {
    openModal,
    handleClose,
    onClickOcasional,
    onClickContrato,
  };
};
