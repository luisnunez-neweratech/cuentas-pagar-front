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

  const getStepCuentaBancaria = useProveedorContratoStore(
    (state) => state.getStepCuentaBancaria
  );

  const [status, setStatus] = useState<boolean>(true);
  const [fileName, setFileName] = useState("");

  const getInitialValues = () => {
    const cuentaBancaria = getStepCuentaBancaria()?.find(
      (item) => item.id === id
    );
    return {
      banco: cuentaBancaria?.banco,
      monedaVenta: cuentaBancaria?.monedaVenta,
      clabe: cuentaBancaria?.clabe,
      swift: cuentaBancaria?.swift,
      condicionesPago: cuentaBancaria?.condicionesPago,
      [idInput]: "",
    };
  };

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
