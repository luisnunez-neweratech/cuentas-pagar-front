import { useNavigate } from "react-router";
import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";
import { useProveedorOcasionalStore } from "../../../../proveedor/ocasional/store/ProveedorOcasional.store";
import { useProveedorContratoStore } from "../../../../proveedor/contrato/store/ProveedorContrato.store";

export const useNuevoProveedor = () => {
  const navigate = useNavigate();
  const openModal = useProveedoresPageStore((state) => state.openModal);
  const handleClose = useProveedoresPageStore((state) => state.handleClose);
  const clearProveedorOcasional = useProveedorOcasionalStore(
    (state) => state.clearProveedorOcasional
  );
  const handleReset = useProveedorContratoStore((state) => state.handleReset);

  const onClickOcasional = () => {
    clearProveedorOcasional();
    navigate("nuevo-ocasional");
  };

  const onClickContrato = () => {
    handleReset();
    navigate("nuevo-contrato");
  };

  return {
    openModal,
    handleClose,
    onClickOcasional,
    onClickContrato,
  };
};
