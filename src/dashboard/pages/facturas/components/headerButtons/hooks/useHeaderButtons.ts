import { useNavigate } from "react-router";
import { useFacturaStore } from "../../../../factura/store/Factura.store";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";

export const useHeaderButtons = () => {
  const navigate = useNavigate();

  const clearState = useFacturaStore((state) => state.clearState);
  const clearFiltrosStore = useFacturasPageStore((state) => state.clearFiltros);

  const clearFiltros = () => {
    clearFiltrosStore();
  };

  const downloadFile = () => {
    // Logic to download file
  };

  const hasActiveFiltres = false; // Logic to determine if there are active filters

  const onClickNewFactura = () => {
    clearState();
    navigate("/facturas/nueva-factura");
  };

  return {
    clearFiltros,
    downloadFile,
    hasActiveFiltres,
    onClickNewFactura,
  };
};
