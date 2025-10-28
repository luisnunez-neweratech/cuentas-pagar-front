import { Perfil } from "../components/steps/Perfil";
import { Domicilio } from "../components/steps/Domicilio";
import { CuentaBancaria } from "../components/steps/CuentaBancaria";
import { Contacto } from "../components/steps/Contacto";
import { useNavigate } from "react-router";
import { useProveedorContratoStore } from "../store/ProveedorContrato.store";
import { Contrato } from "../components/steps/Contrato/Contrato";

const steps = [
  "Perfil",
  "Contrato",
  "Domicilio Fiscal",
  "Cuenta Bancaria",
  "Contactos",
];

export const useProveedorContratoPage = () => {
  const activeStep = useProveedorContratoStore((state) => state.activeStep);
  const isStepSkipped = useProveedorContratoStore(
    (state) => state.isStepSkipped
  );

  const navigate = useNavigate();

  const getStepScreen = (index: number) => {
    switch (index) {
      case 0:
        return <Perfil />;
      case 1:
        return <Contrato />;
      case 2:
        return <Domicilio />;
      case 3:
        return <CuentaBancaria />;
      case 4:
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
    getStepScreen,
    onClickBack,
  };
};
