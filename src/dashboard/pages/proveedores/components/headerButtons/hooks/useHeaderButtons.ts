import { useProveedoresPageStore } from "../../../store/ProveedoresPage.store";

export const useHeaderButtons = () => {
  const handleOpenModal = useProveedoresPageStore(
    (state) => state.handleOpenModal
  );
  const clearFiltros = useProveedoresPageStore((state) => state.clearFiltros);
  const hasActiveFiltres = useProveedoresPageStore(
    (state) => state.hasActiveFiltres
  );
  const filtrosProveedores = useProveedoresPageStore(
    (state) => state.filtrosProveedores
  );

  const downloadFile = () => {
    const {
      rfc,
      alias,
      razonSocial,
      fechaAlta: fechaalta,
      fechaFinContrato: contratoFechaFin,
      fechaInicioContrato: contratoFechaInicio,
    } = filtrosProveedores;
    let paramsToSend: any = {};

    if (rfc && rfc.length > 0) {
      paramsToSend.rfc = rfc;
    }
    if (alias && alias.length > 0) {
      paramsToSend.alias = alias;
    }
    if (razonSocial && razonSocial.length > 0) {
      paramsToSend.razonSocial = razonSocial;
    }
    if (fechaalta && fechaalta.length > 0) {
      paramsToSend.fechaalta = fechaalta;
    }
    if (contratoFechaInicio && contratoFechaInicio.length > 0) {
      paramsToSend.contratoFechaInicio = contratoFechaInicio;
    }
    if (contratoFechaFin && contratoFechaFin.length > 0) {
      paramsToSend.contratoFechaFin = contratoFechaFin;
    }

    const searchParams = new URLSearchParams(paramsToSend);
    const queryString = searchParams.toString();
    window.open(
      `${import.meta.env.VITE_API_URL}/Supplier/Download/?${queryString}`
    );
  };

  return {
    handleOpenModal,
    clearFiltros,
    downloadFile,
    hasActiveFiltres,
  };
};
