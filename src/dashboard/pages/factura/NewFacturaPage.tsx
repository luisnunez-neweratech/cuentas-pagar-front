import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabHeader } from "./components/tabHeader/TabHeader";
import { useNewFacturaPage } from "./hooks/useNewFacturaPage";


export const NewFacturaPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


const { onClickGuardar, setOnClickGuardar } = useNewFacturaPage();

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Header" />
        <Tab label="Details" /* disabled */ />
        <Tab label="Total" /* disabled */ />
        <Tab label="Pago" /* disabled */ />
      </Tabs>
      <TabHeader
        tabIndex={value}
        setOnClickGuardar={setOnClickGuardar}
        onClickGuardar={onClickGuardar}
      />
    </>
  );
};
