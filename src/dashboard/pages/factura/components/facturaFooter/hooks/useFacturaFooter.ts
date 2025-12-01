import { useState } from "react";

export const useFacturaFooter = () => {
  const [fileName, setFileName] = useState(
    ""
    //getStepCuentaBancaria()?.find((item) => item.id === id)?.fileValue?.name
  );

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      //setFieldValue(idInput, event.target.files[0]);
    }
  };

  const errors = {
    facturaPDF: "",
    facturaXML: "",
  };

  const disableButtons = false;

  return {
    handleFileChange,
    errors,
    disableButtons,
  };
};
