import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { validationSchema } from "../Validations";
import { useProveedoresPageStore } from "../../../proveedores/store/ProveedoresPage.store";

export const useNuevoProveedorOcasional = () => {
  const [contractor, setContractor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const proveedorOcasional = useProveedoresPageStore(
    (state) => state.proveedorOcasional
  );

  const initialFormValues = () => {
    if (id) {
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
    }
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
        if (id) {
          toast.info("Proveedor actualizado correctamente");
          navigate("/proveedor");
        } else {
          toast.success("Proveedor creado correctamente");
          navigate("/proveedor");
        }
      },
    });

  const onClickBack = () => {
    navigate("/proveedor");
  };

  const onClickEliminar = () => {
    //TODO enviar data al api
    toast.info("Proveedor eliminado correctamente");
    navigate("/proveedor");
  };

  return {
    contractor,
    setContractor,
    inputRef,

    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onClickBack,
    id,
    onClickEliminar,
  };
};
