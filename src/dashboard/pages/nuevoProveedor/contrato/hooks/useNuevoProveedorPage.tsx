import { useState } from "react";
import { Perfil } from "../Perfil";
import { Domicilio } from "../Domicilio";
import { CuentaBancaria } from "../CuentaBancaria";
import { Contacto } from "../Contacto";

const steps = ["Perfil", "Domicilio Fiscal", "Cuenta Bancaria", "Contactos"];

export const useNuevoProveedorPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

  return {
    steps,
    activeStep,
    isStepSkipped,

    handleNext,
    handleBack,
    handleReset,
    getStepScreen,
  };
};
