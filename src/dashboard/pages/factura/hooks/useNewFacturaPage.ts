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

  return {
    onClickGuardar,
    setOnClickGuardar,
    validTabHeader,
    value,
    handleChange,
    openModal,
    handleCloseModal,
    setModalFacturaAceptada,
  };
};
