import { useFormik } from "formik";
import { validationMoralSchema } from "../components/ColaboratorValidation";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useEffect } from "react";

interface props {
  id: number;
  isValidForm: (id: number, valid: boolean) => void;
  validateColaboradores: number;
}

export const useColaboradorData = ({
  id,
  isValidForm,
  validateColaboradores,
}: props) => {
  useEffect(() => {
    validateColaboradorElement();
  }, [validateColaboradores]);

  const getNewStepContrato = useProveedorContratoStore(
    (state) => state.getNewStepContrato
  );

  const updateNewColaborador = useProveedorContratoStore(
    (state) => state.updateNewColaborador
  );

  const getInitialValues = () => {
    const contrato = getNewStepContrato()?.colaboradores?.find(
      (item) => item.id === id
    );
    return {
      noColaborador: contrato?.noColaborador,
      nombreColaborador: contrato?.nombre,
      fechaInicio: contrato?.fechaInicio, // Or dayjs() for a default value
      fechaFin: contrato?.fechaFin,
      status: contrato?.status,
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
    validationSchema: validationMoralSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    validateColaboradorElement();
  }, [errors]);

  useEffect(() => {
    validateColaboradorElement();
  }, [values]);

  const validateColaboradorElement = async () => {
    handleSubmit(); // show the errors
    validateForm().then((errors) => {      
      if (Object.keys(errors).length === 0) {
        isValidForm(id, true);
        updateNewColaborador(id, {
          id: id,
          valido: true,
          noColaborador: values.noColaborador!,
          nombre: values.nombreColaborador!,
          fechaInicio: values.fechaInicio!, // Or dayjs() for a default value
          fechaFin: values.fechaFin!,
          status: values.status!,
        });
      } else {
        // isValidForm(id, false);
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
  };
};
