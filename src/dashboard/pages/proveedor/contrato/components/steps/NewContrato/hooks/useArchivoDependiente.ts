import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";

interface props {
  //tipoDocumento: TipoDocumento;
  //id: number;
  idInput: string;
  validateDocuments: number;
  //validateDocuments: number;
  /*  optional?: boolean;*/
}

export const useArchivoDependiente = ({
  idInput,
  validateDocuments,
}: props) => {
  useEffect(() => {
    validateArchivoPrincipal(); //children function of interest
  }, [validateDocuments]);

  const updatePropuesta = useDocumentoPrincipalStore(
    (state) => state.updatePropuesta
  );
  const updateAnexo = useDocumentoPrincipalStore((state) => state.updateAnexo);

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
      tipoDocumento: 0, // depende de lo que elija
      fechaInicio: "",
      fechaFin: "",
      indeterminado: true,
      [idInput]: idInput,
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

  const [fileName, setFileName] = useState("");

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
        if (idInput === "Propuesta") {
          updatePropuesta(
            values[idInput],
            values.fechaInicio,
            values.indeterminado,
            values.fechaFin ?? ""
          );
        } else {
          updateAnexo(values[idInput], values.fechaInicio);
        }
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
    handleFileChange,
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    fileName,
  };
};
