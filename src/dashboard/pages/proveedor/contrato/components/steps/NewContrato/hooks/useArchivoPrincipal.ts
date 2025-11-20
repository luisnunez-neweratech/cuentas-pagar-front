import { useFormik } from "formik";
import { useState } from "react";

interface props {
  idInput: string
}

export const useArchivoPrincipal = ({idInput}: props) => {
  const [agregarPropuesta, setAgregarPropuesta] = useState(false);
  const [agregarAnexo, setAgregarAnexo] = useState(false);

  const [showPrincipal, setShowPrincipal] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);

  const [showPropuesta, setShowPropuesta] = useState(false);

    const [fileName, setFileName] = useState("");

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
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
    };
  };

  const {
    //handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    //validateForm,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: getInitialValues(),
    validationSchema: null, //validationArchivoschema(idInput),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event: any) => {
    /* const formData = new FormData();
    formData.append('file',files[0]) */
    if (event.target.files.length > 0) {
      const files = event.target.files; // Get the FileList object
      const fileNames = Array.from(files).map((file: any) => file.name);
      setFileName(fileNames.join(" "));
      setFieldValue(idInput, event.target.files[0]);
    }
  };

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
    setFieldValue,
    setFieldTouched,
    handleFileChange,
    fileName
  };
};
