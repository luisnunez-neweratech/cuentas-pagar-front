import { useFormik } from "formik";
import { useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { Documento } from "../../../../interface/Documentos";
import type { DocumentoType } from "../interfaces/DocumentoType";

interface props {
  isValidForm: (valid: boolean) => void;
  tipoDocumento: DocumentoType;
}

export const useArchivoElement = ({ isValidForm, tipoDocumento }: props) => {
  const getStepContrato = useProveedorContratoStore(
    (state) => state.getStepContrato
  );
  const updateDocumentos = useProveedorContratoStore(
    (state) => state.updateDocumentos
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

    return {
      file: documento.archivo ?? null,
      fechaInicio: documento.fechaInicio ?? "", // Or dayjs() for a default value
      fechaFin: documento.fechaFin ?? "", // Or dayjs() for a default value
      indeterminado: documento.indeterminado ?? true,
    };
  };

  const [fileName, setFileName] = useState("");
  const [numArchivos, setNumArchivos] = useState(0);
  const [checkIndeterminado, setCheckIndeterminado] = useState<boolean>(
    getInitialValues().indeterminado
  );

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
    initialValues: getInitialValues(),
    validationSchema: validationArchivoschema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event: any) => {
    // envio del archivo al api
    /* const formData = new FormData();
    formData.append('file',files[0]) */
    if (event.target.files.length > 0) {
      const files = event.target.files; // Get the FileList object
      const fileNames = Array.from(files).map((file: any) => file.name);
      setNumArchivos(event.target.files.length);
      setFileName(fileNames.join(" "));
    }
  };

  const onMouseLeaveComponent = async () => {
    handleSubmit(); // show the errors
    validateForm().then((errors) => {
      console.log("errros", errors);
      if (Object.keys(errors).length === 0) {
        isValidForm(true);
        const newDocumento = {
          archivo: values.file,
          fechaInicio: values.fechaInicio,
          fechaFin: values.fechaFin,
          indeterminado: checkIndeterminado,
        };
        updateDocumentos({
          tipo: getStepContrato()?.documentos.tipo!,
          principal:
            tipoDocumento === "principal"
              ? newDocumento
              : { ...getStepContrato()?.documentos.principal! },
          csf:
            tipoDocumento === "csf"
              ? newDocumento
              : { ...getStepContrato()?.documentos.csf! },
          idRepLegal:
            tipoDocumento === "idRepLegal"
              ? newDocumento
              : { ...getStepContrato()?.documentos.idRepLegal! },
          compDomicilio:
            tipoDocumento === "compDomicilio"
              ? newDocumento
              : { ...getStepContrato()?.documentos.compDomicilio! },
          poderRepLegal:
            tipoDocumento === "poderRepLegal"
              ? newDocumento
              : { ...getStepContrato()?.documentos.poderRepLegal! },
          anexo:
            tipoDocumento === "anexo"
              ? newDocumento
              : { ...getStepContrato()?.documentos.anexo! },
        });
      } else {
        isValidForm(false);
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
    checkIndeterminado,
    setCheckIndeterminado,
    fileName,
    numArchivos,
    onMouseLeaveComponent
  };
};
