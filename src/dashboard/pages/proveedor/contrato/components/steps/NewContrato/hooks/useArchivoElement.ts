import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useDocumentoPrincipalStore } from "../store/DocumentoPrincipal.store";

interface props {
  //tipoDocumento: TipoDocumento;
  id: number;
  idInput: string;
  validateDocuments: number;
  /*  optional?: boolean;*/
}

export const useArchivoElement = ({
  idInput,
  id,
  validateDocuments,
}: props) => {
  useEffect(() => {
    validateArchivoElement(); //children function of interest
  }, [validateDocuments]);

  const [showIndetermindo, setShowIndeterminado] = useState(true);

  const getNewStepContrato = useProveedorContratoStore(
    (state) => state.getNewStepContrato
  );

  const updateNewDocumento = useProveedorContratoStore(
    (state) => state.updateNewDocumento
  );

  const stateArchivoPrincipal = useDocumentoPrincipalStore((state) => state);

  const getInitialValues = () => {
    const documento = getNewStepContrato()?.documentos?.find(
      (item) => item.id === id
    );
    return {
      tipoDocumento: documento?.tipoDocumento,
      fechaInicio: documento?.fechaInicio, // Or dayjs() for a default value
      fechaFin: documento?.fechaFin, // Or dayjs() for a default value
      indeterminado: documento?.indeterminado,
      [idInput]: idInput,
      perteneceContratoId: documento?.perteneceContratoId || "",
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
    validateArchivoElement();
  }, [errors]);

  useEffect(() => {
    validateArchivoElement();
  }, [values]);

  const validateArchivoElement = async () => {
    handleSubmit();
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        updateNewDocumento(id, {
          id: id,
          fechaInicio: values.fechaInicio ?? "",
          fechaFin: values.fechaFin,
          indeterminado: values.indeterminado!,
          fileValue: values[idInput],
          fileName: fileName,
          tipoDocumento: values.tipoDocumento ?? 0,
          newElement: true,
          perteneceContratoId: +values.perteneceContratoId,
        });
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
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleFileChange,
    fileName,
    listaContratos: getNewStepContrato()?.listaContratos || [],
    stateArchivoPrincipal,
    showIndetermindo,
    setShowIndeterminado
  };
};
