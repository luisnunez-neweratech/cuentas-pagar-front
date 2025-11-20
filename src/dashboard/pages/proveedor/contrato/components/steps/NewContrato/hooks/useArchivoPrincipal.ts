import { useFormik } from "formik";
import { useState } from "react";

export const useArchivoPrincipal = () => {
  const [agregarPropuesta, setAgregarPropuesta] = useState(false);
  const [agregarAnexo, setAgregarAnexo] = useState(false);

  const [showPrincipal, setShowPrincipal] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);

  const [showPropuesta, setShowPropuesta] = useState(false);

  const getInitialValues = () => {
    /* const documento = getNewStepContrato()?.documentos?.find(
      (item) => item.id === id
    );
    return {
      tipoDocumento: documento?.tipoDocumento,
      fechaInicio: documento?.fechaInicio, // Or dayjs() for a default value
      fechaFin: documento?.fechaFin, // Or dayjs() for a default value
      indeterminado: documento?.indeterminado,
      [idInput]: idInput,
    }; */
    return {
      tipoDocumento: 0, // contrato
    };
  };

  const {
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateForm,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: getInitialValues(),
    validationSchema: null, //validationArchivoschema(idInput),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return {
    agregarPropuesta,
    setAgregarPropuesta,
    agregarAnexo,
    setAgregarAnexo,
    showPrincipal,
    isPrincipal,
    setIsPrincipal,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setShowPrincipal,
    showPropuesta,
    setShowPropuesta,
  };
};
