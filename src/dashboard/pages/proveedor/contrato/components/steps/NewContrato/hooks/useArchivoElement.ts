import { useFormik } from "formik";
import { useState } from "react";
import { validationArchivoschema } from "../components/ArchivosValidation";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

interface props {
  //tipoDocumento: TipoDocumento;
  id: number;
  idInput: string;
  /*  optional?: boolean;
  validateDocuments: number; */
}

export const useArchivoElement = ({ idInput, id }: props) => {


const getNewStepContrato = useProveedorContratoStore(
    (state) => state.getNewStepContrato
  );


 
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
