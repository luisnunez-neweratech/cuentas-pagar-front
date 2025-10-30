import { useFormik } from "formik";

import { useState } from "react";
import { validationSchema } from "../components/Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

interface props {
  id: number;
  idInput: string;
  isValidForm: (id: number, valid: boolean) => void;
}

export const useCuentasBancariasData = ({
  id,
  idInput,
  isValidForm,
}: props) => {
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );

  const [status, setStatus] = useState<boolean>(true);
  const [fileName, setFileName] = useState("");

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
    initialValues: {
      banco: "",
      monedaVenta: "",
      clabe: "",
      swift: "",
      condicionesPago: "",
      [idInput]: "",
    },
    validationSchema: validationSchema(idInput),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setFieldValue(idInput, event.target.files[0]);
    }
  };

  const onMouseLeaveComponent = async () => {
    handleSubmit(); // show the errors
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        isValidForm(id, true);
      } else {
        isValidForm(id, false);
      }
    });
  };

  return {    
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    status,
    setStatus,
    handleFileChange,
    fileName,
    tipoEntidad: getStepPerfil()?.tipoEntidad,
    onMouseLeaveComponent,
  };
};
