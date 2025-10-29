import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { StepDomicilio } from "../../../../interface/stepDomicilio";

export const useDomicilio = () => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const handleBack = useProveedorContratoStore((state) => state.handleBack);
  const getStepDomicilio = useProveedorContratoStore(
    (state) => state.getStepDomicilio
  );
  const setStepDomicilio = useProveedorContratoStore(
    (state) => state.setStepDomicilio
  );

  const initialFormValues = () => {
    /* if (id) {
      return {
        tipoEntidad: proveedorOcasional!.tipoEntidad,
        tipoPersona: proveedorOcasional!.tipoPersona,
        rfc: proveedorOcasional?.rfc ?? "",
        razonSocial: proveedorOcasional!.razonSocial,
        alias: proveedorOcasional!.alias,
        email: proveedorOcasional?.email ?? "",
        giroPrincipal: proveedorOcasional?.giroPrincipal ?? "",
        productos: "", //TODO valores para los productos
      };
    } */

    const stepDomicilio = getStepDomicilio();
    return {
      pais: stepDomicilio?.pais,
      codigoPostal: stepDomicilio?.codigoPostal,
      estado: stepDomicilio?.estado,
      municipio: stepDomicilio?.municipio,
      ciudad: stepDomicilio?.ciudad,
      colonia: stepDomicilio?.colonia,
      calle: stepDomicilio?.calle,
      numInterior: stepDomicilio?.numInterior,
      numExterior: stepDomicilio?.numExterior,
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
  } = useFormik({
    initialValues: initialFormValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      const pasoDomicilio: StepDomicilio = {
        pais: values.pais ?? "",
        codigoPostal: values.codigoPostal ?? "",
        estado: values.estado ?? "",
        municipio: values.municipio ?? "",
        ciudad: values.ciudad ?? "",
        colonia: values.colonia ?? "",
        calle: values.calle ?? "",
        numInterior: values.numInterior,
        numExterior: values.numExterior,
      };
      setStepDomicilio(pasoDomicilio);
      handleNext();
    },
  });

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleBack,
    setFieldValue,
  };
};
