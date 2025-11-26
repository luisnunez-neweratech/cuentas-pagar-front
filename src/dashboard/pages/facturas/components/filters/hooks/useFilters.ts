import { useQuery } from "@tanstack/react-query";
import type { Item } from "../../../../../../components/common/AutoComplete/interfaces/Item";
import { getProveedores } from "../../../services/proveedor.service";
import { useFormik } from "formik";
import { getAllGiros } from "../../../../catalogos/services/giros.service";

const meses = [
  { id: 1, descripcion: "Enero" },
  { id: 2, descripcion: "Febrero" },
  { id: 3, descripcion: "Marzo" },
  { id: 4, descripcion: "Abril" },
  { id: 5, descripcion: "Mayo" },
  { id: 6, descripcion: "Junio" },
  { id: 7, descripcion: "Julio" },
  { id: 8, descripcion: "Agosto" },
  { id: 9, descripcion: "Septiembre" },
  { id: 10, descripcion: "Octubre" },
  { id: 11, descripcion: "Noviembre" },
  { id: 12, descripcion: "Diciembre" },
];

const estatusReembolso = [
  { id: 1, descripcion: "Pendiente" },
  { id: 2, descripcion: "Pagado" },
  { id: 3, descripcion: "Cancelado" },
  { id: 3, descripcion: "N/A" },
];

const estatusFactura = [
  { id: 1, descripcion: "Pendiente" },
  { id: 2, descripcion: "Pagado" },
  { id: 3, descripcion: "Cancelada" },
  { id: 3, descripcion: "En Revision" },
];

export const useFilters = () => {
  const { data: proveedores } = useQuery({
    queryKey: ["Supplier", "GetAll"],
    queryFn: () => getProveedores(),
  });

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
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
      productos: [],
      meses: [],
      estatusReembolso: [],
      estatusFactura: [],
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

  const onChangeAutocomplete = (newValues: Item[], fieldValue: string) => {
    setFieldValue(fieldValue, newValues);
  };

  return {
    proveedores,
    values,
    giros,
    meses,
    onChangeAutocomplete,
    estatusReembolso,
    estatusFactura
  };
};
