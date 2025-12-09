import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabHeader } from "./components/tabHeader/TabHeader";
import { useNewFacturaPage } from "./hooks/useNewFacturaPage";

export const NewFacturaPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    onClickGuardar,
    setOnClickGuardar,
    /* validTabHeader,
    validTabDetail,
    validTabTotal, */
  } = useNewFacturaPage();

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Header" />
        <Tab label="Details"/*  disabled={!validTabHeader}  *//>
        <Tab label="Total" /* disabled={!validTabDetail} */ />
        <Tab label="Pago" /* disabled={!validTabTotal} */ />
      </Tabs>
      <TabHeader
        tabIndex={value}
        setOnClickGuardar={setOnClickGuardar}
        onClickGuardar={onClickGuardar}
      />
    </>
  );
};
