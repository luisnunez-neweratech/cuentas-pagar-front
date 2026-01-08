import { useEffect, useState } from "react";
import { useFacturaStore } from "../store/Factura.store";
import { useParams } from "react-router";

export const useNewFacturaPage = () => {
  const { id } = useParams();

  const [onClickGuardar, setOnClickGuardar] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const validTabHeader = useFacturaStore((state) => state.validTabHeader);
  const setValidTabHeader = useFacturaStore((state) => state.setValidTabHeader);

  const openModal = useFacturaStore((state) => state.openModal);
  const handleCloseModal = useFacturaStore((state) => state.handleCloseModal);
  const setModalFacturaAceptada = useFacturaStore(
    (state) => state.setModalFacturaAceptada
  );

  useEffect(() => {
    if (id) {
      setValidTabHeader(true);
    }
  }, [id]);

  const handleCargarXmlFile = (event: any) => {
    if (event.target.files.length > 0) {
      //TODO call api
      const response = {
        invoiceId: 5,
        invoiceNumber: "Serie de transacciones pr-ASCG-006365",
        fiscalFolio: "b8aada5e-efba-4abb-9c1f-36b59506c3a5",
        supplierRfc: "ASA140829MI8",
        supplierName: "ARREGUIN SANCHEZ Y ASOCIADOS",
        supplierId: 1,
        total: 81722,
        currency: "MXN",
        invoiceDate: "2025-11-04T00:00:00",
        conceptsImported: 6,
        xmlSaved: true,
        pdfSaved: false,
        messages: [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor encontrado: ARREGUIN SANCHEZ Y ASOCIADOS (ID: 1)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 5",
          "Se importaron 6 conceptos",
          "Archivo XML guardado correctamente",
        ],
        warnings: [
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
        ],
      };
      
    }
  };

  return {
    onClickGuardar,
    setOnClickGuardar,
    validTabHeader,
    value,
    handleChange,
    openModal,
    handleCloseModal,
    setModalFacturaAceptada,
    handleCargarXmlFile,
  };
};
