import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";

interface props {
  idInput: string;
  validateDocuments: number;
}

export const useArchivoPrincipal = ({ idInput, validateDocuments }: props) => {
  useEffect(() => {
    validateArchivoPrincipal(); //children function of interest
  }, [validateDocuments]);

  const updateArchivoPrincipal = useDocumentoPrincipalStore(
    (state) => state.updateArchivoPrincipal
  );

  const stateArchivoPrincipal = useDocumentoPrincipalStore((state) => state);

  const [agregarPropuesta, setAgregarPropuesta] = useState(false);
  const [agregarAnexo, setAgregarAnexo] = useState(false);

  const [showPrincipal, setShowPrincipal] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);

  const [showPropuesta, setShowPropuesta] = useState(true);

  const [fileName, setFileName] = useState("");

  const getInitialValues = () => {
    return {
      tipoDocumento: stateArchivoPrincipal.tipoDocumento, // contrato
      fechaInicio: stateArchivoPrincipal.fechaInicio,
      fechaFin: stateArchivoPrincipal.fechaFin,
      indeterminado: stateArchivoPrincipal.indeterminado,
      [idInput]: stateArchivoPrincipal.file,
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
    validationSchema: validationArchivoschema(idInput),
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
        console.log("llega 44?");     
        updateArchivoPrincipal(
          values.tipoDocumento,
          values.fechaInicio,
          values.indeterminado,
          values[idInput],
          isPrincipal,
          values.fechaFin ?? ''
        );
      } else {
        /* if (tipoDocumento === TipoDocumento.principal) {
          setValidArchivoPrincipal(false);
        }
        if (tipoDocumento === TipoDocumento.csf) {
          setValidArchivoCSF(false);
        }
        if (tipoDocumento === TipoDocumento.idRepLegal) {
          setValidIdRepLegal(false);
        }
        if (tipoDocumento === TipoDocumento.compDomicilio) {
          setValidCompDomicilio(false);
        } */
      }
    });
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
    fileName,
  };
};
