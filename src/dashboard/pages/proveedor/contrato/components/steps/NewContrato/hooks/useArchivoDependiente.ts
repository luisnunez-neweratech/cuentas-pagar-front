import { useFormik } from "formik";
import { useState } from "react";

interface props {
  //tipoDocumento: TipoDocumento;
  //id: number;
  idInput: string;
  //validateDocuments: number;
  /*  optional?: boolean;*/
}

export const useArchivoDependiente = ({ idInput }: props) => {

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
    //handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    //validateForm,
    //handleChange,
    //handleBlur,
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

  return {
    handleFileChange,
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    fileName
  };
};
