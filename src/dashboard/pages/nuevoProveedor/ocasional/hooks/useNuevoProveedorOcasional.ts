import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { validationSchema } from "../Validations";

export const useNuevoProveedorOcasional = () => {
  const [contractor, setContractor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        tipoEntidad: "",
        tipoPersona: "",
        rfc: "",
        razonSocial: "",
        alias: "",
        email: "",
        giroPrincipal: "",
        productos: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log(values);
        //TODO enviar data al api
        toast.success("Proveedor creado correctamente");
        navigate("/proveedor");
      },
    });

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
  };
};
