import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { Documento } from "../../../../interface/Documentos";
import { TipoDocumento } from "../../../../../interfaces/TipoDocumento";
import { useContratoStore } from "../store/Contrato.store";

interface props {
  tipoDocumento: TipoDocumento;
  idInput: string;
  optional?: boolean;
  validateDocuments: number;
}

export const useArchivoElement = ({
  tipoDocumento,
  idInput,
  optional,
  validateDocuments,
}: props) => {
  useEffect(() => {
    validateArchivoElement(); //children function of interest
  }, [validateDocuments]);

  const getStepContrato = useProveedorContratoStore(
    (state) => state.getStepContrato
  );
  const updateDocumentos = useProveedorContratoStore(
    (state) => state.updateDocumentos
  );

  const setValidArchivoPrincipal = useContratoStore(
    (state) => state.setValidArchivoPrincipal
  );

  const setValidArchivoCSF = useContratoStore(
    (state) => state.setValidArchivoCSF
  );
  const setValidIdRepLegal = useContratoStore(
    (state) => state.setValidIdRepLegal
  );

  const setValidCompDomicilio = useContratoStore(
    (state) => state.setValidCompDomicilio
  );

  const getInitialValues = () => {
    let documento: Documento;
    switch (tipoDocumento) {
      case "principal":
        documento = getStepContrato()?.documentos.principal!;
        break;
      case "csf":
        documento = getStepContrato()?.documentos.csf!;
        break;
      case "idRepLegal":
        documento = getStepContrato()?.documentos.idRepLegal!;
        break;
      case "compDomicilio":
        documento = getStepContrato()?.documentos.compDomicilio!;
        break;
      case "poderRepLegal":
        documento = getStepContrato()?.documentos.poderRepLegal!;
        break;
      case "anexo":
        documento = getStepContrato()?.documentos.anexo!;
        break;
      default:
        documento = getStepContrato()?.documentos.principal!;
        break;
    }

    console.log("documento", documento);
    return {
      id: documento.id,
      fechaInicio: documento.fechaInicio ?? "", // Or dayjs() for a default value
      fechaFin: documento.fechaFin ?? "", // Or dayjs() for a default value
      indeterminado: documento.indeterminado,
      [idInput]: documento?.fileValue,
      addToContrato: documento.addToContrato,
      downloadUrl: documento.downloadUrl,
      fileName: documento.fileName,
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
  } = useFormik({
    initialValues: getInitialValues(),
    validationSchema: optional ? null : validationArchivoschema(idInput),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [fileName, setFileName] = useState(
    values[idInput] instanceof File ? values[idInput].name : null
  );
  const [numArchivos, setNumArchivos] = useState(0);

  const handleFileChange = (event: any) => {
    // envio del archivo al api
    /* const formData = new FormData();
    formData.append('file',files[0]) */
    if (event.target.files.length > 0) {
      const files = event.target.files; // Get the FileList object
      const fileNames = Array.from(files).map((file: any) => file.name);
      setNumArchivos(event.target.files.length);
      setFileName(fileNames.join(" "));
      setFieldValue(idInput, event.target.files[0]);
    }
  };

  useEffect(() => {
    validateArchivoElement();
  }, [errors]);

  const validateArchivoElement = async () => {
    handleSubmit();
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        const newDocumento = {
          fechaInicio: values.fechaInicio,
          fechaFin: values.fechaFin,
          indeterminado: values.indeterminado,
          fileValue:
            typeof values[idInput] === "object" &&
            values[idInput] instanceof File
              ? values[idInput]
              : undefined,
        };
        if (tipoDocumento === TipoDocumento.principal) {
          setValidArchivoPrincipal(true);
        }
        if (tipoDocumento === TipoDocumento.csf) {
          setValidArchivoCSF(true);
        }
        if (tipoDocumento === TipoDocumento.idRepLegal) {
          setValidIdRepLegal(true);
        }
        if (tipoDocumento === TipoDocumento.compDomicilio) {
          setValidCompDomicilio(true);
        }

        setValidArchivoCSF;
        updateDocumentos({
          tipo: getStepContrato()?.documentos.tipo!,
          principal:
            tipoDocumento === TipoDocumento.principal
              ? newDocumento
              : { ...getStepContrato()?.documentos.principal! },
          csf:
            tipoDocumento === TipoDocumento.csf
              ? newDocumento
              : { ...getStepContrato()?.documentos.csf! },
          idRepLegal:
            tipoDocumento === TipoDocumento.idRepLegal
              ? newDocumento
              : { ...getStepContrato()?.documentos.idRepLegal! },
          compDomicilio:
            tipoDocumento === TipoDocumento.compDomicilio
              ? newDocumento
              : { ...getStepContrato()?.documentos.compDomicilio! },
          poderRepLegal:
            tipoDocumento === TipoDocumento.poderRepLegal
              ? newDocumento
              : { ...getStepContrato()?.documentos.poderRepLegal! },
          anexo:
            tipoDocumento === TipoDocumento.anexo
              ? newDocumento
              : { ...getStepContrato()?.documentos.anexo! },
        });
      } else {
        if (tipoDocumento === TipoDocumento.principal) {
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
        }
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
    numArchivos,
    validateArchivoElement,
  };
};
