import { useDashboardLayoutStore } from "../../../../../store/dashboardLayout.store";
import { useMutations } from "../../../hooks/useMutations";
import { useFacturaXMLStore } from "../../../store/FacturaXml.store";

interface props {
    onClose: () => void;
}

export const useProveedorExisteModal = ({ onClose }: props) => {

    const proveedorExisteMessage = useFacturaXMLStore((state) => state.proveedorExisteMessage);
    const xmlSendFile = useFacturaXMLStore((state) => state.xmlSendFile);
    const setXmlSendFile = useFacturaXMLStore((state) => state.setXmlSendFile);

    const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);
    const setFacturaResult = useFacturaXMLStore(
        (state) => state.setFacturaResult,
    );
    const handleOpenModal = useFacturaXMLStore((state) => state.handleOpenModal);

    const { importDocumentosMutation } = useMutations({
        setIsLoading,
        setFacturaResult,
        handleOpenModal,
        clearValues: () => { },
        setMassImportResponse: () => { },
        setOpenResultsModal: () => { },
        setProveedorExisteMessage: () => { },
        handleOpenProveedorExisteModal: () => { },
    })

    const handleAceptar = () => {
        importDocumentosMutation.mutate({ xml: xmlSendFile });
        onClose();
    }

    const handleCancelar = () => {
        setXmlSendFile(null);
        onClose();
    }

    return {
        handleAceptar,
        handleCancelar,
        proveedorExisteMessage
    }
}
