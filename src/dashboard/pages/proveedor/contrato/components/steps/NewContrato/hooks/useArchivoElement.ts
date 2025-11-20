import { useFormik } from "formik";
import { useState } from "react";

interface props {
  //tipoDocumento: TipoDocumento;
  idInput: string;
  /*  optional?: boolean;
  validateDocuments: number; */
}

export const useArchivoElement = ({ idInput }: props) => {
  const getInitialValues = () => {
    /*  let documento: Documento;
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
    } */

    return {
      //id: documento.id,
      tipoDocumento: 0,
      fechaInicio: "", // Or dayjs() for a default value
      fechaFin: "", // Or dayjs() for a default value
      indeterminado: true,
      [idInput]: null,
      //addToContrato: documento.addToContrato,
      //downloadUrl: documento.downloadUrl,
      //fileName: documento.fileName,
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
    validationSchema: null, //optional ? null : validationArchivoschema(idInput),
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
  };
};
