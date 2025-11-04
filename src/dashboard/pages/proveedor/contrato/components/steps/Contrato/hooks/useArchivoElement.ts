import { useFormik } from "formik";
import { useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { Documento } from "../../../../interface/Documentos";
import { TipoDocumento } from "../../../../../interfaces/TipoDocumento";

interface props {
  isValidForm: (valid: boolean) => void;
  tipoDocumento: TipoDocumento;
  idInput: string;
}

export const useArchivoElement = ({
  isValidForm,
  tipoDocumento,
  idInput,
}: props) => {
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


    console.log('documento.indeterminado', documento.indeterminado)
    
    return {
      file: documento.archivo ?? null,
      fechaInicio: documento.fechaInicio ?? "", // Or dayjs() for a default value
      fechaFin: documento.fechaFin ?? "", // Or dayjs() for a default value
      indeterminado: documento.indeterminado,
      [idInput]: documento?.fileValue,
    };
  };

  const [fileName, setFileName] = useState("");
  const [numArchivos, setNumArchivos] = useState(0);

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
    validationSchema: validationArchivoschema(idInput),
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
      setFieldValue(idInput, event.target.files[0]);
    }
  };

  const onMouseLeaveComponent = async () => {
    handleSubmit(); // show the errors
    validateForm().then((errors) => {
      console.log("errros", errors);
      if (Object.keys(errors).length === 0) {
        isValidForm(true);
        console.log("checkIndeterminado", values.indeterminado);
        const newDocumento = {
          archivo: values.file,
          fechaInicio: values.fechaInicio,
          fechaFin: values.fechaFin,
          indeterminado: values.indeterminado,
          fileValue:
            typeof values[idInput] === "object" &&
            values[idInput] instanceof File
              ? values[idInput]
              : undefined,
        };
        //TODO
        // validar bien los archivos que si son requeridos, y las fechas cuando son requeridas
        //boton siguiente en contratos,

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
    fileName,
    numArchivos,
    onMouseLeaveComponent,
  };
};
