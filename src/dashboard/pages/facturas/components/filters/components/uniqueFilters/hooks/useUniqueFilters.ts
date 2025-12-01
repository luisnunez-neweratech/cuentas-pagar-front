import { useQuery } from "@tanstack/react-query";
import { getAllMonedaVentas } from "../../../../../../catalogos/services/monedaVenta.service";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

export const useUniqueFilters = () => {
  const [convertMonedas, setConvertMonedas] = useState<
    { value: number; label: string }[]
  >([]);

  const { data: monedas } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Moneda"],
    queryFn: () => getAllMonedaVentas(),
  });

  useEffect(() => {
    const newMonedas = monedas?.map((moneda) => {
      return {
        value: moneda.id,
        label: moneda.descripcion,
      };
    });

    setConvertMonedas(newMonedas ?? []);
  }, [monedas]);

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
      documentoId: null,
      monedaId: null
    };
  };


    const {
      //handleSubmit,
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      //setFieldValue,
    } = useFormik({
      enableReinitialize: true,
      initialValues: initialFormValues(),
      validationSchema: null, //validationSchema,
      onSubmit: async (_values) => {
        //handleDisableButtons(true);
      },
    });

  return {
    convertMonedas,
    values,
    handleChange,
    handleBlur,
    touched,
    errors
  };
};
