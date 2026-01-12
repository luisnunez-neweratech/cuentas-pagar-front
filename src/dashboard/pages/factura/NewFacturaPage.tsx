import { Tab, Tabs } from "@mui/material";
import { TabHeader } from "./components/tabHeader/TabHeader";
import { useNewFacturaPage } from "./hooks/useNewFacturaPage";
import { ConfirmModal } from "./components/confirmModal/ConfirmModal";

export const NewFacturaPage = () => {
  const {
    onClickGuardar,
    setOnClickGuardar,
    value,
    handleChange,
    validTabHeader,
    openModal,
    handleCloseModal,
    setModalFacturaAceptada,
  } = useNewFacturaPage();

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Header" />
        <Tab label="Details" disabled={!validTabHeader} />
      </Tabs>
      <TabHeader
        tabIndex={value}
        setOnClickGuardar={setOnClickGuardar}
        onClickGuardar={onClickGuardar}
      />
      <ConfirmModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={() => {
          setModalFacturaAceptada(true);
          setOnClickGuardar(onClickGuardar + 1);
        }}
      />
    </>
  );
};
