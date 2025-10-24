import { useFormik } from "formik";
import { validationSchema } from "../Validations";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const usePerfil = () => {
  const navigate = useNavigate();

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
        console.log(values);
        //TODO enviar data al api
        /* if (id) {
          toast.info("Proveedor actualizado correctamente");
          navigate("/proveedor");
        } else { */
        toast.success("Proveedor creado correctamente");
        navigate("/proveedor");
        //}
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
