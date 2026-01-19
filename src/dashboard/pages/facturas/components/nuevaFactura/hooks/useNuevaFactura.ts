import { useNavigate } from "react-router";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";

export const useNuevaFactura = () => {
  const navigate = useNavigate();
  const openFacturaModal = useFacturasPageStore(
    (state) => state.openFacturaModal
  );
  const handleCloseFacturaModal = useFacturasPageStore(
    (state) => state.handleCloseFacturaModal
  );

  const onClickManual = () => {
    navigate("/facturas/nueva-factura");
  };

  const onClickXml = () => {
    navigate("/facturas/nueva-factura-xml");
  };

  return {
    openFacturaModal,
    handleCloseFacturaModal,
    onClickManual,
    onClickXml,
  };
};
