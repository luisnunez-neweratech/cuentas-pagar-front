import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../store/ProveedorContrato.store";

export const usePerfil = () => {
  const handleNext = useProveedorContratoStore((state) => state.handleNext);

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
    return {
      tipoEntidad: "",
      tipoPersona: "",
      rfc: "",
      razonSocial: "",
      alias: "",
      email: "",
      giroPrincipal: "",
      productos: "",
    };
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: initialFormValues(),
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("perfil", values);
        handleNext();
        //next page
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
