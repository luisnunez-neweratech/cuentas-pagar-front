import { Tab, Tabs } from "@mui/material";
import { TabHeader } from "./components/tabHeader/TabHeader";
import { useNewFacturaPage } from "./hooks/useNewFacturaPage";

export const NewFacturaPage = () => {
  const {
    onClickGuardar,
    setOnClickGuardar,
    value,
    handleChange,
    validTabHeader,
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
    </>
  );
};
