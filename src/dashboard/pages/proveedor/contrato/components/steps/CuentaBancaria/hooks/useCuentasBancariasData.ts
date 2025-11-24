import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import { validationSchema } from "../components/Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";

interface props {
  id: number;
  idInput: string;
  isValidForm: (id: number, valid: boolean) => void;
  downloadUrl?: string | null;
  validateCuentas: number;
}

export const useCuentasBancariasData = ({
  id,
  idInput,
  isValidForm,
  downloadUrl,
  validateCuentas,
}: props) => {
  const location = useLocation();
  const currentPath = location.pathname;


  useEffect(() => {
    validateCuentaElement(); //children function of interest
  }, [validateCuentas]);

  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );

  const getStepCuentaBancaria = useProveedorContratoStore(
    (state) => state.getStepCuentaBancaria
  );
  const updateCuentaBancaria = useProveedorContratoStore(
    (state) => state.updateCuentaBancaria
  );

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
      status: cuentaBancaria?.status,
      condicionesPago: cuentaBancaria?.condicionesPago,
      [idInput]: cuentaBancaria?.fileValue,
      newElement: cuentaBancaria?.newElement,
      noCuenta: cuentaBancaria?.noCuenta,
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
    validationSchema: validationSchema(idInput, downloadUrl),
    onSubmit: (values) => {
      console.log("y estos?", values);
    },
  });

  const handleFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setFieldValue(idInput, event.target.files[0]);
    }
  };

  useEffect(() => {
    validateCuentaElement();
  }, [errors]);

  useEffect(() => {
    validateCuentaElement();
  }, [values]);

  const validateCuentaElement = async () => {
    console.log("entra al validate?");
    handleSubmit(); // show the errors
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        isValidForm(id, true);
        console.log("estos values2", values);
        updateCuentaBancaria(id, {
          downloadUrl: downloadUrl,
          newElement: values.newElement,
          id: id,
          valido: true,
          banco: values.banco!,
          monedaVenta: values.monedaVenta!,
          clabe: values.clabe!,
          swift: values.swift,
          condicionesPago: values.condicionesPago!,
          status: values.status!,
          fileValue:
            typeof values[idInput] === "object" &&
            values[idInput] instanceof File
              ? values[idInput]
              : undefined,
        });
      } else {
        console.log('errores', errors)
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
    handleFileChange,
    fileName,
    tipoEntidad: getStepPerfil()?.tipoEntidad,
    currentPath,
  };
};
