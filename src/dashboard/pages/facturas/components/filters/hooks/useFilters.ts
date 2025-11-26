import { useQuery } from "@tanstack/react-query";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { getProveedores } from "../../../services/proveedor.service";
import { useFormik } from "formik";

export const useFilters = () => {
  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedores(),
  });

  const initialFormValues = () => {
    /*     if (proveedorOcasional) {
      if (proveedorOcasional.tipoProveedor === TipoProveedor.Contrato.value) {
        navigate(`/proveedor/contrato/${id}`);
      }
      const productos = giros?.filter((obj) =>
        proveedorOcasional.productos.includes(obj.id)
      );
      return {
        tipoEntidad: proveedorOcasional.tipoEntidad,
        tipoPersona: proveedorOcasional.tipoPersona,
        rfc: proveedorOcasional.rfc,
        razonSocial: proveedorOcasional.razonSocial,
        alias: proveedorOcasional.alias ?? "",
        email: proveedorOcasional.email,
        productos: productos,
      };
    } */
    return {
      proveedores: [],
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
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: null, //validationSchema,
    onSubmit: async (_values) => {
      //handleDisableButtons(true);
    },
  });

  const onChangeProveedor = (newValues: Item[]) => {
    setFieldValue("proveedores", newValues);
  };

  return {
    onChangeProveedor,
    proveedores,
    values,
  };
};
