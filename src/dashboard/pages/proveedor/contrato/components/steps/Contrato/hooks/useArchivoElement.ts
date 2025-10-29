import { useFormik } from "formik";
import { useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";

export const useArchivoElement = (indeterminado: boolean) => {
  const [fileName, setFileName] = useState("");
  const [numArchivos, setNumArchivos] = useState(0);
  const [checkIndeterminado, setCheckIndeterminado] =
    useState<boolean>(indeterminado);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    validateForm,
  } = useFormik({
    initialValues: {
      file: null,
      fechaInicio: null, // Or dayjs() for a default value
      fechaFin: null, // Or dayjs() for a default value
    },
    validationSchema: validationArchivoschema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      const files = event.target.files; // Get the FileList object
      const fileNames = Array.from(files).map((file: any) => file.name);
      setNumArchivos(event.target.files.length);
      setFileName(fileNames.join(" "));
    }
  };

  return {
    handleFileChange,
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    checkIndeterminado,
    setCheckIndeterminado,
    fileName,
    numArchivos,
  };
};
