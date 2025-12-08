import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";

interface props {  
  validateDocuments: number;
}

export const useArchivoPrincipal = ({  validateDocuments }: props) => {
  useEffect(() => {
    validateArchivoPrincipal(); //children function of interest
  }, [validateDocuments]);

  const updateArchivoPrincipal = useDocumentoPrincipalStore(
    (state) => state.updateArchivoPrincipal
  );

  const updateTipoDocumento = useDocumentoPrincipalStore(
    (state) => state.updateTipoDocumento
  );

  const stateArchivoPrincipal = useDocumentoPrincipalStore((state) => state);

  const [fileName, setFileName] = useState("");

  const getInitialValues = () => {
    return {
      tipoDocumento: stateArchivoPrincipal.tipoDocumento, // contrato
      fechaInicio: stateArchivoPrincipal.fechaInicio,
      fechaFin: stateArchivoPrincipal.fechaFin,
      indeterminado: stateArchivoPrincipal.indeterminado,
      filePrincipal: stateArchivoPrincipal.file,
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
    validationSchema: validationArchivoschema(),
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
      setFieldValue('filePrincipal', event.target.files[0]);
    }
  };

  useEffect(() => {
    validateArchivoPrincipal();
  }, [errors]);

  useEffect(() => {
    validateArchivoPrincipal();
  }, [values]);

  const validateArchivoPrincipal = () => {    
    handleSubmit();
    validateForm().then((errors) => {      
      if (Object.keys(errors).length === 0) {
        updateArchivoPrincipal(
          values.tipoDocumento,
          values.fechaInicio,
          values.indeterminado,
          values.filePrincipal,
          true,
          true,
          values.fechaFin ?? "",
        );
      } else {
         updateArchivoPrincipal(
          values.tipoDocumento,
          values.fechaInicio,
          values.indeterminado,
          values.filePrincipal,
          true,
          false,
          values.fechaFin ?? "",
        );       
      }
    });
  };

  return {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    handleFileChange,
    fileName,
    updateTipoDocumento,
  };
};
