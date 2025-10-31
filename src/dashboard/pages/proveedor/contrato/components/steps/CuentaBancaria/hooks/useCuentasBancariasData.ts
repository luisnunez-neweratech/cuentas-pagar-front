import { useState } from "react";
import { useFormik } from "formik";
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
  const updateCuentaBancaria = useProveedorContratoStore(
    (state) => state.updateCuentaBancaria
  );

  const [status, setStatus] = useState<boolean>(true);
  const [fileName, setFileName] = useState(
    getStepCuentaBancaria()?.find((item) => item.id === id)?.fileValue?.name
  );

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
      [idInput]: cuentaBancaria?.fileValue,
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
        updateCuentaBancaria(id, {
          id: id,
          valido: true,
          banco: values.banco!,
          monedaVenta: values.monedaVenta!,
          clabe: values.clabe!,
          swift: values.swift,
          condicionesPago: values.condicionesPago!,
          status: true,
          fileValue:
            typeof values[idInput] === "object" &&
            values[idInput] instanceof File
              ? values[idInput]
              : undefined,
        });
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
