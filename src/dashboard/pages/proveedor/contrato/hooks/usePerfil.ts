import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../store/ProveedorContrato.store";
import type { StepPerfil } from "../interface/stepPerfil";

export const usePerfil = () => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil
  );
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
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
    const stepPerfil = getStepPerfil();
    return {
      tipoEntidad: stepPerfil ? stepPerfil.tipoEntidad : "",
      tipoPersona: stepPerfil ? stepPerfil.tipoPersona : "",
      rfc: stepPerfil ? stepPerfil.rfc : "",
      razonSocial: stepPerfil ? stepPerfil.razonSocial : "",
      alias: stepPerfil ? stepPerfil.alias : "",
      email: stepPerfil ? stepPerfil.email : "",
      giroPrincipal: stepPerfil ? stepPerfil.giroPrincipal : "",
      productos: [],
    };
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: initialFormValues(),
      validationSchema: validationSchema,
      onSubmit: async (values) => {        
        const pasoPerfil: StepPerfil = {
          tipoProveedor: "contrato",
          tipoEntidad: values.tipoEntidad,
          tipoPersona: values.tipoPersona,
          razonSocial: values.razonSocial,
          alias: values.alias,
          rfc: values.rfc,
          email: values.email,
          giroPrincipal: values.giroPrincipal,
          productos: [],
        };        
        setStepPerfil(pasoPerfil);
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
  };
};
