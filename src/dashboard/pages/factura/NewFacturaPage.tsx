import { Button, Tab, Tabs } from "@mui/material";
import { TabHeader } from "./components/tabHeader/TabHeader";
import { useNewFacturaPage } from "./hooks/useNewFacturaPage";
import { ConfirmModal } from "./components/confirmModal/ConfirmModal";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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
    handleCargarXmlFile,
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
        <>
          <input
            type="file"
            id="cargarFacturaXML"
            style={{ display: "none" }}
            onChange={handleCargarXmlFile}
            accept=".xml"
          />
          <label htmlFor="cargarFacturaXML">
            <Button
              variant="outlined"
              component="span"
              style={{ marginTop: 14 }}
            >
              Cargar Datos del XML <UploadFileIcon style={{ marginLeft: 8 }} />
            </Button>
          </label>
        </>
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
