import { useState } from "react";
import { Perfil } from "../components/steps/Perfil";
import { Domicilio } from "../components/steps/Domicilio";
import { CuentaBancaria } from "../components/steps/CuentaBancaria";
import { Contacto } from "../components/steps/Contacto";
import { useNavigate } from "react-router";
import { useProveedorContratoStore } from "../store/ProveedorContrato.store";

const steps = ["Perfil", "Domicilio Fiscal", "Cuenta Bancaria", "Contactos"];

export const useProveedorContratoPage = () => {
  const activeStep = useProveedorContratoStore((state) => state.activeStep);
  const isStepSkipped = useProveedorContratoStore((state) => state.isStepSkipped);

//  const [activeStep, setActiveStep] = useState(0);
  //const [skipped, setSkipped] = useState(new Set<number>());
  const navigate = useNavigate();

  /* const isStepSkipped = (step: number) => {
    return skipped.has(step);
  }; */

 /*  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }; */

 /*  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }; */

  /* const handleReset = () => {
    setActiveStep(0);
  }; */

  const getStepScreen = (index: number) => {
    switch (index) {
      case 0:
        return <Perfil />;
      case 1:
        return <Domicilio />;
      case 2:
        return <CuentaBancaria />;
      case 3:
        return <Contacto />;
    }
  };

  const onClickBack = () => {
    navigate("/proveedor");
  };

  return {
    steps,
    activeStep,
    isStepSkipped,

    /*handleNext,
    handleBack,
    handleReset, */
    getStepScreen,
    onClickBack
  };
};
