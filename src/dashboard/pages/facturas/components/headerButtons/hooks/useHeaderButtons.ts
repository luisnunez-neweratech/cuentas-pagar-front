import { useNavigate } from "react-router";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useFacturaStore } from "../../../../factura/store/Factura.store";
import { useFacturasPageStore } from "../../../store/FacturasPage.store";
import { downloadExcel } from "../../../services/invoice.service";

export const useHeaderButtons = () => {
  const navigate = useNavigate();

  const clearState = useFacturaStore((state) => state.clearState);
  const clearFiltrosStore = useFacturasPageStore((state) => state.clearFiltros);
  const filtrosFacturas = useFacturasPageStore((state) => state.filtrosFacturas);

  const clearFiltros = () => {
    clearFiltrosStore();
  };

  const downloadFile = async () => {
    try {
      toast.info("Generando archivo Excel...");
      
      const blob = await downloadExcel({ filters: filtrosFacturas });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Facturas_${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Archivo descargado correctamente");
    } catch (error) {
      console.log(error);
      toast.error("Error al descargar el archivo");
    }
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
