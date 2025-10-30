import { useState } from "react";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useFormik } from "formik";
import { validationFisicoSchema } from "../Validations";
import type { StepContrato } from "../../../../interface/stepContrato";

export const useContrato = () => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );
  const getStepContrato = useProveedorContratoStore(
    (state) => state.getStepContrato
  );
  const setStepContrato = useProveedorContratoStore(
    (state) => state.setStepContrato
  );

  const [contrato, setContrato] = useState<boolean>(true);
  const [propuesta, setPropuesta] = useState<boolean>(false);

  const [tipoArchivos, setTipoArchivos] = useState<number>(0);
  const [checkContractor, setCheckContractor] = useState<boolean>(
    getStepContrato()?.contractor ?? false
  );

  const initialFormValues = () => {
    /* if (id) {
      return {
        tipoEntidad: proveedorOcasional!.tipoEntidad,
        
      };
    } */
    const stepContrato = getStepContrato();
    return {
      noColaborador: stepContrato?.noColaborador
        ? stepContrato?.noColaborador
        : " ",
    };
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialFormValues(),
    validationSchema:
      getStepPerfil()?.tipoPersona === "fisica" ? validationFisicoSchema : null,
    onSubmit: async (values) => {
      /*  const pasoPerfil: StepPerfil = {
            tipoProveedor: "contrato",
            tipoEntidad: values.tipoEntidad,
            tipoPersona: values.tipoPersona,
            razonSocial: values.razonSocial,
            alias: values.alias,
            rfc: values.rfc,
            email: values.email,
            giroPrincipal: values.giroPrincipal,
            productos: [],
          };
          setStepPerfil(pasoPerfil); */
      //validate files
      if (getStepPerfil()?.tipoPersona === "fisica") {
        //type fisico
        const prevStepContrato = getStepContrato();
        const stepContrato: StepContrato = {
          ...prevStepContrato,
          noColaborador: checkContractor ? values.noColaborador : "",
          contractor: checkContractor,
        };
        setStepContrato(stepContrato);
        handleNext();
      }
    },
  });

  const onClickContrato = () => {
    if (contrato) {
      setContrato(false);
      setPropuesta(true);
    } else {
      setContrato(true);
      setPropuesta(false);
    }
  };

  const onClickPropuesta = () => {
    if (propuesta) {
      setPropuesta(false);
      setContrato(true);
    } else {
      setPropuesta(true);
      setContrato(false);
    }
  };

  const handleChangeTipoArchivo = (index: any) => {
    setTipoArchivos(index === tipoArchivos ? null : index); // Toggle selection
  };

  const onChangeContractor = () => {    
    setFieldValue("noColaborador", !checkContractor ? "" : " ");
    setCheckContractor(!checkContractor);
  };

  const onClickNext = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return {
    handleBack,
    getStepPerfil,
    contrato,
    onClickContrato,
    propuesta,
    onClickPropuesta,
    handleChangeTipoArchivo,
    tipoArchivos,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    checkContractor,
    setCheckContractor,
    onChangeContractor,
    onClickNext
  };
};
